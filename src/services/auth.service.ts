import { API_BASE_URL, LOCAL_STORAGE_KEYS } from '../utils/constants';
import type { User } from '../types';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

class AuthService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || response.statusText);
    }

    return response.json();
  }

  async register(email: string, password: string, name: string): Promise<{ user: User; token: string }> {
    const response = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });

    return {
      user: {
        ...response.user,
        createdAt: new Date(),
      },
      token: response.token,
    };
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    return {
      user: {
        ...response.user,
        createdAt: new Date(),
      },
      token: response.token,
    };
  }

  async logout(): Promise<void> {
    // Nettoyer le localStorage
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
  }

  async validateToken(token: string): Promise<{ valid: boolean }> {
    return this.request('/auth/validate', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }
}

export const authService = new AuthService();