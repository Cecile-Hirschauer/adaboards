// Member service for membership & user search operations
import type { User, Member, MemberRole } from '../types';
import { apiClient, USE_MOCK } from './apiClient';

class MemberService {
  async searchUsers(query: string): Promise<User[]> {
    if (USE_MOCK) {
      // Mock: rechercher dans mockAuth
      return Promise.resolve([]);
    }
    return apiClient.request(`/users/search?q=${encodeURIComponent(query)}`);
  }

  async getBoardMembers(boardId: string): Promise<Member[]> {
    if (USE_MOCK) {
      return Promise.resolve([]);
    }
    return apiClient.request(`/boards/${boardId}/members`);
  }

  async addBoardMember(boardId: string, userId: string, role: MemberRole): Promise<Member> {
    if (USE_MOCK) {
      return Promise.resolve({
        id: Date.now().toString(),
        userId,
        boardId,
        role,
        joinedAt: new Date().toISOString(),
        user: { id: userId, email: '', name: '', createdAt: new Date() },
      });
    }
    return apiClient.request(`/boards/${boardId}/members`, {
      method: 'POST',
      body: JSON.stringify({ userId, role }),
    });
  }

  async updateMemberRole(boardId: string, userId: string, role: MemberRole): Promise<Member> {
    if (USE_MOCK) {
      return Promise.resolve({
        id: Date.now().toString(),
        userId,
        boardId,
        role,
        joinedAt: new Date().toISOString(),
        user: { id: userId, email: '', name: '', createdAt: new Date() },
      });
    }
    return apiClient.request(`/boards/${boardId}/members/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  }

  async removeBoardMember(boardId: string, userId: string): Promise<void> {
    if (USE_MOCK) {
      return Promise.resolve();
    }
    return apiClient.request(`/boards/${boardId}/members/${userId}`, {
      method: 'DELETE',
    });
  }
}

export const memberService = new MemberService();
