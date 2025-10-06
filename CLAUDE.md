# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Adaboards is a React + TypeScript project management application built with Vite. The project uses Tailwind CSS 4.x with the DaisyUI component library for styling.

## Development Commands

- `npm run dev` - Start development server with HMR
- `npm run build` - Type-check with TypeScript and build for production
- `npm run lint` - Run ESLint on the codebase
- `npm run preview` - Preview production build locally

## Tech Stack

- **Framework**: React 19 with TypeScript 5.9
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4.x + DaisyUI 5.x (via @tailwindcss/vite plugin)
- **Linting**: ESLint 9 with TypeScript ESLint, React Hooks, and React Refresh plugins

## TypeScript Configuration

The project uses TypeScript project references with two separate configs:
- `tsconfig.app.json` - Application code in `src/` with strict mode enabled
- `tsconfig.node.json` - Build configuration files (vite.config.ts, etc.)

Key compiler options:
- Target: ES2022
- Module: ESNext with bundler resolution
- JSX: react-jsx
- Strict mode enabled with additional linting rules (noUnusedLocals, noUnusedParameters, noFallthroughCasesInSwitch)

## Build Configuration

Vite is configured with two plugins in [vite.config.ts](vite.config.ts):
- `@vitejs/plugin-react` - React Fast Refresh via Babel
- `@tailwindcss/vite` - Tailwind CSS v4 integration

## Styling

The project uses Tailwind CSS 4.x with DaisyUI. Styles are imported in:
- [src/index.css](src/index.css) - Main Tailwind import with `@import "tailwindcss"` and base styles in `@layer base`
- [src/App.css](src/App.css) - DaisyUI plugin configuration with `@plugin "daisyui"`

This is a newer approach using CSS imports rather than PostCSS configuration.

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── Board/         # Board-related components
│   │   └── BoardCard.tsx
│   ├── Task/          # Task-related components
│   │   └── TaskCard.tsx
│   └── Header/        # Header component
│       └── Header.tsx
├── pages/             # Application pages
│   ├── Landing.tsx    # Landing page
│   ├── Login.tsx      # Login page
│   ├── Signup.tsx     # Signup page
│   ├── Home.tsx       # Home page (boards list)
│   └── BoardView.tsx  # Board detail view (kanban)
├── services/          # API services
│   └── api.ts         # API service class
├── types/             # TypeScript type definitions
│   └── index.ts       # User, Board, Task types
├── hooks/             # Custom React hooks
│   └── useBoards.ts   # Hook for board management
├── utils/             # Utility functions
│   └── constants.ts   # App constants and routes
├── App.tsx            # Root component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Key Files

- [src/types/index.ts](src/types/index.ts) - Core TypeScript interfaces (User, Board, Task, TaskStatus)
- [src/services/api.ts](src/services/api.ts) - API service for backend communication
- [src/hooks/useBoards.ts](src/hooks/useBoards.ts) - Custom hook for board state management
- [src/utils/constants.ts](src/utils/constants.ts) - Application constants (routes, API URL, localStorage keys)

## Application Architecture

The application follows a feature-based structure:
- **Components**: Reusable UI components organized by feature (Board, Task, Header)
- **Pages**: Full page views that compose components
- **Services**: API communication layer with centralized request handling
- **Hooks**: Custom React hooks for state management and side effects
- **Types**: Centralized TypeScript definitions shared across the application

API service includes authentication token management via localStorage and provides methods for:
- Authentication (login, signup)
- Board CRUD operations
- Task CRUD operations
