// API service for backend communication
import { API_BASE_URL, LOCAL_STORAGE_KEYS } from '../utils/constants';
import type { User, Board, Task } from '../types';
import { TaskStatus } from '../types';
import { mockAuth } from '../utils/mockAuth';

/**
 * Mode mock : Détermine si on utilise des données mockées ou l'API réelle
 *
 * Priorité :
 * 1. Variable d'environnement VITE_USE_MOCK (true/false)
 * 2. Sinon : true par défaut pour le développement local
 *
 * Pour utiliser l'API réelle :
 * - Créer un fichier .env avec VITE_USE_MOCK=false
 * - Ou modifier cette ligne directement
 */
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || true;

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
    if (USE_MOCK) {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));

      // Vérifier que l'utilisateur existe et que le mot de passe est correct
      const user = mockAuth.authenticate(email, password);

      if (!user) {
        throw new Error('Email ou mot de passe incorrect');
      }

      return Promise.resolve({
        user,
        token: 'mock-jwt-token-' + Date.now(),
      });
    }

    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string): Promise<{ user: User; token: string }> {
    if (USE_MOCK) {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));

      // Vérifier que l'email n'est pas déjà utilisé
      if (mockAuth.userExists(email)) {
        throw new Error('Cet email est déjà utilisé');
      }

      // Créer le nouvel utilisateur
      const user: User = {
        id: Date.now().toString(),
        email,
        name,
        createdAt: new Date(),
      };

      // Sauvegarder l'utilisateur dans le mock storage
      mockAuth.saveUser(email, password, user);

      return Promise.resolve({
        user,
        token: 'mock-jwt-token-' + Date.now(),
      });
    }

    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async logout(): Promise<void> {
    if (USE_MOCK) {
      return Promise.resolve();
    }

    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async validateToken(token: string): Promise<{ valid: boolean }> {
    if (USE_MOCK) {
      // En mode mock, vérifier que le token existe et n'est pas expiré
      // Pour simplifier, on considère qu'un token mock est valide s'il existe
      // En production, cela ferait un vrai appel API
      return Promise.resolve({ valid: !!token });
    }

    return this.request('/auth/validate', {
      method: 'POST',
      body: JSON.stringify({ token }),
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

  async patchTask(boardId: string, taskId: string, data: Partial<Task>): Promise<Task> {
    if (USE_MOCK) {
      // Simuler la mise à jour partielle d'une tâche
      return Promise.resolve({ id: taskId, ...data } as Task);
    }
    return this.request(`/boards/${boardId}/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteTask(boardId: string, taskId: string): Promise<void> {
    if (USE_MOCK) {
      // Simuler la suppression
      return Promise.resolve();
    }
    return this.request(`/boards/${boardId}/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiService();
