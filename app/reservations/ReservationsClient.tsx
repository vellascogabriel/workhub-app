'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import Container from "@/app/components/container/Container";
import Heading from "@/app/components/ui/Heading";
import ReservationCard from "@/app/components/reservations/ReservationCard";

interface ReservationsClientProps {
  reservations: any[];
  currentUser?: any;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = async (id: string) => {
    setDeletingId(id);

    try {
      await axios.delete(`/api/reservations/${id}`);
      toast.success('Reserva cancelada com sucesso');
      router.refresh();
    } catch (error) {
      toast.error('Algo deu errado');
    } finally {
      setDeletingId('');
    }
  };

  const onConfirm = async (id: string) => {
    setDeletingId(id);

    try {
      await axios.patch(`/api/reservations/${id}`, { status: 'confirmed' });
      toast.success('Reserva confirmada com sucesso');
      router.refresh();
    } catch (error) {
      toast.error('Algo deu errado');
    } finally {
      setDeletingId('');
    }
  };

  return (
    <Container>
      <div className="pt-8">
        <Heading
          title="Reservas dos seus espaços"
          subtitle="Gerencie as reservas dos seus espaços de trabalho"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {reservations.map((reservation: any) => (
            <div key={reservation.id} className="col-span-1">
              <ReservationCard
                reservation={reservation}
                disabled={deletingId === reservation.id}
                currentUser={currentUser}
                isOwner={true}
              />
              <div className="mt-2 flex gap-2">
                {reservation.status === 'pending' && (
                  <button
                    onClick={() => onConfirm(reservation.id)}
                    disabled={deletingId === reservation.id}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium transition disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    Confirmar
                  </button>
                )}
                {reservation.status !== 'cancelled' && (
                  <button
                    onClick={() => onCancel(reservation.id)}
                    disabled={deletingId === reservation.id}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium transition disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
 
export default ReservationsClient;
