'use client';

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Image from "next/image";
import Button from "@/app/components/ui/buttons/Button";
import { toast } from "react-hot-toast";
import axios from "axios";

interface ReservationCardProps {
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
    };
  };
  disabled?: boolean;
  isOwner?: boolean;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  disabled,
  isOwner = false
}) => {
  const router = useRouter();

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    axios.delete(`/api/reservations/${reservation.id}`)
      .then(() => {
        toast.success('Reserva cancelada com sucesso');
        router.refresh();
      })
      .catch(() => {
        toast.error('Algo deu errado');
      });
  }, [disabled, reservation.id, router]);

  const price = useMemo(() => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(reservation.totalPrice / 100);
  }, [reservation.totalPrice]);

  const startDate = useMemo(() => {
    return format(new Date(reservation.startDate), 'dd/MM/yyyy', { locale: ptBR });
  }, [reservation.startDate]);

  const endDate = useMemo(() => {
    return format(new Date(reservation.endDate), 'dd/MM/yyyy', { locale: ptBR });
  }, [reservation.endDate]);

  const statusLabel = useMemo(() => {
    const statusMap: Record<string, { label: string, color: string }> = {
      'pending': { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
      'confirmed': { label: 'Confirmada', color: 'bg-green-100 text-green-800' },
      'cancelled': { label: 'Cancelada', color: 'bg-red-100 text-red-800' }
    };

    return statusMap[reservation.status] || { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' };
  }, [reservation.status]);

  const handleCardClick = () => {
    // Navigate to the reservation details page
    if (isOwner) {
      router.push(`/reservations/${reservation.id}`);
    } else {
      router.push(`/trips/${reservation.id}`);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="
        col-span-1 
        cursor-pointer 
        group 
        bg-white
        border-[1px]
        border-neutral-200
        rounded-xl
        overflow-hidden
        transition
        hover:shadow-md
      "
    >
      <div className="flex flex-col gap-2 w-full">
        <div 
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden
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
            src={reservation.listing.imageSrc[0] || '/images/placeholder.png'}
            alt={reservation.listing.title}
          />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">
              {reservation.listing.title}
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusLabel.color}`}>
              {statusLabel.label}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {reservation.listing.address}
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <span className="text-sm">
                {startDate} até {endDate}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
              <span className="text-sm font-semibold">
                {price}
              </span>
            </div>
          </div>
          <div className="mt-4">
            {reservation.status !== 'cancelled' && (
              <Button
                disabled={disabled}
                small
                label="Cancelar reserva"
                onClick={handleCancel}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationCard;
