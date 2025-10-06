// Task card component
import type { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="card bg-base-200 hover:bg-base-300 transition-colors cursor-pointer">
      <div className="card-body p-4">
        <h3 className="font-semibold">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-base-content/70 mt-2">{task.description}</p>
        )}
        <div className="flex justify-end gap-2 mt-3">
          {onEdit && (
            <button
              className="btn btn-xs btn-ghost"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              className="btn btn-xs btn-ghost text-error"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
