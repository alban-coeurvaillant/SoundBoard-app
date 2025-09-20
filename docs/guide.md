# Guide de démarrage – SoundBoard-app

Ce document présente une vue moderne et pragmatique du projet, pour démarrer vite, comprendre l’architecture, et personnaliser l’application.

## Présentation rapide
- Projet statique (HTML/CSS/JS) servant un soundboard.
- Audio avec Howler.js (chargé via CDN).
- Styles en SCSS (compilé en CSS), sans bundler.
- JS client centralisé dans `assets/js/soundboard.js`.

## Démarrer en local
Pré-requis: Node.js + npm.

1) Installer les dépendances
```bash
npm install
```
2) Compiler le SCSS (au choix)
```bash
npm run sass:dev     # build lisible + source map
npm run sass:watch   # recompile à chaque changement
npm run sass:build   # build minifié (prod)
```
3) Lancer un serveur local et ouvrir le navigateur
```bash
npm run serve        # http://localhost:5173/
```
4) Pages à ouvrir
- Recommandée: `optimized-sound-board.html`
- Alternative: `index.html` (même modèle de boutons `data-sound`)

## Utilisation
- Cliquez sur un bouton pour lire l’extrait audio correspondant.
- Le bouton actif reçoit la classe `is-playing` pendant la lecture.
- Un sélecteur de thèmes basique filtre l’affichage (ex: “Homer Simpson”).

## Personnalisation (sons et interface)
- Ajouter un son: placez `mon-son.mp3` dans `sounds/` et créez un bouton:
```html
<button data-sound="mon-son">Mon son</button>
```
- Le nom de fichier (sans extension) doit correspondre à `data-sound`.
- Styles: éditez `style.scss` puis recompilez via `npm run sass:*`.

## Architecture (vue d’ensemble)
- HTML
  - `optimized-sound-board.html`: référence (structure `data-sound`, arrêt des sons en cours, état visuel)
  - `index.html`: alignée sur le même modèle;
- JS
  - `assets/js/soundboard.js`: instancie les `Howl`, gère clics, état `is-playing`, stop des sons avant nouvelle lecture, et filtre par thème.
- Styles
  - `style.scss` → `style.css` (référencé par les pages)
- Assets
  - `sounds/` (mp3), `assets/img/` (fonds), `fonts.css` + `fonts/` (icomoon)

## Commandes utiles (npm)
- `npm run serve`: serveur local (5173)
- `npm run sass:dev`: build lisible + source map
- `npm run sass:watch`: watch en dev
- `npm run sass:build`: build minifié (prod)

## Optimisations recommandées
- Réseau
  - Preconnect ajouté aux CDNs (cdnjs, icomoon).
  - En prod, minifiez le CSS (`sass:build`).
- Audio
  - Fournir des formats alternatifs (opus/ogg) en plus du mp3 réduit le poids.
  - Sprite audio (optionnel) pour réduire le nombre de requêtes si la liste grandit.
- Accessibilité
  - Boutons avec libellé + `aria-label`.
- Cohérence dépendances
  - Howler est chargé via CDN côté pages; la dépendance npm est utile pour versionner, mais non consommée à l’exécution.

## PWA (optionnelle)
Utile si usage hors‑ligne ou installation “écran d’accueil”. Minimum: `manifest.json`, `sw.js`, enregistrement du SW. Non requis pour une simple démo.

## Déploiement
Le site est 100% statique. Déployez sur un hébergeur statique (GitHub Pages, Netlify, Vercel, etc.).
- Assurez-vous d’avoir `style.css` construit (ex: `npm run sass:build`).
- Publiez la racine du projet.

## FAQ
- Rien ne se passe au clic ?
  - Vérifiez la console, la présence de `howler.min.js` (CDN) et le chemin des fichiers dans `sounds/`.
- Les styles ne changent pas ?
  - Recompilez le SCSS (`npm run sass:dev` ou `npm run sass:watch`).
