# WiseTwin Landing Page

Landing page moderne pour WiseTwin, solution de jumeau numérique et de formation immersive pour l'industrie 4.0.

## 🚀 Technologies Utilisées

- **Framework**: Next.js 15.3.2 (App Router)
- **UI Library**: React 19 + TypeScript 5
- **Styling**: TailwindCSS 4.1.7 (nouvelle architecture)
- **Animations**: Framer Motion (package `motion`)
- **UI Components**: Radix UI (accessibilité native)
- **Blog**: MDX avec support front matter
- **Email**: Nodemailer pour les formulaires de contact
- **Icons**: Lucide React

## 📦 Installation

### Prérequis
- Node.js 18.17 ou supérieur
- npm ou yarn

### Installation

1. Clonez le repository :
```bash
git clone [URL_DU_REPO]
cd wisetwin-landing-apge
```

2. Installez les dépendances :
```bash
npm install
```

3. Configuration environnement (optionnel) :
```bash
cp .env.example .env
# Éditez .env avec vos configurations
```

4. Lancez le serveur de développement :
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🛠️ Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement avec Turbopack (port 3000) |
| `npm run build` | Compile l'application pour la production |
| `npm run start` | Démarre le serveur de production |
| `npm run lint` | Vérifie le code avec ESLint |

## 📁 Structure du Projet

```
wisetwin-landing-apge/
├── app/                    # App Router Next.js
│   ├── api/               # Routes API
│   │   ├── contact/       # API de contact
│   │   └── csrf/          # Protection CSRF
│   ├── blog/
│   │   ├── [slug]/        # Pages dynamiques d'articles
│   │   └── page.tsx       # Liste des articles
│   ├── layout.tsx         # Layout racine avec providers
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── components/
│   ├── common/            # Composants partagés
│   ├── layout/            # Header, Footer, Navigation
│   ├── magicui/           # Composants UI animés
│   ├── sections/          # Sections de la landing page
│   └── ui/                # Bibliothèque UI (shadcn/ui)
├── lib/
│   └── utils.ts           # Fonctions utilitaires
├── public/
│   ├── image/             # Images du site
│   └── storyset/          # Illustrations SVG
├── blog/                  # Articles MDX avec métadonnées
├── types/                 # Définitions TypeScript
└── config/
    ├── next.config.ts     # Configuration Next.js
    ├── tailwind.config.ts # Configuration Tailwind
    └── tsconfig.json      # Configuration TypeScript
```

## 🎨 Fonctionnalités

### Interface utilisateur
- ✨ Design responsive mobile-first
- 🌓 Mode sombre/clair avec persistance locale
- 🎭 Animations fluides avec Framer Motion
- ♿ Composants accessibles (Radix UI)
- 🎨 Système de design cohérent avec Tailwind

### Contenu
- 📝 Blog avec support MDX
- 🏷️ Système de catégories et tags
- 📊 Temps de lecture estimé
- 👤 Informations auteur

### Performance
- ⚡ Turbopack pour le développement rapide
- 🚀 Optimisation automatique des images
- 📦 Code splitting et lazy loading
- 🔍 SEO optimisé avec métadonnées

### Fonctionnalités business
- 📧 Formulaire de contact avec Nodemailer
- 🛡️ Protection CSRF
- 📱 Progressive Web App ready

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Email configuration (optionnel)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
CONTACT_EMAIL=contact@wisetwin.com

# Autres configurations
NEXT_PUBLIC_SITE_URL=https://wisetwin.com
```

### Fichiers de configuration

| Fichier | Description |
|---------|-------------|
| `next.config.ts` | Configuration Next.js, MDX, optimisations |
| `tailwind.config.ts` | Thème, couleurs, extensions Tailwind |
| `tsconfig.json` | Configuration TypeScript stricte |
| `eslint.config.mjs` | Règles de linting du code |

## 🚀 Déploiement

### Vercel (recommandé)

1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement
3. Déployez avec un simple push sur `main`

### Autres plateformes

Le projet est compatible avec toute plateforme supportant Next.js :
- Netlify
- AWS Amplify
- Railway
- Render

### Build de production

```bash
npm run build
npm run start
```

## 📝 Développement

### Ajouter un article de blog

1. Créez un fichier `.mdx` dans le dossier `blog/`
2. Ajoutez les métadonnées front matter :

```mdx
---
title: "Titre de l'article"
excerpt: "Description courte"
date: "2024-01-15"
author:
  name: "Nom de l'auteur"
  role: "Rôle"
category: "Innovation"
tags: ["IA", "Industrie 4.0"]
readTime: 5
---

Contenu de l'article...
```

### Conventions de code

- TypeScript strict mode
- Composants fonctionnels React
- Imports absolus avec `@/`
- Pas de commentaires superflus

## 🐛 Résolution de problèmes

| Problème | Solution |
|----------|----------|
| Erreur de build TypeScript | Vérifiez les types avec `npm run lint` |
| Images non affichées | Utilisez le composant `Image` de Next.js |
| Mode sombre ne fonctionne pas | Vérifiez `ThemeProvider` dans `layout.tsx` |

## 📄 Licence

Ce projet est propriétaire et confidentiel. Tous droits réservés © WiseTwin.

## 🤝 Contact

- Site web : [wisetwin.com](https://wisetwin.com)
- Email : contact@wisetwin.com
- LinkedIn : [WiseTwin](https://linkedin.com/company/wisetwin)
