// Boards page - displays user's boards
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/shared/Header';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useBoards } from '@/hooks/useBoards';
import { useAuth } from '@/hooks/useAuth';
import { getRelativeDate } from '@/utils/relativeDate';

export default function Boards() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { boards, loading, error, deleteBoard: deleteBoardApi, createBoard: createBoardApi, loadBoards } = useBoards();

  const getTimeAgo = (dateString: string) => {
    const updatedAt = new Date(dateString);
    const now = new Date();
    return `Edited ${getRelativeDate(updatedAt, now)}`
   
  };

  const handleDeleteBoard = async (id: string) => {
    try {
      await deleteBoardApi(id);
    } catch (err) {
      console.error('Failed to delete board:', err);
    }
  };

  const handleAddBoard = async () => {
    const boardName = prompt('Enter board name:');
    if (boardName) {
      try {
        await createBoardApi({ name: boardName });
      } catch (err) {
        console.error('Failed to create board:', err);
      }
    }
  };

  const handleOpenBoard = (id: string) => {
    navigate(`/boards/${id}`);
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
        <Header showSignInButton={false} />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[rgb(var(--muted-foreground))]">Loading boards...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
        <Header showSignInButton={false} />
        <main className="flex-1 flex items-center justify-center flex-col gap-4">
          <p className="text-[rgb(var(--destructive))]">Error: {error}</p>
          <Button onClick={() => loadBoards()}>Retry</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))] overflow-auto">
      <Header showSignInButton={false} />

      <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 w-full py-4 sm:py-6 md:py-8">
        {/* Greeting Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            <span className="text-[rgb(var(--foreground))]">Hello</span>
            {user?.name && (
              <>
                <span className="text-[rgb(var(--foreground))]">, </span>
                <span className="text-[rgb(var(--primary))]" style={{ fontFamily: 'var(--font-handwriting)' }}>
                  {user.name}
                </span>
              </>
            )}
            <span className="text-[rgb(var(--foreground))]"> !</span>
          </h1>
          <Button
            onClick={handleAddBoard}
            className="bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90 w-full sm:w-auto text-sm sm:text-base px-4 py-2"
            aria-label="Add new board"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add board
          </Button>
        </div>

        {/* Boards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {boards.map((board) => (
            <article
              key={board.id}
              className="bg-[rgb(var(--card))] rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] transition-all cursor-pointer group"
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
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[rgb(var(--foreground))] break-words pr-2">
                  {board.name}
                </h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBoard(board.id);
                  }}
                  className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--destructive))] transition-colors opacity-0 group-hover:opacity-100 p-1 flex-shrink-0"
                  aria-label={`Delete board ${board.name}`}
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Last Edited */}
              <p className="text-xs sm:text-sm text-[rgb(var(--muted-foreground))]">
                {getTimeAgo(board.updated_at)}
              </p>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {boards.length === 0 && (
          <div className="text-center py-12 sm:py-16 md:py-20 px-4">
            <p className="text-[rgb(var(--muted-foreground))] text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
              No boards yet
            </p>
            <Button
              onClick={handleAddBoard}
              className="bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90 text-sm sm:text-base px-4 py-2"
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
