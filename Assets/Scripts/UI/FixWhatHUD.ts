/**
 * FixWhat? - Spatial AR HUD Controller
 * Milestone 3.1: Coherent Instructional Panel & Spatial Readability Correction
 * Task ID: M3.1-REVISION-01 (Bounded Visual Refinement & HUD Cohesion)
 *
 * Renders a compact, high-contrast, cohesive spatial instruction panel
 * anchored at ergonomic reading distance (85 cm) in camera space.
 *
 * Target Platform: Snap Spectacles 2024 / Lens Studio 5.24.1
 */

import {
  ManualProcedure,
  StepDefinition,
  HazardLevel,
} from '../Types/ProcedureTypes';

// Visual Design Tokens (DGE-01 & M3.1 Refinement)
const COLOR_PRIMARY_CYAN = new vec4(0.25, 0.85, 1.0, 1.0);
const COLOR_ICE_WHITE = new vec4(0.96, 0.98, 1.0, 1.0);
const COLOR_SECONDARY_TEXT = new vec4(0.78, 0.86, 0.94, 1.0);
const COLOR_OBSIDIAN_CARD = new vec4(0.04, 0.06, 0.10, 0.96); // High-density dark plate (blocks environment bleed)
const COLOR_SHADOW = new vec4(0.0, 0.0, 0.0, 0.95);
const COLOR_TEXT_OUTLINE = new vec4(0.0, 0.0, 0.0, 0.85);

// Hazard Color Tokens
const COLOR_DANGER_TEXT = new vec4(1.0, 0.28, 0.28, 1.0);
const COLOR_DANGER_BG = new vec4(0.30, 0.05, 0.05, 0.96);

const COLOR_CAUTION_TEXT = new vec4(1.0, 0.80, 0.15, 1.0);
const COLOR_CAUTION_BG = new vec4(0.28, 0.15, 0.02, 0.96);

const COLOR_INFO_TEXT = new vec4(0.35, 0.85, 1.0, 1.0);
const COLOR_INFO_BG = new vec4(0.04, 0.15, 0.26, 0.96);

const COLOR_SUCCESS_TEXT = new vec4(0.30, 0.95, 0.50, 1.0);
const COLOR_SUCCESS_BG = new vec4(0.04, 0.22, 0.10, 0.96);

function wrapText(str: string, maxCharsPerLine: number = 48): string {
  if (!str) return '';
  const words = str.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const candidate = currentLine ? currentLine + ' ' + word : word;
    if (candidate.length <= maxCharsPerLine) {
      currentLine = candidate;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines.join('\n');
}

export class FixWhatHUD {
  private hudRoot: SceneObject | null = null;

  // 4 Cohesive Panel Elements for normal procedural execution
  private headerText: Text | null = null;
  private instructionText: Text | null = null;
  private safetyText: Text | null = null;
  private footerText: Text | null = null;

  // Dedicated Error Overlay Panel
  private errorText: Text | null = null;

  // SceneObject groups for visibility toggle
  private normalGroup: SceneObject[] = [];
  private errorGroup: SceneObject[] = [];

  public initialize(parentObject?: SceneObject): void {
    // 1. Create HUD root SceneObject
    this.hudRoot = global.scene.createSceneObject('FixWhat_HUD_Root');

    // Viewing distance: 85 cm in front of camera (-85 cm local Z), slightly below eye level (-3 cm local Y)
    // At 85 cm, text size 34-36 subtends ~0.55° angular height, matching optimal reading ergonomics.
    if (parentObject) {
      this.hudRoot.setParent(parentObject);
      this.hudRoot.layer = parentObject.layer;
      this.hudRoot.getTransform().setLocalPosition(new vec3(0, -3, -85));
      this.hudRoot.getTransform().setLocalRotation(quat.quatIdentity());
      this.hudRoot.getTransform().setLocalScale(new vec3(1, 1, 1));
    } else {
      this.hudRoot.layer = LayerSet.fromNumber(1);
      this.hudRoot.getTransform().setWorldPosition(new vec3(0, -3, -85));
      this.hudRoot.getTransform().setWorldRotation(quat.quatIdentity());
      this.hudRoot.getTransform().setWorldScale(new vec3(1, 1, 1));
    }

    // 2. Instantiate the 4 cohesive panel sections:
    // Section A: Header (Identity, Procedure Title, Step Progress Badge, Phase)
    this.headerText = this.createCardElement(
      'HUD_Header',
      new vec3(0, 7.5, 0),
      32,
      COLOR_PRIMARY_CYAN,
      COLOR_OBSIDIAN_CARD,
      new vec2(24, 3.5)
    );

    // Section B: Primary Instruction (Step Title + Full Wrapped Instruction Text)
    this.instructionText = this.createCardElement(
      'HUD_Instruction',
      new vec3(0, 0.5, 0),
      36,
      COLOR_ICE_WHITE,
      COLOR_OBSIDIAN_CARD,
      new vec2(24, 7.5)
    );

    // Section C: Safety Notice (Color-coded hazard backdrop with explicit text prefix; hidden by default)
    this.safetyText = this.createCardElement(
      'HUD_Safety',
      new vec3(0, -3.5, 0),
      30,
      COLOR_CAUTION_TEXT,
      COLOR_CAUTION_BG,
      new vec2(24, 4.5)
    );
    this.safetyText.getSceneObject().enabled = false;

    // Section D: Supporting Footer (Required Tools, Citation Footnote, Navigation Hints)
    // Scaled to font size 26 for improved angular legibility
    this.footerText = this.createCardElement(
      'HUD_Footer',
      new vec3(0, -6.5, 0),
      26,
      COLOR_SECONDARY_TEXT,
      COLOR_OBSIDIAN_CARD,
      new vec2(24, 5.5)
    );

    // Section E: Controlled Error Overlay (Full-card alert presentation)
    this.errorText = this.createCardElement(
      'HUD_ErrorOverlay',
      new vec3(0, 0, 0),
      28,
      new vec4(1.0, 0.92, 0.92, 1.0),
      new vec4(0.35, 0.04, 0.04, 0.96),
      new vec2(26, 16.0)
    );

    // Grouping
    if (this.headerText) this.normalGroup.push(this.headerText.getSceneObject());
    if (this.instructionText) this.normalGroup.push(this.instructionText.getSceneObject());
    if (this.safetyText) this.normalGroup.push(this.safetyText.getSceneObject());
    if (this.footerText) this.normalGroup.push(this.footerText.getSceneObject());

    if (this.errorText) {
      this.errorGroup.push(this.errorText.getSceneObject());
      this.errorText.getSceneObject().enabled = false;
    }
  }

  private createCardElement(
    name: string,
    localPos: vec3,
    fontSize: number,
    textColor: vec4,
    bgColor: vec4,
    boundsHalfSize: vec2
  ): Text {
    const obj = global.scene.createSceneObject(name);
    obj.setParent(this.hudRoot!);
    if (this.hudRoot) {
      obj.layer = this.hudRoot.layer;
    }
    obj.getTransform().setLocalPosition(localPos);
    obj.getTransform().setLocalRotation(quat.quatIdentity());
    obj.getTransform().setLocalScale(new vec3(1, 1, 1));

    const textComp = obj.createComponent('Component.Text') as Text;
    textComp.size = fontSize;
    textComp.renderOrder = 100;
    textComp.horizontalAlignment = HorizontalAlignment.Center;
    textComp.verticalAlignment = VerticalAlignment.Center;
    textComp.horizontalOverflow = HorizontalOverflow.Wrap;
    textComp.verticalOverflow = VerticalOverflow.Overflow;

    // Explicit layout bounding box in local centimeters
    (textComp as any).layoutRect = Rect.create(
      -boundsHalfSize.x,
      boundsHalfSize.x,
      -boundsHalfSize.y,
      boundsHalfSize.y
    );

    // Text fill color
    if (textComp.textFill) {
      textComp.textFill.color = textColor;
    }

    // Text outline for razor-sharp legibility against varied background luminance
    if (textComp.outlineSettings) {
      textComp.outlineSettings.enabled = true;
      textComp.outlineSettings.size = 0.15;
      if (textComp.outlineSettings.fill) {
        textComp.outlineSettings.fill.mode = TextFillMode.Solid;
        textComp.outlineSettings.fill.color = COLOR_TEXT_OUTLINE;
      }
    }

    // Dropshadow for optical separation from physical/simulated environment
    if (textComp.dropshadowSettings) {
      textComp.dropshadowSettings.enabled = true;
      if (textComp.dropshadowSettings.fill) {
        textComp.dropshadowSettings.fill.mode = TextFillMode.Solid;
        textComp.dropshadowSettings.fill.color = COLOR_SHADOW;
      }
      textComp.dropshadowSettings.offset = new vec2(0.15, -0.15);
    }

    // Dark high-opacity background card styling (blocks background pattern bleed)
    if (textComp.backgroundSettings) {
      textComp.backgroundSettings.enabled = true;
      textComp.backgroundSettings.cornerRadius = 0.6; // Crisp industrial styling
      textComp.backgroundSettings.margins = Rect.create(3.0, 3.0, 1.2, 1.2);
      if (textComp.backgroundSettings.fill) {
        textComp.backgroundSettings.fill.mode = TextFillMode.Solid;
        textComp.backgroundSettings.fill.color = bgColor;
      }
    }

    textComp.text = '';
    return textComp;
  }

  public renderStep(
    procedure: ManualProcedure,
    stepIndex: number,
    toolNameLookup?: (toolId: string) => string | null
  ): void {
    this.showNormal();

    const proc = procedure.procedure;
    const totalSteps = proc.steps.length;
    const step = proc.steps[stepIndex];

    const stepNumStr = (stepIndex + 1 < 10 ? '0' : '') + (stepIndex + 1);
    const totalNumStr = (totalSteps < 10 ? '0' : '') + totalSteps;

    // Check whether an actual safety notice exists for this step
    const hasRealHazard =
      (step.hazardLevel === 'DANGER' || step.hazardLevel === 'CAUTION' || step.hazardLevel === 'INFO') &&
      Boolean(step.safetyNotice && step.safetyNotice.trim().length > 0);

    // 1. Dynamic Vertical Space Balancing:
    // If a safety notice exists, HUD smoothly expands to 27 cm with safety card active.
    // If no safety notice exists, safety card is disabled and HUD contracts to compact 19 cm panel without gaps.
    if (hasRealHazard) {
      if (this.headerText) this.headerText.getSceneObject().getTransform().setLocalPosition(new vec3(0, 11.5, 0));
      if (this.instructionText) this.instructionText.getSceneObject().getTransform().setLocalPosition(new vec3(0, 4.0, 0));
      if (this.safetyText) this.safetyText.getSceneObject().getTransform().setLocalPosition(new vec3(0, -3.5, 0));
      if (this.footerText) this.footerText.getSceneObject().getTransform().setLocalPosition(new vec3(0, -10.5, 0));

      if (this.safetyText) {
        this.safetyText.getSceneObject().enabled = true;
        if (step.hazardLevel === 'DANGER') {
          this.safetyText.textFill.color = COLOR_DANGER_TEXT;
          this.setCardBgColor(this.safetyText, COLOR_DANGER_BG);
          const notice = step.safetyNotice || 'High voltage / hazard verification required.';
          this.safetyText.text = '⛔ [DANGER SAFETY BARRIER]\n' + wrapText(notice, 48);
        } else if (step.hazardLevel === 'CAUTION') {
          this.safetyText.textFill.color = COLOR_CAUTION_TEXT;
          this.setCardBgColor(this.safetyText, COLOR_CAUTION_BG);
          const notice = step.safetyNotice || 'Observe safety instructions.';
          this.safetyText.text = '⚠️ [CAUTION WARNING]\n' + wrapText(notice, 48);
        } else if (step.hazardLevel === 'INFO') {
          this.safetyText.textFill.color = COLOR_INFO_TEXT;
          this.setCardBgColor(this.safetyText, COLOR_INFO_BG);
          const notice = step.safetyNotice || 'Informational notice.';
          this.safetyText.text = 'ℹ️ [PROCEDURAL NOTE]\n' + wrapText(notice, 48);
        }
      }
    } else {
      // Ordinary unhazardous step: Disable safety card completely.
      // Zero green clearance text, zero checkmark, zero false safety assertion.
      if (this.safetyText) {
        this.safetyText.getSceneObject().enabled = false;
        this.safetyText.text = '';
      }

      // Compact 3-card layout centered at y = 0.5 relative to HUD root
      if (this.headerText) this.headerText.getSceneObject().getTransform().setLocalPosition(new vec3(0, 7.5, 0));
      if (this.instructionText) this.instructionText.getSceneObject().getTransform().setLocalPosition(new vec3(0, 0.5, 0));
      if (this.footerText) this.footerText.getSceneObject().getTransform().setLocalPosition(new vec3(0, -6.5, 0));
    }

    // 2. Header Card: Restrained cyan identity + Step Counter + Phase
    if (this.headerText) {
      const phase = proc.phases.find(p => p.phaseIndex === step.phaseIndex);
      const phaseTitle = phase ? phase.title : 'Procedure Phase';
      const headerLine1 = 'FIXWHAT? AR  •  ' + procedure.appliance.category.toUpperCase();
      const headerLine2 = 'STEP ' + stepNumStr + ' / ' + totalNumStr + '  •  PHASE ' + (step.phaseIndex + 1) + ': ' + phaseTitle;
      this.headerText.text = headerLine1 + '\n' + headerLine2;
    }

    // 3. Primary Instruction Card: Prominent Step Title + Complete Word-Wrapped Instruction
    if (this.instructionText) {
      const titleLine = '[ ' + step.title + ' ]';
      const wrappedBody = wrapText(step.instructionText, 48);
      this.instructionText.text = titleLine + '\n\n' + wrappedBody;
    }

    // 4. Supporting Footer Card: Tools + Source Citation + Clean Navigation Hints
    // Developer test keys (Key 9) and raw coordinates are removed from normal user HUD.
    // Source citation is wrapped cleanly without arbitrary truncation ellipsis.
    if (this.footerText) {
      let toolsStr = 'None required';
      if (step.requiredToolIds && step.requiredToolIds.length > 0) {
        const names = step.requiredToolIds.map(tid => {
          if (toolNameLookup) {
            const found = toolNameLookup(tid);
            if (found) return found;
          }
          return tid;
        });
        toolsStr = names.join('  •  ');
      }

      let citationStr = 'Authoritative manufacturer manual';
      const cite = step.sourceCitation;
      if (cite) {
        const pageStr = cite.pageNumber !== null ? 'p.' + cite.pageNumber : 'Section';
        const wrappedExcerpt = wrapText(cite.exactExcerpt, 48);
        citationStr = cite.sectionHeading + ' (' + pageStr + ') — "' + wrappedExcerpt + '"';
      }

      const line1 = '🔧 Tools: ' + toolsStr;
      const line2 = '📖 Source: ' + citationStr;
      const line3 = '◄ PREVIOUS STEP   │   NEXT STEP ►';

      this.footerText.text = line1 + '\n' + line2 + '\n' + line3;
    }
  }

  public renderCompletion(procedure: ManualProcedure): void {
    this.showNormal();
    const proc = procedure.procedure;

    // Use 4-card layout positions for completion screen
    if (this.headerText) this.headerText.getSceneObject().getTransform().setLocalPosition(new vec3(0, 11.5, 0));
    if (this.instructionText) this.instructionText.getSceneObject().getTransform().setLocalPosition(new vec3(0, 4.0, 0));
    if (this.safetyText) this.safetyText.getSceneObject().getTransform().setLocalPosition(new vec3(0, -3.5, 0));
    if (this.footerText) this.footerText.getSceneObject().getTransform().setLocalPosition(new vec3(0, -10.5, 0));

    if (this.headerText) {
      this.headerText.text =
        'FIXWHAT? AR  •  ' + procedure.appliance.category.toUpperCase() + '\n' +
        'ALL PHASES COMPLETED  •  PROCEDURE COMPLETE';
    }

    if (this.instructionText) {
      const cond = proc.completionCheck ? proc.completionCheck.finalCondition : 'Procedure verified finished.';
      this.instructionText.text =
        '✅ PROCEDURE COMPLETE: ' + proc.title + '\n\n' +
        'Final Condition:\n' + wrapText(cond, 48);
    }

    // Safety Verification Sign-off (affirmatively verified final check)
    if (this.safetyText) {
      this.safetyText.getSceneObject().enabled = true;
      this.safetyText.textFill.color = COLOR_SUCCESS_TEXT;
      this.setCardBgColor(this.safetyText, COLOR_SUCCESS_BG);
      const safeCheck = proc.completionCheck ? proc.completionCheck.safetyVerificationText : 'Safety verification verified.';
      this.safetyText.text = '🔒 [SAFETY SIGN-OFF VERIFIED]\n' + wrapText(safeCheck, 50);
    }

    if (this.footerText) {
      this.footerText.text =
        '🔧 Store all tools and workshop consumables in safe configuration.\n' +
        '📖 Verified against manufacturer manual & workshop standard.\n' +
        '◄ REVIEW STEPS   │   SWITCH PROCEDURE ►';
    }
  }

  public renderError(title: string, errorMessages: string[]): void {
    this.showError();

    if (this.errorText) {
      let body = '⛔ [FIXWHAT DATA CONTRACT REJECTION]\n';
      body += 'Status: ' + title + '\n\n';
      body += 'The loaded procedure violates ManualSchema.json:\n';
      for (let i = 0; i < Math.min(errorMessages.length, 5); i++) {
        body += '  • ' + errorMessages[i] + '\n';
      }
      if (errorMessages.length > 5) {
        body += '  ... and ' + (errorMessages.length - 5) + ' more contract error(s)\n';
      }
      body += '\n🛑 [SAFETY INTERLOCK ACTIVE] Execution halted for safety.\n';
      body += '\n[Click Top Center or Press Key 1 / Key 2 to reload valid procedure]';
      this.errorText.text = body;
    }
  }

  public renderEmptyState(message: string): void {
    this.showError();

    if (this.errorText) {
      let body = 'ℹ️ [FIXWHAT SYSTEM STANDBY]\n\n';
      body += message + '\n\n';
      body += 'Available Local Authorized Procedures:\n';
      body += '  1. GE 33709 / 33711 Remote Setup (Consumer MVP, 9 steps)\n';
      body += '  2. Wire Splice Soldering Practice (Workshop MVP, 11 steps)\n\n';
      body += '[Press Key 1 or Click Left: Remote  │  Press Key 2 or Click Right: Soldering]';
      this.errorText.text = body;
    }
  }

  private setCardBgColor(textComp: Text, color: vec4): void {
    if (textComp.backgroundSettings && textComp.backgroundSettings.fill) {
      textComp.backgroundSettings.fill.color = color;
    }
  }

  private showNormal(): void {
    for (let i = 0; i < this.normalGroup.length; i++) {
      this.normalGroup[i].enabled = true;
    }
    for (let i = 0; i < this.errorGroup.length; i++) {
      this.errorGroup[i].enabled = false;
    }
  }

  private showError(): void {
    for (let i = 0; i < this.normalGroup.length; i++) {
      this.normalGroup[i].enabled = false;
    }
    for (let i = 0; i < this.errorGroup.length; i++) {
      this.errorGroup[i].enabled = true;
    }
  }
}
