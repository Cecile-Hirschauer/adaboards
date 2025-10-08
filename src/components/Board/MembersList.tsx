// Members List - Affiche et gère les membres d'un board
import { useState } from 'react';
import { useMembers } from '@/hooks/useMembers';
import { useAuth } from '@/hooks/useAuth';
import { MemberRole, type Member } from '@/types';
import { Button } from '@/components/ui/button';

interface MembersListProps {
  boardId: string;
}

export function MembersList({ boardId }: MembersListProps) {
  const { user: currentUser } = useAuth();
  const { members, isLoading, error, updateRole, removeMember, isUpdatingRole, isRemovingMember } = useMembers(boardId);
  const [expandedMemberId, setExpandedMemberId] = useState<string | null>(null);

  // Trouver le membership de l'utilisateur actuel
  const currentUserMembership = members.find(m => m.userId === currentUser?.id);
  const canManageMembers = currentUserMembership?.role === MemberRole.OWNER || currentUserMembership?.role === MemberRole.MAINTAINER;

  // Trouver le créateur du board (premier OWNER)
  const boardOwner = members.find(m => m.role === MemberRole.OWNER);

  const handleRemoveMember = async (member: Member) => {
    if (window.confirm(`Êtes-vous sûr de vouloir retirer ${member.user.name} du board ?`)) {
      try {
        await removeMember(member.userId);
      } catch (err) {
        console.error('Error removing member:', err);
        alert(err instanceof Error ? err.message : 'Erreur lors de la suppression du membre');
      }
    }
  };

  const handleChangeRole = async (member: Member, newRole: MemberRole) => {
    try {
      await updateRole({ userId: member.userId, role: newRole });
      setExpandedMemberId(null);
    } catch (err) {
      console.error('Error updating role:', err);
      alert(err instanceof Error ? err.message : 'Erreur lors du changement de rôle');
    }
  };

  const getRoleBadgeColor = (role: MemberRole) => {
    switch (role) {
      case MemberRole.OWNER:
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case MemberRole.MAINTAINER:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case MemberRole.MEMBER:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getRoleLabel = (role: MemberRole) => {
    switch (role) {
      case MemberRole.OWNER:
        return 'Propriétaire';
      case MemberRole.MAINTAINER:
        return 'Mainteneur';
      case MemberRole.MEMBER:
        return 'Membre';
    }
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[rgb(var(--primary))] border-t-transparent" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-sm text-[rgb(var(--destructive))]">Erreur: {error}</p>
      </div>
    );
  }

  if (!canManageMembers) {
    return null; // Ne pas afficher la liste si l'utilisateur n'a pas les permissions
  }

  return (
    <div className="bg-[rgb(var(--card))] rounded-lg border border-[rgb(var(--border))] p-4">
      <h3 className="text-lg font-semibold mb-4">Membres du board ({members.length})</h3>

      <div className="space-y-2">
        {members.map((member) => {
          const isCurrentUser = member.userId === currentUser?.id;
          const isBoardOwner = member.userId === boardOwner?.userId;
          const canModify = canManageMembers && !isBoardOwner && !isCurrentUser;
          const isExpanded = expandedMemberId === member.id;

          return (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 rounded-lg bg-[rgb(var(--muted))] hover:bg-[rgb(var(--accent))] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm truncate">
                    {member.user.name}
                    {isCurrentUser && <span className="text-xs text-[rgb(var(--muted-foreground))]"> (vous)</span>}
                  </p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getRoleBadgeColor(member.role)}`}>
                    {getRoleLabel(member.role)}
                  </span>
                </div>
                <p className="text-xs text-[rgb(var(--muted-foreground))] truncate">{member.user.email}</p>
              </div>

              {canModify && (
                <div className="flex items-center gap-2 ml-2">
                  {/* Change role button - only for OWNER */}
                  {currentUserMembership?.role === MemberRole.OWNER && member.role !== MemberRole.OWNER && (
                    <div className="relative">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setExpandedMemberId(isExpanded ? null : member.id)}
                        disabled={isUpdatingRole}
                        className="text-xs"
                      >
                        Changer rôle
                      </Button>

                      {isExpanded && (
                        <div className="absolute right-0 top-full mt-1 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-lg shadow-lg p-2 z-10 min-w-[150px]">
                          {member.role !== MemberRole.MEMBER && (
                            <button
                              onClick={() => handleChangeRole(member, MemberRole.MEMBER)}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-[rgb(var(--accent))] rounded transition-colors"
                            >
                              Membre
                            </button>
                          )}
                          {member.role !== MemberRole.MAINTAINER && (
                            <button
                              onClick={() => handleChangeRole(member, MemberRole.MAINTAINER)}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-[rgb(var(--accent))] rounded transition-colors"
                            >
                              Mainteneur
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Remove member button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveMember(member)}
                    disabled={isRemovingMember}
                    className="text-xs text-[rgb(var(--destructive))] hover:bg-[rgb(var(--destructive))] hover:text-white"
                  >
                    Retirer
                  </Button>
                </div>
              )}

              {isBoardOwner && !isCurrentUser && (
                <span className="text-xs text-[rgb(var(--muted-foreground))] ml-2">
                  Créateur
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
