# Salud Urs – Blutdruck-App

Version: 3.0

Dieser Ordner ist komplett eigenständig für die Blutdruck-App.

## Ordnerstruktur

```text
public/blut/
├── index.html              # Download-Seite
├── blutdruck-app.apk       # wird automatisch durch GitHub Actions gebaut
└── android/                # native Android-App-Quellcode
    ├── settings.gradle
    ├── build.gradle
    ├── gradle.properties
    └── app/
```

## Warum diese Struktur?

Alles, was zur Blutdruck-App gehört, liegt unter `public/blut`.
Damit können später weitere Apps separat angelegt werden, z. B.:

```text
public/inventur/
public/medikamente/
public/labor/
```

Die GitHub-Workflow-Datei liegt technisch zwingend unter `.github/workflows`, ist aber nur für diese App zuständig:

```text
.github/workflows/build-blutdruck-apk.yml
```

## Build

GitHub Actions baut die APK automatisch und kopiert sie nach:

```text
public/blut/blutdruck-app.apk
```
