import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="gap-2"
      aria-label="Sign out"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </Button>
  );
}
