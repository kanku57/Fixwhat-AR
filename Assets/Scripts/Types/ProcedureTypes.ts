/**
 * FixWhat? - Procedure Contract Type Definitions
 * Directly corresponds to data/schemas/ManualSchema.json
 * Target Platform: Snap Spectacles 2024 / Lens Studio 5.24.1
 */

export type HazardLevel = 'NONE' | 'INFO' | 'CAUTION' | 'DANGER';

export type ExplanationOrigin =
  | 'MANUFACTURER_VERBATIM'
  | 'DOMAIN_EXPERT_INFERRED';

export type VerificationStatus =
  | 'VERIFIED_MANUFACTURER_SOURCE'
  | 'UNVERIFIED_THIRD_PARTY'
  | 'SYNTHETIC_PROPOSAL';

export interface ToolDefinition {
  toolId: string;
  name: string;
  specification: string;
  isConsumable: boolean;
}

export interface PhaseDefinition {
  phaseIndex: number;
  title: string;
  description: string;
}

export interface SourceCitation {
  sectionHeading: string;
  pageNumber: number | null;
  diagramReference: string | null;
  exactExcerpt: string;
}

export interface TrainingExplanation {
  whyItMatters: string;
  componentInvolved: string;
  explanationOrigin: ExplanationOrigin;
  knowledgeCheckQuestion?: string | null;
}

export interface ModelSpecificBranch {
  appliesToModels: string[];
  branchInstruction: string;
  sourceCitation: SourceCitation;
}

export interface StepDefinition {
  stepId: string;
  stepIndex: number;
  phaseIndex: number;
  title: string;
  instructionText: string;
  hazardLevel: HazardLevel;
  safetyNotice: string | null;
  isBlockingSafetyBarrier: boolean;
  requiredToolIds?: string[];
  modelSpecificBranches?: ModelSpecificBranch[];
  sourceCitation: SourceCitation;
  trainingExplanation?: TrainingExplanation;
}

export interface ApplianceInfo {
  manufacturer: string;
  modelFamily: string;
  compatibleModels: string[];
  category: string;
}

export interface SourceDocument {
  title: string;
  publisher: string;
  documentCode: string;
  url: string;
  accessDate: string;
  verificationStatus: VerificationStatus;
}

export interface CompletionCheck {
  finalCondition: string;
  safetyVerificationText: string;
}

export interface ProcedureData {
  procedureId: string;
  title: string;
  taskType: string;
  estimatedTimeMinutes: number;
  prerequisites: string[];
  requiredTools: ToolDefinition[];
  phases: PhaseDefinition[];
  steps: StepDefinition[];
  completionCheck: CompletionCheck;
}

export interface ManualProcedure {
  $schema?: string;
  schemaVersion: string;
  manualId: string;
  appliance: ApplianceInfo;
  sourceDocument: SourceDocument;
  procedure: ProcedureData;
}

export interface ProcedureValidationResult {
  valid: boolean;
  procedureId: string;
  title: string;
  stepCount: number;
  errors: string[];
  warnings: string[];
}

/**
 * Authoritative Procedure Identifier Contract Constants
 * Corresponds to data/schemas/ManualSchema.json and ProcedureFixtures.ts
 */
export const WORKSHOP_MANUAL_ID = 'manual_wire_soldering_splice_training';
export const WORKSHOP_PROCEDURE_ID = 'proc_wire_soldering_western_union_splice';

export const REMOTE_MANUAL_ID = 'manual_ge_33709_remote_setup';
export const REMOTE_PROCEDURE_ID = 'proc_ge_33709_battery_and_tv_setup';

/**
 * Authoritative typed classifier for the Workshop Wire Splicing procedure.
 * Uses exact identifier matching against the data contract.
 */
export function isWorkshopProcedure(proc: ManualProcedure | null | undefined): boolean {
  if (!proc) return false;
  return proc.manualId === WORKSHOP_MANUAL_ID ||
         (proc.procedure !== undefined && proc.procedure.procedureId === WORKSHOP_PROCEDURE_ID);
}

/**
 * Authoritative typed classifier for the Consumer Remote procedure.
 * Uses exact identifier matching against the data contract.
 */
export function isRemoteProcedure(proc: ManualProcedure | null | undefined): boolean {
  if (!proc) return false;
  return proc.manualId === REMOTE_MANUAL_ID ||
         (proc.procedure !== undefined && proc.procedure.procedureId === REMOTE_PROCEDURE_ID);
}

