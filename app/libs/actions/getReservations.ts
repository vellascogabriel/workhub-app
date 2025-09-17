import prisma from "@/app/libs/db/prismadb";

export interface ReservationParams {
  userId?: string;
  listingId?: string;
  authorId?: string;
}

export default async function getReservations(
  params: ReservationParams
) {
  try {
    const { userId, listingId, authorId } = params;

    const query: any = {};
        
    if (userId) {
      query.userId = userId;
    }

    if (listingId) {
      query.listingId = listingId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Convert dates to strings to make them serializable
    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      updatedAt: reservation.updatedAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
        updatedAt: reservation.listing.updatedAt.toISOString(),
      },
      user: {
        ...reservation.user,
        createdAt: reservation.user.createdAt.toISOString(),
        updatedAt: reservation.user.updatedAt.toISOString(),
        emailVerified: reservation.user.emailVerified?.toISOString() || null,
      }
    }));

    return safeReservations;
  } catch (error: any) {
    console.error("Error fetching reservations:", error);
    throw new Error(error);
  }
}
