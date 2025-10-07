// Custom hook for managing tasks with React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import type { Task, TaskStatus } from '../types';

const getTasksQueryKey = (boardId: string) => ['tasks', boardId];

export function useTasks(boardId: string) {
  const queryClient = useQueryClient();

  // Query for fetching tasks
  const {
    data: tasks = [],
    isLoading: loading,
    error,
    refetch: loadTasks,
  } = useQuery({
    queryKey: getTasksQueryKey(boardId),
    queryFn: () => api.getTasks(boardId),
    enabled: !!boardId,
  });

  // Mutation for creating a task
  const createTaskMutation = useMutation({
    mutationFn: (data: { title: string; status: TaskStatus; description?: string }) =>
      api.createTask(boardId, data),
    onSuccess: () => {
      // Invalidate and refetch tasks after creation
      queryClient.invalidateQueries({ queryKey: getTasksQueryKey(boardId) });
    },
  });

  // Mutation for updating a task
  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: Partial<Task> }) =>
      api.updateTask(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getTasksQueryKey(boardId) });
    },
  });

  // Mutation for deleting a task
  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => api.deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getTasksQueryKey(boardId) });
    },
  });

  return {
    tasks,
    loading,
    error: error ? (error instanceof Error ? error.message : 'An error occurred') : null,
    loadTasks,
    createTask: createTaskMutation.mutateAsync,
    updateTask: (taskId: string, data: Partial<Task>) =>
      updateTaskMutation.mutateAsync({ taskId, data }),
    deleteTask: deleteTaskMutation.mutateAsync,
    isCreating: createTaskMutation.isPending,
  };
}
