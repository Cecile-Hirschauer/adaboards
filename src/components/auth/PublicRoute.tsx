// Composant pour les routes publiques (login, signup, landing)
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

/**
 * PublicRoute
 *
 * Composant pour les pages publiques comme Login, Signup, Landing
 *
 * Comportement :
 * - Si l'utilisateur est déjà authentifié → Redirige vers /boards
 * - Si l'utilisateur n'est pas authentifié → Affiche le contenu (children)
 *
 * Empêche les utilisateurs connectés d'accéder aux pages de connexion/inscription
 *
 * @example
 * <PublicRoute>
 *   <Login />
 * </PublicRoute>
 */
export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  console.log('[PublicRoute] isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);

  // Pendant le chargement, ne rien afficher
  // (évite un flash de la page de login)
  if (isLoading) {
    console.log('[PublicRoute] Loading - affichage de rien');
    return null;
  }

  // Si déjà authentifié, rediriger vers /boards
  if (isAuthenticated) {
    console.log('[PublicRoute] Authentifié - redirection vers /boards');
    return <Navigate to="/boards" replace />;
  }

  // Si pas authentifié, afficher le contenu
  console.log('[PublicRoute] Non authentifié - affichage du contenu');
  return <>{children}</>;
}
