// Column component for Kanban board
import { Plus } from 'lucide-react';
import { TaskStatus } from '@/types';
import TaskCard from '@/components/Task/TaskCard';

interface Task {
  id: string;
  title: string;
  description?: string;
}

interface ColumnProps {
  title: string;
  tasks: Task[];
  status: TaskStatus;
  onAddTask?: () => void;
  onMoveTask?: (taskId: string, direction: 'left' | 'right') => void;
  onDeleteTask?: (taskId: string) => void;
  onTaskTitleChange?: (taskId: string, newTitle: string) => void;
}

export default function Column({ title, tasks, status, onAddTask, onMoveTask, onDeleteTask, onTaskTitleChange }: ColumnProps) {
  const borderColors = {
    [TaskStatus.TODO]: 'border-todo',
    [TaskStatus.IN_PROGRESS]: 'border-doing',
    [TaskStatus.DONE]: 'border-done',
  };

  const headerColors = {
    [TaskStatus.TODO]: 'text-todo',
    [TaskStatus.IN_PROGRESS]: 'text-doing',
    [TaskStatus.DONE]: 'text-done',
  };

  return (
    <section
      className={`flex-1 min-w-[280px] sm:min-w-[320px] border-2 ${borderColors[status]} rounded-xl p-4 bg-[rgb(var(--card))]`}
      aria-labelledby={`column-${status}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2
          id={`column-${status}`}
          className={`${headerColors[status]} text-xl sm:text-2xl font-semibold`}
        >
          {title}
        </h2>
        {onAddTask && (
          <button
            onClick={onAddTask}
            className="w-8 h-8 bg-[rgb(var(--muted))] hover:bg-[rgb(var(--accent))] rounded flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
            aria-label={`Add task to ${title}`}
          >
            <Plus className="w-5 h-5 text-[rgb(var(--foreground))]" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-[rgb(var(--muted-foreground))] text-sm text-center py-8">
            No tasks yet
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              status={status}
              onMoveLeft={onMoveTask ? () => onMoveTask(task.id, 'left') : undefined}
              onMoveRight={onMoveTask ? () => onMoveTask(task.id, 'right') : undefined}
              onDelete={onDeleteTask ? () => onDeleteTask(task.id) : undefined}
              onTitleChange={onTaskTitleChange ? (newTitle) => onTaskTitleChange(task.id, newTitle) : undefined}
            />
          ))
        )}
      </div>
    </section>
  );
}
