# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WiseTwin landing page - a Next.js site for a **consulting & services firm developing digital solutions for industry** ("société de conseil / service en développement de solutions digitales pour l'industrie"). The site leads with the agency positioning (custom development & consulting: training, HSE, 3D, data & AI), the team ("équipe assemblée à la volée" around 3 pôles: Conseil / Data & IA / 3D & immersif), and the tools born in the field, split in TWO LOGICS: **custom trainings billed once per project** (WiseTrainer 3D simulators 5 000 à 15 000€, WiseTour immersive safety inductions 10 000 à 20 000€ — standalone deliverables, never locked to the platform) and **yearly self-service platforms** (la plateforme LMS à partir de 600€/an, 4 800€/an tout compris hors SSO, a standalone content-agnostic LMS with 10 optional bricks in 4 families: WisePaper and WiseTour editors, Ask AI, risk hunt, AI import, SSO, API/webhooks/LRS, audit log, white label; WiseAtlas sur devis). The main CTA is "Décrivez-nous votre projet / Devis gratuit" (contact form with interlocutor picker + hand-made slot booking), not product signup. Copy rules: never promise a quote response time ("devis gratuit sans engagement", no "sous 48h"), no em dashes (—) anywhere in user-facing copy, "48h" is only used for "définir un cahier des charges" and "+40 solutions livrées en 1 an" as stats.

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
4. TeamSection (`#equipe`) - industrial "equipment nameplate" cards: mono top strip (ASSOCIÉ 01/03 · PÔLE X), REAL portrait photos in `/image/team/` (gauthier.jpg, manoel-2.jpg, mickael.jpg) rendered in BLACK & WHITE via the `grayscale` class (Manoel's rule) (identified from git history of `public/equipe/*`: Gauthier = bald/suit, Manoel = B&W dark shirt, Mickaël = navy blazer/light eyes), technical corner marks, mono skill chips — `team` namespace
5. TestimonialsSection — **COMMENTED OUT in home-client.tsx** (nothing real to show yet; Manoel will re-enable). The component, its `videoPool` prop wiring from `app/[locale]/page.tsx` (pool dir `public/videos/temoignages/`, random client-side draw, Rick Roll fallback) and the `testimonials` namespace all remain in place.
6. ExpertisesSection (`#expertises`) - interactive expanding panels ("travées d'atelier"): 4 tall flex panels (h-[600px]), hover/click grows one (flexGrow transition); collapsed = vertical title + icon, active = hook + numbered capability list; DOM-0X mono codes, blueprint grid, giant ghost numbers; mobile = accordion — `expertises` namespace ("UI/UX" replaced "Sites internet")
7. MethodSection (`#methode`, muted) - calendar/agenda UI titled "déroulé type d'un projet" (NOT "semaine type"), eyebrow "Notre méthode"; a Google-Calendar-style RED line between Jour 2 and Itérations, with the "Signature du devis" badge in a strip BELOW the table (dot at the bottom of the line); columns Jour 1 / Jour 2 / Itérations / Ensuite (NO duration on build — copy says short iterations with regular 15-30 min meetings) — `method` namespace (`signature` key)
8. ToolsSection (`#outils`) - 5 UNIFORM cards, platform LAST with subtle highlight: WiseTrainer (5 000 à 15 000€ / projet), WiseTour (10 000 à 20 000€ / projet), WisePaper (locked "Inclus dans la plateforme"), WiseAtlas (Sur devis), La plateforme LMS (à partir de 600€/an). Every card shows a `priceNote` — `tools` namespace
9. TerritorySection (`#territoire`) - full-bleed dark section over the WiseAtlas aerial view of the Dunkerque basin ("Ancrés à Dunkerque.") — validated by Manoel, don't touch
10. BlogSection - Latest 3 posts (returns null if none)
11. ContactSection (`#contact`, muted) - 3-step layout: Étape 01 interlocutor picker (3 pôles), Étape 02 hand-made "Calendly" (2 days × 2 slots between 10h-12h, rotating deterministically per ISO week via `DAY_PAIRS`/`TIME_PAIRS`, computed client-side in useEffect to avoid hydration mismatch), Étape 03 form (CSRF) stretched to the SAME HEIGHT as the two left cards (items-stretch + flex chain + textarea flex-1). Chosen pôle + slot are prepended to the email message body; no API change.

Notes:
- The homepage FAQ section and the animated stats band were REMOVED (stats were redundant with client logos).
- SecuritySection (SSO/MFA/audit/ISO) is platform-specific and lives on the plateforme page, NOT on the homepage.
- Motion primitives: `components/ui/reveal.tsx` (scroll-reveal wrapper, honors prefers-reduced-motion; Section headers auto-reveal) and `components/ui/count-up.tsx` (currently unused). Marquee keyframes in globals.css (`animate-marquee`, `animate-marquee-slow`).
- Section component: `py-20 md:py-28`, headers support `eyebrow` (small uppercase mono label), accepts `className`.
- Theme CSS variables are `lab()`/oklch: `hsl(var(--color-border)/x)` is INVALID and silently dropped — use `color-mix(in oklab, var(--color-border) 45%, transparent)`.
- next-themes 0.4.6 is patched via patch-package (`patches/next-themes+0.4.6.patch`, `postinstall` script): ThemeScript returns null on the client to silence the React 19.2 "script tag while rendering" dev warning (upstream PR #386 not yet released).

### Product Pages

Under `app/[locale]/solutions/`:
- `/solutions/plateforme` - The full LMS platform page (renders `wisetrainer-client.tsx`; uses `platform` namespace + `pricing` namespace + `metadata.platform`). Structure: Hero (blueprint grid, "Le LMS taillé pour l'industrie", à partir de 600€/an, browser-frame screenshot) → **Products showcase** ("Formez de la bonne manière", 4 volets: WiseTour video `wisetour-capture.mp4` (bottom-cropped to remove the Veo watermark — never reuse the old capture-3dgs file), WiseTrainer video, WisePaper SVG, **Ask AI CSS panel** (`AskAiPanel`, media type "askai"); media veil is bg-black/10 — Manoel found 40% too dark) → ModularPricingSection (blueprint grid + `SOCLE-00` socle 600€ card with the free-trial line, then 4 `FAM-0X` family cards listing the 10 bricks with their yearly price, corner marks, total strip 4 800€/an « hors SSO » + à la carte 6 000€/an, formations-au-projet banner) → Platform features (MOD-0X cards incl. `features.askai`) → SecuritySection (SEC-0X cards) → CTA banner. The Advantages section ("Construisons ensemble votre actif numérique") was REMOVED per Manoel (component + `advantages` namespace still exist, unused).
- `/solutions/wisetrainer`, `/solutions/wisepaper`, `/solutions/wisetour` - SMALL brick pages: shared template `components/pages/brick-client.tsx` (WiseTrainer shows price range + "par projet"; wisepaper AND wisetour show the platform-included lock via `platformOnly`). **WiseTour doctrine (2026-09-03, Manoel)**: two ways in, rendered on the wisetour page as a `hasPaths` section "Deux façons de démarrer" right after the hero (`brickPages.wisetour.paths`, VOIE 01 / VOIE 02 cards, icons Upload / ScanLine; features section then flips to default and the banner to muted to keep the alternation): the client already has a 3D scan (Gaussian splat formats .ply, .splat, .ksplat, .spz, .sog + .glb, verified in `~/Documents/GitHub/wisetwin-splat-editor/types/splat.ts`) and uploads it into the WiseTour editor (LMS brick +900€/an, was 400 until 2026-09-07) to add zones/consignes/POI/quizzes alone, OR WiseTwin scans the site (technicians, or smartphone footage) and delivers turnkey at 10 000 à 20 000€ / projet billed once, the scan belonging to the client. The home tools card (+900€/an avec votre propre scan) and the platform showcase panel tell the same story. The hero has a 2-col layout with the SAME media as the plateforme showcase on the right (`media` map: wisetour = capture-3dgs-entrepot.mp4, wisetrainer = 3d-reconstruction-training-simulator.mp4, wisepaper = formation-industrielle-automatisee.svg on dark gradient). Videos ALWAYS need a `poster` (ffmpeg-extracted, `/image/wisetour-poster.jpg`, `/image/wisetrainer-brick-poster.jpg`) because video loading can stall at readyState 0 — same rule for the plateforme showcase `productMedia`. SEO via `lib/brick-seo.ts`, copy in `brickPages`. NO askai page (removed 2026-08-21).
- `/solutions/wiseatlas` - Interactive map (uses `wiseatlas` namespace), REDESIGNED 2026-08-21 in the industrial language: 2-col hero on blueprint grid with the aerial map as media + "Sur devis", numbered pillar cards, audiences with browser frames + PUBLIC 0X labels, how-it-works as agenda/calendar, CAS-0X use-case cards with mono tags, brick-style CTA banner.
All 5 routes are in `app/sitemap.ts`.

Other rules (2026-08-21): the FAQ is DELETED ENTIRELY (route `app/[locale]/faq/`, `faq-client.tsx`, `data/faq-keys.ts`, `faq` + `metadata.faq` + `nav.faq` namespaces — do not bring it back). The blog is FRENCH-ONLY: every page loads the `posts-fr` collection regardless of locale (no EN fallback logic, sitemap lists /fr posts only). CGV (/terms) and privacy (/privacy) explicitly scope themselves to the SaaS platforms (LMS + WiseAtlas); one-shot prestations are governed by per-project contracts.

**Standalone doctrine (2026-08-21)**: WiseTrainer/WiseTour formations are NEVER locked to the platform. Copy everywhere must say: the deliverable is standalone (Windows/Mac executable, or web build for the client's intranet / linkable from their own LMS), with hosting on the WiseTwin LMS as an OPTION ("jamais imposée"). The brick pages' bottom banner has two variants in `brickPages.common.included`: standalone (eyebrowStandalone/title/description) for project bricks, platform (eyebrow/titleExclusive/descriptionPlatform) for WisePaper and WiseTour. The LMS IMPORTS SCORM 1.2 and 2004 packages (plus videos, PDFs, links) and sends xAPI statements to the client's LRS; it does NOT export SCORM packages of WiseTwin trainings into client LMSes, so for WiseTrainer/WiseTour deliverables say "à lier depuis votre LMS" only.

**Pricing model (revised 2026-09-07, brick grid aligned on the SaaS `lib/features.ts`, branch `feat/lms-standalone`; first version 2026-08-21 "capex vs opex")**: two logics, strictly separated. **Formations = one-shot custom projects** (an investment, no recurring cost): WiseTrainer 5 000 à 15 000€ / projet selon le chantier, WiseTour 10 000 à 20 000€ / projet selon le site; the client owns the asset (CGV clause 6.2 says so explicitly — keep site and CGV aligned), the LMS then delivers it at no extra cost (NO maintenance fee on WiseTrainer: the pricing grid shows it as "inclus avec un projet"). **Platforms**: the LMS is ALWAYS advertised as "à partir de 600€/an" (lead with the LOW price — Manoel's rule). It is a standalone, content-agnostic LMS: the socle 600€/an par site (apprenants illimités, sans engagement, free trial = 3 users with every brick, mentioned soberly under the socle card) includes import SCORM 1.2 et 2004 / vidéos / PDF / liens, catalogue, plans de formation et groupes, parcours, rappels automatiques et recertification, certificats et attestations, notifications, conformité Qualiopi (registre de preuves, exports, évaluation à froid), badges, tableaux de bord. Then 10 optional bricks in 4 families (`pricing.modules.items.{content,ai,integrations,governance}.bricks.*`, prices HT / an / site): Contenus WiseTwin = WiseTrainer 3D (inclus avec un projet), Éditeur WisePaper 600 (auteurs illimités), Éditeur WiseTour 900 (was 400; the 3D scan by WiseTwin stays a one-shot project); Intelligence artificielle = Ask AI 900 (no more "base d'incidents" in the title; assistant sécurité, incidents internes + base ARIA), Chasse aux risques 600 (photo de poste), Import IA WisePaper 600 (PDF/Word/PowerPoint vers formation, 50 imports inclus); Intégrations = SSO 1 800 (SAML/OAuth, WorkOS connection cost, ALWAYS billed on top of the bundle), API, webhooks et LRS 600 (API v1, webhooks signés, envoi xAPI vers le LRS du client); Gouvernance et image = Journal d'audit 300, Marque blanche 900. **La totale = 4 800€/an « hors SSO »** (socle + the 9 other bricks; à la carte the same basket is 6 000€/an, so the bundle saves 1 200€). Remove a brick, the price drops. Unlimited learners stay advertised; a per-user component above ~300 users is an internal large-account policy negotiated on quote, never shown on the site. **WiseAtlas has NO public price: "Sur devis"** (self-service editor or turnkey project). **Ask AI has NO dedicated page** (merged into the platform page: 4th showcase panel with a CSS-generated visual, a `platform.features.askai` card and a pricing brick). Bricks without their own page (chasse aux risques, import IA, SSO, API, audit, marque blanche) only live as lines of the platform pricing section, no new pages. Copy rules: "coûts maîtrisés" (never "prix ferme"), convictions say "pensés par et pour les équipes". Prices are rough placeholders to iterate on (Manoel). Naming: the SaaS still says "SafetyTour" internally; the landing markets **WiseTour**. Standards: say "import SCORM 1.2 et 2004, envoi xAPI vers un LRS"; never promise cmi5. SaaS source of truth: `~/Documents/GitHub/wisetwin-saas-refacto/`.

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
- JSON-LD: Organization/ProfessionalService in `app/[locale]/layout.tsx`, SoftwareApplication + Breadcrumb on product pages
- Per-page `generateMetadata` with localized keywords

## Project Structure

```
app/[locale]/                    # Localized routes (fr, en)
├── page.tsx                     # Homepage
├── blog/                        # Blog (Outstatic)
├── solutions/
│   ├── wisetrainer/page.tsx     # WiseTrainer LMS product page
│   └── wiseatlas/page.tsx       # WiseAtlas product page
messages/                        # Translation files (fr.json, en.json)
i18n/                            # i18n configuration
components/
├── pages/                       # Page orchestrators (home-client, wisetrainer-client, wiseatlas-client, brick-client, blog-*)
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
- `security`, `contact`, `footer`, `blog` - Other sections (`contact.interlocutor`, `contact.slots`, `contact.email` power the contact picker)
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
