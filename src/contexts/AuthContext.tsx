// Auth Context pour gérer l'état d'authentification globalement
import { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import { authStorage } from '@/utils/auth';
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

/**
 * Provider d'authentification
 *
 * Gère :
 * - L'état user et token
 * - La persistance dans localStorage
 * - Les fonctions login, register, logout
 * - Le chargement initial depuis localStorage
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  /**
   * Charger l'utilisateur depuis localStorage au montage
   * getToken() vérifie automatiquement l'expiration et nettoie si nécessaire
   */
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedToken = authStorage.getToken();
        const storedUser = authStorage.getUser();

        // getToken() retourne null si expiré
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
        } else if (!storedToken && storedUser) {
          // Token expiré mais user encore là, nettoyer
          authStorage.clear();
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
        // En cas d'erreur, nettoyer le localStorage
        authStorage.clear();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  /**
   * Connexion
   */
  const login = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);

      // Sauvegarder dans le state
      setUser(response.user);
      setToken(response.token);

      // Sauvegarder dans localStorage
      authStorage.setToken(response.token);
      authStorage.setUser(response.user);
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  };

  /**
   * Inscription
   */
  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await api.register(email, password, name);

      // Sauvegarder dans le state
      setUser(response.user);
      setToken(response.token);

      // Sauvegarder dans localStorage
      authStorage.setToken(response.token);
      authStorage.setUser(response.user);
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    }
  };

  /**
   * Déconnexion
   */
  const logout = async () => {
    try {
      // Appeler l'API de déconnexion (optionnel en mode mock)
      await api.logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      // Toujours nettoyer le state et localStorage
      setUser(null);
      setToken(null);
      authStorage.clear();

      // Rediriger vers la page de connexion
      navigate('/login');
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
