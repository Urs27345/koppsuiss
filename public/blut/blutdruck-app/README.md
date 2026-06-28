# Blutdruck App für Android

Kleine native Android-App zum Speichern von Blutdruckwerten.

## Funktionen

- Eingabe oberer Wert / systolisch
- Eingabe unterer Wert / diastolisch
- lokale Speicherung auf dem Android-Gerät
- Verlaufsliste mit Datum und Uhrzeit
- einfache Einschätzung der Werte
- CSV-Export über Teilen-Funktion

Die Daten werden nur lokal auf dem Handy gespeichert. Es gibt keine Cloud, kein Konto und keine externe Datenübertragung.

## Installation über GitHub ohne Android Studio

1. Auf GitHub ein neues Repository erstellen, zum Beispiel `blutdruck-app`.
2. In GitHub auf **Add file** klicken.
3. **Upload files** wählen.
4. Alle Dateien und Ordner aus diesem Projekt hochladen.
5. **Commit changes** klicken.
6. In GitHub oben auf **Actions** gehen.
7. Workflow **Android APK erstellen** öffnen.
8. Falls nötig: **Run workflow** klicken.
9. Nach dem grünen Haken den Build öffnen.
10. Unten bei **Artifacts** die Datei `blutdruck-app-debug-apk` herunterladen.
11. ZIP entpacken. Darin liegt `app-debug.apk`.
12. `app-debug.apk` auf das Android-Handy senden und öffnen.
13. Android fragt eventuell nach Erlaubnis für „unbekannte Apps“. Diese Erlaubnis für den Dateimanager oder Browser erlauben.
14. App installieren.

## Installation über Android Studio

1. Android Studio öffnen.
2. **Open** wählen und diesen Projektordner öffnen.
3. Handy per USB anschließen oder Emulator wählen.
4. Auf **Run** klicken.

## Medizinischer Hinweis

Diese App ist nur ein persönliches Messprotokoll. Sie ersetzt keine ärztliche Diagnose. Bei sehr hohen Werten oder Symptomen bitte ärztliche Hilfe holen.
