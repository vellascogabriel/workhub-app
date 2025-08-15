import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { createSuccessResponse, createErrorResponse } from "@/app/utils/api";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            email,
            name,
            password,
        } = body;

        // Validate required fields
        if (!email || !name || !password) {
            return createErrorResponse('Missing required fields', 400);
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return createErrorResponse('Email already in use', 422);
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
            }
        });

        // Return user without the hashed password
        const { hashedPassword: _, ...userWithoutPassword } = user;
        
        return createSuccessResponse(userWithoutPassword, 201);
    } catch (error) {
        console.error('Registration error:', error);
        
        return createErrorResponse('An error occurred during registration', 500);
    }
}
