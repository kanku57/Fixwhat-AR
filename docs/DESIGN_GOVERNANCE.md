# FixWhat? Design Governance & Spatial UI System Specification

**Document Identifier:** DGE-01 (Correction Pass: DGE-01-CORR-02)  
**Target Platform:** Snap Spectacles (SPECS 2024) via Lens Studio 5.24.1.26100516 · SpecsBaseTemplate  
**Document Status:** `PROPOSED (Pending Human Review & Authorization)` — Non-Authoritative Until Explicitly Adopted  
**Authoritative Baseline:** Project Constitution (`docs/PROJECT_CONSTITUTION.md`), `AGENTS.md`, and Architectural Decision Log (`docs/DECISION_LOG.md`)  
**Visual Reference Asset:** FixWhat? Full-Application Storyboard (15-Screen Reference Panel, October 2026)  
**Last Updated:** 2026-10-29

---

## 1. Authority Hierarchy, Scope Boundaries, and Adoption Status

### 1.1 Non-Authoritative Status Notice
This document (`DGE-01`) is a **proposed design specification**. It is **not yet authoritative or binding** upon the project. It becomes authoritative if and only if the human developer (USER) explicitly approves and adopts it (alongside proposed `ADR-010`). Until such explicit authorization is granted:
- It serves as a structured proposal and review baseline.
- It does not authorize runtime changes, new screen implementations, or milestone advancement.

### 1.2 Separation of Independent Governance Gates
The following three project milestones and decisions are **strictly independent**:
1. **Gate A: Milestone 3 / M3.1 Preview Acceptance:** Human review and sign-off on the M3.1 spatial HUD readability correction in Lens Studio Preview.
2. **Gate B: DGE-01 / ADR-010 Design Governance Adoption:** Human review and formal adoption of this design-governance contract.
3. **Gate C: Milestone 4 Authorization:** Human decision to enter and begin implementation of Milestone 4 (Dual-Mode Architecture & Procedure State Machine).

*Approval of one gate does NOT imply approval of any other. Each requires separate, explicit human authorization.*

### 1.3 Four-Tier Authority Hierarchy
All design, architectural, and implementation decisions within FixWhat? are governed by the following strict hierarchy:

```
+------------------------------------------------------------------------------+
| LEVEL 1: PROJECT CONSTITUTION & EXPLICIT USER DECISIONS                     |
| Binding ethical imperatives: Safety-first, User-in-the-loop, Zero secrets,    |
| Human developer sole authorizing primacy.                                   |
+------------------------------------------------------------------------------+
                                       │
                                       ▼
+------------------------------------------------------------------------------+
| LEVEL 2: APPROVED ARCHITECTURE & ACCEPTED DECISION RECORDS                  |
| docs/ARCHITECTURE.md, docs/DECISION_LOG.md (Accepted ADRs only).            |
| Governs system boundaries, data contracts, and toolchain limits.            |
+------------------------------------------------------------------------------+
                                       │
                                       ▼
+------------------------------------------------------------------------------+
| LEVEL 3: APPROVED DESIGN SYSTEMS & SCREEN SPECIFICATIONS                    |
| docs/DESIGN_GOVERNANCE.md (PROPOSED), devpost/design-brief.md (PROPOSED).    |
| Governs visual language, typography, spatial layout, and screen inventory.  |
+------------------------------------------------------------------------------+
                                       │
                                       ▼
+------------------------------------------------------------------------------+
| LEVEL 4: IMPLEMENTATION DETAILS & RUNTIME CODE                              |
| Assets/Scripts/**/*.ts, Assets/Scene.scene, component configurations.       |
| Must conform strictly to Levels 1, 2, and 3.                                |
+------------------------------------------------------------------------------+
```

### 1.4 Conflict Escalation Protocol
- If a proposed visual layout, storyboard depiction, or design token conflicts with Level 1 (e.g. obscuring a safety barrier) or Level 2 (e.g. requiring dynamic cloud OCR not supported by the architecture), **the higher tier strictly prevails**.
- Agents and contributors must **never silently resolve conflicts** by assuming requirements or dropping safety/citation data.
- Any discrepancy between visual aesthetics and procedural contract rules must be escalated in writing to the human developer.

### 1.5 Storyboard Authority and Scope Boundaries
The user-supplied 15-screen **FixWhat? Full-Application Storyboard** image (inspected in context) serves as the **approved visual-direction reference only to the extent explicitly authorized by the user**.
- **What it provides:** Target aesthetic direction (dark obsidian backing plates, cyan brand accents, high-contrast ice-white typography, semantic hazard badges, and vertical card groupings) and the envisioned end-to-end user journey (Screens 1 through 15).
- **What it DOES NOT provide:**
  - It does **not** grant blanket authorization to implement every depicted screen immediately.
  - It does **not** authorize new screens, runtime flows, navigation changes, or interaction models.
  - It does **not** alter the authoritative procedure content, data contracts, or safety semantics.
  - It does **not** override existing roadmap milestone assignments or toolchain constraints.
- **Implementation Reality:** Screens beyond authorized Milestone 3 scope are documented herein as `PROPOSED (Future Scope)` and remain unbuilt.

---

## 2. Core Design Principles for AR Equipment Guidance

1. **Clarity Before Decoration:**
   - Augmented reality for equipment repair is an instructional aid, not an entertainment lens.
   - Virtual elements must never compete with or distract from the physical appliance being repaired. Decorative animations, floating particles, or unnecessary 3D ornaments are prohibited.
2. **Readability is a Functional Requirement:**
   - Instruction text that cannot be effortlessly read at arm's length fails the product's primary safety and educational mission.
   - Text sizing, line wrapping, and contrast must be calculated and tested to ensure legibility, supported by dark obsidian backing plates.
3. **Explicit Semantic Priority for Safety (Display vs. Enforcement):**
   - Safety notices must visually dominate procedural instructions whenever present.
   - Hazard severity must never be communicated through color alone; explicit textual badges (`⛔ [DANGER SAFETY BARRIER]`, `⚠️ [CAUTION WARNING]`, `ℹ️ [PROCEDURAL NOTE]`) are mandatory.
   - **Crucial Distinction (Display vs. Enforcement):**
     - *Warning Displayed:* The user visually sees a danger notice and textual alert on screen.
     - *Gate Implemented:* Runtime logic prevents forward navigation (`Next ->`) until a mandatory physical condition is explicitly confirmed.
     - *Gate Tested:* Automated or documented manual test evidence proves that progression cannot be bypassed while the condition is unfulfilled.
     - *Human Accepted:* The human developer has reviewed and explicitly accepted the safety gate behavior.
     - *Current Milestone Status:* In the current M3/M3.1 runtime, danger notices are **DISPLAYED ONLY**. The interactive blocking confirmation gate is **NOT YET IMPLEMENTED AND NOT VERIFIED** (scheduled for Milestone 6). Displaying a danger card does not constitute safety enforcement.
4. **Authoritative Content & Citation Integrity:**
   - To make a layout fit, agents must **never truncate** authoritative `instructionText`, omit `safetyNotice`, or delete source citations (`documentCode`, page numbers, section references).
   - If text length exceeds default bounds, the component must expand its vertical allocation, wrap cleanly, or employ controlled scrolling—never truncate.
   - Educational procedure steps must remain clearly distinguished from formal standards or manufacturer warranties.
5. **Consistency Across the Entire Lifecycle:**
   - Shared typography tokens, color palettes, button shapes, and card padding must be used across all screens.
   - Reusable component primitives must be instantiated rather than coding ad-hoc visual layouts for individual screens.
6. **Platform & Hardware Honesty:**
   - Desktop Lens Studio Preview simulation renders on a 2D monitor with full sRGB color space and black pixels. Physical Spectacles 2024 hardware utilizes an additive optical see-through waveguide where black is completely transparent and bright ambient light can wash out low-contrast elements.
   - Desktop Preview legibility does **not** establish physical Spectacles optical legibility. Statements such as "100% legible" are prohibited unless qualified by specific, evidence-backed acceptance criteria.

---

## 3. Spatial Design-System Contract

### 3.1 Spatial Positioning & Field of View (FOV) Envelope

| Parameter | Value | Evidence Classification | Technical Rationale |
| :--- | :---: | :--- | :--- |
| **Spatial Anchor Rig** | `Camera Object` | `IMPLEMENTED IN RUNTIME (M3.1)` | Head-relative lazy-follow / fixed focal rig keeps guidance in user view. |
| **Viewing Distance ($z$)** | $-85	ext{ cm}$ | `CALCULATED TARGET (PREVIEW OBSERVED)` | Natural arm's-length focal depth; positions HUD above manual work area. Physical optical comfort remains `PHYSICAL HARDWARE UNVERIFIED`. |
| **Vertical Center ($y$)** | $-3	ext{ cm}$ | `CALCULATED TARGET (PREVIEW OBSERVED)` | Slightly below direct eye level, preserving clear line of sight to physical appliance. |
| **Panel Width** | $50	ext{ cm}$ | `CALCULATED TARGET (PREVIEW OBSERVED)` | Subtends $pprox 32.7^\circ$ horizontal FOV at 85 cm. Local text layout width: `Rect.create(-24.0, 24.0, -h, h)`. |
| **Panel Height Envelope** | $\le 32	ext{ cm}$ | `CALCULATED TARGET (PREVIEW OBSERVED)` | Subtends $pprox 21.3^\circ$ vertical FOV at 85 cm, within the estimated Spectacles $27^\circ$ vertical display FOV. |

*Note: All physical optical waveguide characteristics (ambient washout, eye relief, real-world chromatic dispersion) remain `PHYSICAL HARDWARE UNVERIFIED` pending physical device availability.*

### 3.2 Typography Tokens & Angular Legibility

In Lens Studio 5.16+, text height follows: $	ext{em height (cm)} = rac{	ext{size}}{43.886}$.

| Token Name | Studio Size | Calculated Em Height | Calculated Angular Subtense (at 85 cm) | Usage / Role | Evidence Classification |
| :--- | :---: | :---: | :---: | :--- | :--- |
| `TYPE_HERO_TITLE` | 44 | $1.00	ext{ cm}$ | $0.67^\circ$ ($40.4	ext{ arcmin}$) | Application titles, modal headlines | `PROPOSED TARGET (UNBUILT)` |
| `TYPE_HEADLINE` | 36 | $0.82	ext{ cm}$ | $0.55^\circ$ ($33.2	ext{ arcmin}$) | Step action titles, completion headers | `IMPLEMENTED IN M3.1 (HUMAN PREVIEW ACCEPTANCE PENDING)` |
| `TYPE_BODY_INSTRUCTION`| 36 | $0.82	ext{ cm}$ | $0.55^\circ$ ($33.2	ext{ arcmin}$) | Authoritative step instructions | `IMPLEMENTED IN M3.1 (HUMAN PREVIEW ACCEPTANCE PENDING)` |
| `TYPE_HEADER_META` | 32 | $0.73	ext{ cm}$ | $0.49^\circ$ ($29.5	ext{ arcmin}$) | App identity, step counter (`STEP 01 / 09`) | `IMPLEMENTED IN M3.1 (HUMAN PREVIEW ACCEPTANCE PENDING)` |
| `TYPE_SAFETY_NOTICE` | 30 | $0.68	ext{ cm}$ | $0.46^\circ$ ($27.6	ext{ arcmin}$) | Hazard alerts, caution advisories | `IMPLEMENTED IN M3.1 (HUMAN PREVIEW ACCEPTANCE PENDING)` |
| `TYPE_FOOTER_SUPPORT` | 24 | $0.55	ext{ cm}$ | $0.37^\circ$ ($22.2	ext{ arcmin}$) | Tools required, citations, navigation hints | `IMPLEMENTED IN M3.1 (HUMAN PREVIEW ACCEPTANCE PENDING)` |
| `TYPE_CAPTION_MUTED` | 20 | $0.46	ext{ cm}$ | $0.31^\circ$ ($18.6	ext{ arcmin}$) | Secondary metadata, version codes | `PROPOSED TARGET (UNBUILT)` |

**Text Wrapping Target:**
- Explicit character wrap boundary: **45 to 50 characters per line** (`horizontalOverflow = HorizontalOverflow.Wrap`).
- *Status:* Implemented in M3.1 runtime; verified by automated TypeScript compilation; human aesthetic review pending.

### 3.3 Color Palette & Semantic Tokens

```
Brand & Identity:
  PRIMARY_CYAN       = vec4(0.25, 0.85, 1.00, 1.00)  [#40D9FF]  (Active accents, primary CTA, step headers)
  DARK_OBSIDIAN_BG   = vec4(0.04, 0.06, 0.10, 0.88)  [#0A0F1A]  (High-contrast backdrop plate, 88% alpha)
  CARD_SURFACE       = vec4(0.08, 0.12, 0.18, 0.85)  [#141F2E]  (Nested card background, selection tiles)
  BORDER_SLATE       = vec4(0.20, 0.28, 0.38, 0.60)  [#334761]  (Structural border)

Typography Contrast:
  TEXT_ICE_WHITE     = vec4(0.96, 0.98, 1.00, 1.00)  [#F5FAFF]  (High-contrast primary instruction text)
  TEXT_SECONDARY     = vec4(0.72, 0.78, 0.88, 1.00)  [#B8C7E0]  (Tools, citations, phase subtitles)
  TEXT_MUTED         = vec4(0.50, 0.58, 0.68, 1.00)  [#8094AD]  (Metadata labels, disabled states)

Safety & Hazard Semantics:
  HAZARD_INFO        = vec4(0.20, 0.65, 1.00, 1.00)  [#33A6FF]  (Procedural notes, info callouts)
  HAZARD_CAUTION     = vec4(1.00, 0.75, 0.10, 1.00)  [#FFBF1A]  (Caution warning, equipment damage risk)
  HAZARD_DANGER      = vec4(1.00, 0.25, 0.25, 1.00)  [#FF4040]  (Personal injury, shock hazard, blocking barrier)
  STATUS_SUCCESS     = vec4(0.20, 0.85, 0.45, 1.00)  [#33D973]  (Procedure complete, verified safety check)
```

### 3.4 Optical Contrast & Additive Display Accommodation
- **Backing Plates:** Because the Spectacles display is additive (black renders transparent), virtual content must use a dark backing plate (`DARK_OBSIDIAN_BG`) to maintain legibility against real-world illuminated surfaces.
- **Specification:**
  - `Text.backgroundSettings.enabled = true`
  - `fillColor = vec4(0.04, 0.06, 0.10, 0.88)`
  - `cornerRadius = 0.8` cm
  - Margins: $\ge 1.5	ext{ cm}$ horizontal, $\ge 0.6	ext{ cm}$ vertical.
  - Drop shadow: `offset = vec2(0, -0.05)`, `fillColor = vec4(0, 0, 0, 0.90)`.
- *Status:* Implemented in M3.1 runtime; report-reported in Preview; human verification pending; performance under intense real-world sunlight remains `PHYSICAL HARDWARE UNVERIFIED`.

### 3.5 Reusable Component Patterns

1. **Card Plate Primitive (`Pattern_CardPlate`):** Rounded rectangular plate with dark obsidian fill and slate border.
2. **Header Badge (`Pattern_HeaderBadge`):** Category tag (`FIXWHAT? AR • UNIVERSAL REMOTE`) + dynamic step counter (`STEP 01 / 09 • PHASE 1: ...`).
3. **Instruction Presenter (`Pattern_InstructionBlock`):** Headline `[ Action Verb + Object ]` + wrapped authoritative instruction body.
4. **Safety Callout Box (`Pattern_SafetyCallout`):** Severity badge, color-coded border, verbatim warning text, and (in future M6) interactive confirmation checkbox.
5. **Supporting Footer (`Pattern_SupportFooter`):** Tools list, exact manual source citation, navigation hints.
6. **Navigation Button Pair (`Pattern_NavButtonPair`):** Secondary outlined `<- Previous` + Primary cyan `Next ->`.
7. **Modal Overlay (`Pattern_ModalOverlay`):** Full-screen or large centered panel with darkened backdrop (Error rejection, Catalog, Exit).

---

## 4. Comprehensive Screen & Flow Specification

### 4.1 Application State Transition Architecture

The FixWhat? experience maps into **15 distinct screen presentations** identified in the approved visual storyboard.

**Primary State Transition Flow:**
```
[1. App Initialization] ──▶ [2. Loading Procedures] ──▶ [3. Ready State]
                                                              │
                                                              ▼
[5. Procedure Overview] ◀───────────────────────────── [4. Home Screen]
        │
        ▼
[6. Normal Step (INFO)] ──▶ [7. Step with Caution] ──▶ [8. Danger Notice (Display)]
        │                           │                               │
        ▼                           ▼                               ▼
[10. Procedure Switching] ◀── [Active Procedure Loop] ──▶ [9. Procedure Complete]
        │
        ├───────────────────────────┬───────────────────────────────┐
        ▼                           ▼                               ▼
[11. Invalid Data Error]    [12. Empty State]             [14. User Exit]
        │                           │                               │
        └───────────────────────────┴───────────────────────────────┘
                                    │
                                    ▼
                         [Return to Home / Ready]
```

**Auxiliary Contextual Overlays (Independent of Step State):**
```
                          ┌────────────────────────┐
                          │ Any Active Screen      │
                          │ (Screens 4, 6, 7, 8)   │
                          └───────────┬────────────┘
                                      │
                   [Press 'H' or      │      [Dismiss /
                    Help Trigger]     │       Click Outside]
                                      ▼
                        ┌───────────────────────────┐
                        │ [13. Navigation Controls] │
                        │ Contextual Help Overlay   │
                        └───────────────────────────┘
```
*Architectural Note on Screen 13:* Screen 13 is classified as an **Auxiliary Contextual Overlay**, not a sequential procedural step. It can be summoned from and dismissed back to any active screen without modifying the underlying procedure state machine.

---

### 4.2 Detailed Screen Inventory & Status

#### Screen 1: App Initialization
- **Storyboard Reference:** Screen 1 (`APP INITIALIZATION`)
- **Purpose:** Immediate visual feedback during AR scene, tracking, and runtime component boot.
- **Entry Conditions:** Lens launch / cold start.
- **Displayed Data:** FixWhat? logo, tagline ("AR Manuals for Real Things"), progress checklist (`Initializing AR environment...`, `Loading procedures...`, `Validating data...`, `Ready`).
- **Available Actions & Inputs:** None (automatic sequence).
- **Exit Transitions:** Advances to Screen 2 upon engine readiness.
- **Performance Target:** $\le 200	ext{ ms}$ `[PROPOSED TARGET — UNMEASURED; requires Lens Studio profiler timestamp logging before acceptance]`.
- **Classification & Status:** `SPECIFIED IN DGE-01 — PROPOSED (Milestone 4 Scope; currently bypassed in M3 runtime)`.

#### Screen 2: Loading Procedures
- **Storyboard Reference:** Screen 2 (`LOADING PROCEDURES`)
- **Purpose:** Validate embedded JSON procedure data against `ManualSchema.json` contract and load into memory.
- **Entry Conditions:** AR engine initialized.
- **Displayed Data:** "Loading Procedures" header, horizontal progress bar, fixture checklist (`GE 33709 Remote Control ✓`, `Wire Splicing & Soldering ✓`, `Validating schema... ✓`).
- **Available Actions & Inputs:** None (background execution).
- **Exit Transitions:** Transitions to Screen 3 if $\ge 1$ procedure valid; routes to Screen 12 (Empty State) if 0 valid.
- **Performance Target:** $\le 100	ext{ ms}$ `[PROPOSED TARGET — UNMEASURED; requires Performance API measurement before acceptance]`.
- **Classification & Status:** `SPECIFIED IN DGE-01 — PROPOSED (Milestone 4 Scope; synchronous load in M3 runtime)`.

#### Screen 3: Ready / Welcome
- **Storyboard Reference:** Screen 3 (`READY`)
- **Purpose:** Confirm procedural data integrity and invite user entry into the experience.
- **Entry Conditions:** Successful schema validation of procedure store.
- **Displayed Data:** Large emerald checkmark, "FixWhat? Ready", count of loaded procedures ("2 procedures loaded"), prompt: "Tap to continue".
- **Available Actions & Inputs:** Screen click, spacebar, or tap gesture.
- **Exit Transitions:** Transitions to Screen 4 (Home Screen).
- **Classification & Status:** `SPECIFIED IN DGE-01 — PROPOSED (Milestone 4 Scope)`.

#### Screen 4: Home Screen (Procedure Catalog)
- **Storyboard Reference:** Screen 4 (`HOME SCREEN`)
- **Purpose:** Primary application hub allowing selection of consumer repair or workshop practice procedures.
- **Entry Conditions:** Transition from Ready state or Return to Home action.
- **Displayed Data:** App title, subtitle, selectable procedure cards:
  - Card 1: Remote thumbnail, "GE 33709 Remote Control", "Battery replacement and setup", "9 steps".
  - Card 2: Soldering tool thumbnail, "Low-Voltage Wire Splicing & Soldering", "Workshop procedure", "11 steps".
  - Input hint: "Tap a procedure to start | Key 1 or 2".
- **Available Actions & Inputs:** Click Card 1 / Key '1' (Select Remote); Click Card 2 / Key '2' (Select Wire Splice); Key 'Esc' (Exit).
- **Exit Transitions:** Transitions to Screen 5 (Procedure Overview) for selected procedure.
- **Classification & Status:** `SPECIFIED IN DGE-01 — PROPOSED (Milestone 4 Scope)`.

#### Screen 5: Procedure Overview
- **Storyboard Reference:** Screen 5 (`PROCEDURE OVERVIEW`)
- **Purpose:** Present high-level procedure metadata, appliance compatibility, prerequisites, and source citations before step work starts.
- **Entry Conditions:** Selected a procedure on Screen 4.
- **Displayed Data:** Top navigation bar (`<- Home`, `Start Procedure` CTA); Procedure title & subtitle; Appliance metadata (Manufacturer, Model Family, Compatible Models, Category); Metric badges (Steps count, Phases count, Estimated duration); Authoritative description; Source Document citation card (`Battery Installation and Setup Guide, Jasco/GE Rev 11-19, p.2`).
- **Available Actions & Inputs:** Click `Start Procedure` (advance to Step 1); Click `<- Home` (return to Screen 4).
- **Exit Transitions:** Transitions to Screen 6 (Step 1).
- **Classification & Status:** `SPECIFIED IN DGE-01 — PROPOSED (Milestone 4 Scope)`.

#### Screen 6: Active Step Instruction (Normal / INFO)
- **Storyboard Reference:** Screen 6 (`STEP INSTRUCTION (NORMAL)`) & Screen 15 (`REAL-WORLD VIEW`)
- **Purpose:** Guide user through standard, non-hazardous procedural actions.
- **Entry Conditions:** Starting procedure or navigating from adjacent step.
- **Displayed Data:**
  - Header Card: Procedure title (`GE 33709 Remote Control`), Step counter (`STEP 1 / 9`), Phase indicator (`Phase 1: Battery Compartment Inspection`).
  - Primary Instruction Card: Step title (`Locate Battery Compartment and Depress Latch`), complete authoritative instruction text.
  - Info Callout: Blue callout box with `ℹ️ [PROCEDURAL NOTE]` and operational advice.
  - Supporting Footer: Required tools list (`GE 33709 remote unit`), source citation (`Jasco/GE Rev 11-19, p.2`), navigation button hints (`<- Previous`, `Next ->`).
- **Available Actions & Inputs:** Next step (Click right / Right Arrow); Previous step (Click left / Left Arrow); Switch procedure (Click top / Key 2).
- **Safety Semantics:** Normal hazard level (`hazardLevel: "NONE"` or `"INFO"`).
- **Classification & Status:** `PRESENT IN RUNTIME (M3.1) — REPORT-REPORTED IN PREVIEW — HUMAN ACCEPTANCE PENDING`.

#### Screen 7: Step Instruction with Caution
- **Storyboard Reference:** Screen 7 (`STEP WITH CAUTION`)
- **Purpose:** Display mandatory caution notice to prevent equipment damage or minor procedural mishaps.
- **Entry Conditions:** Navigating to step with `hazardLevel: "CAUTION"`.
- **Displayed Data:** Same as Screen 6, but Info callout is replaced by prominent amber Caution Card:
  - Text badge: `⚠️ [CAUTION WARNING]` (amber border and tinted backing plate).
  - Verbatim authoritative caution text: `"Follow the indicated sliding direction. Do not force the cover. Excessive force may damage the latch."`
- **Available Actions & Inputs:** Next step (advance); Previous step (retreat).
- **Safety Semantics:** Elevated caution alert; notice is displayed prominently.
- **Classification & Status:** `PRESENT IN RUNTIME (M3.1) — REPORT-REPORTED IN PREVIEW — HUMAN ACCEPTANCE PENDING`.

#### Screen 8: Step Instruction with Danger Notice (Display vs. Enforcement Audit)
- **Storyboard Reference:** Screen 8 (`STEP WITH DANGER`)
- **Purpose:** Display life-safety or personal injury hazard alert (e.g. electrical power disconnection).
- **Entry Conditions:** Navigating to step with `hazardLevel: "DANGER"` and `isBlockingSafetyBarrier: true`.
- **Displayed Data:**
  - Header Card: Workshop procedure (`Wire Splicing & Soldering | STEP 1 / 11`).
  - Step Headline: Storyboard mockup depicts `Ensure Power is Disconnected`. (In authoritative repository fixture Step 0: `Verify Non-Energized Circuit & Put On Safety Glasses`).
  - Prominent Crimson Danger Card: `⛔ [DANGER SAFETY BARRIER]`.
  - Exact Complete Safety Notice (Authoritative Fixture `data/procedures/wire_soldering_splice.json` Step 0):
    > *"High Electrical and Severe Thermal Hazard: Never perform soldering on energized (live) electrical circuits. Always verify power disconnection and wear ANSI Z87.1 / CE EN166 approved eye protection. This procedure is strictly an educational workshop exercise on disconnected, non-energized mock wires and is not certified for mains AC, automotive, or flight hardware."*
  - Storyboard Mockup Text (Illustrative Excerpt): The storyboard graphic depicts a shortened excerpt: *"Working on energized circuits can cause serious injury, fire, or death. Do not proceed until power is verified OFF."*
  - Storyboard Graphic Depiction: Depicts checkbox `[ ] "I confirm the power is disconnected and I understand the risk."`
- **Source Citation Forensic Audit & Evidence Classification:**
  - *Storyboard Depiction:* The storyboard mockup displays `Source: NASA-STD-8739.4 §19.7.1`.
  - *Inspected Repository Evidence:*
    - In `data/procedures/wire_soldering_splice.json`:
      - Step 0 ("Verify Non-Energized Circuit & Put On Safety Glasses") cites: `Weller T0055745804 p. 14, Safety Information ("Never work on voltage-carrying parts." "Protect your eyes by wearing eye protection.")`.
      - Step 4 cites `NASA-STD-8739.4A §19.7.1(a)` (p. 82) for conductor pre-tinning.
      - Step 5 cites `NASA-STD-8739.4A §19.7.1(b)–(c)` (p. 82) for Western Union mechanical wrap geometry ($\ge 3$ turns, tight wraps, no gaps, flush trimmed ends).
      - Step 7 cites `NASA-STD-8739.4A §19.7.1(f)–(g)` (p. 83) for solder wetting and complete periphery filleting.
    - In `docs/EVIDENCE_CLOSURE_AUDIT.md` (lines 105–110): Audits the exact text of Section 19.7.1 titled `Soldered Western Union/Lineman Splice`.
  - *Evidence Conclusion & Scope Boundary:*
    - The local evidence establishes that in the authoritative repository fixture, Step 0 electrical safety is grounded in Weller §14, while the audited subsections of §19.7.1 govern conductor pre-tinning, wrap geometry, and solder filleting.
    - Because the complete NASA-STD-8739.4A document is an external standard not committed in full to the repository, any broader claim regarding the comprehensive scope of Section 19.7.1 beyond these specific audited paragraphs is classified as:
      **`PROVISIONAL — FULL SOURCE VERIFICATION PENDING`**.
    - *Attribution Discrepancy:* The storyboard mockup's placement of `NASA-STD-8739.4 §19.7.1` on Screen 8 is an illustrative artist mockup discrepancy. The runtime displays the authoritative Weller citation from the verified fixture.
    - *No Endorsement / Certification:* FixWhat? makes NO claim of NASA approval, certification, endorsement, or flight compliance.
- **Safety Enforcement Reality Check:**
  - *Current Status:* **WARNING DISPLAYED ONLY**. The HUD prominently displays the crimson danger card and textual notice in Preview.
  - *Blocking Gate Status:* **NOT YET IMPLEMENTED AND NOT VERIFIED**. The interactive confirmation checkbox that disables forward progression until checked is scheduled for **Milestone 6 (Safety Systems)** per `ROADMAP.md`. Displaying the card in M3.1 does **not** constitute an enforced safety barrier.
- **Classification & Status:** `DISPLAY PRESENT IN RUNTIME (M3.1) — REPORT-REPORTED IN PREVIEW — BLOCKING GATE UNBUILT (M6 SCOPE) — HUMAN ACCEPTANCE PENDING`.

#### Screen 9: Procedure Completion Screen
- **Storyboard Reference:** Screen 9 (`COMPLETION SCREEN`)
- **Purpose:** Confirm successful procedure execution, summarize final condition, and sign off safety checks.
- **Entry Conditions:** Navigating forward from final procedural step.
- **Displayed Data:** Emerald checkmark: `✅ PROCEDURE COMPLETE!`; Procedure title (`GE 33709 Remote Control`); Final Condition verification; Safety Verification sign-off; Navigation buttons (`<- Back to Steps`, `Return to Home`).
- **Available Actions & Inputs:** Click `Back to Steps` (re-enters Step 9); Click `Return to Home` (returns to Screen 4).
- **Classification & Status:** `PRESENT IN RUNTIME (M3.1) — REPORT-REPORTED IN PREVIEW — HUMAN ACCEPTANCE PENDING`.

#### Screen 10: Procedure Switching
- **Storyboard Reference:** Screen 10 (`PROCEDURE SWITCHING`)
- **Purpose:** Allow rapid, seamless switching between procedures during runtime without full app restart.
- **Entry Conditions:** User clicks top-center of Preview window, presses Key '1'/'2', or executes procedure switch trigger.
- **Displayed Data:** Title: `Switch Procedure`, subtitle: `Select a different procedure`, procedure selection list with active selection highlighted, `Cancel` button.
- **Available Actions & Inputs:** Select alternate procedure (switches active procedure to Step 1); Click `Cancel` (dismisses modal, stays on current step).
- **Classification & Status:** `SWITCHING LOGIC PRESENT IN M3.1 RUNTIME (REPORT-REPORTED) — DEDICATED MODAL UI PROPOSED (M4 SCOPE) — HUMAN ACCEPTANCE PENDING`.

#### Screen 11: Invalid Data Error (Data Contract Rejection)
- **Storyboard Reference:** Screen 11 (`INVALID DATA ERROR`)
- **Purpose:** Present a controlled, non-crashing failure screen when an adversarial or malformed procedure payload fails validation.
- **Entry Conditions:** Store fails schema or domain validation (`validateProcedure() == false`).
- **Displayed Data:** Red warning icon, `⛔ [FIXWHAT DATA CONTRACT REJECTION]`, explanatory message: `"The selected procedure failed validation and cannot be loaded."`, Details card listing specific schema errors, `Return to Home` button.
- **Available Actions & Inputs:** Click `Return to Home` / Key '1' (recovers to valid procedure).
- **Classification & Status:** `PRESENT IN RUNTIME (M3.1) — REPORT-REPORTED IN PREVIEW — HUMAN ACCEPTANCE PENDING`.

#### Screen 12: Empty State
- **Storyboard Reference:** Screen 12 (`EMPTY STATE`)
- **Purpose:** Inform user when zero procedures are available in the local store.
- **Entry Conditions:** Procedure store initialized with empty catalog or all fixtures failed.
- **Displayed Data:** Open book glyph, `No Procedures Available`, message: `"No valid procedures could be loaded. Check data files or try restarting the application."`, `Retry Initialization` button.
- **Available Actions & Inputs:** Click `Retry Initialization` (re-runs store load).
- **Classification & Status:** `SPECIFIED IN DGE-01 — PROPOSED (Milestone 4 Scope; underlying store logic tested in M3 Defect 1 fix)`.

#### Screen 13: Navigation Controls / Help Overlay (Auxiliary Overlay)
- **Storyboard Reference:** Screen 13 (`NAVIGATION CONTROLS`)
- **Purpose:** Contextual reference displaying available input mappings for desktop Preview simulation.
- **Entry Conditions:** Help toggle trigger or keypress from any active screen.
- **Displayed Data:**
  - Touch / Mouse Zones: Left (Previous), Right (Next), Top (Switch procedure), Bottom (Test invalid data).
  - Keyboard Shortcuts: Left/Right arrows (Prev/Next), '1'/'2' (Switch procedure), '9' (Test invalid data), 'Esc' (Return to home).
- **Available Actions & Inputs:** Click anywhere or press key to dismiss.
- **Exit Transitions:** Returns immediately to calling screen without state alteration.
- **Classification & Status:** `FOOTER HINTS PRESENT IN M3.1 RUNTIME — DEDICATED OVERLAY PROPOSED (M4 SCOPE)`.

#### Screen 14: User Exit & Return
- **Storyboard Reference:** Screen 14 (`USER EXIT`)
- **Purpose:** Provide graceful session termination or return to root catalog.
- **Entry Conditions:** User triggers exit or presses 'Esc'.
- **Displayed Data:** Title: `Exit Application`, prompt: `"Return to the home screen or close the application."`, Buttons: `Return to Home`, `Close Application`.
- **Available Actions & Inputs:** Click `Return to Home` (routes to Screen 4); Click `Close Application` (clears HUD).
- **Classification & Status:** `SPECIFIED IN DGE-01 — PROPOSED (Milestone 4 Scope)`.

#### Screen 15: Real-World Optical View (Contextual Benchmark)
- **Storyboard Reference:** Screen 15 (`REAL-WORLD VIEW (CONTEXT)`)
- **Purpose:** Visual benchmark demonstrating HUD rendering overlaid against physical workbenches, tools, and appliances.
- **Measurable Acceptance Criterion:** Virtual text must be readable in Lens Studio Preview against both light and dark simulated backgrounds using dark obsidian backing plates (`DARK_OBSIDIAN_BG`).
- **Physical Boundary:** Physical waveguide transmission loss, ambient outdoor glare, and see-through contrast remain `PHYSICAL HARDWARE UNVERIFIED`.
- **Classification & Status:** `OPTICAL BENCHMARK (REPORT-REPORTED IN PREVIEW SIMULATION; PHYSICAL HARDWARE UNVERIFIED)`.

---

## 5. Design Change-Control Protocol for Antigravity

To ensure predictable engineering discipline and avoid uncoordinated UI divergence, the following change-control boundaries govern all AI agent (Antigravity) activities:

### 5.1 Permitted Autonomous Actions
The AI agent may autonomously:
1. Implement approved screen specifications that have been formally accepted in the active milestone by the human developer.
2. Make narrowly scoped implementation corrections consistent with approved requirements (e.g. adjusting internal component padding by $\le 0.5	ext{ cm}$ to resolve text wrapping or clipping defects).
3. Fix TypeScript compilation errors, type mismatches, or event listener leaks in UI scripts.
4. Report ambiguities, identify discrepancies between mockups and authoritative fixtures, and propose alternative solutions.

### 5.2 Actions Requiring Written Proposal & Explicit Human Approval
The AI agent is **strictly prohibited** from performing the following actions without prior written proposal and explicit human authorization:
1. **Adding or Removing Screens:** Creating new screen concepts or omitting any of the 15 storyboard screens.
2. **Altering Visual Language:** Changing the dark obsidian + cyan branding palette, typography scales, or border treatments.
3. **Changing Navigation Semantics:** Modifying how steps advance, removing previous/next boundaries, or altering procedure-switching logic.
4. **Changing Safety Semantics:** Weakening warning prominence, modifying hazard levels, altering safety notices, or bypassing confirmation gates.
5. **Truncating Content:** Shortening authoritative instructions, omitting safety notices, or stripping source manual citations to fit a layout.
6. **Adding Dependencies:** Introducing external UI frameworks, web views, or unapproved third-party packages.
7. **Expanding Milestone Scope:** Advancing unapproved screens (e.g. Screens 1–5, 12, 14) into an active milestone without explicit human gate authorization.

---

## 6. Multi-Level Design Acceptance Gate

Before any screen or UI modification is submitted for human acceptance, it must be evaluated across this 6-level verification gate:

```
[Level 1: Static Code Compilation & Data Validation]  [STATUS: AUTOMATED PASS]
  - Zero TypeScript errors (npx -p typescript tsc --strict true --lib es2021)
  - 100% pass on python3 scripts/validate_procedure.py (5 fixtures, 14 negative tests)
                            │
                            ▼
[Level 2: Preview Rendering & Layout Observation]      [STATUS: REPORT-REPORTED; HUMAN PENDING]
  - Visual inspection in Lens Studio 5.24 Preview simulation
  - Content fits inside 50 x 32 cm bounding envelope at 85 cm
  - Zero text clipping, overlap, or wrapping defects
                            │
                            ▼
[Level 3: Interaction & Boundary Testing]              [STATUS: NOT FULLY VERIFIED]
  - Forward/backward navigation across step boundaries (code present; report-reported;
    no automated headless test harness exists; NOT FULLY VERIFIED pending human testing)
  - Procedure switching operates without state corruption (code present; report-reported;
    NOT FULLY VERIFIED pending human testing)
  - Controlled error recovery on malformed payloads (code present; report-reported;
    NOT FULLY VERIFIED pending human testing)
                            │
                            ▼
[Level 4: Safety-Gate Enforcement Testing (M6 Scope)]  [STATUS: UNBUILT — M6 SCOPE]
  - Verifies that forward progression is blocked until condition confirmed
  - Documented automated or manual test proves bypass is prevented
                            │
                            ▼
[Level 5: Human Review & Explicit Acceptance Gate]     [STATUS: PENDING HUMAN REVIEW]
  - Human developer inspects Preview simulation and grants explicit approval
  - Required for milestone closure
                            │
                            ▼
[Level 6: Physical Spectacles Hardware Verification]   [STATUS: PHYSICAL HARDWARE UNVERIFIED]
  - Separate, independent verification layer
  - Conducted if and when physical hardware becomes available
  - Currently classified as PHYSICAL HARDWARE UNVERIFIED
```

### Milestone Applicability:
- **Milestone 3 / M3.1 Scope:** Evaluated under:
  - **Level 1 (Static/Type Checks & Schema Validation):** `AUTOMATED PASS` (Exit Code 0 across compiler and validation suite).
  - **Level 2 (Preview Rendering & Layout):** `REPORT-REPORTED; HUMAN ACCEPTANCE PENDING`.
  - **Level 3 (Interaction & Boundary Testing):** `NOT FULLY VERIFIED` (Implemented in runtime code and report-reported in developer review, but no automated headless test runner exists in the repository; requires human Preview verification).
  - **Level 5 (Human Developer Review & Explicit Acceptance):** `PENDING HUMAN REVIEW`.
- **Milestone 6 Scope:** Evaluates **Level 4** (enforced safety barrier confirmation gate).
- **Physical Hardware:** Evaluates **Level 6** (`PHYSICAL HARDWARE UNVERIFIED`).

---

## 7. Storyboard Traceability & Five-State Evidence Ledger

Every screen from the 15-screen storyboard is tracked across five distinct states to prevent conflating mockups with working code:

| Screen ID | Storyboard Title | 1. Storyboard Depiction | 2. DGE-01 Specification | 3. Runtime Code Presence | 4. Preview Observation Evidence | 5. Human Acceptance | Current Implementation & Testing Classification |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **1** | App Initialization | Depicted | Specified | Bypassed | Not Observed | Pending | `PROPOSED (Milestone 4 Scope)` |
| **2** | Loading Procedures | Depicted | Specified | Synchronous | Not Observed | Pending | `PROPOSED (Milestone 4 Scope)` |
| **3** | Ready / Welcome | Depicted | Specified | Not Present | Not Observed | Pending | `PROPOSED (Milestone 4 Scope)` |
| **4** | Home Screen (Catalog) | Depicted | Specified | Not Present | Not Observed | Pending | `PROPOSED (Milestone 4 Scope)` |
| **5** | Procedure Overview | Depicted | Specified | Not Present | Not Observed | Pending | `PROPOSED (Milestone 4 Scope)` |
| **6** | Step Instruction (Normal) | Depicted | Specified | Present | Report-Reported | Pending | `PRESENT IN RUNTIME (M3.1); LEVEL 3 INTERACTION NOT FULLY VERIFIED` |
| **7** | Step with Caution | Depicted | Specified | Present | Report-Reported | Pending | `PRESENT IN RUNTIME (M3.1); LEVEL 3 INTERACTION NOT FULLY VERIFIED` |
| **8** | Danger Notice (Display) | Depicted | Specified | Present (Notice) | Report-Reported | Pending | `DISPLAY IN M3.1 (LEVEL 3 NOT FULLY VERIFIED); GATE UNBUILT (M6 SCOPE)` |
| **9** | Completion Screen | Depicted | Specified | Present | Report-Reported | Pending | `PRESENT IN RUNTIME (M3.1); LEVEL 3 INTERACTION NOT FULLY VERIFIED` |
| **10** | Procedure Switching | Depicted | Specified | Present (Logic) | Report-Reported | Pending | `LOGIC IN M3.1 (LEVEL 3 NOT FULLY VERIFIED); MODAL UI PROPOSED (M4)` |
| **11** | Invalid Data Error | Depicted | Specified | Present | Report-Reported | Pending | `PRESENT IN RUNTIME (M3.1); LEVEL 3 INTERACTION NOT FULLY VERIFIED` |
| **12** | Empty State | Depicted | Specified | Store Logic Only | Not Observed | Pending | `PROPOSED (Milestone 4 Scope)` |
| **13** | Navigation Controls | Depicted | Specified | Footer Hints Only| Report-Reported | Pending | `FOOTER HINTS IN M3.1; FULL OVERLAY PROPOSED (M4)` |
| **14** | User Exit & Return | Depicted | Specified | Not Present | Not Observed | Pending | `PROPOSED (Milestone 4 Scope)` |
| **15** | Real-World Context View | Depicted | Specified | N/A (Benchmark) | Report-Reported | Pending | `OPTICAL BENCHMARK (REPORT-REPORTED; HARDWARE UNVERIFIED)` |

---

## 8. Summary & Next Actions

1. **Current Milestone Status:** Milestone 3/M3.1 (Core AR HUD Readability Correction) is implemented in runtime code and passes Level 1 automated toolchain checks (`scripts/validate_procedure.py` and strict TypeScript compilation). Level 3 interaction behavior is report-reported and classified as `NOT FULLY VERIFIED` in repository test artifacts. Human Lens Studio Preview acceptance remains **pending**.
2. **Design Governance Status:** This document (`DGE-01`) and `ADR-010` remain **PROPOSED**. They establish the design baseline upon human approval.
3. **Milestone 4 Prerequisite:** Milestone 4 (Dual-Mode Architecture) implementation will commence only after Milestone 3 human acceptance and explicit Milestone 4 authorization.
