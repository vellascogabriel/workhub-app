'use client';

import { useState } from 'react';
import CategoryInput from '@/app/components/inputs/CategoryInput';
import CategoryIcon from '@/app/components/workspace/CategoryIcon';
import { categories } from '@/app/components/categories/Categories';

// Função auxiliar para criar um componente de ícone para cada categoria
const createCategoryIcon = (category: string) => {
  return (props: { size?: number }) => <CategoryIcon category={category} {...props} />;
};

interface CategoryStepProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

const CategoryStep: React.FC<CategoryStepProps> = ({
  selectedCategory,
  setSelectedCategory
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">
          Which of these best describes your workspace?
        </h2>
        <p className="text-neutral-600 mt-2 text-sm">
          Pick a category
        </p>
      </div>
      
      <div 
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
          pb-2
        "
      >
        {categories.map((category) => {
          return (
            <div key={category.label} className="col-span-1">
              <CategoryInput
                key={category.label}
                label={category.label}
                Icon={createCategoryIcon(category.label)}
                selected={selectedCategory === category.label}
                onClick={setSelectedCategory}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryStep;
