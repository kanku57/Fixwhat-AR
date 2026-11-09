/**
 * FixWhatVisualRegistry.ts
 *
 * Authoritative Visual Guidance Asset Registry for FixWhat? AR (Milestone B2.2-R2 Stage D).
 * Maps procedure steps to verified 1200x400 32-bit RGBA guidance textures.
 * All textures are statically loaded via requireAsset() for synchronous zero-latency display.
 */

export interface GuidanceVisual {
  assetId: string;
  texture: Texture | null;
  caption: string;
}

// ── REMOTE TRACK GUIDANCE TEXTURES (AST-REM-01 through 09) ───────────────────
const AST_REM_01: Texture = requireAsset("../../Textures/Guidance/AST-REM-01.png") as Texture;
const AST_REM_02: Texture = requireAsset("../../Textures/Guidance/AST-REM-02.png") as Texture;
const AST_REM_03: Texture = requireAsset("../../Textures/Guidance/AST-REM-03.png") as Texture;
const AST_REM_04: Texture = requireAsset("../../Textures/Guidance/AST-REM-04.png") as Texture;
const AST_REM_05: Texture = requireAsset("../../Textures/Guidance/AST-REM-05.png") as Texture;
const AST_REM_06: Texture = requireAsset("../../Textures/Guidance/AST-REM-06.png") as Texture;
const AST_REM_07: Texture = requireAsset("../../Textures/Guidance/AST-REM-07.png") as Texture;
const AST_REM_08: Texture = requireAsset("../../Textures/Guidance/AST-REM-08.png") as Texture;
const AST_REM_09: Texture = requireAsset("../../Textures/Guidance/AST-REM-09.png") as Texture;

// ── WORKSHOP TRACK GUIDANCE TEXTURES (AST-WRK-01 through 11) ─────────────────
const AST_WRK_01: Texture = requireAsset("../../Textures/Guidance/AST-WRK-01.png") as Texture;
const AST_WRK_02: Texture = requireAsset("../../Textures/Guidance/AST-WRK-02.png") as Texture;
const AST_WRK_03: Texture = requireAsset("../../Textures/Guidance/AST-WRK-03.png") as Texture;
const AST_WRK_04: Texture = requireAsset("../../Textures/Guidance/AST-WRK-04.png") as Texture;
const AST_WRK_05: Texture = requireAsset("../../Textures/Guidance/AST-WRK-05.png") as Texture;
const AST_WRK_06: Texture = requireAsset("../../Textures/Guidance/AST-WRK-06.png") as Texture;
const AST_WRK_07: Texture = requireAsset("../../Textures/Guidance/AST-WRK-07.png") as Texture;
const AST_WRK_08: Texture = requireAsset("../../Textures/Guidance/AST-WRK-08.png") as Texture;
const AST_WRK_09: Texture = requireAsset("../../Textures/Guidance/AST-WRK-09.png") as Texture;
const AST_WRK_10: Texture = requireAsset("../../Textures/Guidance/AST-WRK-10.png") as Texture;
const AST_WRK_11: Texture = requireAsset("../../Textures/Guidance/AST-WRK-11.png") as Texture;

const REMOTE_PROC_ID = "proc_ge_33709_battery_and_tv_setup";
const WORKSHOP_PROC_ID = "proc_wire_soldering_western_union_splice";

// Exact-match step mapping dictionary
const VISUAL_MAP: { [procId: string]: { [stepId: string]: GuidanceVisual } } = {
  [REMOTE_PROC_ID]: {
    "step_remote_open_battery_door": {
      assetId: "AST-REM-01",
      texture: AST_REM_01,
      caption: "📐 GE 33709: REAR CHASSIS BATTERY DOOR REMOVAL"
    },
    "step_remote_inspect_polarity_markings": {
      assetId: "AST-REM-02",
      texture: AST_REM_02,
      caption: "📐 GE 33709: BATTERY BAY POLARITY & SPRING CONTACT IDENTIFICATION"
    },
    "step_remote_insert_battery_left": {
      assetId: "AST-REM-03",
      texture: AST_REM_03,
      caption: "📐 GE 33709: SLOT A (LEFT) CELL 1 30-DEGREE SPRING COMPRESSION"
    },
    "step_remote_insert_battery_right": {
      assetId: "AST-REM-04",
      texture: AST_REM_04,
      caption: "📐 GE 33709: SLOT B (RIGHT) CELL 2 FLAT TOP TERMINAL ENGAGEMENT"
    },
    "step_remote_replace_door": {
      assetId: "AST-REM-05",
      texture: AST_REM_05,
      caption: "📐 GE 33709: BATTERY DOOR GUIDE RAIL ALIGNMENT & CLOSURE"
    },
    "step_remote_enter_setup_mode": {
      assetId: "AST-REM-06",
      texture: AST_REM_06,
      caption: "📐 GE 33709: SETUP BUTTON HOLD & RED LED ACTIVATION"
    },
    "step_remote_select_tv_button": {
      assetId: "AST-REM-07",
      texture: AST_REM_07,
      caption: "📐 GE 33709: TV DEVICE BUTTON SELECTION & LED CONFIRMATION"
    },
    "step_remote_enter_code": {
      assetId: "AST-REM-08",
      texture: AST_REM_08,
      caption: "📐 GE 33709: 4-DIGIT TV CODE ENTRY TEMPLATE & VERSION STICKER"
    },
    "step_remote_verify_tv_operation": {
      assetId: "AST-REM-09",
      texture: AST_REM_09,
      caption: "📐 GE 33709: LINE-OF-SIGHT IR EMISSION & TV VERIFICATION"
    }
  },
  [WORKSHOP_PROC_ID]: {
    "step_solder_verify_safety_and_ppe": {
      assetId: "AST-WRK-01",
      texture: AST_WRK_01,
      caption: "📐 WELLER PPE & WORKBENCH: NON-ENERGIZED 0.0V CIRCUIT SAFETY"
    },
    "step_solder_identify_workshop_tools": {
      assetId: "AST-WRK-02",
      texture: AST_WRK_02,
      caption: "📐 WELLER & WORKSHOP: 8-TOOL SOLDERING BENCH CONFIGURATION"
    },
    "step_solder_slide_heat_shrink": {
      assetId: "AST-WRK-03",
      texture: AST_WRK_03,
      caption: "📐 HEAT-SHRINK: 25MM SLEEVE PRE-POSITIONING (75MM SETBACK)"
    },
    "step_solder_strip_insulation": {
      assetId: "AST-WRK-04",
      texture: AST_WRK_04,
      caption: "📐 CONDUCTOR PREPARATION: 12-15MM STRIP & CLOCKWISE STRAND LAY"
    },
    "step_solder_pre_tin_conductors": {
      assetId: "AST-WRK-05",
      texture: AST_WRK_05,
      caption: "📐 NASA-STD-8739.4 §19.7.1: INDIVIDUAL STRANDED WIRE PRE-TINNING"
    },
    "step_solder_form_western_union_splice": {
      assetId: "AST-WRK-06",
      texture: AST_WRK_06,
      caption: "📐 NASA-STD-8739.4 §19.7: WESTERN UNION MECHANICAL WRAP (>= 3 TURNS)"
    },
    "step_solder_clamp_and_tin_iron": {
      assetId: "AST-WRK-07",
      texture: AST_WRK_07,
      caption: "📐 WELLER TIP MAINTENANCE: BRASS SPONGE WIPE & FRESH THERMAL BRIDGE"
    },
    "step_solder_heat_and_feed": {
      assetId: "AST-WRK-08",
      texture: AST_WRK_08,
      caption: "📐 CAPILLARY SOLDERING: UNDERSIDE HEATING & TOP SOLDER FEED"
    },
    "step_solder_cool_and_inspect": {
      assetId: "AST-WRK-09",
      texture: AST_WRK_09,
      caption: "📐 NASA-STD-8739.3 §13.6: FILLET WORKMANSHIP INSPECTION COMPARATOR"
    },
    "step_solder_contract_heat_shrink": {
      assetId: "AST-WRK-10",
      texture: AST_WRK_10,
      caption: "📐 INSULATION SLEEVING: CENTERED HEAT-SHRINK HOT AIR SWEEP"
    },
    "step_solder_safe_shutdown": {
      assetId: "AST-WRK-11",
      texture: AST_WRK_11,
      caption: "📐 WELLER SHUTDOWN: TIP SACRIFICIAL SOLDER COAT & SAFE REST STORAGE"
    }
  }
};

/**
 * Resolves the visual guidance asset for a given procedureId and stepId.
 * Returns null if no exact mapping exists or if either parameter is falsy.
 */
export function getGuidanceVisual(procedureId: string, stepId: string): GuidanceVisual | null {
  if (!procedureId || !stepId) return null;
  const procMap = VISUAL_MAP[procedureId];
  if (!procMap) return null;
  const visual = procMap[stepId];
  return visual || null;
}

