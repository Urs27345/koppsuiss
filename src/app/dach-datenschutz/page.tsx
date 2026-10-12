export default function DachPrivacyPage() {
  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px", lineHeight: 1.65 }}>
      <h1>DACH Community – Datenschutzerklärung</h1>
      <p>Stand: 12. Oktober 2026</p>
      <p>
        Verantwortlich: KoppSuisse S.R.L., Santa Cruz de la Sierra, Bolivien. Kontakt:{" "}
        <a href="mailto:casa@koppsuisse.ch">casa@koppsuisse.ch</a>.
      </p>
      <h2>Verarbeitete Daten</h2>
      <p>
        Für ein freiwilliges Community-Konto verarbeiten wir E-Mail-Adresse, Anzeigename, technische Benutzer-ID sowie
        Anmelde- und Sitzungsdaten. Die öffentliche Empfehlungsliste kann ohne Konto gelesen werden. Empfehlungen,
        Kommentare und ausgewählte Fotos werden mit den eingegebenen Angaben und Metadaten gespeichert. Veröffentliche
        nur Inhalte, die öffentlich sichtbar sein dürfen, und keine vertraulichen Daten anderer Personen.
      </p>
      <p>
        Standortzugriff erfolgt nur nach deiner Freigabe. Es gibt keine dauerhafte Standorterfassung im Hintergrund.
        Übernimmst du Standortangaben in eine Empfehlung und sendest diese ab, werden diese Angaben als Teil der
        Empfehlung gespeichert und nach Freigabe öffentlich angezeigt. Beim Öffnen externer Kartenlinks gelten
        zusätzlich die Datenschutzhinweise des jeweiligen Kartendienstes.
      </p>
      <h2>Zwecke und Dienstleister</h2>
      <p>
        Die Daten dienen Anmeldung, Kontoverwaltung, Speicherung und Moderation von Community-Inhalten,
        Missbrauchsprävention und dem sicheren Betrieb der App. Die aktuelle Firebase-Version verwendet Firebase
        Authentication für Anmeldung und Konten, Cloud Firestore für Community-Daten, Cloud Storage for Firebase für
        Fotos und Cloud Functions for Firebase für serverseitige Prüfungen und Löschvorgänge. Google verarbeitet diese
        Daten als technischer Dienstleister; eine Verarbeitung außerhalb deines Aufenthaltslandes ist möglich.
        Technische Verbindungs- und Sicherheitsdaten können für den Betrieb der Dienste anfallen. Die App verwendet kein
        Firebase Analytics und kein Firebase Crashlytics.
      </p>
      <p>
        Ältere App-Versionen verwendeten Supabase. Bereits dort gespeicherte Altdaten und noch nicht aktualisierte
        Installationen sind davon getrennt zu betrachten. Die Umstellung der aktuellen App ist kein Nachweis, dass
        sämtliche historischen Daten bei Supabase bereits gelöscht wurden.
      </p>
      <h2>Öffentliche Inhalte und Moderation</h2>
      <p>
        Neue Empfehlungen werden vor ihrer Freigabe geprüft. Kommentare und zusätzliche Fotos zu bereits freigegebenen
        Empfehlungen können direkt angezeigt und anschließend moderiert oder entfernt werden. Angemeldete Nutzer können
        Inhalte melden und andere Nutzer für ihre eigene Ansicht blockieren. Anzeigenamen, Kommentare, veröffentlichte
        Empfehlungsangaben und Fotos können für andere Nutzer sichtbar sein.
      </p>
      <h2>Speicherung und Löschung</h2>
      <p>
        Kontodaten werden grundsätzlich gespeichert, solange das Konto besteht. Du kannst das Konto in der App löschen
        oder über die externe Löschseite eine Löschung beantragen. Für die Löschung in der App ist eine erneute
        Anmeldung erforderlich. Mit dem neuen Firebase-Löschverfahren werden Anmeldung und Profil entfernt, offene
        eigene Beiträge gelöscht und die Kontoverknüpfung bereits freigegebener Inhalte entfernt. Bereits
        veröffentlichte Inhalte und Fotos können ohne Kontoverknüpfung bestehen bleiben. Die Entfernung weiterer
        personenbezogener Angaben oder veröffentlichter Fotos kannst du über den unten genannten Kontakt beantragen. In
        zeitlich begrenzten Sicherungen können gelöschte Daten bis zum Ablauf der eingerichteten Aufbewahrung von sieben
        Tagen enthalten sein.
      </p>
      <p>
        <a href="/dach-konto-loeschen">Konto und Daten löschen</a>
      </p>
      <h2>Rechte und Sicherheit</h2>
      <p>
        Auskunft, Berichtigung und Löschung kannst du über <a href="mailto:casa@koppsuisse.ch">casa@koppsuisse.ch</a>{" "}
        verlangen. Die App kommuniziert mit Firebase über verschlüsselte Verbindungen (HTTPS/TLS). Firebase verwaltet
        die Anmeldesitzung; die App speichert dein Passwort nicht als Klartext.
      </p>
    </main>
  );
}
