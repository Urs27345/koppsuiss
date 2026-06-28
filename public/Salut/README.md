# Salut Urs PWA – Version mit privater Startseite

Diese Version zeigt auf der öffentlichen Startseite nur einen Installations-Button.
Die eigentliche App liegt in `app.html` und wird als PWA gestartet.

## Dateien hochladen

Den kompletten Inhalt dieses Ordners in den Webordner hochladen, z. B.:

`public/Salut_Urs/`

Wichtig: Nicht nur `index.html` hochladen. Diese Dateien müssen gemeinsam im selben Ordner liegen:

- `index.html`
- `app.html`
- `style.css`
- `app.js`
- `manifest.webmanifest`
- `sw.js`
- `icons/`

## Adresse

Startseite / Installation:

`https://www.koppsuisse.ch/Salut_Urs/`

## Android-Installation

1. Link mit Google Chrome auf Android öffnen.
2. Button **App installieren** drücken.
3. Falls kein Fenster erscheint: Browser-Menü → **App installieren** oder **Zum Startbildschirm hinzufügen**.

## Datenschutz

Die Gesundheitsdaten werden lokal im Browser/auf dem Handy gespeichert. Es wird keine Datenbank auf dem Server verwendet.
Trotzdem sind die Web-App-Dateien selbst bei einer öffentlichen Website grundsätzlich öffentlich abrufbar. Für echte Zugangssperre wäre später ein Login/PIN-Schutz oder ein privates Hosting nötig.
