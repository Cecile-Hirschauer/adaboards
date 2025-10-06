// Task card component for Kanban board
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { TaskStatus } from '@/types';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
  };
  status: TaskStatus;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  onDelete?: () => void;
}

export default function TaskCard({ task, status, onMoveLeft, onMoveRight, onDelete }: TaskCardProps) {
  const statusColors = {
    [TaskStatus.TODO]: 'bg-[var(--clr-todo)] border-[var(--clr-todo)]',
    [TaskStatus.IN_PROGRESS]: 'bg-[var(--clr-doing)] border-[var(--clr-doing)]',
    [TaskStatus.DONE]: 'bg-[var(--clr-success)] border-[var(--clr-success)]',
  };

  const canMoveLeft = status !== TaskStatus.TODO;
  const canMoveRight = status !== TaskStatus.DONE;

  return (
    <article
      className={`${statusColors[status]} rounded-lg p-4 mb-3 relative group transition-all hover:shadow-lg`}
      aria-label={`Task: ${task.title}`}
    >
      <p className="text-[var(--color-gray-800)] text-sm mb-3 pr-6 font-medium">
        {task.title}
      </p>

      {task.description && (
        <p className="text-[var(--color-gray-800)] text-xs mb-3 opacity-80">
          {task.description}
        </p>
      )}

      <div className="flex items-center gap-2">
        {canMoveLeft && onMoveLeft && (
          <button
            onClick={onMoveLeft}
            className="w-7 h-7 bg-[var(--color-gray-800)] rounded flex items-center justify-center hover:bg-[var(--color-muted-background)] transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Move task left"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
        )}

        {canMoveRight && onMoveRight && (
          <button
            onClick={onMoveRight}
            className={`w-7 h-7 bg-[var(--color-gray-800)] rounded flex items-center justify-center hover:bg-[var(--color-muted-background)] transition-colors focus:outline-none focus:ring-2 focus:ring-white ${!canMoveLeft ? '' : 'ml-auto'}`}
            aria-label="Move task right"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        )}
      </div>

      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-[var(--color-gray-800)] hover:text-[var(--clr-error)] transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white rounded"
          aria-label={`Delete task ${task.title}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </article>
  );
}
