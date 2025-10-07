// Configuration centralisée de React Query avec persistance localStorage
import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

/**
 * Persister : Gère la sauvegarde/restauration du cache React Query dans localStorage
 *
 * Comment ça marche :
 * 1. Toutes les données fetched par React Query sont automatiquement sauvegardées
 * 2. Au rechargement de la page, les données sont restaurées instantanément
 * 3. React Query re-fetch en arrière-plan pour avoir les données fraîches
 */
export const persister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'adaboards-cache', // Clé unique dans localStorage

  // Sérialisation/désérialisation personnalisée (optionnel)
  serialize: (data) => JSON.stringify(data),
  deserialize: (data) => JSON.parse(data),
});

/**
 * QueryClient : Configuration de React Query
 *
 * gcTime (garbage collection time) : Durée de conservation des données inutilisées
 * staleTime : Durée avant qu'une donnée soit considérée comme "périmée"
 *
 * Exemple de cycle de vie :
 * 1. Fetch initial → données "fresh" pendant 5min (staleTime)
 * 2. Après 5min → données "stale" (périmées) → re-fetch au prochain accès
 * 3. Après 24h sans utilisation → suppression du cache (gcTime)
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Durée de conservation en cache (24 heures)
      // Les données restent en mémoire ET dans localStorage pendant 24h
      gcTime: 1000 * 60 * 60 * 24, // 24h

      // Durée avant que les données soient considérées comme périmées (5 minutes)
      // Après 5min, React Query va automatiquement re-fetch
      staleTime: 1000 * 60 * 5, // 5min

      // Re-fetch automatique quand l'utilisateur revient sur la page
      refetchOnWindowFocus: true,

      // Re-fetch automatique quand la connexion internet revient
      refetchOnReconnect: true,

      // Re-fetch automatique quand le composant se monte
      refetchOnMount: true,

      // Nombre de tentatives en cas d'échec
      retry: 2,

      // Délai entre les tentatives (1s, 2s, 4s...)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },

    mutations: {
      // Retry des mutations (créer, modifier, supprimer)
      retry: 1,
    },
  },
});
