
# 🎯 Plan d'implémentation - Jour 2

## Vue d'ensemble

Vous allez implémenter l'authentification complète, la protection des routes, et des features avancées.

## 📋 Ordre d'implémentation recommandé

### Phase 1 : Infrastructure d'authentification (2-3h)
**Priorité : HAUTE** - Foundation pour tout le reste

#### 1.1 Context d'authentification
```typescript
// src/contexts/AuthContext.tsx
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}
```

**Solution recommandée** : Context API React
- ✅ Simple et natif
- ✅ Parfait pour l'état global d'auth
- ✅ Pas besoin de librairie externe

**Alternatives** :
- Zustand (plus léger que Redux)
- Jotai (atoms)
- React Query avec persistance (déjà utilisé)

#### 1.2 Hook personnalisé
```typescript
// src/hooks/useAuth.ts
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

#### 1.3 LocalStorage pour le token
```typescript
// src/utils/auth.ts
export const authStorage = {
  getToken: () => localStorage.getItem('adaboards_auth_token'),
  setToken: (token: string) => localStorage.setItem('adaboards_auth_token', token),
  removeToken: () => localStorage.removeItem('adaboards_auth_token'),
  getUser: () => JSON.parse(localStorage.getItem('adaboards_user') || 'null'),
  setUser: (user: User) => localStorage.setItem('adaboards_user', JSON.stringify(user)),
  removeUser: () => localStorage.removeItem('adaboards_user'),
}
```

### Phase 2 : Routes API d'authentification (1h)
**Priorité : HAUTE**

#### 2.1 Ajouter dans api.ts
```typescript
// src/services/api.ts
async login(email: string, password: string): Promise<{ user: User; token: string }> {
  if (USE_MOCK) {
    return {
      user: { id: '1', email, name: 'John Doe', createdAt: new Date() },
      token: 'mock-token-123',
    };
  }
  return this.request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

async register(email: string, password: string, name: string): Promise<{ user: User; token: string }> {
  if (USE_MOCK) {
    return {
      user: { id: '2', email, name, createdAt: new Date() },
      token: 'mock-token-456',
    };
  }
  return this.request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });
}

async logout(): Promise<void> {
  if (USE_MOCK) {
    return Promise.resolve();
  }
  return this.request('/auth/logout', { method: 'POST' });
}
```

#### 2.2 Hook useAuth avec React Query
```typescript
// src/hooks/useAuth.ts
export function useAuthMutations() {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginData) => api.login(email, password),
    onSuccess: (data) => {
      authStorage.setToken(data.token);
      authStorage.setUser(data.user);
      // Invalider tous les caches pour recharger avec le nouveau token
      queryClient.invalidateQueries();
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => api.register(data.email, data.password, data.name),
    onSuccess: (data) => {
      authStorage.setToken(data.token);
      authStorage.setUser(data.user);
      queryClient.invalidateQueries();
    },
  });

  return { loginMutation, registerMutation };
}
```

### Phase 3 : Protection des routes (1h)
**Priorité : HAUTE**

#### 3.1 Composant ProtectedRoute
```typescript
// src/components/auth/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    // Rediriger vers login en sauvegardant la destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
```

#### 3.2 Composant PublicRoute (pour landing)
```typescript
// src/components/auth/PublicRoute.tsx
export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/boards" replace />;
  }

  return <>{children}</>;
}
```

#### 3.3 Mise à jour App.tsx
```typescript
// src/App.tsx
<AuthProvider>
  <Routes>
    <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
    <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

    <Route path="/boards" element={<ProtectedRoute><Boards /></ProtectedRoute>} />
    <Route path="/boards/:id" element={<ProtectedRoute><BoardView /></ProtectedRoute>} />
  </Routes>
</AuthProvider>
```

### Phase 4 : Pages Login/Signup (1-2h)
**Priorité : HAUTE**

#### 4.1 Mise à jour Login.tsx
```typescript
// src/pages/Login.tsx
export default function Login() {
  const { loginMutation } = useAuthMutations();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await loginMutation.mutateAsync({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });

      // Rediriger vers la page d'origine ou /boards
      const from = location.state?.from?.pathname || '/boards';
      navigate(from, { replace: true });
    } catch (error) {
      // Afficher l'erreur
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Connexion...' : 'Se connecter'}
      </button>
      {loginMutation.isError && <p>Erreur de connexion</p>}
    </form>
  );
}
```

### Phase 5 : TDD - Date relative (1-2h)
**Priorité : MOYENNE** - Feature isolée, bon moment pour apprendre TDD

#### 5.1 Installation de Vitest
```bash
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom
```

#### 5.2 Configuration vitest.config.ts
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

#### 5.3 TDD - Red, Green, Refactor
```typescript
// src/utils/__tests__/relativeTime.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getRelativeTime } from '../relativeTime';

describe('getRelativeTime', () => {
  beforeEach(() => {
    // Mock la date actuelle
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return "maintenant" for dates less than 1 minute ago', () => {
    const date = new Date('2025-01-15T11:59:30Z'); // 30 secondes avant
    expect(getRelativeTime(date)).toBe('maintenant');
  });

  it('should return "il y a X minutes" for dates less than 1 hour ago', () => {
    const date = new Date('2025-01-15T11:58:00Z'); // 2 minutes avant
    expect(getRelativeTime(date)).toBe('il y a 2 minutes');
  });

  it('should return "il y a X heures" for dates less than 1 day ago', () => {
    const date = new Date('2025-01-15T10:00:00Z'); // 2 heures avant
    expect(getRelativeTime(date)).toBe('il y a 2 heures');
  });

  it('should return "il y a X jours" for dates less than 30 days ago', () => {
    const date = new Date('2025-01-13T12:00:00Z'); // 2 jours avant
    expect(getRelativeTime(date)).toBe('il y a 2 jours');
  });

  it('should return "il y a X mois" for dates less than 1 year ago', () => {
    const date = new Date('2024-11-15T12:00:00Z'); // 2 mois avant
    expect(getRelativeTime(date)).toBe('il y a 2 mois');
  });

  it('should return "il y a X ans" for dates more than 1 year ago', () => {
    const date = new Date('2023-01-15T12:00:00Z'); // 2 ans avant
    expect(getRelativeTime(date)).toBe('il y a 2 ans');
  });
});
```

#### 5.4 Implémentation
```typescript
// src/utils/relativeTime.ts
export function getRelativeTime(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) return 'maintenant';
  if (diffMinutes < 60) return `il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
  if (diffHours < 24) return `il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
  if (diffDays < 30) return `il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  if (diffMonths < 12) return `il y a ${diffMonths} mois`;
  return `il y a ${diffYears} an${diffYears > 1 ? 's' : ''}`;
}
```

#### 5.5 Utilisation dans BoardCard
```typescript
// src/components/Board/BoardCard.tsx
import { getRelativeTime } from '@/utils/relativeTime';

<p className="text-sm text-gray-500">
  Mis à jour {getRelativeTime(board.updated_at)}
</p>
```

### Phase 6 : Modal d'invitation (1-2h)
**Priorité : MOYENNE**

#### 6.1 Installation de Radix UI Dialog
```bash
npm install @radix-ui/react-dialog
```

#### 6.2 Composant InviteModal
```typescript
// src/components/Board/InviteModal.tsx
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

export function InviteModal({ boardId, isOpen, onClose }: InviteModalProps) {
  const [email, setEmail] = useState('');

  const handleInvite = async () => {
    // TODO: Appeler API pour inviter
    await api.inviteMember(boardId, email);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-96">
          <Dialog.Title className="text-xl font-bold mb-4">
            Inviter un membre
          </Dialog.Title>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full border rounded px-3 py-2"
          />
          <div className="flex gap-2 mt-4">
            <button onClick={handleInvite}>Inviter</button>
            <Dialog.Close asChild>
              <button>Annuler</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

### Phase 7 : BONUS - Fuzzy Search TDD (2h)
**Priorité : BASSE** - À faire si temps disponible

#### 7.1 Tests d'abord
```typescript
// src/utils/__tests__/fuzzySearch.test.ts
describe('fuzzySearch', () => {
  const items = [
    'Apple',
    'Application',
    'Banana',
    'Pineapple',
    'Orange',
  ];

  it('should find exact matches', () => {
    expect(fuzzySearch(items, 'Apple')).toContain('Apple');
  });

  it('should find partial matches', () => {
    expect(fuzzySearch(items, 'app')).toContain('Apple');
    expect(fuzzySearch(items, 'app')).toContain('Application');
    expect(fuzzySearch(items, 'app')).toContain('Pineapple');
  });

  it('should handle non-consecutive characters', () => {
    expect(fuzzySearch(items, 'apl')).toContain('Apple');
    expect(fuzzySearch(items, 'apl')).toContain('Application');
  });

  it('should return empty array for no matches', () => {
    expect(fuzzySearch(items, 'xyz')).toEqual([]);
  });

  it('should be case insensitive', () => {
    expect(fuzzySearch(items, 'APPLE')).toContain('Apple');
  });
});
```

#### 7.2 Implémentation
```typescript
// src/utils/fuzzySearch.ts
export function fuzzySearch<T>(
  items: T[],
  query: string,
  getSearchable: (item: T) => string = (item) => String(item)
): T[] {
  if (!query) return items;

  const queryLower = query.toLowerCase();

  return items.filter((item) => {
    const searchable = getSearchable(item).toLowerCase();
    let queryIndex = 0;

    for (let i = 0; i < searchable.length && queryIndex < queryLower.length; i++) {
      if (searchable[i] === queryLower[queryIndex]) {
        queryIndex++;
      }
    }

    return queryIndex === queryLower.length;
  });
}
```

#### 7.3 Utilisation dans BoardView
```typescript
// src/pages/BoardView.tsx
import { fuzzySearch } from '@/utils/fuzzySearch';

const filteredTasks = fuzzySearch(tasks, filter, (task) => task.title);
```

### Phase 8 : BONUS - Avatars (1h)
**Priorité : BASSE**

#### 8.1 Service d'avatars
```typescript
// src/utils/avatar.ts
export function getAvatarUrl(user: User): string {
  // Option 1: Gravatar
  const hash = md5(user.email.toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;

  // Option 2: UI Avatars (plus simple, pas besoin de hash)
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=c4b5fd&color=2b2d31`;

  // Option 3: DiceBear (avatars générés)
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`;
}
```

#### 8.2 Composant Avatar
```typescript
// src/components/ui/Avatar.tsx
export function Avatar({ user, size = 'md' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <img
      src={getAvatarUrl(user)}
      alt={user.name}
      className={`${sizes[size]} rounded-full`}
    />
  );
}
```

## 🗓️ Planning recommandé

### Jour 1 (4-5h)
1. ✅ Phase 1 : Context d'auth (1h30)
2. ✅ Phase 2 : Routes API (1h)
3. ✅ Phase 3 : Protection routes (1h)
4. ✅ Phase 4 : Pages Login/Signup (1h30)

**À la fin de J1** : Authentification complète fonctionnelle

### Jour 2 (3-4h)
5. ✅ Phase 5 : TDD Date relative (1h30)
6. ✅ Phase 6 : Modal d'invitation (1h30)
7. 🎁 Phase 7 : Fuzzy search (bonus, 2h)
8. 🎁 Phase 8 : Avatars (bonus, 1h)

## 📚 Ressources

### Documentation
- [React Context](https://react.dev/learn/passing-data-deeply-with-context)
- [React Router - Protected Routes](https://reactrouter.com/en/main/start/tutorial#protecting-routes)
- [Vitest](https://vitest.dev/guide/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Radix UI Dialog](https://www.radix-ui.com/primitives/docs/components/dialog)

### TDD
1. **Red** : Écrire un test qui échoue
2. **Green** : Écrire le code minimal pour que le test passe
3. **Refactor** : Améliorer le code sans casser les tests

## 🎯 Checklist finale

```markdown
### Phase 1 - Auth Infrastructure
- [ ] AuthContext créé avec types
- [ ] AuthProvider wrappé dans App.tsx
- [ ] Hook useAuth fonctionnel
- [ ] LocalStorage helper créé

### Phase 2 - API Routes
- [ ] api.login() implémenté
- [ ] api.register() implémenté
- [ ] api.logout() implémenté
- [ ] Mode mock fonctionnel

### Phase 3 - Route Protection
- [ ] ProtectedRoute component
- [ ] PublicRoute component
- [ ] Routes protégées dans App.tsx
- [ ] Redirection après login

### Phase 4 - Pages
- [ ] Login page fonctionnelle
- [ ] Signup page fonctionnelle
- [ ] Logout button dans Header
- [ ] Messages d'erreur affichés

### Phase 5 - TDD Date
- [ ] Vitest configuré
- [ ] Tests écrits (au moins 6)
- [ ] Fonction getRelativeTime implémentée
- [ ] Tous les tests passent
- [ ] Utilisé dans BoardCard

### Phase 6 - Modal
- [ ] InviteModal component
- [ ] Bouton "Inviter" dans BoardHeader
- [ ] Formulaire d'invitation
- [ ] API call (mock OK)

### Bonus
- [ ] Fuzzy search TDD
- [ ] Avatars utilisateurs
```

---

**Conseil** : Commencez par les Phases 1-4 (auth), c'est la fondation. Ensuite faites le TDD (Phase 5) pour apprendre la méthodologie. Les bonus viennent après !

Bonne chance ! 🚀
