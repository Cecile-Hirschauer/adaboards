import "./index.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient, persister } from "./lib/queryClient";
import { AuthProvider } from "./contexts/authProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { PublicRoute } from "./components/auth/PublicRoute";

// Lazy load pages for better performance (code splitting)
// Each page will be loaded only when needed, reducing initial bundle size
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Boards = lazy(() => import("./pages/Boards"));
const BoardView = lazy(() => import("./pages/BoardView"));

// Loading fallback component - Optimized for performance
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--background))]">
      <div className="text-center">
        {/* Spinner with CSS animation (no JS) */}
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[rgb(var(--primary))] border-r-transparent"
          role="status"
          aria-label="Loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}

/**
 * App Component avec persistance localStorage et authentification
 *
 * Architecture des providers (de l'extérieur vers l'intérieur) :
 * 1. PersistQueryClientProvider : Cache React Query dans localStorage
 * 2. BrowserRouter : Routing React Router
 * 3. AuthProvider : État d'authentification global
 * 4. Suspense : Lazy loading des pages
 *
 * Routes :
 * - Routes publiques (Landing, Login, Signup) : Rediriger vers /boards si déjà connecté
 * - Routes protégées (Boards, BoardView) : Nécessitent une authentification
 */
function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <BrowserRouter>
        {/* AuthProvider doit être à l'intérieur de BrowserRouter car il utilise useNavigate */}
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Routes publiques - Rediriger vers /boards si authentifié */}
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <Landing />
                  </PublicRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />

              {/* Routes protégées - Nécessitent une authentification */}
              <Route
                path="/boards"
                element={
                  <ProtectedRoute>
                    <Boards />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/boards/:id"
                element={
                  <ProtectedRoute>
                    <BoardView />
                  </ProtectedRoute>
                }
              />

              {/* Redirection par défaut */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </PersistQueryClientProvider>
  );
}

export default App;
