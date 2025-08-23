'use client';

import ImageUpload from '@/app/components/inputs/ImageUpload';

interface ImageStepProps {
  imageSrc: string;
  setImageSrc: (value: string) => void;
}

/**
 * Componente para o quarto passo do fluxo de criação de workspace
 * Permite fazer upload de uma imagem do espaço de trabalho
 */
function ImageStep({ imageSrc, setImageSrc }: ImageStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Add a photo of your place</h2>
        <p className="text-neutral-600 mt-2 text-sm">Show guests what your place looks like</p>
      </div>

      <div className="max-w-md mx-auto w-full">
        <ImageUpload value={imageSrc} onChange={value => setImageSrc(value)} />
      </div>
    </div>
  );
}

// Adicionar displayName para resolver erro de ESLint
ImageStep.displayName = 'ImageStep';

export default ImageStep;
