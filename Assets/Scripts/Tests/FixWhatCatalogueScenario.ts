/**
 * FixWhatCatalogueScenario.ts
 *
 * LEAF Scenario 8: Ten-Category Catalogue & Scope Isolation Verification (Milestone FW-02 / FW-02I)
 *
 * Verifies:
 * 1. Opening the 10-category catalogue from View_Welcome via Btn_BrowseCatalogue.
 * 2. Asserting all 10 categories exist in the grid (Cat 01 through Cat 10).
 * 3. Selecting unbuilt categories (Cat 03 Televisions, Cat 04 Coffee Machines) opens View_ModalCategory.
 * 4. Verifying non-bypassable Coming Soon isolation: zero procedure is launched.
 * 5. Returning cleanly from Category Modal back to View_Catalogue via Btn_ModalCat_Back.
 * 6. Returning cleanly from View_Catalogue back to View_Welcome via Btn_Catalogue_Back.
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
export class FixWhatCatalogueScenario extends Scenario {
  async run(): Promise<void> {
    print("[LEAF] Running Scenario 8: Ten-Category Catalogue & Scope Isolation...");
    const interactor = new DefaultLeafInteractor();

    // 1. Startup -> Welcome
    await completeStartupAndEnterWelcome(interactor);

    const viewWelcome = findSceneObjectByName("View_Welcome");
    expect(viewWelcome !== null && viewWelcome.enabled).toBe(true);

    // 2. Open Device Catalogue
    const cardCatalogue = findSceneObjectByName("Card_BrowseCatalogue");
    expect(cardCatalogue !== null).toBe(true);

    print("[LEAF] Step 2: Opening Device Catalogue from Gateway...");
    const openCatSuccess = await triggerButton("Btn_BrowseCatalogue", cardCatalogue!, interactor);
    expect(openCatSuccess).toBe(true);

    const viewCatalogue = findSceneObjectByName("View_Catalogue");
    expect(viewCatalogue !== null && viewCatalogue.enabled).toBe(true);
    expect(viewWelcome!.enabled).toBe(false);

    // 3. Verify all 10 Category Cards exist
    for (let c = 1; c <= 10; c++) {
      const idStr = c < 10 ? "0" + c : "" + c;
      const cardSO = findSceneObjectByName("Card_Cat_" + idStr, viewCatalogue!);
      expect(cardSO !== null).toBe(true);
      if (cardSO) {
        expect(cardSO.enabled).toBe(true);
      }
    }

    // 4. Test Unbuilt Category Isolation: Cat 03 (Televisions)
    print("[LEAF] Step 4: Testing unbuilt Cat 03 (Televisions) selection...");
    const cardCat03 = findSceneObjectByName("Card_Cat_03", viewCatalogue!);
    expect(cardCat03 !== null).toBe(true);

    const select03Success = await triggerButton("Btn_Cat_03", cardCat03!, interactor);
    expect(select03Success).toBe(true);

    // Assert ModalCategory is active, Catalogue is disabled
    const modalCat = findSceneObjectByName("View_ModalCategory");
    expect(modalCat !== null && modalCat.enabled).toBe(true);
    expect(viewCatalogue!.enabled).toBe(false);

    // Verify Honest Scope Disclosures on Modal
    const modalTitle = getTextContent("ModalCatTitle", modalCat!);
    expect(modalTitle.includes("TELEVISIONS")).toBe(true);

    const modalBody = getTextContent("ModalCatBody", modalCat!);
    expect(modalBody.includes("Roadmap")).toBe(true);
    expect(modalBody.includes("Only GE 33709 Remote and Wire Splicing are currently active")).toBe(true);

    // Verify Mentor Panel is NOT visible (Zero procedure launching)
    const mentorRoot = findSceneObjectByName("FixWhat_SpatialMentorPanel");
    if (mentorRoot) {
      expect(mentorRoot.enabled).toBe(false);
    }

    // 5. Dismiss Category Modal -> Return to Catalogue
    print("[LEAF] Step 5: Dismissing Category Modal back to Catalogue...");
    const dismissCatSuccess = await triggerButton("Btn_ModalCat_Back", modalCat!, interactor);
    expect(dismissCatSuccess).toBe(true);
    expect(modalCat!.enabled).toBe(false);
    expect(viewCatalogue!.enabled).toBe(true);

    // 6. Test Another Unbuilt Category: Cat 04 (Coffee Machines)
    print("[LEAF] Step 6: Testing Cat 04 (Coffee Machines)...");
    const cardCat04 = findSceneObjectByName("Card_Cat_04", viewCatalogue!);
    expect(cardCat04 !== null).toBe(true);
    const select04Success = await triggerButton("Btn_Cat_04", cardCat04!, interactor);
    expect(select04Success).toBe(true);
    expect(modalCat!.enabled).toBe(true);

    const modal04Title = getTextContent("ModalCatTitle", modalCat!);
    expect(modal04Title.includes("COFFEE")).toBe(true);

    await triggerButton("Btn_ModalCat_Back", modalCat!, interactor);
    expect(modalCat!.enabled).toBe(false);
    expect(viewCatalogue!.enabled).toBe(true);

    // 7. Return to Main Menu
    print("[LEAF] Step 7: Returning from Catalogue to Main Menu...");
    const backMenuSuccess = await triggerButton("Btn_Catalogue_Back", viewCatalogue!, interactor);
    expect(backMenuSuccess).toBe(true);
    expect(viewCatalogue!.enabled).toBe(false);
    expect(viewWelcome!.enabled).toBe(true);

    print("[LEAF] Scenario 8 PASSED: Ten-Category Catalogue and Coming Soon Isolation verified.");
  }
}

