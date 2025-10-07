import "./index.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient, persister } from "./lib/queryClient";

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
 * App Component avec persistance localStorage
 *
 * PersistQueryClientProvider :
 * - Remplace QueryClientProvider classique
 * - Ajoute la sauvegarde automatique dans localStorage
 * - Restaure les données au chargement de la page
 *
 * Comportement :
 * 1. Premier chargement : Fetch API → Sauvegarde dans localStorage
 * 2. Rechargements suivants : Affiche données localStorage immédiatement → Re-fetch API en arrière-plan
 * 3. Mode offline : Utilise uniquement localStorage (pas de fetch API)
 */
function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/boards" element={<Boards />} />
            <Route path="/boards/:id" element={<BoardView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </PersistQueryClientProvider>
  );
}

export default App;
