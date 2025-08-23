import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  category?: string;
  locationValue?: string;
  startDate?: string;
  endDate?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    // Garantir que params seja um objeto válido
    const safeParams = params || {};
    
    // Desestruturar com valores padrão para evitar undefined
    const {
      userId,
      category,
      locationValue,
      startDate,
      endDate,
      guestCount,
      roomCount,
      bathroomCount,
    } = safeParams;

    const query: Record<string, unknown> = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (guestCount) {
      query.deskCount = {
        gte: +guestCount
      };
    }

    if (roomCount) {
      query.meetingRoomCount = {
        gte: +roomCount
      };
    }

    if (bathroomCount) {
      query.privateOfficeCount = {
        gte: +bathroomCount
      };
    }

    // Buscar os workspaces com os filtros aplicados
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Formatar os dados para uso no cliente
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
    }));

    return safeListings;
  } catch (error: unknown) {
    console.error("Error in getListings:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
