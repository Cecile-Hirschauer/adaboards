# AdaBoards

A React + TypeScript project management application built with Vite, Tailwind CSS, and DaisyUI.

## Project Overview

AdaBoards is a task and project management tool that allows users to organize work into boards with a Kanban-style interface.

## Tech Stack

- **Frontend**: React 19 + TypeScript 5.9
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4.x + DaisyUI 5.x
- **Routing**: React Router v6
- **Linting**: ESLint 9

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
   - Responsive and accessible design
   - CSS variables for theming

### 🎯 Next Steps

- Implement login/signup logic with API
- Build board detail view with tasks
- Add task CRUD operations
- Implement drag-and-drop for tasks

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
