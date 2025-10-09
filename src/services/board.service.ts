// Board service for board CRUD operations
import type { Board } from '../types';
import { apiClient } from './apiClient';

class BoardService {
  async getBoards(): Promise<Board[]> {
    return apiClient.request('/boards');
  }

  async getBoard(id: string): Promise<Board> {
    return apiClient.request(`/boards/${id}`);
  }

  async createBoard(data: Omit<Board, 'id' | 'updated_at'>): Promise<Board> {
    return apiClient.request('/boards', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBoard(id: string, data: Partial<Board>): Promise<Board> {
    return apiClient.request(`/boards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBoard(id: string): Promise<void> {
    return apiClient.request(`/boards/${id}`, {
      method: 'DELETE',
    });
  }
}

export const boardService = new BoardService();
