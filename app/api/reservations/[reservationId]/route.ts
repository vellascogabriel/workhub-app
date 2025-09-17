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

export async function PATCH(
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

    // Verificar se o usuário é o proprietário do espaço
    const reservationAndListing = await prisma.reservation.findUnique({
      where: {
        id: reservationId
      },
      include: {
        listing: true
      }
    });

    if (!reservationAndListing) {
      return createErrorResponse("Reserva não encontrada", 404);
    }

    // Verificar se o usuário atual é o proprietário do espaço
    if (reservationAndListing.listing.userId !== currentUser.id) {
      return createErrorResponse("Não autorizado", 401);
    }

    // Obter o novo status da reserva do corpo da requisição
    const body = await request.json();
    const { status } = body;

    if (!status || !['pending', 'confirmed', 'cancelled'].includes(status)) {
      return createErrorResponse("Status inválido", 400);
    }

    // Atualizar o status da reserva
    const updatedReservation = await prisma.reservation.update({
      where: {
        id: reservationId
      },
      data: {
        status
      }
    });

    return createSuccessResponse(updatedReservation, 200);
  } catch (error) {
    console.error("[RESERVATION_PATCH]", error);
    return createErrorResponse("Erro interno do servidor", 500);
  }
}
