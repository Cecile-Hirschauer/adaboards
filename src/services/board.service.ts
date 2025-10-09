// Board service for board CRUD operations
import type { Board } from '../types';
import { apiClient, USE_MOCK } from './apiClient';

class BoardService {
  async getBoards(): Promise<Board[]> {
    if (USE_MOCK) {
      // Retourner des boards mockés
      return Promise.resolve([
        { id: '1', name: 'Dataviz', updated_at: new Date().toISOString() },
        { id: '2', name: 'Mon projet', updated_at: new Date().toISOString() },
      ]);
    }
    return apiClient.request('/boards');
  }

  async getBoard(id: string): Promise<Board> {
    if (USE_MOCK) {
      return Promise.resolve({ id, name: 'Dataviz', updated_at: new Date().toISOString() });
    }
    return apiClient.request(`/boards/${id}`);
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
    return apiClient.request('/boards', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBoard(id: string, data: Partial<Board>): Promise<Board> {
    if (USE_MOCK) {
      return Promise.resolve({ id, ...data, updated_at: new Date().toISOString() } as Board);
    }
    return apiClient.request(`/boards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBoard(id: string): Promise<void> {
    if (USE_MOCK) {
      return Promise.resolve();
    }
    return apiClient.request(`/boards/${id}`, {
      method: 'DELETE',
    });
  }
}

export const boardService = new BoardService();
