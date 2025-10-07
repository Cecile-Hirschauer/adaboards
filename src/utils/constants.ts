// Application constants

export const APP_NAME = 'Adaboards';

export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  HOME: '/home',
  BOARD: '/board/:id',
} as const;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'adaboards_auth_token',
  USER: 'adaboards_user',
} as const;
