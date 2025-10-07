# AdaBoards

A React + TypeScript project management application built with Vite, Tailwind CSS, and DaisyUI.

## Project Overview

AdaBoards is a task and project management tool that allows users to organize work into boards with a Kanban-style interface.

## Tech Stack

- **Frontend**: React 19 + TypeScript 5.9
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4.x + DaisyUI 5.x
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Linting**: ESLint 9

## Performance

🚀 **Lighthouse Score: 98%** (Performance)

Optimizations implemented:
- Code splitting with lazy loading
- Bundle size optimization (vendor splitting)
- React Query for efficient data fetching
- CSS code splitting
- Modern ES2020+ output
- Resource preloading and prefetching

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Project Structure

``` src/
├── components/       # Reusable components
│   ├── shared/      # Header, Footer, Logo
│   └── ui/          # UI components
├── pages/           # Application pages
│   ├── Landing.tsx  # Landing page
│   ├── Login.tsx    # Login page
│   ├── Signup.tsx   # Signup page
│   ├── Boards.tsx   # Boards list (home)
│   └── BoardView.tsx # Board detail view
├── services/        # API services
│   └── api.ts       # API service class
├── types/           # TypeScript types
│   └── index.ts     # Board, Task types
├── hooks/           # Custom React hooks
│   └── useBoards.ts # Board management hook
└── utils/           # Utilities
    └── constants.ts # App constants
```

## Day-1 Progress

### ✅ Completed Features

1. **Boards List Page (Home)**
   - Display boards fetched from API via `GET /boards`
   - Show board name and last update time
   - Click on board to navigate to detail view
   - Add new board via `POST /boards`
   - Delete board via `DELETE /boards/:id`

2. **Authentication Pages**
   - Login page with responsive design
   - Signup page with responsive design
   - Header and Footer components
   - Navigation between Login and Signup

3. **Routing**
   - `/` - Landing page
   - `/login` - Login page
   - `/signup` - Signup page
   - `/boards` - Boards list
   - `/boards/:id` - Board detail view

4. **API Integration**
   - API service class with token authentication
   - Custom `useBoards` hook for state management
   - Error handling and loading states

5. **Code Quality**
   - TypeScript configuration with path aliases (`@/*`)
   - Fixed deprecation warnings in tsconfig
   - Responsive and accessible design (min-width: 320px)
   - CSS variables for theming

6. **Performance Optimizations**
   - Code splitting: Pages loaded on-demand
   - Bundle optimization: Vendor chunks separated (React, React Query)
   - React Query: Efficient caching and data synchronization
   - CSS optimization: Code split per page
   - Modern JavaScript: ES2020+ for smaller bundle sizes
   - **Result: 98% Lighthouse Performance Score** 🚀

### 🎯 Next Steps

- Implement login/signup logic with API
- Build board detail view with tasks
- Add task CRUD operations
- Implement drag-and-drop for tasks

---

## Performance Optimizations Details

### Build Configuration

The application uses advanced Vite configuration for optimal performance:

```typescript
// vite.config.ts highlights
- Manual chunk splitting (react-vendor, query-vendor)
- CSS code splitting enabled
- Modern ES target (esnext)
- Assets inlining for small files (<4KB)
- Dependency pre-bundling
```

### Code Splitting

Pages are lazy-loaded to reduce initial bundle size:

```typescript
// App.tsx
const Landing = lazy(() => import("./pages/Landing"));
const Boards = lazy(() => import("./pages/Boards"));
// ... other pages
```

### React Query Integration

Efficient data fetching with automatic caching:

```typescript
// useBoards hook with React Query
- Automatic cache invalidation
- Background refetching
- Optimistic updates support
- 5-minute stale time
```

### Bundle Size

Production build results:
- **react-vendor.js**: 44 KB (gzip: 15.8 KB)
- **query-vendor.js**: 35 KB (gzip: 10.7 KB)
- **Per-page chunks**: 2-8 KB each
- **Total initial load**: ~90 KB (gzip)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
