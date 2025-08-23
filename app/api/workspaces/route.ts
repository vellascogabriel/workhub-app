// NextResponse é usado indiretamente através das funções de API
import prisma from '@/app/libs/db/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { createErrorResponse, createSuccessResponse } from '@/app/utils/api';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return createErrorResponse('Não autorizado', 401);
    }

    const body = await request.json();
    const {
      title,
      description,
      imageSrc,
      category,
      location,
      guestCount,
      roomCount,
      bathroomCount,
      price,
    } = body;

    // Validações básicas
    if (!title) {
      return createErrorResponse('Título é obrigatório', 400);
    }
    if (!description) {
      return createErrorResponse('Descrição é obrigatória', 400);
    }
    if (!imageSrc) {
      return createErrorResponse('Imagem é obrigatória', 400);
    }
    if (!category) {
      return createErrorResponse('Categoria é obrigatória', 400);
    }
    if (!location) {
      return createErrorResponse('Localização é obrigatória', 400);
    }
    if (!price || price <= 0) {
      return createErrorResponse('Preço deve ser maior que zero', 400);
    }

    // Criar o workspace no banco de dados
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc: [imageSrc], // O schema espera um array de strings
        category,
        locationValue: location.address,
        address: location.address,
        deskCount: guestCount, // Usando guestCount como deskCount
        meetingRoomCount: roomCount, // Usando roomCount como meetingRoomCount
        privateOfficeCount: bathroomCount, // Usando bathroomCount como privateOfficeCount
        capacity: guestCount, // Usando guestCount como capacidade
        amenities: [], // Array vazio por padrão
        price: Math.round(price * 100), // Convertendo para centavos e arredondando
        userId: currentUser.id,
      },
    });

    return createSuccessResponse(listing, 201);
  } catch (error) {
    console.error('[WORKSPACES_POST]', error);
    return createErrorResponse('Erro interno do servidor', 500);
  }
}
