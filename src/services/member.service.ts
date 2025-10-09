// Member service for membership & user search operations
import type { User, Member, MemberRole } from '../types';
import { apiClient } from './apiClient';

class MemberService {
  async searchUsers(query: string): Promise<User[]> {
    return apiClient.request(`/users/search?q=${encodeURIComponent(query)}`);
  }

  async getBoardMembers(boardId: string): Promise<Member[]> {
    return apiClient.request(`/boards/${boardId}/members`);
  }

  async addBoardMember(boardId: string, userId: string, role: MemberRole): Promise<Member> {
    return apiClient.request(`/boards/${boardId}/members`, {
      method: 'POST',
      body: JSON.stringify({ userId, role }),
    });
  }

  async updateMemberRole(boardId: string, userId: string, role: MemberRole): Promise<Member> {
    return apiClient.request(`/boards/${boardId}/members/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  }

  async removeBoardMember(boardId: string, userId: string): Promise<void> {
    return apiClient.request(`/boards/${boardId}/members/${userId}`, {
      method: 'DELETE',
    });
  }
}

export const memberService = new MemberService();
