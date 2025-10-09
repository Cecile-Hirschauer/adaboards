// Base HTTP client for API communication
import { API_BASE_URL } from '../utils/constants';
import { authStorage } from '../utils/auth';

/**
 * Mode mock : Détermine si on utilise des données mockées ou l'API réelle
 *
 * Priorité :
 * 1. Variable d'environnement VITE_USE_MOCK (true/false)
 * 2. Sinon : false par défaut (utilise l'API réelle)
 *
 * Pour utiliser le mode mock :
 * - Créer un fichier .env avec VITE_USE_MOCK=true
 */
export const USE_MOCK = import.meta.env.VITE_USE_MOCK;

class ApiClient {
  private getAuthToken(): string | null {
    return authStorage.getToken();
  }

  async request<T>(
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
}

export const apiClient = new ApiClient();
