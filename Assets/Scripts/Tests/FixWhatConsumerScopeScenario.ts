/**
 * FixWhatConsumerScopeScenario.ts
 * LEAF Scenario 6: Consumer Remote Scope & Model Enforcement Verification (DEC-M3.2-01)
 *
 * Verifies:
 * 1. Dual-model selection interface on Consumer Remote card (GE 33709 vs GE 33711).
 * 2. Explicit scope limitation notice for unsupported GE 33711 (View_UnsupportedModel).
 * 3. Safe return navigation from unsupported notice back to track selection.
 * 4. Supported GE 33709 recognition flow with model-specific prompts and feedback.
 * 5. Spatial Mentor HUD header display asserting "CONSUMER REPAIR • GE 33709" (no 33711 leakage).
 * 6. Disabled Prev button at Step 00.
 * 7. Clean return to menu resetting state.
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
export class FixWhatConsumerScopeScenario extends Scenario {
  async run(): Promise<void> {
    print("[LEAF] Running Scenario 6: Consumer Scope & Model Enforcement (DEC-M3.2-01)...");
    const interactor = new DefaultLeafInteractor();

    // 1. Startup -> Welcome
    await completeStartupAndEnterWelcome(interactor);

    const cardRemote = findSceneObjectByName("Card_Remote");
    expect(cardRemote !== null).toBe(true);

    // 2. Verify unsupported button exists on Card_Remote
    const btn33711SO = findSceneObjectByName("Btn_Select_33711", cardRemote!);
    expect(btn33711SO !== null).toBe(true);

    // 3. Test Unsupported Flow: Select GE 33711
    print("[LEAF] Step 3: Triggering unsupported GE 33711 selection...");
    const select11Success = await triggerButton("Btn_Select_33711", cardRemote!, interactor);
    expect(select11Success).toBe(true);

    // Assert View_UnsupportedModel is active, View_Welcome & View_Recognition hidden
    const viewUnsupported = findSceneObjectByName("View_UnsupportedModel");
    expect(viewUnsupported !== null && viewUnsupported.enabled).toBe(true);

    const viewWelcome = findSceneObjectByName("View_Welcome");
    if (viewWelcome) expect(viewWelcome.enabled).toBe(false);

    const viewRecog = findSceneObjectByName("View_Recognition");
    if (viewRecog) expect(viewRecog.enabled).toBe(false);

    // Verify Honest Scope Disclosures
    const unsuppHeader = getTextContent("UnsupportedHeader");
    expect(unsuppHeader.includes("MODEL UNSUPPORTED")).toBe(true);
    expect(unsuppHeader.includes("33711")).toBe(true);

    const unsuppNotice = getTextContent("UnsupportedNotice");
    expect(unsuppNotice.includes("not supported in this release")).toBe(true);

    const unsuppBody = getTextContent("UnsupportedBody");
    expect(unsuppBody.includes("Milestone 3.2")).toBe(true);
    expect(unsuppBody.includes("GE 33709 model is currently supported")).toBe(true);

    // 4. Safe Return Path: Trigger Btn_UnsupportedBack
    print("[LEAF] Step 4: Testing safe return path back to track selection...");
    const returnSuccess = await triggerButton("Btn_UnsupportedBack", viewUnsupported!, interactor);
    expect(returnSuccess).toBe(true);

    // Assert View_UnsupportedModel is disabled and View_Welcome is restored
    expect(viewUnsupported!.enabled).toBe(false);
    expect(viewWelcome!.enabled).toBe(true);

    // 5. Test Supported Flow: Select GE 33709
    print("[LEAF] Step 5: Selecting supported GE 33709 remote track...");
    const select09Success = await triggerButton("Btn_Select", cardRemote!, interactor);
    expect(select09Success).toBe(true);

    // Assert View_Recognition is active
    expect(viewRecog !== null && viewRecog.enabled).toBe(true);

    const recogHeader = getTextContent("RecogHeader");
    expect(recogHeader.includes("UNIVERSAL REMOTE")).toBe(true);

    const recogInstr = getTextContent("RecogInstruction");
    expect(recogInstr.includes("GE / Jasco 33709")).toBe(true);
    expect(recogInstr.includes("33711")).toBe(false);

    const recogStandin = getTextContent("RecogStandinBox");
    expect(recogStandin.includes("GE 33709 REMOTE STAND-IN")).toBe(true);

    // 6. Trigger Simulated Recognition
    print("[LEAF] Step 6: Triggering simulated recognition for GE 33709...");
    const actSuccess = await triggerButton("Btn_RecogAction", undefined, interactor);
    expect(actSuccess).toBe(true);

    const feedbackBox = findSceneObjectByName("RecogFeedbackBox");
    expect(feedbackBox !== null && feedbackBox.enabled).toBe(true);
    const feedbackText = getTextContent("RecogFeedbackBox");
    expect(feedbackText.includes("GE 33709 (Supported Model • Simulated Recognition)")).toBe(true);
    expect(feedbackText.includes("33711")).toBe(false);

    // 7. Enter Guided Lesson
    print("[LEAF] Step 7: Entering guided lesson...");
    const startLessonSuccess = await triggerButton("Btn_StartLesson", undefined, interactor);
    expect(startLessonSuccess).toBe(true);

    const mentorRoot = findSceneObjectByName("FixWhat_SpatialMentorPanel");
    expect(mentorRoot !== null && mentorRoot.enabled).toBe(true);

    // Verify Header Track explicitly displays GE 33709 without 33711
    const trackBadgeText = getTextContent("TrackBadge");
    expect(trackBadgeText).toBe("CONSUMER REPAIR • GE 33709");
    expect(trackBadgeText.includes("33711")).toBe(false);

    const progressBadgeText = getTextContent("ProgressBadge");
    expect(progressBadgeText).toBe("Step 1 of 9");

    // Verify Btn_Prev is disabled at Step 00
    const prevInteractable = findInteractableByName("Btn_Prev");
    expect(prevInteractable !== undefined).toBe(true);
    if (prevInteractable) {
      expect(prevInteractable.enabled).toBe(false);
    }

    // 8. Return to Welcome via Header Menu
    print("[LEAF] Step 8: Returning to Welcome via Header Menu...");
    const headerMenuSuccess = await triggerButton("Btn_HeaderMenu", mentorRoot!, interactor);
    expect(headerMenuSuccess).toBe(true);

    expect(mentorRoot!.enabled).toBe(false);
    const welcomeRoot = findSceneObjectByName("FixWhat_WelcomePanel");
    expect(welcomeRoot !== null && welcomeRoot.enabled).toBe(true);
    expect(viewWelcome!.enabled).toBe(true);

    print("[LEAF] Scenario 6 PASSED: Consumer Scope & Model Enforcement fully verified.");
  }
}

