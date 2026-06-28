# Salud Urs – Android Blutdruck-App Version 2.1

## Neuerungen
- Foto vom Blutdruckmessgerät machen
- OCR erkennt mögliche SYS/DIA/Puls-Werte
- Werte müssen vor dem Speichern bestätigt werden
- Uhrzeit wird automatisch gespeichert
- Verlauf lokal auf dem Handy
- CSV teilen

## Website-Dateien
Die Downloadseite liegt in:

`web/blut/index.html`

Die fertige APK muss exakt heißen:

`blutdruck-app.apk`

und auf dem Server liegen unter:

`https://www.koppsuisse.ch/blut/blutdruck-app.apk`

Die Seite öffnet man am Handy über:

`https://www.koppsuisse.ch/blut/`

## Android Studio / Build
APK erzeugen:

`./gradlew assembleDebug`

Danach liegt die Datei hier:

`app/build/outputs/apk/debug/app-debug.apk`

Diese Datei umbenennen in:

`blutdruck-app.apk`

und zusammen mit `index.html` in den Ordner `/blut/` der Website hochladen.
