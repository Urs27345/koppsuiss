import { CabinetConfig } from "../types/cabinet";

export function generateConfigId(config: Partial<CabinetConfig>): string {
  const w = config.dimensions?.width || 600;
  const doorCount = config.doors?.count || 1;
  const side = config.doors?.count === 2 ? "DOUBLE" : config.doors?.hingeSide || "R";
  const frontCode = config.finishes?.front?.code || "WH01";
  const carcassCode = config.finishes?.carcass?.code || "WH";
  const handleCode = config.hardware?.handle?.code || "BAR01";

  return `KB${w}-${doorCount}D-${side}-DTC110-${frontCode}-${carcassCode}-${handleCode}`;
}
