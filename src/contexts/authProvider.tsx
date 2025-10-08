// Auth Provider pour gérer l'état d'authentification globalement
import { useState, useEffect, ReactNode } from 'react';
import { api } from '@/services/api';
import { authStorage } from '@/utils/auth';
import { AuthContext, type AuthContextType } from './authContext';

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
  const logout = () => {
    console.log('[AuthContext] Logout - Début');

    // Nettoyer le state et localStorage AVANT de rediriger
    console.log('[AuthContext] Logout - Nettoyage state et localStorage');
    setUser(null);
    setToken(null);
    authStorage.clear();

    // Rediriger vers la page d'accueil (Landing) avec un rechargement complet
    console.log('[AuthContext] Logout - Redirection vers / avec window.location');
    window.location.href = '/';
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
