# Salud Urs 4.4 — einfache Methode

Diese Version verwendet die einfache und robuste Methode:

1. GitHub Actions baut die APK.
2. Die APK erscheint unten im erfolgreichen Actions-Lauf als Artifact `blutdruck-app`.
3. Dieses Artifact herunterladen und entpacken.
4. Die darin enthaltene Datei `blutdruck-app.apk` manuell nach `public/blut/blutdruck-app.apk` kopieren/ersetzen.
5. Commit und Push.
6. Danach funktioniert:
   https://www.koppsuisse.ch/blut/blutdruck-app.apk?v=44

Wichtig:
- Der Workflow committet die APK NICHT mehr automatisch zurück.
- Dadurch entstehen weniger Konflikte.
- App-Version: 4.4
- Paket-ID: com.koppsuisse.saludurs44
