# FixWhat? AR — Master Product & Development Roadmap

**Project Concept:** FixWhat? AR  
**Product Thesis:** "FixWhat? AR is a spatial task guidance, practical learning and verification platform that recognises the user's environment, guides real-world tasks, observes actions, evaluates available evidence and helps users reach verified outcomes."  
**Target Platform:** Snap Spectacles (SPECS 2024 / Lens Studio 5.24.1.26100516)  
**Hackathon:** Learn AR with SPECS (Devpost)  
**Roadmap Governance Status:** `LOCKED AS AUTHORITATIVE PLANNING BASELINE`  
**Governing Authority:** Product Owner retains exclusive implementation and release authorization.

---

## 1. Product Direction & Long-Term Vision

FixWhat? AR is not limited to a conventional static AR instruction manual. The overarching product direction follows a six-stage evolutionary progression:

```text
REAL-WORLD PERCEPTION
  → PROCEDURE INTELLIGENCE
  → CONTEXTUAL GUIDANCE
  → ACTION OBSERVATION
  → EVIDENCE-BASED VERIFICATION
  → LEARNING AND COMPETENCY
```

### Three Long-Term Experience Directions
1. **Consumer / Remote Experience (Principal Product Experience):**
   Guidance for everyday consumer electronics, home device setup, battery maintenance, and basic troubleshooting (baseline focus: GE/Jasco Universal Remote 33709 / 33711).
2. **Workshop / Practical Learning Experience (Principal Product Experience):**
   Structured, safety-critical skills training, craftsmanship benchmarks, technique instruction, and workmanship inspection (baseline focus: Low-voltage 20–24 AWG stranded copper wire joining and soldering).
3. **Professional / Field-Service Experience (Future Expansion Only):**
   Enterprise equipment maintenance, work-order integration, technician qualification tracking, and supervisor sign-offs. **Classified strictly as future expansion; not authorized for implementation.**

---

## 2. Roadmap Principles & Planning Authority

1. **Roadmap Lock vs. Implementation Authorization:**
   This roadmap is locked by the Product Owner as the governing planning baseline for FixWhat? AR. Milestone sequencing is locked. However, **roadmap lock does not constitute implementation authorization**. Each milestone and sub-milestone requires its own explicit, independent scope authorization gate prior to any code or scene authoring.
2. **Living Control Ledger:**
   Statuses reflect verified facts only. No task is marked complete or verified without demonstrable, inspectable evidence.
3. **Allowed Status Values:**
   - `NOT STARTED`: Task or milestone has not commenced.
   - `IN PROGRESS`: Authorized work is actively underway within the approved gate.
   - `BLOCKED`: Work cannot proceed until an external dependency or human decision is resolved.
   - `IMPLEMENTED`: Code, configuration, or documentation files exist, but testing/verification is incomplete.
   - `VERIFIED`: Objective test evidence (compiler, Preview, LEAF, or visual proof) has been gathered and recorded; awaits human acceptance.
   - `ACCEPTED`: Human developer (Product Owner) has reviewed evidence and formally authorized milestone completion.
   - `ACCEPTED WITH RECORDED LIMITATIONS`: Formally accepted by Product Owner with specific acknowledged technical, hardware, or documentation boundaries.
4. **Strict Bounded Remediation Policy:**
   If a regression or defect is identified within an accepted milestone, remediation must be surgically bounded to the specific root cause without reopening accepted milestone scope or rewriting historical records.

---

## 3. Milestone Summary Matrix (Phases 0 through 11)

| Phase / Milestone | Title | Status | Scope & Deliverables | Governance Gate |
| :--- | :--- | :--- | :--- | :--- |
| **Phase 0** | **Project Governance & Baseline** | `ACCEPTED` | M0A–M0E: Toolchain audit, LS 5.24.1 verification, git security hardening, baseline commit (`8fa1d63`), CLAD ingestion | Formally Accepted |
| **Phase 1** | **Product Definition & MVP Baseline** | `ACCEPTED` | Dual-track baseline: GE 33709 Remote + Workshop Wire Splicing; Draft-07 schemas; 14 negative tests; Product Spec Rev 4.1 & Gap Audit Rev 4.1 | Formally Accepted |
| **Phase 2** | **Prototype Foundations** | `ACCEPTED WITH LIMITATIONS` | B2.1-R1 source cleanup, B2.1-R2 LEAF harness, B2.2 Stages A–D (20 guidance assets, visual registry, 5 LEAF tests, UI overlap correction) | Formally Accepted |
| **M3** | **Core Experience Completeness** | `IN PROGRESS` | M3.1 & M3.2 accepted, M3.3 complete (recommended for acceptance), M3.4 shared runtime, M3.5 MPP acceptance | **Active Milestone Gate** |
| **M4** | **Dual-Mode Experience Architecture** | `NOT STARTED` | M4.1–M4.4: Dual controllers, shared procedure/session/safety/visual services, mode navigation | Pending M3 sign-off |
| **M5** | **Procedure Intelligence Engine** | `NOT STARTED` | M5.1–M5.5: Conditional branching, guided troubleshooting, result verification framework, recovery paths | Pending M4 sign-off |
| **M6** | **Real-World Perception & Spatial Understanding**| `NOT STARTED` | M6.1–M6.6: Spectacles CV audit, real device recognition (GE 33709/33711), tool/workbench CV, model registry | Pending M5 sign-off |
| **M7** | **Action Recognition & Guided Verification** | `NOT STARTED` | M7.1–M7.6: Tool-in-hand awareness, wrong-action detection, workmanship assessment, evidence report | Pending M6 sign-off |
| **M8** | **Learning & Competency Platform** | `NOT STARTED` | M8.1–M8.6: Practice mode, knowledge checks, workmanship scoring, skill passport, classroom mode | Pending M7 sign-off |
| **M9** | **Content Platform & Offline Support** | `NOT STARTED` | M9.1–M9.7: Procedure library, authoring tools, offline packs, bookmarks, accessibility, learning analytics | Pending M8 sign-off |
| **M10** | **Professional / Field-Service Mode** | `NOT STARTED` — **FUTURE EXPANSION** | Enterprise maintenance, work orders, technician history, supervisor sign-offs, parts management | **Future Expansion Only** |
| **M11** | **Product Validation, Competition & Launch** | `NOT STARTED` | M11.1–M11.6: Hardware verification, user testing, Devpost hackathon delivery, commercial strategy | Final Release Gate |

---

## 4. Historical Accepted Work (Phases 0 through 2)

All completed work is recorded with its verified facts, delivery commits, and documented limitations. Accepted work is preserved and not reopened.

### Phase 0: Project Governance & Baseline
- **Status:** `ACCEPTED`
- **Verified Deliverables:**
  - `M0A`: Read-only host environment audit (macOS Ventura 13.7.8, Intel x86_64, LS v5.25 ceiling identified).
  - `M0B`: Lens Studio 5.24.1.26100516 verification, SPECS Base Template validation, MCP port 50040 confirmation.
  - `M0C`: Foundation governance established in `AGENTS.md`, `ROADMAP.md`, `docs/PROJECT_CONSTITUTION.md`, `docs/PROJECT_STATE.md`, `docs/ARCHITECTURE.md`, `docs/DECISION_LOG.md`, `docs/TEST_STRATEGY.md`, `docs/KNOWN_LIMITATIONS.md`, `docs/INSTALLATION_AND_SETUP.md`, `docs/CHANGELOG.md`.
  - `M0D`: Git security hardening, default-deny `.gitignore`, baseline commit `8fa1d63` (27 files tracked, 0 remotes).
  - `M0E`: Devpost `challengepost/learn-specs` (`plan-lens`) skill pack ingested (commits `ebaf149`, `493269b`).
- **Governing Constraints:**
  - Antigravity as Principal Software Architect.
  - CLAD-first governance mandatory for applicable Lens Studio development.
  - Strict secret protection: zero credentials, API keys, or private bearer tokens tracked in git.
  - Hardware boundary: Preview-only validation; zero claims of physical Spectacles hardware testing.

### Phase 1: Product Definition & MVP Baseline
- **Status:** `ACCEPTED`
- **Scope & Specifications:**
  - **Consumer Remote Track:** GE/Jasco Universal Remote 33709 and 33711 (detailed procedure authored for 33709: battery door, polarity, direct TV code entry).
  - **Workshop Training Track:** Low-voltage wire joining and soldering training (two disconnected, non-energized 20–24 AWG stranded copper wires; Weller T0055745804 thermal/safety guidelines; NASA-STD-8739.4A / NASA-STD-8739.3 educational craftsmanship benchmarks).
  - **Authoritative Data Contracts:** `data/schemas/ManualSchema.json` (Draft-07), `data/schemas/MaintenanceHistorySchema.json`, `data/procedures/ge_33709_remote_setup.json`, `data/procedures/wire_soldering_splice.json`.
  - **Automated Validation Suite:** `scripts/validate_procedure.py` (5 positive checks PASS, 14 negative security/syntax checks REJECTED AS EXPECTED).
  - **Adopted Specifications:** `docs/PRODUCT_EXPERIENCE_SPECIFICATION.md` Rev 4.1 and `docs/PRODUCT_EXPERIENCE_GAP_AUDIT.md` Rev 4.1 adopted under `PRODUCT-EXPERIENCE-ADOPTION-01`.
  - **Approved Design Brief:** `devpost/design-brief.md` approved under `PLAN-LENS-01`.
- **Accepted Scope Boundaries:**
  - No runtime-generated instructions; pre-authored JSON procedures only.
  - Simulated object recognition via 3D proxy / manual selection in Preview; no claim of live computer vision on physical glasses.
  - No mains AC or energized circuits; no critical automotive or flight repairs.
  - NASA standards serve strictly as educational craftsmanship benchmarks, not certification or compliance endorsements.
  - Unsupported appliances (coffee machines, routers, game controllers) classified as visual reference only.
  - Spatial architecture options (Head-Locked, World-Locked, Table-Anchored, Contextual Paged, Hybrid Gaze) remain OPEN (PROPOSED); no architecture is prematurely imposed.

### Phase 2: Prototype Foundations
- **Status:** `ACCEPTED WITH RECORDED LIMITATIONS`
- **Completed Sprints & Stages:**
  - **B2.1-R1 Production Source Cleanup:** Cleaned script contracts, deprecated legacy scaffolding, and stabilized runtime (`ACCEPTED WITH RECORDED LIMITATIONS`).
  - **B2.1-R2 LEAF Harness Integration:** Integrated Spectacles LEAF testing framework (`Leaf.lspkg`), established `Assets/Scripts/Tests/LeafIndex.ts`, and authored 5 automated test scenarios (`ACCEPTED WITH RECORDED LIMITATIONS`).
  - **B2.2 Stage A (Learner Experience Gap Audit):** Forensic audit of learner UX gaps and visual requirements (`ACCEPTED`).
  - **B2.2-R1 (Contract Hardening & Pause Integrity):** Authoritative procedure ID contracts and modal pause/resume state machine (`ACCEPTED`).
  - **B2.2-R2 Stage A (Visual Asset Requirements & Production Plan):** 20-asset specification matching $36.0 \times 11.0\text{ cm}$ HUD dimensions (`ACCEPTED`).
  - **B2.2-R2 Stage B (Technical Reference & Accuracy Review):** Grounding against Jasco, Weller, and NASA reference literature (`ACCEPTED WITH RECORDED LIMITATIONS`).
  - **B2.2-R2 Stage C (Artwork Production & QA Register Reconciliation):** Authored 20 guidance textures ($1200 \times 400$, 8-bit PNG, sRGB, dark backing), contact sheets, and QA register (19 PASS, 1 PASS WITH LIMITATIONS for generic TV-code template AST-REM-08) (`ACCEPTED`).
  - **B2.2-R2 Stage D (HUD Integration, LEAF Regression & Preview QA):** Integrated `FixWhatVisualRegistry.ts` (decoupled `requireAsset()` loader), dynamic texture swapping in `FixWhatMentorPanel.ts`, 20 active renderer bindings, 5/5 passing LEAF automated scenarios, and 8 preserved Preview captures (`ACCEPTED`).
  - **UI Overlap Correction:** Resolved `FlexLayout` dynamic child-discovery omission in `FixWhatWelcomePanel.ts`, enforcing the 6-tier vertical hierarchy across Remote Recognition and Workshop Placement screens (`RESOLVED & ACCEPTED`).
- **Preserved Assets:** All 20 guidance textures in `Assets/Textures/Guidance/`, contact sheets, visual registry, test scripts, and reports are preserved intact.

---

## 5. Master Roadmap — Locked Milestone Sequence (Phases 3 through 11)

```text
M3 (Core Experience Completeness) [NEXT MILESTONE]
  ↓
M4 (Dual-Mode Experience Architecture)
  ↓
M5 (Procedure Intelligence Engine)
  ↓
M6 (Real-World Perception & Spatial Understanding)
  ↓
M7 (Action Recognition & Guided Verification)
  ↓
M8 (Learning & Competency Platform)
  ↓
M9 (Content Platform & Offline Support)
  ↓
M10 (Professional / Field-Service Mode) [Future Expansion Only]
  ↓
M11 (Product Validation, Competition & Launch)
```

---

### Milestone 3: Core Experience Completeness
- **Status:** `IN PROGRESS` — Active Implementation Milestone
- **Objective & Scope:** Bring both MVP user journeys (Consumer Remote and Workshop Wire Splicing) to complete, playable, and coherent end-to-end execution within the Lens Studio Preview simulation. Resolve all journey blockers, navigation gaps, and state transitions across onboarding, procedure execution, pause/recovery, and completion.
- **Sub-Milestones:**
  - **M3.1 Repository & Product Baseline Reconciliation:**
    - Read-only forensic repository audit across documentation, TypeScript sources, Scene hierarchy, and test coverage.
    - Reconcile prototype HUD code (`FixWhatHUD.ts`, `FixWhatBootstrap.ts`) with production mentor panel architecture (`FixWhatMentorPanel.ts`, `FixWhatWelcomePanel.ts`).
    - Create a traceable User Journey Gap Register.
    - Preserve all accepted Phase 0–2 work.
    - **Status:** `ACCEPTED AS SUBSTANTIALLY COMPLETE WITH RECORDED LIMITATIONS` (Formal record: `docs/M3.1_FINAL_ACCEPTANCE_RECORD.md`).
  - **M3.2 Consumer Journey Completeness:**
    - Device selection and identification screen flow.
    - Supported model (GE 33709) and procedure selection; GE 33711 explicitly deferred with honest notification view (`View_UnsupportedModel`) under `DEC-M3.2-01`.
    - Procedure overview presentation.
    - Guided remote setup execution (all 9 steps with visual guidance).
    - Step navigation, progress tracking, and phase transitions.
    - Pause, resume, repeat step, and return to track selection.
    - Authoritative source citations interface (`Accordion_Source`, `Btn_Source`) implemented under `DEC-M3.2-02`.
    - Completion summary and session recovery states.
    - Explicit, prominent simulated-versus-real recognition distinction.
    - **Status:** `ACCEPTED BY PRODUCT OWNER WITH RECORDED EVIDENCE LIMITATIONS` (Formal record: `docs/M3.2_FINAL_ACCEPTANCE_RECORD.md`).
  - **M3.3 Workshop Journey Completeness:**
    - Practical skill and procedure selection.
    - Workshop workspace preparation and workbench proxy alignment.
    - Guided wire joining and soldering training (all 11 steps with visual guidance).
    - Instructional illustrations, callouts, and expandable "Why?" explanations.
    - Pre-flight and cold-iron safety presentation and acknowledgments.
    - Progression controls, step replay, and pause recovery.
    - Completion summary and visual workmanship inspection checklist.
    - **Status:** `IMPLEMENTATION COMPLETE & VERIFIED — RECOMMENDED FOR FORMAL ACCEPTANCE` (All 20 criteria verified; fresh transpilation confirmed; `docs/M3.3_WORKSHOP_ACCEPTANCE_REPORT.md`).
  - **M3.4 Shared Runtime & Interaction Completeness:**
    - Unified application lifecycle and shared state machine.
    - Dynamic procedure loading and schema validation.
    - Panel visibility, depth-sorting, and layout stability.
    - SIK hand interactor and mouse-pinch input bindings.
    - Appropriate Spectacles UI Kit integration.
    - Consistent input behavior and error handling.
    - Full LEAF regression test coverage.
  - **M3.5 Minimum Playable Product (MPP) Acceptance:**
    - Complete end-to-end testing of Remote Journey.
    - Complete end-to-end testing of Workshop Journey.
    - All LEAF integration scenarios passing (100%).
    - High-resolution Preview evidence and video walkthrough captured.
    - All governance documentation reconciled.
    - Known limitations registered.
- **Explicit Exclusions:**
  - No physical Spectacles hardware deployment or validation.
  - No live computer vision or custom ML model training.
  - No dynamic cloud OCR or PDF parsing.
  - No energized circuits or unsupported appliances.
- **Planning Note — Manual Consultation & Pre-Bundled Reference Evaluation:**
  - Evaluate whether selected pre-bundled reference manual pages (e.g. 4–6 approved static diagram pages for GE 33709 remote and Weller soldering) are useful for the existing MVP experience.
  - Preserve the existing manual consultation requirement strictly within approved MVP scope (advisory source citations in the Source Viewer).
  - Do NOT implement arbitrary user manual upload or cloud document ingestion in M3.
  - Any pre-bundled reference implementation requires its own separate human scope approval prior to development.
- **Exit Gate:** Both MVP experiences operate coherently from welcome to completion in Lens Studio Preview with zero critical journey blockers. (This exit gate represents Minimum Playable Product acceptance in simulation, not hardware certification).

---

### Milestone 4: Dual-Mode Experience Architecture
- **Status:** `NOT STARTED`
- **Objective & Scope:** Architect and formalize the decoupled dual-controller runtime architecture supporting both distinct product experiences upon a common, reusable foundation.
- **Sub-Milestones:**
  - **M4.1 Architecture Design:**
    - Consumer Experience Controller (`ConsumerExperienceController.ts`).
    - Workshop Experience Controller (`WorkshopExperienceController.ts`).
    - Shared Procedure Service (`ProcedureService.ts`).
    - Shared Session Service (`SessionService.ts`).
    - Shared Safety and Boundary Service (`SafetyBoundaryService.ts`).
    - Shared Visual Registry (`FixWhatVisualRegistry.ts`).
    - Shared Evidence and Source Service (`EvidenceSourceService.ts`).
    - Common spatial interaction infrastructure.
  - **M4.2 Consumer Journey Execution Flow:**
    `Identify Device → Select Task → Understand Problem → Enter Guided Mode → Follow Step Guidance → Verify Observable Result → Complete or Recover`.
  - **M4.3 Workshop Journey Execution Flow:**
    `Select Skill → Learn Concept → Prepare Workspace → Learn Technique → Perform Task → Inspect Workmanship → Assess Learning Outcome`.
  - **M4.4 Shared Experience Integration:**
    - Consistent design language across both experiences.
    - Mode-specific navigation controls (exploratory training vs. structured task guidance).
    - Shared data structures conforming to `ManualSchema.json`.
    - No duplicated procedure execution engines.
    - Clean, deterministic mode transitions.
- **Exit Gate:** Two distinguishable experiences operate on a documented, modular, common architectural foundation.

---

### Milestone 5: Procedure Intelligence Engine
- **Status:** `NOT STARTED`
- **Objective & Scope:** Implement an advanced, conditional procedure execution engine that moves beyond static linear step progression to support conditional branching, troubleshooting diagnostics, and evidence-based verification.
- **Sub-Milestones:**
  - **M5.1 Structured Procedure Intelligence Data Model:**
    Expanded schema representing Task, Procedure, Step, Preconditions, Expected Outcomes, Observable Conditions, Decision Branches, Failure States, Recovery Procedures, Completion Criteria, Evidence References, and Safety Constraints.
  - **M5.2 Conditional Execution Runtime:**
    Branching step logic, conditional progression gates, required user confirmations, observable-state evaluation, retry and recovery loops, and explicit stop conditions.
  - **M5.3 Guided Troubleshooting Framework:**
    Structured diagnostic questioning flows, reported vs. observed condition evaluation, approved diagnostic tree branches, and documented recovery actions.
  - **M5.4 Result Verification Framework:**
    Visible expected results, required physical confirmations, automatically evaluable criteria, external measurement requirements (e.g. resistance, continuity), human inspection prompts, and explicit classification of non-verifiable conditions.
  - **M5.5 Evidence-Based Completion Evaluation:**
    Deterministic outcome assessment classifying execution into `PASS`, `RETRY`, `REVIEW`, or `STOP`.
  - **M5.6 Manual Source and Traceability:**
    - Manual document identity and provenance tracking.
    - Manufacturer, model, and hardware code library revision association (e.g. Jasco 33709 / Revision CL5 vs. CL3).
    - Page-level source references and verbatim excerpt anchoring.
    - Bidirectional procedure-to-manual traceability.
    - Manual/procedure discrepancy representation (e.g. highlighting revision mismatches).
    - Source-grounded instructional explanations.
    - Explicit conflict handling (FixWhat? safety override rules supersede unverified manual testing instructions).
    - **Non-Negotiable Safety Mandate:** Manual-derived content must NOT automatically become an executable procedure or safety gate without independent human authoring and validation against `scripts/validate_procedure.py`.
- **Exit Gate:** At least one conditional procedure executes with validated decision branches, error recovery, and outcome evaluation in Preview simulation.

---

### Milestone 6: Real-World Perception & Spatial Understanding
- **Status:** `NOT STARTED`
- **Objective & Scope:** Transition from simulated Preview proxies to real-world perception using Snap Spectacles on-device sensors, custom machine learning models, and spatial environment understanding.
- **Sub-Milestones:**
  - **M6.1 Spectacles Capability & Constraints Audit:**
    Comprehensive audit of Spectacles Camera APIs, custom SnapML object recognition runtime, hand tracking bounds, spatial tracking stability, surface query modules, thermal/memory limits, and Lens Studio API constraints.
  - **M6.2 Real Device Recognition:**
    Custom ML detection models for GE 33709 and GE 33711; device detection, model differentiation, 6-DoF pose/orientation estimation, keypad control identification, battery compartment localization, and confidence/ambiguity scoring.
  - **M6.3 Workstation & Tool Recognition:**
    Object detection models for workshop tools: stranded wires, wire strippers, flush cutters, soldering iron, rosin-core solder, heat-shrink tubing, heat gun, and work surface.
  - **M6.4 Spatial Workbench Understanding:**
    Surface plane detection, physical workbench boundary identification, tool-to-procedure spatial association, spatial anchoring of annotations, and object relationship tracking.
  - **M6.5 Contextual Spatial Guidance:**
    Direct physical component highlighting (e.g. projecting visual highlights onto physical battery terminals or wire tips), spatially anchored annotations, minimal head movement ergonomics, and preserved work-area visibility.
  - **M6.6 Recognition Model Registry:**
    Version-controlled model registry documenting model architecture, supported objects, training-data provenance, validation datasets, inference latency, false-positive rates, and hardware compatibility.
- **Exit Gate:** At least one supported device (GE 33709) and a defined set of workshop tools are reliably recognized in controlled tests on **actual Spectacles hardware**. *(Preview simulation proxies do not satisfy this gate).*

---

### Milestone 7: Action Recognition & Guided Verification
- **Status:** `NOT STARTED`
- **Objective & Scope:** Implement real-time action observation and workmanship evaluation, monitoring physical user actions and assessing physical evidence to guide verification.
- **Sub-Milestones:**
  - **M7.1 Action Recognition Research & Prototyping:**
    Detection algorithms for physical actions: picking up specific tools, holding wire ends, stripping insulation, twisting conductors, forming mechanical wraps, applying solder, and shrinking tubing.
  - **M7.2 Tool-in-Hand Awareness:**
    Continuous state tracking verifying whether the user is holding the correct tool required for the active procedural step.
  - **M7.3 Wrong-Action & Hazard Detection:**
    Temporal action monitoring detecting improper or hazardous actions (e.g. attempting to solder before mechanical wrap; touching heated iron to unprotected surface); immediate controlled pause and corrective visual explanation.
  - **M7.4 Visual Workmanship Assessment:**
    Computer vision inspection of physical craftsmanship: visible conductor arrangement, wrap count (e.g. 3-turn Western Union), loose or broken strands, solder wetting and concave fillet formation, insulation clearance, and heat-shrink coverage.
  - **M7.5 Instrument-Assisted Verification Protocols:**
    Integration workflows for external test instruments (multimeter resistance checks, continuity beeps); strict delineation between visual inspection and electrical measurement; human inspection checklist requirements.
  - **M7.6 Evidence-Based Repair & Training Report:**
    Comprehensive summary reporting observed criteria, passed checks, failed checks, inconclusive results, external measurements, human reviews, and procedure/model version tracking.
- **Exit Gate:** A defined procedural task is evaluated against an approved verification contract with explicit uncertainty quantification. *(Under no circumstances shall camera-only inspection guarantee electrical safety on live mains).*

---

### Milestone 8: Learning & Competency Platform
- **Status:** `NOT STARTED`
- **Objective & Scope:** Build a comprehensive pedagogical platform around the guided procedures, supporting skill acquisition, practice, knowledge assessment, and recorded craftsmanship competency.
- **Sub-Milestones:**
  - **M8.1 Practice Mode:**
    Unguided or semi-guided practice environment allowing learners to repeat physical techniques without rigid linear hand-holding.
  - **M8.2 Embedded Knowledge Checks:**
    Interactive multi-choice and scenario-based questions assessing comprehension of underlying engineering concepts (e.g. thermal transfer, flux activation, insulation clearance).
  - **M8.3 Workmanship Assessment Scoring:**
    Standardized scoring rubric evaluating physical technique, safety adherence, tool handling, and final joint quality against educational craftsmanship benchmarks.
  - **M8.4 Verifiable Skill Passport:**
    Cryptographically verifiable local or cloud record tracking completed procedures, demonstrated competencies, practice hours, and assessment results.
  - **M8.5 Instructor & Classroom Mode:**
    Dashboard and synchronization tools enabling vocational instructors to monitor multiple students, review recorded evidence, assign specific procedures, and provide remote feedback.
  - **M8.6 Adaptive Guidance Engine:**
    Dynamic assistance level adjusting hints and visual aids based on user speed and error frequency. *(Mandatory safety instructions and hazard warnings must never be reduced or skipped).*
- **Exit Gate:** A complete learning journey supports practice, assessment, and recorded competency evidence with demonstrable learning outcomes.

---

### Milestone 9: Content Platform & Offline Support
- **Status:** `NOT STARTED`
- **Objective & Scope:** Establish an extensible content management, authoring, and distribution infrastructure enabling rapid onboarding of new equipment procedures with robust offline operation.
- **Sub-Milestones:**
  - **M9.1 Modular Procedure Library:**
    Centralized catalog of schema-validated procedures across electronics, home appliances, automotive, and workshop skills.
  - **M9.2 Content Authoring & Verification Tools:**
    Web or desktop authoring suite for procedural engineers to compose step hierarchies, bind visual assets, define safety rules, and validate contracts.
  - **M9.3 Offline Procedure Packs:**
    Encapsulated, self-contained procedure packages bundling JSON definitions, textures, 3D assets, and ML weights for complete disconnected field operation.
  - **M9.4 Bookmarks, User Notes & Spatial Pins:**
    User ability to annotate steps, bookmark complex sub-procedures, and leave persistent spatial notes anchored to physical equipment.
  - **M9.5 Accessibility & Multilingual Localization:**
    High-contrast visual themes, scalable typography, text-to-speech audio narration, and multi-language procedure localization.
  - **M9.6 Product & Learning Analytics:**
    Privacy-preserving telemetry measuring step durations, drop-off points, common errors, and procedure clarity.
  - **M9.7 AI Learning Assistant:**
    Context-aware conversational assistant grounded strictly in approved, authoritative manual content for answering step-specific questions without generative hallucination.
  - **Manual Intelligence System Workstream (Preferred Architecture: Route D — Cloud Ingestion & Preprocessed Delivery):**
    - **M9.M1 — Companion Upload & Manual Library:** Companion web/mobile upload interface, user document library, supported document validation, and device/model association.
    - **M9.M2 — Document Ingestion & Processing:** PDF ingestion, digital text extraction, cloud OCR for scanned pages, document structure processing (headings, sections, tables), and high-contrast page rasterization (initial proposed target resolution: $1200 \times 800$ PNG/JPG, subject to Gate 4 validation).
    - **M9.M3 — Manual Search & Indexing:** Full-text search index, page reference mapping, section navigation, and hardware model/revision association.
    - **M9.M4 — Spectacles Content Delivery:** Authenticated content retrieval via `InternetModule.fetch()`, structured JSON delivery, and on-demand page texture streaming via `RemoteMediaModule.loadResourceAsImageTexture()`.
    - **M9.M5 — Manual Viewer:** AR Source Viewer panel rendering high-resolution original pages, page navigation controls, diagram zooming, and SIK/UI Kit touch interaction.
    - **M9.M6 — Procedure & Manual Integration:** Bidirectional linking between procedure steps and manual page citations, visual comparison overlays, discrepancy identification, and manual-grounded explanations.
    - **M9.M7 — Manual-Based Q&A:** In-lens conversational queries answered strictly from indexed manual pages with page-level citations, explicit confidence scoring, and no generative hallucination of repair steps.
    - **M9.M8 — Manual Version & Ownership Management:** Document revision tracking, multi-tenant user ownership, access control, retention, deletion, and replacement behavior.
    - **M9.M9 — Offline Manual Access:** Pre-caching of viewed manual page textures, local availability management, cache lifecycle/invalidation, and device storage quota management.
- **Exit Gate:** Procedures and supporting assets are managed, versioned, distributed, and executed with traceable source and compatibility information.

---

### Milestone 10: Professional / Field-Service Mode (Future Expansion Only)
- **Status:** `NOT STARTED` — **FUTURE EXPANSION ONLY (NOT AUTHORIZED FOR IMPLEMENTATION)**
- **Objective & Scope:** Enterprise-grade maintenance and field-service suite for certified technicians, commercial fleets, and industrial equipment.
- **Feature Scope:**
  - Work order management and dispatch integration.
  - Technician assignment and qualification gating.
  - Equipment service history, serial number tracking, and equipment passports.
  - Standard operating procedure (SOP) maintenance workflows.
  - Regulatory compliance inspection checklists.
  - Parts inventory, tool availability, and replacement ordering.
  - Visual defect recognition and automated damage tagging.
  - Photo/sensor evidence capture during maintenance.
  - Formal job completion reports and work documentation.
  - Supervisor review and digital sign-off.
  - Enterprise fleet analytics and technician performance metrics.
  - Enterprise role-based access control (RBAC) and data governance.
- **Explicit Governance Boundary:**
  Requires separate, independent product definition, enterprise architecture, security review, permissions audit, business-model evaluation, and customer validation approval prior to any development.

---

### Milestone 11: Product Validation, Competition & Launch
- **Status:** `NOT STARTED`
- **Objective & Scope:** Comprehensive physical hardware validation, third-party safety and usability testing, competition submission delivery, and commercial launch execution.
- **Sub-Milestones:**
  - **M11.1 Actual Spectacles Hardware Validation:**
    Exhaustive testing on physical Snap Spectacles hardware: optical waveguide readability across indoor/outdoor lux environments, thermal dissipation over 30-minute sessions, 60 FPS rendering stability, and physical SIK hand tracking.
  - **M11.2 Safety, Regulatory & Content Validation:**
    Independent technical review of instructional content, electrical safety disclaimers, hazard notices, and legal compliance.
  - **M11.3 User Experience & Usability Testing:**
    Rigorous user testing sessions across target cohorts: everyday consumers (remote setup), vocational students (wire joining), and workshop instructors.
  - **M11.4 System Performance & Reliability Benchmarking:**
    Memory profiling, battery consumption benchmarks, crash-free session metrics, and recovery resilience.
  - **M11.5 Competition Submission Delivery (Devpost Learn AR with SPECS):**
    Final submission video recording, demonstration script execution, code repository audit, Devpost questionnaire completion, and documentation package delivery.
  - **M11.6 Commercial Strategy & Public Release:**
    Go-to-market plan, Lens distribution, community feedback channels, and post-launch maintenance roadmap.
- **Exit Gate:** Competition submission and commercial launch are separate human review and acceptance gates.

---

## 6. Consolidated Feature Backlog

The following table maintains a strategic summary of the 58 top-level FixWhat? AR features across core domains and milestone horizons. This summary provides high-level milestone alignment and does not enumerate every subordinate architectural record. 

The granular, authoritative inventory of all 71 tracked feature records—including the 13 subordinate features of the Manual Intelligence System (`FT-MAN-01` through `FT-MAN-13` governed by `FT-SHR-15`)—is maintained in `docs/FEATURE_BACKLOG.md`. The authoritative total across the project is **71 features**, subject to future approved backlog changes.

All backlog items are planning proposals and do not constitute implementation authorization.

| Feature ID | Category | Feature Name | Target Milestone | Description & Scope | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FT-CON-01** | Consumer | Real Device Recognition | M6 | CV detection and 6-DoF pose estimation for GE 33709/33711 remotes | `BACKLOG` |
| **FT-CON-02** | Consumer | Device Passport | M9 | Digital passport recording device model, serial, and maintenance history | `BACKLOG` |
| **FT-CON-03** | Consumer | Automatic Task Identification | M6 | Automatic inference of required task based on observed device state | `BACKLOG` |
| **FT-CON-04** | Consumer | Guided Setup Flow | M3 | Interactive step-by-step pairing and setup guidance | `BACKLOG` |
| **FT-CON-05** | Consumer | Guided Troubleshooting | M5 | Structured diagnostic decision trees for non-responsive devices | `BACKLOG` |
| **FT-CON-06** | Consumer | Contextual Spatial Guidance | M6 | AR callouts and highlights projected directly onto device components | `BACKLOG` |
| **FT-CON-07** | Consumer | Live State Observation | M7 | Real-time observation of device state (e.g. LED feedback confirmation) | `BACKLOG` |
| **FT-CON-08** | Consumer | Guided Result Verification | M5 | Interactive verification check ensuring device functions properly | `BACKLOG` |
| **FT-CON-09** | Consumer | Repair History | M4 | Local maintenance log recording completed setup and battery replacements | `BACKLOG` |
| **FT-CON-10** | Consumer | Ask About This Step | M9 | AI-powered step clarification grounded strictly in authoritative manual | `BACKLOG` |
| **FT-CON-11** | Consumer | Device Comparison | M9 | Visual side-by-side comparison between supported hardware revisions | `BACKLOG` |
| **FT-CON-12** | Consumer | Recovery Guidance | M3 | Explicit recovery steps when a step or pairing code fails | `BACKLOG` |
| **FT-WRK-01** | Workshop | Workstation Recognition | M6 | Detection and spatial mapping of physical work surface and tools | `BACKLOG` |
| **FT-WRK-02** | Workshop | Workspace Preparation Check | M3 | Pre-flight checklist confirming clear surface, ventilation, and PPE | `BACKLOG` |
| **FT-WRK-03** | Workshop | Practice Mode | M8 | Unguided skill practice environment for mechanical wire wrapping | `BACKLOG` |
| **FT-WRK-04** | Workshop | Action Recognition | M7 | Real-time tracking of hand motions (stripping, wrapping, soldering) | `BACKLOG` |
| **FT-WRK-05** | Workshop | Live Technique Guidance | M7 | Dynamic visual feedback on iron angle, dwell time, and feed rate | `BACKLOG` |
| **FT-WRK-06** | Workshop | Workmanship Assessment | M7 | Automated visual inspection of solder wetting, fillets, and wrap count | `BACKLOG` |
| **FT-WRK-07** | Workshop | Step-by-Step Inspection | M3 | Guided post-step visual inspection prompts with standard benchmarks | `BACKLOG` |
| **FT-WRK-08** | Workshop | Knowledge Checks | M8 | Concept reinforcement quizzes testing electrical and thermal theory | `BACKLOG` |
| **FT-WRK-09** | Workshop | Skill Passport | M8 | Verifiable competency credential tracking verified practical skills | `BACKLOG` |
| **FT-WRK-10** | Workshop | Learning Progress | M8 | Analytics tracking learner speed, error rate, and technique mastery | `BACKLOG` |
| **FT-WRK-11** | Workshop | Instructor / Classroom Mode | M8 | Multi-user monitoring dashboard for vocational classroom instructors | `BACKLOG` |
| **FT-WRK-12** | Workshop | Instructor Review | M8 | Asynchronous review queue for instructors to grade student evidence | `BACKLOG` |
| **FT-SHR-01** | Shared | Procedure Intelligence Engine | M5 | Modular execution runtime supporting conditional branching and retry loops | `BACKLOG` |
| **FT-SHR-02** | Shared | Procedure Library | M9 | Centralized repository of schema-validated equipment procedures | `BACKLOG` |
| **FT-SHR-03** | Shared | Recognition Model Registry | M6 | Versioned registry of computer vision models with performance metrics | `BACKLOG` |
| **FT-SHR-04** | Shared | Visual Evidence Engine | M7 | Multi-modal evidence capture engine binding photos/logs to steps | `BACKLOG` |
| **FT-SHR-05** | Shared | Source & Evidence Viewer | M3 | Interactive panel displaying manufacturer citations and source text | `BACKLOG` |
| **FT-SHR-06** | Shared | Procedure Versioning | M9 | Semantic versioning ensuring procedure compatibility with app builds | `BACKLOG` |
| **FT-SHR-07** | Shared | Offline Procedure Packs | M9 | Self-contained offline bundles for field execution without internet | `BACKLOG` |
| **FT-SHR-08** | Shared | Session Recovery | M3 | State persistence restoring in-progress step after interruption | `BACKLOG` |
| **FT-SHR-09** | Shared | Bookmarks and Notes | M9 | User annotations and spatial bookmarks pinned to procedure steps | `BACKLOG` |
| **FT-SHR-10** | Shared | Accessibility Controls | M9 | High-contrast UI modes, scalable fonts, and audio narration | `BACKLOG` |
| **FT-SHR-11** | Shared | Multilingual Instructions | M9 | Internationalized procedure text and audio in multiple languages | `BACKLOG` |
| **FT-SHR-12** | Shared | Learning Analytics | M9 | Privacy-preserving telemetry measuring step clarity and difficulty | `BACKLOG` |
| **FT-SHR-13** | Shared | AI Learning Assistant | M9 | Conversational assistant answering questions from verified manuals | `BACKLOG` |
| **FT-SHR-14** | Shared | Confidence & Uncertainty System| M7 | Explicit confidence scoring communicating detection uncertainty to user | `BACKLOG` |
| **FT-SHR-15** | Shared | Manual Intelligence System | M9 | Multi-route manual consultation framework allowing users to reference preprocessed manufacturer manuals | `PREFERRED ARCHITECTURE APPROVED — IMPLEMENTATION PENDING TECHNICAL VALIDATION` |
| **FT-PER-01** | Perception | Spatial Workbench Memory | M6 | Persistent spatial memory remembering tool locations on work surface | `BACKLOG` |
| **FT-PER-02** | Perception | Component Highlighting | M6 | Real-time projection of outlines onto physical components | `BACKLOG` |
| **FT-PER-03** | Perception | Tool-in-Hand Awareness | M7 | Verification that user is actively holding required tool | `BACKLOG` |
| **FT-PER-04** | Perception | Wrong-Action Detection | M7 | Real-time detection of incorrect sequences with safety pause | `BACKLOG` |
| **FT-PER-05** | Perception | Step Completion Evidence | M7 | Objective sensor or visual evidence proving step completion | `BACKLOG` |
| **FT-PER-06** | Perception | Before/After Comparison | M7 | Split-screen visual comparison between initial and completed state | `BACKLOG` |
| **FT-PER-07** | Perception | Repair Quality Report | M7 | Exportable summary detailing workmanship quality and verification | `BACKLOG` |
| **FT-PER-08** | Perception | Remote Expert Assistance | M9 | Two-way audio/video streaming allowing remote technician guidance | `BACKLOG` |
| **FT-PER-09** | Perception | Voice-Driven Assistance | M6 | Hands-free voice commands via Spectacles ASR for step navigation | `BACKLOG` |
| **FT-PER-10** | Perception | Adaptive Guidance | M8 | Dynamic scaling of visual annotations based on user competence | `BACKLOG` |
| **FT-PER-11** | Perception | Safety Boundary Monitoring | M6 | Spatial boundary alert warning user when hands enter hazardous zones | `BACKLOG` |
| **FT-PER-12** | Perception | Multi-Device Workshop Mode | M6 | Simultaneous tracking of multiple assemblies on a single workbench | `BACKLOG` |
| **FT-PRO-01** | Professional | Work Orders Integration | M10 | Dispatch management and enterprise work order synchronization | `FUTURE` |
| **FT-PRO-02** | Professional | Equipment Service History | M10 | Enterprise equipment passport tracking complete lifecycle repairs | `FUTURE` |
| **FT-PRO-03** | Professional | Maintenance & Inspection SOPs | M10 | Regulatory compliance inspection workflows with digital sign-off | `FUTURE` |
| **FT-PRO-04** | Professional | Parts & Tools Management | M10 | Real-time parts inventory tracking and tool calibration logs | `FUTURE` |
| **FT-PRO-05** | Professional | Visual Defect Recognition | M10 | Automated detection of industrial equipment wear, corrosion, and cracks | `FUTURE` |
| **FT-PRO-06** | Professional | Evidence & Job Reports | M10 | Audit-ready compliance documentation generated upon job completion | `FUTURE` |
| **FT-PRO-07** | Professional | Supervisor Sign-off | M10 | Multi-tier sign-off requiring certified supervisor approval | `FUTURE` |

---

## 7. CLAD-First Governance & Implementation Rules

All future Lens development, planning, and verification must adhere to the following CLAD standards:

1. **CLAD Workflow Primacy:**
   - Where applicable, use the official `plan-lens` workflow.
   - Preserve learner-led conversational planning interviews; do not replace official interviews with autonomous scripts or fabricated equivalents.
   - Every build plan must conclude with the official "After the build: judge it" seven-step rubric.
2. **Native Tooling Boundaries:**
   - Always use native Lens Studio MCP tools for editor operations (`ExecuteEditorCode`, `VirtualScene`, `RecompileTypeScriptTool`, etc.).
   - **Never** use `curl`, `fetch`, `wget`, or raw HTTP against `localhost:50040`.
   - Never use external shell compilers (`tsc`) to bypass Lens Studio's compiler pipeline.
   - Use Spectacles Interaction Kit (SIK) and Spectacles UI Kit for spatial UI and interaction.
   - Use Spectacles LEAF (`Leaf.lspkg`) for automated integration testing in Preview.
3. **Rigorous Evidence Delineation:**
   All execution reporting must separate evidence into independent categories:
   - Skill registered vs. Skill loaded vs. Skill workflow actually followed.
   - Subagent registered vs. Subagent actually invoked.
   - MCP tool registered vs. MCP operation actually performed.
   - LEAF scenario authored vs. LEAF scenario actually executed.
4. **Zero Unverified Claims:**
   Never claim physical hardware verification without testing on physical glasses. Lens Studio Preview is the sole verified runtime environment.

---

## 8. Hardware & Simulation Constraints Ledger

| Boundary / System | Verified Reality | Constraint & Limitation |
| :--- | :--- | :--- |
| **Physical Glasses** | No physical Spectacles hardware available | All verification is conducted exclusively within the Lens Studio Preview Panel on macOS. Thermal dissipation, battery drain, and optical waveguide real-world sunlight contrast remain unverified. |
| **Host Architecture**| Intel Mac (macOS Ventura 13.7.8, Core i7-7820HQ) | Lens Studio version is capped at v5.24.1 / v5.25. Versions 5.26+ are unsupported on this host. |
| **Perception Simulation** | 3D stand-in proxies & keyboard triggers | Device recognition and surface alignment are simulated in Preview via proxies (`RecogStandinBox`, key 'F'). No real CV models or optical sensor tracking are active. |
| **Safety Enforcement**| Display-only warning banners & acknowledgments | Safety alerts are rendered prominently and require user interaction, but physical hardware power shutoff or electrical isolation cannot be sensor-verified. |
| **Instructional Scope** | Pre-authored JSON fixtures only | Bounded strictly to non-energized training wire (20–24 AWG) and battery-powered remote (GE 33709/33711). No mains AC, no automotive, no critical repairs. |
| **NASA Citations** | Educational curriculum benchmarks | NASA-STD-8739.4A / NASA-STD-8739.3 references are craftsmanship benchmarks for wire joining; no NASA certification, approval, or flight compliance is claimed. |

---

## 9. Recommended Next Action

The authoritative next step is **Milestone 3 (Core Experience Completeness)**.

Milestone 3 must begin with **M3.1 (Repository and Product Baseline Reconciliation)**:
1. Conduct a read-only forensic repository audit comparing documentation, source code, scene hierarchy, and test coverage.
2. Formulate a User Journey Gap Register reconciling prototype HUD code with the production mentor panel architecture.
3. Await explicit Product Owner scope authorization before implementing M3.2.

**STOP CONDITION:** No implementation is authorized or started. Await Product Owner review and sign-off on this locked roadmap baseline.
