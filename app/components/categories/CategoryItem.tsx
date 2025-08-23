'use client';

import Link from 'next/link';
import {
  GiOfficeChair,
  GiDesk,
  GiCoffeeCup,
  GiWifiRouter,
  GiDoorHandle,
  GiModernCity,
  GiPalmTree,
  GiCaveEntrance,
  GiBookCover,
  GiSofa,
  GiMountains,
  GiIsland,
} from 'react-icons/gi';

// Map of icon names to their components
const iconMap = {
  GiOfficeChair,
  GiDesk,
  GiCoffeeCup,
  GiWifiRouter,
  GiDoorHandle,
  GiModernCity,
  GiPalmTree,
  GiCaveEntrance,
  GiBookCover,
  GiSofa,
  GiMountains,
  GiIsland,
};

interface CategoryItemProps {
  selected?: boolean;
  label: string;
  iconName: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ selected, label, iconName }) => {
  // Get the icon component from the map
  const Icon = iconMap[iconName as keyof typeof iconMap];

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
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </Link>
  );
};

// Make sure to export the component properly
export default CategoryItem;

// Also export the types for better imports
export type { CategoryItemProps };
