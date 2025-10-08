// Auth Context - définition du contexte uniquement
import { createContext } from 'react';
import type { User } from '@/types';

/**
 * Type du contexte d'authentification
 */
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

/**
 * Context React pour l'authentification
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
