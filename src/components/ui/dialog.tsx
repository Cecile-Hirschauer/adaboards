// Dialog component - Accessible modal dialog
import { ReactNode, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onOpenChange]);

  // Gérer le focus trap
  useEffect(() => {
    if (open && dialogRef.current) {
      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      firstElement?.focus();

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [open]);

  // Bloquer le scroll du body
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Dialog content */}
      <div
        ref={dialogRef}
        className="relative bg-[rgb(var(--card))] rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto border border-[rgb(var(--border))]"
      >
        {children}
      </div>
    </div>
  );
}

interface DialogContentProps {
  children: ReactNode;
  onClose: () => void;
}

export function DialogContent({ children, onClose }: DialogContentProps) {
  return (
    <div className="relative p-5 sm:p-6 md:p-8">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors rounded-lg p-1 hover:bg-[rgb(var(--accent))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
        aria-label="Fermer"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {children}
    </div>
  );
}

interface DialogHeaderProps {
  children: ReactNode;
}

export function DialogHeader({ children }: DialogHeaderProps) {
  return (
    <div className="mb-4 sm:mb-6 pr-8 sm:pr-10">
      {children}
    </div>
  );
}

interface DialogTitleProps {
  children: ReactNode;
}

export function DialogTitle({ children }: DialogTitleProps) {
  return (
    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[rgb(var(--foreground))]">
      {children}
    </h2>
  );
}

interface DialogDescriptionProps {
  children: ReactNode;
}

export function DialogDescription({ children }: DialogDescriptionProps) {
  return (
    <p className="text-sm sm:text-base md:text-lg text-[rgb(var(--muted-foreground))] mt-2">
      {children}
    </p>
  );
}

interface DialogFooterProps {
  children: ReactNode;
}

export function DialogFooter({ children }: DialogFooterProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 mt-6 sm:mt-8">
      {children}
    </div>
  );
}
