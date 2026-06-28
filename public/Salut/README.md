# Salut Urs - PWA für GitHub Pages

Diese Version ist eine installierbare Web-App (PWA). Sie wird über eine HTTPS-Adresse geöffnet und kann auf Android über Chrome installiert werden.

## Inhalt
- `index.html`
- `style.css`
- `app.js`
- `manifest.webmanifest`
- `sw.js`
- `icons/`

## Installation über GitHub Pages
1. ZIP entpacken.
2. Den Inhalt dieses Ordners in einen GitHub-Ordner hochladen, z. B. `public/Salut_Urs/` oder direkt in ein neues Repository.
3. In GitHub Pages die Veröffentlichung aktivieren.
4. Die URL am Android-Handy in Chrome öffnen.
5. Menü `⋮` → `App installieren` oder `Zum Startbildschirm hinzufügen`.

Beispiel-URL bei Repo `koppsuiss` und GitHub-User `jluzcuber`:
`https://jluzcuber.github.io/koppsuiss/Salut_Urs/`

## Wichtig
- Die Daten werden lokal im Browser des Handys gespeichert.
- Keine Cloud-Synchronisation.
- Foto-OCR nutzt Tesseract.js über CDN. Dafür wird beim ersten Laden Internet benötigt. Werte müssen immer kontrolliert und bestätigt werden.
- Die App ist ein Dokumentationswerkzeug und ersetzt keine medizinische Beurteilung.
