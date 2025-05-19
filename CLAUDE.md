# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Development
npm run dev        # Start development server with turbopack

# Production  
npm run build      # Build for production
npm run start      # Start production server

# Code Quality
npm run lint       # Run ESLint
```

## Architecture Overview

This is a Next.js 15 application for WiseTwin's landing page, using:
- **App Router** for routing
- **TypeScript** with strict mode
- **Tailwind CSS** for styling  
- **MDX** for blog content
- **Radix UI** for accessible UI components
- **Framer Motion** for animations

### Structure

- `/app/` - Next.js App Router pages
  - `blog/[slug]/` - Dynamic blog posts
  - `solutions/wisetour/` and `solutions/wisetrainer/` - Product pages
  - `ressources/` - Resources page
  
- `/components/` - React components
  - `sections/` - Main page sections (hero, features, etc.)
  - `wisetour/` and `wisetrainer/` - Product-specific components
  - `layout/` - Header and footer
  - `ui/` - Generic UI components (buttons, cards, etc.)
  - `common/` - Shared utilities

- `/blog/` - MDX blog content
- `/public/` - Static assets including PDFs

### Key Patterns

1. **Component Structure**: All section components are exported through `/components/sections/index.ts` for clean imports.

2. **MDX Support**: Blog posts use MDX with custom components defined in `mdx-components.tsx`.

3. **French Localization**: The site is in French, with metadata and content accordingly.

4. **Custom Fonts**: Uses Geist font family with both Sans and Mono variants.

## Development Notes

- No testing framework is currently configured
- ESLint with Next.js defaults is used for linting
- The project uses Next.js image optimization
- MDX files are supported with `.md` and `.mdx` extensions