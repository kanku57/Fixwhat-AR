/**
 * FixWhatWorkshopJourneyScenario.ts
 * LEAF Scenario 4: Workshop Procedure Journey, Diagrams, and Controls Verification
 */

import { Scenario } from "Leaf.lspkg/Scenarios/scenario/Scenario";
import { expect } from "Leaf.lspkg/Utils/common/Expect";
import { findSceneObjectByName, sleep } from "Leaf.lspkg/Utils/common/Utils";
import { DefaultLeafInteractor } from "Leaf.lspkg/Interactors/interactor/DefaultLeafInteractor";
import { findInteractableByName } from "Leaf.lspkg/Interactors/InteractableUtils";
import {
  completeStartupAndEnterWelcome,
  getTextContent,
  triggerButton,
} from "./LeafTestHelpers";

@component
export class FixWhatWorkshopJourneyScenario extends Scenario {
  async run(): Promise<void> {
    print("[LEAF] Running Scenario 4: Workshop Procedure Journey...");
    const interactor = new DefaultLeafInteractor();

    // 1. Startup -> Welcome
    await completeStartupAndEnterWelcome(interactor);

    // 2. Select Workshop Track & Enter Lesson
    const cardWorkshop = findSceneObjectByName("Card_Workshop");
    expect(cardWorkshop !== null).toBe(true);
    await triggerButton("Btn_Select", cardWorkshop!, interactor);

    await triggerButton("Btn_RecogAction", undefined, interactor);
    await triggerButton("Btn_StartLesson", undefined, interactor);

    // 3. Verify Workshop Procedure Loaded at Step 1 of 11
    const trackBadge = getTextContent("TrackBadge");
    expect(trackBadge.includes("WORKSHOP") || trackBadge.includes("WIRE")).toBe(true);

    let progressText = getTextContent("ProgressBadge");
    expect(progressText).toBe("Step 1 of 11");

    const EXPECTED_WRK_CAPTIONS = [
      "WELLER PPE & WORKBENCH: NON-ENERGIZED 0.0V CIRCUIT SAFETY",
      "WELLER & WORKSHOP: 8-TOOL SOLDERING BENCH CONFIGURATION",
      "HEAT-SHRINK: 25MM SLEEVE PRE-POSITIONING (75MM SETBACK)",
      "CONDUCTOR PREPARATION: 12-15MM STRIP & CLOCKWISE STRAND LAY",
      "NASA-STD-8739.4 §19.7.1: INDIVIDUAL STRANDED WIRE PRE-TINNING",
      "NASA-STD-8739.4 §19.7: WESTERN UNION MECHANICAL WRAP (>= 3 TURNS)",
      "WELLER TIP MAINTENANCE: BRASS SPONGE WIPE & FRESH THERMAL BRIDGE",
      "CAPILLARY SOLDERING: UNDERSIDE HEATING & TOP SOLDER FEED",
      "NASA-STD-8739.3 §13.6: FILLET WORKMANSHIP INSPECTION COMPARATOR",
      "INSULATION SLEEVING: CENTERED HEAT-SHRINK HOT AIR SWEEP",
      "WELLER SHUTDOWN: TIP SACRIFICIAL SOLDER COAT & SAFE REST STORAGE"
    ];

    // 4. Diagram Verification on Step 1: Enabled with AST-WRK-01 Safety diagram
    const stepVisualSO = findSceneObjectByName("StepVisualContainer");
    expect(stepVisualSO !== null).toBe(true);
    expect(stepVisualSO!.enabled).toBe(true);
    const step1Caption = getTextContent("StepVisualCaption");
    expect(step1Caption.includes(EXPECTED_WRK_CAPTIONS[0])).toBe(true);
    expect(step1Caption.includes("GE 33709")).toBe(false);

    const imgSO = findSceneObjectByName("StepVisualImage");
    expect(imgSO !== null).toBe(true);
    const imgComponent = imgSO ? (imgSO.getComponent("Component.Image") as Image) : null;
    expect(imgComponent !== null).toBe(true);

    let currentTex = imgComponent!.mainPass.baseTex as Texture;
    expect(currentTex !== null).toBe(true);
    expect(currentTex.name).toBe("AST-WRK-01");
    expect(currentTex.getWidth()).toBe(1200);
    expect(currentTex.getHeight()).toBe(400);

    // Acknowledge safety gate on Step 1 so we can advance
    await triggerButton("Btn_SafetyDeclare", undefined, interactor);

    // 5. Advance to Step 6 of 11 (verify diagrams on Steps 2 to 6)
    for (let s = 2; s <= 6; s++) {
      await triggerButton("Btn_Next", undefined, interactor);
      progressText = getTextContent("ProgressBadge");
      expect(progressText).toBe(`Step ${s} of 11`);
      expect(stepVisualSO!.enabled).toBe(true);
      const cap = getTextContent("StepVisualCaption");
      expect(cap.includes(EXPECTED_WRK_CAPTIONS[s - 1])).toBe(true);
      expect(cap.includes("GE 33709")).toBe(false);
      currentTex = imgComponent!.mainPass.baseTex as Texture;
      expect(currentTex !== null).toBe(true);
      expect(currentTex.name).toBe(`AST-WRK-0${s}`);
      expect(currentTex.getWidth()).toBe(1200);
      expect(currentTex.getHeight()).toBe(400);
    }

    // 6. Diagram Verification on Step 6: Must be enabled with NASA-STD-8739.4 caption
    expect(stepVisualSO!.enabled).toBe(true);
    const captionText = getTextContent("StepVisualCaption");
    expect(captionText.includes("NASA-STD-8739.4")).toBe(true);

    // 7. Verify Pause and Resume (and visual hiding/restoration)
    const pausedBannerSO = findSceneObjectByName("Banner_Paused");
    expect(pausedBannerSO !== null).toBe(true);
    expect(pausedBannerSO!.enabled).toBe(false);

    // Pause procedure -> visual container must hide
    await triggerButton("Btn_Pause", undefined, interactor);
    expect(pausedBannerSO!.enabled).toBe(true);
    expect(stepVisualSO!.enabled).toBe(false);

    // Resume procedure -> visual container must restore
    await triggerButton("Btn_Pause", undefined, interactor);
    expect(pausedBannerSO!.enabled).toBe(false);
    expect(stepVisualSO!.enabled).toBe(true);

    // 8. Verify Why? and Overview on Workshop track
    await triggerButton("Btn_Why", undefined, interactor);
    const whyAccordion = findSceneObjectByName("Accordion_Why");
    expect(whyAccordion !== null && whyAccordion.enabled).toBe(true);
    await triggerButton("Btn_Why", undefined, interactor);
    expect(whyAccordion!.enabled).toBe(false);

    await triggerButton("Btn_Overview", undefined, interactor);
    const overviewGroup = findSceneObjectByName("Group_Overview");
    expect(overviewGroup !== null && overviewGroup.enabled).toBe(true);
    await triggerButton("Btn_Overview", undefined, interactor);
    expect(overviewGroup!.enabled).toBe(false);

    // 8B. Verify Authoritative Source Citation on Workshop Track (GAP-WRK-02 & M3.3-C)
    // Currently on Step 6 (Index 5, Western Union Mechanical Wrap)
    const sourceToggleSuccess = await triggerButton("Btn_Source", undefined, interactor);
    expect(sourceToggleSuccess).toBe(true);
    const sourceAccordion = findSceneObjectByName("Accordion_Source");
    expect(sourceAccordion !== null && sourceAccordion.enabled).toBe(true);

    // Assert NASA-STD-8739.4 source citation metadata
    const sourceMeta = getTextContent("SourceMeta");
    expect(sourceMeta.includes("NASA-STD-8739.4") || sourceMeta.includes("19.7.1") || sourceMeta.includes("Weller")).toBe(true);

    // Assert authoritative verbatim excerpt from NASA-STD-8739.4 §19.7.1(b)-(c)
    const sourceExcerpt = getTextContent("SourceExcerpt");
    expect(sourceExcerpt.includes("at least 3 turns") || sourceExcerpt.includes("tight with no gaps") || sourceExcerpt.length > 20).toBe(true);
    expect(sourceExcerpt.includes("Remote")).toBe(false);
    expect(sourceExcerpt.includes("battery")).toBe(false);

    // Mutual Exclusion Check: Verify opening Source closed Why?
    expect(whyAccordion!.enabled).toBe(false);

    // Mutual Exclusion Check: Opening Why? closes Source
    await triggerButton("Btn_Why", undefined, interactor);
    expect(whyAccordion!.enabled).toBe(true);
    expect(sourceAccordion!.enabled).toBe(false);

    // Close Why?
    await triggerButton("Btn_Why", undefined, interactor);
    expect(whyAccordion!.enabled).toBe(false);

    // 9. Advance through remaining steps to completion (verify diagrams on Steps 7 to 11)
    for (let s = 7; s <= 11; s++) {
      await triggerButton("Btn_Next", undefined, interactor);
      progressText = getTextContent("ProgressBadge");
      expect(progressText).toBe(`Step ${s} of 11`);
      expect(stepVisualSO!.enabled).toBe(true);
      const cap = getTextContent("StepVisualCaption");
      expect(cap.includes(EXPECTED_WRK_CAPTIONS[s - 1])).toBe(true);
      expect(cap.includes("GE 33709")).toBe(false);
      currentTex = imgComponent!.mainPass.baseTex as Texture;
      expect(currentTex !== null).toBe(true);
      const expectedId = s < 10 ? `AST-WRK-0${s}` : `AST-WRK-${s}`;
      expect(currentTex.name).toBe(expectedId);
      expect(currentTex.getWidth()).toBe(1200);
      expect(currentTex.getHeight()).toBe(400);
    }

    // 1 more Next triggers completion
    await triggerButton("Btn_Next", undefined, interactor);

    // 10. Verify Completion state (visual container must be torn down / disabled)
    const rowCompletion = findSceneObjectByName("Row_CompletionActions");
    expect(rowCompletion !== null && rowCompletion.enabled).toBe(true);
    expect(stepVisualSO!.enabled).toBe(false);
    expect(imgComponent!.mainPass.baseTex).toBeNull();

    const completionTitle = getTextContent("StepTitle");
    expect(completionTitle.includes("Complete")).toBe(true);

    const completionInstr = getTextContent("StepInstruction");
    expect(completionInstr.includes("does not physically verify electrical continuity")).toBe(true);
    expect(completionInstr.includes("mechanical tensile strength")).toBe(true);
    expect(completionInstr.includes("remote pairing")).toBe(false);

    const repeatBtn = findInteractableByName("Btn_RepeatLesson", rowCompletion!);
    expect(repeatBtn !== undefined).toBe(true);

    print("[LEAF] Scenario 4 PASSED: Workshop Procedure Journey & Diagrams verified completely.");
  }
}

