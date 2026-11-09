/**
 * FixWhatMentorPanel.ts
 *
 * Implements the Spatial Mentor Panel HUD (Screens 04, 05, 06) for FixWhat? AR.
 * Milestone UIUX-03 Stage B1 Visual Defect Correction:
 * - Single-tier sequential FlexLayout (zero nested measurement bugs)
 * - Clean 2-Row Header Layout (Tracks, Menu, Phase, Step counter separated)
 * - Explicit Layout2D FlexItem sizing (zero overlap across short/long text)
 * - Dedicated Why? explanation container with reserved vertical budget
 * - Fully isolated non-overlapping Caution & Workshop Safety containers
 * - Cleanly separated Completion Screen with dedicated Repeat / Welcome actions
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
  FlexDirection,
  FlexJustify,
} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexTypes";
import Event from "SpectaclesInteractionKit.lspkg/Utils/Event";
import { Interactable } from "SpectaclesInteractionKit.lspkg/Components/Interaction/Interactable/Interactable";
import { IMAGE_MATERIAL_ASSET } from "SpectaclesUIKit.lspkg/Scripts/Utility/Assets";
import {
  ManualProcedure,
  StepDefinition,
  isWorkshopProcedure,
  isRemoteProcedure,
} from "../Types/ProcedureTypes";
import { getGuidanceVisual } from "../Data/FixWhatVisualRegistry";

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
  COLOR_PAUSED_ACCENT,
  PANEL_WIDTH_STANDARD,
  PANEL_HEIGHT_STANDARD,
  CONTENT_WIDTH_STANDARD,
  CONTENT_HEIGHT_STANDARD,
  CAMERA_DISTANCE_STANDARD,
  CAMERA_Y_OFFSET_STANDARD,
  DIAGRAM_WIDTH,
  DIAGRAM_HEIGHT,
  DIAGRAM_CONTAINER_WIDTH,
  DIAGRAM_CONTAINER_HEIGHT,
  MODAL_WIDTH_STANDARD,
  MODAL_HEIGHT_STANDARD,
  MODAL_DIAGRAM_WIDTH,
  MODAL_DIAGRAM_HEIGHT,
  BUTTON_NAV_WIDTH,
  BUTTON_NAV_GAP,
  BUTTON_HEIGHT_NAV,
  BUTTON_HEIGHT_ACTION,
  BUTTON_HEIGHT_CARD,
  BUTTON_HEIGHT_MODAL,
  BUTTON_HEIGHT_COMPACT,
  BUTTON_HEIGHT_CHIP,
  BUTTON_HEIGHT_SAFETY,
  FONT_SIZE_DISPLAY,
  FONT_SIZE_SECTION_HEADING,
  FONT_SIZE_INSTRUCTION_TITLE,
  FONT_SIZE_BODY_INSTRUCTION,
  FONT_SIZE_BUTTON_NAV,
  FONT_SIZE_BODY_SECONDARY,
  FONT_SIZE_SUBTITLE,
  FONT_SIZE_CARD_DESC,
  FONT_SIZE_METADATA,
  FONT_SIZE_BUTTON_PRIMARY,
  FONT_SIZE_BUTTON_SECONDARY,
  FONT_SIZE_BUTTON_COMPACT,
  FONT_SIZE_SAFETY_ALERT,
  applyDarkTranslucentGlass,
  applyGlassWhiteBackPlate,
  applyWhiteButton,
  applyPrimaryWhiteButton,
  applySecondaryWhiteButton,
  applyNavigationWhiteButton,
  applyCompactUtilityButton,
  applyCompactButton,
  applyDisabledButton,
  applyWhiteText,
  applyIceBlueText,
  applySupportingText,
  applyDeepNavyText,
  applySafetyConfirmationButton,
} from "./GlassDesignTokens";

// Reconciled Glass UI Color Palette Tokens (FW-02I-R2: Dark Translucent Glass + White Buttons + White/Ice Typography)
const COLOR_PRIMARY_CYAN = COLOR_ICE_BLUE;
const COLOR_SUCCESS_GREEN = COLOR_SUCCESS_MINT;
const COLOR_WARNING_AMBER = COLOR_SAFETY_AMBER;
const COLOR_TEXT_PRIMARY = COLOR_TEXT_WHITE;
const COLOR_TEXT_SECONDARY = COLOR_TEXT_WHITE;
const COLOR_TEXT_MUTED = COLOR_SLATE_BLUE;

const PANEL_WIDTH = PANEL_WIDTH_STANDARD; // 36.0 cm width (Candidate C) calibrated for Spectacles 2024 FOV

export class FixWhatMentorPanel {
  private cameraObject: SceneObject | null = null;
  private mentorRoot: SceneObject | null = null;
  private backPlate: BackPlate | null = null;
  private contentHost: SceneObject | null = null;
  private flexRoot: FlexLayout | null = null;
  private whyFlex: FlexLayout | null = null;
  private overviewFlex: FlexLayout | null = null;
  private procedureFlex: FlexLayout | null = null;
  private completionFlex: FlexLayout | null = null;

  // Header row components (2-Row Clean Layout — UIUX-03 Fix A)
  private headerTrackText: Text | null = null;
  private headerPhaseText: Text | null = null;
  private headerProgressText: Text | null = null;
  private stepperDotsText: Text | null = null;

  // FW-02I-R4 Reconstructed Process Rail & Detail Cards
  private processRailSO: SceneObject | null = null;
  private processRailNodes: Text[] = [];
  private rowRemoteCardsSO: SceneObject | null = null;

  // Paused banner (DEC-UI-03)
  private pausedBannerSO: SceneObject | null = null;
  private pausedBannerText: Text | null = null;

  // Texture References (Stage B2 Visual Experience)
  private remoteBayTexture: Texture | null = null;
  private wireSpliceTexture: Texture | null = null;
  private batteryOrientationTexture: Texture | null = null;

  // Step Visual Illustration Container (Stage B2 Visual Experience)
  private stepVisualSO: SceneObject | null = null;
  private stepVisualImage: Image | null = null;
  private stepVisualCaptionText: Text | null = null;
  private stepVisualItem: FlexItem | null = null;

  // Direct sequential instruction components (No nested layout containers)
  private stepTitleSO: SceneObject | null = null;
  private stepTitleText: Text | null = null;
  private stepInstructionSO: SceneObject | null = null;
  private stepInstructionText: Text | null = null;
  private bodyItem: FlexItem | null = null;

  private safetyBarrierBoxSO: SceneObject | null = null;
  private safetyBarrierText: Text | null = null;
  private safetyConfirmBtnSO: SceneObject | null = null;

  private cautionBoxSO: SceneObject | null = null;
  private cautionText: Text | null = null;

  // Contextual Chips Row (Zoom, Why, Source)
  private chipsRowSO: SceneObject | null = null;
  private chipZoomBtn: Button | null = null;
  private chipWhyBtn: Button | null = null;
  private chipSourceBtn: Button | null = null;

  // Independently Managed Modal Views (FW-02I-R10)
  private viewDiagramZoomSO: SceneObject | null = null;
  private viewDiagramZoomImage: Image | null = null;
  private viewDiagramZoomCaption: Text | null = null;
  private viewModalWhySO: SceneObject | null = null;
  private viewModalSourceSO: SceneObject | null = null;

  // Inline Why? Accordion / Popover View (DEC-UI-01 / UIUX-03 Fix B)
  private whyAccordionSO: SceneObject | null = null;
  private whyText: Text | null = null;
  private isWhyExpanded: boolean = false;
  private whyItem: FlexItem | null = null;

  // Inline Authoritative Source Reference Container (DEC-M3.2-02)
  private sourceAccordionSO: SceneObject | null = null;
  private sourceFlex: FlexLayout | null = null;
  private sourceMetaText: Text | null = null;
  private sourceExcerptText: Text | null = null;
  private isSourceExpanded: boolean = false;
  private sourceItem: FlexItem | null = null;

  // In-Place Overview Container (DEC-UI-07)
  private overviewGroupSO: SceneObject | null = null;
  private overviewRoadmapText: Text | null = null;
  private isOverviewActive: boolean = false;

  // Procedure Navigation Buttons Row (Decoupled 4-Button Footer)
  private procedureActionsRowSO: SceneObject | null = null;
  private prevBtn: Button | null = null;
  private prevBtnSO: SceneObject | null = null;
  private prevBtnContent: ElementContent | null = null;
  private pauseBtn: Button | null = null;
  private pauseBtnSO: SceneObject | null = null;
  private pauseBtnContent: ElementContent | null = null;
  private whyBtnContent: ElementContent | null = null;
  private sourceBtnContent: ElementContent | null = null;
  private overviewBtn: Button | null = null;
  private overviewBtnSO: SceneObject | null = null;
  private overviewBtnContent: ElementContent | null = null;
  private nextBtn: Button | null = null;
  private nextBtnSO: SceneObject | null = null;
  private nextBtnContent: ElementContent | null = null;
  private lastSafetyConfirmed: boolean = false;

  // Dedicated Completion Buttons Row (UIUX-03 Fix C)
  private completionActionsRowSO: SceneObject | null = null;

  // Directional recovery cue (DEC-UI-02)
  private directionalCueRoot: SceneObject | null = null;
  private directionalCueText: Text | null = null;
  private isCueActive: boolean = false;

  // State & Debounce Lockout (FW-02I-R10: 350ms Debounce)
  private isPaused: boolean = false;
  private isSafetyConfirmed: boolean = false;
  private isModalActive: boolean = false;
  private lastModalToggleTime: number = -10.0;
  private activeProcedure: ManualProcedure | null = null;
  private activeStepIndex: number = 0;

  // Public events for bootstrap controller
  public onPrevClicked = new Event<void>();
  public onNextClicked = new Event<void>();
  public onWhyClicked = new Event<void>();
  public onSourceClicked = new Event<void>();
  public onPauseToggled = new Event<boolean>();
  public onOverviewToggled = new Event<boolean>();
  public onBringBackTriggered = new Event<void>();
  public onReturnToMenuClicked = new Event<void>();
  public onRepeatLessonClicked = new Event<void>();
  public onSafetyDeclared = new Event<void>();

  public initialize(cameraObj?: SceneObject): void {
    this.cameraObject = cameraObj || null;

    // 1. Create Mentor Panel Root with Canvas
    this.mentorRoot = global.scene.createSceneObject("FixWhat_SpatialMentorPanel");
    this.mentorRoot.createComponent("Component.Canvas");

    this.backPlate = this.mentorRoot.createComponent(BackPlate.getTypeName()) as BackPlate;
    this.backPlate.size = new vec2(PANEL_WIDTH_STANDARD, PANEL_HEIGHT_STANDARD);
    applyDarkTranslucentGlass(this.backPlate, 0.72);

    this.recenterPanel();

    // 2. Create Content Host with single linear FlexLayout (Z-offset +0.6 cm)
    this.contentHost = global.scene.createSceneObject("Mentor_Content");
    this.contentHost.setParent(this.mentorRoot);
    this.contentHost.getTransform().setLocalPosition(new vec3(0, 0, 0.6));

    this.flexRoot = this.contentHost.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    this.flexRoot.width = PANEL_WIDTH_STANDARD;
    this.flexRoot.height = PANEL_HEIGHT_STANDARD;
    this.flexRoot.direction = FlexDirection.Column;
    this.flexRoot.justifyContent = FlexJustify.Start;
    this.flexRoot.alignItems = FlexAlign.Stretch;
    this.flexRoot.rowGap = 0.25;
    this.flexRoot.paddingTop = 1.6;
    this.flexRoot.paddingBottom = 1.6;
    this.flexRoot.paddingLeft = 2.0;
    this.flexRoot.paddingRight = 2.0;

    this.flexRoot.onLayoutComplete.add((_result) => {
      if (this.backPlate) {
        this.backPlate.size = new vec2(PANEL_WIDTH_STANDARD, PANEL_HEIGHT_STANDARD);
        applyDarkTranslucentGlass(this.backPlate, 0.72);
      }
    });

    // 3. Assemble Sequential Panel Elements directly into FlexLayout
    this.buildHeaderSection();
    this.buildPausedBanner();
    this.buildProcessRailSection();
    this.buildStepTitleSection();
    this.buildStepVisualSection();
    this.buildContextualChipsSection();
    this.buildRemoteCardsSection();
    this.buildStepInstructionSection();
    this.buildSafetyBarrierSection();
    this.buildCautionSection();
    this.buildWhyAccordionSection();
    this.buildSourceAccordionSection();
    this.buildOverviewSection();
    this.buildProcedureActionsSection();
    this.buildCompletionActionsSection();

    // 4. Build Dedicated Modal Lightbox (Independently Managed)
    this.buildDiagramZoomModal();

    // 5. Build Peripheral Directional Recovery Cue
    this.buildDirectionalCue();

    print("[FixWhatMentorPanel] Initialized world-anchored Spatial Mentor Panel.");
  }

  private positionPanelInFrontOfCamera(distanceCm: number, yOffsetCm: number): void {
    if (!this.mentorRoot) return;

    if (this.cameraObject) {
      const camTrans = this.cameraObject.getTransform();
      const camPos = camTrans.getWorldPosition();
      const camRot = camTrans.getWorldRotation();

      const fwd = camRot.multiplyVec3(new vec3(0, 0, -1));
      const up = camRot.multiplyVec3(new vec3(0, 1, 0));

      const targetPos = camPos.add(fwd.uniformScale(distanceCm)).add(up.uniformScale(yOffsetCm));
      this.mentorRoot.getTransform().setWorldPosition(targetPos);
      this.mentorRoot.getTransform().setWorldRotation(camRot);
    } else {
      this.mentorRoot.getTransform().setWorldPosition(new vec3(0, yOffsetCm, -distanceCm));
      this.mentorRoot.getTransform().setWorldRotation(quat.quatIdentity());
    }
  }

  // ── HEADER SECTION (2-ROW CLEAN LAYOUT — UIUX-03 FIX A) ────────────────────
  private buildHeaderSection(): void {
    const headerGroup = global.scene.createSceneObject("Group_Header");
    headerGroup.setParent(this.contentHost!);

    const groupFlex = headerGroup.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    groupFlex.direction = FlexDirection.Column;
    groupFlex.justifyContent = FlexJustify.Start;
    groupFlex.alignItems = FlexAlign.Stretch;
    groupFlex.rowGap = 0.3;
    groupFlex.width = -1;
    groupFlex.height = -1;

    const groupItem = headerGroup.createComponent(FlexItem.getTypeName()) as FlexItem;
    groupItem.overrideWidth = CONTENT_WIDTH_STANDARD;
    groupItem.overrideHeight = 6.4;
    groupItem.marginBottom = 0.2;

    // Row 1: Track Identity Badge (Left) & Return to Menu Button (Right)
    const row1 = global.scene.createSceneObject("Row_HeaderTop");
    row1.setParent(headerGroup);
    const flex1 = row1.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex1.direction = FlexDirection.Row;
    flex1.justifyContent = FlexJustify.SpaceBetween;
    flex1.alignItems = FlexAlign.Center;
    flex1.width = -1;
    flex1.height = 3.8;
    row1.createComponent(FlexItem.getTypeName());

    const leftSO = global.scene.createSceneObject("TrackBadge");
    leftSO.setParent(row1);
    this.headerTrackText = leftSO.createComponent("Component.Text") as Text;
    this.headerTrackText.depthTest = true;
    this.headerTrackText.size = FONT_SIZE_SECTION_HEADING;
    this.headerTrackText.text = "FIXWHAT? AR • READY";
    this.headerTrackText.horizontalAlignment = HorizontalAlignment.Left;
    this.headerTrackText.verticalAlignment = VerticalAlignment.Center;
    this.headerTrackText.horizontalOverflow = HorizontalOverflow.Overflow;
    if (this.headerTrackText.textFill) this.headerTrackText.textFill.color = COLOR_PRIMARY_CYAN;
    const leftItem = leftSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    leftItem.overrideHeight = 2.6;
    leftItem.flexGrow = 1;

    const menuBtnSO = global.scene.createSceneObject("Btn_HeaderMenu");
    menuBtnSO.setParent(row1);
    const menuBtn = menuBtnSO.createComponent(Button.getTypeName()) as Button;
    const menuEc = menuBtnSO.createComponent(ElementContent.getTypeName()) as ElementContent;
    applyPrimaryWhiteButton(menuBtn, menuEc, "🏠 MENU", FONT_SIZE_BUTTON_NAV);
    menuBtn.onTriggerUp.add(() => {
      this.onReturnToMenuClicked.invoke();
    });
    const menuItem = menuBtnSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    menuItem.overrideHeight = BUTTON_HEIGHT_ACTION;
    menuItem.overrideWidth = 9.5;

    // Row 2: Sub-Header Status Bar (Phase Badge Left, Step Counter Right)
    const row2 = global.scene.createSceneObject("Row_HeaderSub");
    row2.setParent(headerGroup);
    const flex2 = row2.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex2.direction = FlexDirection.Row;
    flex2.justifyContent = FlexJustify.SpaceBetween;
    flex2.alignItems = FlexAlign.Center;
    flex2.width = -1;
    flex2.height = 2.2;
    row2.createComponent(FlexItem.getTypeName());

    const phaseSO = global.scene.createSceneObject("PhaseBadge");
    phaseSO.setParent(row2);
    this.headerPhaseText = phaseSO.createComponent("Component.Text") as Text;
    this.headerPhaseText.depthTest = true;
    this.headerPhaseText.size = FONT_SIZE_BODY_SECONDARY;
    this.headerPhaseText.text = "";
    this.headerPhaseText.horizontalAlignment = HorizontalAlignment.Left;
    this.headerPhaseText.verticalAlignment = VerticalAlignment.Center;
    this.headerPhaseText.horizontalOverflow = HorizontalOverflow.Wrap;
    (this.headerPhaseText as any).layoutRect = Rect.create(-16, 16, -1.1, 1.1);
    if (this.headerPhaseText.textFill) this.headerPhaseText.textFill.color = COLOR_TEXT_WHITE;
    const phaseItem = phaseSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    phaseItem.overrideHeight = 2.0;
    phaseItem.flexGrow = 1;

    const progressSO = global.scene.createSceneObject("ProgressBadge");
    progressSO.setParent(row2);
    this.headerProgressText = progressSO.createComponent("Component.Text") as Text;
    this.headerProgressText.depthTest = true;
    this.headerProgressText.size = FONT_SIZE_BODY_INSTRUCTION;
    this.headerProgressText.text = "Step 0 of 0";
    this.headerProgressText.horizontalAlignment = HorizontalAlignment.Right;
    this.headerProgressText.verticalAlignment = VerticalAlignment.Center;
    this.headerProgressText.horizontalOverflow = HorizontalOverflow.Overflow;
    if (this.headerProgressText.textFill) this.headerProgressText.textFill.color = COLOR_ICE_BLUE;
    const progressItem = progressSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    progressItem.overrideHeight = 2.0;

    const dotsSO = global.scene.createSceneObject("StepperDots");
    dotsSO.setParent(row2);
    this.stepperDotsText = dotsSO.createComponent("Component.Text") as Text;
    this.stepperDotsText.depthTest = true;
    this.stepperDotsText.size = FONT_SIZE_METADATA;
    this.stepperDotsText.text = "";
    this.stepperDotsText.horizontalAlignment = HorizontalAlignment.Right;
    this.stepperDotsText.verticalAlignment = VerticalAlignment.Center;
    this.stepperDotsText.horizontalOverflow = HorizontalOverflow.Overflow;
    if (this.stepperDotsText.textFill) this.stepperDotsText.textFill.color = COLOR_ICE_BLUE;
    const dotsItem = dotsSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    dotsItem.overrideHeight = 2.0;
  }

  // ── PAUSED BANNER ──────────────────────────────────────────────────────────
  private buildPausedBanner(): void {
    this.pausedBannerSO = global.scene.createSceneObject("Banner_Paused");
    this.pausedBannerSO.setParent(this.contentHost!);

    const flex = this.pausedBannerSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Row;
    flex.justifyContent = FlexJustify.Center;
    flex.alignItems = FlexAlign.Center;
    flex.width = -1;
    flex.height = 3.2;

    this.pausedBannerText = this.pausedBannerSO.createComponent("Component.Text") as Text;
    this.pausedBannerText.depthTest = true;
    this.pausedBannerText.size = FONT_SIZE_INSTRUCTION_TITLE;
    this.pausedBannerText.text = "⏸ PROCEDURE PAUSED — Press RESUME to continue";
    this.pausedBannerText.horizontalAlignment = HorizontalAlignment.Center;
    this.pausedBannerText.verticalAlignment = VerticalAlignment.Center;
    this.pausedBannerText.horizontalOverflow = HorizontalOverflow.Overflow;
    if (this.pausedBannerText.textFill) this.pausedBannerText.textFill.color = COLOR_PAUSED_ACCENT;

    const item = this.pausedBannerSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    item.overrideWidth = CONTENT_WIDTH_STANDARD;
    item.overrideHeight = 3.2;
    item.marginBottom = 0.4;
    this.pausedBannerSO.enabled = false;
  }

  // ── 5-STEP PROCESS PROGRESS RAIL (FW-02I-R4) ──────────────────────────────
  private buildProcessRailSection(): void {
    this.processRailSO = global.scene.createSceneObject("ProcessRail");
    this.processRailSO.setParent(this.contentHost!);

    const flex = this.processRailSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Row;
    flex.justifyContent = FlexJustify.SpaceBetween;
    flex.alignItems = FlexAlign.Center;
    flex.width = -1;
    flex.height = 2.4;

    const railItem = this.processRailSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    railItem.overrideWidth = CONTENT_WIDTH_STANDARD;
    railItem.overrideHeight = 2.0;
    railItem.marginBottom = 0.2;

    const nodeLabels = [
      "① COVER",
      "② BATTERIES",
      "③ CLOSE",
      "④ TV CODE",
      "⑤ TEST"
    ];

    this.processRailNodes = [];

    for (let i = 0; i < nodeLabels.length; i++) {
      const nodeSO = global.scene.createSceneObject("RailNode_" + i);
      nodeSO.setParent(this.processRailSO);

      const text = nodeSO.createComponent("Component.Text") as Text;
      text.depthTest = true;
      text.size = FONT_SIZE_METADATA;
      text.text = nodeLabels[i];
      text.horizontalAlignment = HorizontalAlignment.Center;
      text.verticalAlignment = VerticalAlignment.Center;
      text.horizontalOverflow = HorizontalOverflow.Overflow;
      if (text.textFill) text.textFill.color = COLOR_SLATE_BLUE;

      const item = nodeSO.createComponent(FlexItem.getTypeName()) as FlexItem;
      item.overrideHeight = 2.2;
      item.flexGrow = 1;

      this.processRailNodes.push(text);
    }

    this.processRailSO.enabled = false;
  }

  // ── STEP VISUAL SECTION (STAGE B2 VISUAL GUIDANCE) ─────────────────────────
  private buildStepVisualSection(): void {
    this.stepVisualSO = global.scene.createSceneObject("StepVisualContainer");
    this.stepVisualSO.setParent(this.contentHost!);

    const flex = this.stepVisualSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Column;
    flex.justifyContent = FlexJustify.Start;
    flex.alignItems = FlexAlign.Center;
    flex.rowGap = 0.2;
    flex.width = -1;
    flex.height = -1;

    // Image Object (Exact 3:1 aspect ratio: 30.0 x 10.0 cm)
    const imgSO = global.scene.createSceneObject("StepVisualImage");
    imgSO.setParent(this.stepVisualSO);
    this.stepVisualImage = imgSO.createComponent("Component.Image") as Image;
    this.stepVisualImage.mainMaterial = IMAGE_MATERIAL_ASSET.clone();
    this.stepVisualImage.stretchMode = StretchMode.Fit;
    this.stepVisualImage.verticalAlignment = VerticalAlignment.Center;
    this.stepVisualImage.horizontalAlignment = HorizontalAlignment.Center;
    (this.stepVisualImage as any).depthTest = true;

    imgSO.getTransform().setLocalScale(new vec3(DIAGRAM_WIDTH, DIAGRAM_HEIGHT, 1.0));

    const imgItem = imgSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    imgItem.overrideWidth = DIAGRAM_WIDTH;
    imgItem.overrideHeight = DIAGRAM_HEIGHT;

    // Caption Object
    const captionSO = global.scene.createSceneObject("StepVisualCaption");
    captionSO.setParent(this.stepVisualSO);
    this.stepVisualCaptionText = captionSO.createComponent("Component.Text") as Text;
    this.stepVisualCaptionText.depthTest = true;
    this.stepVisualCaptionText.size = FONT_SIZE_METADATA;
    this.stepVisualCaptionText.text = "";
    this.stepVisualCaptionText.horizontalAlignment = HorizontalAlignment.Center;
    this.stepVisualCaptionText.verticalAlignment = VerticalAlignment.Center;
    this.stepVisualCaptionText.horizontalOverflow = HorizontalOverflow.Overflow;
    if (this.stepVisualCaptionText.textFill) this.stepVisualCaptionText.textFill.color = COLOR_PRIMARY_CYAN;

    const capItem = captionSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    capItem.overrideHeight = 2.0;
    capItem.overrideWidth = CONTENT_WIDTH_STANDARD;

    this.stepVisualItem = this.stepVisualSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    this.stepVisualItem.overrideWidth = CONTENT_WIDTH_STANDARD;
    this.stepVisualItem.overrideHeight = 12.4;
    this.stepVisualItem.marginTop = 0.1;
    this.stepVisualItem.marginBottom = 0.1;

    this.stepVisualSO.enabled = false;
  }

  // ── CONTEXTUAL ACTION CHIPS SECTION (ZOOM, WHY, SOURCE) ───────────────────
  private buildContextualChipsSection(): void {
    this.chipsRowSO = global.scene.createSceneObject("Row_ContextualChips");
    this.chipsRowSO.setParent(this.contentHost!);

    const flex = this.chipsRowSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Row;
    flex.justifyContent = FlexJustify.End; // Aligns chips to right margin
    flex.alignItems = FlexAlign.Center;
    flex.columnGap = 0.6;
    flex.width = -1;
    flex.height = BUTTON_HEIGHT_ACTION;

    const item = this.chipsRowSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    item.overrideWidth = CONTENT_WIDTH_STANDARD;
    item.overrideHeight = BUTTON_HEIGHT_ACTION;
    item.marginTop = 0.1;
    item.marginBottom = 0.1;

    // 1. ZOOM Button (8.0 cm width)
    const zoomRes = this.createButton(this.chipsRowSO, "Btn_Zoom", "🔍 ZOOM", () => {
      this.openDiagramZoomModal();
    }, 8.0);
    applyPrimaryWhiteButton(zoomRes.button, zoomRes.content, "🔍 ZOOM", FONT_SIZE_BUTTON_NAV);
    this.chipZoomBtn = zoomRes.button;

    // 2. WHY? Button (7.5 cm width)
    const whyRes = this.createButton(this.chipsRowSO, "Btn_Why", "❓ WHY", () => {
      this.toggleWhy();
    }, 7.5);
    applyPrimaryWhiteButton(whyRes.button, whyRes.content, "❓ WHY", FONT_SIZE_BUTTON_NAV);
    this.chipWhyBtn = whyRes.button;
    this.whyBtnContent = whyRes.content;

    // 3. SOURCE Button (7.5 cm width)
    const srcRes = this.createButton(this.chipsRowSO, "Btn_Source", "📖 SRC", () => {
      this.toggleSource();
    }, 7.5);
    applyPrimaryWhiteButton(srcRes.button, srcRes.content, "📖 SRC", FONT_SIZE_BUTTON_NAV);
    this.chipSourceBtn = srcRes.button;
    this.sourceBtnContent = srcRes.content;
  }

  // ── LOWER 2-COLUMN SPLIT CARDS: TOOLS & SAFETY (FW-02I-R4) ────────────────
  private buildRemoteCardsSection(): void {
    this.rowRemoteCardsSO = global.scene.createSceneObject("Row_RemoteCards");
    this.rowRemoteCardsSO.setParent(this.contentHost!);

    const flex = this.rowRemoteCardsSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Row;
    flex.justifyContent = FlexJustify.SpaceBetween;
    flex.alignItems = FlexAlign.Stretch;
    flex.columnGap = 1.6;
    flex.width = -1;
    flex.height = 6.2;

    const rowItem = this.rowRemoteCardsSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    rowItem.overrideWidth = CONTENT_WIDTH_STANDARD;
    rowItem.overrideHeight = 6.2;
    rowItem.marginTop = 0.1;
    rowItem.marginBottom = 0.2;

    const CARD_WIDTH = (CONTENT_WIDTH_STANDARD - 1.6) / 2; // 15.2 cm

    // Left Card: Tools & Items Needed (15.2 cm)
    const toolsSO = global.scene.createSceneObject("Card_Tools");
    toolsSO.setParent(this.rowRemoteCardsSO);

    const toolsFlex = toolsSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    toolsFlex.direction = FlexDirection.Column;
    toolsFlex.justifyContent = FlexJustify.Start;
    toolsFlex.alignItems = FlexAlign.Stretch;
    toolsFlex.rowGap = 0.2;
    toolsFlex.paddingTop = 0.3;
    toolsFlex.paddingBottom = 0.3;
    toolsFlex.paddingLeft = 0.6;
    toolsFlex.paddingRight = 0.6;
    toolsFlex.width = CARD_WIDTH;
    toolsFlex.height = 6.2;

    const toolsItem = toolsSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    toolsItem.overrideWidth = CARD_WIDTH;
    toolsItem.overrideHeight = 6.2;

    const toolsTitleSO = global.scene.createSceneObject("ToolsTitle");
    toolsTitleSO.setParent(toolsSO);
    const toolsTitle = toolsTitleSO.createComponent("Component.Text") as Text;
    toolsTitle.depthTest = true;
    toolsTitle.size = FONT_SIZE_BODY_SECONDARY;
    toolsTitle.text = "🛠️ TOOLS NEEDED";
    toolsTitle.horizontalAlignment = HorizontalAlignment.Left;
    toolsTitle.verticalAlignment = VerticalAlignment.Center;
    toolsTitle.horizontalOverflow = HorizontalOverflow.Overflow;
    if (toolsTitle.textFill) toolsTitle.textFill.color = COLOR_ICE_BLUE;
    const ttItem = toolsTitleSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    ttItem.overrideHeight = 1.8;

    const toolsBodySO = global.scene.createSceneObject("ToolsBody");
    toolsBodySO.setParent(toolsSO);
    const toolsBody = toolsBodySO.createComponent("Component.Text") as Text;
    toolsBody.depthTest = true;
    toolsBody.size = FONT_SIZE_METADATA;
    toolsBody.text = "• 2 × AAA Alkaline (Fresh)\n• Soft, Dry Cloth";
    toolsBody.horizontalAlignment = HorizontalAlignment.Left;
    toolsBody.verticalAlignment = VerticalAlignment.Top;
    toolsBody.horizontalOverflow = HorizontalOverflow.Wrap;
    (toolsBody as any).layoutRect = Rect.create(-7.0, 7.0, -1.8, 1.8);
    if (toolsBody.textFill) toolsBody.textFill.color = COLOR_TEXT_WHITE;
    const tbItem = toolsBodySO.createComponent(FlexItem.getTypeName()) as FlexItem;
    tbItem.overrideHeight = 3.6;

    // Right Card: Safety Information (15.2 cm)
    const safetySO = global.scene.createSceneObject("Card_Safety");
    safetySO.setParent(this.rowRemoteCardsSO);

    const safetyFlex = safetySO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    safetyFlex.direction = FlexDirection.Column;
    safetyFlex.justifyContent = FlexJustify.Start;
    safetyFlex.alignItems = FlexAlign.Stretch;
    safetyFlex.rowGap = 0.2;
    safetyFlex.paddingTop = 0.3;
    safetyFlex.paddingBottom = 0.3;
    safetyFlex.paddingLeft = 0.6;
    safetyFlex.paddingRight = 0.6;
    safetyFlex.width = CARD_WIDTH;
    safetyFlex.height = 6.2;

    const safetyItem = safetySO.createComponent(FlexItem.getTypeName()) as FlexItem;
    safetyItem.overrideWidth = CARD_WIDTH;
    safetyItem.overrideHeight = 6.2;

    const safetyTitleSO = global.scene.createSceneObject("SafetyTitle");
    safetyTitleSO.setParent(safetySO);
    const safetyTitle = safetyTitleSO.createComponent("Component.Text") as Text;
    safetyTitle.depthTest = true;
    safetyTitle.size = FONT_SIZE_BODY_SECONDARY;
    safetyTitle.text = "⚠️ SAFETY INFO";
    safetyTitle.horizontalAlignment = HorizontalAlignment.Left;
    safetyTitle.verticalAlignment = VerticalAlignment.Center;
    safetyTitle.horizontalOverflow = HorizontalOverflow.Overflow;
    if (safetyTitle.textFill) safetyTitle.textFill.color = COLOR_SAFETY_AMBER;
    const stItem = safetyTitleSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    stItem.overrideHeight = 1.8;

    const safetyBodySO = global.scene.createSceneObject("SafetyBody");
    safetyBodySO.setParent(safetySO);
    const safetyBody = safetyBodySO.createComponent("Component.Text") as Text;
    safetyBody.depthTest = true;
    safetyBody.size = FONT_SIZE_METADATA;
    safetyBody.text = "• Do not mix old/new\n• Observe polarity markings";
    safetyBody.horizontalAlignment = HorizontalAlignment.Left;
    safetyBody.verticalAlignment = VerticalAlignment.Top;
    safetyBody.horizontalOverflow = HorizontalOverflow.Wrap;
    (safetyBody as any).layoutRect = Rect.create(-7.0, 7.0, -1.8, 1.8);
    if (safetyBody.textFill) safetyBody.textFill.color = COLOR_TEXT_WHITE;
    const sbItem = safetyBodySO.createComponent(FlexItem.getTypeName()) as FlexItem;
    sbItem.overrideHeight = 3.6;

    this.rowRemoteCardsSO.enabled = false;
  }

  public setTextures(remoteBay: Texture | null, wireSplice: Texture | null, batteryOrient: Texture | null): void {
    this.remoteBayTexture = remoteBay;
    this.wireSpliceTexture = wireSplice;
    this.batteryOrientationTexture = batteryOrient;
  }

  // ── STEP TITLE SECTION ────────────────────────────────────────────────────
  private buildStepTitleSection(): void {
    this.stepTitleSO = global.scene.createSceneObject("StepTitle");
    this.stepTitleSO.setParent(this.contentHost!);

    this.stepTitleText = this.stepTitleSO.createComponent("Component.Text") as Text;
    this.stepTitleText.depthTest = true;
    this.stepTitleText.size = FONT_SIZE_INSTRUCTION_TITLE;
    this.stepTitleText.text = "Loading Procedure...";
    this.stepTitleText.horizontalAlignment = HorizontalAlignment.Left;
    this.stepTitleText.verticalAlignment = VerticalAlignment.Center;
    this.stepTitleText.horizontalOverflow = HorizontalOverflow.Wrap;
    (this.stepTitleText as any).layoutRect = Rect.create(-15.5, 15.5, -2.0, 2.0);
    if (this.stepTitleText.textFill) this.stepTitleText.textFill.color = COLOR_TEXT_PRIMARY;

    const titleItem = this.stepTitleSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    titleItem.overrideWidth = CONTENT_WIDTH_STANDARD;
    titleItem.overrideHeight = 2.8;
    titleItem.marginBottom = 0.2;
  }

  // ── STEP INSTRUCTION SECTION ──────────────────────────────────────────────
  private buildStepInstructionSection(): void {
    this.stepInstructionSO = global.scene.createSceneObject("StepInstruction");
    this.stepInstructionSO.setParent(this.contentHost!);

    this.stepInstructionText = this.stepInstructionSO.createComponent("Component.Text") as Text;
    this.stepInstructionText.depthTest = true;
    this.stepInstructionText.size = FONT_SIZE_BODY_INSTRUCTION;
    this.stepInstructionText.text = "";
    this.stepInstructionText.horizontalAlignment = HorizontalAlignment.Left;
    this.stepInstructionText.verticalAlignment = VerticalAlignment.Center;
    this.stepInstructionText.horizontalOverflow = HorizontalOverflow.Wrap;
    (this.stepInstructionText as any).layoutRect = Rect.create(-15.5, 15.5, -2.1, 2.1);
    if (this.stepInstructionText.textFill) this.stepInstructionText.textFill.color = COLOR_TEXT_SECONDARY;

    this.bodyItem = this.stepInstructionSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    this.bodyItem.overrideWidth = CONTENT_WIDTH_STANDARD;
    this.bodyItem.overrideHeight = 4.2;
  }

  // ── WORKSHOP SAFETY BARRIER SECTION (DEF-02) ───────────────────────────────
  private buildSafetyBarrierSection(): void {
    this.safetyBarrierBoxSO = global.scene.createSceneObject("SafetyBarrierBox");
    this.safetyBarrierBoxSO.setParent(this.contentHost!);

    this.safetyBarrierText = this.safetyBarrierBoxSO.createComponent("Component.Text") as Text;
    this.safetyBarrierText.depthTest = true;
    this.safetyBarrierText.size = FONT_SIZE_SAFETY_ALERT;
    this.safetyBarrierText.text = "";
    this.safetyBarrierText.horizontalAlignment = HorizontalAlignment.Left;
    this.safetyBarrierText.verticalAlignment = VerticalAlignment.Center;
    this.safetyBarrierText.horizontalOverflow = HorizontalOverflow.Wrap;
    (this.safetyBarrierText as any).layoutRect = Rect.create(-15.5, 15.5, -2.5, 2.5);
    if (this.safetyBarrierText.textFill) this.safetyBarrierText.textFill.color = COLOR_SAFETY_AMBER;

    const barrierItem = this.safetyBarrierBoxSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    barrierItem.overrideWidth = CONTENT_WIDTH_STANDARD;
    barrierItem.overrideHeight = 5.2;
    barrierItem.marginTop = 0.4;
    this.safetyBarrierBoxSO.enabled = false;

    // Dedicated SIK Safety Declaration Button (DEF-02 SIK Integration)
    const btnResult = this.createButton(
      this.contentHost!,
      "Btn_SafetyDeclare",
      "🛡️ DECLARE EYE PROTECTION & COLD IRON SAFE",
      () => {
        this.onSafetyDeclared.invoke();
      },
      CONTENT_WIDTH_STANDARD
    );
    applySafetyConfirmationButton(btnResult.button, btnResult.content, "🛡️ DECLARE EYE PROTECTION & COLD IRON SAFE", false);
    this.safetyConfirmBtnSO = btnResult.button.getSceneObject();
    this.safetyConfirmBtnSO.enabled = false;
  }

  // ── NON-BLOCKING CAUTION SECTION (DEF-04) ──────────────────────────────────
  private buildCautionSection(): void {
    this.cautionBoxSO = global.scene.createSceneObject("CautionBox");
    this.cautionBoxSO.setParent(this.contentHost!);

    this.cautionText = this.cautionBoxSO.createComponent("Component.Text") as Text;
    this.cautionText.depthTest = true;
    this.cautionText.size = FONT_SIZE_SAFETY_ALERT;
    this.cautionText.text = "";
    this.cautionText.horizontalAlignment = HorizontalAlignment.Left;
    this.cautionText.verticalAlignment = VerticalAlignment.Center;
    this.cautionText.horizontalOverflow = HorizontalOverflow.Wrap;
    (this.cautionText as any).layoutRect = Rect.create(-15.5, 15.5, -2.2, 2.2);
    if (this.cautionText.textFill) this.cautionText.textFill.color = COLOR_WARNING_AMBER;

    const cautionItem = this.cautionBoxSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    cautionItem.overrideWidth = CONTENT_WIDTH_STANDARD;
    cautionItem.overrideHeight = 4.6;
    cautionItem.marginTop = 0.4;
    this.cautionBoxSO.enabled = false;
  }

  // ── INLINE WHY? ACCORDION (UIUX-03 FIX B) ──────────────────────────────────
  private buildWhyAccordionSection(): void {
    this.whyAccordionSO = global.scene.createSceneObject("Accordion_Why");
    this.whyAccordionSO.setParent(this.contentHost!);

    this.whyFlex = this.whyAccordionSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    const flex = this.whyFlex;
    flex.direction = FlexDirection.Column;
    flex.justifyContent = FlexJustify.Start;
    flex.alignItems = FlexAlign.Stretch;
    flex.rowGap = 0.3;
    flex.width = -1;
    flex.height = -1;
    flex.paddingTop = 0.6;
    flex.paddingBottom = 0.6;
    flex.paddingLeft = 1.0;
    flex.paddingRight = 1.0;

    // Header label: "💡 WHY THIS STEP MATTERS"
    const headerSO = global.scene.createSceneObject("WhyHeader");
    headerSO.setParent(this.whyAccordionSO);
    const headerText = headerSO.createComponent("Component.Text") as Text;
    headerText.depthTest = true;
    headerText.size = FONT_SIZE_SAFETY_ALERT;
    headerText.text = "💡 WHY THIS STEP MATTERS";
    headerText.horizontalAlignment = HorizontalAlignment.Left;
    headerText.verticalAlignment = VerticalAlignment.Center;
    headerText.horizontalOverflow = HorizontalOverflow.Overflow;
    if (headerText.textFill) headerText.textFill.color = COLOR_PRIMARY_CYAN;
    const headerItem = headerSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    headerItem.overrideHeight = 2.4;
    headerItem.overrideWidth = CONTENT_WIDTH_STANDARD;

    // Body: explanation text
    const textSO = global.scene.createSceneObject("WhyBody");
    textSO.setParent(this.whyAccordionSO);
    this.whyText = textSO.createComponent("Component.Text") as Text;
    this.whyText.depthTest = true;
    this.whyText.size = FONT_SIZE_SAFETY_ALERT;
    this.whyText.text = "";
    this.whyText.horizontalAlignment = HorizontalAlignment.Left;
    this.whyText.verticalAlignment = VerticalAlignment.Top;
    this.whyText.horizontalOverflow = HorizontalOverflow.Wrap;
    (this.whyText as any).layoutRect = Rect.create(-15.5, 15.5, -2.8, 2.8);
    if (this.whyText.textFill) this.whyText.textFill.color = COLOR_TEXT_PRIMARY;
    const textItem = textSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    textItem.overrideHeight = 5.8;
    textItem.overrideWidth = CONTENT_WIDTH_STANDARD;

    this.whyItem = this.whyAccordionSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    this.whyItem.overrideWidth = CONTENT_WIDTH_STANDARD;
    this.whyItem.overrideHeight = 9.2;
    this.whyItem.marginTop = 0.6;
    this.whyItem.marginBottom = 0.6;
    this.whyAccordionSO.enabled = false;
  }

  // ── INLINE SOURCE REFERENCE SECTION (DEC-M3.2-02) ─────────────────────────
  private buildSourceAccordionSection(): void {
    this.sourceAccordionSO = global.scene.createSceneObject("Accordion_Source");
    this.sourceAccordionSO.setParent(this.contentHost!);

    this.sourceFlex = this.sourceAccordionSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    const flex = this.sourceFlex;
    flex.direction = FlexDirection.Column;
    flex.justifyContent = FlexJustify.Start;
    flex.alignItems = FlexAlign.Stretch;
    flex.rowGap = 0.3;
    flex.width = -1;
    flex.height = -1;
    flex.paddingTop = 0.6;
    flex.paddingBottom = 0.6;
    flex.paddingLeft = 1.0;
    flex.paddingRight = 1.0;

    // Header label: "📖 AUTHORITATIVE SOURCE CITATION"
    const headerSO = global.scene.createSceneObject("SourceHeader");
    headerSO.setParent(this.sourceAccordionSO);
    const headerText = headerSO.createComponent("Component.Text") as Text;
    headerText.depthTest = true;
    headerText.size = FONT_SIZE_SAFETY_ALERT;
    headerText.text = "📖 AUTHORITATIVE SOURCE CITATION";
    headerText.horizontalAlignment = HorizontalAlignment.Left;
    headerText.verticalAlignment = VerticalAlignment.Center;
    headerText.horizontalOverflow = HorizontalOverflow.Overflow;
    if (headerText.textFill) headerText.textFill.color = COLOR_PRIMARY_CYAN;
    const headerItem = headerSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    headerItem.overrideHeight = 2.4;
    headerItem.overrideWidth = CONTENT_WIDTH_STANDARD;

    // Metadata: Document & Section & Page
    const metaSO = global.scene.createSceneObject("SourceMeta");
    metaSO.setParent(this.sourceAccordionSO);
    this.sourceMetaText = metaSO.createComponent("Component.Text") as Text;
    this.sourceMetaText.depthTest = true;
    this.sourceMetaText.size = FONT_SIZE_METADATA;
    this.sourceMetaText.text = "";
    this.sourceMetaText.horizontalAlignment = HorizontalAlignment.Left;
    this.sourceMetaText.verticalAlignment = VerticalAlignment.Center;
    this.sourceMetaText.horizontalOverflow = HorizontalOverflow.Wrap;
    (this.sourceMetaText as any).layoutRect = Rect.create(-15.5, 15.5, -2.0, 2.0);
    if (this.sourceMetaText.textFill) this.sourceMetaText.textFill.color = COLOR_WARNING_AMBER;
    const metaItem = metaSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    metaItem.overrideHeight = 3.2;
    metaItem.overrideWidth = CONTENT_WIDTH_STANDARD;

    // Excerpt: Manufacturer verbatim quote
    const excerptSO = global.scene.createSceneObject("SourceExcerpt");
    excerptSO.setParent(this.sourceAccordionSO);
    this.sourceExcerptText = excerptSO.createComponent("Component.Text") as Text;
    this.sourceExcerptText.depthTest = true;
    this.sourceExcerptText.size = FONT_SIZE_BODY_SECONDARY;
    this.sourceExcerptText.text = "";
    this.sourceExcerptText.horizontalAlignment = HorizontalAlignment.Left;
    this.sourceExcerptText.verticalAlignment = VerticalAlignment.Top;
    this.sourceExcerptText.horizontalOverflow = HorizontalOverflow.Wrap;
    (this.sourceExcerptText as any).layoutRect = Rect.create(-15.5, 15.5, -3.5, 3.5);
    if (this.sourceExcerptText.textFill) this.sourceExcerptText.textFill.color = COLOR_TEXT_PRIMARY;
    const excerptItem = excerptSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    excerptItem.overrideHeight = 6.0;
    excerptItem.overrideWidth = CONTENT_WIDTH_STANDARD;

    this.sourceItem = this.sourceAccordionSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    this.sourceItem.overrideWidth = CONTENT_WIDTH_STANDARD;
    this.sourceItem.overrideHeight = 13.5;
    this.sourceItem.marginTop = 0.6;
    this.sourceItem.marginBottom = 0.6;
    this.sourceAccordionSO.enabled = false;
  }

  // ── IN-PLACE OVERVIEW SECTION ──────────────────────────────────────────────
  private buildOverviewSection(): void {
    this.overviewGroupSO = global.scene.createSceneObject("Group_Overview");
    this.overviewGroupSO.setParent(this.contentHost!);

    this.overviewFlex = this.overviewGroupSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    const flex = this.overviewFlex;
    flex.direction = FlexDirection.Column;
    flex.justifyContent = FlexJustify.Start;
    flex.alignItems = FlexAlign.Stretch;
    flex.rowGap = 0.4;
    flex.width = -1;
    flex.height = -1;

    const titleSO = global.scene.createSceneObject("OverviewTitle");
    titleSO.setParent(this.overviewGroupSO);
    const titleText = titleSO.createComponent("Component.Text") as Text;
    titleText.depthTest = true;
    titleText.size = FONT_SIZE_DISPLAY;
    titleText.text = "PROCEDURE ROADMAP";
    titleText.horizontalAlignment = HorizontalAlignment.Left;
    titleText.verticalAlignment = VerticalAlignment.Center;
    titleText.horizontalOverflow = HorizontalOverflow.Overflow;
    if (titleText.textFill) titleText.textFill.color = COLOR_PRIMARY_CYAN;
    const titleItem = titleSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    titleItem.overrideHeight = 3.0;
    titleItem.overrideWidth = CONTENT_WIDTH_STANDARD;

    const roadmapSO = global.scene.createSceneObject("OverviewRoadmap");
    roadmapSO.setParent(this.overviewGroupSO);
    this.overviewRoadmapText = roadmapSO.createComponent("Component.Text") as Text;
    this.overviewRoadmapText.depthTest = true;
    this.overviewRoadmapText.size = FONT_SIZE_SAFETY_ALERT;
    this.overviewRoadmapText.text = "";
    this.overviewRoadmapText.horizontalAlignment = HorizontalAlignment.Left;
    this.overviewRoadmapText.verticalAlignment = VerticalAlignment.Top;
    this.overviewRoadmapText.horizontalOverflow = HorizontalOverflow.Wrap;
    (this.overviewRoadmapText as any).layoutRect = Rect.create(-15.5, 15.5, -7.0, 7.0);
    if (this.overviewRoadmapText.textFill) this.overviewRoadmapText.textFill.color = COLOR_TEXT_PRIMARY;
    const roadmapItem = roadmapSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    roadmapItem.overrideHeight = 14.5;
    roadmapItem.overrideWidth = CONTENT_WIDTH_STANDARD;

    const ovItem = this.overviewGroupSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    ovItem.overrideWidth = CONTENT_WIDTH_STANDARD;
    ovItem.overrideHeight = 18.0;
    this.overviewGroupSO.enabled = false;
  }

  // ── STANDARD PROCEDURE ACTION BUTTONS ROW (DECOUPLED 4-BUTTON FOOTER) ────────
  private buildProcedureActionsSection(): void {
    this.procedureActionsRowSO = global.scene.createSceneObject("Row_ProcedureActions");
    this.procedureActionsRowSO.setParent(this.contentHost!);

    this.procedureFlex = this.procedureActionsRowSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    const flex = this.procedureFlex;
    flex.direction = FlexDirection.Row;
    flex.justifyContent = FlexJustify.SpaceBetween;
    flex.alignItems = FlexAlign.Center;
    flex.columnGap = BUTTON_NAV_GAP; // 0.6 cm
    flex.width = -1;
    flex.height = BUTTON_HEIGHT_NAV; // 4.2 cm

    const rowItem = this.procedureActionsRowSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    rowItem.overrideWidth = CONTENT_WIDTH_STANDARD; // 32.0 cm
    rowItem.overrideHeight = BUTTON_HEIGHT_NAV;
    rowItem.marginTop = 0.4;

    const NAV_BTN_WIDTH = BUTTON_NAV_WIDTH; // 7.55 cm

    // 1. Prev Button
    const prevResult = this.createButton(this.procedureActionsRowSO, "Btn_Prev", "◄ PREV", () => {
      if (this.isPaused || this.activeStepIndex === 0) return;
      this.closeAllModals();
      this.onPrevClicked.invoke();
    }, NAV_BTN_WIDTH);
    this.prevBtn = prevResult.button;
    this.prevBtnSO = prevResult.button.getSceneObject();
    this.prevBtnContent = prevResult.content;
    applyNavigationWhiteButton(this.prevBtn, this.prevBtnContent, "◄ PREV", FONT_SIZE_BUTTON_NAV);

    // 2. Pause / Resume Button
    const pauseResult = this.createButton(this.procedureActionsRowSO, "Btn_Pause", "⏸ PAUSE", () => {
      this.togglePause();
    }, NAV_BTN_WIDTH);
    this.pauseBtn = pauseResult.button;
    this.pauseBtnSO = pauseResult.button.getSceneObject();
    this.pauseBtnContent = pauseResult.content;
    applyNavigationWhiteButton(this.pauseBtn, this.pauseBtnContent, "⏸ PAUSE", FONT_SIZE_BUTTON_NAV);

    // 3. Overview / Steps Button (Label: "📋 STEPS")
    const ovResult = this.createButton(this.procedureActionsRowSO, "Btn_Overview", "📋 STEPS", () => {
      if (this.isPaused) return;
      this.toggleOverview();
    }, NAV_BTN_WIDTH);
    this.overviewBtn = ovResult.button;
    this.overviewBtnSO = ovResult.button.getSceneObject();
    this.overviewBtnContent = ovResult.content;
    applyNavigationWhiteButton(this.overviewBtn, this.overviewBtnContent, "📋 STEPS", FONT_SIZE_BUTTON_NAV);

    // 4. Next Button
    const nextResult = this.createButton(this.procedureActionsRowSO, "Btn_Next", "NEXT ►", () => {
      if (this.isPaused) return;
      if (this.activeStepIndex === 0 && !this.isSafetyConfirmed && this.activeProcedure && isWorkshopProcedure(this.activeProcedure)) {
        print("[FixWhatMentorPanel] Next navigation blocked by safety barrier.");
        return;
      }
      this.closeAllModals();
      this.onNextClicked.invoke();
    }, NAV_BTN_WIDTH);
    this.nextBtn = nextResult.button;
    this.nextBtnSO = nextResult.button.getSceneObject();
    this.nextBtnContent = nextResult.content;
    applyNavigationWhiteButton(this.nextBtn, this.nextBtnContent, "NEXT ►", FONT_SIZE_BUTTON_NAV);
  }

  // ── DEDICATED COMPLETION ACTION BUTTONS ROW (UIUX-03 FIX C) ────────────────
  private buildCompletionActionsSection(): void {
    this.completionActionsRowSO = global.scene.createSceneObject("Row_CompletionActions");
    this.completionActionsRowSO.setParent(this.contentHost!);

    this.completionFlex = this.completionActionsRowSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    this.completionFlex.direction = FlexDirection.Row;
    this.completionFlex.justifyContent = FlexJustify.Center;
    this.completionFlex.alignItems = FlexAlign.Center;
    this.completionFlex.columnGap = 1.6;
    this.completionFlex.width = -1;
    this.completionFlex.height = BUTTON_HEIGHT_NAV;

    const compItem = this.completionActionsRowSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    compItem.overrideWidth = CONTENT_WIDTH_STANDARD;
    compItem.overrideHeight = BUTTON_HEIGHT_NAV;
    compItem.marginTop = 1.0;

    const COMP_BTN_WIDTH = (CONTENT_WIDTH_STANDARD - 1.6) / 2; // 15.2 cm

    // Repeat Lesson Button (15.2 cm width)
    this.createButton(
      this.completionActionsRowSO,
      "Btn_RepeatLesson",
      "🔄 REPEAT LESSON",
      () => {
        this.onRepeatLessonClicked.invoke();
      },
      COMP_BTN_WIDTH
    );

    // Return to Welcome Button (15.2 cm width)
    this.createButton(
      this.completionActionsRowSO,
      "Btn_ReturnWelcome",
      "🏠 RETURN TO MENU",
      () => {
        this.onReturnToMenuClicked.invoke();
      },
      COMP_BTN_WIDTH
    );

    this.completionActionsRowSO.enabled = false;
  }

  // ── DEDICATED DIAGRAM ZOOM INSPECTION MODAL (FW-02I-R10) ────────────────────
  private buildDiagramZoomModal(): void {
    this.viewDiagramZoomSO = global.scene.createSceneObject("View_DiagramZoom");
    this.viewDiagramZoomSO.setParent(this.mentorRoot!);
    this.viewDiagramZoomSO.getTransform().setLocalPosition(new vec3(0, 0, 1.8));

    const bp = this.viewDiagramZoomSO.createComponent(BackPlate.getTypeName()) as BackPlate;
    bp.size = new vec2(MODAL_WIDTH_STANDARD, MODAL_HEIGHT_STANDARD);
    applyDarkTranslucentGlass(bp, 0.88);

    const flex = this.viewDiagramZoomSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    flex.direction = FlexDirection.Column;
    flex.justifyContent = FlexJustify.SpaceBetween;
    flex.alignItems = FlexAlign.Center;
    flex.width = MODAL_WIDTH_STANDARD;
    flex.height = MODAL_HEIGHT_STANDARD;
    flex.paddingTop = 1.0;
    flex.paddingBottom = 1.0;
    flex.paddingLeft = 1.8;
    flex.paddingRight = 1.8;

    // Header Title
    const headerSO = global.scene.createSceneObject("Zoom_Title");
    headerSO.setParent(this.viewDiagramZoomSO);
    const headerText = headerSO.createComponent("Component.Text") as Text;
    headerText.depthTest = true;
    headerText.size = FONT_SIZE_SECTION_HEADING;
    headerText.text = "🔍 TECHNICAL SCHEMATIC INSPECTION";
    headerText.horizontalAlignment = HorizontalAlignment.Center;
    headerText.verticalAlignment = VerticalAlignment.Center;
    applyIceBlueText(headerText, FONT_SIZE_SECTION_HEADING);
    const headerItem = headerSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    headerItem.overrideHeight = 2.8;

    // High-Resolution Image Container (32.0 x 24.0 cm)
    const imgSO = global.scene.createSceneObject("Zoom_Image");
    imgSO.setParent(this.viewDiagramZoomSO);
    this.viewDiagramZoomImage = imgSO.createComponent("Component.Image") as Image;
    this.viewDiagramZoomImage.mainMaterial = IMAGE_MATERIAL_ASSET.clone();
    this.viewDiagramZoomImage.stretchMode = StretchMode.Fit;
    this.viewDiagramZoomImage.verticalAlignment = VerticalAlignment.Center;
    this.viewDiagramZoomImage.horizontalAlignment = HorizontalAlignment.Center;
    (this.viewDiagramZoomImage as any).depthTest = true;
    imgSO.getTransform().setLocalScale(new vec3(MODAL_DIAGRAM_WIDTH, MODAL_DIAGRAM_HEIGHT, 1.0));
    const imgItem = imgSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    imgItem.overrideWidth = MODAL_DIAGRAM_WIDTH;
    imgItem.overrideHeight = MODAL_DIAGRAM_HEIGHT;

    // Caption
    const capSO = global.scene.createSceneObject("Zoom_Caption");
    capSO.setParent(this.viewDiagramZoomSO);
    this.viewDiagramZoomCaption = capSO.createComponent("Component.Text") as Text;
    this.viewDiagramZoomCaption.depthTest = true;
    this.viewDiagramZoomCaption.size = FONT_SIZE_METADATA;
    this.viewDiagramZoomCaption.text = "";
    this.viewDiagramZoomCaption.horizontalAlignment = HorizontalAlignment.Center;
    applySupportingText(this.viewDiagramZoomCaption, FONT_SIZE_METADATA);
    const capItem = capSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    capItem.overrideHeight = 2.0;

    // Close Button
    const closeBtnSO = global.scene.createSceneObject("Btn_CloseZoom");
    closeBtnSO.setParent(this.viewDiagramZoomSO);
    const closeBtn = closeBtnSO.createComponent(Button.getTypeName()) as Button;
    const closeEc = closeBtnSO.createComponent(ElementContent.getTypeName()) as ElementContent;
    applyNavigationWhiteButton(closeBtn, closeEc, "✕ CLOSE ZOOM", FONT_SIZE_BUTTON_NAV);
    closeBtn.onTriggerUp.add(() => {
      this.closeDiagramZoomModal();
    });
    const closeItem = closeBtnSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    closeItem.overrideWidth = 20.0;
    closeItem.overrideHeight = BUTTON_HEIGHT_NAV;

    this.viewDiagramZoomSO.enabled = false;
  }

  // ── MODAL LIFECYCLE & DEBOUNCE (FW-02I-R10) ────────────────────────────────
  private isDebounced(): boolean {
    const now = getTime();
    if (now - this.lastModalToggleTime < 0.35) return false;
    this.lastModalToggleTime = now;
    return true;
  }

  public openDiagramZoomModal(): void {
    if (!this.isDebounced() || this.isPaused) return;
    if (!this.viewDiagramZoomSO) return;

    if (this.activeProcedure && this.stepVisualImage && this.viewDiagramZoomImage) {
      const step = this.activeProcedure.procedure.steps[this.activeStepIndex];
      if (step) {
        const visual = getGuidanceVisual(this.activeProcedure.procedure.procedureId, step.stepId);
        if (visual && visual.texture) {
          this.viewDiagramZoomImage.mainPass.baseTex = visual.texture;
          if (this.viewDiagramZoomCaption) {
            this.viewDiagramZoomCaption.text = visual.caption || step.title;
          }
        }
      }
    }

    this.isModalActive = true;
    if (this.contentHost) this.contentHost.enabled = false;
    this.viewDiagramZoomSO.enabled = true;
    this.updateNavigationLockState();
    print("[FixWhatMentorPanel] View_DiagramZoom opened. Background interaction locked.");
  }

  public closeDiagramZoomModal(): void {
    if (!this.isDebounced()) return;
    if (this.viewDiagramZoomSO) this.viewDiagramZoomSO.enabled = false;
    if (this.contentHost) this.contentHost.enabled = true;
    this.isModalActive = false;
    this.updateNavigationLockState();
    this.requestLayoutUpdate();
    print("[FixWhatMentorPanel] View_DiagramZoom closed. Background interaction restored.");
  }

  public closeAllModals(): void {
    if (this.viewDiagramZoomSO && this.viewDiagramZoomSO.enabled) {
      this.viewDiagramZoomSO.enabled = false;
    }
    if (this.isWhyExpanded) {
      this.isWhyExpanded = false;
      if (this.whyAccordionSO) this.whyAccordionSO.enabled = false;
      if (this.whyBtnContent) this.whyBtnContent.text = "❓ WHY";
    }
    if (this.isSourceExpanded) {
      this.isSourceExpanded = false;
      if (this.sourceAccordionSO) this.sourceAccordionSO.enabled = false;
      if (this.sourceBtnContent) this.sourceBtnContent.text = "📖 SRC";
    }
    if (this.contentHost && !this.contentHost.enabled) {
      this.contentHost.enabled = true;
    }
    this.isModalActive = false;
    this.updateNavigationLockState();
  }

  private createButton(
    parent: SceneObject,
    name: string,
    labelText: string,
    onClick: () => void,
    overrideWidth?: number
  ): { button: Button; content: ElementContent } {
    const so = global.scene.createSceneObject(name);
    so.setParent(parent);

    const btn = so.createComponent(Button.getTypeName()) as Button;
    const ec = so.createComponent(ElementContent.getTypeName()) as ElementContent;
    const fontSize = (overrideWidth && overrideWidth < 10) ? FONT_SIZE_BUTTON_NAV : FONT_SIZE_BUTTON_PRIMARY;
    applyWhiteButton(btn, ec, labelText, fontSize);
    ec.autoResize = true;

    btn.onTriggerUp.add(() => {
      onClick();
    });

    const item = so.createComponent(FlexItem.getTypeName()) as FlexItem;
    item.overrideHeight = BUTTON_HEIGHT_NAV;
    if (overrideWidth) {
      item.overrideWidth = overrideWidth;
    } else {
      item.flexGrow = 1;
    }
    return { button: btn, content: ec };
  }

  // ── PERIPHERAL DIRECTIONAL RECOVERY CUE ────────────────────────────────────
  private buildDirectionalCue(): void {
    if (!this.cameraObject) return;

    this.directionalCueRoot = global.scene.createSceneObject("FixWhat_DirectionalCue");
    this.directionalCueRoot.setParent(this.cameraObject);
    this.directionalCueRoot.getTransform().setLocalPosition(new vec3(0, 0, -45.0));
    this.directionalCueRoot.getTransform().setLocalRotation(quat.quatIdentity());

    this.directionalCueRoot.createComponent("Component.Canvas");

    this.directionalCueText = this.directionalCueRoot.createComponent("Component.Text") as Text;
    this.directionalCueText.depthTest = false;
    this.directionalCueText.size = FONT_SIZE_INSTRUCTION_TITLE;
    this.directionalCueText.text = "◄ MENTOR PANEL";
    this.directionalCueText.horizontalAlignment = HorizontalAlignment.Center;
    this.directionalCueText.verticalAlignment = VerticalAlignment.Center;
    this.directionalCueText.horizontalOverflow = HorizontalOverflow.Overflow;
    if (this.directionalCueText.textFill) this.directionalCueText.textFill.color = COLOR_PRIMARY_CYAN;

    this.directionalCueRoot.enabled = false;
  }

  // ── PUBLIC INTERACTION ACTIONS ─────────────────────────────────────────────

  private requestLayoutUpdate(): void {
    if (this.processRailSO && this.processRailSO.enabled) {
      const fl = this.processRailSO.getComponent(FlexLayout.getTypeName()) as FlexLayout;
      if (fl) {
        fl.refreshChildren();
        fl.forceLayout();
      }
    }
    if (this.rowRemoteCardsSO && this.rowRemoteCardsSO.enabled) {
      const fl = this.rowRemoteCardsSO.getComponent(FlexLayout.getTypeName()) as FlexLayout;
      if (fl) {
        fl.refreshChildren();
        fl.forceLayout();
      }
    }
    if (this.whyFlex && this.isWhyExpanded) {
      this.whyFlex.refreshChildren();
      this.whyFlex.forceLayout();
    }
    if (this.sourceFlex && this.isSourceExpanded) {
      this.sourceFlex.refreshChildren();
      this.sourceFlex.forceLayout();
    }
    if (this.overviewFlex && this.isOverviewActive) {
      this.overviewFlex.refreshChildren();
      this.overviewFlex.forceLayout();
    }
    if (this.procedureFlex && this.procedureActionsRowSO && this.procedureActionsRowSO.enabled) {
      this.procedureFlex.refreshChildren();
      this.procedureFlex.forceLayout();
    }
    if (this.completionFlex && this.completionActionsRowSO && this.completionActionsRowSO.enabled) {
      this.completionFlex.refreshChildren();
      this.completionFlex.forceLayout();
    }
    if (this.flexRoot) {
      this.flexRoot.refreshChildren();
      this.flexRoot.forceLayout();
    }
  }

  public recenterPanel(): void {
    this.positionPanelInFrontOfCamera(CAMERA_DISTANCE_STANDARD, CAMERA_Y_OFFSET_STANDARD);
    if (this.directionalCueRoot) this.directionalCueRoot.enabled = false;
    this.onBringBackTriggered.invoke();
    print("[FixWhatMentorPanel] Brought Mentor Panel back to user gaze.");
  }

  public toggleWhy(): void {
    this.isWhyExpanded = !this.isWhyExpanded;
    if (this.whyAccordionSO) this.whyAccordionSO.enabled = this.isWhyExpanded;
    if (this.whyBtnContent) this.whyBtnContent.text = this.isWhyExpanded ? "✕ WHY" : "❓ WHY";
    if (this.isWhyExpanded && this.isSourceExpanded) {
      this.isSourceExpanded = false;
      if (this.sourceAccordionSO) this.sourceAccordionSO.enabled = false;
      if (this.sourceBtnContent) this.sourceBtnContent.text = "📖 SRC";
    }
    if (this.rowRemoteCardsSO && this.activeProcedure && isRemoteProcedure(this.activeProcedure)) {
      this.rowRemoteCardsSO.enabled = !this.isWhyExpanded && !this.isSourceExpanded && !this.isPaused && !this.isOverviewActive;
    }
    this.requestLayoutUpdate();
    this.onWhyClicked.invoke();
    print("[FixWhatMentorPanel] Why? explanation accordion toggled: " + this.isWhyExpanded);
  }

  public toggleSource(): void {
    this.isSourceExpanded = !this.isSourceExpanded;
    if (this.sourceAccordionSO) this.sourceAccordionSO.enabled = this.isSourceExpanded;
    if (this.sourceBtnContent) this.sourceBtnContent.text = this.isSourceExpanded ? "✕ SRC" : "📖 SRC";
    if (this.isSourceExpanded && this.isWhyExpanded) {
      this.isWhyExpanded = false;
      if (this.whyAccordionSO) this.whyAccordionSO.enabled = false;
      if (this.whyBtnContent) this.whyBtnContent.text = "❓ WHY";
    }
    if (this.rowRemoteCardsSO && this.activeProcedure && isRemoteProcedure(this.activeProcedure)) {
      this.rowRemoteCardsSO.enabled = !this.isSourceExpanded && !this.isWhyExpanded && !this.isPaused && !this.isOverviewActive;
    }
    this.requestLayoutUpdate();
    this.onSourceClicked.invoke();
    print("[FixWhatMentorPanel] Source reference accordion toggled: " + this.isSourceExpanded);
  }

  public togglePause(): void {
    this.isPaused = !this.isPaused;
    if (this.pausedBannerSO) this.pausedBannerSO.enabled = this.isPaused;
    const showSteps = !this.isPaused && !this.isOverviewActive;
    if (this.stepTitleSO) this.stepTitleSO.enabled = showSteps;
    if (this.stepVisualSO) this.stepVisualSO.enabled = showSteps && this.hasVisualForStep();
    if (this.stepInstructionSO) this.stepInstructionSO.enabled = showSteps;
    if (this.safetyBarrierBoxSO) this.safetyBarrierBoxSO.enabled = showSteps && !this.isSafetyConfirmed;
    if (this.cautionBoxSO) this.cautionBoxSO.enabled = showSteps;
    if (this.whyAccordionSO) this.whyAccordionSO.enabled = showSteps && this.isWhyExpanded;
    if (this.sourceAccordionSO) this.sourceAccordionSO.enabled = showSteps && this.isSourceExpanded;
    if (this.processRailSO) this.processRailSO.enabled = showSteps && (this.activeProcedure !== null && isRemoteProcedure(this.activeProcedure));
    if (this.rowRemoteCardsSO) this.rowRemoteCardsSO.enabled = showSteps && (this.activeProcedure !== null && isRemoteProcedure(this.activeProcedure)) && !this.isWhyExpanded && !this.isSourceExpanded;
    if (this.pauseBtnContent) this.pauseBtnContent.text = this.isPaused ? "► RESUME" : "⏸ PAUSE";
    this.updateNavigationLockState();
    this.requestLayoutUpdate();
    this.onPauseToggled.invoke(this.isPaused);
    print("[FixWhatMentorPanel] Pause state toggled: " + this.isPaused);
  }

  public resetPauseState(): void {
    if (this.isPaused) {
      this.isPaused = false;
      if (this.pausedBannerSO) this.pausedBannerSO.enabled = false;
      if (this.pauseBtnContent) this.pauseBtnContent.text = "⏸ PAUSE";
      this.updateNavigationLockState();
      this.requestLayoutUpdate();
    }
  }

  public getIsPaused(): boolean {
    return this.isPaused;
  }

  private updateNavigationLockState(): void {
    const isFirstStep = this.activeStepIndex === 0;
    const isWorkshop = this.activeProcedure !== null && isWorkshopProcedure(this.activeProcedure);
    const isSafetyLocked = isWorkshop && isFirstStep && !this.isSafetyConfirmed;
    const isFinalStep = this.activeProcedure !== null && this.activeStepIndex === (this.activeProcedure.procedure.steps.length - 1);

    // ── 1. PREV BUTTON STATE ──
    if (this.prevBtnSO && this.prevBtn && this.prevBtnContent) {
      const canPrev = !this.isPaused && !isFirstStep && !this.isModalActive;
      const comps = this.prevBtnSO.getComponents(Interactable.getTypeName());
      for (let i = 0; i < comps.length; i++) comps[i].enabled = canPrev;
      this.prevBtn.inactive = !canPrev;
      if (canPrev) {
        applyNavigationWhiteButton(this.prevBtn, this.prevBtnContent, "◄ PREV", FONT_SIZE_BUTTON_NAV);
      } else {
        applyDisabledButton(this.prevBtn, this.prevBtnContent, "◄ PREV", FONT_SIZE_BUTTON_NAV);
      }
    }

    // ── 2. PAUSE BUTTON STATE ──
    if (this.pauseBtnSO && this.pauseBtn && this.pauseBtnContent) {
      const canPause = !this.isModalActive;
      const comps = this.pauseBtnSO.getComponents(Interactable.getTypeName());
      for (let i = 0; i < comps.length; i++) comps[i].enabled = canPause;
      this.pauseBtn.inactive = !canPause;
      const pauseLabel = this.isPaused ? "► RESUME" : "⏸ PAUSE";
      if (canPause) {
        applyNavigationWhiteButton(this.pauseBtn, this.pauseBtnContent, pauseLabel, FONT_SIZE_BUTTON_NAV);
      } else {
        applyDisabledButton(this.pauseBtn, this.pauseBtnContent, pauseLabel, FONT_SIZE_BUTTON_NAV);
      }
    }

    // ── 3. STEPS BUTTON STATE ──
    if (this.overviewBtnSO && this.overviewBtn && this.overviewBtnContent) {
      const canSteps = !this.isPaused && !this.isModalActive;
      const comps = this.overviewBtnSO.getComponents(Interactable.getTypeName());
      for (let i = 0; i < comps.length; i++) comps[i].enabled = canSteps;
      this.overviewBtn.inactive = !canSteps;
      const stepsLabel = this.isOverviewActive ? "✕ STEPS" : "📋 STEPS";
      if (canSteps) {
        applyNavigationWhiteButton(this.overviewBtn, this.overviewBtnContent, stepsLabel, FONT_SIZE_BUTTON_NAV);
      } else {
        applyDisabledButton(this.overviewBtn, this.overviewBtnContent, stepsLabel, FONT_SIZE_BUTTON_NAV);
      }
    }

    // ── 4. NEXT BUTTON STATE ──
    if (this.nextBtnSO && this.nextBtn && this.nextBtnContent) {
      const canNext = !this.isPaused && !this.isModalActive;
      const comps = this.nextBtnSO.getComponents(Interactable.getTypeName());
      for (let i = 0; i < comps.length; i++) comps[i].enabled = canNext;
      this.nextBtn.inactive = !canNext;

      let nextLabel = "NEXT ►";
      if (isFirstStep && this.activeProcedure && isRemoteProcedure(this.activeProcedure)) {
        nextLabel = "START ►";
      } else if (isFinalStep) {
        nextLabel = "DONE ►";
      }

      if (canNext && !isSafetyLocked) {
        applyNavigationWhiteButton(this.nextBtn, this.nextBtnContent, nextLabel, FONT_SIZE_BUTTON_NAV);
      } else {
        applyDisabledButton(this.nextBtn, this.nextBtnContent, nextLabel, FONT_SIZE_BUTTON_NAV);
      }
    }

    // ── 5. CHIPS LOCKOUT DURING PAUSE / MODAL ──
    const canChips = !this.isPaused && !this.isModalActive;
    if (this.chipZoomBtn) this.chipZoomBtn.inactive = !canChips;
    if (this.chipWhyBtn) this.chipWhyBtn.inactive = !canChips;
    if (this.chipSourceBtn) this.chipSourceBtn.inactive = !canChips;
  }

  public toggleOverview(): void {
    this.isOverviewActive = !this.isOverviewActive;
    const showSteps = !this.isOverviewActive && !this.isPaused;
    if (this.stepTitleSO) this.stepTitleSO.enabled = showSteps;
    if (this.stepVisualSO) this.stepVisualSO.enabled = showSteps && this.hasVisualForStep();
    if (this.stepInstructionSO) this.stepInstructionSO.enabled = showSteps;
    if (this.safetyBarrierBoxSO) this.safetyBarrierBoxSO.enabled = showSteps && !this.isSafetyConfirmed;
    if (this.cautionBoxSO) this.cautionBoxSO.enabled = showSteps;
    if (this.whyAccordionSO) this.whyAccordionSO.enabled = false;
    if (this.sourceAccordionSO) this.sourceAccordionSO.enabled = false;
    if (this.processRailSO) this.processRailSO.enabled = showSteps && (this.activeProcedure !== null && isRemoteProcedure(this.activeProcedure));
    if (this.rowRemoteCardsSO) this.rowRemoteCardsSO.enabled = showSteps && (this.activeProcedure !== null && isRemoteProcedure(this.activeProcedure));
    this.isWhyExpanded = false;
    if (this.whyBtnContent) this.whyBtnContent.text = "❓ WHY";
    this.isSourceExpanded = false;
    if (this.sourceBtnContent) this.sourceBtnContent.text = "📖 SRC";

    if (this.overviewGroupSO) this.overviewGroupSO.enabled = this.isOverviewActive;
    this.updateNavigationLockState();
    if (this.isOverviewActive) {
      this.renderRoadmap();
    }
    this.requestLayoutUpdate();
    this.onOverviewToggled.invoke(this.isOverviewActive);
    print("[FixWhatMentorPanel] Overview toggled: " + this.isOverviewActive);
  }

  public setSafetyConfirmed(confirmed: boolean): void {
    this.isSafetyConfirmed = confirmed;
    this.lastSafetyConfirmed = confirmed;
    if (this.safetyBarrierBoxSO && this.safetyBarrierText) {
      if (confirmed) {
        this.safetyBarrierText.text = "✓ [SAFETY DECLARED: Eye Protection Worn & Cold Iron Safe]";
        if (this.safetyBarrierText.textFill) this.safetyBarrierText.textFill.color = COLOR_SUCCESS_GREEN;
        if (this.safetyConfirmBtnSO) this.safetyConfirmBtnSO.enabled = false;
        this.updateNavigationLockState();
        const item = this.safetyBarrierBoxSO.getComponent(FlexItem.getTypeName()) as FlexItem;
        if (item) item.overrideHeight = 2.4;
        this.requestLayoutUpdate();
      }
    }
  }

  public renderStep(proc: ManualProcedure, stepIndex: number, safetyConfirmed: boolean): void {
    this.activeProcedure = proc;
    this.activeStepIndex = stepIndex;
    this.isSafetyConfirmed = safetyConfirmed;
    this.lastSafetyConfirmed = safetyConfirmed;

    const steps = proc.procedure.steps;
    const step = steps[stepIndex];
    if (!step) return;

    const isRemote = isRemoteProcedure(proc);

    // Track Identity: Header Row 1 Left
    if (this.headerTrackText) {
      const trackName = isRemote ? "CONSUMER REPAIR" : "WORKSHOP";
      const modelStr = isRemote ? "GE 33709" : "WIRE SPLICING";
      this.headerTrackText.text = `${trackName} • ${modelStr}`;
    }

    // Phase Identity: Header Row 2 Left
    if (this.headerPhaseText) {
      const phases = proc.procedure.phases;
      const phaseObj = phases && phases[step.phaseIndex] ? phases[step.phaseIndex] : null;
      const phaseName = phaseObj ? phaseObj.title.toUpperCase() : "PROCEDURE STEP";
      this.headerPhaseText.text = `PHASE ${step.phaseIndex + 1}: ${phaseName}`;
    }

    // Step Counter: Header Row 2 Right
    if (this.headerProgressText) {
      this.headerProgressText.text = `Step ${stepIndex + 1} of ${steps.length}`;
    }

    // Stepper Dots: Header Row 2 Right (next to Step Counter)
    if (this.stepperDotsText) {
      let dots = " ";
      for (let i = 0; i < steps.length; i++) {
        dots += (i === stepIndex ? " ●" : (i < stepIndex ? " ✓" : " ○"));
      }
      this.stepperDotsText.text = dots;
    }

    // FW-02I-R4 Reconstructed Process Rail & Detail Cards for Remote
    if (isRemote) {
      if (this.processRailSO) {
        this.processRailSO.enabled = !this.isPaused && !this.isOverviewActive;
      }
      if (this.rowRemoteCardsSO) {
        this.rowRemoteCardsSO.enabled = !this.isPaused && !this.isOverviewActive && !this.isWhyExpanded && !this.isSourceExpanded;
      }

      let activeStage = 0;
      if (stepIndex === 0) activeStage = 0;
      else if (stepIndex >= 1 && stepIndex <= 3) activeStage = 1;
      else if (stepIndex === 4) activeStage = 2;
      else if (stepIndex >= 5 && stepIndex <= 7) activeStage = 3;
      else if (stepIndex === 8) activeStage = 4;

      for (let i = 0; i < this.processRailNodes.length; i++) {
        const node = this.processRailNodes[i];
        if (node && node.textFill) {
          if (i === activeStage) {
            node.textFill.color = COLOR_ICE_BLUE;
            node.size = FONT_SIZE_BODY_SECONDARY; // 28
          } else if (i < activeStage) {
            node.textFill.color = COLOR_SUCCESS_MINT;
            node.size = FONT_SIZE_METADATA;       // 26
          } else {
            node.textFill.color = COLOR_SLATE_BLUE;
            node.size = FONT_SIZE_METADATA;       // 26
          }
        }
      }
    } else {
      if (this.processRailSO) this.processRailSO.enabled = false;
      if (this.rowRemoteCardsSO) this.rowRemoteCardsSO.enabled = false;
    }

    // Stage D Dynamic Visual Guidance Diagram Mapping
    if (this.stepVisualSO && this.stepVisualImage && this.stepVisualCaptionText) {
      const visual = getGuidanceVisual(proc.procedure.procedureId, step.stepId);
      const showSteps = !this.isPaused && !this.isOverviewActive;

      if (visual && visual.texture) {
        this.stepVisualImage.mainPass.baseTex = visual.texture;
        this.stepVisualCaptionText.text = visual.caption;
        this.stepVisualSO.enabled = showSteps;
      } else {
        this.clearVisualState();
      }
    }

    // Step Title
    if (this.stepTitleText) {
      this.stepTitleText.text = step.title;
      if (this.stepTitleSO) this.stepTitleSO.enabled = true;
    }

    // Step Instruction Text
    if (this.stepInstructionText) {
      this.stepInstructionText.text = step.instructionText;
      if (this.stepInstructionSO) this.stepInstructionSO.enabled = true;
      if (this.bodyItem) this.bodyItem.overrideHeight = isRemote ? 5.2 : 8.5;
    }

    // DEF-02 Fix: Safety Barrier strictly on Workshop Track
    const isWorkshop = isWorkshopProcedure(proc);
    if (this.safetyBarrierBoxSO && this.safetyBarrierText) {
      if (isWorkshop && step.isBlockingSafetyBarrier) {
        if (!safetyConfirmed) {
          this.safetyBarrierText.text =
            "🛑 [SAFETY CHECKPOINT: EYE & THERMAL PROTECTION]\n" +
            "Learner Declaration: Confirm eye protection is worn and soldering iron is cold/unpowered before proceeding.\n" +
            "(Pinch below or press [C] to declare safety)";
          if (this.safetyBarrierText.textFill) this.safetyBarrierText.textFill.color = COLOR_SAFETY_AMBER;
          if (this.safetyConfirmBtnSO) this.safetyConfirmBtnSO.enabled = true;
          const item = this.safetyBarrierBoxSO.getComponent(FlexItem.getTypeName()) as FlexItem;
          if (item) item.overrideHeight = 4.8;
          this.safetyBarrierBoxSO.enabled = true;
        } else {
          // Collapsed persistent reminder after acknowledgement
          this.safetyBarrierText.text = "✓ [SAFETY DECLARED: Eye Protection Worn & Cold Iron Safe]";
          if (this.safetyBarrierText.textFill) this.safetyBarrierText.textFill.color = COLOR_SUCCESS_GREEN;
          if (this.safetyConfirmBtnSO) this.safetyConfirmBtnSO.enabled = false;
          const item = this.safetyBarrierBoxSO.getComponent(FlexItem.getTypeName()) as FlexItem;
          if (item) item.overrideHeight = 2.4;
          this.safetyBarrierBoxSO.enabled = true;
        }
      } else {
        this.safetyBarrierBoxSO.enabled = false;
        if (this.safetyConfirmBtnSO) this.safetyConfirmBtnSO.enabled = false;
      }
    }

    // DEF-04 Fix: Contextual non-blocking caution in separated box
    if (this.cautionBoxSO && this.cautionText) {
      if (step.safetyNotice) {
        this.cautionText.text = `⚠️ CAUTION: ${step.safetyNotice}`;
        this.cautionBoxSO.enabled = true;
      } else {
        this.cautionBoxSO.enabled = false;
      }
    }

    // Inline Why? Content
    if (this.whyText) {
      const whyExplanation = step.trainingExplanation
        ? step.trainingExplanation.whyItMatters
        : "Standard procedure requirement.";
      const compInvolved = step.trainingExplanation && step.trainingExplanation.componentInvolved
        ? `Components: ${step.trainingExplanation.componentInvolved}\n\n`
        : "";
      const fullWhy = `${compInvolved}${whyExplanation}`;
      this.whyText.text = fullWhy;
      if (this.whyItem) {
        this.whyItem.overrideHeight = fullWhy.length > 200 ? 9.5 : 7.2;
      }
    }

    // Close why explanation on step advance per approved requirement
    if (this.isWhyExpanded) {
      this.isWhyExpanded = false;
      if (this.whyAccordionSO) this.whyAccordionSO.enabled = false;
      if (this.whyBtnContent) this.whyBtnContent.text = "❓ WHY?";
    }

    // Authoritative Source Citation (DEC-M3.2-02 & M3.3-A)
    if (this.sourceMetaText && this.sourceExcerptText) {
      const cite = step.sourceCitation as any;
      const doc = proc.sourceDocument as any;
      if (cite) {
        // Schema-canonical fields: documentCode, sectionHeading, exactExcerpt
        // Legacy/alternative fallbacks: documentId, sectionTitle, verbatimExcerpt
        const docCode = doc ? (doc.documentCode || doc.documentId || "") : (cite.documentId || "");
        const docTitle = doc && doc.title ? doc.title : "Authoritative Manual";
        const docPublisher = doc && doc.publisher ? `[${doc.publisher}] ` : "";
        const docHeader = docCode ? `${docTitle} (${docCode})` : docTitle;

        const secHeading = cite.sectionHeading || cite.sectionTitle || (cite.sectionNumber ? `Section ${cite.sectionNumber}` : "General");
        const pageStr = cite.pageNumber ? `Page ${cite.pageNumber}` : "Page Unspecified";
        const diagRef = cite.diagramReference ? ` • ${cite.diagramReference}` : "";

        this.sourceMetaText.text = `Doc: ${docPublisher}${docHeader}\nSection: ${secHeading} • ${pageStr}${diagRef}`;

        const excerpt = cite.exactExcerpt || cite.verbatimExcerpt;
        this.sourceExcerptText.text = excerpt
          ? `"${excerpt}"`
          : "Authoritative citation excerpt not recorded.";

        if (this.sourceItem) {
          const totalLen = this.sourceMetaText.text.length + this.sourceExcerptText.text.length;
          this.sourceItem.overrideHeight = totalLen > 300 ? 14.0 : (totalLen > 180 ? 12.0 : 10.0);
        }
      } else {
        this.sourceMetaText.text = "Document: Reference Metadata Unavailable";
        this.sourceExcerptText.text = "Notice: Authoritative manufacturer citation not indexed for this step.";
      }
    }

    // Close source citation on step advance per approved requirement
    if (this.isSourceExpanded) {
      this.isSourceExpanded = false;
      if (this.sourceAccordionSO) this.sourceAccordionSO.enabled = false;
      if (this.sourceBtnContent) this.sourceBtnContent.text = "📖 SOURCE";
    }

    if (this.overviewGroupSO) this.overviewGroupSO.enabled = false;
    if (this.procedureActionsRowSO) this.procedureActionsRowSO.enabled = true;
    if (this.completionActionsRowSO) this.completionActionsRowSO.enabled = false;
    this.updateNavigationLockState();
    this.requestLayoutUpdate();
  }

  // DEF-05 / UIUX-03 Fix C: Honest completion semantics with cleanly separated completion controls
  public renderCompletion(proc: ManualProcedure): void {
    this.activeProcedure = proc;

    const isRemote = isRemoteProcedure(proc);
    const modelStr = isRemote ? "GE 33709 Universal Remote" : "Wire Joining Workshop";

    if (this.headerTrackText) {
      this.headerTrackText.text = "PROCEDURE FINISHED";
    }

    if (this.headerPhaseText) {
      this.headerPhaseText.text = "ALL STEPS COMPLETED";
    }

    if (this.headerProgressText) {
      this.headerProgressText.text = "Complete";
    }

    if (this.stepTitleText) {
      this.stepTitleText.text = "🎉 Procedure Navigation Complete";
      if (this.stepTitleSO) this.stepTitleSO.enabled = true;
    }

    if (this.stepInstructionText) {
      const disclaimer = isRemote
        ? "• FixWhat? AR guides procedure steps; it does not physically verify remote pairing or infrared emission."
        : "• FixWhat? AR guides procedure steps; it does not physically verify electrical continuity or mechanical tensile strength.";

      this.stepInstructionText.text =
        `You have successfully navigated all steps for ${modelStr}.\n\n` +
        `${disclaimer}\n\n` +
        "• Select an option below to continue.";
      if (this.stepInstructionSO) this.stepInstructionSO.enabled = true;
      if (this.bodyItem) this.bodyItem.overrideHeight = 8.5;
    }

    this.clearVisualState();
    if (this.processRailSO) this.processRailSO.enabled = false;
    if (this.rowRemoteCardsSO) this.rowRemoteCardsSO.enabled = false;
    if (this.stepperDotsText) this.stepperDotsText.text = "";
    if (this.safetyBarrierBoxSO) this.safetyBarrierBoxSO.enabled = false;
    if (this.safetyConfirmBtnSO) this.safetyConfirmBtnSO.enabled = false;
    if (this.cautionBoxSO) this.cautionBoxSO.enabled = false;
    if (this.whyAccordionSO) this.whyAccordionSO.enabled = false;
    if (this.sourceAccordionSO) this.sourceAccordionSO.enabled = false;
    this.isWhyExpanded = false;
    if (this.whyBtnContent) this.whyBtnContent.text = "❓ WHY?";
    this.isSourceExpanded = false;
    if (this.sourceBtnContent) this.sourceBtnContent.text = "📖 SOURCE";
    if (this.overviewGroupSO) this.overviewGroupSO.enabled = false;

    // Swap actions row for dedicated completion buttons
    if (this.procedureActionsRowSO) this.procedureActionsRowSO.enabled = false;
    if (this.completionActionsRowSO) this.completionActionsRowSO.enabled = true;
    this.requestLayoutUpdate();
  }

  private clearVisualState(): void {
    if (this.stepVisualImage && this.stepVisualImage.mainPass) {
      this.stepVisualImage.mainPass.baseTex = null;
    }
    if (this.stepVisualCaptionText) {
      this.stepVisualCaptionText.text = "";
    }
    if (this.stepVisualSO) {
      this.stepVisualSO.enabled = false;
    }
  }

  // Defensive error handling for missing procedure definitions
  public renderMissingProcedure(procId: string): void {
    if (this.headerTrackText) {
      this.headerTrackText.text = "PROCEDURE ERROR";
    }
    if (this.headerPhaseText) {
      this.headerPhaseText.text = "MISSING DEFINITION";
    }
    if (this.headerProgressText) {
      this.headerProgressText.text = "Error";
    }
    if (this.stepTitleText) {
      this.stepTitleText.text = "⚠️ Procedure Not Found";
      if (this.stepTitleSO) this.stepTitleSO.enabled = true;
    }
    if (this.stepInstructionText) {
      this.stepInstructionText.text =
        `The requested procedure '${procId}' could not be loaded from registered fixtures.\n\n` +
        "• Please return to the menu and select an authorized procedure.\n" +
        "• Supported: GE 33709 Universal Remote Setup (Consumer Track).";
      if (this.stepInstructionSO) this.stepInstructionSO.enabled = true;
    }
    if (this.stepVisualSO) this.stepVisualSO.enabled = false;
    if (this.processRailSO) this.processRailSO.enabled = false;
    if (this.rowRemoteCardsSO) this.rowRemoteCardsSO.enabled = false;
    if (this.stepperDotsText) this.stepperDotsText.text = "";
    if (this.whyAccordionSO) this.whyAccordionSO.enabled = false;
    if (this.sourceAccordionSO) this.sourceAccordionSO.enabled = false;
    this.isWhyExpanded = false;
    if (this.whyBtnContent) this.whyBtnContent.text = "❓ WHY?";
    this.isSourceExpanded = false;
    if (this.sourceBtnContent) this.sourceBtnContent.text = "📖 SOURCE";
    if (this.cautionBoxSO) this.cautionBoxSO.enabled = false;
    if (this.safetyBarrierBoxSO) this.safetyBarrierBoxSO.enabled = false;
    if (this.overviewGroupSO) this.overviewGroupSO.enabled = false;
    if (this.procedureActionsRowSO) this.procedureActionsRowSO.enabled = false;
    if (this.completionActionsRowSO) this.completionActionsRowSO.enabled = true;
    this.requestLayoutUpdate();
  }

  private hasVisualForStep(): boolean {
    if (!this.activeProcedure) return false;
    const steps = this.activeProcedure.procedure.steps;
    const step = steps[this.activeStepIndex];
    if (!step) return false;
    const visual = getGuidanceVisual(this.activeProcedure.procedure.procedureId, step.stepId);
    return visual !== null && visual.texture !== null;
  }

  private renderRoadmap(): void {
    if (!this.activeProcedure || !this.overviewRoadmapText) return;
    const steps = this.activeProcedure.procedure.steps;
    let text = "";
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const isCurrent = i === this.activeStepIndex;
      const marker = isCurrent ? "► " : "  ";
      const check = i < this.activeStepIndex ? "✓" : isCurrent ? "●" : "○";
      text += `${marker}${check} Step ${i + 1}: ${step.title}\n`;
    }
    this.overviewRoadmapText.text = text;
  }

  // ── FRAME UPDATE (DIRECTIONAL CUE RECOVERY WITH SCHMITT TRIGGER HYSTERESIS) ─
  public onUpdate(): void {
    if (!this.directionalCueRoot || !this.mentorRoot || !this.cameraObject) return;

    if (!this.mentorRoot.enabled) {
      this.directionalCueRoot.enabled = false;
      this.isCueActive = false;
      return;
    }

    const camTrans = this.cameraObject.getTransform();
    const camPos = camTrans.getWorldPosition();
    const camRot = camTrans.getWorldRotation();

    const panelPos = this.mentorRoot.getTransform().getWorldPosition();
    const toPanel = panelPos.sub(camPos).normalize();
    const camFwd = camRot.multiplyVec3(new vec3(0, 0, -1));

    const dot = camFwd.dot(toPanel);

    // Dual-Threshold Schmitt Trigger Hysteresis (FW-02I-R10)
    // - ENGAGE THRESHOLD (0.90): Turns ON when gaze rotates > 25.84° away
    // - DISENGAGE THRESHOLD (0.94): Turns OFF when user looks back to < 19.95°
    if (!this.isCueActive) {
      if (dot < 0.90) {
        this.isCueActive = true;
      }
    } else {
      if (dot > 0.94) {
        this.isCueActive = false;
      }
    }

    if (this.isCueActive) {
      this.directionalCueRoot.enabled = true;

      const camRight = camRot.multiplyVec3(new vec3(1, 0, 0));
      const rightDot = camRight.dot(toPanel);

      if (this.directionalCueText) {
        if (rightDot > 0.1) {
          this.directionalCueText.text = "MENTOR PANEL ►";
          this.directionalCueRoot.getTransform().setLocalPosition(new vec3(16.0, 0, -45.0));
        } else if (rightDot < -0.1) {
          this.directionalCueText.text = "◄ MENTOR PANEL";
          this.directionalCueRoot.getTransform().setLocalPosition(new vec3(-16.0, 0, -45.0));
        } else {
          this.directionalCueText.text = "▲ MENTOR PANEL";
          this.directionalCueRoot.getTransform().setLocalPosition(new vec3(0, 12.0, -45.0));
        }
      }
    } else {
      this.directionalCueRoot.enabled = false;
    }
  }

  public show(): void {
    this.recenterPanel();
    if (this.mentorRoot) this.mentorRoot.enabled = true;
  }

  public hide(): void {
    this.clearVisualState();
    if (this.mentorRoot) this.mentorRoot.enabled = false;
    if (this.directionalCueRoot) this.directionalCueRoot.enabled = false;
  }

  public getRoot(): SceneObject | null {
    return this.mentorRoot;
  }
}
