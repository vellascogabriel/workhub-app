'use client';

import Image from 'next/image';
// useRouter comentado pois não está sendo usado no momento
// import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

// Tipo modificado para compatibilidade com os dados retornados por getCurrentUser
type SafeUser = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: string | null;
  image: string | null;
  hashedPassword: string | null;
  createdAt: string;
  updatedAt: string;
  favoriteIds: string[];
};

// Tipo modificado para compatibilidade com os dados retornados por getListings
type SafeListing = {
  id: string;
  title: string;
  description: string;
  imageSrc: string[];
  category: string;
  locationValue: string;
  address: string;
  deskCount: number;
  meetingRoomCount: number;
  privateOfficeCount: number;
  capacity: number;
  amenities: string[];
  price: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  has24HourAccess: boolean;
};

// Corrigindo caminho de importação
import HeartButton from '@/app/components/ui/buttons/HeartButton';

interface ListingCardProps {
  data: SafeListing;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({ data, currentUser }) => {
  // Router temporariamente comentado pois não está sendo usado
  // const router = useRouter();

  // Temporariamente desabilitado o redirecionamento
  const handleClick = useCallback(() => {
    // Não faz nada por enquanto, apenas para manter o efeito hover
    // router.push(`/listings/${data.id}`);
  }, []);

  // Formatar o preço como moeda brasileira - sem usar useEffect para evitar erro de hidratação
  const formattedPrice = `R$ ${(data.price / 100).toFixed(2).replace('.', ',')}`;

  return (
    <div
      onClick={handleClick}
      className="col-span-1 cursor-pointer group transition duration-200 ease-in-out hover:shadow-lg hover:scale-[1.02] hover:border-[0.5px] hover:border-neutral-300 rounded-xl relative p-1"
    >
      <div className="flex flex-col gap-2 w-full">
        {/* Badge que aparece apenas no hover */}
        <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded-full text-xs font-medium text-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm z-10">
          Em breve
        </div>
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc[0]}
            alt="Listing"
          />
          <div
            className="
            absolute
            top-3
            right-3
          "
          >
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">{data.title}</div>
        <div className="font-light text-neutral-500">{data.category}</div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">{formattedPrice}</div>
          <div className="font-light">/ dia</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
