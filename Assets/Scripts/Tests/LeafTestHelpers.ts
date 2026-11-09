/**
 * LeafTestHelpers.ts
 * Shared helper utilities for FixWhat? AR LEAF Scenarios
 */

import { findSceneObjectByName, sleep } from "Leaf.lspkg/Utils/common/Utils";
import { DefaultLeafInteractor } from "Leaf.lspkg/Interactors/interactor/DefaultLeafInteractor";
import { findInteractableByName } from "Leaf.lspkg/Interactors/InteractableUtils";
import { expect } from "Leaf.lspkg/Utils/common/Expect";

/**
 * Polls for honest startup subsystem verification to complete.
 * Frame-rate independent: polls every 500ms for up to maxWaitSeconds.
 */
export async function waitForStartupReady(maxWaitSeconds = 15): Promise<boolean> {
  const polls = Math.ceil((maxWaitSeconds * 1000) / 500);
  for (let i = 0; i < polls; i++) {
    await sleep(500);
    const statusBanner = findSceneObjectByName("Init_StatusBanner");
    if (statusBanner) {
      const textComp = statusBanner.getComponent("Component.Text") as Text;
      if (textComp && textComp.text && textComp.text.includes("ALL STARTUP CHECKS PASSED")) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Completes the startup initialization sequence and enters the Welcome screen.
 */
export async function completeStartupAndEnterWelcome(interactor: DefaultLeafInteractor): Promise<void> {
  const ready = await waitForStartupReady(15);
  expect(ready).toBe(true);

  const initBtn = findInteractableByName("Init_BtnAction");
  expect(initBtn !== undefined).toBe(true);
  if (initBtn) {
    await interactor.trigger(initBtn);
  }
  await sleep(600);

  const welcomeRoot = findSceneObjectByName("FixWhat_WelcomePanel");
  expect(welcomeRoot !== null && welcomeRoot.enabled).toBe(true);
}

/**
 * Triggers an SIK button by SceneObject name, optionally scoping to a parent SceneObject.
 */
export async function triggerButton(
  name: string,
  parentSO?: SceneObject,
  interactor?: DefaultLeafInteractor
): Promise<boolean> {
  const leafInteractor = interactor || new DefaultLeafInteractor();
  const interactable = findInteractableByName(name, parentSO, true);
  if (!interactable) {
    print(`[LeafTestHelpers] Warning: Interactable "${name}" not found or not enabled.`);
    return false;
  }
  await leafInteractor.trigger(interactable);
  await sleep(400); // allow layout & animation to settle
  return true;
}

/**
 * Retrieves the text content of a Component.Text attached to a SceneObject by name.
 */
export function getTextContent(name: string, parentSO?: SceneObject): string {
  const so = parentSO
    ? findSceneObjectByName(name, parentSO)
    : findSceneObjectByName(name);
  if (!so) return "";
  const textComp = so.getComponent("Component.Text") as Text;
  return textComp ? textComp.text : "";
}

