import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme(actualTheme === 'dark' ? 'light' : 'dark');
    } else if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${actualTheme === 'light' ? 'dark' : 'light'} mode`}
      className="relative w-9 h-9 p-2"
    >
      {actualTheme === 'dark' ? (
        <Moon className="h-5 w-5 text-[rgb(var(--foreground))]" />
      ) : (
        <Sun className="h-5 w-5 text-[rgb(var(--foreground))]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
