// Board view page - Kanban board with tasks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskStatus } from '@/types';
import BoardHeader from '@/components/Board/BoardHeader';
import Column from '@/components/Board/Column';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
}

export default function BoardView() {
  const navigate = useNavigate();
  const [boardName] = useState('Dataviz');
  const [filter, setFilter] = useState('');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: "Appliquer l'asynchrone",
      status: TaskStatus.TODO
    },
    {
      id: '2',
      title: "Se familiariser avec une bibliothèque d'animation graphique JavaScript",
      status: TaskStatus.TODO
    },
    {
      id: '3',
      title: "Se poser la question de la durée de vie de son applicatif",
      status: TaskStatus.IN_PROGRESS
    },
    {
      id: '4',
      title: "Manipuler du CSS et du HTML",
      status: TaskStatus.DONE
    },
    {
      id: '5',
      title: "Mettre en place un environnement Web permettant de travailler en groupe sur le même projet",
      status: TaskStatus.DONE
    },
    {
      id: '6',
      title: "Créer un repo commun et utiliser les commandes de base git",
      status: TaskStatus.DONE
    }
  ]);

  const handleBack = () => {
    navigate('/boards');
  };

  const handleInvite = () => {
    console.log('Open invite modal');
  };

  const handleMoveTask = (taskId: string, direction: 'left' | 'right') => {
    setTasks(prevTasks => {
      const taskIndex = prevTasks.findIndex(t => t.id === taskId);
      if (taskIndex === -1) return prevTasks;

      const task = prevTasks[taskIndex];
      let newStatus = task.status;

      if (direction === 'right') {
        if (task.status === TaskStatus.TODO) newStatus = TaskStatus.IN_PROGRESS;
        else if (task.status === TaskStatus.IN_PROGRESS) newStatus = TaskStatus.DONE;
      } else {
        if (task.status === TaskStatus.DONE) newStatus = TaskStatus.IN_PROGRESS;
        else if (task.status === TaskStatus.IN_PROGRESS) newStatus = TaskStatus.TODO;
      }

      const updatedTasks = [...prevTasks];
      updatedTasks[taskIndex] = { ...task, status: newStatus };
      return updatedTasks;
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
  };

  const handleAddTask = (status: TaskStatus) => {
    const taskTitle = prompt('Enter task title:');
    if (taskTitle) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskTitle,
        status
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
  };

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
          />
          <Column
            title="Doing"
            tasks={inProgressTasks}
            status={TaskStatus.IN_PROGRESS}
            onAddTask={() => handleAddTask(TaskStatus.IN_PROGRESS)}
            onMoveTask={handleMoveTask}
            onDeleteTask={handleDeleteTask}
          />
          <Column
            title="Done"
            tasks={doneTasks}
            status={TaskStatus.DONE}
            onAddTask={() => handleAddTask(TaskStatus.DONE)}
            onMoveTask={handleMoveTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
}
