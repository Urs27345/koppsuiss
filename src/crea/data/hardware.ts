import { HandleOption } from "../types/cabinet";

export const HANDLE_OPTIONS: HandleOption[] = [
  {
    id: "HANDLELESS",
    name: "Sin Tirador / Handleless (Push / Gola)",
    code: "GOLA",
    sku: "HW-HDL-LESS",
    pricePerUnit: 0,
  },
  {
    id: "BAR01",
    name: "Tirador Barra / Simple Bar Handle (Inox)",
    code: "BAR01",
    sku: "HW-BAR-01",
    pricePerUnit: 15.0,
  },
];

export const DTC_HINGE_SPEC = {
  model: "DTC 110° Full Overlay Concealed Hinge",
  cupDiameter: 35,
  cupDepth: 11.5,
  cDistance: 5,
  systemSetback: 37,
  systemPitch: 32,
  pricePerPiece: 8.5,
};
