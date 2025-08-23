'use client';

import { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';
import { toast } from 'react-hot-toast';
import cloudinaryConfig from '@/app/libs/cloudinary/cloudinary-config';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Componente para upload de imagem que funciona apenas no cliente
 * e faz upload para o Cloudinary
 */
const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Garantir que o componente só seja renderizado no cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [error, setError] = useState<string | null>(null);

  const uploadToCloudinary = useCallback(async (file: File) => {
    try {
      setIsUploading(true);
      setError(null);

      console.log('Iniciando upload para o Cloudinary:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        cloudName: cloudinaryConfig.cloudName,
        uploadPreset: cloudinaryConfig.uploadPreset,
      });

      // Criar um FormData para enviar o arquivo
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.uploadPreset);
      // Não enviar a API key no FormData, ela deve ser configurada no upload preset

      console.log('FormData criado com upload_preset:', cloudinaryConfig.uploadPreset);
      console.log('Usando cloud_name:', cloudinaryConfig.cloudName);

      // Fazer o upload para o Cloudinary
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;
      console.log('Enviando requisição para Cloudinary URL:', uploadUrl);

      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      console.log('Resposta recebida do Cloudinary:', {
        status: response.status,
        statusText: response.statusText,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro na resposta do Cloudinary:', errorText);
        throw new Error(`Erro ao fazer upload: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Dados recebidos do Cloudinary:', {
        publicId: data.public_id,
        format: data.format,
        url: data.secure_url,
      });

      // Atualizar o estado com a URL da imagem no Cloudinary
      if (data.secure_url) {
        console.log('Upload concluído com sucesso:', data.secure_url);
        onChange(data.secure_url);
        toast.success('Imagem enviada com sucesso!');
      } else {
        console.error('URL segura não encontrada na resposta:', data);
        throw new Error('URL da imagem não encontrada na resposta');
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido ao fazer upload';
      console.error('Erro ao fazer upload para o Cloudinary:', error);
      setError(errorMessage);
      toast.error(`Falha no upload: ${errorMessage}`);
    } finally {
      setIsUploading(false);
    }
  }, [onChange, setIsUploading, setError]);

  const handleUpload = useCallback(() => {
    // Criar um input de arquivo oculto
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    // Quando um arquivo for selecionado
    input.onchange = async e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Criar uma URL temporária para a imagem para preview imediato
      const imageUrl = URL.createObjectURL(file);
      onChange(imageUrl); // Preview temporário

      // Fazer o upload real para o Cloudinary
      await uploadToCloudinary(file);
    };

    // Clicar no input para abrir o seletor de arquivos
    input.click();
  }, [onChange, uploadToCloudinary]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        onClick={handleUpload}
        className={`
          relative
          cursor-pointer
          hover:opacity-70
          transition
          border-dashed 
          border-2 
          p-20 
          ${error ? 'border-rose-500' : 'border-neutral-300'}
          flex
          flex-col
          justify-center
          items-center
          gap-4
          text-neutral-600
          ${isUploading ? 'opacity-70' : ''}
        `}
      >
        <TbPhotoPlus size={50} />
        <div className="font-semibold text-lg">
          {isUploading ? 'Enviando...' : 'Clique para fazer upload'}
        </div>
        {value && (
          <div className="absolute inset-0 w-full h-full">
            <Image alt="Upload" fill style={{ objectFit: 'cover' }} src={value} />
          </div>
        )}
      </div>

      {error && <div className="text-rose-500 text-sm mt-1">Erro: {error}</div>}
    </div>
  );
};

export default ImageUpload;
