/**
 * Auth configuration for the app
 * This file re-exports from the App Router authentication
 */

// Re-export from App Router auth options
import { authOptions } from "@/app/api/auth/auth-options";
import { getServerSession } from "next-auth";

export const getSession = () => getServerSession(authOptions);

// For compatibility with existing code
export { default as default } from "next-auth";
export { signIn, signOut } from "next-auth/react";
