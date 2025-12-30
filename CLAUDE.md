# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WiseTwin landing page - a Next.js 15 site for a digital twin and immersive VR training solution for Industry 4.0.

## Commands

```bash
npm run dev    # Development server with Turbopack (port 3000)
npm run build  # Production build
npm run start  # Production server
npm run lint   # ESLint check
```

## Tech Stack

- **Next.js 15.3** with App Router
- **React 19** + TypeScript 5
- **TailwindCSS 4** (new v4 architecture with `@theme` directive)
- **Framer Motion** (imported as `motion`)
- **Radix UI** + shadcn/ui components
- **next-intl** for internationalization (FR/EN)

## Architecture

### Internationalization (i18n)

Routes are localized under `app/[locale]/`. Translations in `messages/fr.json` and `messages/en.json`.

```tsx
// In components, use useTranslations hook
import { useTranslations } from "next-intl";
const t = useTranslations("nav");

// For navigation, use Link from i18n/navigation
import { Link } from "@/i18n/navigation";
```

Key files:
- `i18n/routing.ts` - Locale config (fr, en)
- `i18n/request.ts` - Server-side message loading
- `i18n/navigation.ts` - Localized Link, useRouter, etc.

### Page Composition Pattern

Pages are composed via client orchestrators in `components/pages/`:
- `home-client.tsx` composes sections for the homepage

Homepage sections in order:
1. HeroSection - Main hero with CTA
2. WiseTrainerSection - Flagship product
3. WiseTrainerAdvantagesSection - Benefits
4. ProfilesSection - Target personas
5. PlatformSection - Platform overview
6. SecuritySection - SSO, MFA, Audit features
7. PricingSection - 3 tiers (Free, Pro 89€, Business 299€)
8. WiseTrainerPricingSection - 3D development pricing
9. FaqSection - 5 featured questions + link to /faq
10. ContactSection - Contact form

### Section Component

The `Section` component (`components/common/section.tsx`) is the primary layout wrapper with 4 variants:
- `default` - Standard background
- `muted` - Gray background
- `gradient` - Subtle gradient
- `dark` - Dark blue gradient with animated visual effects (grid, glow points)

```tsx
<Section variant="dark" id="contact" header={{ title: "Contact", centered: true }}>
  {children}
</Section>
```

### Theming System

Theme colors defined in `app/globals.css` using TailwindCSS v4 `@theme` directive:
- Brand colors: `--color-wisetwin-blue` (#00C7FF), `--color-wisetwin-darkblue` (#0F0B66)
- Dark mode via `.dark` class (managed by `next-themes` with `defaultTheme="dark"`)
- Primary maps to brand dark blue (light) / white (dark)
- Secondary is always brand blue (#00C7FF)

### API Routes

- `POST /api/contact` - Contact form submission (Nodemailer)
- `GET /api/csrf` - CSRF token generation

Contact form in `contact-section.tsx` fetches CSRF token before POST.

## Project Structure

```
app/[locale]/          # Localized routes (fr, en)
├── page.tsx           # Homepage
├── faq/page.tsx       # Full FAQ with search
├── roadmap/page.tsx   # Product roadmap
messages/              # Translation files
├── fr.json
└── en.json
i18n/                  # i18n configuration
data/                  # Static data (faq.ts)
components/
├── pages/             # Page orchestrators
├── sections/          # Landing page sections
├── common/            # Reusable wrappers (Section)
├── layout/            # Header, Footer
├── ui/                # shadcn/ui + custom (language-switcher)
└── providers/         # Theme provider
```

## Conventions

- Use `@/` for absolute imports
- Mark components `"use client"` only when interactivity is needed
- Use Next.js `Image` component for all images
- Use `cn()` from `lib/utils` for className merging
- **Do NOT run `npm run build` after completing tasks** - the user will handle builds manually
