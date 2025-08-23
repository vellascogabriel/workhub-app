/**
 * Auth configuration for the app
 * This file re-exports from the App Router authentication
 */

// Import from auth options file
import { authOptions } from '@/app/api/auth/auth-options';
import { getServerSession } from 'next-auth/next';

export const getSession = () => getServerSession(authOptions);

// For compatibility with existing code
export { default as default } from 'next-auth/next';
export { signIn, signOut } from 'next-auth/react';
