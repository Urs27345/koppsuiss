import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DACH Community – Datenschutzerklärung",
  description: "Datenschutzerklärung für die Android-App DACH Community von KoppSuisse S.R.L.",
};

export default function DachPrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-slate-800">
      <h1 className="mb-3 text-3xl font-bold text-slate-950">DACH Community – Datenschutzerklärung</h1>
      <p className="mb-8 text-sm text-slate-500">Stand: 22. September 2026</p>

      <section className="space-y-4">
        <p>
          Verantwortlich für die App <strong>DACH Community</strong> ist KoppSuisse S.R.L.,
          Santa Cruz de la Sierra, Bolivien. Kontakt:{" "}
          <a className="underline" href="mailto:casa@koppsuisse.ch">casa@koppsuisse.ch</a>.
        </p>

        <h2 className="pt-4 text-xl font-semibold">Welche Daten verarbeitet werden</h2>
        <p>
          Für ein Community-Konto werden E-Mail-Adresse, Anzeigename, eine technische Benutzer-ID
          sowie Anmelde- und Sitzungsdaten verarbeitet. Wenn du Empfehlungen, Kommentare oder Fotos
          einreichst, werden die von dir eingegebenen Inhalte, zugehörige Metadaten und gegebenenfalls
          das hochgeladene Foto gespeichert.
        </p>
        <p>
          Die App kann Standortzugriff anfordern, wenn du ausdrücklich die Funktion „Aktuellen Standort
          übernehmen“ verwendest. Der Standort wird nicht dauerhaft im Hintergrund erhoben. Du kannst
          Empfehlungen auch ohne diese Funktion verwenden.
        </p>

        <h2 className="pt-4 text-xl font-semibold">Zwecke</h2>
        <p>
          Die Daten werden verwendet, um Anmeldung und Kontoverwaltung zu ermöglichen, Community-Inhalte
          zu speichern und nach Moderation anzuzeigen, Missbrauch zu verhindern, Meldungen und
          Nutzerblockierungen zu bearbeiten sowie die Sicherheit und Funktionsfähigkeit der App zu gewährleisten.
        </p>

        <h2 className="pt-4 text-xl font-semibold">Dienstleister</h2>
        <p>
          Die technische Datenhaltung, Authentifizierung und Dateispeicherung erfolgen über Supabase.
          Google Maps kann geöffnet werden, wenn du einen Standort oder einen Maps-Link aufrufst. Dabei
          gelten zusätzlich die Datenschutzbestimmungen des jeweiligen Dienstes.
        </p>

        <h2 className="pt-4 text-xl font-semibold">Moderation und Community-Sicherheit</h2>
        <p>
          Neue Community-Beiträge und Fotos werden vor der öffentlichen Anzeige moderiert. Angemeldete
          Nutzer können Inhalte melden und andere Nutzer blockieren. Meldungen werden gespeichert, damit
          die Moderation sie prüfen kann.
        </p>

        <h2 className="pt-4 text-xl font-semibold">Speicherdauer und Löschung</h2>
        <p>
          Kontodaten werden grundsätzlich so lange gespeichert, wie das Konto besteht. Community-Inhalte
          können entsprechend ihrer Funktion bis zur Löschung oder Moderationsentscheidung gespeichert
          bleiben. Du kannst dein Konto direkt in der App dauerhaft löschen oder eine Löschung über die
          externe Löschseite beantragen.
        </p>
        <p>
          <a className="font-semibold underline" href="/dach-konto-loeschen">
            Zur Seite für Kontolöschung
          </a>
        </p>

        <h2 className="pt-4 text-xl font-semibold">Deine Rechte</h2>
        <p>
          Du kannst Auskunft, Berichtigung oder Löschung deiner personenbezogenen Daten verlangen.
          Für Anfragen schreibe an{" "}
          <a className="underline" href="mailto:casa@koppsuisse.ch">casa@koppsuisse.ch</a>.
        </p>

        <h2 className="pt-4 text-xl font-semibold">Sicherheit</h2>
        <p>
          Die App verwendet verschlüsselte HTTPS-Verbindungen. Lokale Sitzungstoken werden auf Android
          über den Android Keystore geschützt gespeichert. Geheime Server-Schlüssel werden nicht in der
          App hinterlegt.
        </p>
      </section>
    </main>
  );
}
