/**
 * Auth configuration for the app
 * This file re-exports from the Pages Router authentication
 */

// Re-export from pages API route
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const getSession = () => getServerSession(authOptions);

// For compatibility with existing code
export { default as default } from "next-auth/next";
export { signIn, signOut } from "next-auth/react";
