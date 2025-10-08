// Invite Member Modal - Modal pour inviter des membres à une board
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSearchUsers, useMembers } from '@/hooks/useMembers';
import { MemberRole, type User } from '@/types';

interface InviteMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boardId: string;
  boardName?: string;
}

export function InviteMemberModal({ open, onOpenChange, boardId, boardName }: InviteMemberModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<MemberRole>(MemberRole.MEMBER);
  const [error, setError] = useState<string | null>(null);

  // Hook pour rechercher des utilisateurs
  const { data: searchResults = [], isLoading: isSearching } = useSearchUsers(searchQuery, open);

  // Hook pour ajouter un membre
  const { addMember, isAddingMember } = useMembers(boardId);

  // Réinitialiser le state quand le modal se ferme
  useEffect(() => {
    if (!open) {
      setSearchQuery('');
      setSelectedUser(null);
      setSelectedRole(MemberRole.MEMBER);
      setError(null);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser) {
      setError('Veuillez sélectionner un utilisateur');
      return;
    }

    setError(null);

    try {
      await addMember({ userId: selectedUser.id, role: selectedRole });

      // Réinitialiser et fermer
      setSearchQuery('');
      setSelectedUser(null);
      setSelectedRole(MemberRole.MEMBER);
      onOpenChange(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
    }
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setSearchQuery(user.email);
    setError(null);
  };

  const handleClose = () => {
    setSearchQuery('');
    setSelectedUser(null);
    setSelectedRole(MemberRole.MEMBER);
    setError(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>Inviter un membre</DialogTitle>
          <DialogDescription>
            {boardName
              ? `Invitez quelqu'un à collaborer sur "${boardName}"`
              : "Invitez quelqu'un à collaborer sur cette board"
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Search user input */}
          <div className="space-y-2">
            <Label htmlFor="search" className="text-sm sm:text-base md:text-lg">
              Rechercher un utilisateur
            </Label>
            <div className="relative">
              <Input
                id="search"
                type="text"
                placeholder="Nom ou email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedUser(null);
                }}
                disabled={isAddingMember}
                className="w-full text-sm sm:text-base md:text-lg"
                autoFocus
                aria-describedby={error ? "search-error" : undefined}
              />
              {isSearching && searchQuery.length >= 2 && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[rgb(var(--primary))] border-t-transparent" />
                </div>
              )}
            </div>

            {/* Search results dropdown */}
            {searchQuery.length >= 2 && !selectedUser && searchResults.length > 0 && (
              <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-lg">
                {searchResults.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => handleSelectUser(user)}
                    className="w-full px-3 py-2 text-left hover:bg-[rgb(var(--accent))] transition-colors flex flex-col"
                  >
                    <span className="font-medium text-sm">{user.name}</span>
                    <span className="text-xs text-[rgb(var(--muted-foreground))]">{user.email}</span>
                  </button>
                ))}
              </div>
            )}

            {/* No results message */}
            {searchQuery.length >= 2 && !isSearching && !selectedUser && searchResults.length === 0 && (
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                Aucun utilisateur trouvé
              </p>
            )}

            {error && (
              <p id="search-error" className="text-sm text-[rgb(var(--destructive))]" role="alert">
                {error}
              </p>
            )}
          </div>

          {/* Selected user display */}
          {selectedUser && (
            <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--muted))] p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{selectedUser.name}</p>
                  <p className="text-xs text-[rgb(var(--muted-foreground))]">{selectedUser.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedUser(null);
                    setSearchQuery('');
                  }}
                  className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
                  aria-label="Désélectionner l'utilisateur"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Role selection */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm sm:text-base md:text-lg">
              Rôle
            </Label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as MemberRole)}
              disabled={isAddingMember}
              className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2 text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
            >
              <option value={MemberRole.MEMBER}>Membre - Peut créer et modifier des tâches</option>
              <option value={MemberRole.MAINTAINER}>Mainteneur - Peut gérer les membres et les paramètres</option>
            </select>
          </div>

          {/* Information message */}
          <div className="bg-[rgb(var(--muted))] rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-[rgb(var(--muted-foreground))]">
              L'utilisateur aura immédiatement accès au board avec le rôle sélectionné.
            </p>
          </div>

          {/* Footer buttons */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isAddingMember}
              className="w-full sm:w-auto text-sm sm:text-base md:text-lg"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isAddingMember || !selectedUser}
              className="w-full sm:w-auto bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90 text-sm sm:text-base md:text-lg"
            >
              {isAddingMember ? 'Ajout...' : 'Ajouter le membre'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
