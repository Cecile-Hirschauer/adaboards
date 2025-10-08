// Hook personnalisé pour accéder au contexte d'authentification
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';

/**
 * Hook useAuth
 *
 * Permet d'accéder facilement au contexte d'authentification
 * depuis n'importe quel composant
 *
 * @example
 * const { user, login, logout, isAuthenticated } = useAuth();
 *
 * @throws Error si utilisé en dehors d'un AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
