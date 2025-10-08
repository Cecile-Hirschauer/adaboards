# AdaBoards 📋

A modern, offline-first React + TypeScript project management application with Kanban boards, built with Vite, Tailwind CSS v4, React Query, and complete authentication system.

## ✨ Features

### Authentication System
- ✅ **User Registration**: Create account with email, password, and name via `POST /auth/register`
- ✅ **User Login**: Secure authentication via `POST /auth/login`
- ✅ **User Logout**: Clear session and redirect to landing
- ✅ **Protected Routes**: `/boards` and `/boards/:id` require authentication
- ✅ **Public Routes**: Auto-redirect to `/boards` if already authenticated
- ✅ **Session Management**: Token-based auth with automatic expiration (7 days)
- ✅ **Mock Authentication**: Local user storage for development mode
- ✅ **Form Validation**: Zod schemas for email, password, and registration
- ✅ **Error Handling**: Clear error messages for invalid credentials
- ✅ **AuthContext**: Global authentication state without page refresh

### Board Management
- ✅ View all boards with real-time updates
- ✅ Create new boards with `POST /boards`
- ✅ Delete boards with `DELETE /boards/{boardId}`
- ✅ Navigate between boards
- ✅ Last update timestamp on each board
- ✅ Personalized greeting with user's name

### Task Management (Kanban)
- ✅ **Three columns**: To Do, Doing, Done
- ✅ **Create tasks**: Click (+) button to add "Something to do" via `POST /boards/{boardId}/tasks`
- ✅ **Edit task title**: Click on task title, edit inline, auto-save via `PATCH /boards/{boardId}/tasks/{taskId}`
- ✅ **Move tasks**: Use ⬅️ ➡️ buttons to change status via `PATCH /boards/{boardId}/tasks/{taskId}`
- ✅ **Delete tasks**: Click 🗑️ icon via `DELETE /boards/{boardId}/tasks/{taskId}`
- ✅ **Smart button positioning**:
  - To Do column: ➡️ on the right
  - Doing column: ⬅️ left, ➡️ right (edges)
  - Done column: ⬅️ on the left
- ✅ **Filter tasks**: Search bar in board header
- ✅ **Load tasks**: Fetch via `GET /boards/{boardId}/tasks`

### Offline-First Architecture
- ✅ **localStorage persistence**: All data cached automatically
- ✅ **Instant loading**: Data restored from cache on page reload
- ✅ **Background sync**: Automatic API sync when online
- ✅ **Offline mode**: App works without internet connection
- ✅ **Auto-reconnect**: Syncs when connection returns
- 🔄 React Query with `@tanstack/react-query-persist-client`

### UI/UX
- ✅ **Dark mode**: Theme toggle with system preference detection
- ✅ **Responsive design**: Mobile-first (min-width: 320px)
- ✅ **Clean CSS**: Tailwind v4 with standardized RGB variables (`rgb(var(--primary))`)
- ✅ **Accessible**: ARIA labels, keyboard navigation
- ✅ **Smooth animations**: Hover effects, transitions
- ✅ **Color-coded columns**: Yellow (To Do), Cyan (Doing), Green (Done)
- ✅ **Dynamic UI**: Auth state updates without page refresh
- ✅ **User-specific content**: Personalized greetings and user info

### Developer Experience
- ✅ **TypeScript**: Full type safety
- ✅ **Path aliases**: `@/components`, `@/hooks`, etc.
- ✅ **Hot reload**: Vite HMR
- ✅ **ESLint**: Code quality enforcement
- ✅ **Documentation**: Detailed inline comments
- ✅ **Testing**: Vitest for unit tests
- ✅ **Utility functions**: Relative date formatting with full test coverage

## 🚀 Performance

**Lighthouse Score: 98%** 🎯

### Optimizations
- **Code splitting**: Lazy-loaded pages
- **Bundle optimization**: Vendor chunks (React, React Query)
- **React Query caching**: 5min stale time, 24h cache
- **CSS optimization**: Tailwind v4 with minimal CSS (93 lines)
- **Modern JavaScript**: ES2020+ target
- **Resource hints**: Preload, prefetch

### Bundle Size
- **react-vendor.js**: ~45 KB (gzip: 16 KB)
- **query-vendor.js**: ~35 KB (gzip: 11 KB)
- **Per-page chunks**: 2-8 KB each
- **Total initial**: ~90 KB (gzip)

## 📦 Tech Stack

- **Framework**: React 19 + TypeScript 5.9
- **Build**: Vite 7.1
- **Styling**: Tailwind CSS 4.1 (with `@theme`)
- **Routing**: React Router v7
- **State**: React Query v5 (TanStack Query)
- **Persistence**: React Query Persist Client
- **Icons**: Lucide React
- **Fonts**: Inter + Dancing Script
- **Linting**: ESLint 9
- **Testing**: Vitest

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Run tests
npm test
```

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── ProtectedRoute.tsx  # Route guard for authenticated pages
│   │   └── PublicRoute.tsx     # Route guard for public pages
│   ├── Board/
│   │   ├── BoardCard.tsx       # Board preview card
│   │   ├── BoardHeader.tsx     # Board view header with search
│   │   └── Column.tsx          # Kanban column (To Do/Doing/Done)
│   ├── Task/
│   │   └── TaskCard.tsx        # Task card with inline edit
│   ├── shared/
│   │   ├── Header.tsx          # App header with auth buttons
│   │   ├── Footer.tsx          # App footer
│   │   └── Logo.tsx            # App logo
│   └── ui/
│       ├── button.tsx          # Button component (shadcn)
│       ├── input.tsx           # Input component
│       ├── card.tsx            # Card component
│       └── theme-toggle.tsx    # Dark mode toggle
├── pages/
│   ├── Landing.tsx             # Landing page (public)
│   ├── Login.tsx               # Login page with form validation
│   ├── Signup.tsx              # Signup page with form validation
│   ├── Boards.tsx              # Boards list (protected)
│   └── BoardView.tsx           # Board detail with tasks (protected)
├── hooks/
│   ├── useAuth.ts              # Authentication hook
│   ├── useBoards.ts            # Board management (React Query)
│   └── useTasks.ts             # Task management (React Query)
├── services/
│   └── api.ts                  # API service with mock auth
├── lib/
│   └── queryClient.ts          # React Query + localStorage config
├── contexts/
│   ├── AuthContext.tsx         # Authentication context
│   └── ThemeContext.tsx        # Dark mode context
├── schemas/
│   └── auth.schema.ts          # Zod validation schemas
├── types/
│   └── index.ts                # TypeScript types
└── utils/
    ├── auth.ts                 # Auth storage helpers
    ├── mockAuth.ts             # Mock user management
    └── constants.ts            # App constants
```

## 🎨 CSS Architecture

### Tailwind v4 with CSS Variables

Unified CSS variables using shadcn/ui format:

```css
:root {
  /* shadcn/ui RGB format for Tailwind */
  --primary: 196 181 253;              /* bg-[rgb(var(--primary))] */
  --primary-foreground: 43 45 49;      /* text-[rgb(var(--primary-foreground))] */
  --background: 255 255 255;
  --foreground: 43 45 49;
  --destructive: 248 113 113;
  /* ... */

  /* Kanban colors (hex format) */
  --color-todo: #fbbf24;
  --color-doing: #22d3ee;
  --color-done: #34d399;
}

.dark {
  --background: 43 45 49;
  --foreground: 255 255 255;
  /* ... */
}
```

**Usage**: `bg-[rgb(var(--primary))]` instead of `bg-primary` for better control.

## 💾 Offline-First with React Query

### How it works

```
1st Load:  API → Cache → localStorage
Reload:    localStorage → Display (instant!) → API (background)
Offline:   localStorage → Display (no API call)
Online:    Auto sync from API
```

### Configuration

```typescript
// src/lib/queryClient.ts
gcTime: 24h        // Keep data for 24 hours
staleTime: 5min    // Fresh for 5 minutes
refetchOnReconnect: true   // Sync on reconnect
refetchOnWindowFocus: true // Sync on tab focus
```

### localStorage

Data saved in localStorage:

- **`adaboards-cache`**: React Query cache (boards, tasks)
- **`adaboards_auth_token`**: Auth token with expiration (7 days)
- **`adaboards_user`**: Current user data (id, email, name)
- **`adaboards_mock_users`**: Mock user database (development only)

**See in DevTools**: Application → Local Storage

## 🔧 API Service

### Mock Mode (Development)

```typescript
// src/services/api.ts
const USE_MOCK = true; // Default for local dev

// Mock data returns:
- Boards: 2 sample boards
- Tasks: 6 sample tasks
```

### Real API Mode

```bash
# Create .env file
VITE_USE_MOCK=false
VITE_API_BASE_URL=https://your-api.com
```

### API Routes Used

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/auth/register` | Register new user |
| `POST` | `/auth/login` | Login user |
| `POST` | `/auth/logout` | Logout user |
| `POST` | `/auth/validate` | Validate token |
| `GET` | `/boards` | Get all boards |
| `POST` | `/boards` | Create board |
| `DELETE` | `/boards/{boardId}` | Delete board |
| `GET` | `/boards/{boardId}/tasks` | Get tasks |
| `POST` | `/boards/{boardId}/tasks` | Create task |
| `PATCH` | `/boards/{boardId}/tasks/{taskId}` | Update task |
| `DELETE` | `/boards/{boardId}/tasks/{taskId}` | Delete task |

## 🧪 Testing

### Test with Vitest

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Utility Tests

**relativeDate.ts**: Converts timestamps to human-readable relative dates
- ✅ "now" (< 1 minute)
- ✅ "X minute(s) ago" (< 1 hour)
- ✅ "X hour(s) ago" (< 1 day)
- ✅ "X day(s) ago" (< 1 week)
- ✅ "X week(s) ago" (< 1 month)
- ✅ "X month(s) ago" (≥ 1 month)

### Test Authentication

```bash
1. Go to /signup → Create account (email, password, name)
2. Check localStorage → 'adaboards_auth_token' exists ✅
3. Logout → Token cleared ✅
4. Try login with wrong password → Error message ✅
5. Login with correct credentials → Redirected to /boards ✅
6. Try accessing /login while authenticated → Redirected to /boards ✅
7. Try accessing /boards while logged out → Redirected to /login ✅
```

### Test localStorage persistence

```bash
1. Open app → Create boards/tasks
2. DevTools → Application → Local Storage → Check 'adaboards-cache'
3. Reload page → Data appears instantly ✅
```

### Test offline mode

```bash
1. DevTools → Network → Check "Offline"
2. Reload page → App still works ✅
3. Create task → Saved in localStorage
4. Uncheck "Offline" → Auto sync ✅
```

### Test synchronization

```bash
1. Open app in 2 tabs
2. Create task in tab 1
3. Focus tab 2 → Auto sync ✅
```

## 🎯 Key Features Implementation

### React Hooks

```typescript
// useAuth - Authentication management
const { user, isAuthenticated, login, register, logout } = useAuth();

// useBoards - Board management
const { boards, loading, createBoard, deleteBoard } = useBoards();

// useTasks - Task management
const { tasks, createTask, patchTask, deleteTask } = useTasks(boardId);
```

### Optimistic Updates

All mutations use optimistic updates:
1. Update UI immediately
2. Call API in background
3. Rollback if error
4. Sync when successful

### Smart Caching

```typescript
// Boards cached for 24h, fresh for 5min
['boards'] → queryKey

// Tasks cached per board
['tasks', boardId] → queryKey
```

## 🚧 Roadmap

### Completed ✅

- [x] **Authentication System**
  - [x] User registration with validation
  - [x] User login with error handling
  - [x] Session management with token expiration
  - [x] Protected routes
  - [x] Public route redirects
  - [x] Mock authentication for development
- [x] **Board Management**
  - [x] Boards CRUD operations
  - [x] Personalized user greetings
- [x] **Task Management**
  - [x] Tasks CRUD operations
  - [x] Kanban columns with drag-free movement
  - [x] Inline task editing
  - [x] Task filtering
- [x] **Data Persistence**
  - [x] localStorage persistence
  - [x] Offline mode support
  - [x] React Query caching
- [x] **UI/UX**
  - [x] Dark mode with theme toggle
  - [x] Responsive design (mobile-first)
  - [x] Clean CSS architecture
  - [x] Accessible components
- [x] **Performance**
  - [x] Code splitting & lazy loading
  - [x] Performance optimization (98% Lighthouse)
