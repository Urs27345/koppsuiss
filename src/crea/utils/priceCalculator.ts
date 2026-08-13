import { CabinetConfig } from "../types/cabinet";
import { DTC_HINGE_SPEC } from "../data/hardware";

export function calculateProvisionalPrice(config: Partial<CabinetConfig>) {
  const w = config.dimensions?.width || 600;
  const doorCount = config.doors?.count || 1;
  const frontMult = config.finishes?.front?.priceMultiplier || 1.0;
  const carcassMult = config.finishes?.carcass?.priceMultiplier || 1.0;
  const handlePrice = config.hardware?.handle?.pricePerUnit || 0;

  // Base raw material cost proportional to cabinet volume/width
  const baseCarcassCost = (w / 600) * 120.0 * carcassMult;
  const baseFrontCost = (w / 600) * 75.0 * frontMult;

  // Hinges: 3 hinges per door
  const totalHinges = doorCount * 3;
  const hingeCost = totalHinges * DTC_HINGE_SPEC.pricePerPiece;
  const handleCost = doorCount * handlePrice;
  const hardwareCost = hingeCost + handleCost + 25.0; // 25.0 assembly hardware

  const total = Math.round(baseCarcassCost + baseFrontCost + hardwareCost);

  return {
    provisionalBase: Math.round(baseCarcassCost),
    provisionalFront: Math.round(baseFrontCost),
    provisionalHardware: Math.round(hardwareCost),
    provisionalTotal: total,
    currency: "CHF",
    isProvisional: true,
  };
}
