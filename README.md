# SoundBoard-app

Un soundboard statique (HTML/CSS/JS) qui joue des extraits audio via Howler.js. Le style est écrit en SCSS (compilé en CSS). Aucune stack de bundling lourde.

## Aperçu
- Pages: `index.html` et `optimized-sound-board.html`
- Audio: [Howler.js](https://howlerjs.com/) chargé via CDN
- Styles: `style.scss` (racine) → `style.css`
- JS: logique centralisée dans `assets/js/soundboard.js`
- Assets: fichiers audio dans `sounds/`, images dans `assets/img/`, icônes via police `icomoon`

## Installation
Pré-requis: Node.js + npm.

```bash
npm install
```

## Scripts npm
- Développement SCSS (avec source map):
  ```bash
  npm run sass:dev
  ```
- Surveillance SCSS en continu:
  ```bash
  npm run sass:watch
  ```
- Build CSS minifié (prod):
  ```bash
  npm run sass:build
  ```
- Servir en local (http://localhost:5173/):
  ```bash
  npm run serve
  ```

## Développement local
1. Dans un terminal, lancez la compilation SCSS en mode watch:
   ```bash
   npm run sass:watch
   ```
2. Dans un autre terminal, servez le dossier:
   ```bash
   npm run serve
   ```
3. Ouvrez la page recommandée:
   - http://localhost:5173/optimized-sound-board.html
   - (alternative) http://localhost:5173/index.html

## Architecture (vue d’ensemble)
- HTML
  - `optimized-sound-board.html`: version de référence (structure de boutons avec `data-sound`, gestion d’état `is-playing`, filtrage par thèmes)
  - `index.html`: alignée sur le même modèle (boutons `data-sound`, JS externalisé)
- JS
  - `assets/js/soundboard.js`: instancie les `Howl`, gère clics, arrêt des sons en cours, et l’état visuel des boutons; filtre par thème.
- Styles
  - `style.scss` (source) → `style.css` (sortie utilisée par les pages)
  - `assets/css/style.scss`: base SCSS alternative/ancienne (non requise par défaut)
- Assets
  - `sounds/` contient les extraits `.mp3`
  - `assets/img/bg.jpg` pour l’arrière-plan
  - `fonts.css` + `fonts/` pour la police d’icônes

## Notes
- Howler est déclaré en dépendance, mais chargé via CDN dans les pages (pas de bundler). Cela simplifie le déploiement statique.
- Aucun linter ni framework de tests n’est configuré dans ce dépôt.
- Voir aussi `WARP.md` pour des consignes rapides d’utilisation dans Warp (commandes utiles et points d’attention).
