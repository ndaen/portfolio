# ndaen.xyz

Portfolio de Noah Daën, développeur full stack (Symfony, React Native, TypeScript).

Site statique Next.js : une page d'accueil, un index des projets et une page par projet.

## Pile

- Next.js 16 (App Router, rendu entièrement statique), TypeScript strict
- Tailwind CSS v4, police Geist auto-hébergée
- Contenu en MDX, frontmatter validé par Zod au build
- Animations en CSS pur (`animation-timeline: view()`), aucune bibliothèque d'animation
- Vitest pour les modules, Playwright et axe-core pour l'accessibilité
- Déploiement sur Vercel

## Principes

**Aucun fait saisi à la main.** Les informations personnelles (titre, disponibilité, compétences, contacts) sont lues au build depuis `content/source/`, une copie de mon CV produite par `npm run sync:cv`. Le site ne peut donc pas contredire le CV.

**Copies expurgées.** Le script de synchronisation retire tout numéro de téléphone au format français et ne garde du profil qu'une liste blanche de champs. Un test (`tests/source-privacy.test.ts`) échoue si une donnée sensible réapparaît.

**Accessibilité vérifiée, pas affirmée.** Contrastes WCAG AA testés sur chaque paire de couleurs réellement rendue, suite axe sur les pages principales, animations désactivées sous `prefers-reduced-motion`.

## Structure

```
content/
  projets/*.mdx     une fiche par projet (frontmatter validé par Zod)
  source/           copie expurgée du CV, générée par sync:cv
scripts/            synchronisation et expurgation du CV
src/
  app/              routes, métadonnées, sitemap, robots, images générées
  components/       composants de présentation, sans accès disque
  lib/              lecture du CV et des projets, jetons de couleur, contraste
tests/              Vitest (*.test.ts) et Playwright (*.spec.ts)
```

## Commandes

```bash
npm run dev          # serveur de développement
npm run build        # build de production
npm test             # tests Vitest
npm run test:a11y    # suite axe ; BASE_URL=http://localhost:3200 pour viser un serveur déjà lancé
npm run lint
npm run sync:cv      # rafraîchit content/source/ depuis le CV (CAREER_OPS_ROOT pour changer la source)
```

## Ajouter un projet

Créer `content/projets/<slug>.mdx`, sans toucher au code :

```yaml
---
titre: Nom du projet
type: application        # ou projet
resume: Une phrase.
stack: [Techno, Techno]
etat: En ligne
ordre: 7
vedette: false           # true : affiché dans les tuiles de l'accueil, icone alors obligatoire
icone: /apps/nom.png     # optionnel
capture:                 # optionnel
  src: /projets/nom.png
  alt: "Description de la capture"
  largeur: 390
  hauteur: 844
liens:
  - label: Code source
    href: https://github.com/...
---

Corps en MDX.
```

Un frontmatter invalide fait échouer le build en nommant le fichier.
