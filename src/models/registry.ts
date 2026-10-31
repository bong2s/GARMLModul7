// Model registry — paths to the three existing GLB files in public/models/.
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
  { id: "cpu", label: "CPU", url: `${BASE}models/CPU.glb` },
  { id: "computer-chip", label: "Computer Chip", url: `${BASE}models/Computer_Chip.glb` },
  { id: "calculator", label: "Calculator", url: `${BASE}models/calculator.glb` },
];

// Explicit model → topic mapping (model id → topic ids).
// Configured by the course author; not inferred from 3D geometry.
export const MODEL_TOPIC_MAP: Record<string, string[]> = {
  cpu: ["alu", "integer-representation"],
  calculator: ["integer-arithmetic"],
  "computer-chip": ["floating-point-representation", "floating-point-arithmetic"],
};

export function getTopicsForModel(modelId: string): LessonTopic[] {
  const topicIds = MODEL_TOPIC_MAP[modelId] ?? [];
  return MODULE_TOPICS.filter((t) => topicIds.includes(t.id));
}
