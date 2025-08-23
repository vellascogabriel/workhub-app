'use client';

import { useMemo, useState, useEffect, ChangeEvent } from 'react';
import Heading from '@/app/components/modals/Heading';
import { useWorkspaceModal } from '@/app/context/WorkspaceModalContext';

interface PriceStepProps {
  price: number;
  setPrice: (price: number) => void;
}

const PriceStep: React.FC<PriceStepProps> = ({
  price,
  setPrice
}) => {
  const { workspaceData } = useWorkspaceModal();
  const [displayValue, setDisplayValue] = useState('');

  // Formatar o valor inicial quando o componente é montado ou quando o preço muda externamente
  useEffect(() => {
    if (price > 0) {
      // Multiplica por 100 para converter de reais para centavos antes de formatar
      const priceInCents = Math.round(price * 100);
      setDisplayValue(formatCurrency(priceInCents.toString()));
    } else {
      setDisplayValue('');
    }
  }, [price]);

  // Função para formatar o valor como moeda
  const formatCurrency = (value: string): string => {
    // Remove todos os caracteres não numéricos
    const numericValue = value.replace(/\D/g, '');
    
    // Converte para número
    const number = parseInt(numericValue) || 0;
    
    // Formata o número com separadores de milhar e duas casas decimais
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(number / 100);
  };

  // Função para lidar com a mudança no campo de preço
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Remove todos os caracteres não numéricos
    const numericValue = inputValue.replace(/\D/g, '');
    
    // Converte para número (considerando os centavos)
    const number = parseInt(numericValue) || 0;
    
    // Atualiza o estado com o valor formatado
    setDisplayValue(formatCurrency(numericValue));
    
    // Atualiza o preço no contexto (valor em reais com centavos)
    // Divide por 100 para converter de centavos para reais
    setPrice(number / 100);
  };

  const bodyContent = useMemo(() => (
    <div className="flex flex-col gap-8">
      <Heading
        title="Agora, defina seu preço"
        subtitle="Quanto você deseja cobrar por dia?"
      />
      <div className="w-full relative">
        <label 
          htmlFor="price" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Preço
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            R$
          </span>
          <input
            id="price"
            type="text"
            value={displayValue}
            onChange={handlePriceChange}
            className="
              w-full
              p-4
              pl-10
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
            placeholder="0"
            required
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Preço por dia de utilização do espaço
        </p>
      </div>
    </div>
  ), [displayValue]);

  return bodyContent;
};

export default PriceStep;
