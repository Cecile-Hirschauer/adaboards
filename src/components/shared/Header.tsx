import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/shared/Logo";

interface HeaderProps {
  showSignInButton?: boolean;
  onSignInClick?: () => void;
}

export const Header = ({ showSignInButton = true, onSignInClick }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 md:py-6 max-w-[1280px] mx-auto w-full">
      {/* Logo */}
      <a
        href="/"
        className="flex items-center gap-2 sm:gap-3 no-underline text-[rgb(var(--foreground))] hover:opacity-80 transition-opacity"
        aria-label="AdaBoards Home"
      >
        <Logo className="w-6 h-6 sm:w-8 sm:h-8" />
        <span className="text-xl sm:text-2xl font-semibold">AdaBoards</span>
      </a>

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggle />

        {/* Sign in button (optional) */}
        {showSignInButton && (
          <button
            onClick={onSignInClick}
            className="px-4 sm:px-6 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base"
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
        )}
      </div>
    </header>
  );
};
