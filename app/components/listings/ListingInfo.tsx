'use client';

import { SafeUser } from "@/app/types";
import Avatar from "@/app/components/avatar/Avatar";
import { useMemo } from "react";

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  category: string;
  deskCount: number;
  meetingRoomCount: number;
  privateOfficeCount: number;
  capacity: number;
  amenities: string[];
  has24HourAccess: boolean;
  address: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  category,
  deskCount,
  meetingRoomCount,
  privateOfficeCount,
  capacity,
  amenities,
  has24HourAccess,
  address
}) => {
  // Format amenities for display
  const formattedAmenities = useMemo(() => {
    return amenities.join(', ');
  }, [amenities]);

  return ( 
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div 
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>
            {capacity} pessoas
          </div>
          <div>
            {deskCount} mesas
          </div>
          <div>
            {meetingRoomCount} salas de reunião
          </div>
          <div>
            {privateOfficeCount} escritórios privados
          </div>
        </div>
      </div>
      <hr />
      <div className="
        text-lg font-light text-neutral-500"
      >
        {description}
      </div>
      <hr />
      <div className="flex flex-col gap-6">
        <div className="text-lg font-semibold">
          Sobre este espaço
        </div>
        <div className="
          flex flex-col gap-4
        ">
          <div className="flex flex-row items-center gap-2">
            <div className="p-2 rounded-full bg-neutral-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <div className="font-light text-neutral-500">
              {address}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="p-2 rounded-full bg-neutral-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="font-light text-neutral-500">
              {has24HourAccess ? 'Acesso 24 horas' : 'Acesso em horário comercial'}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="p-2 rounded-full bg-neutral-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
            </div>
            <div className="font-light text-neutral-500">
              {category}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold">
          Comodidades
        </div>
        <div className="font-light text-neutral-500">
          {formattedAmenities}
        </div>
      </div>
    </div>
   );
}
 
export default ListingInfo;
