# Overview

This is a modern, full-stack portfolio website for Dinmay Kumar Brahma, a student at IIT Guwahati specializing in AI/ML, Quantum Computing, and Biotechnology. The application showcases personal information, GitHub statistics, projects, skills, timeline, and contact functionality through a clean, responsive interface.

The project follows a clean monorepo structure with separate client and server directories, utilizing modern web technologies for both frontend and backend development. It integrates with the GitHub API to dynamically display repository information and statistics, creating a living portfolio that stays up-to-date automatically.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side application is built with **React 18** and **TypeScript**, using **Vite** as the build tool for fast development and optimized production builds. The UI leverages **shadcn/ui** components built on top of **Radix UI** primitives, providing a comprehensive design system with accessibility built-in.

State management is handled through **TanStack Query (React Query)** for server state management and caching, eliminating the need for complex client-side state management solutions. The application uses **wouter** for lightweight client-side routing.

## Backend Architecture
The server is built with **Express.js** and **TypeScript**, following a RESTful API design pattern. The server implements a middleware-based architecture with request logging, error handling, and CORS support for seamless client-server communication.

The backend integrates with the **GitHub REST API** using the **Octokit** client library to fetch user statistics, repository information, and project data. This integration supports both authenticated and public API access, with graceful fallbacks for rate limiting.

## Data Validation and Type Safety
The application uses **Zod** for runtime type validation and schema definition, ensuring type safety across the client-server boundary. Shared schemas in `/shared/schema.ts` define the structure for GitHub data, contact forms, and blog posts, providing a single source of truth for data models.

## Build and Development Workflow
The project uses **esbuild** for server-side bundling and **Vite** for client-side development and production builds. Development mode supports hot module replacement (HMR) and includes Replit-specific plugins for enhanced development experience.

## Styling and Design System
The application implements a comprehensive design system using **Tailwind CSS** with custom CSS variables for theming. The design follows a dark theme with carefully crafted color schemes, typography, and spacing. Components are styled using the **class-variance-authority** pattern for consistent variant management.

## Project Structure
The monorepo structure separates concerns clearly:
- `/client` - React frontend application with components, pages, and utilities
- `/server` - Express.js backend API with routes and GitHub integration
- `/shared` - Shared TypeScript types and Zod schemas
- Components are organized hierarchically with reusable UI components in `/client/src/components/ui`

# External Dependencies

## GitHub Integration
- **@octokit/rest** - Official GitHub REST API client for fetching user data, repositories, and statistics
- **GitHub API** - Public API for repository information and user statistics (supports both authenticated and unauthenticated requests with rate limiting considerations)

## Database and Storage
- **Drizzle ORM** with **PostgreSQL** - Configured for future data persistence needs using Neon Database as the serverless PostgreSQL provider
- **@neondatabase/serverless** - Serverless PostgreSQL connection optimized for edge deployment

## UI Component Libraries
- **Radix UI** - Comprehensive set of accessible, unstyled UI primitives including dialogs, dropdowns, navigation, forms, and data display components
- **Lucide React** - Icon library providing consistent iconography throughout the application

## Email and Communication
- **Replit Mail Service** - Integrated email functionality for contact form submissions using Replit's built-in email service with SMTP support

## Development and Build Tools
- **Vite** - Fast build tool with HMR support and optimized production builds
- **esbuild** - High-performance JavaScript bundler for server-side code
- **Replit Development Plugins** - Enhanced development experience with error overlays and debugging tools