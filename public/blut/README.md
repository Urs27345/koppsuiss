# Salud Urs Blutdruck-App

Stabiler Neuaufbau Version 2.0.

Eigenschaften:
- Android APK, keine PWA
- Paketname bleibt: com.koppsuisse.saludurs
- versionCode: 20
- Kamera über Thumbnail-Rückgabe, ohne FileProvider für Fotoaufnahme
- Foto wird intern gespeichert
- Blutdruckwerte lokal gespeichert
- CSV Export/Teilen über FileProvider
- GitHub Actions baut APK automatisch und schreibt sie nach public/blut/blutdruck-app.apk
