// Board header component with navigation and actions
import { Header } from '@/components/shared/Header';

interface BoardHeaderProps {
  boardName: string;
  onBack: () => void;
  onInvite?: () => void;
  onViewMembers?: () => void;
  onFilterChange?: (filter: string) => void;
}

export default function BoardHeader({ boardName, onBack, onInvite, onViewMembers, onFilterChange }: BoardHeaderProps) {
  return (
    <Header
      variant="board"
      boardName={boardName}
      onBack={onBack}
      onInvite={onInvite}
      onViewMembers={onViewMembers}
      onFilterChange={onFilterChange}
      showSignInButton={false}
    />
  );
}
