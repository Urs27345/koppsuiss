"use client";

import { FormEvent, useState } from "react";

const SUPABASE_URL = "https://yyekbhnyjlpyuttrnldw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_yxl-wQSzKUcHo06ZLM2mNQ_BAIIRb8U";

type LoginResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
  msg?: string;
};

export default function DachDeleteAccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  async function deleteAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!email.trim() || !password) {
      setMessage("Bitte E-Mail-Adresse und Passwort eingeben.");
      return;
    }
    if (!accepted || confirmation.trim().toUpperCase() !== "LÖSCHEN") {
      setMessage("Bitte die dauerhafte Löschung bestätigen und LÖSCHEN eingeben.");
      return;
    }

    setBusy(true);

    try {
      const loginResponse = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const loginData = (await loginResponse.json().catch(() => ({}))) as LoginResponse;

      if (!loginResponse.ok || !loginData.access_token) {
        setMessage("Anmeldung fehlgeschlagen. Bitte registrierte E-Mail-Adresse und Passwort prüfen.");
        return;
      }

      const deleteResponse = await fetch(`${SUPABASE_URL}/functions/v1/delete-account`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${loginData.access_token}`,
          "Content-Type": "application/json",
        },
        body: "{}",
      });

      const deleteData = (await deleteResponse.json().catch(() => ({}))) as {
        ok?: boolean;
        deleted?: boolean;
        error?: string;
      };

      if (!deleteResponse.ok || !deleteData.ok || !deleteData.deleted) {
        setMessage(
          "Die Kontolöschung konnte nicht abgeschlossen werden. Bitte später erneut versuchen oder den Support kontaktieren.",
        );
        return;
      }

      setPassword("");
      setConfirmation("");
      setSuccess(true);
      setMessage("");
    } catch {
      setMessage("Die Verbindung ist fehlgeschlagen. Bitte Internetverbindung prüfen und erneut versuchen.");
    } finally {
      setBusy(false);
    }
  }

  const cardStyle = {
    border: "1px solid #d9d9d9",
    borderRadius: 14,
    padding: 24,
    margin: "24px 0",
    background: "#fff",
  } as const;

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box" as const,
    padding: "12px 14px",
    marginTop: 6,
    border: "1px solid #b9b9b9",
    borderRadius: 8,
    fontSize: 16,
  };

  return (
    <main
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: "48px 24px",
        lineHeight: 1.65,
        color: "#171717",
      }}
    >
      <h1>DACH Community – Konto und Daten dauerhaft löschen</h1>
      <p>Stand: 28. September 2026</p>

      <p>
        Hier kannst du dein DACH-Community-Konto auch ohne installierte App selbst dauerhaft löschen. Dafür meldest du
        dich mit der registrierten E-Mail-Adresse und deinem Passwort an.
      </p>

      <section style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Konto jetzt dauerhaft löschen</h2>

        {success ? (
          <>
            <p style={{ fontWeight: 700, color: "#176b2c" }}>Dein DACH-Community-Konto wurde dauerhaft gelöscht.</p>
            <p>
              Die Authentifizierungsidentität und das zugehörige Profil wurden entfernt. Du kannst dich mit diesem Konto
              nicht mehr anmelden.
            </p>
          </>
        ) : (
          <form onSubmit={deleteAccount}>
            <label style={{ display: "block", marginBottom: 16 }}>
              Registrierte E-Mail-Adresse
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                style={inputStyle}
                disabled={busy}
                required
              />
            </label>

            <label style={{ display: "block", marginBottom: 16 }}>
              Passwort
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                style={inputStyle}
                disabled={busy}
                required
              />
            </label>

            <div
              style={{
                border: "1px solid #f0b7b7",
                background: "#fff6f6",
                borderRadius: 10,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <strong>Achtung: Dieser Vorgang kann nicht rückgängig gemacht werden.</strong>
              <p style={{ marginBottom: 8 }}>
                Gib zur Bestätigung <strong>LÖSCHEN</strong> ein:
              </p>
              <input
                type="text"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                style={inputStyle}
                disabled={busy}
                required
              />

              <label style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(event) => setAccepted(event.target.checked)}
                  disabled={busy}
                  required
                />
                <span>Ich bestätige, dass mein DACH-Community-Konto dauerhaft gelöscht werden soll.</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={busy || !accepted || confirmation.trim().toUpperCase() !== "LÖSCHEN"}
              style={{
                width: "100%",
                border: 0,
                borderRadius: 9,
                padding: "14px 18px",
                fontSize: 16,
                fontWeight: 700,
                background:
                  busy || !accepted || confirmation.trim().toUpperCase() !== "LÖSCHEN" ? "#b9b9b9" : "#a40000",
                color: "#fff",
                cursor: busy ? "wait" : "pointer",
              }}
            >
              {busy ? "Konto wird gelöscht …" : "Konto dauerhaft löschen"}
            </button>

            {message ? (
              <p role="alert" style={{ color: "#9b0000", fontWeight: 600 }}>
                {message}
              </p>
            ) : null}

            <p style={{ fontSize: 14, color: "#555", marginBottom: 0 }}>
              Dein Passwort wird direkt über eine verschlüsselte HTTPS-Verbindung an den
              DACH-Community-Authentifizierungsdienst übermittelt und nicht auf der KoppSuisse-Webseite gespeichert.
            </p>
          </form>
        )}
      </section>

      <h2>Was wird gelöscht?</h2>
      <p>
        Dein Authentifizierungskonto, dein Community-Profil sowie kontobezogene Blockier- und Meldebeziehungen werden
        entfernt. Von dir zusätzlich hochgeladene Community-Fotos werden aus der Multi-Foto-Galerie und dem zugehörigen
        Speicher gelöscht.
      </p>
      <p>
        Bereits freigegebene öffentliche Community-Empfehlungen können ohne Verknüpfung zu deinem Konto als
        anonymisierte Community-Inhalte bestehen bleiben. Gesetzlich oder aus Sicherheitsgründen zwingend
        aufzubewahrende Daten können nur für den erforderlichen Zeitraum gespeichert bleiben.
      </p>

      <h2>Alternativen</h2>
      <p>
        In der App kannst du die Löschung ebenfalls unter{" "}
        <strong>Profil → Community-Konto → Konto dauerhaft löschen</strong> durchführen.
      </p>
      <p>
        Wenn du dich nicht mehr anmelden kannst, kannst du eine Löschanfrage von deiner registrierten E-Mail-Adresse an{" "}
        <a href="mailto:casa@koppsuisse.ch?subject=DACH%20Community%20-%20Kontol%C3%B6schung">casa@koppsuisse.ch</a>{" "}
        senden. Vor einer manuellen Löschung wird die Identität geprüft.
      </p>

      <p>
        <a href="/dach-datenschutz">Datenschutzerklärung</a>
      </p>
    </main>
  );
}
