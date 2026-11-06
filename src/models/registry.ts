// Model registry — paths to the three Modul 8 GLB files in public/models/.
// Model IDs and learning-topic IDs are intentionally separate.
// The mapping below is an explicit configuration, not derived from geometry.

import { MODULE_TOPICS, type LessonTopic } from "../content/lessons";

export interface ModelEntry {
  id: string;
  label: string;
  url: string;
}

const BASE = import.meta.env.BASE_URL;

export const MODELS: ModelEntry[] = [
  { id: "cpu", label: "CPU", url: `${BASE}models/cpu.glb` },
  { id: "circuit-board", label: "Circuit Board", url: `${BASE}models/circuit-board.glb` },
  { id: "ddr5-ram", label: "RAM DDR5", url: `${BASE}models/ddr5-ram-stick.glb` },
];

// Explicit model → topic mapping (model id → topic ids).
// Arrangement order: CPU → Circuit Board → RAM.
// Topics are grouped so that each model carries the sections most relevant to it.
export const MODEL_TOPIC_MAP: Record<string, string[]> = {
  cpu: ["instruction-characteristics", "operation-types"],
  "circuit-board": ["operand-types", "instruction-format"],
  "ddr5-ram": ["assembly-language", "addressing"],
};

export function getTopicsForModel(modelId: string): LessonTopic[] {
  const topicIds = MODEL_TOPIC_MAP[modelId] ?? [];
  return MODULE_TOPICS.filter((t) => topicIds.includes(t.id));
}
