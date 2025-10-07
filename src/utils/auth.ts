import type { User } from '../types';
import { LOCAL_STORAGE_KEYS } from './constants';

/**
 * Helper pour gérer l'authentification dans localStorage
 *
 * Centralise toutes les opérations liées au stockage du token et de l'utilisateur.
 * Utilise les clés définies dans constants.ts pour éviter les typos.
 */
export const authStorage = {
  /**
   * Récupère le token d'authentification
   */
  getToken: (): string | null => {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Stocke le token d'authentification
   */
  setToken: (token: string): void => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);
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
