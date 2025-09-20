# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Titre: Guide pour travailler dans ce dépôt (SoundBoard-app)

Résumé rapide
- Type de projet: site statique (HTML/CSS/JS) pour un soundboard
- Audio: Howler.js (utilisé via CDN dans les pages HTML)
- Styles: SCSS compilé en CSS (pas de bundler, pas de framework JS)
- Gestionnaire de paquets: npm (package-lock.json présent)

Commandes utiles
- Installer les dépendances (npm recommandé car package-lock.json présent):
```bash path=null start=null
npm ci
# ou, si vous modifiez les dépendances:
npm install
```
- Compiler le SCSS principal (racine -> style.css utilisé par index.html):
```bash path=null start=null
npx sass style.scss style.css --style=expanded --source-map
# mode surveillance
npx sass style.scss style.css --watch
# build minifié (ex. "prod")
npx sass style.scss style.css --style=compressed --no-source-map
```
- Compiler l’autre SCSS (assets/css) si vous l’utilisez:
```bash path=null start=null
npx sass assets/css/style.scss assets/css/style.css --style=expanded --source-map
```
- Servir le site en local (évite les soucis de chemin/CORS):
```bash path=null start=null
# Option Python (macOS):
python3 -m http.server 5173
# Option Node sans dépendance locale (téléchargée via npx):
npx http-server -p 5173
```
Ensuite ouvrez http://localhost:5173/ et chargez index.html ou optimized-sound-board.html.

- Lint / Tests
  - Aucun linter ni framework de tests n’est configuré dans ce dépôt.
  - Il n’y a pas de commande pour exécuter un test unique.

Architecture et structure (vue d’ensemble)
- Pages HTML principales
  - index.html
    - Référence style.css à la racine.
    - Charge Howler via CDN.
    - Contient un script inline qui attache des listeners à quelques boutons et instancie plusieurs Howl(...).
  - optimized-sound-board.html
    - Même stack (Howler via CDN), mais logique plus structurée:
      - data-sound sur les boutons, dictionnaire de sons, arrêt des sons en cours avant d’en jouer un autre, ajout/suppression de la classe is-playing, sélecteur de thèmes élémentaire.
- Scripts JS
  - Inline dans index.html (impératif et spécifique à quelques boutons, références directes sound1..sound5).
  - assets/js/main.js
    - Gestion clavier/souris générique basée sur des éléments <audio> avec des data-key et des conteneurs .list__item.
    - Ce fichier n’est pas référencé par index.html/optimized-sound-board.html tels que présents; il correspond à une autre variante de markup (avec <audio>), non visible dans les pages actuelles.
- Styles
  - style.scss (à la racine) -> produit style.css (référencé par index.html et optimized-sound-board.html).
  - assets/css/style.scss (seconde base SCSS, probablement antérieure ou alternative). N’est pas référencée par les pages principales par défaut.
  - Icônes via une police (icomoon) déclarée dans style.scss.
- Assets
  - sounds/: fichiers .mp3/.wav utilisés par Howler.
  - assets/img/bg.jpg: fond d’écran.
  - fonts/ et fonts.css: police d’icônes.

Notes et spécificités utiles à connaître
- Doublon Howler
  - howler est listé dans package.json, mais les pages utilisent le CDN. Sans bundler, la dépendance NPM n’est pas utilisée par le runtime du navigateur.
- index.html (pièges potentiels)
  - Le bouton #playBtn5 a un guillemet surnuméraire dans l’attribut id (id="playBtn5"").
  - Les listeners ne sont câblés que pour 5 boutons; les autres n’ont pas de gestionnaires de clics.
  - La fonction isPlaying() manipule playBtn.classList, alors que la variable playBtn a été commentée plus haut; cela provoquera une ReferenceError si appelée.
  - optimized-sound-board.html propose une version plus robuste basée sur data-sound; préférez cette page pour la démo.
- SCSS multiples
  - Deux "sources" SCSS coexistent (racine et assets/css). Les pages utilisent le CSS généré depuis le SCSS racine (style.css). Harmonisez si vous comptez n’en garder qu’une.
- Servir via HTTP
  - Ouvrir directement le fichier dans le navigateur peut fonctionner, mais servir via un petit serveur local est préférable (chemins, CORS, assets).

Références internes repérées
- README.md: brève description conceptuelle d’un soundboard (pas d’instructions d’exécution).
- Pas de WARP.md/CLAUDE.md/.cursor/Copilot rules dans le dépôt au moment de l’analyse.

Conseils de navigation pour WARP dans ce dépôt
- Pour une démonstration fonctionnelle immédiate, servez le dossier et ouvrez optimized-sound-board.html.
- Pour modifier le style, travaillez sur style.scss (racine) puis recompilez via npx sass.
- Si vous souhaitez unifier/faire évoluer la JS côté client, alignez index.html et assets/js/main.js sur le même modèle de markup (data-sound + Howler, ou <audio> + data-key), puis référencez le script dans la page.
