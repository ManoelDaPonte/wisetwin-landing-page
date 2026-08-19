# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WiseTwin landing page - a Next.js site for a **consulting & services firm developing digital solutions for industry** ("société de conseil / service en développement de solutions digitales pour l'industrie"). The site leads with the agency positioning (custom development & consulting: training, HSE, 3D, data & AI), presents the method ("start small"), the 3-partner team, and two standardized products born from recurring client needs as proof: **WiseTrainer LMS** (training) and **WiseAtlas** (communication). The main CTA is "Décrivez-nous votre projet / Devis gratuit" (contact form), not product signup.

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

Homepage sections in order (agency-first narrative):
1. HeroSection - Agency positioning ("Nous accélérons la transformation digitale de votre industrie"), CTA → #contact, trust chips, WiseTrainer video as proof
2. TrustedBySection - Logo carousel of trusted clients
3. ConvictionsSection - Manifesto (4 convictions: sur-mesure, accessible, interopérable, budgets site) — `convictions` namespace
4. ExpertisesSection (`#expertises`) - 4 expertise domains with capability lists + "doesn't fit a box" CTA — `expertises` namespace
5. MethodSection (`#methode`) - 4-step timeline (échange gratuit → devis 48h → dev itératif → déploiement) + "start small" banner — `method` namespace
6. ToolsSection (`#outils`) - WiseTrainer LMS & WiseAtlas cards, framed as products born from recurring needs — `tools` namespace
7. TeamSection (`#equipe`) - 3 partners (Manoel data/IA/logiciel, Mickaël 3D/simulation, Gauthier conseil) — `team` namespace; photos are `/placeholder.png`, swap for real ones
8. SecuritySection - SSO, MFA, Audit, ISO 27001
9. BlogSection - Latest 3 posts (returns null if none)
10. FaqSection - 5 featured questions + link to /faq
11. ContactSection (`#contact`) - "Décrivez-nous votre projet" form with CSRF + trust chips (devis gratuit, 48h, sans engagement)

### Product Pages

2 product pages under `app/[locale]/solutions/`:
- `/solutions/wisetrainer` - Modular training platform (uses `platform` namespace for most content + `pricing` namespace for the modular pricing). Structure: Hero → Advantages → Products showcase (sticky scroll) → ModularPricingSection → Platform features → CTA
- `/solutions/wiseatlas` - Interactive map (uses `wiseatlas` namespace). Standalone product

**WiseTrainer pricing model (modular / minimum viable)**: a low-cost base plan ("socle", from 50€/month per site) including hosting + WisePaper + Safety Tour + completion tracking + unlimited learners; à la carte modules (analytics, planning, SSO/MFA/audit, SCORM/API, guest mode, sharing) activated on demand, "sur devis"; 3D simulators are one-shot custom projects (client owns the 3D asset). Rendered by `components/sections/wisetrainer/modular-pricing-section.tsx`.

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
data/faq-keys.ts                 # FAQ keys + categories (general, services, pricing, technical)
components/
├── pages/                       # Page orchestrators (home-client, wisetrainer-client, wiseatlas-client, faq-client, blog-*)
├── sections/home/               # Homepage sections
├── sections/wisetrainer/        # advantages-section, modular-pricing-section
├── common/                      # Reusable wrappers (Section)
├── layout/                      # Header (nav: Nos outils dropdown, Savoir-faire, Méthode, Blog, FAQ + login + Devis gratuit CTA), Footer
├── ui/                          # shadcn/ui + custom (language-switcher, theme-image, logo)
└── seo/json-ld.tsx              # JSON-LD helper
```

### Translation Structure

Top-level namespaces in `messages/*.json`:
- `metadata` - Per-page SEO metadata
- `common`, `nav`, `hero` - Shared UI strings
- `convictions`, `expertises`, `method`, `tools`, `team` - Agency homepage sections
- `security`, `faq`, `contact`, `footer`, `blog` - Other sections
- `platform` - WiseTrainer page content (hero, products showcase, features, cta)
- `pricing` - WiseTrainer modular pricing (core plan, modules, simulators)
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
