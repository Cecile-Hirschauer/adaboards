// Board card component
import type { Board } from '../../types';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface BoardCardProps {
  board: Board;
  onOpen: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function BoardCard({ board, onOpen, onDelete }: BoardCardProps) {
  return (
    <article
      className="bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] rounded-xl p-6 border border-[rgb(var(--border))] transition-all hover:border-[rgb(var(--primary))] hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
      onClick={() => onOpen(board.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(board.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open board ${board.name}`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--primary))] transition-colors">
          {board.name}
        </h3>
        {onDelete && (
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-[rgb(var(--destructive))]"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(board.id);
            }}
            aria-label={`Delete board ${board.name}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-[rgb(var(--muted-foreground))]">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-[var(--clr-todo)]" aria-hidden="true"></div>
          <div className="w-2 h-2 rounded-full bg-[var(--clr-doing)]" aria-hidden="true"></div>
          <div className="w-2 h-2 rounded-full bg-[var(--clr-success)]" aria-hidden="true"></div>
        </div>
        <span>Tasks board</span>
      </div>
    </article>
  );
}
