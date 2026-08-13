"use client";

import React from "react";
import { CabinetConfig } from "../../types/cabinet";
import { Tag, ShieldCheck, Download, FileText, Bookmark, Info } from "lucide-react";

interface ConfigSummaryProps {
  config: CabinetConfig;
  onOpenOrderSheet: () => void;
  onOpenSaveLoad: () => void;
  onExportJson: () => void;
}

export const ConfigSummary: React.FC<ConfigSummaryProps> = ({
  config,
  onOpenOrderSheet,
  onOpenSaveLoad,
  onExportJson,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5">
      {/* Product & Config ID Header */}
      <div className="space-y-1.5 pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">ID de Configuración</span>
          <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
            Producción Listo
          </span>
        </div>
        <div className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 break-all select-all">
          {config.configId}
        </div>
      </div>

      {/* Specifications Checklist */}
      <div className="space-y-2 text-xs text-slate-600">
        <div className="flex justify-between py-1 border-b border-slate-50">
          <span className="text-slate-500">Dimensiones (Al x An x Prof):</span>
          <span className="font-semibold text-slate-800">720 x {config.dimensions.width} x 560 mm</span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-50">
          <span className="text-slate-500">Configuración Puertas:</span>
          <span className="font-semibold text-slate-800">
            {config.doors.count} Puerta{config.doors.count > 1 ? "s" : ""} ({config.doors.hingeSide})
          </span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-50">
          <span className="text-slate-500">Herraje Bisagras:</span>
          <span className="font-semibold text-slate-800 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            3x DTC 110° Oculta
          </span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-50">
          <span className="text-slate-500">Tirador:</span>
          <span className="font-semibold text-slate-800">{config.hardware.handle.name.split("/")[0]}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-50">
          <span className="text-slate-500">Frente:</span>
          <span className="font-semibold text-slate-800">{config.finishes.front.name.split("/")[0]}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-50">
          <span className="text-slate-500">Carcasa:</span>
          <span className="font-semibold text-slate-800">{config.finishes.carcass.name.split("/")[0]}</span>
        </div>
      </div>

      {/* Price Engine Section */}
      <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Precio Estimativo (Demo)</span>
          <span className="flex items-center gap-1 text-[10px] bg-slate-800 px-2 py-0.5 rounded text-amber-400">
            <Info className="w-3 h-3" />
            Provisional
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-black tracking-tight text-white">
            {config.pricing.provisionalTotal} {config.pricing.currency}
          </span>
          <span className="text-xs text-slate-400">IVA incl.</span>
        </div>
        <p className="text-[10px] text-slate-400 border-t border-slate-800 pt-2">
          Precio provisional para evaluación comercial KOPPSUISSE. No constituye oferta formal.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <button
          onClick={onOpenOrderSheet}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
        >
          <FileText className="w-4 h-4" />
          <span>Generar Hoja de Pedido (Order Sheet)</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onExportJson}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl border border-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar JSON</span>
          </button>
          <button
            onClick={onOpenSaveLoad}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl border border-slate-200 transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Guardar / Cargar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
