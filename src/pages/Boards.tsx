// Boards page - displays user's boards
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/shared/Header';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface Board {
  id: string;
  name: string;
  updatedAt: Date;
  members: string[];
}

export default function Boards() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState<Board[]>([
    {
      id: '1',
      name: 'Dataviz',
      updatedAt: new Date('2025-01-06T10:56:00Z'),
      members: ['Ada Lovelace', 'Dorothy Vaughan']
    },
    {
      id: '2',
      name: 'Plateforme de meubles',
      updatedAt: new Date('2025-01-04T10:00:00Z'),
      members: ['Ada Lovelace']
    }
  ]);

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 60) {
      return `Edited ${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `Edited ${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `Edited ${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  const handleDeleteBoard = (id: string) => {
    setBoards(boards.filter(board => board.id !== id));
  };

  const handleAddBoard = () => {
    const boardName = prompt('Enter board name:');
    if (boardName) {
      const newBoard: Board = {
        id: Date.now().toString(),
        name: boardName,
        updatedAt: new Date(),
        members: ['Ada Lovelace']
      };
      setBoards([...boards, newBoard]);
    }
  };

  const handleOpenBoard = (id: string) => {
    navigate(`/boards/${id}`);
  };

  const userName = 'Ada Lovelace';

  return (
    <div className="h-screen flex flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))] overflow-auto">
      <Header showSignInButton={false} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 md:py-8">
        {/* Greeting Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-[rgb(var(--foreground))]">Hello, </span>
            <span className="text-[rgb(var(--primary))]" style={{ fontFamily: 'var(--font-handwriting)' }}>
              {userName}
            </span>
            <span className="text-[rgb(var(--foreground))]"> !</span>
          </h1>
          <Button
            onClick={handleAddBoard}
            className="bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90 w-full sm:w-auto"
            aria-label="Add new board"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add board
          </Button>
        </div>

        {/* Boards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {boards.map((board) => (
            <article
              key={board.id}
              className="bg-[rgb(var(--card))] rounded-2xl p-6 border border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] transition-all cursor-pointer group"
              onClick={() => handleOpenBoard(board.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenBoard(board.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Open board ${board.name}`}
            >
              {/* Board Header */}
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold text-[rgb(var(--foreground))]">
                  {board.name}
                </h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBoard(board.id);
                  }}
                  className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--destructive))] transition-colors opacity-0 group-hover:opacity-100 p-1"
                  aria-label={`Delete board ${board.name}`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Last Edited */}
              <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">
                {getTimeAgo(board.updatedAt)}
              </p>

              {/* Members */}
              <div className="flex flex-wrap gap-2">
                {board.members.map((member, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-full text-sm font-medium"
                  >
                    {member}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {boards.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[rgb(var(--muted-foreground))] text-xl mb-4">
              No boards yet
            </p>
            <Button
              onClick={handleAddBoard}
              className="bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create your first board
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
