# Salut Urs Android-App

Das ist ein komplettes minimales Android-Projekt.

Ziel:
- GitHub baut automatisch eine echte Android-APK.
- Die APK wird danach in `public/blut/salut-urs.apk` abgelegt.
- Auf dem Handy kann sie über `https://www.koppsuisse.ch/blut` heruntergeladen werden.

## Wichtig

Das ist keine HTML-App und keine umbenannte Datei.
Die echte APK entsteht erst, wenn GitHub Actions den Build ausführt.

## So verwenden

1. ZIP entpacken.
2. Den ganzen Inhalt in dein GitHub-Repository hochladen.
   Wichtig: Die Ordner `.github`, `app` und `public` müssen mit hochgeladen werden.
3. In GitHub öffnen:
   `Actions`
4. Workflow öffnen:
   `Build Salut Urs Android APK`
5. Auf `Run workflow` klicken.
6. Warten, bis der Build grün ist.
7. Danach liegt die APK im Repository hier:

   `public/blut/salut-urs.apk`

8. Dann am Android-Handy öffnen:

   `https://www.koppsuisse.ch/blut`

9. Button `Android-App herunterladen` drücken.
10. Android sollte dann die Datei `salut-urs.apk` herunterladen und die Installation anbieten.

## Direkter APK-Link nach erfolgreichem Build

`https://www.koppsuisse.ch/blut/salut-urs.apk`

## Wenn es nicht geht

Wenn wieder eine `.html` heruntergeladen wird:
- Die GitHub Action wurde noch nicht erfolgreich ausgeführt, oder
- `public/blut/salut-urs.apk` existiert noch nicht, oder
- der Server/Browser zeigt noch eine alte Version.

Wenn Android sagt `App wurde nicht installiert`:
- alte Version `Salut Urs` löschen,
- dann erneut installieren.
