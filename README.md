# Hégémonie — Velorax Game

Jeu de stratégie mondiale moderne en temps réel (prototype contre l'IA).

## Mettre en ligne (GitHub Pages)
1. Crée un dépôt public nommé `hegemonie`.
2. Ouvre-le dans un Codespace, glisse `hegemonie.zip` dans l'explorateur de fichiers, puis dans le terminal :
   `unzip -o hegemonie.zip && cp -r hegemonie/. . && rm -rf hegemonie hegemonie.zip && git add -A && git commit -m "Hégémonie v9" && git push`
3. Settings → Pages → Source : « Deploy from a branch », branche `main`, dossier `/ (root)`.
4. Onglet Actions → « Générer la carte du monde » → Run workflow (une seule fois, ~5 min) : ça crée le relief et la végétation de la carte.
5. Le jeu est en ligne sur `https://TON-PSEUDO.github.io/hegemonie/`.

## Mises à jour
Refaire l'étape 2 avec le nouveau zip. Les joueurs reçoivent la nouvelle version au prochain chargement.

## Images
- `assets/gen/` : portraits des généraux
- `assets/units/` : unités par palier (`jet_1.webp`, `char_4.webp`…)
