"use client";

import React, { useState } from "react";

interface PasswordGateProps {
  onSuccess: () => void;
}

export default function PasswordGate({ onSuccess }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/gallery-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onSuccess();
      } else {
        setError(data.message || "Falsches Passwort. Bitte erneut versuchen.");
      }
    } catch (err) {
      setError("Verbindung zum Server fehlgeschlagen. Bitte versuchen Sie es erneut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f12] text-white flex flex-col items-center justify-center p-4 font-sans select-none">
      <div className="w-full max-w-md bg-[#161a20] border border-[#262c36] rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#202733] border border-[#313c4e] mb-4 text-[#d4af37]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-light tracking-wide text-gray-100 uppercase">Franz Kopp Archiv</h1>
          <p className="text-xs tracking-widest text-[#a0aec0] uppercase mt-1">Privater Familien- & Mediensafe</p>
          <div className="w-12 h-[2px] bg-[#d4af37] mx-auto mt-4 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Zugangscode / Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••••"
              required
              autoFocus
              className="w-full px-4 py-3 bg-[#0d0f12] border border-[#2d3440] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition duration-200"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-lg text-red-300 text-xs text-center flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-red-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[#d4af37] hover:bg-[#c29e2f] text-black font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-200 flex items-center justify-center disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Galerie öffnen"
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>© Kopp Suisse • Vertrauliches Archiv</p>
          <p className="mt-1 text-[10px] text-gray-600">Geschützter Bereich • Keine Indexierung</p>
        </div>
      </div>
    </div>
  );
}
