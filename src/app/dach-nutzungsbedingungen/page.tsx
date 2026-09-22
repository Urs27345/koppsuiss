import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DACH Community – Nutzungsbedingungen",
  description: "Community-Regeln und Nutzungsbedingungen für DACH Community.",
};

export default function DachTermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-slate-800">
      <h1 className="mb-3 text-3xl font-bold text-slate-950">DACH Community – Nutzungsbedingungen</h1>
      <p className="mb-8 text-sm text-slate-500">Stand: 22. September 2026</p>

      <section className="space-y-4">
        <p>
          DACH Community ist eine Community-App von KoppSuisse S.R.L. für Empfehlungen, Erfahrungen,
          Fotos und Hinweise mit Bezug zur deutschsprachigen Community.
        </p>

        <h2 className="pt-4 text-xl font-semibold">Regeln für Nutzerinhalte</h2>
        <p>Du darfst nur Inhalte veröffentlichen, die rechtmäßig, sachlich und für die Community relevant sind.</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Keine Beleidigungen, Drohungen, Belästigung, Diskriminierung oder Hassinhalte.</li>
          <li>Kein Spam, keine betrügerischen oder irreführenden Inhalte.</li>
          <li>Keine rechtswidrigen Inhalte oder Anleitungen zu rechtswidrigem Verhalten.</li>
          <li>Keine personenbezogenen Daten Dritter ohne deren Berechtigung oder Einwilligung.</li>
          <li>Fotos und andere Medien dürfen nur hochgeladen werden, wenn du sie rechtmäßig verwenden darfst.</li>
        </ul>

        <h2 className="pt-4 text-xl font-semibold">Moderation</h2>
        <p>
          Neue Beiträge und Fotos können vor ihrer Veröffentlichung geprüft werden. KoppSuisse S.R.L.
          kann Inhalte ablehnen, ausblenden oder entfernen, wenn sie gegen diese Regeln, geltendes Recht
          oder die Sicherheit der Community verstoßen.
        </p>

        <h2 className="pt-4 text-xl font-semibold">Melden und Blockieren</h2>
        <p>
          Angemeldete Nutzer können problematische Inhalte melden und andere Nutzer blockieren. Ein
          blockierter Nutzer wird für das blockierende Konto in den dafür vorgesehenen Community-Ansichten
          ausgeblendet. Meldungen werden von der Moderation geprüft.
        </p>

        <h2 className="pt-4 text-xl font-semibold">Konto und Löschung</h2>
        <p>
          Du bist für die Sicherheit deiner Zugangsdaten verantwortlich. Dein Community-Konto kann direkt
          in der App dauerhaft gelöscht werden. Alternativ kannst du die Löschung über die externe
          Löschseite beantragen.
        </p>

        <h2 className="pt-4 text-xl font-semibold">Kontakt</h2>
        <p>
          Fragen oder Beschwerden:{" "}
          <a className="underline" href="mailto:casa@koppsuisse.ch">casa@koppsuisse.ch</a>.
        </p>
      </section>
    </main>
  );
}
