// Board header component with navigation and actions
import { ArrowLeft, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BoardHeaderProps {
  boardName: string;
  onBack: () => void;
  onInvite?: () => void;
  onFilterChange?: (filter: string) => void;
}

export default function BoardHeader({ boardName, onBack, onInvite, onFilterChange }: BoardHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
      <button
        onClick={onBack}
        className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] rounded p-1"
        aria-label="Go back to boards"
      >
        <ArrowLeft className="w-7 h-7 sm:w-8 sm:h-8" />
      </button>

      <h1 className="text-[rgb(var(--foreground))] text-2xl sm:text-3xl font-semibold">
        {boardName}
      </h1>

      <input
        type="text"
        placeholder="Filter cards..."
        onChange={(e) => onFilterChange?.(e.target.value)}
        className="flex-1 w-full sm:max-w-md bg-[rgb(var(--input))] text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] px-4 py-2 rounded-lg border border-[rgb(var(--border))] focus:outline-none focus:border-[rgb(var(--primary))] transition-colors"
        aria-label="Filter cards"
      />

      {onInvite && (
        <Button
          onClick={onInvite}
          className="w-full sm:w-auto sm:ml-auto bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90 font-semibold"
          aria-label="Invite members to board"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Inviter
        </Button>
      )}
    </header>
  );
}
