// Home page - displays user's boards
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import BoardCard from '@/components/Board/BoardCard';

// Mock data - replace with real data later
const mockBoards = [
  {
    id: '1',
    title: 'Project Alpha',
    description: 'Main development board for the Alpha project with all ongoing tasks and milestones',
    ownerId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Marketing Campaign',
    description: 'Q1 2025 marketing initiatives and content calendar',
    ownerId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Design System',
    description: 'Component library and design tokens',
    ownerId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Home() {
  const handleCreateBoard = () => {
    console.log('Create new board');
  };

  const handleOpenBoard = (id: string) => {
    console.log('Open board:', id);
  };

  const handleDeleteBoard = (id: string) => {
    console.log('Delete board:', id);
  };

  // Mock user name
  const userName = 'Ada';

  return (
    <div className="h-screen flex flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))] overflow-auto">
      <Header showSignInButton={false} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 md:py-8">
        {/* Greeting Section */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            <span className="text-[rgb(var(--foreground))]">Welcome back, </span>
            <span className="text-[rgb(var(--primary))]" style={{ fontFamily: 'var(--font-handwriting)' }}>
              {userName}
            </span>
          </h1>
          <p className="text-[rgb(var(--muted-foreground))] text-sm sm:text-base">
            {mockBoards.length} {mockBoards.length === 1 ? 'board' : 'boards'} available
          </p>
        </div>

        {/* Boards Section */}
        <section aria-labelledby="boards-heading">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 id="boards-heading" className="text-xl sm:text-2xl font-semibold">
              Your Boards
            </h2>
            <Button
              onClick={handleCreateBoard}
              className="bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90 w-full sm:w-auto"
              aria-label="Create new board"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Board
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {mockBoards.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                onOpen={handleOpenBoard}
                onDelete={handleDeleteBoard}
              />
            ))}
          </div>

          {/* Empty state - show when no boards */}
          {mockBoards.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[rgb(var(--muted-foreground))] mb-4">
                No boards yet. Create your first board to get started!
              </p>
              <Button
                onClick={handleCreateBoard}
                className="bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Board
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
