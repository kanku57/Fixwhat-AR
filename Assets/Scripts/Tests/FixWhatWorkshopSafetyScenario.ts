/**
 * FixWhatWorkshopSafetyScenario.ts
 * LEAF Scenario 3: Workshop Safety Gate & Genuine Interactor Verification
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
export class FixWhatWorkshopSafetyScenario extends Scenario {
  async run(): Promise<void> {
    print("[LEAF] Running Scenario 3: Workshop Safety Gate Verification...");
    const interactor = new DefaultLeafInteractor();

    // 1. Startup -> Welcome
    await completeStartupAndEnterWelcome(interactor);

    // 2. Select Workshop Track on Card_Workshop
    const cardWorkshop = findSceneObjectByName("Card_Workshop");
    expect(cardWorkshop !== null).toBe(true);
    const selectWorkshopSuccess = await triggerButton("Btn_Select", cardWorkshop!, interactor);
    expect(selectWorkshopSuccess).toBe(true);

    // 3. Verify Recognition View & Simulated Placement
    const viewRecog = findSceneObjectByName("View_Recognition");
    expect(viewRecog !== null && viewRecog.enabled).toBe(true);

    const recogHeader = getTextContent("RecogHeader");
    expect(recogHeader.includes("WORKBENCH")).toBe(true);

    const disclaimerText = getTextContent("RecogDisclaimer");
    expect(disclaimerText.toLowerCase().includes("simulated")).toBe(true);

    // Trigger simulated placement
    await triggerButton("Btn_RecogAction", undefined, interactor);

    // Enter guided lesson
    const enterLessonSuccess = await triggerButton("Btn_StartLesson", undefined, interactor);
    expect(enterLessonSuccess).toBe(true);

    // 4. Verify Workshop procedure loads at Step 1 of 11
    const mentorRoot = findSceneObjectByName("FixWhat_SpatialMentorPanel");
    expect(mentorRoot !== null && mentorRoot.enabled).toBe(true);

    const trackBadgeText = getTextContent("TrackBadge");
    expect(trackBadgeText.includes("WORKSHOP") || trackBadgeText.includes("WIRE")).toBe(true);

    let progressText = getTextContent("ProgressBadge");
    expect(progressText).toBe("Step 1 of 11");

    // 5. Verify Safety Barrier Box and Declaration Button are present and active
    const barrierBoxSO = findSceneObjectByName("SafetyBarrierBox");
    expect(barrierBoxSO !== null && barrierBoxSO.enabled).toBe(true);

    const barrierText = getTextContent("SafetyBarrierBox");
    expect(barrierText.includes("SAFETY CHECKPOINT") || barrierText.includes("EYE")).toBe(true);

    const safetyBtnSO = findSceneObjectByName("Btn_SafetyDeclare");
    expect(safetyBtnSO !== null && safetyBtnSO.enabled).toBe(true);

    // 6. Genuine Verification: Next does NOT advance before declaration
    print("[LEAF] Attempting to click Next while safety gate is unacknowledged...");
    const blockedNextSuccess = await triggerButton("Btn_Next", undefined, interactor);
    expect(blockedNextSuccess).toBe(true);

    // Progress MUST remain Step 1 of 11
    progressText = getTextContent("ProgressBadge");
    expect(progressText).toBe("Step 1 of 11");
    expect(safetyBtnSO.enabled).toBe(true);

    // 7. Genuine SIK Interaction: Learner Declares Safety via Btn_SafetyDeclare
    print("[LEAF] Triggering genuine SIK safety declaration interaction...");
    const declareSuccess = await triggerButton("Btn_SafetyDeclare", undefined, interactor);
    expect(declareSuccess).toBe(true);

    // 8. Verify Safety Barrier state updates:
    // Declaration button is consumed/hidden
    expect(safetyBtnSO.enabled).toBe(false);

    // Barrier container remains visible with persistent learner declaration notice
    expect(barrierBoxSO.enabled).toBe(true);
    const declaredText = getTextContent("SafetyBarrierBox");
    expect(declaredText.includes("SAFETY DECLARED")).toBe(true);

    // 9. Verify Next now successfully advances to Step 2
    print("[LEAF] Triggering Next after safety declaration...");
    const advanceSuccess = await triggerButton("Btn_Next", undefined, interactor);
    expect(advanceSuccess).toBe(true);

    progressText = getTextContent("ProgressBadge");
    expect(progressText).toBe("Step 2 of 11");

    print("[LEAF] Scenario 3 PASSED: Workshop Safety Gate blocking, genuine declaration, and advancement verified.");
  }
}

