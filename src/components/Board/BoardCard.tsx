// Board card component
import type { Board } from '../../types';

interface BoardCardProps {
  board: Board;
  onOpen: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function BoardCard({ board, onOpen, onDelete }: BoardCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
      <div className="card-body">
        <h2 className="card-title">{board.title}</h2>
        {board.description && (
          <p className="text-base-content/70">{board.description}</p>
        )}
        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onOpen(board.id)}
          >
            Open
          </button>
          {onDelete && (
            <button
              className="btn btn-error btn-sm"
              onClick={() => onDelete(board.id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
