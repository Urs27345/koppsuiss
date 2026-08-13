import { CabinetConfig } from "../types/cabinet";
import { FRONT_FINISHES, CARCASS_FINISHES } from "./finishes";
import { HANDLE_OPTIONS, DTC_HINGE_SPEC } from "./hardware";
import { generateConfigId } from "../utils/configIdGenerator";
import { calculateProvisionalPrice } from "../utils/priceCalculator";

const initialBase: Partial<CabinetConfig> = {
  schemaVersion: "1.0",
  productType: "KB",
  dimensions: {
    width: 600,
    height: 720,
    depth: 560,
    panelThickness: 18,
    backThickness: 8,
    doorGap: 2,
  },
  doors: {
    count: 1,
    hingeSide: "R",
    hingeType: "DTC110",
    isOpen: false,
  },
  finishes: {
    front: FRONT_FINISHES[2], // Light Oak
    carcass: CARCASS_FINISHES[0], // White
  },
  hardware: {
    hingeModel: DTC_HINGE_SPEC.model,
    hingeQty: 3,
    handle: HANDLE_OPTIONS[1], // Simple Bar Handle
  },
  quantity: 1,
  timestamp: new Date().toISOString(),
};

export const DEFAULT_CABINET_CONFIG: CabinetConfig = {
  ...(initialBase as CabinetConfig),
  configId: generateConfigId(initialBase),
  pricing: calculateProvisionalPrice(initialBase),
};
