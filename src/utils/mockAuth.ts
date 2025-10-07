import type { User } from '@/types';

const MOCK_USERS_KEY = 'adaboards_mock_users';

interface StoredUser {
  email: string;
  password: string;
  user: User;
}

/**
 * Helper pour gérer les utilisateurs mockés en localStorage
 * Utilisé uniquement en mode développement/mock
 */
export const mockAuth = {
  /**
   * Récupère tous les utilisateurs enregistrés
   */
  getUsers(): StoredUser[] {
    try {
      const usersJson = localStorage.getItem(MOCK_USERS_KEY);
      if (!usersJson) return [];
      return JSON.parse(usersJson);
    } catch (error) {
      console.error('Erreur lors de la lecture des utilisateurs mockés:', error);
      return [];
    }
  },

  /**
   * Sauvegarde un nouvel utilisateur
   */
  saveUser(email: string, password: string, user: User): void {
    const users = this.getUsers();
    users.push({ email, password, user });
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
  },

  /**
   * Vérifie si un utilisateur existe avec cet email
   */
  userExists(email: string): boolean {
    const users = this.getUsers();
    return users.some(u => u.email === email);
  },

  /**
   * Authentifie un utilisateur (vérifie email + password)
   */
  authenticate(email: string, password: string): User | null {
    const users = this.getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    return found ? found.user : null;
  },

  /**
   * Nettoie tous les utilisateurs mockés
   * Utile pour le développement
   */
  clear(): void {
    localStorage.removeItem(MOCK_USERS_KEY);
  },
};
