# FixWhat? AR — FW-05
## ASSET & ATTRIBUTION REGISTER

**Milestone:** FW-05 (Public Repository & Competition Release Readiness Audit)  
**Execution Mode:** READ-ONLY FORENSIC AUDIT  
**Design Authority:** CLAD (Creative Lens AR Designer)  
**Technical Lead:** Antigravity (Principal Software Architect)  
**Final Authority:** Product Owner  
**Platform:** Snap Spectacles 2024 / Lens Studio 5.24.1 / SPECS 27  
**Date:** 2026-11-09  

---

## 1. Executive Summary

This register establishes the complete provenance, intellectual property licensing, technical specifications, and source attribution for all visual, graphic, audio, and code assets incorporated in **FixWhat? AR**.

### IP & Provenance Verification: **100% COMPLIANT & TRACEABLE**
- **Instructional Diagrams:** Exactly 20 custom technical diagrams ($1200 \times 400\text{ px}$, 3:1 aspect ratio, dark high-contrast backing plates) authored specifically for the FixWhat? project under CLAD design direction.
- **Source Grounds:** Every procedural graphic is traceable to authoritative published technical standards and manufacturer service documentation (Jasco Products Company LLC, Weller Tools GmbH, and NASA Technical Standards).
- **Engine Frameworks:** Snap Spectacles Interaction Kit (SIK 2.0.0), Spectacles UI Kit (UIKit 2.0.0), and Lens Engine Automated Framework (LEAF 1.0.0) licensed under standard Snap Developer Terms.
- **Iconography:** Curated Google Material Icons licensed under Apache License 2.0.

---

## 2. Technical Guidance Diagram Register (20 Assets)

All 20 instructional diagrams reside in [`Assets/Textures/Guidance/`](file:///Users/kanku/antigravity/Fixwhat/Assets/Textures/Guidance/) and are bound dynamically at runtime via [`Assets/Scripts/Data/FixWhatVisualRegistry.ts`](file:///Users/kanku/antigravity/Fixwhat/Assets/Scripts/Data/FixWhatVisualRegistry.ts).

### Optical Formatting Specifications:
- **Dimensions:** $1200 \times 400\text{ pixels}$ (exact 3:1 aspect ratio matching the HUD viewport).
- **Color Space:** 8-bit sRGB PNG with embedded alpha.
- **Optical Backplate:** Solid opaque dark navy backplate (`#0A1128` / `#050B14`) preventing optical blow-through and text wash-out on the Spectacles additive waveguide display.

### 2.1 Consumer Remote Track (GE / Jasco 33709) — 9 Assets

| Asset ID | Filename | Step Binding | Authoritative Source Citation | Visual Representation |
| :--- | :--- | :--- | :--- | :--- |
| **AST-REM-01** | `AST-REM-01.png` | Step 1 (`step_remote_open_battery_door`) | Jasco 33709 Manual p.2 §1 | Thumb placement on rear textured indent; downward sliding arrow. |
| **AST-REM-02** | `AST-REM-02.png` | Step 2 (`step_remote_inspect_polarity_markings`) | Jasco 33709 Manual p.2 §1 | Reverse-parallel polarity markings: Slot A top spring, Slot B bottom spring. |
| **AST-REM-03** | `AST-REM-03.png` | Step 3 (`step_remote_insert_battery_left`) | Jasco 33709 Manual p.2 §1 | AAA Battery 1 insertion into Slot A compressing top spring flat base. |
| **AST-REM-04** | `AST-REM-04.png` | Step 4 (`step_remote_insert_battery_right`) | Jasco 33709 Manual p.2 §1 | AAA Battery 2 insertion into Slot B in reverse-parallel series alignment. |
| **AST-REM-05** | `AST-REM-05.png` | Step 5 (`step_remote_replace_door`) | Jasco 33709 Manual p.2 §1 | Aligning cover side rails and sliding upward firmly until latch clicks. |
| **AST-REM-06** | `AST-REM-06.png` | Step 6 (`step_remote_enter_setup_mode`) | Jasco 33709 Manual p.3 §2 | SETUP button highlight; 2–3s hold action until solid red LED illuminates. |
| **AST-REM-07** | `AST-REM-07.png` | Step 7 (`step_remote_select_tv_button`) | Jasco 33709 Manual p.3 §2 | Top device row TV button press; single LED confirmation blink. |
| **AST-REM-08** | `AST-REM-08.png` | Step 8 (`step_remote_enter_code`) | Jasco 33709 Manual p.3 §2 | 4-digit keypad entry template matching CL5 code list sticker in bay. |
| **AST-REM-09** | `AST-REM-09.png` | Step 9 (`step_remote_verify_tv_operation`) | Jasco 33709 Manual p.3 §2 | Direct IR line-of-sight aiming cone toward TV; POWER and Volume test. |

### 2.2 Workshop Learning Track (Wire Splicing & Soldering) — 11 Assets

| Asset ID | Filename | Step Binding | Authoritative Source Citation | Visual Representation |
| :--- | :--- | :--- | :--- | :--- |
| **AST-WRK-01** | `AST-WRK-01.png` | Step 1 (`step_solder_verify_safety_and_ppe`) | Weller T0055745804 p.14 | Mandatory eye protection PPE and 100% disconnected unpowered mock wires. |
| **AST-WRK-02** | `AST-WRK-02.png` | Step 2 (`step_solder_identify_workshop_tools`) | Weller pp.2–3, 14–16; NASA-STD-8739.4 | Labeled bench layout of all 7 tools (iron, safety rest, brass, strippers, solder, sleeve, heat gun). |
| **AST-WRK-03** | `AST-WRK-03.png` | Step 3 (`step_solder_slide_heat_shrink`) | NASA-STD-8739.4A §19.2.6 | Sliding 25mm sleeve onto Wire A; setback $\ge 75\text{ mm}$ outside thermal zone. |
| **AST-WRK-04** | `AST-WRK-04.png` | Step 4 (`step_solder_strip_insulation`) | NASA-STD-8739.4A §10.1 | Stripping 12–15mm insulation using 20–24 AWG notch; clockwise strand lay. |
| **AST-WRK-05** | `AST-WRK-05.png` | Step 5 (`step_solder_pre_tin_conductors`) | NASA-STD-8739.4A §19.7.1(a) | Underside iron thermal contact; top-side solder feed; flexible thin tin coat. |
| **AST-WRK-06** | `AST-WRK-06.png` | Step 6 (`step_solder_form_western_union_splice`) | NASA-STD-8739.4A §19.7.1(b)–(c) | Interlocking core; 3–4 tight helical wraps per side; flush-trimmed cut ends. |
| **AST-WRK-07** | `AST-WRK-07.png` | Step 7 (`step_solder_clamp_and_tin_iron`) | Weller T0055745804 p.15 | Splice clamped in helping hands; brass wipe; fresh liquid solder thermal bridge. |
| **AST-WRK-08** | `AST-WRK-08.png` | Step 8 (`step_solder_heat_and_feed`) | NASA-STD-8739.4A §19.7.1(f)–(g); Weller p.15 | Bottom-side heating; top-side solder feed; capillary wetting through wraps. |
| **AST-WRK-09** | `AST-WRK-09.png` | Step 9 (`step_solder_cool_and_inspect`) | NASA-STD-8739.3 §13.6.1–§13.6.2 | Comparative inspection: ACCEPT (smooth concave fillet) vs REJECT (cold/blob). |
| **AST-WRK-10** | `AST-WRK-10.png` | Step 10 (`step_solder_contract_heat_shrink`) | NASA-STD-8739.4A §19.2.6 | Tubing centered; $\ge 6.35\text{ mm}$ overlap; even hot-air sweeping from heat gun. |
| **AST-WRK-11** | `AST-WRK-11.png` | Step 11 (`step_solder_safe_shutdown`) | Weller T0055745804 pp.14–16 | Sacrificial solder coat on tip; iron seated in PH 70 rest; power switch OFF. |

---

## 3. Third-Party Framework & Library Licences

| Package / Library | Version | Licensor / Origin | Licence Terms | Project Usage |
| :--- | :---: | :--- | :--- | :--- |
| **Spectacles Interaction Kit** | `2.0.0` | Snap Inc. | Snap Developer Terms | Hand tracking, pinch gestures, interactor pipeline |
| **Spectacles UI Kit** | `2.0.0` | Snap Inc. | Snap Developer Terms | FlexLayout, BackPlate, Button, ScrollView, Text |
| **Lens Engine Automated Framework (LEAF)** | `1.0.0` | Snap Inc. | Snap Developer Terms | Automated integration testing harness |
| **SnapDecorators** | `1.0.0` | Snap Inc. | Snap Developer Terms | TypeScript decorator bindings (`@input`, etc.) |
| **Google Material Icons** | `2024` | Google LLC | Apache License 2.0 | UI icons (search, arrow, warning, home, etc.) |

---

## 4. Source Citation & External Standards Grounding

The procedural text, hazard classifications, and technical tolerances are explicitly referenced from the following public documents:

1. **Jasco Products Company LLC:**
   - *GE 4-Device Universal Remote Control Instruction Manual & Code List (Models 33709 & 33711)*.
   - Document Code: `33709_33711_Manual_Rev_11-19`.
   - Access URL: `https://byjasco.com/` (Public consumer support).

2. **Weller Tools GmbH:**
   - *Operating Instructions WE 1 / Soldering Station Set (with WEP 70 Iron & PH 70 Safety Rest)*.
   - Document Code: `T0055745804 Rev 08.2023`.
   - Sections Cited: Safety Information (p. 14), Operation & Maintenance (pp. 15–16).

3. **National Aeronautics and Space Administration (NASA):**
   - *NASA-STD-8739.4A: Crimping, Interconnecting Cables, Harnesses, and Wiring*.
     - Sections Cited: §10.1 (Stripping Conductor), §19.2.6 (Insulation Sleeve Overlap), §19.7.1 (Splices in Interconnecting Wiring — Western Union Splice).
   - *NASA-STD-8739.3: Soldered Electrical Connections*.
     - Sections Cited: §4.2 (Health and Safety), §13.6 (Workmanship Fillet Acceptance Criteria).
   - *Scope Notice:* FixWhat? cites these standards solely as an educational benchmark for 20–24 AWG stranded wire joining. FixWhat? makes no claim of NASA endorsement, certification, or flight hardware compliance.

---

## 5. Asset Hygiene Recommendations for Release

1. **Excise `Assets/Textures/Guidance/original_stage_c_backup/`:**
   - This directory contains 42 deprecated intermediate working files from Stage C artwork production.
   - It should be deleted or moved outside the repository before public release to save ~7 MB.
2. **Exclude `Packages/SpectaclesInteractionKitExamples.lspkg`:**
   - At 28.1 MB, this package is an unused third-party example bundle that significantly bloats repository clone times.

