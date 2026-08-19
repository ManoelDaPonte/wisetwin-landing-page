# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WiseTwin landing page - a Next.js site for a **consulting & services firm developing digital solutions for industry** ("société de conseil / service en développement de solutions digitales pour l'industrie"). The site leads with the agency positioning (custom development & consulting: training, HSE, 3D, data & AI), the team ("équipe assemblée à la volée" around 3 pôles: Conseil / Data & IA / 3D & immersif), client video testimonials, and the standardized tools born from recurring client needs, sold as **separate bricks**: WiseTrainer (3D simulators, 1 500€/an), WisePaper (AI doc-to-training, 1 200€/an), WiseTour (immersive safety induction, ex-"SafetyTour", 1 300€/an), bundled in **la plateforme LMS** (3 500€/an, with Ask AI + incident database as platform exclusives), plus **WiseAtlas** (communication, 3 000€/an). The main CTA is "Décrivez-nous votre projet / Devis gratuit" (contact form with interlocutor picker + hand-made slot booking), not product signup. Copy rules: never promise a quote response time ("devis gratuit sans engagement", no "sous 48h"), no em dashes (—) anywhere in user-facing copy, "48h" is only used for "définir un cahier des charges" and "+40 solutions livrées en 1 an" as stats.

## Commands

```bash
npm run dev    # Development server with Turbopack (port 3000)
npm run build  # Production build
npm run start  # Production server
npm run lint   # ESLint check
```

## Tech Stack

- **Next.js 16** with App Router
- **React 19** + TypeScript 5
- **TailwindCSS 4** (new v4 architecture with `@theme` directive)
- **Framer Motion** (imported as `motion`)
- **Radix UI** + shadcn/ui components
- **next-intl** for internationalization (FR/EN)
- **Outstatic** CMS for the blog (`outstatic/` content, `app/(cms)/`)

## Architecture

### Internationalization (i18n)

Routes are localized under `app/[locale]/`. Translations in `messages/fr.json` and `messages/en.json`.

```tsx
// In components, use useTranslations hook
import { useTranslations } from "next-intl";
const t = useTranslations("nav");

// For arrays/raw values in translations, use t.raw()
const chips = t.raw("hero.chips") as string[];

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

Homepage sections in order (the header nav order mirrors this):
1. HeroSection - XXL headline with staggered entrance animation, CTA → #contact, 3 chips (devis gratuit sans engagement / +40 solutions en 1 an / 48h cahier des charges), WiseTrainer video in a browser frame (poster: `/image/wisetrainer-hero-poster.jpg`)
2. TrustedBySection - Logo marquee; dark mode forces white silhouettes (`dark:brightness-0 dark:invert`) so dark logos stay visible
3. ConvictionsSection (muted, `lg:min-h-screen`) - full-page manifesto: sticky XXL title left, 3 widely-spaced numbered convictions right (interoperable conviction was removed) — `convictions` namespace
4. TeamSection (`#equipe`) - 3 dirigeants profiles with pôle chip over portrait photo (aspect 4/5, `/placeholder.png` to swap) + "équipe à la volée" note — `team` namespace
5. TestimonialsSection (`#temoignages`, muted) - 3 scattered/rotated clickable video cards (tape decoration, play button) opening a Dialog with a YouTube embed; PLACEHOLDER: all 3 play the Rick Roll (`dQw4w9WgXcQ` in `VIDEO_IDS`) until real client videos exist; quotes/roles are anonymized placeholders too — `testimonials` namespace
6. ExpertisesSection (`#expertises`) - sober editorial rows: 4 domains, huge title left, hook + inline `·`-separated capability list right ("UI/UX" replaced "Sites internet") — `expertises` namespace
7. MethodSection (`#methode`, muted) - calendar/agenda UI (title bar, hour-line background, 4 "event" cards under day labels Jour 1 / Jour 2 / Semaines 1 à 4 / Ensuite); no "start small" banner anymore — `method` namespace
8. ToolsSection (`#outils`) - bento grid: featured platform card (3 500€/an) + WiseAtlas card (3 000€/an) + 4 brick cards (WiseTrainer/WisePaper/WiseTour with prices, Ask AI locked "Réservé à la plateforme") — `tools` namespace (`tools.platform`, `tools.bricks.*`, `tools.wiseatlas`)
9. TerritorySection (`#territoire`) - full-bleed dark section over the WiseAtlas aerial view of the Dunkerque basin: "Ancrés à Dunkerque.", 3 facts, ambition statement — `territory` namespace (fixed white text, works in both themes)
10. BlogSection - Latest 3 posts (returns null if none)
11. ContactSection (`#contact`, muted) - 3-step layout: Étape 01 interlocutor picker (3 pôles), Étape 02 hand-made "Calendly" (2 days × 2 slots between 10h-12h, rotating deterministically per ISO week via `DAY_PAIRS`/`TIME_PAIRS`, computed client-side in useEffect to avoid hydration mismatch), Étape 03 form (CSRF). Chosen pôle + slot are prepended to the email message body; no API change.

Notes:
- The homepage FAQ section and the animated stats band were REMOVED (stats were redundant with client logos). The /faq page still exists and is linked from header/footer.
- SecuritySection (SSO/MFA/audit/ISO) is platform-specific and lives on the WiseTrainer page, NOT on the homepage.
- Motion primitives: `components/ui/reveal.tsx` (scroll-reveal wrapper, honors prefers-reduced-motion; Section headers auto-reveal) and `components/ui/count-up.tsx` (currently unused). Marquee keyframes in globals.css (`animate-marquee`, `animate-marquee-slow`).
- Section component: `py-20 md:py-28`, headers support `eyebrow` (small uppercase mono label), accepts `className`.

### Product Pages

2 product pages under `app/[locale]/solutions/`:
- `/solutions/wisetrainer` - Modular training platform (uses `platform` namespace for most content + `pricing` namespace for the modular pricing). Structure: Hero → Advantages → Products showcase (sticky scroll) → ModularPricingSection → Platform features → SecuritySection → CTA
- `/solutions/wiseatlas` - Interactive map (uses `wiseatlas` namespace). Standalone product

**Pricing model (bricks / platform)**: each brick sells alone per site per year: WisePaper 1 200€, WiseTour 1 300€, WiseTrainer 1 500€ (= 4 000€ combined); **la plateforme LMS** bundles them at 3 500€/an and adds the exclusives Ask AI (safety copilot, photo risk hunts, prevention reports) + incident database, training plans, analytics, certifications, unlimited learners. Ask AI + incident DB are NEVER sold alone. 3D simulator creation stays a one-shot custom project (client owns the 3D asset); the brick/platform covers delivery. Rendered by `components/sections/wisetrainer/modular-pricing-section.tsx` (bricks column + featured platform card). Prices are placeholders validated by Manoel on 2026-08-19. Naming: the SaaS product still says "SafetyTour" internally; the landing site markets it as **WiseTour**. SCORM is NOT implemented in the SaaS: always say "exports xAPI/cmi5", never "SCORM". The SaaS feature source of truth lives in `~/Documents/GitHub/wisetwin-saas-refacto/`.

### Section Component

The `Section` component (`components/common/section.tsx`) is the primary layout wrapper. Alternate `default`/`muted` variants between sections (design is sober; `dark`/`gradient` variants exist but are not used).

### Theming System

Theme colors defined in `app/globals.css` using TailwindCSS v4 `@theme` directive:
- Brand colors: `--color-wisetwin-blue` (#00C7FF), `--color-wisetwin-darkblue` (#0F0B66)
- Dark mode via `.dark` class (managed by `next-themes` with `defaultTheme="dark"`)
- Secondary maps to brand blue cyan and is the accent color used everywhere

### API Routes

- `POST /api/contact` - Contact form submission (Microsoft Graph API via `lib/mailer.ts`)
- `GET /api/csrf` - CSRF token generation
- `app/api/outstatic/` - Outstatic CMS

### SEO

- `app/sitemap.ts` + `app/robots.ts` (AI crawlers explicitly allowed) + `public/llms.txt` (llmstxt.org convention — keep in sync with positioning)
- JSON-LD: Organization/ProfessionalService in `app/[locale]/layout.tsx`, SoftwareApplication + Breadcrumb on product pages, FAQPage on /faq
- Per-page `generateMetadata` with localized keywords

## Project Structure

```
app/[locale]/                    # Localized routes (fr, en)
├── page.tsx                     # Homepage
├── faq/page.tsx                 # Full FAQ with search (keys in data/faq-keys.ts)
├── blog/                        # Blog (Outstatic)
├── solutions/
│   ├── wisetrainer/page.tsx     # WiseTrainer LMS product page
│   └── wiseatlas/page.tsx       # WiseAtlas product page
messages/                        # Translation files (fr.json, en.json)
i18n/                            # i18n configuration
data/faq-keys.ts                 # FAQ keys + categories, services (Prestations & conseil) listed first
components/
├── pages/                       # Page orchestrators (home-client, wisetrainer-client, wiseatlas-client, faq-client, blog-*)
├── sections/home/               # Homepage sections
├── sections/wisetrainer/        # advantages-section, modular-pricing-section
├── common/                      # Reusable wrappers (Section)
├── layout/                      # Header (nav mirrors homepage order: Équipe, Savoir-faire, Méthode, Nos outils dropdown, Blog, FAQ + login + Devis gratuit CTA), Footer (lists all bricks)
├── ui/                          # shadcn/ui + custom (language-switcher, theme-image, logo)
└── seo/json-ld.tsx              # JSON-LD helper
```

### Translation Structure

Top-level namespaces in `messages/*.json`:
- `metadata` - Per-page SEO metadata
- `common`, `nav`, `hero` - Shared UI strings (`nav.platformShort`/`wiseatlasShort`/`allTools` feed the header tools dropdown)
- `convictions`, `expertises`, `method`, `tools`, `territory`, `testimonials`, `team` - Agency homepage sections (no more `stats` namespace)
- `security`, `faq`, `contact`, `footer`, `blog` - Other sections (`contact.interlocutor`, `contact.slots`, `contact.email` power the contact picker)
- `platform` - WiseTrainer page content (hero, products showcase named after the bricks, features, cta)
- `pricing` - Bricks + platform pricing (`pricing.bricks.items.*`, `pricing.platform`, `pricing.simulators`)
- `advantages` - WiseTrainer advantages section
- `wisetrainer` - Slim (title only, used in page metadata)
- `wiseatlas` - WiseAtlas page content

## Conventions

- Use `@/` for absolute imports
- Mark components `"use client"` only when interactivity is needed
- Use Next.js `Image` component for all images
- Use `cn()` from `lib/utils` for className merging
- Keep the design sober: no colored icons beyond the secondary accent, alternate `default`/`muted` sections
- **Do NOT run `npm run build` after completing tasks** - the user will handle builds manually
- **Always keep fr.json and en.json in sync** - same keys, same structure
- JSON files use **tabs** for indentation
