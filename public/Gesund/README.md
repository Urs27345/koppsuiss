# Salut Urs PWA für Ordner `Gesund`

Diese Version ist bewusst wie die funktionierende KOPPSUISSE-Inventur-App aufgebaut:

- `index.html` als Hauptdatei
- `manifest.webmanifest`
- `service-worker.js`
- `icon-192.png`
- `icon-512.png`
- Registrierung: `navigator.serviceWorker.register("./service-worker.js")`
- relative Pfade, damit es in jedem Unterordner funktioniert

## Upload

Den Inhalt dieses Ordners direkt in den Webordner hochladen:

`/Gesund/`

Danach am Handy mit Google Chrome öffnen:

`https://www.koppsuisse.ch/Gesund/?v=7`

Dann:

1. Auf **App installieren** tippen.
2. Falls kein Fenster kommt: Chrome-Menü → **App installieren** oder **Zum Startbildschirm hinzufügen**.
3. Nach Installation öffnet die App direkt mit `?app=1`.

## Wichtig bei Updates

Nach einem Update am Handy ggf. Cache löschen oder die URL mit neuer Versionsnummer öffnen, z. B. `?v=8`.
