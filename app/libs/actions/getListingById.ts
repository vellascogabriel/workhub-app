import prisma from '@/app/libs/db/prismadb';

type Params = {
  listingId: string;
}

// Define the SafeListing type for the return value
type SafeUser = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  hashedPassword: string | null;
  favoriteIds: string[];
}

type SafeListing = {
  id: string;
  title: string;
  description: string;
  imageSrc: string[] | string;
  createdAt: string;
  updatedAt: string;
  category: string;
  deskCount: number;
  meetingRoomCount: number;
  privateOfficeCount: number;
  capacity: number;
  amenities: string[];
  has24HourAccess: boolean;
  address: string;
  price: number;
  userId: string;
  user: SafeUser;
}

export default async function getListingById(params: Params): Promise<SafeListing | null> {
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
