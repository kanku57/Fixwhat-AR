/**
 * FixWhatNavigationRecoveryScenario.ts
 * LEAF Scenario 5: Navigation, Recovery, Menu Return, Repeat Lesson, and Stale State Isolation
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
export class FixWhatNavigationRecoveryScenario extends Scenario {
  async run(): Promise<void> {
    print("[LEAF] Running Scenario 5: Navigation, Recovery, and Track Switching...");
    const interactor = new DefaultLeafInteractor();

    // 1. Startup -> Welcome
    await completeStartupAndEnterWelcome(interactor);

    // 2. Select Remote Track & Advance to Step 3
    const cardRemote = findSceneObjectByName("Card_Remote");
    expect(cardRemote !== null).toBe(true);
    await triggerButton("Btn_Select", cardRemote!, interactor);
    await triggerButton("Btn_RecogAction", undefined, interactor);
    await triggerButton("Btn_StartLesson", undefined, interactor);

    // Advance to Step 3 of 9
    await triggerButton("Btn_Next", undefined, interactor); // Step 2
    await triggerButton("Btn_Next", undefined, interactor); // Step 3
    let progressText = getTextContent("ProgressBadge");
    expect(progressText).toBe("Step 3 of 9");

    // 3. Test Return-to-Menu Navigation via Btn_HeaderMenu ("🏠 MENU")
    const menuSuccess = await triggerButton("Btn_HeaderMenu", undefined, interactor);
    expect(menuSuccess).toBe(true);

    const welcomeRoot = findSceneObjectByName("FixWhat_WelcomePanel");
    expect(welcomeRoot !== null && welcomeRoot.enabled).toBe(true);

    const viewWelcome = findSceneObjectByName("View_Welcome");
    expect(viewWelcome !== null && viewWelcome.enabled).toBe(true);

    const mentorRoot = findSceneObjectByName("FixWhat_SpatialMentorPanel");
    if (mentorRoot) expect(mentorRoot.enabled).toBe(false);

    // 4. Verify No Stale State when Switching Tracks to Workshop
    const cardWorkshop = findSceneObjectByName("Card_Workshop");
    expect(cardWorkshop !== null).toBe(true);
    await triggerButton("Btn_Select", cardWorkshop!, interactor);
    await triggerButton("Btn_RecogAction", undefined, interactor);
    await triggerButton("Btn_StartLesson", undefined, interactor);

    // Must be in Workshop track
    const trackBadge = getTextContent("TrackBadge");
    expect(trackBadge.includes("WORKSHOP") || trackBadge.includes("WIRE")).toBe(true);

    // Step index must be reset to Step 1 of 11 (NOT Step 3 of previous track)
    progressText = getTextContent("ProgressBadge");
    expect(progressText).toBe("Step 1 of 11");

    // Safety gate must be FRESH and blocking (not bypassed from previous session)
    const safetyBtnSO = findSceneObjectByName("Btn_SafetyDeclare");
    expect(safetyBtnSO !== null && safetyBtnSO.enabled).toBe(true);

    await triggerButton("Btn_Next", undefined, interactor);
    progressText = getTextContent("ProgressBadge");
    expect(progressText).toBe("Step 1 of 11"); // Still blocked

    // 5. Verify Pause & Resume Navigation Resilience & Strict Navigation Lock
    await triggerButton("Btn_Pause", undefined, interactor);
    const pausedBanner = findSceneObjectByName("Banner_Paused");
    expect(pausedBanner !== null && pausedBanner.enabled).toBe(true);

    // Verify Navigation is strictly locked while paused at Step 1
    const nextBtnPaused = findInteractableByName("Btn_Next", undefined, true);
    expect(nextBtnPaused === undefined).toBe(true); // Interactable disabled
    const prevBtnPaused = findInteractableByName("Btn_Prev", undefined, true);
    expect(prevBtnPaused === undefined).toBe(true); // Interactable disabled

    // Attempting triggers while paused must fail and preserve step
    const nextTriggerPaused = await triggerButton("Btn_Next", undefined, interactor);
    expect(nextTriggerPaused).toBe(false);
    progressText = getTextContent("ProgressBadge");
    expect(progressText).toBe("Step 1 of 11");

    const prevTriggerPaused = await triggerButton("Btn_Prev", undefined, interactor);
    expect(prevTriggerPaused).toBe(false);
    progressText = getTextContent("ProgressBadge");
    expect(progressText).toBe("Step 1 of 11");

    // Resume from pause
    await triggerButton("Btn_Pause", undefined, interactor);
    expect(pausedBanner!.enabled).toBe(false);

    // After resume, next interactable is enabled (though blocked by safety barrier)
    const nextBtnResumed = findInteractableByName("Btn_Next", undefined, true);
    expect(nextBtnResumed !== undefined).toBe(true);

    // Acknowledge safety gate and advance
    await triggerButton("Btn_SafetyDeclare", undefined, interactor);
    await triggerButton("Btn_Next", undefined, interactor);
    progressText = getTextContent("ProgressBadge");
    expect(progressText).toBe("Step 2 of 11");

    // =========================================================================
    // Test A — Middle-Step Pause Lock (Step 2 of 11)
    // Both Previous and Next are normally enabled at this step.
    // =========================================================================
    progressText = getTextContent("ProgressBadge");
    expect(progressText).toBe("Step 2 of 11");

    // 1. Verify both navigation interactables are normally enabled before pause
    expect(findInteractableByName("Btn_Next", undefined, true) !== undefined).toBe(true);
    expect(findInteractableByName("Btn_Prev", undefined, true) !== undefined).toBe(true);

    // 2. Activate the actual Pause button
    await triggerButton("Btn_Pause", undefined, interactor);
    expect(pausedBanner !== null && pausedBanner.enabled).toBe(true);

    // 3. Verify both navigation Interactables are disabled during pause
    expect(findInteractableByName("Btn_Next", undefined, true) === undefined).toBe(true);
    expect(findInteractableByName("Btn_Prev", undefined, true) === undefined).toBe(true);

    // 4. Attempt to activate Next through SIK interaction path -> must fail
    const nextAttemptA = await triggerButton("Btn_Next", undefined, interactor);
    expect(nextAttemptA).toBe(false);
    expect(getTextContent("ProgressBadge")).toBe("Step 2 of 11");

    // 5. Attempt to activate Previous through SIK interaction path -> must fail
    const prevAttemptA = await triggerButton("Btn_Prev", undefined, interactor);
    expect(prevAttemptA).toBe(false);
    expect(getTextContent("ProgressBadge")).toBe("Step 2 of 11");

    // 6. Activate Resume
    await triggerButton("Btn_Pause", undefined, interactor);
    expect(pausedBanner!.enabled).toBe(false);

    // 7. Verify both navigation Interactables are restored
    expect(findInteractableByName("Btn_Next", undefined, true) !== undefined).toBe(true);
    expect(findInteractableByName("Btn_Prev", undefined, true) !== undefined).toBe(true);

    // 8. Verify Previous and Next now work normally
    await triggerButton("Btn_Next", undefined, interactor);
    expect(getTextContent("ProgressBadge")).toBe("Step 3 of 11");
    await triggerButton("Btn_Prev", undefined, interactor);
    expect(getTextContent("ProgressBadge")).toBe("Step 2 of 11");

    // =========================================================================
    // Test B — Final-Step Pause Lock (Step 11 of 11)
    // Navigate through the Workshop procedure to its final pre-completion step.
    // =========================================================================
    for (let s = 3; s <= 11; s++) {
      await triggerButton("Btn_Next", undefined, interactor);
      expect(getTextContent("ProgressBadge")).toBe(`Step ${s} of 11`);
    }

    // 1. Record the current step
    const finalStepBeforePause = getTextContent("ProgressBadge");
    expect(finalStepBeforePause).toBe("Step 11 of 11");

    // 2. Verify both navigation interactables are normally enabled at final pre-completion step
    expect(findInteractableByName("Btn_Next", undefined, true) !== undefined).toBe(true);
    expect(findInteractableByName("Btn_Prev", undefined, true) !== undefined).toBe(true);

    // 3. Activate Pause at final step
    await triggerButton("Btn_Pause", undefined, interactor);
    expect(pausedBanner!.enabled).toBe(true);

    // 4. Verify both navigation Interactables remain disabled
    expect(findInteractableByName("Btn_Next", undefined, true) === undefined).toBe(true);
    expect(findInteractableByName("Btn_Prev", undefined, true) === undefined).toBe(true);

    // 5. Attempt Next through genuine SIK interactions -> must fail and preserve step
    const nextAttemptB = await triggerButton("Btn_Next", undefined, interactor);
    expect(nextAttemptB).toBe(false);
    expect(getTextContent("ProgressBadge")).toBe("Step 11 of 11");

    // 6. Attempt Previous through genuine SIK interactions -> must fail and preserve step
    const prevAttemptB = await triggerButton("Btn_Prev", undefined, interactor);
    expect(prevAttemptB).toBe(false);
    expect(getTextContent("ProgressBadge")).toBe("Step 11 of 11");

    // 7. Activate Resume
    await triggerButton("Btn_Pause", undefined, interactor);
    expect(pausedBanner!.enabled).toBe(false);

    // 8. Verify the normal final-step navigation boundary is restored
    expect(findInteractableByName("Btn_Next", undefined, true) !== undefined).toBe(true);
    expect(findInteractableByName("Btn_Prev", undefined, true) !== undefined).toBe(true);

    // 9. Verify the learner can complete the procedure through the normal completion flow
    await triggerButton("Btn_Next", undefined, interactor);

    // Verify completion screen is active
    const rowCompletionWorkshop = findSceneObjectByName("Row_CompletionActions");
    expect(rowCompletionWorkshop !== null && rowCompletionWorkshop.enabled).toBe(true);

    const rowActionsWorkshop = findSceneObjectByName("Row_ProcedureActions");
    expect(rowActionsWorkshop !== null && rowActionsWorkshop.enabled).toBe(false);

    // Return to Menu from Workshop via completion action
    await triggerButton("Btn_ReturnWelcome", rowCompletionWorkshop!, interactor);
    expect(viewWelcome!.enabled).toBe(true);

    // 6. Verify Repeat Lesson on Remote Track & Zero Pause Leakage
    await triggerButton("Btn_Select", cardRemote!, interactor);
    await triggerButton("Btn_RecogAction", undefined, interactor);
    await triggerButton("Btn_StartLesson", undefined, interactor);

    // Verify pause banner is NOT enabled and navigation works immediately
    const pausedBannerRemote = findSceneObjectByName("Banner_Paused");
    expect(pausedBannerRemote !== null && pausedBannerRemote.enabled).toBe(false);

    // Advance to completion (9 steps + 1 more click)
    for (let s = 1; s <= 9; s++) {
      await triggerButton("Btn_Next", undefined, interactor);
    }

    // Verify Completion Screen is active
    const rowCompletion = findSceneObjectByName("Row_CompletionActions");
    expect(rowCompletion !== null && rowCompletion.enabled).toBe(true);

    // Trigger Repeat Lesson
    const repeatSuccess = await triggerButton("Btn_RepeatLesson", rowCompletion!, interactor);
    expect(repeatSuccess).toBe(true);

    // Verify restarted at Step 1 of 9
    progressText = getTextContent("ProgressBadge");
    expect(progressText).toBe("Step 1 of 9");

    const rowActions = findSceneObjectByName("Row_ProcedureActions");
    expect(rowActions !== null && rowActions.enabled).toBe(true);
    expect(rowCompletion!.enabled).toBe(false);

    print("[LEAF] Scenario 5 PASSED: Navigation, Recovery, Menu Return, Repeat Lesson, and Stale State Isolation verified.");
  }
}

