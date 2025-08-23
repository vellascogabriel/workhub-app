'use client';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

/**
 * Componente Counter para incrementar e decrementar valores numéricos
 * Usado para selecionar quantidades como número de lugares, salas, etc.
 */
const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
  min = 0,
  max = 20,
}) => {
  // Função para decrementar o valor
  const handleDecrease = useCallback(() => {
    if (value > min) {
      onChange(value - 1);
    }
  }, [value, min, onChange]);

  // Função para incrementar o valor
  const handleIncrease = useCallback(() => {
    if (value < max) {
      onChange(value + 1);
    }
  }, [value, max, onChange]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={handleDecrease}
          disabled={value <= min}
          className={`
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
            ${value <= min ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          aria-label="Decrease"
        >
          <AiOutlineMinus />
        </button>
        <div className="font-light text-xl text-neutral-600 w-6 text-center">{value}</div>
        <button
          onClick={handleIncrease}
          disabled={value >= max}
          className={`
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
            ${value >= max ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          aria-label="Increase"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
