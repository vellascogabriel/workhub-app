'use client';

// Configuração do Cloudinary para uso em toda a aplicação
const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dga6ger1i',
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  uploadPreset: 'workhubfgvmp',
};

export default cloudinaryConfig;
