/**
 * FixWhatStartupScenario.ts
 * LEAF Scenario 1: Startup Initialization & Onboarding Verification
 */

import { Scenario } from "Leaf.lspkg/Scenarios/scenario/Scenario";
import { expect } from "Leaf.lspkg/Utils/common/Expect";
import { findSceneObjectByName, sleep } from "Leaf.lspkg/Utils/common/Utils";
import { DefaultLeafInteractor } from "Leaf.lspkg/Interactors/interactor/DefaultLeafInteractor";
import { findInteractableByName } from "Leaf.lspkg/Interactors/InteractableUtils";

@component
export class FixWhatStartupScenario extends Scenario {
  async run(): Promise<void> {
    print("[LEAF] Running Scenario 1: Startup and Onboarding...");

    // 1. Wait for honest Startup Subsystem Verification to complete (frame-rate independent polling)
    let ready = false;
    let bannerTextContent = "";
    for (let i = 0; i < 25; i++) {
      await sleep(500);
      const statusBanner = findSceneObjectByName("Init_StatusBanner");
      if (statusBanner) {
        const textComp = statusBanner.getComponent("Component.Text") as Text;
        if (textComp) {
          bannerTextContent = textComp.text;
          if (bannerTextContent.includes("ALL STARTUP CHECKS PASSED")) {
            ready = true;
            break;
          }
        }
      }
    }

    print("[LEAF DEBUG] Startup check ready: " + ready + " | Banner: " + bannerTextContent);
    expect(ready).toBe(true);

    // 2. Verify Startup Initialization Panel is active
    const initRoot = findSceneObjectByName("FixWhat_InitPanel");
    expect(initRoot !== null).toBe(true);
    if (initRoot) {
      expect(initRoot.enabled).toBe(true);
    }

    // 3. Verify honest startup status label
    expect(bannerTextContent.includes("ALL STARTUP CHECKS PASSED")).toBe(true);

    // 4. Verify "GET STARTED" action button is available
    const actionBtnSO = findSceneObjectByName("Init_BtnAction");
    expect(actionBtnSO !== null).toBe(true);
    if (actionBtnSO) {
      expect(actionBtnSO.enabled).toBe(true);
    }

    // 5. Genuine SIK Interaction: Tap "GET STARTED"
    const interactor = new DefaultLeafInteractor();
    const btnInteractable = findInteractableByName("Init_BtnAction");
    expect(btnInteractable !== undefined).toBe(true);
    if (btnInteractable) {
      await interactor.trigger(btnInteractable);
    }

    // Allow layout transition to settle
    await sleep(800);

    // 6. Verify transition: InitPanel is hidden, WelcomePanel is visible
    if (initRoot) {
      expect(initRoot.enabled).toBe(false);
    }

    const welcomeRoot = findSceneObjectByName("FixWhat_WelcomePanel");
    expect(welcomeRoot !== null).toBe(true);
    if (welcomeRoot) {
      expect(welcomeRoot.enabled).toBe(true);
    }

    // 7. Verify Remote and Workshop track selection choices are visible
    const cardRemote = findSceneObjectByName("Card_Remote");
    expect(cardRemote !== null).toBe(true);
    if (cardRemote) {
      expect(cardRemote.enabled).toBe(true);
    }

    const cardWorkshop = findSceneObjectByName("Card_Workshop");
    expect(cardWorkshop !== null).toBe(true);
    if (cardWorkshop) {
      expect(cardWorkshop.enabled).toBe(true);
    }

    print("[LEAF] Scenario 1 PASSED: Startup & Onboarding verified with genuine SIK trigger.");
  }
}
