'use client';

import { useEffect, useState, useCallback } from 'react';
import 'leaflet/dist/leaflet.css';

// Verificar se estamos no navegador ou no servidor
const isBrowser = typeof window !== 'undefined';

// Interface para as props do componente Map
interface MapProps {
  center?: [number, number];
  position?: [number, number] | null;
  onSelectLocation: (latlng: [number, number], address?: string) => void;
  searchQuery?: string;
}

// Estilos comuns
const mapContainerStyle = {
  height: '100%', 
  width: '100%', 
  borderRadius: '0.5rem'
};

const loadingContainerStyle = {
  ...mapContainerStyle,
  backgroundColor: '#f0f0f0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

// Componente de carregamento
const MapLoading = () => (
  <div style={loadingContainerStyle}>
    <div>Carregando mapa...</div>
  </div>
);

// Tipos para os módulos
interface LeafletMap {
  setView: (center: [number, number], zoom: number) => void;
  _loaded?: boolean;
}

interface MapContainerProps {
  center: [number, number];
  zoom: number;
  style: Record<string, string | number>;
  whenReady: () => void;
  key: string;
  children: React.ReactNode;
}

interface TileLayerProps {
  attribution: string;
  url: string;
}

interface MarkerProps {
  position: [number, number];
}

// Tipo para o objeto Leaflet
interface LeafletType {
  Icon: {
    Default: {
      prototype: Record<string, unknown>;
      mergeOptions: (options: Record<string, string>) => void;
    };
  };
}

interface LeafletModules {
  L: LeafletType;
  MapContainer: React.ComponentType<MapContainerProps>;
  TileLayer: React.ComponentType<TileLayerProps>;
  Marker: React.ComponentType<MarkerProps>;
  useMap: () => LeafletMap;
  useMapEvents: (events: Record<string, (e: { latlng: { lat: number; lng: number } }) => void>) => void;
}

// Inicialização dos módulos
const modules: Partial<LeafletModules> = {};

// Carregar módulos apenas no cliente
if (isBrowser) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    modules.L = require('leaflet');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const reactLeaflet = require('react-leaflet');
    modules.MapContainer = reactLeaflet.MapContainer;
    modules.TileLayer = reactLeaflet.TileLayer;
    modules.Marker = reactLeaflet.Marker;
    modules.useMap = reactLeaflet.useMap;
    modules.useMapEvents = reactLeaflet.useMapEvents;
  } catch (error) {
    console.error('Error loading Leaflet modules:', error);
  }
}

// Hooks reutilizáveis para evitar chamadas condicionais
const useReverseGeocode = () => {
  return useCallback(async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      
      return data?.display_name || `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
    } catch (error) {
      console.error('Error in reverse geocoding:', error);
      return `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
    }
  }, []);
};

// Componente Map que será renderizado apenas no cliente
const MapComponent = ({ 
  center = [51.505, -0.09], 
  position, 
  onSelectLocation, 
  searchQuery 
}: MapProps) => {
  // Estado para controlar inicialização do mapa
  const [mapInitialized, setMapInitialized] = useState(false);
  const [mapKey] = useState(() => `map-${Date.now()}`);
  const reverseGeocode = useReverseGeocode();
  
  // Hooks sempre chamados incondicionalmente
  useEffect(() => {
    // Configurar os ícones do Leaflet
    if (isBrowser && modules.L && modules.L.Icon) {
      // Corrigir os ícones do Leaflet no Next.js
      const prototype = modules.L.Icon.Default.prototype as Record<string, unknown>;
      // Remover _getIconUrl se existir
      if ('_getIconUrl' in prototype) {
        delete prototype._getIconUrl;
      }
      modules.L.Icon.Default.mergeOptions({
        iconUrl: '/images/marker-icon.png',
        iconRetinaUrl: '/images/marker-icon-2x.png',
        shadowUrl: '/images/marker-shadow.png',
      });
    }
    
    // Adicionar um delay para garantir que o DOM está pronto
    const timer = setTimeout(() => {
      setMapInitialized(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handler para eventos de clique no mapa
  const handleMapClick = useCallback(async (e: { latlng: { lat: number; lng: number } }) => {
    const { lat, lng } = e.latlng;
    const newPosition: [number, number] = [lat, lng];
    
    const address = await reverseGeocode(lat, lng);
    onSelectLocation(newPosition, address);
  }, [onSelectLocation, reverseGeocode]);
  
  // Verificar se os módulos estão disponíveis
  if (!isBrowser || !modules.L || !modules.MapContainer) {
    return <MapLoading />;
  }
  
  // Componente para atualizar a visualização do mapa
  const MapUpdater = () => {
    const map = modules.useMap?.();
    
    useEffect(() => {
      if (!map || !map._loaded) return;
      
      try {
        map.setView(center, 13);
      } catch (error) {
        console.error('Error setting map view:', error);
      }
    }, [map]);
    
    return null;
  };
  
  // Componente para buscar localização a partir de uma string
  const GeocoderControl = () => {
    const map = modules.useMap?.();
    const query = searchQuery; // Capturar o valor atual em uma variável local
    
    useEffect(() => {
      if (!query || !map || !map._loaded) return;
      
      const searchLocation = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
          );
          const data = await response.json();
          
          if (data && data.length > 0) {
            const { lat, lon, display_name } = data[0];
            const latlng: [number, number] = [parseFloat(lat), parseFloat(lon)];
            
            if (map && map._loaded) {
              try {
                map.setView(latlng, 13);
                onSelectLocation(latlng, display_name);
              } catch (error) {
                console.error('Error setting map view after search:', error);
              }
            }
          }
        } catch (error) {
          console.error('Error searching location:', error);
        }
      };
      
      const timer = setTimeout(searchLocation, 1500);
      return () => clearTimeout(timer);
    }, [map, query]); // query é uma variável local, não uma prop
    
    return null;
  };
  
  // Componente para lidar com eventos do mapa
  const MapEvents = () => {
    try {
      modules.useMapEvents?.({
        click: mapInitialized ? handleMapClick : () => {}
      });
    } catch (error) {
      console.error('Error setting up map events:', error);
    }
    
    return null;
  };
  
  const MapContainer = modules.MapContainer;
  const TileLayer = modules.TileLayer;
  const Marker = modules.Marker;
  
  if (!MapContainer || !TileLayer || !Marker) {
    return <MapLoading />;
  }
  
  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <MapContainer
        key={mapKey}
        center={center}
        zoom={13}
        style={mapContainerStyle}
        whenReady={() => setMapInitialized(true)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && <Marker position={position} />}
        <MapUpdater />
        <GeocoderControl />
        <MapEvents />
      </MapContainer>
    </div>
  );
};

// Componente Map principal com carregamento dinâmico
const Map: React.FC<MapProps> = (props) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Garantir que estamos no cliente
    if (!isBrowser) return;
    
    // Limpar quaisquer mapas Leaflet antigos que possam estar na memória
    document.querySelectorAll('.leaflet-container').forEach(container => {
      if (container && container.parentNode) {
        try {
          container.innerHTML = '';
        } catch (e) {
          console.error('Error cleaning up old map containers:', e);
        }
      }
    });
    
    // Definir que o componente foi montado
    setMounted(true);
    
    // Limpar recursos do Leaflet quando o componente for desmontado
    return () => {
      if (isBrowser) {
        try {
          document.querySelectorAll('.leaflet-container').forEach(container => {
            if (container && container.parentNode) {
              container.innerHTML = '';
            }
          });
          
          document.querySelectorAll('style[data-leaflet]').forEach(style => {
            if (style && style.parentNode) {
              style.parentNode.removeChild(style);
            }
          });
        } catch (e) {
          console.error('Error during map cleanup:', e);
        }
      }
    };
  }, []);
  
  // Renderizar um placeholder quando estiver no servidor ou não estiver montado
  if (!isBrowser || !mounted) {
    return <MapLoading />;
  }
  
  return <MapComponent {...props} />;
};

export default Map;
