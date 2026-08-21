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

Homepage sections in order (the header nav order mirrors this; the login button AND the FAQ link were removed from the header — the "Nos outils" dropdown lists all 6 tools in a 2-col grid, platform last/highlighted, plus a "Toutes nos briques" link to /#outils). Every major section carries an industrial design signature: mono uppercase codes (DOM-01, ASSOCIÉ 01/03), blueprint grid backgrounds (`color-mix(in oklab, var(--color-border) …)`), technical corner marks. **All section content spans the full Section container width (max-w-7xl)** — no inner max-w-5xl/6xl wrappers; Manoel wants every section the same width, filling the available space.
1. HeroSection - XXL headline with staggered entrance animation, CTA → #contact, 3 chips (devis gratuit sans engagement / +40 solutions en 1 an / 48h cahier des charges), WiseTrainer video in a browser frame (poster: `/image/wisetrainer-hero-poster.jpg`)
2. TrustedBySection - Logo marquee; dark mode forces white silhouettes (`dark:brightness-0 dark:invert`) so dark logos stay visible
3. ConvictionsSection (muted) - manifesto: sticky XXL title left, 3 numbered convictions right with clear gaps (`py-10 md:py-14`, validated by Manoel after two rounds; first/last handled by index because each card is the sole child of its Reveal — `first:`/`last:` classes silently zeroed all paddings once, don't reintroduce them)
4. TeamSection (`#equipe`) - industrial "equipment nameplate" cards: mono top strip (ASSOCIÉ 01/03 · PÔLE X), REAL portrait photos in `/image/team/{gauthier,manoel,mickael}.jpg` (identified from git history of `public/equipe/*`: Gauthier = bald/suit, Manoel = B&W dark shirt, Mickaël = navy blazer/light eyes), technical corner marks, mono skill chips — `team` namespace
5. TestimonialsSection — **COMMENTED OUT in home-client.tsx** (nothing real to show yet; Manoel will re-enable). The component, its `videoPool` prop wiring from `app/[locale]/page.tsx` (pool dir `public/videos/temoignages/`, random client-side draw, Rick Roll fallback) and the `testimonials` namespace all remain in place.
6. ExpertisesSection (`#expertises`) - interactive expanding panels ("travées d'atelier"): 4 tall flex panels (h-[600px]), hover/click grows one (flexGrow transition); collapsed = vertical title + icon, active = hook + numbered capability list; DOM-0X mono codes, blueprint grid, giant ghost numbers; mobile = accordion — `expertises` namespace ("UI/UX" replaced "Sites internet")
7. MethodSection (`#methode`, muted) - calendar/agenda UI titled "déroulé type d'un projet" (NOT "semaine type"), eyebrow "Notre méthode"; a Google-Calendar-style RED line between Jour 2 and Itérations, with the "Signature du devis" badge in a strip BELOW the table (dot at the bottom of the line); columns Jour 1 / Jour 2 / Itérations / Ensuite (NO duration on build — copy says short iterations with regular 15-30 min meetings) — `method` namespace (`signature` key)
8. ToolsSection (`#outils`) - 5 UNIFORM cards, platform LAST with subtle highlight: WiseTrainer (5 000 à 15 000€ / projet), WiseTour (10 000 à 20 000€ / projet), WisePaper (locked "Inclus dans la plateforme"), WiseAtlas (3 000€/an, self-service · projet sur devis), La plateforme LMS (3 600€/an modulable). Every card shows a `priceNote` — `tools` namespace
9. TerritorySection (`#territoire`) - full-bleed dark section over the WiseAtlas aerial view of the Dunkerque basin ("Ancrés à Dunkerque.") — validated by Manoel, don't touch
10. BlogSection - Latest 3 posts (returns null if none)
11. ContactSection (`#contact`, muted) - 3-step layout: Étape 01 interlocutor picker (3 pôles), Étape 02 hand-made "Calendly" (2 days × 2 slots between 10h-12h, rotating deterministically per ISO week via `DAY_PAIRS`/`TIME_PAIRS`, computed client-side in useEffect to avoid hydration mismatch), Étape 03 form (CSRF) stretched to the SAME HEIGHT as the two left cards (items-stretch + flex chain + textarea flex-1). Chosen pôle + slot are prepended to the email message body; no API change.

Notes:
- The homepage FAQ section and the animated stats band were REMOVED (stats were redundant with client logos). The /faq page still exists and is linked from header/footer.
- SecuritySection (SSO/MFA/audit/ISO) is platform-specific and lives on the plateforme page, NOT on the homepage.
- Motion primitives: `components/ui/reveal.tsx` (scroll-reveal wrapper, honors prefers-reduced-motion; Section headers auto-reveal) and `components/ui/count-up.tsx` (currently unused). Marquee keyframes in globals.css (`animate-marquee`, `animate-marquee-slow`).
- Section component: `py-20 md:py-28`, headers support `eyebrow` (small uppercase mono label), accepts `className`.
- Theme CSS variables are `lab()`/oklch: `hsl(var(--color-border)/x)` is INVALID and silently dropped — use `color-mix(in oklab, var(--color-border) 45%, transparent)`.
- next-themes 0.4.6 is patched via patch-package (`patches/next-themes+0.4.6.patch`, `postinstall` script): ThemeScript returns null on the client to silence the React 19.2 "script tag while rendering" dev warning (upstream PR #386 not yet released).

### Product Pages

Under `app/[locale]/solutions/`:
- `/solutions/plateforme` - The full LMS platform page (renders `wisetrainer-client.tsx`; uses `platform` namespace + `pricing` namespace + `metadata.platform`). Structure: Hero → **Products showcase FIRST** ("Formez de la bonne manière", right after the hero, per Manoel) → Advantages → ModularPricingSection (socle 1 800€ card + 3 module cards +600/+800/+400 + total 3 600 strip + formations-au-projet banner) → Platform features (6 cards incl. `features.askai`) → SecuritySection → CTA
- `/solutions/wisetrainer`, `/solutions/wisepaper`, `/solutions/wisetour` - SMALL brick pages: shared template `components/pages/brick-client.tsx` (project bricks show price range + "par projet"; wisepaper shows the platform-included lock), SEO via `lib/brick-seo.ts`, copy in `brickPages`. NO askai page (removed 2026-08-21).
- `/solutions/wiseatlas` - Interactive map (uses `wiseatlas` namespace). Self-service editor; turnkey projects on quote.
All 5 routes are in `app/sitemap.ts`.

Other rules (2026-08-21): the /faq page still exists (SEO) but is REFERENCED NOWHERE in the UI (no header, footer, or CTA links — keep it that way). The blog is FRENCH-ONLY: every page loads the `posts-fr` collection regardless of locale (no EN fallback logic, sitemap lists /fr posts only). CGV (/terms) and privacy (/privacy) explicitly scope themselves to the SaaS platforms (LMS + WiseAtlas); one-shot prestations are governed by per-project contracts.

**Pricing model (2026-08-21, "capex vs opex")**: two logics, strictly separated. **Formations = one-shot custom projects** (an investment, no recurring cost): WiseTrainer 5 000 à 15 000€ / projet selon le chantier, WiseTour 10 000 à 20 000€ / projet selon le site; the client owns the asset, the LMS then delivers it at no extra cost. **Platforms = yearly subscriptions per site, run autonomously**: the LMS at 3 600€/an all included, decomposed as socle 1 800€ (hosting/delivery of trainings incl. CLIENT-IMPORTED ones, tracking, certifications, unlimited learners) + briques WisePaper 600€ (AI editor, part of the platform, no standalone price) + Ask AI & base d'incidents 800€ + plans de formation & analytiques 400€ — remove a brick, the price drops; WiseAtlas from 3 000€/an self-service (editor), turnkey map projects on quote. **Ask AI has NO dedicated page** (merged into the platform: a `platform.features.askai` card + a pricing module). Prices are rough placeholders to iterate on (Manoel). Naming: the SaaS still says "SafetyTour" internally; the landing markets **WiseTour**. SCORM is NOT implemented: say "exports xAPI/cmi5". SaaS source of truth: `~/Documents/GitHub/wisetwin-saas-refacto/`.

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
