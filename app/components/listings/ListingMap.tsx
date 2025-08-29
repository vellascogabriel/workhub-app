'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Importação dinâmica do Map para evitar problemas de SSR
const Map = dynamic(() => import('@/app/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Carregando mapa...</div>
    </div>
  )
});

interface ListingMapProps {
  address: string;
  title: string;
}

const ListingMap: React.FC<ListingMapProps> = ({ address, title }) => {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Função para geocodificar o endereço
  const geocodeAddress = async (address: string): Promise<[number, number] | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return [parseFloat(lat), parseFloat(lon)];
      }
      return null;
    } catch (error) {
      console.error('Erro ao geocodificar endereço:', error);
      return null;
    }
  };

  // Garantir que o componente está montado no cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Buscar coordenadas quando o endereço mudar
  useEffect(() => {
    if (!isMounted || !address) {
      setIsLoading(false);
      return;
    }

    const fetchCoordinates = async () => {
      setIsLoading(true);
      const coords = await geocodeAddress(address);
      setCoordinates(coords);
      setIsLoading(false);
    };

    fetchCoordinates();
  }, [address, isMounted]);

  // Coordenadas padrão (São Paulo) caso não consiga geocodificar
  const defaultCenter: [number, number] = [-23.5505, -46.6333];
  
  const mapCenter = coordinates || defaultCenter;
  const mapPosition = coordinates;

  // Handler vazio para o mapa (não permite seleção)
  const handleLocationSelect = () => {
    // Não faz nada - este mapa é apenas para visualização
  };

  // Não renderizar nada no servidor
  if (!isMounted) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Carregando mapa...</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Carregando localização...</div>
      </div>
    );
  }

  if (!coordinates) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>Não foi possível localizar o endereço no mapa</p>
          <p className="text-sm mt-1">{address}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Localização
        </h3>
        <p className="text-gray-600 text-sm">
          {address}
        </p>
      </div>
      
      <div className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-200">
        <Map
          center={mapCenter}
          position={mapPosition}
          onSelectLocation={handleLocationSelect}
        />
      </div>
      
      <div className="mt-2 text-xs text-gray-500 text-center">
        Localização aproximada do workspace
      </div>
    </div>
  );
};

export default ListingMap;
