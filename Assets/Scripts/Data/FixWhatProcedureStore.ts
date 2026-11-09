/**
 * FixWhat? - Procedure Store & Contract Validation Service
 * Manages local procedures, validation, lookup, and adversarial testing.
 * Target Platform: Snap Spectacles 2024 / Lens Studio 5.24.1
 */

import {
  ManualProcedure,
  StepDefinition,
  ToolDefinition,
  ProcedureValidationResult,
  HazardLevel,
} from '../Types/ProcedureTypes';
import {
  GE_33709_REMOTE_PROCEDURE,
  WIRE_SOLDERING_SPLICE_PROCEDURE,
  CORRUPT_TEST_PROCEDURE,
} from './ProcedureFixtures';

export interface ProcedureMetadata {
  id: string;
  title: string;
  taskType: string;
  stepCount: number;
  category: string;
  estimatedTimeMinutes: number;
}

export class FixWhatProcedureStore {
  private validProcedures: Map<string, ManualProcedure> = new Map();
  private procedureOrder: string[] = [];

  constructor() {
    this.registerAuthorizedProcedures();
  }

  private registerAuthorizedProcedures(): void {
    // 1. Consumer MVP: GE 33709 / 33711 Remote Setup
    const geResult = this.validateProcedure(GE_33709_REMOTE_PROCEDURE);
    if (geResult.valid) {
      const id = GE_33709_REMOTE_PROCEDURE.procedure.procedureId;
      this.validProcedures.set(id, GE_33709_REMOTE_PROCEDURE);
      this.procedureOrder.push(id);
    } else {
      print('[FixWhatProcedureStore] ERROR: GE_33709_REMOTE_PROCEDURE failed validation: ' + geResult.errors.join('; '));
    }

    // 2. Workshop MVP: Wire Soldering Splice (Educational Practice)
    const spliceResult = this.validateProcedure(WIRE_SOLDERING_SPLICE_PROCEDURE);
    if (spliceResult.valid) {
      const id = WIRE_SOLDERING_SPLICE_PROCEDURE.procedure.procedureId;
      this.validProcedures.set(id, WIRE_SOLDERING_SPLICE_PROCEDURE);
      this.procedureOrder.push(id);
    } else {
      print('[FixWhatProcedureStore] ERROR: WIRE_SOLDERING_SPLICE_PROCEDURE failed validation: ' + spliceResult.errors.join('; '));
    }
  }

  /**
   * Deterministic local listing of available authorized consumer procedures.
   * Adversarial/corrupt fixtures are never exposed here.
   */
  public listProcedures(): ProcedureMetadata[] {
    return this.procedureOrder.map(id => {
      const p = this.validProcedures.get(id)!;
      return {
        id: p.procedure.procedureId,
        title: p.procedure.title,
        taskType: p.procedure.taskType,
        stepCount: p.procedure.steps.length,
        category: p.appliance.category,
        estimatedTimeMinutes: p.procedure.estimatedTimeMinutes,
      };
    });
  }

  public getProcedure(procedureId: string): ManualProcedure | null {
    return this.validProcedures.get(procedureId) || null;
  }

  public getProcedureByIndex(index: number): ManualProcedure | null {
    if (index >= 0 && index < this.procedureOrder.length) {
      const id = this.procedureOrder[index];
      return this.validProcedures.get(id) || null;
    }
    return null;
  }

  public getProcedureCount(): number {
    return this.procedureOrder.length;
  }

  public getStep(procedureId: string, stepIndex: number): StepDefinition | null {
    const proc = this.getProcedure(procedureId);
    if (!proc || !proc.procedure.steps) return null;
    if (stepIndex >= 0 && stepIndex < proc.procedure.steps.length) {
      return proc.procedure.steps[stepIndex];
    }
    return null;
  }

  public getTool(procedureId: string, toolId: string): ToolDefinition | null {
    const proc = this.getProcedure(procedureId);
    if (!proc || !proc.procedure.requiredTools) return null;
    const found = proc.procedure.requiredTools.find(t => t.toolId === toolId);
    return found || null;
  }

  /**
   * Controlled test path for invalid-data/error verification.
   * Does NOT register corrupt data into normal consumer listings.
   */
  public getAdversarialTestFixture(): any {
    return CORRUPT_TEST_PROCEDURE;
  }

  /**
   * Semantic and structural validation corresponding strictly to ManualSchema.json rules.
   */
  public validateProcedure(data: any): ProcedureValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!data || typeof data !== 'object') {
      return {
        valid: false,
        procedureId: 'unknown',
        title: 'unknown',
        stepCount: 0,
        errors: ['Data payload is null or not an object.'],
        warnings: [],
      };
    }

    // Schema version
    if (data.schemaVersion !== '1.0.0') {
      errors.push('Invalid schemaVersion: expected 1.0.0, got ' + data.schemaVersion);
    }

    // Top-level required keys
    if (!data.manualId || typeof data.manualId !== 'string') {
      errors.push('Missing or invalid root property: manualId');
    }
    if (!data.appliance || typeof data.appliance !== 'object') {
      errors.push('Missing or invalid root property: appliance');
    } else {
      const app = data.appliance;
      if (!app.manufacturer) errors.push('appliance.manufacturer is required');
      if (!app.modelFamily) errors.push('appliance.modelFamily is required');
      if (!app.category) errors.push('appliance.category is required');
      if (!Array.isArray(app.compatibleModels) || app.compatibleModels.length === 0) {
        errors.push('appliance.compatibleModels must be non-empty array');
      }
    }

    if (!data.sourceDocument || typeof data.sourceDocument !== 'object') {
      errors.push('Missing or invalid root property: sourceDocument');
    } else {
      if (!data.sourceDocument.title) errors.push('sourceDocument.title is required');
      if (!data.sourceDocument.documentCode) errors.push('sourceDocument.documentCode is required');
    }

    if (!data.procedure || typeof data.procedure !== 'object') {
      errors.push('Missing or invalid root property: procedure');
      return {
        valid: false,
        procedureId: data.manualId || 'unknown',
        title: 'unknown',
        stepCount: 0,
        errors,
        warnings,
      };
    }

    const proc = data.procedure;
    const procId = proc.procedureId || 'unknown';
    const procTitle = proc.title || 'unknown';

    if (!proc.procedureId || typeof proc.procedureId !== 'string') {
      errors.push('procedure.procedureId is required');
    }
    if (!proc.title || typeof proc.title !== 'string') {
      errors.push('procedure.title is required');
    }

    // Tools
    const registeredToolIds = new Set<string>();
    if (!Array.isArray(proc.requiredTools)) {
      errors.push('procedure.requiredTools must be an array');
    } else {
      for (let i = 0; i < proc.requiredTools.length; i++) {
        const tool = proc.requiredTools[i];
        if (!tool.toolId || typeof tool.toolId !== 'string') {
          errors.push('requiredTools[' + i + '] missing valid toolId');
        } else {
          if (registeredToolIds.has(tool.toolId)) {
            errors.push('Duplicate toolId in requiredTools: ' + tool.toolId);
          }
          registeredToolIds.add(tool.toolId);
        }
      }
    }

    // Phases
    if (!Array.isArray(proc.phases) || proc.phases.length === 0) {
      errors.push('procedure.phases must be a non-empty array');
    } else {
      for (let i = 0; i < proc.phases.length; i++) {
        const phase = proc.phases[i];
        if (phase.phaseIndex !== i) {
          errors.push('Non-sequential phaseIndex: expected ' + i + ', got ' + phase.phaseIndex);
        }
        if (!phase.title) errors.push('Phase ' + i + ' missing title');
        if (!phase.description) errors.push('Phase ' + i + ' missing description');
      }
    }

    // Steps
    const allowedHazardLevels: Set<string> = new Set(['NONE', 'INFO', 'CAUTION', 'DANGER']);
    if (!Array.isArray(proc.steps) || proc.steps.length === 0) {
      errors.push('procedure.steps must be a non-empty array');
    } else {
      for (let i = 0; i < proc.steps.length; i++) {
        const step = proc.steps[i];
        if (step.stepIndex !== i) {
          errors.push('Non-sequential stepIndex: expected ' + i + ', got ' + step.stepIndex);
        }
        if (typeof step.phaseIndex !== 'number' || step.phaseIndex < 0 || step.phaseIndex >= proc.phases.length) {
          errors.push('Step ' + i + ' (' + step.stepId + ') invalid phaseIndex ' + step.phaseIndex + ' (phases count: ' + proc.phases.length + ')');
        }
        if (!step.stepId) errors.push('Step ' + i + ' missing stepId');
        if (!step.title) errors.push('Step ' + i + ' missing title');
        if (!step.instructionText) errors.push('Step ' + i + ' missing instructionText');

        if (!allowedHazardLevels.has(step.hazardLevel)) {
          errors.push('Step ' + i + ' (' + step.stepId + ') invalid hazardLevel: ' + step.hazardLevel);
        }

        // Safety Barrier Consistency
        if (step.isBlockingSafetyBarrier) {
          if (step.hazardLevel === 'NONE') {
            errors.push('Step ' + i + ' (' + step.stepId + ') isBlockingSafetyBarrier is true but hazardLevel is NONE');
          }
          if (!step.safetyNotice || step.safetyNotice.trim() === '') {
            errors.push('Step ' + i + ' (' + step.stepId + ') isBlockingSafetyBarrier is true but safetyNotice is missing/empty');
          }
        }

        // Tool references
        if (Array.isArray(step.requiredToolIds)) {
          for (const tid of step.requiredToolIds) {
            if (!registeredToolIds.has(tid)) {
              errors.push('Step ' + i + ' (' + step.stepId + ') references unregistered toolId: ' + tid);
            }
          }
        }

        // Source citation
        if (!step.sourceCitation || typeof step.sourceCitation !== 'object') {
          errors.push('Step ' + i + ' (' + step.stepId + ') missing required sourceCitation');
        } else {
          if (!step.sourceCitation.sectionHeading) {
            errors.push('Step ' + i + ' sourceCitation missing sectionHeading');
          }
          if (!step.sourceCitation.exactExcerpt) {
            errors.push('Step ' + i + ' sourceCitation missing exactExcerpt');
          }
        }
      }
    }

    // Completion Check
    if (!proc.completionCheck || typeof proc.completionCheck !== 'object') {
      errors.push('procedure.completionCheck must be an object with finalCondition and safetyVerificationText');
    } else {
      if (!proc.completionCheck.finalCondition) {
        errors.push('procedure.completionCheck missing finalCondition');
      }
      if (!proc.completionCheck.safetyVerificationText) {
        errors.push('procedure.completionCheck missing safetyVerificationText');
      }
    }

    return {
      valid: errors.length === 0,
      procedureId: procId,
      title: procTitle,
      stepCount: Array.isArray(proc.steps) ? proc.steps.length : 0,
      errors,
      warnings,
    };
  }
}
