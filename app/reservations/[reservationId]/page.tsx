import getCurrentUser from "@/app/libs/actions/getCurrentUser";
import getReservations from "@/app/libs/actions/getReservations";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import ReservationDetails from "@/app/components/reservations/ReservationDetails";

// Let Next.js infer PageProps to avoid mismatches with generated types
const ReservationManagePage = async (props: unknown) => {
  const { params } = props as { params: { reservationId: string } };
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Não autorizado"
          subtitle="Por favor, faça login para gerenciar reservas"
        />
      </ClientOnly>
    );
  }

  // Buscar reservas onde o usuário atual é o proprietário do espaço
  const reservations = await getReservations({
    authorId: currentUser.id
  });

  const reservation = reservations.find((res) => res.id === params.reservationId);

  if (!reservation) {
    return (
      <ClientOnly>
        <EmptyState
          title="Reserva não encontrada"
          subtitle="Esta reserva não existe ou você não tem permissão para visualizá-la"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationDetails
        reservation={reservation}
        currentUser={currentUser}
        isOwner={true}
      />
    </ClientOnly>
  );
};

export default ReservationManagePage;
