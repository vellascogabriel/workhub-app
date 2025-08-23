'use client';

import { useState, useEffect } from 'react';
import cloudinaryConfig from '@/app/libs/cloudinary-config';

interface CloudinaryProviderProps {
  children: React.ReactNode;
}

// Adicionar tipagem para a propriedade cloudinary no objeto window
declare global {
  interface Window {
    cloudinary?: {
      cloudName?: string;
    };
  }
}

/**
 * Componente que configura o Cloudinary para toda a aplicação
 */
const CloudinaryProvider: React.FC<CloudinaryProviderProps> = ({ 
  children 
}) => {
  // Usar um estado para controlar a montagem no cliente
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Configuração global do Cloudinary
    if (typeof window !== 'undefined') {
      // Inicializar o objeto cloudinary se não existir
      window.cloudinary = window.cloudinary || {};
      window.cloudinary.cloudName = cloudinaryConfig.cloudName;
      console.log('CloudinaryProvider: configurado com cloud_name:', cloudinaryConfig.cloudName);
    }
  }, []);

  // Não renderizar nada durante a montagem no servidor
  if (!isMounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default CloudinaryProvider;
