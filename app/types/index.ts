import { User } from 'next-auth';

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}
