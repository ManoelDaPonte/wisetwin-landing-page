# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js landing page project bootstrapped with `create-next-app` for WiseTwin. It's set up with:

-   Next.js 15.3.2 (App Router)
-   React 19
-   TypeScript
-   Tailwind CSS 4
-   shadcn/ui components
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

```
/
├── app/
│   ├── layout.tsx       # Root layout with fonts and metadata
│   ├── page.tsx        # Main landing page (imports all sections)
│   ├── globals.css     # Global styles and Tailwind imports
│   └── favicon.ico
├── components/
│   ├── common/
│   │   └── section.tsx # Common section wrapper component
│   ├── layout/
│   │   ├── header.tsx  # Main header (attention: le commentaire dit components/header)
│   │   └── footer.tsx  # Main footer
│   ├── sections/       # Page sections
│   │   ├── hero-section.tsx
│   │   ├── features-section.tsx
│   │   ├── how-it-works-section.tsx
│   │   ├── tracking-section.tsx
│   │   ├── pricing-section.tsx
│   │   ├── contact-section.tsx
│   │   └── index.ts    # Barrel export for sections
│   └── ui/            # shadcn/ui components
│       ├── accordion.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── icon.tsx
│       └── textarea.tsx
├── lib/
│   └── utils.ts       # Utility functions (e.g., cn for classNames)
└── public/            # Static assets
    ├── file.svg
    ├── globe.svg
    ├── next.svg
    ├── vercel.svg
    └── window.svg
```

## Configuration

-   `next.config.ts`: Next.js configuration
-   `tsconfig.json`: TypeScript configuration
-   `postcss.config.mjs`: PostCSS configuration with Tailwind
-   `eslint.config.mjs`: ESLint configuration using the new flat config format
-   `components.json`: shadcn/ui components configuration

## Dependencies

Key dependencies include:
-   Node.js v20+
-   npm v10+
-   Font setup: Geist and Geist Mono from next/font/google
-   UI components: @radix-ui components for accessibility
-   Icons: lucide-react
-   Utilities: clsx, tailwind-merge, class-variance-authority
-   Path aliases: 
    -   `@/*` maps to the root directory
    -   `@/components`, `@/lib`, `@/ui`, etc.

## shadcn/ui Configuration

The project uses shadcn/ui with:
-   Style: "new-york"
-   Framework: Next.js with RSC (React Server Components)
-   Tailwind CSS variables for theming
-   Base color: neutral
-   Icon library: lucide-react

## Styling

Styling is done via Tailwind CSS with custom theme variables defined in globals.css:
-   Custom theme variables for light/dark mode
-   Font variables for Geist Sans and Geist Mono
-   CSS variables for colors, spacing, and shadcn/ui themes

## Page Structure

The main landing page (app/page.tsx) imports and renders all sections in this order:
1. Header
2. HeroSection
3. FeaturesSection
4. HowItWorksSection
5. TrackingSection
6. PricingSection
7. ContactSection
8. Footer

**⚠️ Problème d'architecture identifié**:
- Le Header est importé depuis `@/components/sections` dans page.tsx, mais il n'est pas exporté dans sections/index.ts
- Le Header se trouve dans `components/layout/header.tsx` et devrait être ajouté à l'export de sections/index.ts
- Le Footer est correctement réexporté depuis `../layout/footer` dans sections/index.ts

## Instructions et Conventions

1. **Commentaires de fichiers**: Pour chaque composant et page, nous mettons le chemin du fichier en haut de celui-ci
   - Exemple : `// app/page.tsx` ou `// components/sections/hero-section.tsx`
   - ⚠️ Attention: Certains fichiers ont des commentaires incorrects (ex: header.tsx)

2. **Utilisation des composants**:
   - Utiliser au maximum les composants déjà existants
   - Préférence pour les composants shadcn/ui
   - Importer les composants sections via le barrel export: `@/components/sections`

3. **Structure des sections**:
   - Chaque section doit être un composant autonome
   - Utiliser le composant `Section` pour le wrapper si nécessaire
   - Les sections sont exportées via components/sections/index.ts

4. **Styles et CSS**:
   - Utiliser Tailwind CSS pour le styling
   - Utiliser la fonction `cn()` de lib/utils pour les classes conditionnelles
   - Les variables CSS sont définies dans globals.css

5. **Internationalisation**:
   - Le projet est configuré en français (`lang="fr"` dans layout.tsx)
   - Les métadonnées sont en français
