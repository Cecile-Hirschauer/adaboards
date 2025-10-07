# AdaBoards 📋

A modern, offline-first React + TypeScript project management application with Kanban boards, built with Vite, Tailwind CSS v4, and React Query.

## ✨ Features

### Board Management
- ✅ View all boards with real-time updates
- ✅ Create new boards with `POST /boards`
- ✅ Delete boards with `DELETE /boards/{boardId}`
- ✅ Navigate between boards
- ✅ Last update timestamp on each board

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
- ✅ **Clean CSS**: Tailwind v4 with `@theme` (unified `--color-*` variables)
- ✅ **Accessible**: ARIA labels, keyboard navigation
- ✅ **Smooth animations**: Hover effects, transitions
- ✅ **Color-coded columns**: Yellow (To Do), Cyan (Doing), Green (Done)

### Developer Experience
- ✅ **TypeScript**: Full type safety
- ✅ **Path aliases**: `@/components`, `@/hooks`, etc.
- ✅ **Hot reload**: Vite HMR
- ✅ **ESLint**: Code quality enforcement
- ✅ **Documentation**: Detailed inline comments

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
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Board/
│   │   ├── BoardCard.tsx      # Board preview card
│   │   ├── BoardHeader.tsx    # Board view header with search
│   │   └── Column.tsx          # Kanban column (To Do/Doing/Done)
│   ├── Task/
│   │   └── TaskCard.tsx        # Task card with inline edit
│   ├── shared/
│   │   ├── Header.tsx          # App header
│   │   ├── Footer.tsx          # App footer
│   │   └── Logo.tsx            # App logo
│   └── ui/
│       ├── button.tsx          # Button component (shadcn)
│       ├── input.tsx           # Input component
│       ├── card.tsx            # Card component
│       └── theme-toggle.tsx    # Dark mode toggle
├── pages/
│   ├── Landing.tsx             # Landing page
│   ├── Login.tsx               # Login page
│   ├── Signup.tsx              # Signup page
│   ├── Boards.tsx              # Boards list (home)
│   └── BoardView.tsx           # Board detail with tasks
├── hooks/
│   ├── useBoards.ts            # Board management (React Query)
│   └── useTasks.ts             # Task management (React Query)
├── services/
│   └── api.ts                  # API service with mock mode
├── lib/
│   └── queryClient.ts          # React Query + localStorage config
├── contexts/
│   └── ThemeContext.tsx        # Dark mode context
├── types/
│   └── index.ts                # TypeScript types
└── utils/
    └── constants.ts            # App constants
```

## 🎨 CSS Architecture

### Tailwind v4 with `@theme`

```css
@theme {
  /* Couleurs Kanban */
  --color-todo: #fbbf24;      /* bg-todo, text-todo, border-todo */
  --color-doing: #22d3ee;     /* bg-doing, text-doing, border-doing */
  --color-done: #34d399;      /* bg-done, text-done, border-done */
  --color-error: #f87171;
  --color-primary: #c4b5fd;

  /* Couleurs grises */
  --color-gray-800: #2b2d31;
  --color-gray-700: #3d3f45;
  /* ... */
}
```

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

Data saved in `localStorage['adaboards-cache']`:
- All boards
- All tasks per board
- Query metadata (timestamp, state)

**See in DevTools**: Application → Local Storage → `adaboards-cache`

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
| `GET` | `/boards` | Get all boards |
| `POST` | `/boards` | Create board |
| `DELETE` | `/boards/{boardId}` | Delete board |
| `GET` | `/boards/{boardId}/tasks` | Get tasks |
| `POST` | `/boards/{boardId}/tasks` | Create task |
| `PATCH` | `/boards/{boardId}/tasks/{taskId}` | Update task |
| `DELETE` | `/boards/{boardId}/tasks/{taskId}` | Delete task |

## 🧪 Testing

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

## 📚 Documentation

- 📖 [LOCALSTORAGE_IMPLEMENTATION.md](LOCALSTORAGE_IMPLEMENTATION.md) - Offline-first architecture explained
- 📖 [REFACTORING_COMPLETE.md](REFACTORING_COMPLETE.md) - CSS refactoring details
- 📖 [REFACTORING_TAILWIND_V4.md](REFACTORING_TAILWIND_V4.md) - Tailwind v4 migration guide
- 📖 [LOCALSTORAGE_SYNC.md](LOCALSTORAGE_SYNC.md) - Sync strategies comparison

## 🎯 Key Features Implementation

### React Query Hooks

```typescript
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
- [x] Boards CRUD
- [x] Tasks CRUD
- [x] Kanban columns with drag-free movement
- [x] Inline task editing
- [x] localStorage persistence
- [x] Offline mode
- [x] Dark mode
- [x] Responsive design
- [x] Performance optimization (98% Lighthouse)