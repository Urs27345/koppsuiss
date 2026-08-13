"use client";

import React from "react";
import { Box, Sparkles } from "lucide-react";

export const ConfiguratorHeader: React.FC = () => {
  return (
    <div className="bg-white border-b border-slate-200 py-4 px-6 mb-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600 text-white rounded-xl shadow-md">
              <Box className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                <span>KOPPSUISSE CREA</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700">Fase 1</span>
              </h1>
              <p className="text-sm font-medium text-slate-500">Diseña tus muebles a tu medida.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Configurador 3D Paramétrico Interactivo</span>
        </div>
      </div>
    </div>
  );
};
