// Task service for task CRUD operations
import type { Task } from '../types';
import { TaskStatus } from '../types';
import { apiClient, USE_MOCK } from './apiClient';

class TaskService {
  async getTasks(boardId: string): Promise<Task[]> {
    if (USE_MOCK) {
      // Retourner des tâches mockées pour le développement
      return Promise.resolve([
        {
          id: '1',
          title: "Appliquer l'asynchrone",
          status: TaskStatus.TODO,
          boardId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: "Se familiariser avec une bibliothèque d'animation graphique JavaScript",
          status: TaskStatus.TODO,
          boardId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          title: "Se poser la question de la durée de vie de son applicatif",
          status: TaskStatus.IN_PROGRESS,
          boardId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '4',
          title: "Manipuler du CSS et du HTML",
          status: TaskStatus.DONE,
          boardId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '5',
          title: "Mettre en place un environnement Web permettant de travailler en groupe sur le même projet",
          status: TaskStatus.DONE,
          boardId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '6',
          title: "Créer un repo commun et utiliser les commandes de base git",
          status: TaskStatus.DONE,
          boardId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
    return apiClient.request(`/boards/${boardId}/tasks`);
  }

  async createTask(boardId: string, data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    if (USE_MOCK) {
      // Simuler la création d'une tâche
      const newTask: Task = {
        id: Date.now().toString(),
        ...data,
        boardId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return Promise.resolve(newTask);
    }
    return apiClient.request(`/boards/${boardId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTask(taskId: string, data: Partial<Task>): Promise<Task> {
    if (USE_MOCK) {
      // Simuler la mise à jour d'une tâche
      return Promise.resolve({ id: taskId, ...data } as Task);
    }
    return apiClient.request(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patchTask(boardId: string, taskId: string, data: Partial<Task>): Promise<Task> {
    if (USE_MOCK) {
      // Simuler la mise à jour partielle d'une tâche
      return Promise.resolve({ id: taskId, ...data } as Task);
    }
    return apiClient.request(`/boards/${boardId}/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteTask(boardId: string, taskId: string): Promise<void> {
    if (USE_MOCK) {
      // Simuler la suppression
      return Promise.resolve();
    }
    return apiClient.request(`/boards/${boardId}/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }
}

export const taskService = new TaskService();
