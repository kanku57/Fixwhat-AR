/**
 * FixWhatRemoteJourneyScenario.ts
 * LEAF Scenario 2: Remote Consumer Journey & Genuine SIK Interaction Verification
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
export class FixWhatRemoteJourneyScenario extends Scenario {
  async run(): Promise<void> {
    print("[LEAF] Running Scenario 2: Remote Consumer Journey...");
    const interactor = new DefaultLeafInteractor();

    // 1. Startup -> Welcome
    await completeStartupAndEnterWelcome(interactor);

    // 2. Select Remote Track via genuine SIK Button on Card_Remote
    const cardRemote = findSceneObjectByName("Card_Remote");
    expect(cardRemote !== null).toBe(true);
    const selectRemoteSuccess = await triggerButton("Btn_Select", cardRemote!, interactor);
    expect(selectRemoteSuccess).toBe(true);

    // 3. Verify Simulated Recognition screen & disclosure
    const viewRecog = findSceneObjectByName("View_Recognition");
    expect(viewRecog !== null && viewRecog.enabled).toBe(true);

    const headerText = getTextContent("RecogHeader");
    expect(headerText.includes("UNIVERSAL REMOTE")).toBe(true);

    const disclaimerText = getTextContent("RecogDisclaimer");
    expect(disclaimerText.toLowerCase().includes("simulated")).toBe(true);

    // 4. Trigger Simulated Recognition via Btn_RecogAction
    const recogActionSuccess = await triggerButton("Btn_RecogAction", undefined, interactor);
    expect(recogActionSuccess).toBe(true);

    // Feedback banner appears
    const feedbackBox = findSceneObjectByName("RecogFeedbackBox");
    expect(feedbackBox !== null && feedbackBox.enabled).toBe(true);
    const feedbackText = getTextContent("RecogFeedbackBox");
    expect(feedbackText.includes("GE 33709")).toBe(true);

    // Start Lesson button becomes available
    const startLessonBtnSO = findSceneObjectByName("Btn_StartLesson");
    expect(startLessonBtnSO !== null && startLessonBtnSO.enabled).toBe(true);

    // 5. Enter Guided Lesson
    const enterLessonSuccess = await triggerButton("Btn_StartLesson", undefined, interactor);
    expect(enterLessonSuccess).toBe(true);

    // Verify Welcome Panel hidden, Spatial Mentor Panel visible
    const welcomeRoot = findSceneObjectByName("FixWhat_WelcomePanel");
    if (welcomeRoot) expect(welcomeRoot.enabled).toBe(false);

    const mentorRoot = findSceneObjectByName("FixWhat_SpatialMentorPanel");
    expect(mentorRoot !== null && mentorRoot.enabled).toBe(true);

    // 6. Verify Correct Procedure is loaded (Remote Track, Step 1 of 9)
    const trackBadgeText = getTextContent("TrackBadge");
    expect(trackBadgeText.includes("CONSUMER REPAIR") || trackBadgeText.includes("33709")).toBe(true);

    let progressText = getTextContent("ProgressBadge");
    expect(progressText).toBe("Step 1 of 9");

    const EXPECTED_REMOTE_CAPTIONS = [
      "📐 GE 33709: REAR CHASSIS BATTERY DOOR REMOVAL",
      "📐 GE 33709: BATTERY BAY POLARITY & SPRING CONTACT IDENTIFICATION",
      "📐 GE 33709: SLOT A (LEFT) CELL 1 30-DEGREE SPRING COMPRESSION",
      "📐 GE 33709: SLOT B (RIGHT) CELL 2 FLAT TOP TERMINAL ENGAGEMENT",
      "📐 GE 33709: BATTERY DOOR GUIDE RAIL ALIGNMENT & CLOSURE",
      "📐 GE 33709: SETUP BUTTON HOLD & RED LED ACTIVATION",
      "📐 GE 33709: TV DEVICE BUTTON SELECTION & LED CONFIRMATION",
      "📐 GE 33709: 4-DIGIT TV CODE ENTRY TEMPLATE & VERSION STICKER",
      "📐 GE 33709: LINE-OF-SIGHT IR EMISSION & TV VERIFICATION"
    ];

    const stepVisualSO = findSceneObjectByName("StepVisualContainer");
    expect(stepVisualSO !== null && stepVisualSO.enabled).toBe(true);

    const imgSO = findSceneObjectByName("StepVisualImage");
    expect(imgSO !== null).toBe(true);
    const imgComponent = imgSO ? (imgSO.getComponent("Component.Image") as Image) : null;
    expect(imgComponent !== null).toBe(true);

    // Verify Step 1 Visual & Caption
    let captionText = getTextContent("StepVisualCaption");
    expect(captionText).toBe(EXPECTED_REMOTE_CAPTIONS[0]);
    expect(captionText.includes("WELLER")).toBe(false);
    expect(captionText.includes("NASA")).toBe(false);

    let currentTex = imgComponent!.mainPass.baseTex as Texture;
    expect(currentTex !== null).toBe(true);
    expect(currentTex.name).toBe("AST-REM-01");
    expect(currentTex.getWidth()).toBe(1200);
    expect(currentTex.getHeight()).toBe(400);

    // 7. Verify Navigation: Next advances to Step 2, Prev returns to Step 1
    const nextSuccess = await triggerButton("Btn_Next", undefined, interactor);
    expect(nextSuccess).toBe(true);
    progressText = getTextContent("ProgressBadge");
    expect(progressText).toBe("Step 2 of 9");

    captionText = getTextContent("StepVisualCaption");
    expect(captionText).toBe(EXPECTED_REMOTE_CAPTIONS[1]);
    currentTex = imgComponent!.mainPass.baseTex as Texture;
    expect(currentTex !== null).toBe(true);
    expect(currentTex.name).toBe("AST-REM-02");
    expect(currentTex.getWidth()).toBe(1200);
    expect(currentTex.getHeight()).toBe(400);

    const prevSuccess = await triggerButton("Btn_Prev", undefined, interactor);
    expect(prevSuccess).toBe(true);
    progressText = getTextContent("ProgressBadge");
    expect(progressText).toBe("Step 1 of 9");

    captionText = getTextContent("StepVisualCaption");
    expect(captionText).toBe(EXPECTED_REMOTE_CAPTIONS[0]);
    currentTex = imgComponent!.mainPass.baseTex as Texture;
    expect(currentTex !== null).toBe(true);
    expect(currentTex.name).toBe("AST-REM-01");

    // 8. Verify Why? Accordion toggle
    const whyToggleSuccess = await triggerButton("Btn_Why", undefined, interactor);
    expect(whyToggleSuccess).toBe(true);
    const whyAccordion = findSceneObjectByName("Accordion_Why");
    expect(whyAccordion !== null && whyAccordion.enabled).toBe(true);
    const whyBody = getTextContent("WhyBody");
    expect(whyBody.length > 0).toBe(true);

    // Close Why?
    await triggerButton("Btn_Why", undefined, interactor);
    expect(whyAccordion!.enabled).toBe(false);

    // 8B. Verify Authoritative Source Citation Accordion toggle (DEC-M3.2-02)
    const sourceToggleSuccess = await triggerButton("Btn_Source", undefined, interactor);
    expect(sourceToggleSuccess).toBe(true);
    const sourceAccordion = findSceneObjectByName("Accordion_Source");
    expect(sourceAccordion !== null && sourceAccordion.enabled).toBe(true);
    const sourceMeta = getTextContent("SourceMeta");
    expect(sourceMeta.includes("Battery Installation") || sourceMeta.includes("Page 2") || sourceMeta.includes("33709")).toBe(true);
    const sourceExcerpt = getTextContent("SourceExcerpt");
    expect(sourceExcerpt.toLowerCase().includes("textured surface") || sourceExcerpt.length > 10).toBe(true);

    // Close Source Accordion
    await triggerButton("Btn_Source", undefined, interactor);
    expect(sourceAccordion!.enabled).toBe(false);

    // 9. Verify Overview toggle
    const overviewToggleSuccess = await triggerButton("Btn_Overview", undefined, interactor);
    expect(overviewToggleSuccess).toBe(true);
    const overviewGroup = findSceneObjectByName("Group_Overview");
    expect(overviewGroup !== null && overviewGroup.enabled).toBe(true);
    const roadmapText = getTextContent("OverviewRoadmap");
    expect(roadmapText.includes("Step 1:")).toBe(true);

    // Close Overview
    await triggerButton("Btn_Overview", undefined, interactor);
    expect(overviewGroup!.enabled).toBe(false);

    // 10. Advance through all steps to completion
    // Currently at Step 1 of 9. Click Next 8 times to reach Step 9 of 9.
    for (let s = 2; s <= 9; s++) {
      const adv = await triggerButton("Btn_Next", undefined, interactor);
      expect(adv).toBe(true);
      const curr = getTextContent("ProgressBadge");
      expect(curr).toBe(`Step ${s} of 9`);
      expect(stepVisualSO!.enabled).toBe(true);
      captionText = getTextContent("StepVisualCaption");
      expect(captionText).toBe(EXPECTED_REMOTE_CAPTIONS[s - 1]);
      expect(captionText.includes("WELLER")).toBe(false);
      expect(captionText.includes("NASA")).toBe(false);
      currentTex = imgComponent!.mainPass.baseTex as Texture;
      expect(currentTex !== null).toBe(true);
      expect(currentTex.name).toBe(`AST-REM-0${s}`);
      expect(currentTex.getWidth()).toBe(1200);
      expect(currentTex.getHeight()).toBe(400);
    }

    // 1 more Next click triggers completion
    const completeAdv = await triggerButton("Btn_Next", undefined, interactor);
    expect(completeAdv).toBe(true);

    // Verify Completion Screen semantics and visual teardown
    expect(stepVisualSO!.enabled).toBe(false);
    expect(imgComponent!.mainPass.baseTex).toBeNull();

    // Verify Completion Screen semantics
    const rowActions = findSceneObjectByName("Row_ProcedureActions");
    if (rowActions) expect(rowActions.enabled).toBe(false);

    const rowCompletion = findSceneObjectByName("Row_CompletionActions");
    expect(rowCompletion !== null && rowCompletion.enabled).toBe(true);

    const completionTitle = getTextContent("StepTitle");
    expect(completionTitle.includes("Complete")).toBe(true);

    const completionInstr = getTextContent("StepInstruction");
    expect(completionInstr.includes("does not physically verify")).toBe(true);

    const repeatBtn = findInteractableByName("Btn_RepeatLesson", rowCompletion!);
    expect(repeatBtn !== undefined).toBe(true);

    const returnBtn = findInteractableByName("Btn_ReturnWelcome", rowCompletion!);
    expect(returnBtn !== undefined).toBe(true);

    print("[LEAF] Scenario 2 PASSED: Remote Consumer Journey verified completely with genuine SIK input.");
  }
}

