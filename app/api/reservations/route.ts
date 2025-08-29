import { NextResponse } from "next/server";
import prisma from "@/app/libs/db/prismadb";
import getCurrentUser from "@/app/libs/actions/getCurrentUser";
import { createSuccessResponse, createErrorResponse } from "@/app/utils/api";

export async function POST(
  request: Request
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return createErrorResponse("Não autorizado", 401);
    }

    const body = await request.json();
    const { 
      listingId,
      startDate,
      endDate,
      totalPrice
    } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return createErrorResponse("Dados incompletos", 400);
    }

    // Verificar se o workspace existe
    const listingAndReservation = await prisma.listing.update({
      where: {
        id: listingId
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice: parseInt(totalPrice, 10),
            bookingType: "daily", // Default to daily booking type
          }
        }
      }
    });

    return createSuccessResponse(listingAndReservation, 201);
  } catch (error) {
    console.error("[RESERVATIONS_POST]", error);
    return createErrorResponse("Erro interno do servidor", 500);
  }
}
