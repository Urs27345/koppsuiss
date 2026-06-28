# Salud Urs – Blutdruck Android APK

Version: 3.0

Dieses Verzeichnis liegt in `koppsuisse/public/blut` und enthält die Android-App-Quellen sowie die Download-Seite.

## Zielstruktur

```text
koppsuisse/
├── .github/
│   └── workflows/
│       └── build-blutdruck-apk.yml
└── public/
    └── blut/
        ├── index.html
        ├── blutdruck-app.apk        # wird automatisch durch GitHub Actions erstellt
        ├── app/
        ├── build.gradle
        ├── settings.gradle
        ├── README.md
        └── CHANGELOG.txt
```

## Wichtig

- `.github/workflows/build-blutdruck-apk.yml` möglichst nur einmal einrichten.
- Künftige App-Versionen nur in `public/blut` ändern.
- ZIP für `public/blut` direkt in `public/blut` entpacken, ohne zusätzlichen Oberordner.
- ZIP für `.github` direkt in `.github` entpacken, ohne zusätzlichen Oberordner.
- Andere Ordner, z. B. Inventur-App, nicht überschreiben.

## Build

Der GitHub-Workflow baut automatisch die Debug-APK und kopiert sie nach:

```text
public/blut/blutdruck-app.apk
```

Download-Seite:

```text
https://www.koppsuisse.ch/blut/
```

Falls `/blut/` nicht lädt, direkt testen:

```text
https://www.koppsuisse.ch/blut/index.html
```

## Funktionen Version 3.0

- Blutdruck systolisch/diastolisch
- Puls
- Uhrzeit automatisch speichern
- Foto vom Blutdruckmessgerät aufnehmen
- Zahlen per OCR erkennen
- erkannte Werte vor dem Speichern bestätigen
- Verlaufsliste
- lokale Speicherung auf dem Android-Handy
- CSV-Export
- PDF-Export später geplant

## Spätere Erweiterungen

- Blutzucker
- Sauerstoff
- Temperatur
- Gewicht
- Medikamente
- Valaxam-D
- Augentropfen Eliptic Ofteno
- Augeninnendruck rechts/links
- Laborwerte
- Cholesterin/LDL/HDL
- CT/MRT/EKG/Röntgen-Befunde
- Diagramme
