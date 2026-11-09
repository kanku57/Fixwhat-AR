/**
 * GlassDesignTokens.ts
 *
 * Authoritative Visual Design Tokens for FixWhat? AR (Milestone FW-02I-R10).
 * Approved Visual System: DARK TRANSLUCENT GLASS + WHITE BUTTONS + WHITE / ICE-BLUE TYPOGRAPHY
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * FIXWHAT? AR — SPATIAL GEOMETRY & OPTICAL CALIBRATION SPECIFICATION (R10)
 * ─────────────────────────────────────────────────────────────────────────────
 * SIK / UI Kit Authority: Creative Lens AR Designer (CLAD)
 * Governing Baseline: Candidate C (36.0 cm x 44.0 cm at Z = -85.0 cm, Y = -2.0 cm)
 * Optical Target: Snap Spectacles 2024 (Dual LCoS Holographic Additive Waveguides)
 *
 * SIMULATION vs HARDWARE EVIDENTIARY BOUNDARY:
 * All spatial transforms, visual angles (23.91° H x 29.01° V), and margin buffers
 * (+2.48 cm lateral per side, +5.73 cm vertical bottom clearance) are mathematically
 * verified within the Lens Studio 5.24 Preview Camera frustum.
 *
 * [HARDWARE VALIDATION REQUIRED]:
 * Physical optical waveguide performance—including additive photonic contrast under
 * varying ambient illumination (100–1200 lux), diffraction grating chromatic dispersion,
 * interpupillary distance (58–70 mm IPD) eye-box coverage, and long-session cervical
 * comfort during active manual repairs—remains subject to on-device validation.
 * No physical Spectacles hardware is assumed or claimed in this environment.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { BackPlate } from "SpectaclesUIKit.lspkg/Scripts/BackPlate";
import { Button } from "SpectaclesUIKit.lspkg/Scripts/Components/Button/Button";
import { ElementContent } from "SpectaclesUIKit.lspkg/Scripts/Components/Content/ElementContent";
import { RoundedRectangle } from "SpectaclesUIKit.lspkg/Scripts/Visuals/RoundedRectangle/RoundedRectangle";

// ── COLOR PALETTE TOKENS ──────────────────────────────────────────────────────

/** Primary Electric-Blue for focused button borders and specular accents (#087BFF) */
export const COLOR_PRIMARY_BLUE: vec4 = new vec4(0.031, 0.482, 1.0, 1.0);

/** Ice-Blue Specular Highlight for card rims, borders, and focused hover strokes (#62D8FF) */
export const COLOR_ICE_BLUE: vec4 = new vec4(0.384, 0.847, 1.0, 1.0);

/** Dark Translucent Glass backplate fill (#0F1724 at 72% opacity) for gentle passthrough shading */
export const COLOR_DARK_GLASS: vec4 = new vec4(0.060, 0.090, 0.140, 0.720);

/** Solid Luminous White button face fill (#F5FAFF at 95% opacity) for prominent tactile affordance */
export const COLOR_WHITE_BUTTON_FACE: vec4 = new vec4(0.960, 0.980, 1.000, 0.950);

/** High-Density Deep Navy for typography printed on white button faces (#10243A) */
export const COLOR_DEEP_NAVY: vec4 = new vec4(0.063, 0.141, 0.227, 1.000);
export const COLOR_BUTTON_LABEL_NAVY: vec4 = COLOR_DEEP_NAVY;

/** Pure Crisp Additive White for titles, headings, and instructions on dark glass (#FFFFFF) */
export const COLOR_TEXT_WHITE: vec4 = new vec4(1.000, 1.000, 1.000, 1.000);

/** Luminous Ice-Blue for headers, step counters, and diagram captions (#62D8FF) */
export const COLOR_TEXT_ICE_BLUE: vec4 = COLOR_ICE_BLUE;

/** Supporting Soft Ice-White for descriptions, subtitles, and checklist items (#E2F4FF) */
export const COLOR_TEXT_SUPPORTING: vec4 = new vec4(0.886, 0.957, 1.000, 1.000);

/** Subdued Slate Blue for citations, metadata, and roadmap status tags (#94A3B8 / #536B82) */
export const COLOR_SLATE_BLUE: vec4 = new vec4(0.325, 0.420, 0.510, 1.000);
export const COLOR_TEXT_MUTED: vec4 = new vec4(0.580, 0.639, 0.722, 1.000);
export const COLOR_TEXT_SECONDARY_NAVY: vec4 = new vec4(0.129, 0.227, 0.322, 1.000);

/** High-Intensity Safety Amber for hazard callouts and Step 00 safety barrier (#FFB800) */
export const COLOR_SAFETY_AMBER: vec4 = new vec4(1.000, 0.722, 0.000, 1.000);

/** Caution Border for safety barrier perimeter (#FFA000) */
export const COLOR_CAUTION_BORDER: vec4 = new vec4(1.000, 0.627, 0.000, 0.900);

/** Success Mint for verified checks, completed steps, and ready badges (#00E599) */
export const COLOR_SUCCESS_MINT: vec4 = new vec4(0.000, 0.898, 0.600, 1.000);

/** Inactive/Disabled Slate for disabled controls (#2B3A4A at 50%) */
export const COLOR_DISABLED_SLATE: vec4 = new vec4(0.169, 0.227, 0.290, 0.500);

/** Active Paused Accent for paused state banner (#FF8C00) */
export const COLOR_PAUSED_ACCENT: vec4 = new vec4(1.000, 0.549, 0.000, 1.000);

/** Legacy token aliases for backwards compatibility */
export const COLOR_FROSTED_GLASS: vec4 = COLOR_DARK_GLASS;
export const COLOR_TRANSLUCENT_ICE: vec4 = COLOR_TEXT_SUPPORTING;
export const COLOR_BUTTON_TEXT_WHITE: vec4 = COLOR_TEXT_WHITE;

// ── CENTRALIZED TYPOGRAPHY HIERARCHY (LENS STUDIO ENGINE SCALARS) ────────────
// Em-Square Height Formula: Height(cm) = Component.Text.size / 43.886
// Cap-Height Formula: Cap(cm) = size * 0.015836 cm (Objektiv 0.695 ratio)

/** Role 1: Display / Main Screen Heading (Hero Title) -> Em: 1.003 cm, Cap: 0.697 cm (28.18 arcmin) */
export const FONT_SIZE_DISPLAY: number = 44;

/** Role 2: Instruction Title / Step H1 -> Em: 0.866 cm, Cap: 0.602 cm (24.34 arcmin) */
export const FONT_SIZE_INSTRUCTION_TITLE: number = 38;

/** Role 3: Section Heading / Phase Header / Track Tag -> Em: 0.775 cm, Cap: 0.538 cm (21.78 arcmin) */
export const FONT_SIZE_SECTION_HEADING: number = 34;

/** Role 4: Primary SIK Button Labels (White Face) -> Em: 0.775 cm, Cap: 0.538 cm (21.78 arcmin) */
export const FONT_SIZE_BUTTON_PRIMARY: number = 34;

/** Role 5: Safety Alert Notice / Warning Callout -> Em: 0.729 cm, Cap: 0.507 cm (20.50 arcmin) */
export const FONT_SIZE_SAFETY_ALERT: number = 32;

/** Role 6: Continuous Body Text Floor (STRICT CANONICAL FLOOR AT 85 CM) -> Em: 0.684 cm, Cap: 0.475 cm (19.22 arcmin) */
export const FONT_SIZE_BODY_INSTRUCTION: number = 30;

/** Role 7: Navigation Footer Button Labels (4-Button Row) -> Em: 0.684 cm, Cap: 0.475 cm (19.22 arcmin) */
export const FONT_SIZE_BUTTON_NAV: number = 30;

/** Role 8: Secondary Body Instruction / Bullets -> Em: 0.638 cm, Cap: 0.443 cm (17.94 arcmin) */
export const FONT_SIZE_BODY_SECONDARY: number = 28;

/** Role 9: Supporting Subtitle / Descriptive Text */
export const FONT_SIZE_SUBTITLE: number = 26;

/** Role 10: Card Descriptive Text / Checklist Items (Elevated to meet 26 floor) */
export const FONT_SIZE_CARD_DESC: number = 26;

/** Role 11: Metadata / Source Citation / Small Badges (Elevated to meet 26 floor) */
export const FONT_SIZE_METADATA: number = 26;

/** Role 12: Secondary Button Labels / Modal Controls (Elevated to meet 26 floor) */
export const FONT_SIZE_BUTTON_SECONDARY: number = 26;

/** Role 13: Compact Utility Button Labels / Chips (Elevated to meet 26 floor) */
export const FONT_SIZE_BUTTON_COMPACT: number = 26;

// ── STANDARDIZED SPATIAL DIMENSIONS & METRICS (FW-02I-R10 RECONCILED) ────────

/** Calibrated focal distance for Spectacles 2024 tabletop and workbench repairs (cm) */
export const CAMERA_DISTANCE_STANDARD: number = 85.0;

/** Calibrated vertical offset subtending 1.35 deg downward ergonomic boresight pitch (cm) */
export const CAMERA_Y_OFFSET_STANDARD: number = -2.0;

/** Standard outer application frame dimensions (cm) across EVERY screen (Candidate C) */
export const PANEL_WIDTH_STANDARD: number = 36.0;
export const PANEL_HEIGHT_STANDARD: number = 44.0;

/** Standard usable content dimensions after 2.0 cm frame padding (cm) */
export const CONTENT_WIDTH_STANDARD: number = 32.0;
export const CONTENT_HEIGHT_STANDARD: number = 40.0;

/** Standard instruction diagram dimensions (exact 3:1 aspect ratio, centered in 32.0 cm region) */
export const DIAGRAM_WIDTH: number = 30.0;
export const DIAGRAM_HEIGHT: number = 10.0;
export const DIAGRAM_CONTAINER_WIDTH: number = 30.0;
export const DIAGRAM_CONTAINER_HEIGHT: number = 10.0;

/** Dedicated Enlarged Inspection Modal Canvas Dimensions (cm) */
export const MODAL_WIDTH_STANDARD: number = 36.0;
export const MODAL_HEIGHT_STANDARD: number = 22.0;
export const MODAL_WIDTH: number = 36.0;
export const MODAL_HEIGHT: number = 22.0;
export const MODAL_DIAGRAM_WIDTH: number = 30.0;
export const MODAL_DIAGRAM_HEIGHT: number = 10.0;

/** Standardized button heights across the unified spatial frame */
export const BUTTON_HEIGHT_NAV: number = 4.2;
export const BUTTON_HEIGHT_ACTION: number = 3.8;
export const BUTTON_HEIGHT_CARD: number = 3.8;
export const BUTTON_HEIGHT_MODAL: number = 4.2;
export const BUTTON_HEIGHT_COMPACT: number = 3.2;
export const BUTTON_HEIGHT_CHIP: number = 3.2;
export const BUTTON_HEIGHT_SAFETY: number = 4.2;

/** Decoupled 4-Button Navigation Footer Metrics (Total width 32.0 cm) */
export const BUTTON_NAV_WIDTH: number = 7.55;
export const BUTTON_NAV_GAP: number = 0.6;
export const BUTTON_WIDTH_FOOTER_6: number = 5.0;

// ── SURFACE STYLING HELPERS ──────────────────────────────────────────────────

/**
 * Configures a SpectaclesUIKit BackPlate with Dark Translucent Glass styling
 * and an Ice-Blue specular border. Shaws background noise gently without blinding
 * the user or blocking the real-world pass-through environment.
 */
export function applyDarkTranslucentGlass(backPlate: BackPlate | null, opacity = 0.72): void {
  if (!backPlate) return;
  try {
    (backPlate as any).style = "default";
    const so = backPlate.getSceneObject();
    const rr = (backPlate as any).roundedRectangle || so.getComponent(RoundedRectangle.getTypeName());
    if (rr) {
      rr.gradient = false;
      rr.backgroundColor = new vec4(0.060, 0.090, 0.140, opacity);
      rr.border = true;
      rr.borderColor = COLOR_ICE_BLUE;
      rr.borderSize = 0.12;
      rr.cornerRadius = 1.6;
    }
  } catch (err) {
    print("[GlassDesignTokens] applyDarkTranslucentGlass error: " + err);
  }
}

/**
 * Backward compatibility alias for applyDarkTranslucentGlass.
 */
export function applyGlassWhiteBackPlate(backPlate: BackPlate | null, opacity = 0.72): void {
  applyDarkTranslucentGlass(backPlate, opacity);
}

// ── TYPOGRAPHY STYLING HELPERS ────────────────────────────────────────────────

/**
 * Applies pure White additive styling to a Text component on dark glass.
 */
export function applyWhiteText(textComp: Text | null, size?: number): void {
  if (!textComp) return;
  if (size !== undefined) {
    textComp.size = size;
  }
  if (textComp.textFill) {
    textComp.textFill.color = COLOR_TEXT_WHITE;
  }
}

/**
 * Applies luminous Ice-Blue styling to a Text component for headers and captions.
 */
export function applyIceBlueText(textComp: Text | null, size?: number): void {
  if (!textComp) return;
  if (size !== undefined) {
    textComp.size = size;
  }
  if (textComp.textFill) {
    textComp.textFill.color = COLOR_TEXT_ICE_BLUE;
  }
}

/**
 * Applies supporting soft white styling to descriptive text.
 */
export function applySupportingText(textComp: Text | null, size?: number): void {
  if (!textComp) return;
  if (size !== undefined) {
    textComp.size = size;
  }
  if (textComp.textFill) {
    textComp.textFill.color = COLOR_TEXT_SUPPORTING;
  }
}

/**
 * Applies Safety Amber styling to warning text.
 */
export function applySafetyAmberText(textComp: Text | null, size?: number): void {
  if (!textComp) return;
  if (size !== undefined) {
    textComp.size = size;
  }
  if (textComp.textFill) {
    textComp.textFill.color = COLOR_SAFETY_AMBER;
  }
}

/**
 * Applies high-density Deep Navy styling to a Text component (e.g. for button labels).
 */
export function applyDeepNavyText(textComp: Text | null, size?: number): void {
  if (!textComp) return;
  if (size !== undefined) {
    textComp.size = size;
  }
  if (textComp.textFill) {
    textComp.textFill.color = COLOR_DEEP_NAVY;
  }
}

/**
 * Backward compatibility alias for secondary text styling.
 */
export function applySecondaryNavyText(textComp: Text | null, size?: number): void {
  applySupportingText(textComp, size);
}

// ── BUTTON STYLING HELPERS ───────────────────────────────────────────────────

/**
 * Base helper to style any UIKit Button with the prominent Luminous White-Button aesthetic.
 * All primary, secondary, navigation, and compact buttons share this uniform design.
 */
export function applyWhiteButton(
  button: Button | null,
  content: ElementContent | null,
  labelText?: string,
  textSize?: number,
  isSecondary?: boolean
): void {
  if (button) {
    try {
      // Always enforce Primary style variant for solid, prominent, high-contrast visibility
      (button as any).setVariant({ theme: "SnapOS3", style: "Primary" });
      const so = button.getSceneObject();
      const rr = (button as any).roundedRectangle || so.getComponent(RoundedRectangle.getTypeName());
      if (rr) {
        rr.gradient = false;
        rr.backgroundColor = COLOR_WHITE_BUTTON_FACE;
        rr.border = true;
        rr.borderColor = COLOR_PRIMARY_BLUE;
        rr.borderSize = 0.12;
        rr.cornerRadius = 0.8;
      }
    } catch (_) {}
  }
  if (content) {
    if (labelText !== undefined) {
      content.text = labelText;
    }
    content.textSize = textSize !== undefined ? textSize : FONT_SIZE_BUTTON_PRIMARY;
    content.autoResize = true;
    try {
      (content as any)._useTextColorOverride = true;
      (content as any)._textColorOverride = COLOR_BUTTON_LABEL_NAVY;
    } catch (_) {}
    try {
      const so = content.getSceneObject();
      const textChild = so.getComponent("Component.Text") as Text;
      if (textChild && textChild.textFill) {
        textChild.textFill.color = COLOR_BUTTON_LABEL_NAVY;
      }
    } catch (_) {}
  }
}

/**
 * Variant 1: Primary Action Button (White face, bold deep navy label, electric-blue border).
 */
export function applyPrimaryWhiteButton(
  button: Button | null,
  content: ElementContent | null,
  labelText?: string,
  textSize: number = FONT_SIZE_BUTTON_PRIMARY
): void {
  applyWhiteButton(button, content, labelText, textSize, false);
}

/**
 * Variant 2: Secondary Action Button (Unified White face, deep navy label, electric-blue border).
 */
export function applySecondaryWhiteButton(
  button: Button | null,
  content: ElementContent | null,
  labelText?: string,
  textSize: number = FONT_SIZE_BUTTON_NAV
): void {
  applyWhiteButton(button, content, labelText, textSize, false);
}

/**
 * Variant 3: Navigation Action Button (Standardized 4.2cm nav button in action bar).
 */
export function applyNavigationWhiteButton(
  button: Button | null,
  content: ElementContent | null,
  labelText?: string,
  textSize: number = FONT_SIZE_BUTTON_NAV
): void {
  applyWhiteButton(button, content, labelText, textSize, false);
}

/**
 * Variant 4: Compact Utility Button (Unified White face, deep navy label).
 */
export function applyCompactUtilityButton(
  button: Button | null,
  content: ElementContent | null,
  labelText?: string,
  textSize: number = FONT_SIZE_BUTTON_NAV
): void {
  applyWhiteButton(button, content, labelText, textSize, false);
}

/**
 * Variant 4b: Contextual Chip Button (Unified White face, deep navy label).
 */
export function applyCompactButton(
  button: Button | null,
  content: ElementContent | null,
  labelText?: string,
  textSize: number = FONT_SIZE_BUTTON_NAV
): void {
  applyWhiteButton(button, content, labelText, textSize, false);
}

/**
 * Variant 5: Disabled Action Button (Muted grey-white face, legible slate label).
 */
export function applyDisabledButton(
  button: Button | null,
  content: ElementContent | null,
  labelText?: string,
  textSize: number = FONT_SIZE_BUTTON_NAV
): void {
  if (button) {
    try {
      (button as any).setVariant({ theme: "SnapOS3", style: "Primary" });
      const so = button.getSceneObject();
      const rr = (button as any).roundedRectangle || so.getComponent(RoundedRectangle.getTypeName());
      if (rr) {
        rr.gradient = false;
        rr.backgroundColor = new vec4(0.850, 0.885, 0.925, 0.700);
        rr.border = true;
        rr.borderColor = COLOR_SLATE_BLUE;
        rr.borderSize = 0.08;
      }
    } catch (_) {}
  }
  if (content) {
    if (labelText !== undefined) {
      content.text = labelText;
    }
    content.textSize = textSize;
    content.autoResize = true;
    try {
      (content as any)._useTextColorOverride = true;
      (content as any)._textColorOverride = COLOR_SLATE_BLUE;
    } catch (_) {}
  }
}

/**
 * Variant 6: Safety Confirmation Action Button (48cm prominent white face, amber/navy text).
 */
export function applySafetyConfirmationButton(
  button: Button | null,
  content: ElementContent | null,
  labelText: string,
  isConfirmed: boolean = false
): void {
  if (button) {
    try {
      (button as any).setVariant({ theme: "SnapOS3", style: "Primary" });
      const so = button.getSceneObject();
      const rr = (button as any).roundedRectangle || so.getComponent(RoundedRectangle.getTypeName());
      if (rr) {
        rr.gradient = false;
        rr.backgroundColor = isConfirmed ? new vec4(0.92, 1.0, 0.96, 0.98) : COLOR_WHITE_BUTTON_FACE;
        rr.border = true;
        rr.borderColor = isConfirmed ? COLOR_SUCCESS_MINT : COLOR_SAFETY_AMBER;
        rr.borderSize = 0.16;
        rr.cornerRadius = 0.8;
      }
    } catch (_) {}
  }
  if (content) {
    content.text = labelText;
    content.textSize = FONT_SIZE_BUTTON_PRIMARY;
    content.autoResize = true;
    try {
      (content as any)._useTextColorOverride = true;
      (content as any)._textColorOverride = isConfirmed ? COLOR_DEEP_NAVY : COLOR_DEEP_NAVY;
    } catch (_) {}
  }
}

/**
 * Primary Blue Button alias for backwards compatibility.
 */
export function applyPrimaryBlueButton(
  button: Button | null,
  content: ElementContent | null,
  labelText?: string,
  textSize?: number
): void {
  applyPrimaryWhiteButton(button, content, labelText, textSize);
}

/**
 * Secondary Button alias for backwards compatibility.
 */
export function applySecondaryButton(
  button: Button | null,
  content: ElementContent | null,
  labelText?: string,
  textSize?: number
): void {
  applySecondaryWhiteButton(button, content, labelText, textSize);
}
