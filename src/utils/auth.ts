import type { User } from '../types';
import { LOCAL_STORAGE_KEYS } from './constants';

interface TokenData {
  token: string;
  expiresAt: number;
}

/**
 * Helper pour gérer l'authentification dans localStorage
 *
 * Centralise toutes les opérations liées au stockage du token et de l'utilisateur.
 * Utilise les clés définies dans constants.ts pour éviter les typos.
 */
export const authStorage = {
  /**
   * Récupère le token d'authentification
   * Retourne null si le token a expiré
   */
  getToken: (): string | null => {
    try {
      const tokenDataStr = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      if (!tokenDataStr) return null;

      // Support de l'ancien format (string simple)
      try {
        const tokenData: TokenData = JSON.parse(tokenDataStr);
        // Vérifier l'expiration
        if (tokenData.expiresAt && Date.now() > tokenData.expiresAt) {
          authStorage.clear();
          return null;
        }
        return tokenData.token;
      } catch {
        // Ancien format: simple string
        return tokenDataStr;
      }
    } catch (error) {
      console.error('Erreur lors de la lecture du token:', error);
      return null;
    }
  },

  /**
   * Stocke le token d'authentification avec une durée d'expiration
   * Par défaut: 7 jours
   */
  setToken: (token: string, expiresInMs: number = 7 * 24 * 60 * 60 * 1000): void => {
    const tokenData: TokenData = {
      token,
      expiresAt: Date.now() + expiresInMs,
    };
    localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, JSON.stringify(tokenData));
  },

  /**
   * Supprime le token d'authentification
   */
  removeToken: (): void => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Récupère l'utilisateur courant depuis le localStorage
   * Retourne null si aucun utilisateur n'est stocké ou si le JSON est invalide
   */
  getUser: (): User | null => {
    try {
      const userJson = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
      if (!userJson) return null;
      return JSON.parse(userJson);
    } catch (error) {
      console.error('Erreur lors de la lecture de l\'utilisateur:', error);
      return null;
    }
  },

  /**
   * Stocke l'utilisateur courant dans le localStorage
   */
  setUser: (user: User): void => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
  },

  /**
   * Supprime l'utilisateur du localStorage
   */
  removeUser: (): void => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
  },

  /**
   * Nettoie toutes les données d'authentification
   * Utile lors de la déconnexion
   */
  clear: (): void => {
    authStorage.removeToken();
    authStorage.removeUser();
  },
};
