# Islamic Companion App

## Overview

This is a comprehensive Islamic mobile web application that provides essential Islamic tools and resources for daily religious practice. The app serves as a digital companion for Muslims, offering prayer times, Qibla direction, Quran verses, Islamic calendar, dhikr counter, and the 99 names of Allah (Asma ul Husna). Built as a progressive web app with a mobile-first design, it focuses on providing accurate Islamic information and tools in an accessible, user-friendly interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React-based architecture with TypeScript for type safety. The frontend is built using Vite as the build tool and development server, providing fast hot module replacement and optimized builds. The UI is constructed with shadcn/ui components, which are built on top of Radix UI primitives and styled with Tailwind CSS. This provides a consistent, accessible design system with customizable theming through CSS variables.

The application follows a component-based architecture with clear separation of concerns. Page components handle routing and high-level state management, while smaller components focus on specific functionality like prayer times, Qibla compass, and Quran verses. The app uses Wouter for client-side routing, providing a lightweight alternative to React Router.

State management is handled through React Query (TanStack Query) for server state and React hooks for local component state. This approach provides efficient caching, background updates, and loading states for API data while keeping local state management simple and predictable.

### Backend Architecture
The backend is built with Express.js running on Node.js, providing a RESTful API for the frontend. The server handles geolocation-based prayer time calculations, Qibla direction computation, Quran verse retrieval, and Islamic calendar data. The API is designed to be stateless and focuses on providing accurate Islamic calculations and data.

The server implements middleware for request logging, CORS handling, and error management. Routes are organized by functionality (prayer times, Qibla, Quran, calendar) and provide JSON responses with appropriate HTTP status codes.

### Data Storage Strategy
The application uses a dual storage approach. For development and simple deployments, it includes an in-memory storage implementation that provides all required functionality without external dependencies. For production deployments, the system is configured to use PostgreSQL with Drizzle ORM for type-safe database operations.

The database schema includes tables for users, prayer times, Quran verses, and Islamic events. The schema is designed with proper relationships and indexing for efficient queries. Prayer times are cached by location and date to avoid repeated calculations, while Quran verses and Islamic events are stored for quick retrieval.

### Mobile-First Design
The application is specifically designed as a mobile web app with a maximum width constraint and responsive design. The interface uses a bottom navigation pattern common in mobile apps, with a card-based layout that works well on touch devices. The design includes Islamic-inspired styling with appropriate color schemes and typography.

The app implements device APIs where available, including geolocation for automatic location detection and device orientation for the Qibla compass functionality. The interface gracefully handles cases where these APIs are not available or permission is denied.

### Authentication and User Management
The application includes a user system for personalized features like favorite verses, dhikr counts, and location preferences. User authentication is handled through traditional session-based authentication with secure password storage. The system allows users to save their preferred calculation methods for prayer times and maintain personal Islamic data.

## External Dependencies

### Database and ORM
- **PostgreSQL**: Primary database for production deployments, chosen for its reliability and JSON support for complex Islamic data
- **Neon Database**: Serverless PostgreSQL provider configured through `@neondatabase/serverless` package
- **Drizzle ORM**: Type-safe database toolkit providing schema definition, migrations, and query building with full TypeScript support

### UI and Styling Framework
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives for building the component library
- **Tailwind CSS**: Utility-first CSS framework for consistent styling and responsive design
- **shadcn/ui**: Pre-built component library combining Radix UI with Tailwind CSS for a complete design system
- **Lucide React**: Modern icon library providing Islamic-appropriate iconography

### State Management and Data Fetching
- **TanStack React Query**: Powerful data synchronization library for server state management, caching, and background updates
- **React Hook Form**: Performant form library with minimal re-renders and built-in validation

### Development and Build Tools
- **Vite**: Fast build tool and development server with hot module replacement
- **TypeScript**: Static type checking for improved code quality and developer experience
- **ESBuild**: Fast JavaScript bundler used by Vite for production builds

### Islamic Calculation Libraries
The application implements custom Islamic calculations for prayer times and Qibla direction rather than relying on external libraries. This approach ensures accuracy and allows for customization of calculation methods (ISNA, Muslim World League, etc.) based on user preferences and geographic regions.

### Geolocation and Device APIs
The app utilizes browser APIs for geolocation services to automatically detect user location for prayer times and Qibla direction. Device orientation APIs are used for the compass functionality where supported by the device and browser.