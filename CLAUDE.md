# CLAUDE.md - Documentation du projet WiseTwin Landing Page

## Vue d'ensemble

Landing page moderne pour WiseTwin, une solution de jumeau numérique et de formation immersive pour l'industrie 4.0. Le site présente les solutions de formation en réalité virtuelle et d'analyse prédictive de l'entreprise.

## Stack technologique

- **Framework**: Next.js 15.3.2 avec App Router
- **UI**: React 19 + TypeScript 5
- **Styling**: TailwindCSS 4.1.7 (avec support dark mode via `next-themes`)
- **Animations**: Motion (Framer Motion) + composants animés custom (magicui)
- **Composants UI**: shadcn/ui basé sur Radix UI pour l'accessibilité
- **Icons**: Lucide React
- **Blog**: MDX (@next/mdx + gray-matter pour front matter)
- **Email**: Nodemailer pour les formulaires de contact
- **Notifications**: Sonner (toast notifications)
- **Carousel**: Embla Carousel

## Architecture du projet

```
wisetwin-landing-apge/
├── app/                    # Routes et pages Next.js (App Router)
│   ├── api/
│   │   ├── contact/       # POST endpoint (Nodemailer)
│   │   └── csrf/          # GET endpoint (token CSRF)
│   ├── blog/
│   │   ├── page.tsx       # Liste des articles
│   │   └── [slug]/        # Page article individuel (dynamique)
│   ├── layout.tsx         # Layout principal avec ThemeProvider
│   ├── page.tsx           # Entry point homepage
│   ├── globals.css        # Variables CSS et thème
│   ├── robots.ts          # Configuration robots.txt
│   └── sitemap.ts         # Sitemap auto-généré
├── components/
│   ├── pages/             # Orchestrateurs de pages
│   │   ├── home-client.tsx         # Composition des 9 sections
│   │   └── resources-client.tsx
│   ├── sections/          # 9 sections de la landing page
│   │   ├── hero-section.tsx
│   │   ├── wisetrainer-section.tsx
│   │   ├── wisetrainer-advantages-section.tsx
│   │   ├── profiles-section.tsx
│   │   ├── platform-section.tsx
│   │   ├── technology-section.tsx
│   │   ├── faq-section.tsx
│   │   ├── blog-section.tsx
│   │   └── contact-section.tsx
│   ├── common/            # Composants réutilisables
│   │   └── section.tsx    # Wrapper avec variants (default, muted, gradient, dark)
│   ├── layout/            # Header, Footer
│   │   ├── header.tsx     # Navigation fixe avec Logo, Menu, Theme Toggle
│   │   └── footer.tsx
│   ├── magicui/           # Composants UI animés custom
│   │   ├── hero-video-dialog.tsx
│   │   ├── interactive-grid-pattern.tsx
│   │   └── word-rotate.tsx
│   ├── ui/                # shadcn/ui composants de base
│   │   ├── button.tsx, card.tsx, input.tsx, textarea.tsx
│   │   ├── select.tsx, accordion.tsx, badge.tsx, avatar.tsx
│   │   ├── theme-toggle.tsx, logo.tsx, carousel.tsx
│   │   └── ... (autres composants UI)
│   └── providers/
│       └── theme-provider.tsx  # Wrapper next-themes
├── lib/
│   └── blog.ts            # Logique de parsing MDX (getLatestPosts, etc.)
├── types/
│   └── blog.tsx           # Interface BlogPost
├── public/
│   ├── image/             # Images optimisées
│   ├── storyset/          # Illustrations (profils)
│   ├── video/             # wisetrainer-presentation.mp4
│   └── ressources/        # Documents téléchargeables
├── blog/                  # 5 articles MDX avec front matter
│   ├── maintenance-predictive-ia.mdx
│   ├── industrie-40-transformation-digitale.mdx
│   ├── jumeau-numerique-optimisation.mdx
│   ├── realite-virtuelle-formation-industrielle.mdx
│   └── securite-formation-vr.mdx
├── middleware.tsx         # Middleware Next.js
├── tailwind.config.ts     # Configuration TailwindCSS v4
└── next.config.ts         # Configuration MDX
```

## Fonctionnalités principales

### 1. Landing page responsive (9 sections)

**Hero Section** (`hero-section.tsx`)
- Grille interactive animée (interactive-grid-pattern)
- Animation WordRotate pour "Plus de [sécurité/productivité/efficacité/formation]"
- Video Dialog modal avec vidéo de présentation
- 2 CTA buttons: "Demander une démo" + "Découvrir nos solutions"

**WiseTrainer Section** (`wisetrainer-section.tsx`)
- Présentation de la solution principale
- Avantages détaillés (`wisetrainer-advantages-section.tsx`)

**Profils Section** (`profiles-section.tsx`)
- 4 profils clients avec alternance gauche/droite:
  - Responsable HSE
  - Responsable Formation
  - Chef de Production
  - Directeur Industriel
- Pour chaque profil: challenges + solutions + illustration

**Platform Section** (`platform-section.tsx`)
- Présentation de la plateforme technique

**Technology Section** (`technology-section.tsx`)
- Mise en avant de l'IA et des technologies utilisées

**FAQ Section** (`faq-section.tsx`)
- 8 questions fréquentes avec Accordion (Radix UI)

**Blog Section** (`blog-section.tsx`)
- Affiche les 3 derniers articles (via `getLatestPosts()`)
- Métadonnées: catégorie, date, temps de lecture, auteur, tags
- Lien vers `/blog` pour voir tous les articles

**Contact Section** (`contact-section.tsx`)
- Formulaire avec 5 champs (name, email, subject, company, message)
- Protection CSRF intégrée (fetch `/api/csrf` puis POST `/api/contact`)
- Validation côté client (email, champs requis)
- Toast notifications (Sonner)
- Envoi email via Nodemailer

### 2. Mode sombre/clair avec persistance

- **Provider**: `next-themes` (configuration: `attribute="class"`, `defaultTheme="dark"`)
- **Toggle**: Composant dans header avec icônes Sun/Moon
- **Persistance**: LocalStorage automatique
- **Transition**: Classes CSS smooth
- **Couleurs custom**: Variables CSS HSL avec support light/dark

### 3. Blog MDX complet

**Structure d'un article MDX:**
```yaml
---
title: "Titre de l'article"
excerpt: "Résumé court"
date: "2024-08-25"
author:
  name: "Nom Auteur"
  role: "Rôle"
category: "Innovation"
tags: ["IA", "Maintenance", "VR"]
readTime: 6
coverImage: "/image/article-cover.jpg" (optionnel)
images: ["image1.jpg", "image2.jpg"] (optionnel)
---
# Contenu Markdown/MDX
```

**Parsing et rendu:**
- `gray-matter` pour extraire le front matter
- `@next/mdx` pour le rendu
- Type `BlogPost` dans `types/blog.tsx`
- Fonction `getLatestPosts()` dans `lib/blog.ts`

**Pages:**
- `/blog` : Liste de tous les articles
- `/blog/[slug]` : Page article individuel (génération dynamique)

### 4. Navigation et ancres

**Menu principal (header.tsx):**
- "Notre solution" → `/#wisetrainer`
- "Vous êtes ?" → `/#vous-etes`
- "Notre technologie" → `/#notre-technologie`
- "FAQ" → `/#faq`
- "Blog" → `/blog`
- "Contact" → `/#contact`
- CTA: "Demander une démo"

**Scroll behavior:** Smooth scrolling activé via `className="scroll-smooth"` sur `<html>`

### 5. Optimisations et performances

- **Images**: Next.js Image optimization automatique
- **Code splitting**: Automatique avec App Router
- **SSG**: Pages statiques générées au build
- **Client Components**: Uniquement où nécessaire (interactivité)
- **SEO**: Métadonnées, sitemap.ts, robots.ts, canonical URLs

## Système de theming

### Couleurs WiseTwin (identité de marque)

```css
--color-wisetwin-blue: hsl(190 95% 50%)      /* #00C7FF - Bleu clair */
--color-wisetwin-darkblue: hsl(240 80% 20%)  /* #0F0B66 - Bleu foncé */
```

### Thème Light (défaut)
- Background: blanc pur `oklch(1 0 0)`
- Foreground: noir `oklch(0.145 0 0)`
- Primary: wisetwin-darkblue `#0F0B66`
- Secondary: wisetwin-blue `#00C7FF`
- Muted: gris clair

### Thème Dark (`.dark` class)
- Background: noir profond `oklch(0.145 0 0)`
- Foreground: blanc `oklch(0.985 0 0)`
- Card: gris foncé `oklch(0.205 0 0)`
- Primary: gris clair
- Secondary: wisetwin-blue `#00C7FF` (identique)

### Variants de Section (component `Section`)

Le composant `Section` (`components/common/section.tsx`) accepte 4 variants:

- **default**: Fond standard (background)
- **muted**: Fond gris clair/foncé (muted)
- **gradient**: Gradient subtil de background vers muted
- **dark**: Gradient bleu foncé avec effets visuels (grille, points lumineux, lueurs)

Usage:
```tsx
<Section variant="dark" id="contact">
  {/* Contenu */}
</Section>
```

## Gestion des données

### Blog (système MDX)

**Emplacement**: `/blog/*.mdx`

**Type TypeScript**:
```typescript
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: { name: string; role: string };
  category: string;
  tags: string[];
  readTime: number;
  content?: string;
  coverImage?: string;
  images?: string[];
}
```

**Fonctions utilitaires** (`lib/blog.ts`):
- `getLatestPosts()`: Récupère les 3 derniers articles pour la homepage
- Parsing avec `gray-matter` pour extraire le front matter

### Données statiques (dans les composants)

**Profils** (`profiles-section.tsx`):
- Tableau de 4 objets avec: id, title, name, challenges, solutions, imageSrc

**FAQ** (`faq-section.tsx`):
- Tableau de 8 questions/réponses

**Menu** (`header.tsx`):
- Tableau `menuItems` avec label et href

Ces données sont actuellement hardcodées dans les composants. Pour les rendre modifiables, il faudrait:
1. Les externaliser dans des fichiers JSON/TypeScript dans un dossier `data/`
2. Ou créer une interface d'édition (CMS headless ou page admin custom)

## Commandes disponibles

```bash
npm run dev    # Développement avec Turbopack
npm run build  # Build de production
npm run start  # Serveur de production
npm run lint   # Vérification ESLint
```

## Points d'attention

### Corrections effectuées
- ✅ Remplacement de `@ts-ignore` par `@ts-expect-error`
- ✅ Suppression des imports non utilisés
- ✅ Conversion des `<img>` en `<Image>` Next.js
- ✅ Correction de la config Tailwind (`darkMode: "class"`)
- ✅ Suppression de la prop `animate` non définie

### Configuration importante
- Variables d'environnement dans `.env` (non versionné)
- Support du CSRF pour les formulaires
- Middleware Next.js configuré

### Dépendances principales
- React 19 (dernière version)
- Next.js 15.3.2 avec App Router
- TailwindCSS v4 (nouvelle architecture)
- Radix UI pour l'accessibilité
- Framer Motion pour les animations

## Conventions de code

- TypeScript strict
- Composants fonctionnels avec hooks
- Imports absolus avec `@/`
- Composants "use client" uniquement si nécessaire
- Pas de commentaires sauf si essentiels

## Déploiement

Le projet est prêt pour un déploiement sur Vercel ou autre plateforme supportant Next.js.
Build de production testé et fonctionnel.

## Maintenance

- Vérifier régulièrement les mises à jour de sécurité
- Optimiser les images pour les performances
- Surveiller les Core Web Vitals
- Mettre à jour le contenu du blog régulièrement