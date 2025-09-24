# Overview

This is a modern, full-stack portfolio website for Dinmay Kumar Brahma, a student at IIT Guwahati specializing in AI/ML, Quantum Computing, and Biotechnology. The application showcases personal information, projects, skills, and GitHub statistics through a sleek, dark-themed interface built with React and TypeScript.

The project follows a clean monorepo structure with separate client and server directories, utilizing modern web technologies for both frontend and backend development. It integrates with the GitHub API to dynamically display repository information and statistics, creating a live portfolio that stays up-to-date with the user's latest work.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side application is built with **React 18** and **TypeScript**, using **Vite** as the build tool for fast development and optimized production builds. The UI leverages **shadcn/ui** components built on top of **Radix UI** primitives, providing accessible and customizable components. **Tailwind CSS** handles styling with a dark theme configuration and custom CSS variables for consistent theming.

State management is handled through **TanStack Query (React Query)** for server state management and caching, eliminating the need for complex client-side state management solutions. The application uses **wouter** for lightweight client-side routing instead of heavier alternatives like React Router.

## Backend Architecture
The server is built with **Express.js** and **TypeScript**, following a RESTful API design pattern. The server implements a middleware-based architecture with request logging, error handling, and CORS support. API routes are organized in a modular structure under `/server/routes.ts`.

The backend integrates with the **GitHub REST API** using the **Octokit** client library to fetch user statistics, repository information, and project data. This integration supports both authenticated requests (with GitHub token) and public API access with rate limiting considerations.

## Data Validation and Type Safety
The application uses **Zod** for runtime type validation and schema definition, ensuring type safety across the client-server boundary. Shared schemas in `/shared/schema.ts` define the structure for GitHub statistics, repository data, and user information, providing compile-time and runtime type checking.

## Build and Development Workflow
The project uses **esbuild** for server-side bundling and **Vite** for client-side development and production builds. Development mode supports hot module replacement (HMR) and includes Replit-specific plugins for enhanced development experience. The build process generates optimized static assets for the client and bundled server code for production deployment.

## Styling and Design System
The application implements a comprehensive design system using **Tailwind CSS** with custom CSS variables for theming. The design follows a dark theme with carefully crafted color schemes, typography, and spacing. Custom animations and transitions enhance the user experience, including typewriter effects, floating shapes, and smooth scrolling.

## Project Structure
The monorepo structure separates concerns clearly:
- `/client` - React frontend application
- `/server` - Express.js backend API
- `/shared` - Shared TypeScript types and schemas
- Components are organized in a hierarchical structure with reusable UI components in `/client/src/components/ui`

# External Dependencies

## GitHub Integration
- **@octokit/rest** - Official GitHub REST API client for fetching user data, repositories, and statistics
- **GitHub API** - Public API for repository information and user statistics (supports both authenticated and unauthenticated requests)

## Database and Storage
- **Drizzle ORM** with **PostgreSQL** - Configured for future data persistence needs, currently using Neon Database as the PostgreSQL provider
- **@neondatabase/serverless** - Serverless PostgreSQL connection for Neon Database

## UI Component Libraries
- **Radix UI** - Comprehensive set of accessible, unstyled UI primitives for building the component system
- **shadcn/ui** - Pre-built component library based on Radix UI with Tailwind CSS styling
- **Lucide React** - Icon library for consistent iconography

## Development and Build Tools
- **Vite** - Modern build tool and development server with HMR support
- **esbuild** - Fast JavaScript bundler for server-side code
- **TypeScript** - Static type checking and enhanced developer experience
- **Tailwind CSS** - Utility-first CSS framework for styling

## State Management and Data Fetching
- **TanStack Query** - Server state management, caching, and data synchronization
- **React Hook Form** - Form state management and validation
- **Zod** - Runtime type validation and schema definition

## Routing and Navigation
- **wouter** - Lightweight client-side routing library for React

## Session and Authentication (Configured)
- **express-session** with **connect-pg-simple** - Session management with PostgreSQL store (ready for future authentication features)