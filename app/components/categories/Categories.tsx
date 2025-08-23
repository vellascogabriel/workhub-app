'use client';

import { useSearchParams } from 'next/navigation';
import Container from '../container/Container';
import Link from 'next/link';

// Define categories with emoji icons instead of React components to avoid hydration issues
export const categories = [
  {
    label: 'Private Desk',
    emoji: '🖥️',
    description: 'Dedicated desk in a shared space',
  },
  {
    label: 'Meeting Room',
    emoji: '🚪',
    description: 'Private room for meetings',
  },
  {
    label: 'Lounge',
    emoji: '🛋️',
    description: 'Comfortable lounge area',
  },
  {
    label: 'Coffee Shop',
    emoji: '☕',
    description: 'Work from a coffee shop',
  },
  {
    label: 'High-Speed',
    emoji: '📶',
    description: 'High-speed internet',
  },
  {
    label: 'Office',
    emoji: '🪑',
    description: 'Private office space',
  },
  {
    label: 'Urban',
    emoji: '🏙️',
    description: 'Located in urban area',
  },
  {
    label: 'Nature',
    emoji: '🌴',
    description: 'Close to nature',
  },
  {
    label: 'Quiet',
    emoji: '🤫',
    description: 'Quiet environment',
  },
  {
    label: 'Library',
    emoji: '📚',
    description: 'Library-like atmosphere',
  },
  {
    label: 'Remote',
    emoji: '🏔️',
    description: 'Remote location',
  },
  {
    label: 'Retreat',
    emoji: '🏝️',
    description: 'Retreat-style workspace',
  },
];

interface CategoryBoxProps {
  label: string;
  emoji: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ label, emoji, selected }) => {
  return (
    <Link
      href={`/?category=${label}`}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <div className="text-2xl">{emoji}</div>
      <div className="font-medium text-sm">{label}</div>
    </Link>
  );
};

// Client component for categories
const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto pb-2">
        {categories.map(item => (
          <CategoryBox
            key={item.label}
            label={item.label}
            emoji={item.emoji}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
