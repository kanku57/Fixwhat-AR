/**
 * FixWhatGatewayScenario.ts
 *
 * LEAF Scenario 7: Five-Entry Gateway & Roadmap Modal Verification (Milestone FW-02 / FW-02I)
 *
 * Verifies:
 * 1. Five-entry initialization gateway layout on View_Welcome:
 *    - Scan Your Device (Coming Soon — FW-03)
 *    - Upload Your Manual (Coming Soon — FW-04)
 *    - Existing Supported Experiences (GE 33709 Remote & Wire Splicing)
 *    - My Manuals (Coming Soon — 0 Cached)
 *    - Browse 10 Device Categories
 * 2. Scan Device roadmap modal opens, presents honest disclosures, and returns cleanly.
 * 3. Upload Manual Route D modal opens, presents honest disclosures, and returns cleanly.
 * 4. My Manuals library modal opens and returns cleanly.
 * 5. Zero state leakage or accidental procedure launching occurs during gateway navigation.
 */

import { Scenario } from "Leaf.lspkg/Scenarios/scenario/Scenario";
import { expect } from "Leaf.lspkg/Utils/common/Expect";
import { findSceneObjectByName, sleep } from "Leaf.lspkg/Utils/common/Utils";
import { DefaultLeafInteractor } from "Leaf.lspkg/Interactors/interactor/DefaultLeafInteractor";
import {
  completeStartupAndEnterWelcome,
  getTextContent,
  triggerButton,
} from "./LeafTestHelpers";

@component
export class FixWhatGatewayScenario extends Scenario {
  async run(): Promise<void> {
    try {
      print("[LEAF] Running Scenario 7: Five-Entry Gateway & Roadmap Modals...");
      const interactor = new DefaultLeafInteractor();

      // 1. Complete Startup -> View_Welcome
      await completeStartupAndEnterWelcome(interactor);

      const viewWelcome = findSceneObjectByName("View_Welcome");
      expect(viewWelcome !== null && viewWelcome.enabled).toBe(true);

      // 2. Verify all 5 gateway entries exist
      const cardScan = findSceneObjectByName("Card_ScanDevice");
      expect(cardScan !== null && cardScan.enabled).toBe(true);

      const cardUpload = findSceneObjectByName("Card_UploadManual");
      expect(cardUpload !== null && cardUpload.enabled).toBe(true);

      const cardRemote = findSceneObjectByName("Card_Remote");
      expect(cardRemote !== null && cardRemote.enabled).toBe(true);

      const cardWorkshop = findSceneObjectByName("Card_Workshop");
      expect(cardWorkshop !== null && cardWorkshop.enabled).toBe(true);

      const cardManuals = findSceneObjectByName("Card_MyManuals");
      expect(cardManuals !== null && cardManuals.enabled).toBe(true);

      const cardCatalogue = findSceneObjectByName("Card_BrowseCatalogue");
      expect(cardCatalogue !== null && cardCatalogue.enabled).toBe(true);

      // 3. Test Scan Device Roadmap Modal (FW-03)
      print("[LEAF] Testing Scan Device Roadmap Modal...");
      const scanSuccess = await triggerButton("Btn_ScanDevice", cardScan!, interactor);
      print("[LEAF DEBUG] scanSuccess: " + scanSuccess);
      expect(scanSuccess).toBe(true);

      const modalScan = findSceneObjectByName("View_ModalScan");
      print("[LEAF DEBUG] modalScan: " + (modalScan ? "found, enabled=" + modalScan.enabled : "not found"));
      expect(modalScan !== null && modalScan.enabled).toBe(true);
      expect(viewWelcome!.enabled).toBe(false);

      // Verify Honest Disclosures
      const scanBadge = getTextContent("ModalBadge", modalScan!);
      print("[LEAF DEBUG] scanBadge: " + scanBadge);
      expect(scanBadge.includes("FW-03")).toBe(true);

      const scanBody = getTextContent("ModalBody", modalScan!);
      print("[LEAF DEBUG] scanBody length: " + scanBody.length);
      expect(scanBody.includes("computer vision")).toBe(true);
      expect(scanBody.includes("No fake computer vision")).toBe(true);

      // Safe Dismissal back to Welcome
      const scanDismissSuccess = await triggerButton("Btn_ModalScan_Back", modalScan!, interactor);
      print("[LEAF DEBUG] scanDismissSuccess: " + scanDismissSuccess);
      expect(scanDismissSuccess).toBe(true);
      expect(modalScan!.enabled).toBe(false);
      expect(viewWelcome!.enabled).toBe(true);

      // 4. Test Upload Manual Route D Modal (FW-04)
      print("[LEAF] Testing Upload Manual Route D Modal...");
      const uploadSuccess = await triggerButton("Btn_UploadManual", cardUpload!, interactor);
      print("[LEAF DEBUG] uploadSuccess: " + uploadSuccess);
      expect(uploadSuccess).toBe(true);

      const modalUpload = findSceneObjectByName("View_ModalUpload");
      expect(modalUpload !== null && modalUpload.enabled).toBe(true);
      expect(viewWelcome!.enabled).toBe(false);

      const uploadBadge = getTextContent("ModalBadge", modalUpload!);
      expect(uploadBadge.includes("FW-04")).toBe(true);

      const uploadBody = getTextContent("ModalBody", modalUpload!);
      expect(uploadBody.includes("Route D")).toBe(true);
      expect(uploadBody.includes("No fake file picker")).toBe(true);

      const uploadDismissSuccess = await triggerButton("Btn_ModalUpload_Back", modalUpload!, interactor);
      expect(uploadDismissSuccess).toBe(true);
      expect(modalUpload!.enabled).toBe(false);
      expect(viewWelcome!.enabled).toBe(true);

      // 5. Test My Manuals Modal
      print("[LEAF] Testing My Manuals Modal...");
      const manualsSuccess = await triggerButton("Btn_MyManuals", cardManuals!, interactor);
      expect(manualsSuccess).toBe(true);

      const modalManuals = findSceneObjectByName("View_ModalManuals");
      expect(modalManuals !== null && modalManuals.enabled).toBe(true);
      expect(viewWelcome!.enabled).toBe(false);

      const manualsBody = getTextContent("ModalBody", modalManuals!);
      expect(manualsBody.includes("GE / Jasco 33709")).toBe(true);

      const manualsDismissSuccess = await triggerButton("Btn_ModalManuals_Back", modalManuals!, interactor);
      expect(manualsDismissSuccess).toBe(true);
      expect(modalManuals!.enabled).toBe(false);
      expect(viewWelcome!.enabled).toBe(true);

      print("[LEAF] Scenario 7 PASSED: Five-Entry Gateway and Roadmap Modals verified.");
    } catch (e) {
      print("[LEAF ERROR in Scenario 7] " + e);
      throw e;
    }
  }
}
