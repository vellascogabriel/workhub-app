'use client';

import { useState } from "react";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import Container from "@/app/components/container/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/buttons/Button";

interface CurrentUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface ReservationDetailsProps {
  reservation: {
    id: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    bookingType: string;
    status: string;
    listing: {
      id: string;
      title: string;
      imageSrc: string[];
      address: string;
      price: number;
      description: string;
      category: string;
      deskCount: number;
      meetingRoomCount: number;
      privateOfficeCount: number;
      capacity: number;
      amenities: string[];
      has24HourAccess: boolean;
    };
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
    };
  };
  currentUser?: CurrentUser;
  isOwner?: boolean;
}

const ReservationDetails: React.FC<ReservationDetailsProps> = ({
  reservation,
  isOwner = false
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const startDate = format(new Date(reservation.startDate), 'dd/MM/yyyy', { locale: ptBR });
  const endDate = format(new Date(reservation.endDate), 'dd/MM/yyyy', { locale: ptBR });
  
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(reservation.totalPrice / 100);

  const statusMap: Record<string, { label: string, color: string }> = {
    'pending': { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
    'confirmed': { label: 'Confirmada', color: 'bg-green-100 text-green-800' },
    'cancelled': { label: 'Cancelada', color: 'bg-red-100 text-red-800' }
  };

  const statusInfo = statusMap[reservation.status] || statusMap.pending;

  const handleCancel = async () => {
    setIsLoading(true);
    
    try {
      await axios.delete(`/api/reservations/${reservation.id}`);
      toast.success('Reserva cancelada com sucesso');
      router.push('/trips');
      router.refresh();
    } catch {
      toast.error('Algo deu errado ao cancelar a reserva');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    
    try {
      await axios.patch(`/api/reservations/${reservation.id}`, { status: 'confirmed' });
      toast.success('Reserva confirmada com sucesso');
      router.refresh();
    } catch {
      toast.error('Algo deu errado ao confirmar a reserva');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto pt-8">
        <div className="flex flex-col gap-6">
          <Heading
            title="Detalhes da Reserva"
            subtitle={`Informações sobre sua reserva em ${reservation.listing.title}`}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10">
            {/* Detalhes do espaço */}
            <div className="col-span-1 md:col-span-4">
              <div className="flex flex-col gap-4">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                  <Image
                    fill
                    className="object-cover h-full w-full"
                    src={reservation.listing.imageSrc[0] || '/images/placeholder.png'}
                    alt={reservation.listing.title}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="text-xl font-semibold">{reservation.listing.title}</div>
                  <div className="text-sm text-gray-500">{reservation.listing.address}</div>
                  <div className="text-sm">{reservation.listing.description}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium">Categoria</div>
                    <div className="text-sm text-gray-500">{reservation.listing.category}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium">Capacidade</div>
                    <div className="text-sm text-gray-500">{reservation.listing.capacity} pessoas</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium">Mesas</div>
                    <div className="text-sm text-gray-500">{reservation.listing.deskCount}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium">Salas de Reunião</div>
                    <div className="text-sm text-gray-500">{reservation.listing.meetingRoomCount}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Detalhes da reserva */}
            <div className="col-span-1 md:col-span-3 mt-6 md:mt-0">
              <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
                <div className="p-4 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">Detalhes da Reserva</div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                      {statusInfo.label}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      <span>
                        {startDate} até {endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                      </svg>
                      <span className="font-semibold">
                        {formattedPrice}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      <span>
                        {isOwner ? 'Reservado por: ' + (reservation.user.name || 'Usuário') : 'Sua reserva'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-col gap-2">
                    {reservation.status !== 'cancelled' && !isOwner && (
                      <Button
                        disabled={isLoading}
                        label="Cancelar reserva"
                        onClick={handleCancel}
                      />
                    )}
                    
                    {isOwner && reservation.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          disabled={isLoading}
                          label="Confirmar reserva"
                          onClick={handleConfirm}
                        />
                        <Button
                          disabled={isLoading}
                          label="Recusar reserva"
                          onClick={handleCancel}
                          outline
                        />
                      </div>
                    )}
                    
                    <Button
                      disabled={isLoading}
                      label="Ver espaço"
                      onClick={() => router.push(`/listings/${reservation.listing.id}`)}
                      outline
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ReservationDetails;
