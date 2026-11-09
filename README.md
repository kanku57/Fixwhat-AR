# FixWhat? AR — Context-Grounded Spatial Repair Assistant for Snap Spectacles

[![Lens Studio](https://img.shields.io/badge/Lens%20Studio-5.24.1-purple.svg)](https://ar.snap.com/lens-studio)
[![Target Platform](https://img.shields.io/badge/Platform-Spectacles%20(2024)%20%2F%20SPECS%2027-blue.svg)](https://developers.snap.com/spectacles)
[![SIK](https://img.shields.io/badge/SIK-v2.0-brightgreen.svg)](https://developers.snap.com/spectacles/spectacles-interaction-kit)
[![UIKit](https://img.shields.io/badge/UIKit-v2.0-green.svg)](https://developers.snap.com/spectacles/spectacles-ui-kit)
[![LEAF](https://img.shields.io/badge/LEAF%20Testing-v1.0-orange.svg)](https://developers.snap.com/spectacles/leaf)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript%20(ES2021)-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-lightgrey.svg)](LICENSE)

FixWhat? AR is a hands-free, spatial learning and technical repair assistant designed for **Snap Spectacles (2024 / SPECS 27)**. It transforms dense, flat manufacturer service manuals and complex engineering procedures into contextual, step-by-step spatial guidance projected directly onto the user's physical task space.

Developed for the **Learn AR with Spectacles 2026** competition.

---

## 1. Executive Summary & Problem Statement

### The Problem
Performing physical maintenance, electronic repairs, or hardware assembly while referencing flat paper manuals, PDF documents, or YouTube video tutorials imposes severe friction:
1. **Cognitive Burden & Context Switching:** Technicians and DIY learners must repeatedly break focus, shift gaze between the physical workpiece and a screen/book, and mentally translate 2D diagrams into 3D physical manipulation.
2. **Ergonomic Inefficiency & Contamination:** Holding a smartphone, tablet, or laptop while handling tools, greasy parts, soldering irons, or chemical descaling agents is awkward, dangerous, and contaminates devices.
3. **Safety Hazard Blindness:** Warning labels buried in small footnotes or page corners are easily overlooked, risking electrical shocks, thermal burns, or component destruction.

### The FixWhat? AR Solution
FixWhat? AR projects an interactive, ergonomic spatial guidance HUD into the user's field of view at a comfortable focal depth (120–150 cm), anchoring technical instructions directly in front of their hands. By combining **active hand tracking**, **non-bypassable safety gates**, **pedagogical "Why?" explanations**, and **high-contrast technical diagrams**, FixWhat? AR empowers users to learn complex physical repairs safely and efficiently.

---

## 2. Core Capabilities & Implemented Experience

### Dual Active Learning Tracks

| Track | Target Hardware / Procedure | Steps | Key Skills Learned |
| :--- | :--- | :---: | :--- |
| **Consumer Electronics Track** | **GE / Jasco 33709 Universal Remote** | 9 Steps | Battery safety, Master Component Setup, Direct Code Entry, Automated Code Search, IR emitter testing. |
| **Workshop & Prototyping Track** | **Wire Splicing & Soldering (Educational Craftsmanship)** | 11 Steps | Wire stripping, Western Union splice, soldering iron thermal safety gate, flux core heating, heat-shrink insulation. References NASA-STD-8739.4 strictly as an educational craftsmanship benchmark (no official endorsement or mission-critical certification implied). |

### Key Features & Architectural Innovations

- **Uniform Luminous Glass UI:** Engineered in strict accordance with CLAD design governance and Spectacles optical ergonomics. Features high-contrast `#FFFFFF` typography and iconography, consistent button heights (4.4 cm), and distinct 2.5 cm spatial depth separation between interactive surfaces and background plates.
- **Enforced Safety Barrier (Step 00 Gate):** High-risk steps (e.g. 350°C soldering iron operation, battery chemical handling) trigger an explicit blocking modal barrier. The user cannot proceed without actively reviewing hazard notices and confirming safety clearance via hand pinch.
- **Pedagogical Cognitive Scaffolding ("Why?" Drawer):** Every procedural step includes an expandable technical explanation drawer answering *why* a step is executed, clarifying the underlying physical, electrical, or chemical principles.
- **Traceable Source Citations:** Every instruction card displays direct provenance citations referencing manufacturer manuals, engineering standards, or technical documentation.
- **Dynamic Procedural State Engine:** Step progression, timer countdowns, and branch decisions are strictly evaluated against formal data schemas (`ManualSchema.json` and `MaintenanceHistorySchema.json`).
- **High-Contrast Unlit Technical Diagrams:** Includes 20 custom-engineered technical diagrams rendered via a dedicated unlit shader with depth-write enabled, preventing ambient light wash-out and spatial visual bleed.
- **Multi-Fixture Automated Validation:** A Python test harness (`scripts/validate_procedure.py`) enforces strict schema conformity across 19 positive and negative test fixtures before build time.

---

## 3. Technology Stack

- **Authoring Environment:** Lens Studio 5.24.1 (Build 5.24.1.26100516)
- **Target OS:** Spectacles OS / SPECS 27 API
- **Interaction Framework:** Spectacles Interaction Kit (SIK) 2.0
- **User Interface Framework:** Spectacles UI Kit 2.0 (`BackPlate`, `Frame`, `FlexLayout`, `Button`)
- **Automated Verification:** LEAF (Lens Execution & Automation Framework) 1.0
- **Implementation Language:** TypeScript (ES2021) with strict type compilation
- **Shader Pipeline:** Custom Unlit Shader Graph with spatial depth-test isolation

---

## 4. Hardware & Runtime Boundaries (Capability Honesty)

To ensure absolute engineering integrity and compliance with competition guidelines, FixWhat? AR explicitly documents its operational environment:

> [!NOTE]
> **Preview-Only Simulation:** FixWhat? AR development, verification, and visual testing were conducted exclusively using the **Lens Studio Interactive Preview Panel** on macOS. No physical Spectacles hardware was available during development. All optical, spatial, and ergonomic properties are calibrated against official Spectacles 2024 specifications.

> [!NOTE]
> **Simulated Object Recognition (MVP):** In the current competition build, the "Find Object" (GE 33709) and "Place Workbench" screens use high-fidelity spatial proxy graphics to simulate target alignment and workspace anchoring. Live computer vision object classification is an architectural design specified for future milestones.

> [!NOTE]
> **Supported Remote Scope:** FixWhat? AR specifically supports the **GE / Jasco 33709** 4-device universal remote. Attempting to select unsupported variants (such as the GE 33711) intentionally displays an honest `View_UnsupportedModel` guidance screen redirecting the user to compatible hardware.

---

## 5. Repository Structure

```text
Fixwhat-AR/
├── LICENSE                                # Canonical MIT License
├── THIRD_PARTY_NOTICES.md                 # Third-party notices (Google Material Icons, Snap, NASA, Weller, Jasco)
├── README.md                              # This authoritative project document
├── ROADMAP.md                             # Milestone tracking and project governance ledger
├── Fixwhat.esproj                         # Lens Studio 5.24.1 project manifest
├── Assets/
│   ├── Scripts/                           # Modular TypeScript application source (ES2021)
│   │   ├── FixWhatBootstrap.ts            # Main runtime lifecycle coordinator & state orchestrator
│   │   ├── UI/                            # Spatial Glass UI components & design tokens
│   │   │   ├── GlassDesignTokens.ts       # Authoritative design tokens (colors, sizing, padding)
│   │   │   ├── FixWhatHUD.ts              # Spatial HUD anchor and viewport management
│   │   │   ├── FixWhatInitPanel.ts        # Centered initialization banner & progress bar
│   │   │   ├── FixWhatWelcomePanel.ts     # Experience gateway & model scope guard
│   │   │   └── FixWhatMentorPanel.ts      # Core 3-column procedural guidance HUD & drawers
│   │   ├── Data/                          # Procedural state store & visual registry
│   │   │   ├── FixWhatProcedureStore.ts   # State machine, step evaluation & branch indexing
│   │   │   ├── FixWhatVisualRegistry.ts   # Decoupled diagram texture binding registry
│   │   │   └── ProcedureFixtures.ts       # Pre-bundled TypeScript procedural contracts
│   │   ├── Types/                         # Strict TypeScript interface contracts
│   │   │   └── ProcedureTypes.ts          # Core procedural, tool, hazard & visual types
│   │   └── Tests/                         # Automated in-engine LEAF test scenarios
│   │       ├── LeafIndex.ts               # Scenario test registry & runner index
│   │       ├── LeafTestHelpers.ts         # LEAF assertion and async test helpers
│   │       ├── FixWhatStartupScenario.ts  # Lifecycle boot & SIK initialization test
│   │       ├── FixWhatGatewayScenario.ts  # Gateway transition & track selection test
│   │       ├── FixWhatConsumerScopeScenario.ts # GE 33709 vs 33711 scope guard test
│   │       ├── FixWhatRemoteJourneyScenario.ts # 9-step consumer remote journey test
│   │       ├── FixWhatWorkshopSafetyScenario.ts # Step 00 blocking safety barrier test
│   │       ├── FixWhatWorkshopJourneyScenario.ts # 11-step workshop wire splicing test
│   │       ├── FixWhatCatalogueScenario.ts# Catalogue selection test
│   │       └── FixWhatNavigationRecoveryScenario.ts # Rapid jump & recovery test
│   ├── Render/                            # Custom unlit shaders and material definitions
│   │   ├── unlit.graphShader              # High-contrast diagram shader graph
│   │   └── StepVisualMaterial.mat         # Material instance with depth test enabled
│   ├── Textures/Guidance/                 # 20 high-contrast procedural technical illustrations (1200x400)
│   └── Scene.scene                        # Production scene graph hierarchy
├── Packages/                              # Essential Lens Studio native packages
│   ├── SpectaclesInteractionKit 2.lspkg   # SIK 2.0 core package
│   ├── SpectaclesUIKit 2.lspkg            # UI Kit 2.0 core package
│   └── Leaf.lspkg                         # LEAF automated test harness
├── data/                                  # Canonical procedural data contracts and fixtures
│   ├── schemas/                           # JSON Schema specifications
│   │   ├── ManualSchema.json              # Procedural step and hazard data contract
│   │   └── MaintenanceHistorySchema.json  # Repair session history contract
│   └── procedures/                        # Machine-verified repair procedures
│       ├── ge_33709_remote_setup.json     # 9-step consumer remote repair procedure
│       ├── wire_soldering_splice.json     # 11-step workshop soldering procedure
│       ├── delonghi_ec680_descaling.json  # Historical regression fixture
│       └── delonghi_ec685_descaling.json  # Historical regression fixture
├── devpost/                               # Competition submission assets and metadata
│   ├── design-brief.md                    # Authoritative Learn AR competition design brief
│   └── submission-text.md                 # Complete Devpost form text & video script
├── docs/                                  # Comprehensive architectural and forensic documentation
│   ├── PROJECT_CONSTITUTION.md            # Governing principles and non-negotiable boundaries
│   ├── PROJECT_STATE.md                   # Single source of truth for repository state
│   ├── ARCHITECTURE.md                    # System architecture and spatial hierarchy
│   ├── DESIGN_GOVERNANCE.md               # CLAD spatial design and token governance
│   ├── DECISION_LOG.md                    # Architectural Decision Records (ADRs)
│   ├── TEST_STRATEGY.md                   # Verification and testing protocols
│   ├── KNOWN_LIMITATIONS.md               # Registry of boundaries and constraints
│   ├── CHANGELOG.md                       # Chronological modification log
│   ├── FW-05_ASSET_AND_ATTRIBUTION_REGISTER.md # Third-party IP register
│   ├── FW-05_COMPETITION_SUBMISSION_AUDIT.md # Hackathon rubric compliance audit
│   ├── FW-05D_PRODUCT_AND_RUNTIME_RELEASE_CLAIMS.md # Scope claim verification
│   └── FW-05E_LIVE_RUNTIME_REVALIDATION_REPORT.md # Live runtime certification (100% pass)
└── scripts/
    └── validate_procedure.py              # Automated 19-fixture procedure data validator
```

---

## 6. Installation & Setup Instructions

### Prerequisites
1. **Lens Studio:** Version **5.24.1** or later ([Download from Snap](https://ar.snap.com/lens-studio)).
2. **Python:** Version **3.9+** (required for offline procedural data validation).
3. **Git:** Version **2.30+**.

### Step 1: Clone the Repository
```bash
git clone https://github.com/kanku57/Fixwhat-AR.git
cd Fixwhat-AR
```

### Step 2: Run Procedural Validation
Verify the procedural data fixtures and safety schemas before opening the editor:
```bash
python3 scripts/validate_procedure.py
```
*Expected output:* `ALL 5 FIXTURE/SCHEMA VALIDATIONS AND 14 NEGATIVE REGRESSION TESTS PASSED CLEANLY.`

### Step 3: Open in Lens Studio
1. Launch **Lens Studio 5.24.1**.
2. Click **Open Project** and navigate to the cloned `Fixwhat-AR` directory.
3. Select `Fixwhat.esproj` and click **Open**.
4. Allow Lens Studio to compile TypeScript assets and resolve native package bindings.

### Step 4: Run in Interactive Preview
1. In the **Preview Panel**, ensure the device profile is set to **Spectacles (2024)**.
2. Ensure **Interactive Preview** is active.
3. Use the simulated hands to interact with the spatial interface:
   - **Hover:** Bring virtual hand near buttons to observe hover highlight.
   - **Pinch / Poke:** Press buttons (e.g., `START GUIDED`, `NEXT STEP`, `WHY?`) using pinch or direct poke.
   - **Safety Gate:** When entering hazardous steps, acknowledge the safety prompt to unlock guidance.

---

## 7. Verification & Testing Protocol

FixWhat? AR enforces a multi-tier verification methodology:

```text
Offline Schema Validation (Python / JSON Schema)
       ↓
TypeScript Strict Compilation (Lens Studio Native TSC)
       ↓
Scene Graph & Package Integrity Audit (MCP / Forensic)
       ↓
In-Preview Interaction Simulation (SIK Hand Tracking)
       ↓
Automated Scenario Regression (LEAF Framework)
```

1. **Procedural Schema Testing:** Run `python3 scripts/validate_procedure.py` to test both positive procedures and 14 negative corruption payloads (missing citations, non-sequential steps, unregistered tools, unacknowledged hazards).
2. **TypeScript Compilation:** All scripts located in `Assets/Scripts/` compile cleanly with zero errors against Lens Studio's `StudioLib.d.ts` and `editor.d.ts`.
3. **Automated LEAF Scenarios:** The project includes integration test scenarios executed via `LeafTestRunner` verifying modal transitions, step progression, and safety barrier enforcement.

---

## 8. Spatial Architecture & Ergonomics

FixWhat? AR follows strict spatial UX principles tailored for the Spectacles waveguide display:

```
                      [ User Head / Camera ]
                                |
                                |  120 cm - 150 cm focal distance
                                v
     +------------------------------------------------------+
     |                 FixWhat? Spatial HUD                 |
     |                                                      |
     |  +----------------+  +----------------+  +---------+ |
     |  | Step Guidance  |  |  High-Contrast |  | Quick   | |
     |  | - Title        |  |  Vector        |  | Actions | |
     |  | - Description  |  |  Technical     |  | - Next  | |
     |  | - Warnings     |  |  Illustration  |  | - Back  | |
     |  | - Source Ref   |  |                |  | - Why?  | |
     |  +----------------+  +----------------+  +---------+ |
     |                                                      |
     |  [ Expandable Pedagogical Scaffolding ("Why?" Drawer)] |
     +------------------------------------------------------+
```

- **Focal Distance:** All interactive surfaces are anchored between 120 cm and 150 cm in world space, eliminating vergence-accommodation conflict and reducing eye fatigue.
- **Field of View Optimization:** UI panels stay within a 26° central visual cone, avoiding edge clipping and chromatic aberration.
- **Visual Clarity:** Dark semi-transparent backplates (`#1A1A1A` with 0.85 opacity) ensure high contrast against bright real-world environments without obstructing physical workpieces.

---

## 9. Future Roadmap

| Milestone | Target Capability | Description |
| :---: | :--- | :--- |
| **FW-03** | **Live CV Object Recognition** | Implement real-time SnapML models to automatically detect supported appliances, detect screw removal, and verify wire stripped lengths. |
| **FW-04** | **On-Device Optical Character Recognition** | Allow technicians to point Spectacles at arbitrary appliance model plates to automatically look up matching repair schemas. |
| **FW-05** | **Cloud Manual Sync (Route D)** | Connect to Supabase / Snap Cloud to dynamically stream newly published repair schemas and community-authored teardowns. |
| **FW-06** | **Spatial Telepresence & Remote Mentor** | Enable two-way live spatial annotations between remote expert technicians and field personnel wearing Spectacles. |

---

## 10. Acknowledgements & Attribution

FixWhat? AR relies on the following open technologies and authoritative technical standards:
- **Snap Inc.:** Lens Studio 5.24.1, Spectacles Interaction Kit (SIK), Spectacles UI Kit, and LEAF testing framework.
- **Learn Skill Pack (`plan-lens`):** Devpost challenge pack ingested as author-time agent development tooling (not a runtime application dependency).
- **Google Material Design Icons:** Apache License 2.0.
- **Jasco Products / GE:** Official Service Guide & Code Lookup Tables for GE 33709 Universal Remote.
- **NASA Workmanship Standards:** NASA-STD-8739.4 (Crimping, Interconnecting Cables, Harnesses, and Wiring), utilized strictly as an educational craftsmanship reference for high-reliability wire joining without NASA certification, endorsement, or flight qualification.
- **Weller Tools GmbH:** Practical Soldering Guide for Electronic Assemblies.

For full legal notices, copyright declarations, and terms, see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

---

## 11. License & Third-Party Notices

- **Project Source Code & Original Technical Diagrams:** Licensed under the [MIT License](LICENSE). Copyright (c) 2026 FixWhat? Contributors.
- **Third-Party Frameworks, Icons & Reference Standards:** Retain their respective licenses and terms (including Snap Developer Terms for SIK/UIKit/LEAF, Apache 2.0 for Google Material Icons, and fair-use educational references for Jasco, NASA, and Weller). For complete details, see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

