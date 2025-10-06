interface HeaderProps {
  showSignInButton?: boolean;
  onSignInClick?: () => void;
}

export const Header = ({ showSignInButton = true, onSignInClick }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 md:py-6 max-w-[1280px] mx-auto w-full">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 sm:gap-3 no-underline" style={{ color: 'var(--color-light)' }}>
        <div className="flex gap-1">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded" style={{ backgroundColor: 'var(--color-light)' }}></div>
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded" style={{ backgroundColor: 'var(--color-light)' }}></div>
        </div>
        <span className="text-xl sm:text-2xl font-semibold">AdaBoards</span>
      </a>

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
        >
          Sign in
        </button>
      )}
    </header>
  );
};
