'use client';

import Container from "@/app/components/container/Container";
import Heading from "@/app/components/ui/Heading";
import ReservationCard from "@/app/components/reservations/ReservationCard";
import { useState } from "react";

interface Reservation {
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
}

interface TripsClientProps {
  reservations: Reservation[];
  currentUser?: Record<string, unknown>;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations
}) => {
  const [deletingId] = useState('');

  return (
    <Container>
      <div className="pt-8">
        <Heading
          title="Minhas Reservas"
          subtitle="Veja todas as suas reservas de espaços de trabalho"
        />
        <div 
          className="
            mt-10
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {reservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              disabled={deletingId === reservation.id}
              isOwner={false}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
 
export default TripsClient;
