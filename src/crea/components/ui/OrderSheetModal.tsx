"use client";

import React from "react";
import { CabinetConfig } from "../../types/cabinet";
import { X, Printer, Download, Box, ShieldCheck, CheckCircle2 } from "lucide-react";

interface OrderSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CabinetConfig;
  onExportJson: () => void;
}

export const OrderSheetModal: React.FC<OrderSheetModalProps> = ({ isOpen, onClose, config, onExportJson }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-red-500" />
            <span className="font-bold text-sm tracking-wide">KOPPSUISSE CREA – Hoja de Pedido</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Sheet Area */}
        <div id="printable-order-sheet" className="p-8 space-y-6 overflow-y-auto flex-1 bg-white">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-6">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900">KOPPSUISSE</h1>
              <p className="text-xs font-bold text-red-600 tracking-wider">CREA – Furniture Configurator</p>
              <p className="text-xs text-slate-500 mt-1">Diseña tus muebles a tu medida.</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-slate-400 block">Fecha de Configuración</span>
              <span className="text-xs font-bold text-slate-700">
                {new Date(config.timestamp).toLocaleDateString()}
              </span>
              <div className="mt-2 inline-block px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-mono font-bold text-slate-900">
                {config.configId}
              </div>
            </div>
          </div>

          {/* Product Summary Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Especificaciones Técnicas del Mueble
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Tipo de Producto:</span>
                  <span className="font-semibold">Mueble Bajo de Cocina (Kitchen Base)</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Dimensiones (An x Al x Prof):</span>
                  <span className="font-bold text-red-700">{config.dimensions.width} x 720 x 560 mm</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Grosor de Paneles:</span>
                  <span className="font-semibold">18 mm (Trasera 8 mm rebajada)</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Configuración Puertas:</span>
                  <span className="font-semibold">
                    {config.doors.count} Puerta(s) - Bisagras {config.doors.hingeSide}
                  </span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Tirador:</span>
                  <span className="font-semibold">{config.hardware.handle.name}</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Materiales & Herrajes DTC</h3>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Acabado Frente:</span>
                  <span className="font-semibold">{config.finishes.front.name}</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Acabado Estructura:</span>
                  <span className="font-semibold">{config.finishes.carcass.name}</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Sistema Bisagras:</span>
                  <span className="font-bold text-blue-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    3x DTC 110° Ocultas
                  </span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Perforaciones CNC:</span>
                  <span className="font-semibold">Copa Ø35mm + Sistema 32mm</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Compatibilidad Rhino:</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    JSON 1.0 Ready
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pricing Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mt-6">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Concepto / Componente</th>
                  <th className="py-2.5 px-4 text-center">Cant.</th>
                  <th className="py-2.5 px-4 text-right">Importe Estimado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-2.5 px-4 font-medium">
                    Estructura Mueble Bajo {config.dimensions.width}mm ({config.finishes.carcass.name})
                  </td>
                  <td className="py-2.5 px-4 text-center">1</td>
                  <td className="py-2.5 px-4 text-right font-mono">
                    {config.pricing.provisionalBase} {config.pricing.currency}
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium">Frente / Puerta ({config.finishes.front.name})</td>
                  <td className="py-2.5 px-4 text-center">{config.doors.count}</td>
                  <td className="py-2.5 px-4 text-right font-mono">
                    {config.pricing.provisionalFront} {config.pricing.currency}
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium">Herrajes DTC 110° + Tirador + Ensambles CNC</td>
                  <td className="py-2.5 px-4 text-center">1 kit</td>
                  <td className="py-2.5 px-4 text-right font-mono">
                    {config.pricing.provisionalHardware} {config.pricing.currency}
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-900 text-white font-bold">
                <tr>
                  <td colSpan={2} className="py-3 px-4 text-right">
                    TOTAL PROVISIONAL ESTIMADO:
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-base text-red-400">
                    {config.pricing.provisionalTotal} {config.pricing.currency}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <p className="text-[10px] text-slate-400 text-center italic">
            * Nota: Los precios mostrados son puramente demostrativos y provisionales para la Fase 1 del configurador
            KOPPSUISSE.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 bg-slate-50 border-t border-slate-200">
          <button
            onClick={onExportJson}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Exportar JSON para Rhino</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Descargar PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
