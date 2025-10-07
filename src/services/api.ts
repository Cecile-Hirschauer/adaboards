// API service for backend communication
import { API_BASE_URL, LOCAL_STORAGE_KEYS } from '../utils/constants';
import type { User, Board, Task } from '../types';

// Mode mock pour le développement local
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || true; // Activé par défaut pour le dev local

class ApiService {
  private getAuthToken(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(email: string, password: string, name: string): Promise<{ user: User; token: string }> {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  // Boards
  async getBoards(): Promise<Board[]> {
    if (USE_MOCK) {
      // Retourner des boards mockés
      return Promise.resolve([
        { id: '1', name: 'Dataviz', updated_at: new Date().toISOString() },
        { id: '2', name: 'Mon projet', updated_at: new Date().toISOString() },
      ]);
    }
    return this.request('/boards');
  }

  async getBoard(id: string): Promise<Board> {
    if (USE_MOCK) {
      return Promise.resolve({ id, name: 'Dataviz', updated_at: new Date().toISOString() });
    }
    return this.request(`/boards/${id}`);
  }

  async createBoard(data: Omit<Board, 'id' | 'updated_at'>): Promise<Board> {
    if (USE_MOCK) {
      const newBoard: Board = {
        id: Date.now().toString(),
        ...data,
        updated_at: new Date().toISOString(),
      };
      return Promise.resolve(newBoard);
    }
    return this.request('/boards', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBoard(id: string, data: Partial<Board>): Promise<Board> {
    if (USE_MOCK) {
      return Promise.resolve({ id, ...data, updated_at: new Date().toISOString() } as Board);
    }
    return this.request(`/boards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBoard(id: string): Promise<void> {
    if (USE_MOCK) {
      return Promise.resolve();
    }
    return this.request(`/boards/${id}`, {
      method: 'DELETE',
    });
  }

  // Tasks
  async getTasks(boardId: string): Promise<Task[]> {
    if (USE_MOCK) {
      // Retourner des tâches mockées pour le développement
      return Promise.resolve([
        {
          id: '1',
          title: "Appliquer l'asynchrone",
          status: 'TODO' as const,
          boardId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: "Se familiariser avec une bibliothèque d'animation graphique JavaScript",
          status: 'TODO' as const,
          boardId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          title: "Se poser la question de la durée de vie de son applicatif",
          status: 'IN_PROGRESS' as const,
          boardId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '4',
          title: "Manipuler du CSS et du HTML",
          status: 'DONE' as const,
          boardId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '5',
          title: "Mettre en place un environnement Web permettant de travailler en groupe sur le même projet",
          status: 'DONE' as const,
          boardId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '6',
          title: "Créer un repo commun et utiliser les commandes de base git",
          status: 'DONE' as const,
          boardId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
    return this.request(`/boards/${boardId}/tasks`);
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
    return this.request(`/boards/${boardId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTask(taskId: string, data: Partial<Task>): Promise<Task> {
    if (USE_MOCK) {
      // Simuler la mise à jour d'une tâche
      return Promise.resolve({ id: taskId, ...data } as Task);
    }
    return this.request(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTask(taskId: string): Promise<void> {
    if (USE_MOCK) {
      // Simuler la suppression
      return Promise.resolve();
    }
    return this.request(`/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiService();
