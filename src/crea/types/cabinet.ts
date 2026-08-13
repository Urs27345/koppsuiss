export type ProductType = "KB" | "KW" | "KT" | "KD" | "KC" | "WB" | "OF"; // Base, Wall, Tall, Drawer, Corner, Wardrobe, Office

export type HingeSide = "L" | "R" | "DOUBLE";

export type HingeType = "DTC110"; // Phase 1: DTC 110° Concealed Hinge

export type HandleType = "HANDLELESS" | "BAR01";

export interface CabinetDimensions {
  width: number; // 300, 400, 450, 500, 600, 800, 900 mm
  height: number; // Fixed 720 mm for base unit
  depth: number; // Fixed 560 mm for base unit
  panelThickness: number; // 18 mm
  backThickness: number; // 8 mm
  doorGap: number; // 2 mm
}

export interface FinishOption {
  id: string;
  name: string;
  code: string;
  type: "melamine" | "veneer" | "lacquer";
  colorHex: string;
  sku: string;
  priceMultiplier: number;
}

export interface HandleOption {
  id: HandleType;
  name: string;
  code: string;
  sku: string;
  pricePerUnit: number;
}

export interface HardwareSpec {
  hingeModel: string;
  hingeQty: number;
  handle: HandleOption;
}

export interface CabinetConfig {
  schemaVersion: string;
  productType: ProductType;
  configId: string;
  dimensions: CabinetDimensions;
  doors: {
    count: number; // 1 or 2
    hingeSide: HingeSide;
    hingeType: HingeType;
    isOpen: boolean;
  };
  finishes: {
    front: FinishOption;
    carcass: FinishOption;
  };
  hardware: HardwareSpec;
  quantity: number;
  pricing: {
    provisionalBase: number;
    provisionalFront: number;
    provisionalHardware: number;
    provisionalTotal: number;
    currency: string;
    isProvisional: boolean;
  };
  timestamp: string;
}
