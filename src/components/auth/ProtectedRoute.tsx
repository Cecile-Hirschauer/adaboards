// Composant pour protéger les routes nécessitant une authentification
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

/**
 * ProtectedRoute
 *
 * Composant HOC qui protège les routes nécessitant une authentification
 *
 * Comportement :
 * - Si l'utilisateur est authentifié → Affiche le contenu (children)
 * - Si l'utilisateur n'est pas authentifié → Redirige vers /login
 * - Pendant le chargement → Affiche un loader
 * - Sauvegarde la destination d'origine pour rediriger après login
 *
 * @example
 * <ProtectedRoute>
 *   <Boards />
 * </ProtectedRoute>
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Pendant le chargement de l'authentification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
          <p className="mt-4 text-white">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si pas authentifié, rediriger vers login en sauvegardant la destination
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si authentifié, afficher le contenu
  return <>{children}</>;
}
