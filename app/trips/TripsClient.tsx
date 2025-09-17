'use client';

import { useRouter } from "next/navigation";
import Container from "@/app/components/container/Container";
import Heading from "@/app/components/ui/Heading";
import ReservationCard from "@/app/components/reservations/ReservationCard";
import { useState } from "react";

interface TripsClientProps {
  reservations: any[];
  currentUser?: any;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

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
          {reservations.map((reservation: any) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              disabled={deletingId === reservation.id}
              currentUser={currentUser}
              isOwner={false}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
 
export default TripsClient;
