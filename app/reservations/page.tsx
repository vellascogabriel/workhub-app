import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/libs/actions/getCurrentUser";
import getReservations from "@/app/libs/actions/getReservations";

import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Não autorizado"
          subtitle="Por favor, faça login para visualizar as reservas"
        />
      </ClientOnly>
    );
  }

  // Buscar reservas onde o usuário atual é o proprietário do espaço
  const reservations = await getReservations({ 
    authorId: currentUser.id
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Nenhuma reserva encontrada"
          subtitle="Parece que não há reservas para seus espaços de trabalho."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ReservationsPage;
