// Dedicated interface definitions for all structured data objects.

export type MetricKind = "currency" | "percent" | "hours" | "count";

export interface AutomationTier {
  id: string;
  index: string; // e.g. "T1"
  name: string; // e.g. "Tier 1 Automation"
  classification: string; // one-line systemic definition
  premise: string; // positioning frame
  capabilities: string[]; // surfaced on the card face
  spec: string[]; // deeper technical specification, revealed on hover/focus
  outcome: string; // the operational result
  elite?: boolean;
}

export interface PerformanceMetric {
  label: string;
  from?: number; // baseline (optional)
  to: number; // resulting value
  kind: MetricKind;
  fillPct: number; // 0-100, drives the progress bar
}

export interface DeployedStackItem {
  tier: "Tier 2" | "Tier 3";
  system: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  sector: string;
  window: string; // measurement period
  verified: boolean; // true = real attributable client result; false = illustrative model
  summary: string;
  metrics: PerformanceMetric[];
  stack: DeployedStackItem[];
}
