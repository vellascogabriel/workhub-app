'use client';

import { ChangeEvent } from 'react';
import Heading from '@/app/components/modals/Heading';

interface DescriptionStepProps {
  title: string;
  description: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
}

const DescriptionStep: React.FC<DescriptionStepProps> = ({
  title,
  description,
  setTitle,
  setDescription,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="Como você descreveria seu espaço?" subtitle="Curto e doce funciona melhor!" />
      <div className="w-full relative">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Título
        </label>
        <input
          id="title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="
            w-full
            p-4
            pt-6
            font-light
            bg-white
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            focus:border-black
          "
          placeholder="Título do seu espaço de coworking"
          required
        />
      </div>
      <div className="w-full">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Descrição
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          className="
            w-full
            p-4
            pt-6
            font-light
            bg-white
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            focus:border-black
          "
          placeholder="Descreva seu espaço de coworking..."
          rows={5}
        />
      </div>
    </div>
  );
};

export default DescriptionStep;
