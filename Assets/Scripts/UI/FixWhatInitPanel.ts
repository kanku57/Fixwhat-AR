/**
 * FixWhatInitPanel.ts
 *
 * Implements the branded Startup Initialization Experience for FixWhat? AR (FW-02 / FW-02I).
 * Approved Visual System: GLASS-WHITE + GLOSSY ELECTRIC-BLUE
 *
 * Follows the real 8-step initialization lifecycle:
 * 1. Runtime bootstrap begins.
 * 2. Required UI and interaction components initialize.
 * 3. Procedure data is loaded from store.
 * 4. Required procedure contracts are validated against schemas.
 * 5. Required visual assets (schematics/diagrams) are checked & prepared.
 * 6. Safety and source metadata readiness is checked.
 * 7. Application enters a clear READY state with interactive action trigger.
 * 8. Deliberate transition to Welcome screen.
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
  FlexAlignSelf,
} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexTypes";
import { IMAGE_MATERIAL_ASSET } from "SpectaclesUIKit.lspkg/Scripts/Utility/Assets";
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
  COLOR_SUCCESS_MINT,
  PANEL_WIDTH_STANDARD,
  PANEL_HEIGHT_STANDARD,
  CONTENT_WIDTH_STANDARD,
  CAMERA_DISTANCE_STANDARD,
  CAMERA_Y_OFFSET_STANDARD,
  BUTTON_HEIGHT_NAV,
  BUTTON_HEIGHT_ACTION,
  FONT_SIZE_DISPLAY,
  FONT_SIZE_SECTION_HEADING,
  FONT_SIZE_SUBTITLE,
  FONT_SIZE_METADATA,
  FONT_SIZE_BUTTON_PRIMARY,
  applyDarkTranslucentGlass,
  applyGlassWhiteBackPlate,
  applyWhiteText,
  applyIceBlueText,
  applySupportingText,
  applyDeepNavyText,
  applyWhiteButton,
  applyPrimaryWhiteButton,
} from "./GlassDesignTokens";

const INIT_PANEL_WIDTH = 34.0; // Compact, balanced width calibrated for Spectacles 2024 FOV
const INIT_PANEL_HEIGHT = 18.5; // Compact banner height (checklist hidden per CLAD directive)
const INIT_CAMERA_Y_OFFSET = 0.0; // Centered at eye level (0.0 cm offset)

// Brand Assets loaded via direct asset references (CLAD IconSelector)
const LOGO_BOLT_TEXTURE: Texture = requireAsset("../../Icons/bolt.png") as Texture;
const LOGO_HANDYMAN_TEXTURE: Texture = requireAsset("../../Icons/handyman.png") as Texture;

export interface SubsystemStatus {
  name: string;
  status: "PENDING" | "CHECKING" | "READY" | "FAILED";
  detail: string;
}

export class FixWhatInitPanel {
  private cameraObject: SceneObject | null = null;
  private initRoot: SceneObject | null = null;
  private backPlate: BackPlate | null = null;
  private contentHost: SceneObject | null = null;
  private flexRoot: FlexLayout | null = null;

  // Header & Brand Logos
  private brandHeaderSO: SceneObject | null = null;
  private logoBoltSO: SceneObject | null = null;
  private logoBoltImage: Image | null = null;
  private logoToolsSO: SceneObject | null = null;
  private logoToolsImage: Image | null = null;
  private titleSO: SceneObject | null = null;
  private titleText: Text | null = null;
  private taglineSO: SceneObject | null = null;
  private taglineText: Text | null = null;
  private statusHeaderSO: SceneObject | null = null;
  private statusHeaderBadge: Text | null = null;

  // Progress UI
  private progressSO: SceneObject | null = null;
  private progressBarText: Text | null = null;
  private progressPercentText: Text | null = null;

  // Checklist Items (4 real subsystems)
  private checklistRowSOs: SceneObject[] = [];
  private checklistTexts: Text[] = [];
  private subsystems: SubsystemStatus[] = [
    { name: "AR SPATIAL RUNTIME", status: "PENDING", detail: "Spectacles 2024 SIK 2.0.0" },
    { name: "PROCEDURE CONTRACTS", status: "PENDING", detail: "GE 33709 & Wire Workshop fixtures" },
    { name: "VISUAL ASSET PIPELINE", status: "PENDING", detail: "Technical schematics & textures" },
    { name: "SAFETY & SOURCE REGISTRY", status: "PENDING", detail: "Weller p.14 & NASA-STD-8739.4 §19.7" },
  ];

  // Action Button
  private actionButtonSO: SceneObject | null = null;
  private actionButtonContent: ElementContent | null = null;

  // State
  private currentProgress: number = 0; // 0 to 100
  private isReady: boolean = false;
  private hasFailed: boolean = false;

  // Event fired when learner confirms "GET STARTED" to proceed to Welcome
  public onInitComplete = new Event<void>();

  public initialize(cameraObj?: SceneObject): void {
    this.cameraObject = cameraObj || null;

    // 1. Create Root Scene Object
    this.initRoot = global.scene.createSceneObject("FixWhat_InitPanel");
    this.initRoot.createComponent("Component.Canvas");

    // 2. Add BackPlate with Dark Translucent Glass Styling (Centered Banner Frame)
    this.backPlate = this.initRoot.createComponent(BackPlate.getTypeName()) as BackPlate;
    this.backPlate.size = new vec2(INIT_PANEL_WIDTH, INIT_PANEL_HEIGHT);
    applyDarkTranslucentGlass(this.backPlate, 0.72);

    // 3. Position in Front of User (Eye-Level Center at 85cm Focal Distance)
    this.positionPanelInFrontOfCamera(CAMERA_DISTANCE_STANDARD, INIT_CAMERA_Y_OFFSET);

    // 4. Create Content Host with FlexLayout (Z-offset +0.6 cm)
    this.contentHost = global.scene.createSceneObject("Init_Content");
    this.contentHost.setParent(this.initRoot);
    this.contentHost.getTransform().setLocalPosition(new vec3(0, 0, 0.6));

    this.flexRoot = this.contentHost.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    this.flexRoot.width = INIT_PANEL_WIDTH;
    this.flexRoot.height = INIT_PANEL_HEIGHT;
    this.flexRoot.direction = FlexDirection.Column;
    this.flexRoot.justifyContent = FlexJustify.Center;
    this.flexRoot.alignItems = FlexAlign.Center;
    this.flexRoot.rowGap = 0.4;
    this.flexRoot.paddingTop = 1.2;
    this.flexRoot.paddingBottom = 1.2;
    this.flexRoot.paddingLeft = 1.6;
    this.flexRoot.paddingRight = 1.6;

    this.flexRoot.onLayoutComplete.add((_result) => {
      if (this.backPlate) {
        this.backPlate.size = new vec2(INIT_PANEL_WIDTH, INIT_PANEL_HEIGHT);
        applyDarkTranslucentGlass(this.backPlate, 0.72);
      }
    });

    // 5. Build Subsystem Sections
    this.buildBrandHeader();
    this.buildProgressSection();
    this.buildChecklistSection();
    this.buildActionSection();

    print("[FixWhatInitPanel] Initialized Startup Initialization System with Glass-White Styling.");
  }

  private positionPanelInFrontOfCamera(distanceCm: number, yOffsetCm: number): void {
    if (!this.initRoot) return;

    if (this.cameraObject) {
      const camTrans = this.cameraObject.getTransform();
      const camPos = camTrans.getWorldPosition();
      const camRot = camTrans.getWorldRotation();

      const fwd = camRot.multiplyVec3(new vec3(0, 0, -1));
      const up = camRot.multiplyVec3(new vec3(0, 1, 0));

      const targetPos = camPos.add(fwd.uniformScale(distanceCm)).add(up.uniformScale(yOffsetCm));
      this.initRoot.getTransform().setWorldPosition(targetPos);
      this.initRoot.getTransform().setWorldRotation(camRot);
    } else {
      this.initRoot.getTransform().setWorldPosition(new vec3(0, yOffsetCm, -distanceCm));
      this.initRoot.getTransform().setWorldRotation(quat.quatIdentity());
    }
  }

  private buildBrandHeader(): void {
    this.brandHeaderSO = global.scene.createSceneObject("Init_BrandHeader");
    this.brandHeaderSO.setParent(this.contentHost!);

    const headerFlex = this.brandHeaderSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    headerFlex.direction = FlexDirection.Column;
    headerFlex.justifyContent = FlexJustify.Center;
    headerFlex.alignItems = FlexAlign.Center;
    headerFlex.rowGap = 0.2;
    headerFlex.width = -1;
    headerFlex.height = -1;
    const headerItem = this.brandHeaderSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    headerItem.overrideHeight = 6.2;
    headerItem.alignSelf = FlexAlignSelf.Center;

    // Brand Row (Logo + Title + Tools)
    const brandRowSO = global.scene.createSceneObject("Init_BrandRow");
    brandRowSO.setParent(this.brandHeaderSO);
    const rowFlex = brandRowSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    rowFlex.direction = FlexDirection.Row;
    rowFlex.justifyContent = FlexJustify.Center;
    rowFlex.alignItems = FlexAlign.Center;
    rowFlex.columnGap = 0.8;
    rowFlex.width = -1;
    rowFlex.height = 3.0;
    brandRowSO.createComponent(FlexItem.getTypeName());

    // Left Icon (Bolt)
    if (LOGO_BOLT_TEXTURE) {
      this.logoBoltSO = global.scene.createSceneObject("Init_LogoBolt");
      this.logoBoltSO.setParent(brandRowSO);
      this.logoBoltImage = this.logoBoltSO.createComponent("Component.Image") as Image;
      this.logoBoltImage.mainMaterial = IMAGE_MATERIAL_ASSET;
      this.logoBoltImage.mainPass.baseTex = LOGO_BOLT_TEXTURE;
      if (this.logoBoltImage.mainPass) {
        this.logoBoltImage.mainPass.baseColor = COLOR_ICE_BLUE;
      }
      const boltItem = this.logoBoltSO.createComponent(FlexItem.getTypeName()) as FlexItem;
      boltItem.overrideWidth = 2.0;
      boltItem.overrideHeight = 2.0;
    }

    // Title: FIXWHAT? AR
    this.titleSO = global.scene.createSceneObject("Init_Title");
    this.titleSO.setParent(brandRowSO);
    this.titleText = this.titleSO.createComponent("Component.Text") as Text;
    this.titleText.depthTest = true;
    this.titleText.size = FONT_SIZE_DISPLAY;
    this.titleText.text = "FIXWHAT? AR";
    this.titleText.horizontalAlignment = HorizontalAlignment.Center;
    this.titleText.verticalAlignment = VerticalAlignment.Center;
    this.titleText.horizontalOverflow = HorizontalOverflow.Overflow;
    applyWhiteText(this.titleText, FONT_SIZE_DISPLAY);
    const titleItem = this.titleSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    titleItem.overrideHeight = 2.4;

    // Right Icon (Handyman Tools)
    if (LOGO_HANDYMAN_TEXTURE) {
      this.logoToolsSO = global.scene.createSceneObject("Init_LogoTools");
      this.logoToolsSO.setParent(brandRowSO);
      this.logoToolsImage = this.logoToolsSO.createComponent("Component.Image") as Image;
      this.logoToolsImage.mainMaterial = IMAGE_MATERIAL_ASSET;
      this.logoToolsImage.mainPass.baseTex = LOGO_HANDYMAN_TEXTURE;
      if (this.logoToolsImage.mainPass) {
        this.logoToolsImage.mainPass.baseColor = COLOR_ICE_BLUE;
      }
      const toolsItem = this.logoToolsSO.createComponent(FlexItem.getTypeName()) as FlexItem;
      toolsItem.overrideWidth = 2.0;
      toolsItem.overrideHeight = 2.0;
    }

    // Tagline: Practical Spatial Learning
    this.taglineSO = global.scene.createSceneObject("Init_Tagline");
    this.taglineSO.setParent(this.brandHeaderSO);
    this.taglineText = this.taglineSO.createComponent("Component.Text") as Text;
    this.taglineText.depthTest = true;
    this.taglineText.size = FONT_SIZE_SUBTITLE;
    this.taglineText.text = "Spatial Diagnostics & Practical Vocational Repair";
    this.taglineText.horizontalAlignment = HorizontalAlignment.Center;
    this.taglineText.verticalAlignment = VerticalAlignment.Center;
    applyIceBlueText(this.taglineText, FONT_SIZE_SUBTITLE);
    const tagItem = this.taglineSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    tagItem.overrideHeight = 1.6;

    // Dynamic Status Badge Header
    this.statusHeaderSO = global.scene.createSceneObject("Init_StatusBanner");
    this.statusHeaderSO.setParent(this.brandHeaderSO);
    this.statusHeaderBadge = this.statusHeaderSO.createComponent("Component.Text") as Text;
    this.statusHeaderBadge.depthTest = true;
    this.statusHeaderBadge.size = 24;
    this.statusHeaderBadge.text = "INITIALIZING AR SUBSYSTEMS...";
    this.statusHeaderBadge.horizontalAlignment = HorizontalAlignment.Center;
    if (this.statusHeaderBadge.textFill) this.statusHeaderBadge.textFill.color = COLOR_ICE_BLUE;
    const badgeItem = this.statusHeaderSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    badgeItem.overrideHeight = 1.6;
    badgeItem.marginTop = 0.2;
  }

  private buildProgressSection(): void {
    this.progressSO = global.scene.createSceneObject("Init_ProgressRow");
    this.progressSO.setParent(this.contentHost!);

    const progFlex = this.progressSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    progFlex.direction = FlexDirection.Row;
    progFlex.justifyContent = FlexJustify.Center;
    progFlex.alignItems = FlexAlign.Center;
    progFlex.columnGap = 1.0;
    progFlex.width = -1;
    progFlex.height = 2.2;
    const progItem = this.progressSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    progItem.overrideHeight = 2.2;
    progItem.alignSelf = FlexAlignSelf.Center;
    progItem.marginTop = 0.2;
    progItem.marginBottom = 0.2;

    // Progress bar visualization using character blocks
    const barSO = global.scene.createSceneObject("Init_ProgressBar");
    barSO.setParent(this.progressSO);
    this.progressBarText = barSO.createComponent("Component.Text") as Text;
    this.progressBarText.depthTest = true;
    this.progressBarText.size = FONT_SIZE_METADATA;
    this.progressBarText.text = "░░░░░░░░░░░░░░░░░░░░";
    this.progressBarText.horizontalAlignment = HorizontalAlignment.Center;
    this.progressBarText.verticalAlignment = VerticalAlignment.Center;
    if (this.progressBarText.textFill) this.progressBarText.textFill.color = COLOR_ICE_BLUE;
    const barItem = barSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    barItem.overrideHeight = 2.0;

    // Progress percent
    const pctSO = global.scene.createSceneObject("Init_ProgressPct");
    pctSO.setParent(this.progressSO);
    this.progressPercentText = pctSO.createComponent("Component.Text") as Text;
    this.progressPercentText.depthTest = true;
    this.progressPercentText.size = FONT_SIZE_METADATA;
    this.progressPercentText.text = "0%";
    this.progressPercentText.horizontalAlignment = HorizontalAlignment.Center;
    this.progressPercentText.verticalAlignment = VerticalAlignment.Center;
    applyWhiteText(this.progressPercentText, FONT_SIZE_METADATA);
    const pctItem = pctSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    pctItem.overrideHeight = 2.0;
  }

  private buildChecklistSection(): void {
    const checkSO = global.scene.createSceneObject("Init_Checklist");
    checkSO.setParent(this.contentHost!);

    const checkFlex = checkSO.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    checkFlex.direction = FlexDirection.Column;
    checkFlex.justifyContent = FlexJustify.Start;
    checkFlex.alignItems = FlexAlign.Stretch;
    checkFlex.rowGap = 0.3;
    checkFlex.width = -1;
    checkFlex.height = -1;
    checkSO.createComponent(FlexItem.getTypeName());

    this.checklistRowSOs = [];
    this.checklistTexts = [];

    for (let i = 0; i < this.subsystems.length; i++) {
      const sub = this.subsystems[i];
      const row = global.scene.createSceneObject("Init_CheckRow_" + i);
      row.setParent(checkSO);

      const rowFlex = row.createComponent(FlexLayout.getTypeName()) as FlexLayout;
      rowFlex.direction = FlexDirection.Row;
      rowFlex.justifyContent = FlexJustify.SpaceBetween;
      rowFlex.alignItems = FlexAlign.Center;
      rowFlex.width = -1;
      rowFlex.height = 2.0;
      row.createComponent(FlexItem.getTypeName());

      const tSO = global.scene.createSceneObject("Init_CheckText_" + i);
      tSO.setParent(row);
      const textComp = tSO.createComponent("Component.Text") as Text;
      textComp.depthTest = true;
      textComp.size = FONT_SIZE_METADATA;
      textComp.text = "○  " + sub.name + " (" + sub.detail + ")";
      applySupportingText(textComp, FONT_SIZE_METADATA);
      tSO.createComponent(FlexItem.getTypeName());

      this.checklistRowSOs.push(row);
      this.checklistTexts.push(textComp);
    }

    // Hide checklist section per user directive ("hide the text below(Ai spatial,..etc)")
    checkSO.enabled = false;
  }

  private buildActionSection(): void {
    this.actionButtonSO = global.scene.createSceneObject("Init_BtnAction");
    this.actionButtonSO.setParent(this.contentHost!);

    const btn = this.actionButtonSO.createComponent(Button.getTypeName()) as Button;
    this.actionButtonContent = this.actionButtonSO.createComponent(ElementContent.getTypeName()) as ElementContent;
    applyPrimaryWhiteButton(btn, this.actionButtonContent, "⏳ VERIFYING AR SYSTEM...");
    this.actionButtonContent.textSize = FONT_SIZE_BUTTON_PRIMARY;

    btn.onTriggerUp.add(() => {
      if (this.isReady) {
        print("[FixWhatInitPanel] Learner tapped GET STARTED. Proceeding to Welcome.");
        this.onInitComplete.invoke();
      }
    });

    const item = this.actionButtonSO.createComponent(FlexItem.getTypeName()) as FlexItem;
    item.alignSelf = FlexAlignSelf.Center;
    item.overrideHeight = BUTTON_HEIGHT_ACTION;
    item.overrideWidth = 28.0;
    item.marginTop = 0.4;
  }

  // ── LIFECYCLE CONTROLLER METHODS ───────────────────────────────────────────

  public updateSubsystem(index: number, status: "PENDING" | "CHECKING" | "READY" | "FAILED", detail?: string): void {
    if (index < 0 || index >= this.subsystems.length) return;

    this.subsystems[index].status = status;
    if (detail) {
      this.subsystems[index].detail = detail;
    }

    // Update text
    const textComp = this.checklistTexts[index];
    if (textComp) {
      if (status === "READY") {
        textComp.text = "✓  " + this.subsystems[index].name + ": " + this.subsystems[index].detail;
        if (textComp.textFill) textComp.textFill.color = COLOR_SUCCESS_MINT;
      } else if (status === "FAILED") {
        textComp.text = "✗  " + this.subsystems[index].name + ": " + this.subsystems[index].detail;
        if (textComp.textFill) textComp.textFill.color = COLOR_SAFETY_AMBER;
        this.hasFailed = true;
      } else if (status === "CHECKING") {
        textComp.text = "►  " + this.subsystems[index].name + ": Checking...";
        if (textComp.textFill) textComp.textFill.color = COLOR_ICE_BLUE;
      }
    }

    // Recalculate overall progress
    let readyCount = 0;
    for (let i = 0; i < this.subsystems.length; i++) {
      if (this.subsystems[i].status === "READY") readyCount++;
    }
    const pct = Math.floor((readyCount / this.subsystems.length) * 100);
    this.setProgress(pct);

    if (readyCount === this.subsystems.length) {
      this.markAllReady();
    }
  }

  private setProgress(pct: number): void {
    this.currentProgress = Math.min(100, Math.max(0, pct));
    if (this.progressPercentText) {
      this.progressPercentText.text = this.currentProgress + "%";
    }

    if (this.progressBarText) {
      const totalBlocks = 20;
      const filledBlocks = Math.round((this.currentProgress / 100) * totalBlocks);
      let bar = "";
      for (let b = 0; b < totalBlocks; b++) {
        bar += b < filledBlocks ? "█" : "░";
      }
      this.progressBarText.text = bar;
    }
  }

  public markAllReady(): void {
    this.isReady = true;
    if (this.statusHeaderBadge) {
      this.statusHeaderBadge.text = "ALL STARTUP CHECKS PASSED • SYSTEM READY";
      if (this.statusHeaderBadge.textFill) this.statusHeaderBadge.textFill.color = COLOR_SUCCESS_MINT;
    }
    if (this.actionButtonContent) {
      this.actionButtonContent.text = "GET STARTED ►";
    }

    if (this.flexRoot) {
      this.flexRoot.markDirty();
      this.flexRoot.forceLayout();
    }
  }

  public getIsReady(): boolean {
    return this.isReady;
  }

  public hide(): void {
    if (this.initRoot) this.initRoot.enabled = false;
  }

  public show(): void {
    this.positionPanelInFrontOfCamera(CAMERA_DISTANCE_STANDARD, INIT_CAMERA_Y_OFFSET);
    if (this.initRoot) this.initRoot.enabled = true;
    if (this.flexRoot) {
      this.flexRoot.markDirty();
      this.flexRoot.forceLayout();
    }
  }

  public getRoot(): SceneObject | null {
    return this.initRoot;
  }
}
