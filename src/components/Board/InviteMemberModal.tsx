// Invite Member Modal - Modal pour inviter des membres à une board
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InviteMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boardName?: string;
}

export function InviteMemberModal({ open, onOpenChange, boardName }: InviteMemberModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation basique
    if (!email) {
      setError('Veuillez entrer une adresse email');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Adresse email invalide');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // TODO: Implémenter l'appel API pour inviter un membre
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation

      console.log('Inviting member:', email, 'to board:', boardName);

      // Réinitialiser et fermer
      setEmail('');
      onOpenChange(false);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
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
          {/* Email input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm sm:text-base md:text-lg">
              Adresse email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full text-sm sm:text-base md:text-lg"
              autoFocus
              aria-describedby={error ? "email-error" : undefined}
            />
            {error && (
              <p id="email-error" className="text-sm text-[rgb(var(--destructive))]" role="alert">
                {error}
              </p>
            )}
          </div>

          {/* Information message */}
          <div className="bg-[rgb(var(--muted))] rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-[rgb(var(--muted-foreground))]">
              Un email d'invitation sera envoyé à cette adresse avec un lien pour rejoindre la board.
            </p>
          </div>

          {/* Footer buttons */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="w-full sm:w-auto text-sm sm:text-base md:text-lg"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90 text-sm sm:text-base md:text-lg"
            >
              {isLoading ? 'Envoi...' : 'Envoyer l\'invitation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}