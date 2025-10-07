import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/shared/Logo";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  showSignInButton?: boolean;
  onSignInClick?: () => void;
}

export const Header = ({ showSignInButton = true, onSignInClick }: HeaderProps) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

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

  return (
    <header className="flex justify-between items-center px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 max-w-[1280px] mx-auto w-full">
      {/* Logo */}
      <a
        href="/"
        className="flex items-center gap-1.5 sm:gap-2 md:gap-3 no-underline text-[rgb(var(--foreground))] hover:opacity-80 transition-opacity"
        aria-label="AdaBoards Home"
      >
        <Logo className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        <span className="text-base sm:text-xl md:text-2xl font-semibold">AdaBoards</span>
      </a>

      {/* Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
        <ThemeToggle />

        {/* User menu when authenticated */}
        {isAuthenticated && user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User info */}
            <div className="hidden sm:flex items-center gap-2 text-[rgb(var(--muted-foreground))]">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">{user.name}</span>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold transition-colors text-xs sm:text-sm bg-[rgb(var(--destructive))]/10 text-[rgb(var(--destructive))] hover:bg-[rgb(var(--destructive))]/20"
              aria-label="Sign out"
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          /* Sign in button when not authenticated */
          showSignInButton && (
            <button
              onClick={handleSignIn}
              className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-lg font-semibold transition-colors text-xs sm:text-sm md:text-base"
              style={{
                backgroundColor: 'var(--clr-primary)',
                color: 'var(--color-gray-800)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--clr-primary-dark)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--clr-primary)';
              }}
              aria-label="Sign in to your account"
            >
              Sign in
            </button>
          )
        )}
      </div>
    </header>
  );
};
