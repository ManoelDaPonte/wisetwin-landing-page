# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WiseTwin landing page - a Next.js 15 site for a digital twin and immersive VR training solution for Industry 4.0. The site presents 4 products (WiseTrainer, WisePaper, WiseTour, WiseAtlas) with individual solution pages, a comparison table, subscription pricing, and a contact form.

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

// For boolean/raw values in translations (e.g. comparison table), use t.raw()
const value = t.raw("solutions.comparison.values.wisetrainer.web"); // returns true/false

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
1. HeroSection - Main hero with rotating words CTA
2. TrustedBySection - Logo carousel of trusted clients
3. AdvantagesSection - "Why choose us?" (reactive, traceability, cost-effective, integrable, lightweight)
4. PricingSection - Product comparison table + Subscription licenses (Essential, Pro, Business)
5. SecuritySection - SSO, MFA, Audit features
6. FaqSection - 5 featured questions + link to /faq
7. ContactSection - Contact form with CSRF

Note: PricingCalculatorSection exists but is currently commented out in home-client.tsx.

### Product Pages

4 solution pages under `app/[locale]/solutions/`:
- `/solutions/wisetrainer` - Flagship 3D simulator (extra sections: Ownership, Sources, Scenarios)
- `/solutions/wisepaper` - Document digitization (links to app.wisetwin.eu)
- `/solutions/wisetour` - Photo-realistic 360 tours
- `/solutions/wiseatlas` - Interactive map (standalone, not part of training platform)

All product pages follow a uniform structure:
1. **Hero** - Badge + title + subtitle + CTA + screenshot in browser frame
2. **Timeline** ("How it works") - Steps with connecting line + duration badges (desktop: horizontal, mobile: vertical with left line)
3. **Comparison table** - All 4 products side-by-side, current product highlighted (`bg-secondary/5`), uses `solutions.comparison` translation data
4. **Use Cases** - Centered icon blocks
5. **CTA** - Final call to action

WiseTrainer has additional sections: Ownership (after Hero), Sources (after Timeline, before comparison).

There is also a platform page at `/solutions/platform` but it is currently an orphan (not linked from header, footer, or sitemap).

### Section Component

The `Section` component (`components/common/section.tsx`) is the primary layout wrapper. Preferred variants for product pages:
- `default` - Standard background
- `muted` - Gray background

Note: `dark` and `gradient` variants exist but are NOT used on product pages (design decision: keep product pages sober). Alternate `default`/`muted` between sections.

### Pricing Logic

- Toggle between "1 an" (1 year) and "3 ans" (3 years) commitment
- Always display monthly prices with `/mois/admin` suffix
- 3-year commitment: `Math.round(priceMonthly * 0.8)` for real -20% discount
- Secondary line shows annual total: `monthlyRate * 12 * adminCount`
- Product comparison table uses `t.raw()` to get boolean values for checkmark/cross rendering

### Theming System

Theme colors defined in `app/globals.css` using TailwindCSS v4 `@theme` directive:
- Brand colors: `--color-wisetwin-blue` (#00C7FF), `--color-wisetwin-darkblue` (#0F0B66)
- Dark mode via `.dark` class (managed by `next-themes` with `defaultTheme="dark"`)
- Primary maps to brand dark blue (light) / white (dark)
- Secondary maps to brand dark blue (light) / brand blue cyan (dark)

### API Routes

- `POST /api/contact` - Contact form submission (Nodemailer)
- `GET /api/csrf` - CSRF token generation

Contact form in `contact-section.tsx` fetches CSRF token before POST.

## Project Structure

```
app/[locale]/                    # Localized routes (fr, en)
├── page.tsx                     # Homepage
├── faq/page.tsx                 # Full FAQ with search
├── solutions/
│   ├── wisetrainer/page.tsx     # WiseTrainer product page
│   ├── wisepaper/page.tsx       # WisePaper product page
│   ├── wisetour/page.tsx        # WiseTour product page
│   ├── wiseatlas/page.tsx       # WiseAtlas product page
│   └── platform/page.tsx        # Platform page (orphan, not linked)
messages/                        # Translation files
├── fr.json
└── en.json
i18n/                            # i18n configuration
data/                            # Static data (faq.ts)
components/
├── pages/                       # Page orchestrators (home-client.tsx)
├── sections/                    # Homepage sections (8 active + 1 commented)
├── common/                      # Reusable wrappers (Section)
├── layout/                      # Header, Footer, DevBanner
├── ui/                          # shadcn/ui + custom (language-switcher, theme-image, logo)
└── providers/                   # Theme provider
```

### Translation Structure

Top-level namespaces in `messages/*.json`:
- `common`, `nav`, `hero` - Shared UI strings
- `trustedBy` - Client logos section
- `advantages` - Why choose us section (5 items)
- `solutions` - Product titles, descriptions, and **comparison table data** (`comparison.labels`, `comparison.values`)
- `pricing` - Subscription tiers (Essential/Pro/Business), product cards, calculator
- `wisetrainerPricing` - WiseTrainer development pricing (used in FAQ)
- `security`, `faq`, `contact`, `footer` - Other sections
- `wisetrainer`, `wisepaper`, `wisetour`, `wiseatlas` - Product page content (hero, timeline steps with durations, use cases, CTA)
- `platform` - Platform page content (features, wisepaper features, hub, security)

## Conventions

- Use `@/` for absolute imports
- Mark components `"use client"` only when interactivity is needed
- Use Next.js `Image` component for all images
- Use `cn()` from `lib/utils` for className merging
- Keep product pages sober: no colored icons, no `dark` variant, alternate `default`/`muted`
- Vary presentation between sections (timeline, icon+text rows, centered blocks, comparison table)
- **Do NOT run `npm run build` after completing tasks** - the user will handle builds manually
- **Always keep fr.json and en.json in sync** - same keys, same structure
