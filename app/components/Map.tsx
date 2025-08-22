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

// Componente Map que será renderizado apenas no cliente
const MapComponent = ({ 
  center = [51.505, -0.09], 
  position, 
  onSelectLocation, 
  searchQuery 
}: MapProps) => {
  // Importar Leaflet e react-leaflet apenas no lado do cliente
  const L = require('leaflet');
  const { MapContainer, TileLayer, Marker, useMap, useMapEvents } = require('react-leaflet');
  
  // Estado para controlar inicialização do mapa
  const [mapInitialized, setMapInitialized] = useState(false);
  
  // Configurar os ícones do Leaflet
  useEffect(() => {
    // Corrigir os ícones do Leaflet no Next.js
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: '/images/marker-icon.png',
      iconRetinaUrl: '/images/marker-icon-2x.png',
      shadowUrl: '/images/marker-shadow.png',
    });
  }, [L.Icon.Default]);
  
  // Função para fazer geocodificação reversa
  const reverseGeocode = useCallback(async (lat: number, lng: number): Promise<string> => {
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
  
  // Componente para atualizar a visualização do mapa
  const MapUpdater = () => {
    const map = useMap();
    
    useEffect(() => {
      if (center && mapInitialized) {
        try {
          map.setView(center, 13);
        } catch (error) {
          console.error('Error setting map view:', error);
        }
      }
    }, [center, map, mapInitialized]);
    
    return null;
  };
  
  // Componente para buscar localização a partir de uma string
  const GeocoderControl = () => {
    const map = useMap();
    
    useEffect(() => {
      // Verificar se a busca está vazia ou se o mapa não está inicializado
      if (!searchQuery || !mapInitialized) return;
      
      // Verificar se o mapa está pronto para ser usado
      if (!map || !map._loaded) return;
      
      const searchLocation = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
          );
          const data = await response.json();
          
          if (data && data.length > 0) {
            const { lat, lon, display_name } = data[0];
            const latlng: [number, number] = [parseFloat(lat), parseFloat(lon)];
            
            // Verificar novamente se o mapa ainda está disponível antes de usar
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
      
      // Dar mais tempo para o mapa inicializar completamente
      const timer = setTimeout(searchLocation, 1500);
      return () => clearTimeout(timer);
    }, [searchQuery, map, mapInitialized]);
    
    return null;
  };
  
  // Componente para lidar com eventos do mapa
  const MapEvents = () => {
    // Garantir que o mapa está completamente inicializado
    if (!mapInitialized) return null;
    
    try {
      // Usar um ref para evitar chamadas repetidas
      const eventHandlerRef = useCallback(async (e: { latlng: { lat: number; lng: number } }) => {
        const { lat, lng } = e.latlng;
        const newPosition: [number, number] = [lat, lng];
        
        const address = await reverseGeocode(lat, lng);
        onSelectLocation(newPosition, address);
      }, [reverseGeocode, onSelectLocation]);
      
      // Registrar eventos apenas quando o mapa estiver pronto
      useMapEvents({
        click: eventHandlerRef
      });
    } catch (error) {
      console.error('Error setting up map events:', error);
    }
    
    return null;
  };
  
  // Usar key única para forçar recriação completa do mapa quando o centro mudar
  const mapKey = `map-${center[0]}-${center[1]}-${Date.now()}`;
  
  // Adicionar um delay para garantir que o DOM está pronto
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapInitialized(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div style={mapContainerStyle} className="leaflet-container-wrapper">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={mapContainerStyle}
        key={mapKey}
        whenReady={() => setMapInitialized(true)}
        attributionControl={false} // Remover controle de atribuição para simplificar
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {position && <Marker position={position} />}
        
        {/* Só renderizar componentes internos quando o mapa estiver inicializado */}
        {mapInitialized && (
          <>
            <MapEvents />
            <MapUpdater />
            <GeocoderControl />
          </>
        )}
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
          // Forçar a remoção de quaisquer eventos ou referências
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
          // Tentar limpar quaisquer mapas Leaflet que possam estar na memória
          document.querySelectorAll('.leaflet-container').forEach(container => {
            if (container && container.parentNode) {
              container.innerHTML = '';
            }
          });
          
          // Limpar quaisquer elementos de estilo do Leaflet que possam ter sido adicionados
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
