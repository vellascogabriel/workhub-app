'use client';

import { categories } from '../categories/Categories';

interface CategoryIconProps {
  category: string;
  size?: number;
}

// Mapeamento de cores para cada categoria
const colorMap: Record<string, string> = {
  'Private Desk': '#5DADE2', // Azul claro
  'Meeting Room': '#CD6155', // Vermelho
  Lounge: '#F4D03F', // Amarelo
  'Coffee Shop': '#8E44AD', // Roxo
  'High-Speed': '#3498DB', // Azul
  Office: '#E74C3C', // Vermelho escuro
  Urban: '#5DADE2', // Azul claro
  Nature: '#2ECC71', // Verde
  Quiet: '#F39C12', // Laranja
  Library: '#16A085', // Verde escuro
  Remote: '#8E44AD', // Roxo
  Retreat: '#27AE60', // Verde médio
};

// Componente que exibe ícones coloridos para categorias de workspace
const CategoryIcon: React.FC<CategoryIconProps> = ({ category, size = 36 }) => {
  // Encontrar o emoji correspondente à categoria nas categorias originais
  const categoryData = categories.find(item => item.label === category);
  const emoji = categoryData?.emoji || '🏠';
  const bgColor = colorMap[category] || '#95A5A6';

  return (
    <div
      style={{
        backgroundColor: bgColor,
        width: size,
        height: size,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${size * 0.6}px`,
        color: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {emoji}
    </div>
  );
};

export default CategoryIcon;
