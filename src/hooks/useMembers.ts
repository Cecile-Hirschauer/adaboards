// Custom hook for managing board members with React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import type { MemberRole } from '../types';

const MEMBERS_QUERY_KEY = (boardId: string) => ['boards', boardId, 'members'];

/**
 * Hook pour gérer les membres d'un board
 */
export function useMembers(boardId: string) {
  const queryClient = useQueryClient();

  // Query pour récupérer les membres
  const {
    data: members = [],
    isLoading,
    error,
    refetch: loadMembers,
  } = useQuery({
    queryKey: MEMBERS_QUERY_KEY(boardId),
    queryFn: () => api.getBoardMembers(boardId),
    enabled: !!boardId,
  });

  // Mutation pour ajouter un membre
  const addMemberMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: MemberRole }) =>
      api.addBoardMember(boardId, userId, role),
    onSuccess: () => {
      // Invalider le cache pour recharger la liste
      queryClient.invalidateQueries({ queryKey: MEMBERS_QUERY_KEY(boardId) });
    },
  });

  // Mutation pour modifier le rôle
  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: MemberRole }) =>
      api.updateMemberRole(boardId, userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMBERS_QUERY_KEY(boardId) });
    },
  });

  // Mutation pour retirer un membre
  const removeMemberMutation = useMutation({
    mutationFn: (userId: string) => api.removeBoardMember(boardId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMBERS_QUERY_KEY(boardId) });
    },
  });

  return {
    members,
    isLoading,
    error: error ? (error instanceof Error ? error.message : 'An error occurred') : null,
    loadMembers,
    addMember: addMemberMutation.mutateAsync,
    updateRole: updateRoleMutation.mutateAsync,
    removeMember: removeMemberMutation.mutateAsync,
    isAddingMember: addMemberMutation.isPending,
    isUpdatingRole: updateRoleMutation.isPending,
    isRemovingMember: removeMemberMutation.isPending,
  };
}

/**
 * Hook pour rechercher des utilisateurs
 */
export function useSearchUsers(query: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['users', 'search', query],
    queryFn: () => api.searchUsers(query),
    enabled: enabled && query.length >= 2, // Ne chercher que si query >= 2 caractères
    staleTime: 30000, // Cache de 30 secondes pour les recherches
  });
}
