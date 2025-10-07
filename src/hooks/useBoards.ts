// Custom hook for managing boards with React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import type { Board } from '../types';

const BOARDS_QUERY_KEY = ['boards'];

export function useBoards() {
  const queryClient = useQueryClient();

  // Query for fetching boards
  const {
    data: boards = [],
    isLoading: loading,
    error,
    refetch: loadBoards,
  } = useQuery({
    queryKey: BOARDS_QUERY_KEY,
    queryFn: () => api.getBoards(),
  });

  // Mutation for creating a board
  const createBoardMutation = useMutation({
    mutationFn: (data: Omit<Board, 'id' | 'updated_at'>) => api.createBoard(data),
    onSuccess: () => {
      // Invalidate and refetch boards after creation
      queryClient.invalidateQueries({ queryKey: BOARDS_QUERY_KEY });
    },
  });

  // Mutation for updating a board
  const updateBoardMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Board> }) =>
      api.updateBoard(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOARDS_QUERY_KEY });
    },
  });

  // Mutation for deleting a board
  const deleteBoardMutation = useMutation({
    mutationFn: (id: string) => api.deleteBoard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOARDS_QUERY_KEY });
    },
  });

  return {
    boards,
    loading,
    error: error ? (error instanceof Error ? error.message : 'An error occurred') : null,
    loadBoards,
    createBoard: createBoardMutation.mutateAsync,
    updateBoard: (id: string, data: Partial<Board>) =>
      updateBoardMutation.mutateAsync({ id, data }),
    deleteBoard: deleteBoardMutation.mutateAsync,
  };
}
