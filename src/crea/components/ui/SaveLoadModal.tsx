"use client";

import React, { useState, useEffect } from "react";
import { CabinetConfig } from "../../types/cabinet";
import { X, Save, Upload, Trash2, FolderOpen, Check } from "lucide-react";

interface SaveLoadModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CabinetConfig;
  onLoadConfig: (newConfig: CabinetConfig) => void;
}

export const SaveLoadModal: React.FC<SaveLoadModalProps> = ({ isOpen, onClose, config, onLoadConfig }) => {
  const [savedConfigs, setSavedConfigs] = useState<CabinetConfig[]>([]);
  const [customName, setCustomName] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("koppsuisse_crea_saved_configs");
      if (item) {
        try {
          setSavedConfigs(JSON.parse(item));
        } catch (e) {
          console.error("Failed to parse saved configs:", e);
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveCurrent = () => {
    const newEntry: CabinetConfig = {
      ...config,
      timestamp: new Date().toISOString(),
    };
    const updated = [newEntry, ...savedConfigs.filter((c) => c.configId !== newEntry.configId)];
    setSavedConfigs(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("koppsuisse_crea_saved_configs", JSON.stringify(updated));
    }
    setSuccessMsg("¡Configuración guardada localmente!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleDelete = (configId: string) => {
    const updated = savedConfigs.filter((c) => c.configId !== configId);
    setSavedConfigs(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("koppsuisse_crea_saved_configs", JSON.stringify(updated));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string) as CabinetConfig;
        if (parsed && parsed.productType && parsed.dimensions) {
          onLoadConfig(parsed);
          onClose();
        } else {
          alert("El archivo JSON importado no tiene un formato de configuración válido.");
        }
      } catch (err) {
        alert("Error al leer el archivo JSON.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <span className="font-bold text-sm">Guardar / Cargar Configuración</span>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Quick Save Current */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Guardar Configuración Actual</h3>
            <div className="font-mono text-xs font-bold text-red-600 bg-white p-2.5 rounded-lg border border-slate-200">
              {config.configId}
            </div>
            <button
              onClick={handleSaveCurrent}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Guardar en Navegador</span>
            </button>
            {successMsg && (
              <p className="text-xs font-semibold text-emerald-600 flex items-center justify-center gap-1">
                <Check className="w-4 h-4" />
                {successMsg}
              </p>
            )}
          </div>

          {/* Import JSON File */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Importar Archivo JSON</h3>
            <label className="flex items-center justify-center gap-2 w-full p-3 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
              <Upload className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-medium text-slate-700">Seleccionar archivo JSON (.json)</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {/* List of Local Saved Configs */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <FolderOpen className="w-4 h-4 text-slate-400" />
              Configuraciones Guardadas ({savedConfigs.length})
            </h3>

            {savedConfigs.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2 text-center">
                No hay configuraciones guardadas localmente.
              </p>
            ) : (
              <div className="space-y-2">
                {savedConfigs.map((cfg) => (
                  <div
                    key={cfg.configId + cfg.timestamp}
                    className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all"
                  >
                    <div className="space-y-0.5">
                      <p className="font-mono text-xs font-bold text-slate-900">{cfg.configId}</p>
                      <p className="text-[10px] text-slate-500">
                        {cfg.dimensions.width}mm | {cfg.finishes.front.name.split("/")[0]} |{" "}
                        {new Date(cfg.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          onLoadConfig(cfg);
                          onClose();
                        }}
                        className="px-2.5 py-1.5 bg-slate-900 text-white text-[11px] font-semibold rounded-lg hover:bg-slate-800"
                      >
                        Cargar
                      </button>
                      <button
                        onClick={() => handleDelete(cfg.configId)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
