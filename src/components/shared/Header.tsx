import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/shared/Logo";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User, ArrowLeft, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface HeaderProps {
  showSignInButton?: boolean;
  onSignInClick?: () => void;
  // Board header specific props
  variant?: 'default' | 'board';
  boardName?: string;
  onBack?: () => void;
  onInvite?: () => void;
  onFilterChange?: (filter: string) => void;
  // Custom content to replace logo
  leftContent?: ReactNode;
}

export const Header = ({
  showSignInButton = true,
  onSignInClick,
  variant = 'default',
  boardName,
  onBack,
  onInvite,
  onFilterChange,
  leftContent
}: HeaderProps) => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  // Debug: log auth state
  console.log('[Header] Auth state:', { isAuthenticated, user: user?.name, isLoading, showSignInButton });

  const handleLogout = () => {
    logout();
  };

  const handleSignIn = () => {
    if (onSignInClick) {
      onSignInClick();
    } else {
      navigate('/login');
    }
  };

  // Board variant layout
  if (variant === 'board') {
    return (
      <header className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
        {leftContent || (
          <>
            <button
              onClick={onBack}
              className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] rounded p-1"
              aria-label="Go back to boards"
            >
              <ArrowLeft className="w-7 h-7 sm:w-8 sm:h-8" />
            </button>

            <h1 className="text-[rgb(var(--foreground))] text-2xl sm:text-3xl font-semibold">
              {boardName}
            </h1>
          </>
        )}

        {onFilterChange && (
          <input
            type="text"
            placeholder="Filter cards..."
            onChange={(e) => onFilterChange(e.target.value)}
            className="flex-1 w-full sm:max-w-md bg-[rgb(var(--input))] text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] px-4 py-2 rounded-lg border border-[rgb(var(--border))] focus:outline-none focus:border-[rgb(var(--primary))] transition-colors"
            aria-label="Filter cards"
          />
        )}

        <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
          <ThemeToggle />
          {onInvite && (
            <Button
              onClick={onInvite}
              className="w-full sm:w-auto bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90 font-semibold"
              aria-label="Invite members to board"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Inviter
            </Button>
          )}
        </div>
      </header>
    );
  }

  // Default variant layout
  return (
    <header className="flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-5 md:py-6 lg:py-7 w-full">
      {/* Logo */}
      {leftContent || (
        <a
          href="/"
          className="flex items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 no-underline text-[rgb(var(--foreground))] hover:opacity-80 transition-opacity"
          aria-label="AdaBoards Home"
        >
          <Logo className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14" />
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">AdaBoards</span>
        </a>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        <ThemeToggle />

        {/* Loading state */}
        {isLoading ? (
          <div className="w-24 h-10 md:w-28 md:h-12 lg:w-32 lg:h-14 bg-[rgb(var(--muted))] animate-pulse rounded-lg" />
        ) : /* User menu when authenticated */
        isAuthenticated && user ? (
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* User info */}
            <div className="hidden sm:flex items-center gap-2 md:gap-3 text-[rgb(var(--muted-foreground))]">
              <User className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
              <span className="text-sm md:text-base lg:text-lg xl:text-xl font-medium">{user.name}</span>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 md:gap-2.5 px-4 sm:px-5 md:px-6 lg:px-7 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-lg font-semibold transition-colors text-sm sm:text-base md:text-lg lg:text-xl bg-[rgb(var(--destructive))]/10 text-[rgb(var(--destructive))] hover:bg-[rgb(var(--destructive))]/20"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : showSignInButton ? (
          /* Sign in button when not authenticated */
          <button
            onClick={handleSignIn}
            className="px-4 sm:px-5 md:px-7 lg:px-9 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg font-semibold transition-colors text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90"
            aria-label="Sign in to your account"
          >
            Sign in
          </button>
        ) : null}
      </div>
    </header>
  );
};
