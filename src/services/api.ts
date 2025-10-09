// Main API service - Re-exports all services for backward compatibility
import type { User, Board, Task, Member, MemberRole } from '../types';
import { authService } from './auth.service';
import { boardService } from './board.service';
import { taskService } from './task.service';
import { memberService } from './member.service';
import { USE_MOCK } from './apiClient';
import { mockAuth } from '../utils/mockAuth';

/**
 * Unified API service that delegates to specialized services.
 * This maintains backward compatibility with existing code.
 */
class ApiService {
  // Auth methods - delegate to authService
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    if (USE_MOCK) {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));

      // Vérifier que l'utilisateur existe et que le mot de passe est correct
      const user = mockAuth.authenticate(email, password);

      if (!user) {
        throw new Error('Email ou mot de passe incorrect');
      }

      return Promise.resolve({
        user,
        token: 'mock-jwt-token-' + Date.now(),
      });
    }

    return authService.login(email, password);
  }

  async register(email: string, password: string, name: string): Promise<{ user: User; token: string }> {
    if (USE_MOCK) {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));

      // Vérifier que l'email n'est pas déjà utilisé
      if (mockAuth.userExists(email)) {
        throw new Error('Cet email est déjà utilisé');
      }

      // Créer le nouvel utilisateur
      const user: User = {
        id: Date.now().toString(),
        email,
        name,
        createdAt: new Date(),
      };

      // Sauvegarder l'utilisateur dans le mock storage
      mockAuth.saveUser(email, password, user);

      return Promise.resolve({
        user,
        token: 'mock-jwt-token-' + Date.now(),
      });
    }

    return authService.register(email, password, name);
  }

  async logout(): Promise<void> {
    if (USE_MOCK) {
      return Promise.resolve();
    }
    return authService.logout();
  }

  async validateToken(token: string): Promise<{ valid: boolean }> {
    if (USE_MOCK) {
      return Promise.resolve({ valid: !!token });
    }
    return authService.validateToken(token);
  }

  // Board methods - delegate to boardService
  async getBoards(): Promise<Board[]> {
    return boardService.getBoards();
  }

  async getBoard(id: string): Promise<Board> {
    return boardService.getBoard(id);
  }

  async createBoard(data: Omit<Board, 'id' | 'updated_at'>): Promise<Board> {
    return boardService.createBoard(data);
  }

  async updateBoard(id: string, data: Partial<Board>): Promise<Board> {
    return boardService.updateBoard(id, data);
  }

  async deleteBoard(id: string): Promise<void> {
    return boardService.deleteBoard(id);
  }

  // Task methods - delegate to taskService
  async getTasks(boardId: string): Promise<Task[]> {
    return taskService.getTasks(boardId);
  }

  async createTask(boardId: string, data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    return taskService.createTask(boardId, data);
  }

  async updateTask(taskId: string, data: Partial<Task>): Promise<Task> {
    return taskService.updateTask(taskId, data);
  }

  async patchTask(boardId: string, taskId: string, data: Partial<Task>): Promise<Task> {
    return taskService.patchTask(boardId, taskId, data);
  }

  async deleteTask(boardId: string, taskId: string): Promise<void> {
    return taskService.deleteTask(boardId, taskId);
  }

  // Member methods - delegate to memberService
  async searchUsers(query: string): Promise<User[]> {
    return memberService.searchUsers(query);
  }

  async getBoardMembers(boardId: string): Promise<Member[]> {
    return memberService.getBoardMembers(boardId);
  }

  async addBoardMember(boardId: string, userId: string, role: MemberRole): Promise<Member> {
    return memberService.addBoardMember(boardId, userId, role);
  }

  async updateMemberRole(boardId: string, userId: string, role: MemberRole): Promise<Member> {
    return memberService.updateMemberRole(boardId, userId, role);
  }

  async removeBoardMember(boardId: string, userId: string): Promise<void> {
    return memberService.removeBoardMember(boardId, userId);
  }
}

export const api = new ApiService();

// Also export individual services for direct access
export { authService } from './auth.service';
export { boardService } from './board.service';
export { taskService } from './task.service';
export { memberService } from './member.service';
export { USE_MOCK } from './apiClient';
