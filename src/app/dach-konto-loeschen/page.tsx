import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DACH Community – Konto und Daten löschen",
  description: "DACH Community Konto und zugehörige Daten löschen oder die Löschung beantragen.",
};

const deletionMail =
  "mailto:casa@koppsuisse.ch?subject=DACH%20Community%20-%20Kontol%C3%B6schung&body=Bitte%20l%C3%B6schen%20Sie%20mein%20DACH%20Community-Konto.%0A%0ARegistrierte%20E-Mail-Adresse%3A%20";

export default function DachDeleteAccountPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-slate-800">
      <h1 className="mb-3 text-3xl font-bold text-slate-950">DACH Community – Konto und Daten löschen</h1>
      <p className="mb-8 text-sm text-slate-500">Stand: 22. September 2026</p>

      <section className="space-y-5">
        <p>
          Du kannst dein DACH Community-Konto und die damit verbundenen personenbezogenen Kontodaten
          dauerhaft löschen.
        </p>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="mb-2 text-xl font-semibold">Direkt in der App</h2>
          <p>
            Öffne <strong>Profil → Community-Konto → Konto dauerhaft löschen</strong> und bestätige
            die Löschung. Die App sendet die Löschung an den Server und entfernt anschließend die
            lokale Sitzung.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="mb-2 text-xl font-semibold">Löschung ohne installierte App beantragen</h2>
          <p className="mb-4">
            Sende die Anfrage von der E-Mail-Adresse, mit der dein Community-Konto registriert ist.
            So können wir das betroffene Konto eindeutig zuordnen und Missbrauch verhindern.
          </p>
          <a
            className="inline-block rounded-md bg-slate-900 px-5 py-3 font-semibold text-white"
            href={deletionMail}
          >
            Löschanfrage per E-Mail senden
          </a>
        </div>

        <h2 className="pt-3 text-xl font-semibold">Was wird gelöscht?</h2>
        <p>
          Das Community-Konto, die zugehörige Authentifizierungsidentität und die dafür gespeicherten
          Profildaten werden gelöscht. Inhalte, die aus rechtlichen, Sicherheits- oder
          Missbrauchspräventionsgründen vorübergehend aufbewahrt werden müssen, können nur für den
          erforderlichen Zeitraum gespeichert bleiben. Veröffentlichte Community-Inhalte können
          zusätzlich moderiert oder anonymisiert werden, soweit dies technisch oder rechtlich notwendig ist.
        </p>

        <p>
          Datenschutzinformationen findest du in der{" "}
          <a className="font-semibold underline" href="/dach-datenschutz">Datenschutzerklärung</a>.
        </p>
      </section>
    </main>
  );
}
