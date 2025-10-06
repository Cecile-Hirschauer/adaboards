// Custom hook for managing boards
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Board } from '../types';

export function useBoards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getBoards();
      setBoards(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load boards');
    } finally {
      setLoading(false);
    }
  };

  const createBoard = async (data: Omit<Board, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newBoard = await api.createBoard(data);
      setBoards([...boards, newBoard]);
      return newBoard;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create board');
      throw err;
    }
  };

  const updateBoard = async (id: string, data: Partial<Board>) => {
    try {
      const updatedBoard = await api.updateBoard(id, data);
      setBoards(boards.map(b => b.id === id ? updatedBoard : b));
      return updatedBoard;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update board');
      throw err;
    }
  };

  const deleteBoard = async (id: string) => {
    try {
      await api.deleteBoard(id);
      setBoards(boards.filter(b => b.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete board');
      throw err;
    }
  };

  return {
    boards,
    loading,
    error,
    loadBoards,
    createBoard,
    updateBoard,
    deleteBoard,
  };
}
