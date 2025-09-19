# CLAUDE.md - Documentation du projet WiseTwin Landing Page

## Vue d'ensemble

Landing page moderne pour WiseTwin, une solution de jumeau numérique et de formation immersive pour l'industrie 4.0. Le site présente les solutions de formation en réalité virtuelle et d'analyse prédictive de l'entreprise.

## Stack technologique

- **Framework**: Next.js 15.3.2 avec App Router
- **UI**: React 19 + TypeScript
- **Styling**: TailwindCSS 4.1.7 (avec support dark mode)
- **Animations**: Framer Motion (Motion)
- **Composants UI**: Radix UI pour l'accessibilité
- **Blog**: MDX pour le contenu riche
- **Email**: Nodemailer pour les formulaires de contact

## Architecture du projet

```
wisetwin-landing-apge/
├── app/                    # Routes et pages Next.js
│   ├── api/               # Routes API (contact, csrf)
│   ├── blog/              # Pages blog avec support MDX
│   ├── layout.tsx         # Layout principal avec ThemeProvider
│   └── page.tsx           # Page d'accueil
├── components/
│   ├── common/            # Composants réutilisables (Section, etc.)
│   ├── layout/            # Header, Footer
│   ├── magicui/           # Composants UI animés
│   ├── sections/          # Sections de la landing page
│   └── ui/                # Composants UI de base (shadcn/ui)
├── lib/                   # Utilitaires
├── public/
│   ├── image/             # Images optimisées
│   └── storyset/          # Illustrations
├── blog/                  # Articles MDX
└── types/                 # Types TypeScript
```

## Fonctionnalités principales

1. **Landing page responsive** avec sections:
   - Hero avec vidéo
   - Solutions (WiseTrainer, etc.)
   - Profils clients (HSE, Formation, Production, Direction)
   - Technologie et IA
   - Blog intégré
   - Contact

2. **Mode sombre/clair** avec persistance

3. **Blog MDX** avec:
   - Support des métadonnées (front matter)
   - Rendu dynamique des articles
   - Catégories et tags

4. **Optimisations**:
   - Images Next.js optimisées
   - Code splitting automatique
   - SSG pour les pages statiques

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