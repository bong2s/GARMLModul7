// Scene-composition configuration for the three Modul 7 models.
//
// The numbers here are NOT copied from Modul 6. They are derived from the real
// bounding boxes of Modul 7's own GLB files (see README → "Per-model geometry"):
//
//   CPU.glb           native 3.4061 × 3.4061 × 0.1112 (Z-up FBX, plate lies in XY)
//                     → rotateX(−π/2) so the plate lies flat, +Z face up
//   Computer_Chip.glb native 2.1107 × 1.7956 × 3.9446 (Y-up DIP chip, pins point −Y)
//                     → used as authored (stands on its pins)
//   calculator.glb    native 0.1528 × 0.0268 × 0.2011 after its root-node matrix
//                     (already Y-up, lies flat with the keypad up) → used as authored
//
// `targetSize` is the longest side AFTER orientation correction. Different values
// are used so that the three footprints have comparable visual weight.

export interface ModelLayout {
  /** Display name used for the hotspot label and the top navigation. */
  label: string;
  /** Accent colour for dot, label, leader line and info panel. */
  color: string;
  /** Longest side after orientation correction, in scene units. */
  targetSize: number;
  /** (x, z) of the model centre in the arrangement, before the arrangement is re-centred. */
  cell: [number, number];
  /** Extra rotation about X applied before measuring (radians). */
  rotateX?: number;
}

export const MODEL_LAYOUT: Record<string, ModelLayout> = {
  cpu: {
    label: "CPU",
    color: "#38bdf8",
    targetSize: 2.6,
    cell: [-2.5, -2.0],
    rotateX: -Math.PI / 2,
  },
  "computer-chip": {
    label: "CHIP KOMPUTER",
    color: "#a78bfa",
    targetSize: 2.5,
    cell: [2.5, -2.0],
  },
  calculator: {
    label: "KALKULATOR",
    color: "#fb923c",
    targetSize: 2.1,
    cell: [0, 2.0],
  },
};

/** Tilted "table seen from above" orientation of the whole arrangement in the preview. */
export const HOME_EULER = { x: 0.62, y: -0.42, order: "YXZ" as const };

/** Opacity factor of the models that are not selected (they stay visible). */
export const DIM_OPACITY = 0.35;

/** Per-model manual zoom limits (relative to the model's home scale) and step per click. */
export const PART_SCALE_MIN = 0.25;
export const PART_SCALE_MAX = 4;
export const ZOOM_STEP = 1.15;
