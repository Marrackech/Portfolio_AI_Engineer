# Portfolio — Haroun Tanane, AI Engineer

React + Vite, CSS Modules, React Router (ancres), bilingue FR/EN, thème clair/sombre.

## Lancer

```bash
npm install
npm run dev      # développement
npm run build    # production (dossier dist/)
```

## Modifier le contenu

Tout le contenu est dans `src/data/` :

- `profile.json` : nom, accroche, bio (FR/EN), chiffres clés, coordonnées. Les champs vides (ex. `linkedin`, `city`) sont masqués automatiquement.
- `projects.json` : projets (titre/description FR et EN, image, tags, lien GitHub, catégories de filtre).
- `skills.json` : compétences (nom, logo, catégorie).

Les textes de l'interface sont dans `src/i18n/translations.js`. Les images sont dans `public/images/`.

## CV

Déposer un PDF dans `public/cv/` : le bouton « Télécharger mon CV » apparaît au prochain build.

## Déploiement Vercel

1. Pousser le projet sur GitHub, puis l'importer dans Vercel (preset Vite détecté).
2. Le SEO absolu (canonical, Open Graph, sitemap.xml) utilise automatiquement l'URL de production Vercel, ou la variable `VITE_SITE_URL` (ex. `https://mon-domaine.com`) si vous avez un domaine personnalisé.
3. `vercel.json` gère le cache et les en-têtes de sécurité.
