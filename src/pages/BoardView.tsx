// Board view page - Kanban board with tasks
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TaskStatus } from '@/types';
import BoardHeader from '@/components/Board/BoardHeader';
import Column from '@/components/Board/Column';
import { useTasks } from '@/hooks/useTasks';



export default function BoardView() {
  const navigate = useNavigate();
  const { id: boardId = 'default-board-id' } = useParams<{ id: string }>();
  const [boardName] = useState('Dataviz');
  const [filter, setFilter] = useState('');

  const { tasks, createTask, patchTask, deleteTask, loading, error } = useTasks(boardId);

  const handleBack = () => {
    navigate('/boards');
  };

  const handleInvite = () => {
    console.log('Open invite modal');
  };

  const handleMoveTask = async (taskId: string, direction: 'left' | 'right') => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    let newStatus = task.status;

    if (direction === 'right') {
      if (task.status === TaskStatus.TODO) newStatus = TaskStatus.IN_PROGRESS;
      else if (task.status === TaskStatus.IN_PROGRESS) newStatus = TaskStatus.DONE;
    } else {
      if (task.status === TaskStatus.DONE) newStatus = TaskStatus.IN_PROGRESS;
      else if (task.status === TaskStatus.IN_PROGRESS) newStatus = TaskStatus.TODO;
    }

    if (newStatus !== task.status) {
      await patchTask(taskId, { status: newStatus });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
  };

  const handleAddTask = async (status: TaskStatus) => {
    await createTask({
      title: 'Something to do',
      status,
    });
  };

  const handleTaskTitleChange = async (taskId: string, newTitle: string) => {
    await patchTask(taskId, { title: newTitle });
  };

  // Loading state
  if (loading) {
    return (
      <div className="h-screen flex flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))] overflow-hidden">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[rgb(var(--primary))] border-r-transparent" role="status" aria-label="Loading">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-4 text-[rgb(var(--muted-foreground))]">Loading tasks...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-screen flex flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))] overflow-hidden">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500">Error: {error}</p>
            <p className="mt-2 text-[rgb(var(--muted-foreground))]">Unable to load tasks. Please check your API connection.</p>
          </div>
        </div>
      </div>
    );
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );

  const todoTasks = filteredTasks.filter(t => t.status === TaskStatus.TODO);
  const inProgressTasks = filteredTasks.filter(t => t.status === TaskStatus.IN_PROGRESS);
  const doneTasks = filteredTasks.filter(t => t.status === TaskStatus.DONE);

  return (
    <div className="h-screen flex flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))] overflow-hidden">
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">
        <BoardHeader
          boardName={boardName}
          onBack={handleBack}
          onInvite={handleInvite}
          onFilterChange={setFilter}
        />

        <div className="flex-1 flex gap-4 sm:gap-6 overflow-x-auto pb-4">
          <Column
            title="To Do"
            tasks={todoTasks}
            status={TaskStatus.TODO}
            onAddTask={() => handleAddTask(TaskStatus.TODO)}
            onMoveTask={handleMoveTask}
            onDeleteTask={handleDeleteTask}
            onTaskTitleChange={handleTaskTitleChange}
          />
          <Column
            title="Doing"
            tasks={inProgressTasks}
            status={TaskStatus.IN_PROGRESS}
            onAddTask={() => handleAddTask(TaskStatus.IN_PROGRESS)}
            onMoveTask={handleMoveTask}
            onDeleteTask={handleDeleteTask}
            onTaskTitleChange={handleTaskTitleChange}
          />
          <Column
            title="Done"
            tasks={doneTasks}
            status={TaskStatus.DONE}
            onAddTask={() => handleAddTask(TaskStatus.DONE)}
            onMoveTask={handleMoveTask}
            onDeleteTask={handleDeleteTask}
            onTaskTitleChange={handleTaskTitleChange}
          />
        </div>
      </div>
    </div>
  );
}
