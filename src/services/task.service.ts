// Task service for task CRUD operations
import type { Task } from '../types';
import { apiClient } from './apiClient';

class TaskService {
  async getTasks(boardId: string): Promise<Task[]> {
    return apiClient.request(`/boards/${boardId}/tasks`);
  }

  async createTask(boardId: string, data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    return apiClient.request(`/boards/${boardId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTask(taskId: string, data: Partial<Task>): Promise<Task> {
    return apiClient.request(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patchTask(boardId: string, taskId: string, data: Partial<Task>): Promise<Task> {
    return apiClient.request(`/boards/${boardId}/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteTask(boardId: string, taskId: string): Promise<void> {
    return apiClient.request(`/boards/${boardId}/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }
}

export const taskService = new TaskService();
