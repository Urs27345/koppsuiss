export default function DachPrivacyPage() {
  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px", lineHeight: 1.65 }}>
      <h1>DACH Community – Datenschutzerklärung</h1>
      <p>Stand: 22. September 2026</p>
      <p>
        Verantwortlich: KoppSuisse S.R.L., Santa Cruz de la Sierra, Bolivien. Kontakt:{" "}
        <a href="mailto:casa@koppsuisse.ch">casa@koppsuisse.ch</a>.
      </p>
      <h2>Verarbeitete Daten</h2>
      <p>
        Für ein Community-Konto werden E-Mail-Adresse, Anzeigename, technische Benutzer-ID sowie Anmelde- und
        Sitzungsdaten verarbeitet. Bei Empfehlungen, Kommentaren oder Fotos werden die von dir eingegebenen Inhalte,
        zugehörige Metadaten und gegebenenfalls hochgeladene Fotos gespeichert.
      </p>
      <p>
        Standortzugriff wird nur genutzt, wenn du ausdrücklich „Aktuellen Standort übernehmen“ verwendest. Es findet
        keine dauerhafte Standorterfassung im Hintergrund statt.
      </p>
      <h2>Zwecke und Dienstleister</h2>
      <p>
        Die Daten dienen Anmeldung, Kontoverwaltung, Speicherung und Moderation von Community-Inhalten,
        Missbrauchsprävention, Meldungen, Nutzerblockierungen und dem sicheren Betrieb der App. Authentifizierung,
        Datenbank und Dateispeicherung erfolgen über Supabase. Google Maps kann beim Öffnen von Kartenlinks verwendet
        werden.
      </p>
      <h2>Moderation</h2>
      <p>
        Neue Beiträge und Fotos werden vor der öffentlichen Anzeige moderiert. Angemeldete Nutzer können Inhalte melden
        und andere Nutzer blockieren.
      </p>
      <h2>Löschung</h2>
      <p>
        Kontodaten werden grundsätzlich so lange gespeichert, wie das Konto besteht. Das Konto kann direkt in der App
        gelöscht oder über die externe Löschseite zur Löschung beantragt werden.
      </p>
      <p>
        <a href="/dach-konto-loeschen">Konto und Daten löschen</a>
      </p>
      <h2>Rechte und Sicherheit</h2>
      <p>
        Auskunft, Berichtigung und Löschung können über <a href="mailto:casa@koppsuisse.ch">casa@koppsuisse.ch</a>{" "}
        verlangt werden. Die App verwendet HTTPS; lokale Sitzungstoken werden über den Android Keystore geschützt.
      </p>
    </main>
  );
}
