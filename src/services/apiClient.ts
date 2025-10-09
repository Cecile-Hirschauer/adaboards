// Base HTTP client for API communication
import { API_BASE_URL } from '../utils/constants';
import { authStorage } from '../utils/auth';

// Log de l'API URL au démarrage (dev only)
if (import.meta.env.DEV) {
  console.log(`[API] Base URL: ${API_BASE_URL}`);
}

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
