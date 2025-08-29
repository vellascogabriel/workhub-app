import prisma from '@/app/libs/db/prismadb';

interface PageParams {
  listingId: string;
}

export default async function getListingById(params: PageParams) {
  try {
    const { listingId } = params;

    // Buscar o workspace específico pelo ID
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    // Formatar os dados para uso no cliente
    const safeListing = {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      }
    };

    return safeListing;
  } catch (error: unknown) {
    console.error('Error in getListingById:', error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
