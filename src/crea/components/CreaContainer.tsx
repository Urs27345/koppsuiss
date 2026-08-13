"use client";

import React, { useState } from "react";
import { CabinetConfig, FinishOption, HandleOption, HingeSide } from "../types/cabinet";
import { DEFAULT_CABINET_CONFIG } from "../data/defaults";
import { generateConfigId } from "../utils/configIdGenerator";
import { calculateProvisionalPrice } from "../utils/priceCalculator";
import { ConfiguratorHeader } from "./ui/ConfiguratorHeader";
import { CabinetViewer } from "./3d/CabinetViewer";
import { ControlPanel } from "./ui/ControlPanel";
import { ConfigSummary } from "./ui/ConfigSummary";
import { OrderSheetModal } from "./ui/OrderSheetModal";
import { SaveLoadModal } from "./ui/SaveLoadModal";

export const CreaContainer: React.FC = () => {
  const [config, setConfig] = useState<CabinetConfig>(DEFAULT_CABINET_CONFIG);
  const [isOrderSheetOpen, setIsOrderSheetOpen] = useState(false);
  const [isSaveLoadOpen, setIsSaveLoadOpen] = useState(false);

  // Helper to update config and refresh ID + Price
  const updateConfig = (updater: (prev: CabinetConfig) => CabinetConfig) => {
    setConfig((prev) => {
      const next = updater(prev);
      const newId = generateConfigId(next);
      const newPricing = calculateProvisionalPrice(next);
      return {
        ...next,
        configId: newId,
        pricing: newPricing,
        timestamp: new Date().toISOString(),
      };
    });
  };

  const handleChangeWidth = (width: number) => {
    updateConfig((prev) => {
      const isWide = width >= 800;
      return {
        ...prev,
        dimensions: {
          ...prev.dimensions,
          width,
        },
        doors: {
          ...prev.doors,
          count: isWide ? 2 : prev.doors.count,
        },
      };
    });
  };

  const handleChangeDoorCount = (count: number) => {
    updateConfig((prev) => ({
      ...prev,
      doors: {
        ...prev.doors,
        count,
      },
    }));
  };

  const handleChangeHingeSide = (hingeSide: HingeSide) => {
    updateConfig((prev) => ({
      ...prev,
      doors: {
        ...prev.doors,
        hingeSide,
      },
    }));
  };

  const handleChangeFrontFinish = (front: FinishOption) => {
    updateConfig((prev) => ({
      ...prev,
      finishes: {
        ...prev.finishes,
        front,
      },
    }));
  };

  const handleChangeCarcassFinish = (carcass: FinishOption) => {
    updateConfig((prev) => ({
      ...prev,
      finishes: {
        ...prev.finishes,
        carcass,
      },
    }));
  };

  const handleChangeHandle = (handle: HandleOption) => {
    updateConfig((prev) => ({
      ...prev,
      hardware: {
        ...prev.hardware,
        handle,
      },
    }));
  };

  const handleToggleDoorOpen = () => {
    setConfig((prev) => ({
      ...prev,
      doors: {
        ...prev.doors,
        isOpen: !prev.doors.isOpen,
      },
    }));
  };

  const handleExportJson = () => {
    const jsonString = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${config.configId}_configuration.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100/60 pb-16">
      <ConfiguratorHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left / Main Column: 3D Viewport + Control Panel */}
          <div className="lg:col-span-8 space-y-6">
            {/* 3D Interactive Viewport */}
            <div className="h-[480px] sm:h-[540px]">
              <CabinetViewer config={config} onToggleDoorOpen={handleToggleDoorOpen} />
            </div>

            {/* Control Panel */}
            <ControlPanel
              config={config}
              onChangeWidth={handleChangeWidth}
              onChangeDoorCount={handleChangeDoorCount}
              onChangeHingeSide={handleChangeHingeSide}
              onChangeFrontFinish={handleChangeFrontFinish}
              onChangeCarcassFinish={handleChangeCarcassFinish}
              onChangeHandle={handleChangeHandle}
            />
          </div>

          {/* Right Column: Live Summary & Action Modals */}
          <div className="lg:col-span-4 space-y-6">
            <ConfigSummary
              config={config}
              onOpenOrderSheet={() => setIsOrderSheetOpen(true)}
              onOpenSaveLoad={() => setIsSaveLoadOpen(true)}
              onExportJson={handleExportJson}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <OrderSheetModal
        isOpen={isOrderSheetOpen}
        onClose={() => setIsOrderSheetOpen(false)}
        config={config}
        onExportJson={handleExportJson}
      />

      <SaveLoadModal
        isOpen={isSaveLoadOpen}
        onClose={() => setIsSaveLoadOpen(false)}
        config={config}
        onLoadConfig={(newConfig) => setConfig(newConfig)}
      />
    </div>
  );
};
