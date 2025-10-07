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
    onSuccess: (newTask) => {
      // Mettre à jour le cache avec la nouvelle tâche
      queryClient.setQueryData<Task[]>(getTasksQueryKey(boardId), (old = []) => [...old, newTask]);
    },
  });

  // Mutation for updating a task
  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: Partial<Task> }) =>
      api.updateTask(taskId, data),
    onSuccess: (_, { taskId, data }) => {
      // Mise à jour optimiste du cache
      queryClient.setQueryData<Task[]>(getTasksQueryKey(boardId), (old = []) =>
        old.map((task) =>
          task.id === taskId ? { ...task, ...data, updatedAt: new Date() } : task
        )
      );
    },
  });

  // Mutation for patching a task (partial update)
  const patchTaskMutation = useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: Partial<Task> }) =>
      api.patchTask(boardId, taskId, data),
    onSuccess: (_, { taskId, data }) => {
      // Mise à jour optimiste du cache
      queryClient.setQueryData<Task[]>(getTasksQueryKey(boardId), (old = []) =>
        old.map((task) =>
          task.id === taskId ? { ...task, ...data, updatedAt: new Date() } : task
        )
      );
    },
  });

  // Mutation for deleting a task
  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => api.deleteTask(boardId, taskId),
    onSuccess: (_, taskId) => {
      // Supprimer la tâche du cache
      queryClient.setQueryData<Task[]>(getTasksQueryKey(boardId), (old = []) =>
        old.filter((task) => task.id !== taskId)
      );
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
    patchTask: (taskId: string, data: Partial<Task>) =>
      patchTaskMutation.mutateAsync({ taskId, data }),
    deleteTask: deleteTaskMutation.mutateAsync,
    isCreating: createTaskMutation.isPending,
  };
}
