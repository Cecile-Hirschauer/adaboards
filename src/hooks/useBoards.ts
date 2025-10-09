// Custom hook for managing boards with React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import type { Board } from '../types';

const BOARDS_QUERY_KEY = ['boards'];
const BOARD_QUERY_KEY = (id: string) => ['boards', id];

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
    onMutate: async (boardId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: BOARDS_QUERY_KEY });

      // Snapshot the previous value
      const previousBoards = queryClient.getQueryData<Board[]>(BOARDS_QUERY_KEY);

      // Optimistically update to remove the board
      queryClient.setQueryData<Board[]>(BOARDS_QUERY_KEY, (old) =>
        old ? old.filter((board) => board.id !== boardId) : []
      );

      // Return context with previous value
      return { previousBoards };
    },
    onError: (err, boardId, context) => {
      // Rollback on error
      if (context?.previousBoards) {
        queryClient.setQueryData(BOARDS_QUERY_KEY, context.previousBoards);
      }
    },
    onSettled: () => {
      // Refetch to ensure consistency
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

/**
 * Hook pour récupérer un board spécifique
 */
export function useBoard(boardId: string) {
  const {
    data: board,
    isLoading,
    error,
  } = useQuery({
    queryKey: BOARD_QUERY_KEY(boardId),
    queryFn: () => api.getBoard(boardId),
    enabled: !!boardId && boardId !== 'default-board-id',
    retry: false, // Ne pas réessayer si accès refusé
  });

  return {
    board,
    isLoading,
    error: error ? (error instanceof Error ? error.message : 'An error occurred') : null,
  };
}
