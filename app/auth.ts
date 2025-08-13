import NextAuth from "next-auth";
import { getServerSession } from "next-auth";
import type { NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is where you would validate the credentials
        // For now, we'll just return a mock user for demonstration
        if (credentials?.email === "user@example.com" && credentials?.password === "password") {
          return {
            id: "1",
            name: "Demo User",
            email: "user@example.com",
            image: "https://ui-avatars.com/api/?name=Demo+User"
          };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        // Add id to the session user object with proper type casting
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).id = token.id as string;
      }
      return session;
    }
  }
};

export const { auth, signIn, signOut } = NextAuth(authOptions);

export const getSession = () => getServerSession(authOptions);
