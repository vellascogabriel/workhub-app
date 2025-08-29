import prisma from "@/app/libs/db/prismadb";
import getCurrentUser from "@/app/libs/actions/getCurrentUser";
import { createSuccessResponse, createErrorResponse } from "@/app/utils/api";

export async function DELETE(
  request: Request
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return createErrorResponse("Não autorizado", 401);
    }

    // Extrair o ID da reserva da URL
    const url = new URL(request.url);
    const reservationId = url.pathname.split('/').pop();

    if (!reservationId) {
      return createErrorResponse("ID da reserva não fornecido", 400);
    }

    // Buscar e excluir a reserva
    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } }
        ]
      }
    });

    return createSuccessResponse(reservation, 200);
  } catch (error) {
    console.error("[RESERVATION_DELETE]", error);
    return createErrorResponse("Erro interno do servidor", 500);
  }
}
