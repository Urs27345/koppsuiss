# Salut Urs

Android-Starterprojekt für ein lokales Gesundheitsprotokoll.

## Zweck

Die App erfasst aktuell:

- Blutdruck mit Foto-OCR oder manueller Eingabe
- SYS / DIA / Puls
- Zeitpunkt automatisch
- vor/nach Tablette
- Symptome und Notizen
- Gewicht und Bauchumfang
- Blutzucker in mg/dL
- Augendruck / Auge / Augentropfen / Sehnotizen
- Medikamente, z. B. Blutdruckmittel, Cholesterinsenker, Augentropfen, sonstige Medikamente
- einfache Verlaufsgrafik für Blutdruck
- PDF-Bericht auf Deutsch oder Spanisch
- CSV-Export für Excel

## Technische Basis

- Android native Kotlin
- Jetpack Compose für die Oberfläche
- Room für lokale Speicherung auf dem Gerät
- ML Kit Text Recognition für OCR vom Blutdruckgerät
- Android PdfDocument für PDF-Berichte
- FileProvider zum Teilen von PDF/CSV

## Datenschutz

Version 0.1 speichert alles lokal auf dem Android-Gerät. Es gibt keine Cloud, keinen Login und keinen Server.

## Öffnen in Android Studio

1. ZIP entpacken.
2. Android Studio öffnen.
3. `Open` wählen und den Ordner `SalutUrs` öffnen.
4. Gradle Sync abwarten.
5. Android-Gerät per USB verbinden oder Emulator starten.
6. `Run` drücken.

## Wichtige Hinweise

- Die OCR ist als MVP eingebaut. Nach jedem Foto müssen die Werte SYS/DIA/Puls geprüft und bestätigt werden.
- Die App ersetzt keine medizinische Beurteilung.
- Kritische Blutdruckwerte sollten medizinisch abgeklärt werden.
- Für eine stabile Produktionsversion sollte die Fotoaufnahme später von `TakePicturePreview` auf CameraX oder eine volle Bilddatei mit FileProvider umgestellt werden.

## Nächste sinnvolle Erweiterungen

- Vollständige Fotoablage pro Messung
- 7-/14-/30-Tage-Berichte inklusive Gewicht, Blutzucker, Auge und Medikamente
- Medikamenteneinnahmen mit Erinnerungen
- Export einer vollständigen SQLite-Sicherung
- Optionaler Google-Drive-Backup-Modus
- Mehrsprachige Oberfläche Deutsch/Spanisch
