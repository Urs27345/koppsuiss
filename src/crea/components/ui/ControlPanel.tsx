"use client";

import React from "react";
import { CabinetConfig, FinishOption, HandleOption, HingeSide } from "../../types/cabinet";
import { FRONT_FINISHES, CARCASS_FINISHES } from "../../data/finishes";
import { HANDLE_OPTIONS } from "../../data/hardware";
import { Ruler, Layers, ShieldCheck, DoorClosed, Sliders } from "lucide-react";

interface ControlPanelProps {
  config: CabinetConfig;
  onChangeWidth: (w: number) => void;
  onChangeDoorCount: (count: number) => void;
  onChangeHingeSide: (side: HingeSide) => void;
  onChangeFrontFinish: (finish: FinishOption) => void;
  onChangeCarcassFinish: (finish: FinishOption) => void;
  onChangeHandle: (handle: HandleOption) => void;
}

const AVAILABLE_WIDTHS = [300, 400, 450, 500, 600, 800, 900];

export const ControlPanel: React.FC<ControlPanelProps> = ({
  config,
  onChangeWidth,
  onChangeDoorCount,
  onChangeHingeSide,
  onChangeFrontFinish,
  onChangeCarcassFinish,
  onChangeHandle,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <Sliders className="w-5 h-5 text-red-600" />
        <h2 className="text-base font-bold text-slate-900">Opciones de Configuración</h2>
      </div>

      {/* 1. Cabinet Width */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Ruler className="w-4 h-4 text-slate-400" />
            Ancho del Mueble (mm)
          </span>
          <span className="text-red-700 font-bold text-sm">{config.dimensions.width} mm</span>
        </label>
        <div className="grid grid-cols-4 gap-2">
          {AVAILABLE_WIDTHS.map((w) => (
            <button
              key={w}
              onClick={() => onChangeWidth(w)}
              className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                config.dimensions.width === w
                  ? "bg-red-600 text-white border-red-600 shadow-sm"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {w} mm
            </button>
          ))}
        </div>
      </div>

      {/* 2. Door Configuration */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <DoorClosed className="w-4 h-4 text-slate-400" />
          Puertas y Orientación
        </label>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onChangeDoorCount(1)}
            disabled={config.dimensions.width >= 800}
            className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
              config.doors.count === 1
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
            }`}
          >
            1 Puerta
          </button>
          <button
            onClick={() => onChangeDoorCount(2)}
            className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
              config.doors.count === 2
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            2 Puertas
          </button>
        </div>

        {config.doors.count === 1 && (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs font-medium text-slate-500">Lado Bisagras:</span>
            <div className="flex gap-2">
              <button
                onClick={() => onChangeHingeSide("L")}
                className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                  config.doors.hingeSide === "L"
                    ? "bg-red-100 text-red-700 border-red-300"
                    : "bg-slate-50 text-slate-600 border-slate-200"
                }`}
              >
                Izquierda (L)
              </button>
              <button
                onClick={() => onChangeHingeSide("R")}
                className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                  config.doors.hingeSide === "R"
                    ? "bg-red-100 text-red-700 border-red-300"
                    : "bg-slate-50 text-slate-600 border-slate-200"
                }`}
              >
                Derecha (R)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Front Finishes */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-slate-400" />
            Acabado Frontal (Puertas)
          </span>
          <span className="text-xs font-medium text-slate-500">{config.finishes.front.name}</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {FRONT_FINISHES.map((f) => (
            <button
              key={f.id}
              onClick={() => onChangeFrontFinish(f)}
              className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 text-center transition-all ${
                config.finishes.front.id === f.id
                  ? "border-red-600 ring-2 ring-red-100 bg-red-50/20"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <span
                className="w-6 h-6 rounded-full border border-slate-300 shadow-inner"
                style={{ backgroundColor: f.colorHex }}
              />
              <span className="text-[11px] font-medium text-slate-700 line-clamp-1">{f.name.split("/")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Carcass Finishes */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-slate-400" />
            Acabado Carcasa (Estructura)
          </span>
          <span className="text-xs font-medium text-slate-500">{config.finishes.carcass.name}</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {CARCASS_FINISHES.map((f) => (
            <button
              key={f.id}
              onClick={() => onChangeCarcassFinish(f)}
              className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 text-center transition-all ${
                config.finishes.carcass.id === f.id
                  ? "border-red-600 ring-2 ring-red-100 bg-red-50/20"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <span
                className="w-6 h-6 rounded-full border border-slate-300 shadow-inner"
                style={{ backgroundColor: f.colorHex }}
              />
              <span className="text-[11px] font-medium text-slate-700 line-clamp-1">{f.name.split("/")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Handles */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-slate-400" />
          Tirador
        </label>
        <div className="grid grid-cols-2 gap-2">
          {HANDLE_OPTIONS.map((h) => (
            <button
              key={h.id}
              onClick={() => onChangeHandle(h)}
              className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                config.hardware.handle.id === h.id
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {h.name.split("/")[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
