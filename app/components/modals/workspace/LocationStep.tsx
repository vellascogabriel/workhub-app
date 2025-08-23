'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import ClientOnly from '@/app/components/ClientOnly';

// Componentes
const MapPlaceholder = () => (
  <div className="h-[35vh] rounded-lg bg-neutral-200 flex items-center justify-center">
    <div className="text-neutral-500">Carregando mapa...</div>
  </div>
);

// Importação dinâmica do mapa para evitar problemas de SSR
const Map = dynamic(() => import('@/app/components/Map'), { ssr: false, loading: MapPlaceholder });

// Tipos
interface LocationType {
  latlng: [number, number] | null;
  address: string;
}

interface LocationStepProps {
  location: LocationType;
  setLocation: (location: LocationType) => void;
}

const DEBOUNCE_DELAY = 500;

const LocationStep: React.FC<LocationStepProps> = ({ location, setLocation }) => {
  // Estados
  const [searchValue, setSearchValue] = useState(location.address || '');
  const [debouncedValue, setDebouncedValue] = useState(searchValue);

  // Debounce para a busca
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(searchValue), DEBOUNCE_DELAY);
    return () => clearTimeout(timer);
  }, [searchValue]);

  // Handlers
  const handleClear = useCallback(() => {
    setSearchValue('');
    setLocation({ latlng: null, address: '' });
  }, [setLocation]);

  const handleLocationSelect = useCallback(
    (latlng: [number, number], address?: string) => {
      const formattedAddress =
        address || `Lat: ${latlng[0].toFixed(4)}, Lng: ${latlng[1].toFixed(4)}`;
      setLocation({ latlng, address: formattedAddress });
      if (address) setSearchValue(address);
    },
    [setLocation]
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Cabeçalho */}
      <header>
        <h2 className="text-2xl font-bold">Where is your workspace located?</h2>
        <p className="text-neutral-600 mt-2 text-sm">Help guests find your workspace</p>
      </header>

      {/* Campo de busca */}
      <div className="relative">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <input
            type="text"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Search for a location..."
            className="w-full p-4 outline-none"
          />
          {searchValue && (
            <button
              onClick={handleClear}
              className="absolute right-3 p-2 text-gray-500 hover:text-gray-700"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Mapa */}
      <div className="mt-4 h-[35vh] relative">
        <ClientOnly>
          {/* Usar key com timestamp para forçar recriação completa do mapa quando necessário */}
          <Map
            key={`map-${location.latlng?.[0]}-${location.latlng?.[1]}-${Date.now()}`}
            center={location.latlng || undefined}
            position={location.latlng || undefined}
            onSelectLocation={handleLocationSelect}
            searchQuery={debouncedValue}
          />
        </ClientOnly>
      </div>
    </div>
  );
};

export default LocationStep;
