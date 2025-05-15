# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js project bootstrapped with `create-next-app`. It's set up with:

-   Next.js 15.3.2 (App Router)
-   React 19
-   TypeScript
-   Tailwind CSS 4
-   ESLint
-   Turbopack

## Commands

### Development

```bash
# Start the development server with Turbopack
npm run dev

# Build the application for production
npm run build

# Start the production server
npm run start

# Run ESLint to check for issues
npm run lint
```

## Project Structure

The project follows the Next.js App Router structure:

-   `app/`: Main application directory
    -   `layout.tsx`: Root layout with font configuration
    -   `page.tsx`: Main landing page
    -   `globals.css`: Global styles and Tailwind imports

## Configuration

-   `next.config.ts`: Next.js configuration
-   `tsconfig.json`: TypeScript configuration
-   `postcss.config.mjs`: PostCSS configuration with Tailwind
-   `eslint.config.mjs`: ESLint configuration using the new flat config format

## Dependencies

The project uses:

-   Node.js v20+
-   npm v10+
-   Font setup: Geist and Geist Mono with next/font
-   Path aliases: `@/*` maps to the root directory

## Styling

Styling is done via Tailwind CSS with custom theme variables defined in globals.css:

-   Custom theme variables for light/dark mode
-   Font variables for Geist Sans and Geist Mono

## Instructions

Pour chaque composant et page nous mettrons le chemin de se fichier en haut de celui-ci par exemple : //app/homepage/page.tsx
On utilisera un maximum les composants deja existant avec une preference pour le components de shadcn
