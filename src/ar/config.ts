// Scene-composition configuration for the three Modul 8 models.
//
// Arrangement: CPU → Circuit Board → RAM (two models behind, one in front,
// whole layout centred on the origin — same composition pattern as Modul 7).
//
// The numbers are layout defaults; orientation correction is applied per model
// from the real bounding box of each GLB (see engine.ts → assemble). When a
// requested GLB is not yet present, the engine substitutes a coloured placeholder
// so the app still builds and runs.

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
  },
  "circuit-board": {
    label: "CIRCUIT BOARD",
    color: "#34d399",
    targetSize: 2.5,
    cell: [2.5, -2.0],
  },
  "ddr5-ram": {
    label: "RAM DDR5",
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
