// Board header component with navigation and actions
import { Header } from '@/components/shared/Header';

interface BoardHeaderProps {
  boardName: string;
  onBack: () => void;
  onInvite?: () => void;
  onFilterChange?: (filter: string) => void;
}

export default function BoardHeader({ boardName, onBack, onInvite, onFilterChange }: BoardHeaderProps) {
  return (
    <Header
      variant="board"
      boardName={boardName}
      onBack={onBack}
      onInvite={onInvite}
      onFilterChange={onFilterChange}
      showSignInButton={false}
    />
  );
}
