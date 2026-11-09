/**
 * FixWhatWelcomePanel.ts
 *
 * Implements the Unified Spatial Experience Gateway and Device Catalogue for FixWhat? AR (FW-02 / FW-02I).
 * Visual Design System: GLASS-WHITE + GLOSSY ELECTRIC-BLUE
 *
 * Integrates:
 * 1. Screen 01: Five-Entry Initialization Gateway ("WHAT WOULD YOU LIKE TO FIX TODAY?")
 *    - Scan Your Device (Coming Soon — FW-03)
 *    - Upload Your Manual (Coming Soon — FW-04)
 *    - Existing Supported Experiences (GE 33709 Remote & Wire Splicing Workshop)
 *    - My Manuals (Coming Soon — 0 Cached)
 *    - Browse 10 Device Categories
 * 2. Screen 02: Ten-Category Appliance & Device Catalogue Grid
 *    - 2 Supported Categories (Universal Remotes, Workshop & Wiring)
 *    - 8 Coming Soon Categories with honest engineering roadmap cards
 * 3. Feature Modals:
 *    - Real-World Object Recognition Roadmap Modal (FW-03)
 *    - Cloud Manual Ingestion Modal (Route D / FW-04)
 *    - My Manuals Personal Library Modal
 *    - Category Platform Expansion Modal
 * 4. Preserved Operational Flows:
 *    - Simulated Recognition Stand-in Flow (View_Recognition)
 *    - GE 33711 Unsupported Model Guard (View_UnsupportedModel)
 *
 * Built with SpectaclesUIKit (Canvas, BackPlate, FlexLayout, Button, ElementContent)
 * and Spectacles Interaction Kit (SIK).
 */

import { BackPlate } from "SpectaclesUIKit.lspkg/Scripts/BackPlate";
import { Button } from "SpectaclesUIKit.lspkg/Scripts/Components/Button/Button";
import { ElementContent } from "SpectaclesUIKit.lspkg/Scripts/Components/Content/ElementContent";
import { FlexLayout } from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexLayout";
import { FlexItem } from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexItem";
import {
  FlexAlign,
  FlexAlignSelf,
  FlexDirection,
  FlexJustify,
} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexTypes";
import Event from "SpectaclesInteractionKit.lspkg/Utils/Event";
import {
  COLOR_PRIMARY_BLUE,
  COLOR_ICE_BLUE,
  COLOR_DEEP_NAVY,
  COLOR_TEXT_SECONDARY_NAVY,
  COLOR_SLATE_BLUE,
  COLOR_DARK_GLASS,
  COLOR_WHITE_BUTTON_FACE,
  COLOR_TEXT_WHITE,
  COLOR_TEXT_ICE_BLUE,
  COLOR_TEXT_SUPPORTING,
  COLOR_SAFETY_AMBER,
  COLOR_CAUTION_BORDER,
  COLOR_SUCCESS_MINT,
  COLOR_DISABLED_SLATE,
  PANEL_WIDTH_STANDARD,
  PANEL_HEIGHT_STANDARD,
  CONTENT_WIDTH_STANDARD,
  CONTENT_HEIGHT_STANDARD,
  CAMERA_DISTANCE_STANDARD,
  CAMERA_Y_OFFSET_STANDARD,
  BUTTON_HEIGHT_NAV,
  BUTTON_HEIGHT_ACTION,
  BUTTON_HEIGHT_CARD,
  BUTTON_HEIGHT_COMPACT,
  FONT_SIZE_DISPLAY,
  FONT_SIZE_SECTION_HEADING,
  FONT_SIZE_INSTRUCTION_TITLE,
  FONT_SIZE_SAFETY_ALERT,
  FONT_SIZE_BODY_INSTRUCTION,
  FONT_SIZE_BODY_SECONDARY,
  FONT_SIZE_SUBTITLE,
  FONT_SIZE_CARD_DESC,
  FONT_SIZE_METADATA,
  FONT_SIZE_BUTTON_PRIMARY,
  FONT_SIZE_BUTTON_NAV,
  FONT_SIZE_BUTTON_SECONDARY,
  applyDarkTranslucentGlass,
  applyGlassWhiteBackPlate,
  applyWhiteText,
  applyIceBlueText,
  applySupportingText,
  applyDeepNavyText,
  applySecondaryNavyText,
  applyWhiteButton,
  applyPrimaryWhiteButton,
  applySecondaryWhiteButton,
} from "./GlassDesignTokens";

const PANEL_WIDTH = PANEL_WIDTH_STANDARD; // 36.0 cm Candidate C standard frame width
const PANEL_HEIGHT = PANEL_HEIGHT_STANDARD; // 44.0 cm Candidate C standard frame height

export class FixWhatWelcomePanel {
  private cameraObject: SceneObject | null = null;
  private welcomeRoot: SceneObject | null = null;
  private backPlate: BackPlate | null = null;
  private contentHost: SceneObject | null = null;
  private flexRoot: FlexLayout | null = null;

  // View Containers
  private welcomeViewSO: SceneObject | null = null;
  private catalogueViewSO: SceneObject | null = null;
  private modalScanSO: SceneObject | null = null;
  private modalUploadSO: SceneObject | null = null;
  private modalManualsSO: SceneObject | null = null;
  private modalCatSO: SceneObject | null = null;
  private modalCatTitleText: Text | null = null;
  private modalCatBodyText: Text | null = null;

  private recognitionViewSO: SceneObject | null = null;
  private recognitionFlex: FlexLayout | null = null;
  private unsupportedViewSO: SceneObject | null = null;

  // Recognition View Dynamic Elements (Preserved for LEAF and Runtime)
  private recogHeaderBadge: Text | null = null;
  private recogInstructionText: Text | null = null;
  private recogStandinText: Text | null = null;
  private recogActionBtnContent: ElementContent | null = null;
  private recogFeedbackBoxSO: SceneObject | null = null;
  private recogFeedbackText: Text | null = null;
  private recogStartLessonBtnSO: SceneObject | null = null;

  // State
  private pendingTrackIndex: number = 0; // 0 = Remote, 1 = Workshop
  private isRecognitionSimulated: boolean = false;

  // Public events for bootstrap controller
  public onTrackSelected = new Event<number>();
  public onUnsupportedModelSelected = new Event<string>();
  public onRecognitionActionTriggered = new Event<number>();
  public onStartLessonTriggered = new Event<number>();
  public onBackToWelcome = new Event<void>();

  public initialize(cameraObj?: SceneObject): void {
    this.cameraObject = cameraObj || null;

    // 1. Create Master Panel Root
    this.welcomeRoot = global.scene.createSceneObject("FixWhat_WelcomePanel");
    this.welcomeRoot.createComponent("Component.Canvas");

    this.backPlate = this.welcomeRoot.createComponent(BackPlate.getTypeName()) as BackPlate;
    this.backPlate.size = new vec2(PANEL_WIDTH, PANEL_HEIGHT);
    applyDarkTranslucentGlass(this.backPlate, 0.72);

    this.positionPanelInFrontOfCamera(CAMERA_DISTANCE_STANDARD, CAMERA_Y_OFFSET_STANDARD);

    // 2. Create Content Host with FlexLayout (Z-offset +0.6 cm)
    this.contentHost = global.scene.createSceneObject("Welcome_Content");
    this.contentHost.setParent(this.welcomeRoot);
    this.contentHost.getTransform().setLocalPosition(new vec3(0, 0, 0.6));

    this.flexRoot = this.contentHost.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    this.flexRoot.width = PANEL_WIDTH;
    this.flexRoot.height = PANEL_HEIGHT;
    this.flexRoot.direction = FlexDirection.Column;
    this.flexRoot.justifyContent = FlexJustify.Start;
    this.flexRoot.alignItems = FlexAlign.Stretch;
    this.flexRoot.rowGap = 0.8;
    this.flexRoot.paddingTop = 1.4;
    this.flexRoot.paddingBottom = 1.4;
    this.flexRoot.paddingLeft = 2.0;
    this.flexRoot.paddingRight = 2.0;

    this.flexRoot.onLayoutComplete.add((result) => {
      if (this.backPlate) {
        this.backPlate.size = new vec2(PANEL_WIDTH, PANEL_HEIGHT);
        applyDarkTranslucentGlass(this.backPlate, 0.72);
      }
    });

    // 3. Build Sub-views
    this.buildGatewayView();
    this.buildCatalogueView();
    this.buildModalViews();
    this.buildRecognitionView();
    this.buildUnsupportedView();

    print("[FixWhatWelcomePanel] Initialized Unified Glass-White & Electric-Blue Experience Architecture.");
  }

  private positionPanelInFrontOfCamera(distanceCm: number = CAMERA_DISTANCE_STANDARD, yOffsetCm: number = CAMERA_Y_OFFSET_STANDARD): void {
    if (!this.welcomeRoot) return;

    if (this.cameraObject) {
      const camTrans = this.cameraObject.getTransform();
      const camPos = camTrans.getWorldPosition();
      const camRot = camTrans.getWorldRotation();

      const fwd = camRot.multiplyVec3(new vec3(0, 0, -1));
      const up = camRot.multiplyVec3(new vec3(0, 1, 0));

      const targetPos = camPos.add(fwd.uniformScale(distanceCm)).add(up.uniformScale(yOffsetCm));
      this.welcomeRoot.getTransform().setWorldPosition(targetPos);
      this.welcomeRoot.getTransform().setWorldRotation(camRot);
    } else {
      this.welcomeRoot.getTransform().setWorldPosition(new vec3(0, yOffsetCm, -distanceCm));
      this.welcomeRoot.getTransform().setWorldRotation(quat.quatIdentity());
    }
  }

  // ── SCREEN 01: FIVE-ENTRY INITIALIZATION GATEWAY ────────────────────────────
  private buildGatewayView(): void {
    this.welcomeViewSO = global.scene.createSceneObject("View_Welcome");
    this.welcomeViewSO.setParent(this.contentHost!);

    const flex = this.welcomeViewSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Column;
    flex.justifyContent = FlexJustify.Start;
    flex.alignItems = FlexAlign.Stretch;
    flex.rowGap = 0.4;
    flex.width = -1;
    flex.height = -1;
    this.welcomeViewSO.createComponent(FlexItem.getTypeName());

    // 1. Header Bar: Brand + System Ready
    const headerRow = global.scene.createSceneObject("GatewayHeaderRow");
    headerRow.setParent(this.welcomeViewSO);
    const headerFlex = headerRow.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    headerFlex.direction = FlexDirection.Row;
    headerFlex.justifyContent = FlexJustify.SpaceBetween;
    headerFlex.alignItems = FlexAlign.Center;
    headerFlex.width = -1;
    headerFlex.height = 2.2;
    headerRow.createComponent(FlexItem.getTypeName());

    const brandSO = global.scene.createSceneObject("GatewayBrand");
    brandSO.setParent(headerRow);
    const brandText = brandSO.createComponent("Component.Text") as Text;
    brandText.depthTest = true;
    brandText.size = FONT_SIZE_SAFETY_ALERT;
    brandText.text = "⚡ FIXWHAT? AR";
    applyWhiteText(brandText, FONT_SIZE_SAFETY_ALERT);
    brandSO.createComponent(FlexItem.getTypeName());

    const statusSO = global.scene.createSceneObject("GatewayStatus");
    statusSO.setParent(headerRow);
    const statusText = statusSO.createComponent("Component.Text") as Text;
    statusText.depthTest = true;
    statusText.size = FONT_SIZE_BODY_SECONDARY;
    statusText.text = "[ SYSTEM READY ]";
    applyIceBlueText(statusText, FONT_SIZE_BODY_SECONDARY);
    statusSO.createComponent(FlexItem.getTypeName());

    // 2. Central Question Prompt
    const titleSO = global.scene.createSceneObject("WelcomeTitle");
    titleSO.setParent(this.welcomeViewSO);
    const titleText = titleSO.createComponent("Component.Text") as Text;
    titleText.depthTest = true;
    titleText.size = FONT_SIZE_DISPLAY;
    titleText.text = "WHAT WOULD YOU LIKE TO FIX TODAY?";
    titleText.horizontalAlignment = HorizontalAlignment.Center;
    titleText.verticalAlignment = VerticalAlignment.Center;
    titleText.horizontalOverflow = HorizontalOverflow.Wrap;
    (titleText as any).layoutRect = Rect.create(-15.5, 15.5, -1.8, 1.8);
    applyWhiteText(titleText, FONT_SIZE_DISPLAY);
    const titleItem = titleSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    titleItem.marginTop = 0.2;

    // Subtitle
    const subSO = global.scene.createSceneObject("WelcomeSubtitle");
    subSO.setParent(this.welcomeViewSO);
    const subText = subSO.createComponent("Component.Text") as Text;
    subText.depthTest = true;
    subText.size = FONT_SIZE_SUBTITLE;
    subText.text = "Choose an interactive repair or practical learning experience.";
    subText.horizontalAlignment = HorizontalAlignment.Center;
    subText.verticalAlignment = VerticalAlignment.Center;
    subText.horizontalOverflow = HorizontalOverflow.Wrap;
    (subText as any).layoutRect = Rect.create(-15.5, 15.5, -1.0, 1.0);
    applySupportingText(subText, FONT_SIZE_SUBTITLE);
    subSO.createComponent(FlexItem.getTypeName());

    // 3. TIER 1: AVAILABLE NOW
    const tier1HeaderSO = global.scene.createSceneObject("Tier1_Header");
    tier1HeaderSO.setParent(this.welcomeViewSO);
    const tier1HeadText = tier1HeaderSO.createComponent("Component.Text") as Text;
    tier1HeadText.depthTest = true;
    tier1HeadText.size = FONT_SIZE_BODY_INSTRUCTION;
    tier1HeadText.text = "🛠️ AVAILABLE NOW";
    tier1HeadText.horizontalAlignment = HorizontalAlignment.Left;
    applyWhiteText(tier1HeadText, FONT_SIZE_BODY_INSTRUCTION);
    const tier1HeadItem = tier1HeaderSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    tier1HeadItem.marginTop = 0.4;

    const cardsRow = global.scene.createSceneObject("Row_TrackCards");
    cardsRow.setParent(this.welcomeViewSO);
    const rowFlex = cardsRow.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    rowFlex.direction = FlexDirection.Row;
    rowFlex.justifyContent = FlexJustify.SpaceBetween;
    rowFlex.alignItems = FlexAlign.Stretch;
    rowFlex.columnGap = 1.0;
    rowFlex.width = -1;
    rowFlex.height = 17.0;
    const cardsItem = cardsRow.createComponent(FlexItem.getTypeName()) as FlexItem;
    cardsItem.marginTop = 0.2;

    // Card A: Remote (GE 33709 Supported vs GE 33711 Guard)
    this.buildRemoteTrackCard(cardsRow);

    // Card B: Workshop (Western Union Wire Splicing)
    this.buildWorkshopTrackCard(cardsRow);

    // 4. TIER 2: COMING SOON — PLATFORM EXPANSION
    const tier2HeaderSO = global.scene.createSceneObject("Tier2_Header");
    tier2HeaderSO.setParent(this.welcomeViewSO);
    const tier2HeadText = tier2HeaderSO.createComponent("Component.Text") as Text;
    tier2HeadText.depthTest = true;
    tier2HeadText.size = FONT_SIZE_BODY_SECONDARY;
    tier2HeadText.text = "🚀 COMING SOON — PLATFORM EXPANSION";
    tier2HeadText.horizontalAlignment = HorizontalAlignment.Left;
    applyWhiteText(tier2HeadText, FONT_SIZE_BODY_SECONDARY);
    const tier2HeadItem = tier2HeaderSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    tier2HeadItem.marginTop = 0.2;

    const tier2SubSO = global.scene.createSceneObject("Tier2_Subtitle");
    tier2SubSO.setParent(this.welcomeViewSO);
    const tier2SubText = tier2SubSO.createComponent("Component.Text") as Text;
    tier2SubText.depthTest = true;
    tier2SubText.size = FONT_SIZE_SUBTITLE;
    tier2SubText.text = "More ways to identify devices, access manuals and explore guided repair experiences.";
    tier2SubText.horizontalAlignment = HorizontalAlignment.Left;
    applySupportingText(tier2SubText, FONT_SIZE_SUBTITLE);
    tier2SubSO.createComponent(FlexItem.getTypeName());

    // 2x2 Grid for Platform Expansion Cards
    const gridContainer = global.scene.createSceneObject("Grid_Expansion");
    gridContainer.setParent(this.welcomeViewSO);
    const gridFlex = gridContainer.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    gridFlex.direction = FlexDirection.Column;
    gridFlex.justifyContent = FlexJustify.Start;
    gridFlex.alignItems = FlexAlign.Stretch;
    gridFlex.rowGap = 0.4;
    gridFlex.width = -1;
    const gridItem = gridContainer.createComponent(FlexItem.getTypeName()) as FlexItem;
    gridItem.marginTop = 0.2;

    // Expansion Row 1: Scan Device & Upload Manual
    const expRow1 = global.scene.createSceneObject("Row_Expansion_1");
    expRow1.setParent(gridContainer);
    const expFlex1 = expRow1.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    expFlex1.direction = FlexDirection.Row;
    expFlex1.justifyContent = FlexJustify.SpaceBetween;
    expFlex1.alignItems = FlexAlign.Stretch;
    expFlex1.columnGap = 1.0;
    expFlex1.width = -1;
    expFlex1.height = 6.0;
    expRow1.createComponent(FlexItem.getTypeName());

    this.buildScanDeviceCard(expRow1);
    this.buildUploadManualCard(expRow1);

    // Expansion Row 2: My Manuals & Browse Catalogue
    const expRow2 = global.scene.createSceneObject("Row_Expansion_2");
    expRow2.setParent(gridContainer);
    const expFlex2 = expRow2.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    expFlex2.direction = FlexDirection.Row;
    expFlex2.justifyContent = FlexJustify.SpaceBetween;
    expFlex2.alignItems = FlexAlign.Stretch;
    expFlex2.columnGap = 1.0;
    expFlex2.width = -1;
    expFlex2.height = 6.0;
    expRow2.createComponent(FlexItem.getTypeName());

    this.buildMyManualsCard(expRow2);
    this.buildBrowseCatalogueCard(expRow2);
  }

  // ── ENTRY 1: SCAN DEVICE CARD ──────────────────────────────────────────────
  private buildScanDeviceCard(parent: SceneObject): void {
    const cardSO = global.scene.createSceneObject("Card_ScanDevice");
    cardSO.setParent(parent);

    const flex = cardSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Column;
    flex.justifyContent = FlexJustify.SpaceBetween;
    flex.alignItems = FlexAlign.Stretch;
    flex.paddingTop = 0.4;
    flex.paddingBottom = 0.4;
    flex.paddingLeft = 0.6;
    flex.paddingRight = 0.6;
    flex.width = 15.5;
    flex.height = -1;

    const item = cardSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    item.flexGrow = 1;

    const titleSO = global.scene.createSceneObject("ScanTitle");
    titleSO.setParent(cardSO);
    const titleText = titleSO.createComponent("Component.Text") as Text;
    titleText.depthTest = true;
    titleText.size = FONT_SIZE_SUBTITLE;
    titleText.text = "📷 SCAN DEVICE";
    applyWhiteText(titleText, FONT_SIZE_SUBTITLE);
    titleSO.createComponent(FlexItem.getTypeName());

    const badgeSO = global.scene.createSceneObject("ScanBadge");
    badgeSO.setParent(cardSO);
    const badgeText = badgeSO.createComponent("Component.Text") as Text;
    badgeText.depthTest = true;
    badgeText.size = FONT_SIZE_METADATA;
    badgeText.text = "• ROADMAP (FW-03) •";
    if (badgeText.textFill) badgeText.textFill.color = COLOR_SAFETY_AMBER;
    badgeSO.createComponent(FlexItem.getTypeName());

    const btnSO = global.scene.createSceneObject("Btn_ScanDevice");
    btnSO.setParent(cardSO);
    const btn = btnSO.createComponent(Button.getTypeName()) as Button;
    const ec = btnSO.createComponent(ElementContent.getTypeName()) as ElementContent;
    applyPrimaryWhiteButton(btn, ec, "EXPLORE SCAN");
    ec.textSize = FONT_SIZE_BUTTON_SECONDARY;
    btn.onTriggerUp.add(() => {
      this.showModalScan();
    });
    const btnItem = btnSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    btnItem.overrideHeight = BUTTON_HEIGHT_COMPACT;
  }

  // ── ENTRY 2: UPLOAD MANUAL CARD ────────────────────────────────────────────
  private buildUploadManualCard(parent: SceneObject): void {
    const cardSO = global.scene.createSceneObject("Card_UploadManual");
    cardSO.setParent(parent);

    const flex = cardSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Column;
    flex.justifyContent = FlexJustify.SpaceBetween;
    flex.alignItems = FlexAlign.Stretch;
    flex.paddingTop = 0.4;
    flex.paddingBottom = 0.4;
    flex.paddingLeft = 0.6;
    flex.paddingRight = 0.6;
    flex.width = 15.5;
    flex.height = -1;

    const item = cardSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    item.flexGrow = 1;

    const titleSO = global.scene.createSceneObject("UploadTitle");
    titleSO.setParent(cardSO);
    const titleText = titleSO.createComponent("Component.Text") as Text;
    titleText.depthTest = true;
    titleText.size = FONT_SIZE_SUBTITLE;
    titleText.text = "📄 UPLOAD MANUAL";
    applyWhiteText(titleText, FONT_SIZE_SUBTITLE);
    titleSO.createComponent(FlexItem.getTypeName());

    const badgeSO = global.scene.createSceneObject("UploadBadge");
    badgeSO.setParent(cardSO);
    const badgeText = badgeSO.createComponent("Component.Text") as Text;
    badgeText.depthTest = true;
    badgeText.size = FONT_SIZE_METADATA;
    badgeText.text = "• ROADMAP (FW-04) •";
    if (badgeText.textFill) badgeText.textFill.color = COLOR_ICE_BLUE;
    badgeSO.createComponent(FlexItem.getTypeName());

    const btnSO = global.scene.createSceneObject("Btn_UploadManual");
    btnSO.setParent(cardSO);
    const btn = btnSO.createComponent(Button.getTypeName()) as Button;
    const ec = btnSO.createComponent(ElementContent.getTypeName()) as ElementContent;
    applyPrimaryWhiteButton(btn, ec, "EXPLORE UPLOAD");
    ec.textSize = FONT_SIZE_BUTTON_SECONDARY;
    btn.onTriggerUp.add(() => {
      this.showModalUpload();
    });
    const btnItem = btnSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    btnItem.overrideHeight = BUTTON_HEIGHT_COMPACT;
  }

  // ── ENTRY 3: MY MANUALS CARD ───────────────────────────────────────────────
  private buildMyManualsCard(parent: SceneObject): void {
    const cardSO = global.scene.createSceneObject("Card_MyManuals");
    cardSO.setParent(parent);

    const flex = cardSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Column;
    flex.justifyContent = FlexJustify.SpaceBetween;
    flex.alignItems = FlexAlign.Stretch;
    flex.paddingTop = 0.4;
    flex.paddingBottom = 0.4;
    flex.paddingLeft = 0.6;
    flex.paddingRight = 0.6;
    flex.width = 15.5;
    flex.height = -1;

    const item = cardSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    item.flexGrow = 1;

    const titleSO = global.scene.createSceneObject("ManualsTitle");
    titleSO.setParent(cardSO);
    const titleText = titleSO.createComponent("Component.Text") as Text;
    titleText.depthTest = true;
    titleText.size = FONT_SIZE_SUBTITLE;
    titleText.text = "📚 MY MANUALS";
    applyWhiteText(titleText, FONT_SIZE_SUBTITLE);
    titleSO.createComponent(FlexItem.getTypeName());

    const badgeSO = global.scene.createSceneObject("ManualsBadge");
    badgeSO.setParent(cardSO);
    const badgeText = badgeSO.createComponent("Component.Text") as Text;
    badgeText.depthTest = true;
    badgeText.size = FONT_SIZE_METADATA;
    badgeText.text = "[ 0 Cached Library ]";
    if (badgeText.textFill) badgeText.textFill.color = COLOR_SLATE_BLUE;
    badgeSO.createComponent(FlexItem.getTypeName());

    const btnSO = global.scene.createSceneObject("Btn_MyManuals");
    btnSO.setParent(cardSO);
    const btn = btnSO.createComponent(Button.getTypeName()) as Button;
    const ec = btnSO.createComponent(ElementContent.getTypeName()) as ElementContent;
    applySecondaryWhiteButton(btn, ec, "VIEW STATUS");
    ec.textSize = FONT_SIZE_BUTTON_SECONDARY;
    btn.onTriggerUp.add(() => {
      this.showModalManuals();
    });
    const btnItem = btnSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    btnItem.overrideHeight = BUTTON_HEIGHT_COMPACT;
  }

  // ── ENTRY 5: BROWSE CATALOGUE CARD ─────────────────────────────────────────
  private buildBrowseCatalogueCard(parent: SceneObject): void {
    const cardSO = global.scene.createSceneObject("Card_BrowseCatalogue");
    cardSO.setParent(parent);

    const flex = cardSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Column;
    flex.justifyContent = FlexJustify.SpaceBetween;
    flex.alignItems = FlexAlign.Stretch;
    flex.paddingTop = 0.4;
    flex.paddingBottom = 0.4;
    flex.paddingLeft = 0.6;
    flex.paddingRight = 0.6;
    flex.width = 15.5;
    flex.height = -1;

    const item = cardSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    item.flexGrow = 1;

    const titleSO = global.scene.createSceneObject("CatNavTitle");
    titleSO.setParent(cardSO);
    const titleText = titleSO.createComponent("Component.Text") as Text;
    titleText.depthTest = true;
    titleText.size = FONT_SIZE_SUBTITLE;
    titleText.text = "🗂️ CATALOGUE";
    applyWhiteText(titleText, FONT_SIZE_SUBTITLE);
    titleSO.createComponent(FlexItem.getTypeName());

    const badgeSO = global.scene.createSceneObject("CatNavBadge");
    badgeSO.setParent(cardSO);
    const badgeText = badgeSO.createComponent("Component.Text") as Text;
    badgeText.depthTest = true;
    badgeText.size = FONT_SIZE_METADATA;
    badgeText.text = "[ 2 Active • 8 Planned ]";
    if (badgeText.textFill) badgeText.textFill.color = COLOR_ICE_BLUE;
    badgeSO.createComponent(FlexItem.getTypeName());

    const btnSO = global.scene.createSceneObject("Btn_BrowseCatalogue");
    btnSO.setParent(cardSO);
    const btn = btnSO.createComponent(Button.getTypeName()) as Button;
    const ec = btnSO.createComponent(ElementContent.getTypeName()) as ElementContent;
    applyPrimaryWhiteButton(btn, ec, "10 CATEGORIES");
    ec.textSize = FONT_SIZE_BUTTON_SECONDARY;
    btn.onTriggerUp.add(() => {
      this.showCatalogue();
    });
    const btnItem = btnSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    btnItem.overrideHeight = BUTTON_HEIGHT_COMPACT;
  }

  // ── PRESERVED CARD 1: REMOTE TRACK (GE 33709 & 33711) ──────────────────────
  private buildRemoteTrackCard(parent: SceneObject): void {
    const cardSO = global.scene.createSceneObject("Card_Remote");
    cardSO.setParent(parent);

    const flex = cardSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Column;
    flex.justifyContent = FlexJustify.Start;
    flex.alignItems = FlexAlign.Stretch;
    flex.rowGap = 0.3;
    flex.paddingTop = 0.5;
    flex.paddingBottom = 0.5;
    flex.paddingLeft = 0.8;
    flex.paddingRight = 0.8;
    flex.width = 15.5;
    flex.height = -1;

    const item = cardSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    item.flexGrow = 1;

    // Title
    const titleSO = global.scene.createSceneObject("CardTitle");
    titleSO.setParent(cardSO);
    const titleText = titleSO.createComponent("Component.Text") as Text;
    titleText.depthTest = true;
    titleText.size = FONT_SIZE_SECTION_HEADING;
    titleText.text = "Universal Remote";
    titleText.horizontalAlignment = HorizontalAlignment.Center;
    titleText.verticalAlignment = VerticalAlignment.Center;
    titleText.horizontalOverflow = HorizontalOverflow.Wrap;
    (titleText as any).layoutRect = Rect.create(-7.2, 7.2, -1.2, 1.2);
    applyWhiteText(titleText, FONT_SIZE_SECTION_HEADING);
    const titleItem = titleSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    titleItem.overrideHeight = 1.8;

    // Description
    const descSO = global.scene.createSceneObject("CardDesc");
    descSO.setParent(cardSO);
    const descText = descSO.createComponent("Component.Text") as Text;
    descText.depthTest = true;
    descText.size = FONT_SIZE_METADATA;
    descText.text =
      "• GE 33709 Active\n" +
      "• GE 33711 Guarded\n" +
      "• TV Code Pairing";
    descText.horizontalAlignment = HorizontalAlignment.Left;
    descText.verticalAlignment = VerticalAlignment.Top;
    descText.horizontalOverflow = HorizontalOverflow.Wrap;
    (descText as any).layoutRect = Rect.create(-7.2, 7.2, -1.6, 1.6);
    applySupportingText(descText, FONT_SIZE_METADATA);
    const descItem = descSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    descItem.overrideHeight = 3.6;
    descItem.marginBottom = 0.3;

    // Button 1: Supported GE 33709 Selection (Primary)
    const btnSO = global.scene.createSceneObject("Btn_Select");
    btnSO.setParent(cardSO);
    const btn = btnSO.createComponent(Button.getTypeName()) as Button;
    const ec = btnSO.createComponent(ElementContent.getTypeName()) as ElementContent;
    applyPrimaryWhiteButton(btn, ec, "SELECT GE 33709", FONT_SIZE_BUTTON_NAV);
    btn.onTriggerUp.add(() => {
      this.pendingTrackIndex = 0;
      this.onTrackSelected.invoke(0);
    });
    const btnItem = btnSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    btnItem.overrideHeight = BUTTON_HEIGHT_ACTION;
    btnItem.marginBottom = 0.3;

    // Button 2: Unsupported GE 33711 Selection (Secondary - Now fully prominent primary-style!)
    const btn11SO = global.scene.createSceneObject("Btn_Select_33711");
    btn11SO.setParent(cardSO);
    const btn11 = btn11SO.createComponent(Button.getTypeName()) as Button;
    const ec11 = btn11SO.createComponent(ElementContent.getTypeName()) as ElementContent;
    applyPrimaryWhiteButton(btn11, ec11, "GE 33711 [UNSUPPORTED]", FONT_SIZE_BUTTON_NAV);
    btn11.onTriggerUp.add(() => {
      this.showUnsupportedModel("GE 33711");
      this.onUnsupportedModelSelected.invoke("GE 33711");
    });
    const btn11Item = btn11SO.createComponent(FlexItem.getTypeName()) as FlexItem;
    btn11Item.overrideHeight = BUTTON_HEIGHT_ACTION;
  }

  // ── PRESERVED CARD 2: WORKSHOP TRACK (WIRE SPLICING) ───────────────────────
  private buildWorkshopTrackCard(parent: SceneObject): void {
    const cardSO = global.scene.createSceneObject("Card_Workshop");
    cardSO.setParent(parent);

    const flex = cardSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Column;
    flex.justifyContent = FlexJustify.Start;
    flex.alignItems = FlexAlign.Stretch;
    flex.rowGap = 0.3;
    flex.paddingTop = 0.5;
    flex.paddingBottom = 0.5;
    flex.paddingLeft = 0.8;
    flex.paddingRight = 0.8;
    flex.width = 15.5;
    flex.height = -1;

    const item = cardSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    item.flexGrow = 1;

    // Title
    const titleSO = global.scene.createSceneObject("CardTitle");
    titleSO.setParent(cardSO);
    const titleText = titleSO.createComponent("Component.Text") as Text;
    titleText.depthTest = true;
    titleText.size = FONT_SIZE_SECTION_HEADING;
    titleText.text = "Wire Splicing";
    titleText.horizontalAlignment = HorizontalAlignment.Center;
    titleText.verticalAlignment = VerticalAlignment.Center;
    titleText.horizontalOverflow = HorizontalOverflow.Wrap;
    (titleText as any).layoutRect = Rect.create(-7.2, 7.2, -1.2, 1.2);
    applyWhiteText(titleText, FONT_SIZE_SECTION_HEADING);
    const titleItem = titleSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    titleItem.overrideHeight = 1.8;

    // Description
    const descSO = global.scene.createSceneObject("CardDesc");
    descSO.setParent(cardSO);
    const descText = descSO.createComponent("Component.Text") as Text;
    descText.depthTest = true;
    descText.size = FONT_SIZE_METADATA;
    descText.text =
      "• 11 Steps (Cold)\n" +
      "• Western Union Splice\n" +
      "• NASA-STD-8739.4\n" +
      "• Safety Barrier Gate";
    descText.horizontalAlignment = HorizontalAlignment.Left;
    descText.verticalAlignment = VerticalAlignment.Top;
    descText.horizontalOverflow = HorizontalOverflow.Wrap;
    (descText as any).layoutRect = Rect.create(-7.2, 7.2, -1.8, 1.8);
    applySupportingText(descText, FONT_SIZE_METADATA);
    const descItem = descSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    descItem.overrideHeight = 4.2;
    descItem.marginBottom = 0.4;

    // Action Button
    const btnSO = global.scene.createSceneObject("Btn_Select");
    btnSO.setParent(cardSO);
    const btn = btnSO.createComponent(Button.getTypeName()) as Button;
    const ec = btnSO.createComponent(ElementContent.getTypeName()) as ElementContent;
    applyPrimaryWhiteButton(btn, ec, "START WORKSHOP", FONT_SIZE_BUTTON_NAV);
    btn.onTriggerUp.add(() => {
      this.pendingTrackIndex = 1;
      this.onTrackSelected.invoke(1);
    });
    const btnItem = btnSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    btnItem.overrideHeight = BUTTON_HEIGHT_ACTION;
  }

  // ── SCREEN 02: TEN-CATEGORY DEVICE CATALOGUE ───────────────────────────────
  private buildCatalogueView(): void {
    this.catalogueViewSO = global.scene.createSceneObject("View_Catalogue");
    this.catalogueViewSO.setParent(this.contentHost!);

    const flex = this.catalogueViewSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Column;
    flex.justifyContent = FlexJustify.Start;
    flex.alignItems = FlexAlign.Stretch;
    flex.rowGap = 0.6;
    flex.width = -1;
    flex.height = -1;
    this.catalogueViewSO.createComponent(FlexItem.getTypeName());

    // Header
    const catHeaderSO = global.scene.createSceneObject("CatalogueHeader");
    catHeaderSO.setParent(this.catalogueViewSO);
    const catHeaderText = catHeaderSO.createComponent("Component.Text") as Text;
    catHeaderText.depthTest = true;
    catHeaderText.size = FONT_SIZE_INSTRUCTION_TITLE;
    catHeaderText.text = "REPAIR CATEGORY CATALOGUE";
    catHeaderText.horizontalAlignment = HorizontalAlignment.Center;
    applyWhiteText(catHeaderText, FONT_SIZE_INSTRUCTION_TITLE);
    catHeaderSO.createComponent(FlexItem.getTypeName());

    const catSubSO = global.scene.createSceneObject("CatalogueSubtitle");
    catSubSO.setParent(this.catalogueViewSO);
    const catSubText = catSubSO.createComponent("Component.Text") as Text;
    catSubText.depthTest = true;
    catSubText.size = FONT_SIZE_SUBTITLE;
    catSubText.text = "Select an equipment category below. Active categories launch verified AR procedures.";
    catSubText.horizontalAlignment = HorizontalAlignment.Center;
    applySupportingText(catSubText, FONT_SIZE_SUBTITLE);
    catSubSO.createComponent(FlexItem.getTypeName());

    // Catalogue Grid: 2-Column Grid (5 Rows x 2 Cards, 30.0 cm total width) — Reconciled (DEF-LAY-01)
    const row1 = this.createCatalogueRow(this.catalogueViewSO, "CatRow_1");
    this.buildCategoryCard(row1, "01", "Universal Remotes", "SUPPORTED", true, () => {
      this.pendingTrackIndex = 0;
      this.onTrackSelected.invoke(0);
    });
    this.buildCategoryCard(row1, "02", "Workshop & Wiring", "SUPPORTED", true, () => {
      this.pendingTrackIndex = 1;
      this.onTrackSelected.invoke(1);
    });

    const row2 = this.createCatalogueRow(this.catalogueViewSO, "CatRow_2");
    this.buildCategoryCard(row2, "03", "Televisions", "COMING SOON", false, () => {
      this.showModalCategory("Televisions", "Power-supply diagnostics, mainboard ribbon reseating, and HDMI port replacement.");
    });
    this.buildCategoryCard(row2, "04", "Coffee Machines", "COMING SOON", false, () => {
      this.showModalCategory("Coffee Machines", "Descaling procedures, pump pressure diagnostics, and group head gasket replacement.");
    });

    const row3 = this.createCatalogueRow(this.catalogueViewSO, "CatRow_3");
    this.buildCategoryCard(row3, "05", "Wi-Fi Routers", "COMING SOON", false, () => {
      this.showModalCategory("Wi-Fi Routers", "Firmware recovery, factory reset procedures, and antenna connector repair.");
    });
    this.buildCategoryCard(row3, "06", "Washing Machines", "COMING SOON", false, () => {
      this.showModalCategory("Washing Machines", "Drain pump inspection, door lock switch repair, and drive belt tensioning.");
    });

    const row4 = this.createCatalogueRow(this.catalogueViewSO, "CatRow_4");
    this.buildCategoryCard(row4, "07", "Refrigerators", "COMING SOON", false, () => {
      this.showModalCategory("Refrigerators", "Defrost sensor testing, door seal replacement, and condenser coil maintenance.");
    });
    this.buildCategoryCard(row4, "08", "Laptops", "COMING SOON", false, () => {
      this.showModalCategory("Laptops", "Battery replacement, SODIMM memory upgrades, and thermal paste application.");
    });

    const row5 = this.createCatalogueRow(this.catalogueViewSO, "CatRow_5");
    this.buildCategoryCard(row5, "09", "Game Controllers", "COMING SOON", false, () => {
      this.showModalCategory("Game Controllers", "Analog joystick drift calibration, potentiometer repair, and tactile switch replacement.");
    });
    this.buildCategoryCard(row5, "10", "Air Conditioners", "COMING SOON", false, () => {
      this.showModalCategory("Air Conditioners", "Filter cleaning cycles, condensate line clearing, and blower wheel inspection.");
    });

    // Return to Main Menu Button
    const backBtnSO = global.scene.createSceneObject("Btn_Catalogue_Back");
    backBtnSO.setParent(this.catalogueViewSO);
    const backBtn = backBtnSO.createComponent(Button.getTypeName()) as Button;
    const backEc = backBtnSO.createComponent(ElementContent.getTypeName()) as ElementContent;
    applySecondaryWhiteButton(backBtn, backEc, "◄ RETURN TO MAIN MENU");
    backBtn.onTriggerUp.add(() => {
      this.showWelcome();
    });
    const backItem = backBtnSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    backItem.alignSelf = FlexAlignSelf.Center;
    backItem.marginTop = 0.4;
    backItem.overrideHeight = BUTTON_HEIGHT_ACTION;
    backItem.overrideWidth = 30.0;

    this.catalogueViewSO.enabled = false;
  }

  private createCatalogueRow(parent: SceneObject, name: string): SceneObject {
    const rowSO = global.scene.createSceneObject(name);
    rowSO.setParent(parent);
    const flex = rowSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Row;
    flex.justifyContent = FlexJustify.SpaceBetween;
    flex.alignItems = FlexAlign.Stretch;
    flex.columnGap = 1.0;
    flex.width = 30.0;
    flex.height = 5.2;
    const item = rowSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    item.alignSelf = FlexAlignSelf.Center;
    item.marginTop = 0.2;
    return rowSO;
  }

  private buildCategoryCard(
    parent: SceneObject,
    id: string,
    title: string,
    badgeText: string,
    isSupported: boolean,
    onSelect: () => void
  ): void {
    const cardSO = global.scene.createSceneObject("Card_Cat_" + id);
    cardSO.setParent(parent);

    const flex = cardSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Column;
    flex.justifyContent = FlexJustify.SpaceBetween;
    flex.alignItems = FlexAlign.Stretch;
    flex.paddingTop = 0.3;
    flex.paddingBottom = 0.3;
    flex.paddingLeft = 0.5;
    flex.paddingRight = 0.5;
    flex.width = 14.5;
    flex.height = -1;

    const item = cardSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    item.flexGrow = 1;

    const titleSO = global.scene.createSceneObject("CatTitle_" + id);
    titleSO.setParent(cardSO);
    const titleTextComp = titleSO.createComponent("Component.Text") as Text;
    titleTextComp.depthTest = true;
    titleTextComp.size = FONT_SIZE_SUBTITLE;
    titleTextComp.text = title;
    titleTextComp.horizontalAlignment = HorizontalAlignment.Center;
    titleTextComp.verticalAlignment = VerticalAlignment.Center;
    titleTextComp.horizontalOverflow = HorizontalOverflow.Wrap;
    applyWhiteText(titleTextComp, FONT_SIZE_SUBTITLE);
    titleSO.createComponent(FlexItem.getTypeName());

    const badgeSO = global.scene.createSceneObject("CatBadge_" + id);
    badgeSO.setParent(cardSO);
    const badgeTextComp = badgeSO.createComponent("Component.Text") as Text;
    badgeTextComp.depthTest = true;
    badgeTextComp.size = FONT_SIZE_METADATA;
    badgeTextComp.text = badgeText;
    badgeTextComp.horizontalAlignment = HorizontalAlignment.Center;
    if (badgeTextComp.textFill) {
      badgeTextComp.textFill.color = isSupported ? COLOR_ICE_BLUE : COLOR_SLATE_BLUE;
    }
    badgeSO.createComponent(FlexItem.getTypeName());

    const btnSO = global.scene.createSceneObject("Btn_Cat_" + id);
    btnSO.setParent(cardSO);
    const btn = btnSO.createComponent(Button.getTypeName()) as Button;
    const ec = btnSO.createComponent(ElementContent.getTypeName()) as ElementContent;
    if (isSupported) {
      applyPrimaryWhiteButton(btn, ec, "OPEN");
    } else {
      applySecondaryWhiteButton(btn, ec, "ROADMAP");
    }
    ec.textSize = FONT_SIZE_BUTTON_SECONDARY;
    btn.onTriggerUp.add(() => {
      onSelect();
    });
    const btnItem = btnSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    btnItem.overrideHeight = BUTTON_HEIGHT_COMPACT;
  }

  // ── FEATURE MODAL VIEWS (SCAN, UPLOAD, MANUALS, CATEGORY) ──────────────────
  private buildModalViews(): void {
    // 1. Scan Roadmap Modal (FW-03)
    this.modalScanSO = global.scene.createSceneObject("View_ModalScan");
    this.modalScanSO.setParent(this.contentHost!);
    this.modalScanSO.getTransform().setLocalPosition(new vec3(0, 0, 1.8));
    this.buildGenericModal(
      this.modalScanSO,
      "REAL-WORLD OBJECT RECOGNITION",
      "• IN DEVELOPMENT — MILESTONE FW-03 •",
      COLOR_SAFETY_AMBER,
      "Spectacles camera frame capture and on-device / cloud computer vision models are scheduled for investigation in Milestone FW-03.\n\n" +
        "Planned capabilities:\n" +
        "• Automatic remote chassis and button configuration identification\n" +
        "• Wire gauge, insulation strip length, and solder fillet verification\n\n" +
        "Capability Honesty: No fake computer vision or bounding boxes are simulated. Experience the verified simulated flow below.",
      "Btn_ModalScan_Back",
      "◄ RETURN TO MENU",
      () => this.showWelcome(),
      "Btn_ModalScan_TryRemote",
      "TRY SIMULATED REMOTE (33709)",
      () => {
        this.pendingTrackIndex = 0;
        this.onTrackSelected.invoke(0);
      }
    );
    this.modalScanSO.enabled = false;

    // 2. Upload Roadmap Modal (Route D / FW-04)
    this.modalUploadSO = global.scene.createSceneObject("View_ModalUpload");
    this.modalUploadSO.setParent(this.contentHost!);
    this.modalUploadSO.getTransform().setLocalPosition(new vec3(0, 0, 1.8));
    this.buildGenericModal(
      this.modalUploadSO,
      "CLOUD MANUAL INGESTION (ROUTE D)",
      "• IN DEVELOPMENT — MILESTONE FW-04 •",
      COLOR_PRIMARY_BLUE,
      "The approved Route D architecture establishes companion web uploading and cloud OCR text extraction as the preferred strategic planning direction (ADR-011).\n\n" +
        "Technical feasibility will be prototyped in Milestone FW-04:\n" +
        "1. Upload manufacturer PDF via companion web portal\n" +
        "2. Cloud OCR extracts structured procedural schemas\n" +
        "3. Wearable streams preprocessed high-contrast pages\n\n" +
        "Capability Honesty: No fake file picker or mock upload is simulated in this build.",
      "Btn_ModalUpload_Back",
      "◄ RETURN TO MENU",
      () => this.showWelcome()
    );
    this.modalUploadSO.enabled = false;

    // 3. My Manuals Personal Library Modal
    this.modalManualsSO = global.scene.createSceneObject("View_ModalManuals");
    this.modalManualsSO.setParent(this.contentHost!);
    this.modalManualsSO.getTransform().setLocalPosition(new vec3(0, 0, 1.8));
    this.buildGenericModal(
      this.modalManualsSO,
      "MY MANUALS • PERSONAL REPAIR LIBRARY",
      "• COMING SOON — 0 USER MANUALS CACHED •",
      COLOR_SLATE_BLUE,
      "Personal manual caching and on-device offline storage are planned for future platform updates.\n\n" +
        "Pre-bundled verified manufacturer guides in this build:\n" +
        "• GE / Jasco 33709 Universal Remote (Jasco 33709 v5 Instruction Manual)\n" +
        "• Western Union Wire Splice & Solder (Weller p.14 & NASA-STD-8739.4 §19.7)\n\n" +
        "All procedures are grounded in authoritative technical documentation.",
      "Btn_ModalManuals_Back",
      "◄ RETURN TO MENU",
      () => this.showWelcome()
    );
    this.modalManualsSO.enabled = false;

    // 4. Category Expansion Modal
    this.modalCatSO = global.scene.createSceneObject("View_ModalCategory");
    this.modalCatSO.setParent(this.contentHost!);
    this.modalCatSO.getTransform().setLocalPosition(new vec3(0, 0, 1.8));
    const flex = this.modalCatSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Column;
    flex.justifyContent = FlexJustify.Start;
    flex.alignItems = FlexAlign.Stretch;
    flex.rowGap = 0.6;
    flex.width = -1;
    flex.height = -1;
    this.modalCatSO.createComponent(FlexItem.getTypeName());

    const titleSO = global.scene.createSceneObject("ModalCatTitle");
    titleSO.setParent(this.modalCatSO);
    this.modalCatTitleText = titleSO.createComponent("Component.Text") as Text;
    this.modalCatTitleText.depthTest = true;
    this.modalCatTitleText.size = FONT_SIZE_INSTRUCTION_TITLE;
    this.modalCatTitleText.text = "CATEGORY ROADMAP";
    this.modalCatTitleText.horizontalAlignment = HorizontalAlignment.Center;
    applyWhiteText(this.modalCatTitleText, FONT_SIZE_INSTRUCTION_TITLE);
    titleSO.createComponent(FlexItem.getTypeName());

    const badgeSO = global.scene.createSceneObject("ModalCatBadge");
    badgeSO.setParent(this.modalCatSO);
    const badgeText = badgeSO.createComponent("Component.Text") as Text;
    badgeText.depthTest = true;
    badgeText.size = FONT_SIZE_METADATA;
    badgeText.text = "• PLATFORM EXPANSION ROADMAP •";
    if (badgeText.textFill) badgeText.textFill.color = COLOR_ICE_BLUE;
    badgeSO.createComponent(FlexItem.getTypeName());

    const bodySO = global.scene.createSceneObject("ModalCatBody");
    bodySO.setParent(this.modalCatSO);
    this.modalCatBodyText = bodySO.createComponent("Component.Text") as Text;
    this.modalCatBodyText.depthTest = true;
    this.modalCatBodyText.size = FONT_SIZE_METADATA;
    this.modalCatBodyText.text = "Details pending...";
    this.modalCatBodyText.horizontalAlignment = HorizontalAlignment.Left;
    this.modalCatBodyText.verticalAlignment = VerticalAlignment.Top;
    this.modalCatBodyText.horizontalOverflow = HorizontalOverflow.Wrap;
    (this.modalCatBodyText as any).layoutRect = Rect.create(-15.5, 15.5, -4.5, 4.5);
    applySupportingText(this.modalCatBodyText, FONT_SIZE_METADATA);
    const bodyItem = bodySO.createComponent(FlexItem.getTypeName()) as FlexItem;
    bodyItem.overrideHeight = 9.0;

    const backBtnSO = global.scene.createSceneObject("Btn_ModalCat_Back");
    backBtnSO.setParent(this.modalCatSO);
    const backBtn = backBtnSO.createComponent(Button.getTypeName()) as Button;
    const backEc = backBtnSO.createComponent(ElementContent.getTypeName()) as ElementContent;
    applyPrimaryWhiteButton(backBtn, backEc, "◄ RETURN TO CATALOGUE");
    backBtn.onTriggerUp.add(() => {
      this.showCatalogue();
    });
    const backItem = backBtnSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    backItem.alignSelf = FlexAlignSelf.Center;
    backItem.marginTop = 0.8;
    backItem.overrideHeight = BUTTON_HEIGHT_ACTION;

    this.modalCatSO.enabled = false;
  }

  private buildGenericModal(
    parent: SceneObject,
    title: string,
    badge: string,
    badgeColor: vec4,
    body: string,
    btnBackName: string,
    btnBackLabel: string,
    onBack: () => void,
    btnActionName?: string,
    btnActionLabel?: string,
    onAction?: () => void
  ): void {
    const flex = parent.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Column;
    flex.justifyContent = FlexJustify.Start;
    flex.alignItems = FlexAlign.Stretch;
    flex.rowGap = 0.6;
    flex.width = -1;
    flex.height = -1;
    parent.createComponent(FlexItem.getTypeName());

    const titleSO = global.scene.createSceneObject("ModalTitle");
    titleSO.setParent(parent);
    const titleText = titleSO.createComponent("Component.Text") as Text;
    titleText.depthTest = true;
    titleText.size = FONT_SIZE_INSTRUCTION_TITLE;
    titleText.text = title;
    titleText.horizontalAlignment = HorizontalAlignment.Center;
    applyWhiteText(titleText, FONT_SIZE_INSTRUCTION_TITLE);
    const titleItem = titleSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    titleItem.overrideHeight = 2.2;

    const badgeSO = global.scene.createSceneObject("ModalBadge");
    badgeSO.setParent(parent);
    const badgeTextComp = badgeSO.createComponent("Component.Text") as Text;
    badgeTextComp.depthTest = true;
    badgeTextComp.size = FONT_SIZE_METADATA;
    badgeTextComp.text = badge;
    if (badgeTextComp.textFill) badgeTextComp.textFill.color = badgeColor;
    const badgeItem = badgeSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    badgeItem.overrideHeight = 1.6;

    const bodySO = global.scene.createSceneObject("ModalBody");
    bodySO.setParent(parent);
    const bodyText = bodySO.createComponent("Component.Text") as Text;
    bodyText.depthTest = true;
    bodyText.size = FONT_SIZE_METADATA;
    bodyText.text = body;
    bodyText.horizontalAlignment = HorizontalAlignment.Left;
    bodyText.verticalAlignment = VerticalAlignment.Top;
    bodyText.horizontalOverflow = HorizontalOverflow.Wrap;
    (bodyText as any).layoutRect = Rect.create(-15.5, 15.5, -4.5, 4.5);
    applySupportingText(bodyText, FONT_SIZE_METADATA);
    const bodyItem = bodySO.createComponent(FlexItem.getTypeName()) as FlexItem;
    bodyItem.overrideHeight = 9.0;

    const btnRowSO = global.scene.createSceneObject("ModalBtnRow");
    btnRowSO.setParent(parent);
    const btnRowFlex = btnRowSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    btnRowFlex.direction = FlexDirection.Row;
    btnRowFlex.justifyContent = FlexJustify.Center;
    btnRowFlex.columnGap = 1.0;
    btnRowFlex.width = -1;
    btnRowFlex.height = BUTTON_HEIGHT_ACTION;
    const btnRowItem = btnRowSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    btnRowItem.marginTop = 0.8;

    const backBtnSO = global.scene.createSceneObject(btnBackName);
    backBtnSO.setParent(btnRowSO);
    const backBtn = backBtnSO.createComponent(Button.getTypeName()) as Button;
    const backEc = backBtnSO.createComponent(ElementContent.getTypeName()) as ElementContent;
    applySecondaryWhiteButton(backBtn, backEc, btnBackLabel);
    backBtn.onTriggerUp.add(() => onBack());
    const backItem = backBtnSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    backItem.overrideHeight = BUTTON_HEIGHT_ACTION;

    if (btnActionName && btnActionLabel && onAction) {
      const actBtnSO = global.scene.createSceneObject(btnActionName);
      actBtnSO.setParent(btnRowSO);
      const actBtn = actBtnSO.createComponent(Button.getTypeName()) as Button;
      const actEc = actBtnSO.createComponent(ElementContent.getTypeName()) as ElementContent;
      applyPrimaryWhiteButton(actBtn, actEc, btnActionLabel);
      actBtn.onTriggerUp.add(() => onAction());
      const actItem = actBtnSO.createComponent(FlexItem.getTypeName()) as FlexItem;
      actItem.overrideHeight = BUTTON_HEIGHT_ACTION;
    }
  }

  // ── PRESERVED SCREEN: SIMULATED RECOGNITION ────────────────────────────────
  private buildRecognitionView(): void {
    this.recognitionViewSO = global.scene.createSceneObject("View_Recognition");
    this.recognitionViewSO.setParent(this.contentHost!);
    this.recognitionViewSO.getTransform().setLocalPosition(new vec3(0, 0, 1.8));

    this.recognitionFlex = this.recognitionViewSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    this.recognitionFlex.direction = FlexDirection.Column;
    this.recognitionFlex.justifyContent = FlexJustify.Start;
    this.recognitionFlex.alignItems = FlexAlign.Stretch;
    this.recognitionFlex.rowGap = 0.4;
    this.recognitionFlex.width = -1;
    this.recognitionFlex.height = -1;
    this.recognitionViewSO.createComponent(FlexItem.getTypeName());

    // 1. Header Badge
    const headerSO = global.scene.createSceneObject("RecogHeader");
    headerSO.setParent(this.recognitionViewSO);
    this.recogHeaderBadge = headerSO.createComponent("Component.Text") as Text;
    this.recogHeaderBadge.depthTest = true;
    this.recogHeaderBadge.size = FONT_SIZE_DISPLAY;
    this.recogHeaderBadge.text = "FIND OBJECT • UNIVERSAL REMOTE";
    this.recogHeaderBadge.horizontalAlignment = HorizontalAlignment.Center;
    this.recogHeaderBadge.verticalAlignment = VerticalAlignment.Center;
    (this.recogHeaderBadge as any).layoutRect = Rect.create(-15.5, 15.5, -1.2, 1.2);
    applyWhiteText(this.recogHeaderBadge, FONT_SIZE_DISPLAY);
    const headerItem = headerSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    headerItem.overrideHeight = 2.4;

    // 2. Clear Simulation Disclosure Badge
    const badgeSO = global.scene.createSceneObject("RecogDisclaimer");
    badgeSO.setParent(this.recognitionViewSO);
    const badgeText = badgeSO.createComponent("Component.Text") as Text;
    badgeText.depthTest = true;
    badgeText.size = FONT_SIZE_METADATA;
    badgeText.text = "• SIMULATED RECOGNITION (MVP) •";
    badgeText.horizontalAlignment = HorizontalAlignment.Center;
    badgeText.verticalAlignment = VerticalAlignment.Center;
    (badgeText as any).layoutRect = Rect.create(-15.5, 15.5, -0.8, 0.8);
    if (badgeText.textFill) badgeText.textFill.color = COLOR_SAFETY_AMBER;
    const badgeItem = badgeSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    badgeItem.overrideHeight = 1.4;

    // 3. User Instruction
    const instructSO = global.scene.createSceneObject("RecogInstruction");
    instructSO.setParent(this.recognitionViewSO);
    this.recogInstructionText = instructSO.createComponent("Component.Text") as Text;
    this.recogInstructionText.depthTest = true;
    this.recogInstructionText.size = FONT_SIZE_BODY_INSTRUCTION;
    this.recogInstructionText.text =
      "Align your view toward your GE / Jasco 33709 universal remote and click Find Object.";
    this.recogInstructionText.horizontalAlignment = HorizontalAlignment.Center;
    this.recogInstructionText.verticalAlignment = VerticalAlignment.Center;
    this.recogInstructionText.horizontalOverflow = HorizontalOverflow.Wrap;
    (this.recogInstructionText as any).layoutRect = Rect.create(-15.5, 15.5, -1.6, 1.6);
    applySupportingText(this.recogInstructionText, FONT_SIZE_BODY_INSTRUCTION);
    const instructItem = instructSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    instructItem.overrideHeight = 2.8;
    instructItem.marginTop = 0.2;

    // 4. Stand-in Box Representation
    const standinSO = global.scene.createSceneObject("RecogStandinBox");
    standinSO.setParent(this.recognitionViewSO);
    this.recogStandinText = standinSO.createComponent("Component.Text") as Text;
    this.recogStandinText.depthTest = true;
    this.recogStandinText.size = FONT_SIZE_BODY_SECONDARY;
    this.recogStandinText.text =
      "┌─────────────────────────────┐\n│   GE 33709 REMOTE STAND-IN  │\n│        [18 x 5 cm proxy]    │\n└─────────────────────────────┘";
    this.recogStandinText.horizontalAlignment = HorizontalAlignment.Center;
    this.recogStandinText.verticalAlignment = VerticalAlignment.Center;
    (this.recogStandinText as any).layoutRect = Rect.create(-15.5, 15.5, -2.0, 2.0);
    if (this.recogStandinText.textFill) this.recogStandinText.textFill.color = COLOR_ICE_BLUE;
    const standinItem = standinSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    standinItem.overrideHeight = 3.6;
    standinItem.marginTop = 0.2;
    standinItem.marginBottom = 0.3;

    // 5. Trigger Action Button (Find Object / Place Workbench)
    const actionBtnSO = global.scene.createSceneObject("Btn_RecogAction");
    actionBtnSO.setParent(this.recognitionViewSO);
    const actionBtn = actionBtnSO.createComponent(Button.getTypeName()) as Button;
    this.recogActionBtnContent = actionBtnSO.createComponent(ElementContent.getTypeName()) as ElementContent;
    applyPrimaryWhiteButton(actionBtn, this.recogActionBtnContent, "🔍 FIND GE 33709");
    this.recogActionBtnContent.textSize = FONT_SIZE_BODY_SECONDARY;
    actionBtn.onTriggerUp.add(() => {
      this.triggerSimulatedRecognitionAction();
    });
    const actionItem = actionBtnSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    actionItem.alignSelf = FlexAlignSelf.Center;
    actionItem.overrideHeight = BUTTON_HEIGHT_ACTION;
    actionItem.overrideWidth = 26.0;
    actionItem.marginBottom = 0.3;

    // 6. Feedback Box (Appears after action)
    this.recogFeedbackBoxSO = global.scene.createSceneObject("RecogFeedbackBox");
    this.recogFeedbackBoxSO.setParent(this.recognitionViewSO);
    this.recogFeedbackText = this.recogFeedbackBoxSO.createComponent("Component.Text") as Text;
    this.recogFeedbackText.depthTest = true;
    this.recogFeedbackText.size = FONT_SIZE_METADATA;
    this.recogFeedbackText.text = "✓ Remote Identified: GE 33709 (Supported Model • Simulated Recognition)";
    this.recogFeedbackText.horizontalAlignment = HorizontalAlignment.Center;
    this.recogFeedbackText.verticalAlignment = VerticalAlignment.Center;
    this.recogFeedbackText.horizontalOverflow = HorizontalOverflow.Wrap;
    (this.recogFeedbackText as any).layoutRect = Rect.create(-15.5, 15.5, -1.4, 1.4);
    if (this.recogFeedbackText.textFill) this.recogFeedbackText.textFill.color = COLOR_SUCCESS_MINT;
    const feedbackItem = this.recogFeedbackBoxSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    feedbackItem.overrideHeight = 2.4;
    feedbackItem.marginTop = 0.3;
    feedbackItem.marginBottom = 0.4;
    this.recogFeedbackBoxSO.enabled = false;

    // 7. Explicit "START LESSON" Action Button (brought down below feedback text with generous spacing)
    this.recogStartLessonBtnSO = global.scene.createSceneObject("Btn_StartLesson");
    this.recogStartLessonBtnSO.setParent(this.recognitionViewSO);
    const startLessonBtn = this.recogStartLessonBtnSO.createComponent(Button.getTypeName()) as Button;
    const startLessonEc = this.recogStartLessonBtnSO.createComponent(ElementContent.getTypeName()) as ElementContent;
    applyPrimaryWhiteButton(startLessonBtn, startLessonEc, "► START GUIDED PROCEDURE");
    startLessonEc.textSize = FONT_SIZE_BUTTON_NAV;
    startLessonBtn.onTriggerUp.add(() => {
      this.onStartLessonTriggered.invoke(this.pendingTrackIndex);
    });
    const startLessonItem = this.recogStartLessonBtnSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    startLessonItem.alignSelf = FlexAlignSelf.Center;
    startLessonItem.overrideHeight = BUTTON_HEIGHT_NAV;
    startLessonItem.overrideWidth = 28.0;
    startLessonItem.marginTop = 0.8;
    startLessonItem.marginBottom = 0.3;
    this.recogStartLessonBtnSO.enabled = false;

    // 8. Return to Welcome Button
    const backBtnSO = global.scene.createSceneObject("Btn_RecogBack");
    backBtnSO.setParent(this.recognitionViewSO);
    const backBtn = backBtnSO.createComponent(Button.getTypeName()) as Button;
    const backEc = backBtnSO.createComponent(ElementContent.getTypeName()) as ElementContent;
    applySecondaryWhiteButton(backBtn, backEc, "◄ BACK TO TRACK SELECTION");
    backEc.textSize = FONT_SIZE_BUTTON_SECONDARY;
    backBtn.onTriggerUp.add(() => {
      this.showWelcome();
      this.onBackToWelcome.invoke();
    });
    const backItem = backBtnSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    backItem.alignSelf = FlexAlignSelf.Center;
    backItem.overrideHeight = BUTTON_HEIGHT_ACTION;
    backItem.overrideWidth = 28.0;
    backItem.marginTop = 0.5;

    this.recognitionViewSO.enabled = false;
  }

  // ── PRESERVED SCREEN: UNSUPPORTED MODEL (GE 33711 GUARD) ───────────────────
  private buildUnsupportedView(): void {
    this.unsupportedViewSO = global.scene.createSceneObject("View_UnsupportedModel");
    this.unsupportedViewSO.setParent(this.contentHost!);
    this.unsupportedViewSO.getTransform().setLocalPosition(new vec3(0, 0, 1.8));

    const flex = this.unsupportedViewSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Column;
    flex.justifyContent = FlexJustify.Start;
    flex.alignItems = FlexAlign.Stretch;
    flex.rowGap = 0.6;
    flex.width = -1;
    flex.height = -1;
    this.unsupportedViewSO.createComponent(FlexItem.getTypeName());

    // 1. Header / Title
    const headerSO = global.scene.createSceneObject("UnsupportedHeader");
    headerSO.setParent(this.unsupportedViewSO);
    const headerText = headerSO.createComponent("Component.Text") as Text;
    headerText.depthTest = true;
    headerText.size = FONT_SIZE_DISPLAY;
    headerText.text = "MODEL UNSUPPORTED • GE 33711";
    headerText.horizontalAlignment = HorizontalAlignment.Center;
    headerText.verticalAlignment = VerticalAlignment.Center;
    (headerText as any).layoutRect = Rect.create(-15.5, 15.5, -1.2, 1.2);
    applyWhiteText(headerText, FONT_SIZE_DISPLAY);
    const headerItem = headerSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    headerItem.overrideHeight = 2.4;

    // 2. Notice Banner
    const noticeSO = global.scene.createSceneObject("UnsupportedNotice");
    noticeSO.setParent(this.unsupportedViewSO);
    const noticeText = noticeSO.createComponent("Component.Text") as Text;
    noticeText.depthTest = true;
    noticeText.size = FONT_SIZE_SAFETY_ALERT;
    noticeText.text = "⚠️ GE / Jasco 33711 is not supported in this release.";
    noticeText.horizontalAlignment = HorizontalAlignment.Center;
    noticeText.verticalAlignment = VerticalAlignment.Center;
    (noticeText as any).layoutRect = Rect.create(-15.5, 15.5, -0.9, 0.9);
    if (noticeText.textFill) noticeText.textFill.color = COLOR_SAFETY_AMBER;
    const noticeItem = noticeSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    noticeItem.overrideHeight = 1.8;
    noticeItem.marginTop = 0.4;

    // 3. Body Explanation
    const bodySO = global.scene.createSceneObject("UnsupportedBody");
    bodySO.setParent(this.unsupportedViewSO);
    const bodyText = bodySO.createComponent("Component.Text") as Text;
    bodyText.depthTest = true;
    bodyText.size = FONT_SIZE_BODY_SECONDARY;
    bodyText.text =
      "The instructional procedure for the GE 33711 Designer Series remote is not included in Milestone 3.2. Only the GE 33709 model is currently supported.\n\n" +
      "• DEC-M3.2-01: GE 33711 instruction deferred to future milestone.\n" +
      "• No fabricated pairing codes or unverified instructions.\n\n" +
      "Please return to track selection to proceed with the supported GE 33709 remote or workshop track.";
    bodyText.horizontalAlignment = HorizontalAlignment.Left;
    bodyText.verticalAlignment = VerticalAlignment.Top;
    bodyText.horizontalOverflow = HorizontalOverflow.Wrap;
    (bodyText as any).layoutRect = Rect.create(-15.5, 15.5, -4.5, 4.5);
    applySupportingText(bodyText, 28);
    const bodyItem = bodySO.createComponent(FlexItem.getTypeName()) as FlexItem;
    bodyItem.overrideHeight = 8.5;

    // 4. Return to Menu Button
    const backBtnSO = global.scene.createSceneObject("Btn_UnsupportedBack");
    backBtnSO.setParent(this.unsupportedViewSO);
    const backBtn = backBtnSO.createComponent(Button.getTypeName()) as Button;
    const backEc = backBtnSO.createComponent(ElementContent.getTypeName()) as ElementContent;
    applySecondaryWhiteButton(backBtn, backEc, "◄ RETURN TO TRACK SELECTION");
    backEc.textSize = 28;
    backBtn.onTriggerUp.add(() => {
      this.showWelcome();
      this.onBackToWelcome.invoke();
    });
    const backItem = backBtnSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    backItem.alignSelf = FlexAlignSelf.Center;
    backItem.marginTop = 0.8;
    backItem.overrideHeight = BUTTON_HEIGHT_ACTION;

    this.unsupportedViewSO.enabled = false;
  }

  // ── VIEW SWITCHING METHODS ─────────────────────────────────────────────────

  public showWelcome(): void {
    this.isRecognitionSimulated = false;
    this.hideAllSubViews();
    this.positionPanelInFrontOfCamera(CAMERA_DISTANCE_STANDARD, CAMERA_Y_OFFSET_STANDARD);
    if (this.welcomeRoot) this.welcomeRoot.enabled = true;
    if (this.welcomeViewSO) this.welcomeViewSO.enabled = true;
    this.reflow();
  }

  public showCatalogue(): void {
    this.hideAllSubViews();
    this.positionPanelInFrontOfCamera(CAMERA_DISTANCE_STANDARD, CAMERA_Y_OFFSET_STANDARD);
    if (this.welcomeRoot) this.welcomeRoot.enabled = true;
    if (this.catalogueViewSO) this.catalogueViewSO.enabled = true;
    this.reflow();
  }

  public showModalScan(): void {
    this.hideAllSubViews();
    this.positionPanelInFrontOfCamera(CAMERA_DISTANCE_STANDARD, CAMERA_Y_OFFSET_STANDARD);
    if (this.welcomeRoot) this.welcomeRoot.enabled = true;
    if (this.modalScanSO) this.modalScanSO.enabled = true;
    this.reflow();
  }

  public showModalUpload(): void {
    this.hideAllSubViews();
    this.positionPanelInFrontOfCamera(CAMERA_DISTANCE_STANDARD, CAMERA_Y_OFFSET_STANDARD);
    if (this.welcomeRoot) this.welcomeRoot.enabled = true;
    if (this.modalUploadSO) this.modalUploadSO.enabled = true;
    this.reflow();
  }

  public showModalManuals(): void {
    this.hideAllSubViews();
    this.positionPanelInFrontOfCamera(CAMERA_DISTANCE_STANDARD, CAMERA_Y_OFFSET_STANDARD);
    if (this.welcomeRoot) this.welcomeRoot.enabled = true;
    if (this.modalManualsSO) this.modalManualsSO.enabled = true;
    this.reflow();
  }

  public showModalCategory(categoryName: string, categoryDescription: string): void {
    this.hideAllSubViews();
    this.positionPanelInFrontOfCamera(CAMERA_DISTANCE_STANDARD, CAMERA_Y_OFFSET_STANDARD);
    if (this.welcomeRoot) this.welcomeRoot.enabled = true;
    if (this.modalCatSO) this.modalCatSO.enabled = true;

    if (this.modalCatTitleText) {
      this.modalCatTitleText.text = categoryName.toUpperCase() + " REPAIR";
    }
    if (this.modalCatBodyText) {
      this.modalCatBodyText.text =
        "Engineering Roadmap (Future Milestone):\n\n" +
        categoryDescription + "\n\n" +
        "How it will work:\n" +
        "• Point Spectacles at equipment model badge for recognition\n" +
        "• Route D Manual Intelligence streams schematics to wearable\n" +
        "• Spatial AR anchors highlight disassembly screws and test points\n\n" +
        "Capability Honesty: Only GE 33709 Remote and Wire Splicing are currently active.";
    }
    this.reflow();
  }

  public showUnsupportedModel(modelName: string): void {
    this.hideAllSubViews();
    this.positionPanelInFrontOfCamera(CAMERA_DISTANCE_STANDARD, CAMERA_Y_OFFSET_STANDARD);
    if (this.welcomeRoot) this.welcomeRoot.enabled = true;
    if (this.unsupportedViewSO) this.unsupportedViewSO.enabled = true;
    this.reflow();
  }

  public showRecognition(trackIndex: number): void {
    this.pendingTrackIndex = trackIndex;
    this.isRecognitionSimulated = false;
    this.hideAllSubViews();
    this.positionPanelInFrontOfCamera(CAMERA_DISTANCE_STANDARD, CAMERA_Y_OFFSET_STANDARD);

    if (this.welcomeRoot) this.welcomeRoot.enabled = true;
    if (this.recognitionViewSO) this.recognitionViewSO.enabled = true;

    if (this.recogFeedbackBoxSO) this.recogFeedbackBoxSO.enabled = false;
    if (this.recogStartLessonBtnSO) this.recogStartLessonBtnSO.enabled = false;

    if (trackIndex === 0) {
      // Remote Track (GE 33709)
      if (this.recogHeaderBadge) this.recogHeaderBadge.text = "FIND OBJECT • UNIVERSAL REMOTE";
      if (this.recogInstructionText) {
        this.recogInstructionText.text =
          "Align your view toward your GE / Jasco 33709 universal remote and click Find Object.";
      }
      if (this.recogStandinText) {
        this.recogStandinText.text =
          "┌─────────────────────────────┐\n│   GE 33709 REMOTE STAND-IN  │\n│        [18 x 5 cm proxy]    │\n└─────────────────────────────┘";
      }
      if (this.recogActionBtnContent) this.recogActionBtnContent.text = "🔍 FIND GE 33709";
    } else {
      // Workshop Track (Wire Joining)
      if (this.recogHeaderBadge) this.recogHeaderBadge.text = "PLACE WORKBENCH • WIRE JOINING";
      if (this.recogInstructionText) {
        this.recogInstructionText.text =
          "Align your view toward a clear, non-energized tabletop surface and click Place Workbench.";
      }
      if (this.recogStandinText) {
        this.recogStandinText.text =
          "┌─────────────────────────────┐\n│    WORKBENCH SURFACE PROXY  │\n│       [55 x 36 cm surface]  │\n└─────────────────────────────┘";
      }
      if (this.recogActionBtnContent) this.recogActionBtnContent.text = "📐 PLACE WORKBENCH";
    }

    if (this.recognitionFlex) {
      this.recognitionFlex.refreshChildren();
      this.recognitionFlex.forceLayout();
    }
    this.reflow();
  }

  public triggerSimulatedRecognitionAction(): void {
    this.isRecognitionSimulated = true;

    if (this.recogFeedbackBoxSO && this.recogFeedbackText) {
      this.recogFeedbackBoxSO.enabled = true;
      if (this.pendingTrackIndex === 0) {
        this.recogFeedbackText.text = "✓ Remote Identified: GE 33709 (Supported Model • Simulated Recognition)";
      } else {
        this.recogFeedbackText.text = "✓ Workbench Placed: Clear non-energized surface aligned (Simulated Placement)";
      }
    }

    if (this.recogStartLessonBtnSO) {
      this.recogStartLessonBtnSO.enabled = true;
    }

    if (this.recognitionFlex) {
      this.recognitionFlex.refreshChildren();
      this.recognitionFlex.forceLayout();
    }

    this.reflow();
    this.onRecognitionActionTriggered.invoke(this.pendingTrackIndex);
  }

  private hideAllSubViews(): void {
    if (this.welcomeViewSO) this.welcomeViewSO.enabled = false;
    if (this.catalogueViewSO) this.catalogueViewSO.enabled = false;
    if (this.modalScanSO) this.modalScanSO.enabled = false;
    if (this.modalUploadSO) this.modalUploadSO.enabled = false;
    if (this.modalManualsSO) this.modalManualsSO.enabled = false;
    if (this.modalCatSO) this.modalCatSO.enabled = false;
    if (this.recognitionViewSO) this.recognitionViewSO.enabled = false;
    if (this.unsupportedViewSO) this.unsupportedViewSO.enabled = false;
  }

  private reflow(): void {
    if (this.recognitionFlex && this.recognitionViewSO && this.recognitionViewSO.enabled) {
      this.recognitionFlex.refreshChildren();
      this.recognitionFlex.forceLayout();
    }
    if (this.flexRoot) {
      this.flexRoot.markDirty();
      this.flexRoot.forceLayout();
    }
  }

  public hide(): void {
    if (this.welcomeRoot) this.welcomeRoot.enabled = false;
  }

  public getRoot(): SceneObject | null {
    return this.welcomeRoot;
  }
}
