'use client';

import Counter from '@/app/components/inputs/Counter';

interface InfoStepProps {
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  setGuestCount: (value: number) => void;
  setRoomCount: (value: number) => void;
  setBathroomCount: (value: number) => void;
}

/**
 * Componente para o terceiro passo do fluxo de criação de workspace
 * Permite definir informações básicas como número de lugares, salas e banheiros
 */
function InfoStep({
  guestCount,
  roomCount,
  bathroomCount,
  setGuestCount,
  setRoomCount,
  setBathroomCount
}: InfoStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">
          Share some basics about your workspace
        </h2>
        <p className="text-neutral-600 mt-2 text-sm">
          What amenities do you have?
        </p>
      </div>
      
      <div className="flex flex-col gap-8 max-w-md mx-auto w-full">
        <Counter 
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={setGuestCount}
          min={1}
          max={50}
        />
        
        <Counter 
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={setRoomCount}
          min={1}
          max={20}
        />
        
        <Counter 
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={setBathroomCount}
          min={1}
          max={10}
        />
      </div>
    </div>
  );
}

// Adicionar displayName para resolver erro de ESLint
InfoStep.displayName = 'InfoStep';

export default InfoStep;
