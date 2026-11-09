# FixWhat? Architectural Decision Log (ADR Register)

**Document Status:** `LIVING LEDGER`  
**All architectural changes require documented evidence and human authorization.**

---

### ADR-001: Adoption of Evidence-First Engineering Governance
- **Date:** 2026-10-28
- **Status:** `ACCEPTED`
- **Context:** Project requires rigorous discipline adapted from mature production standards.
- **Decision:** Mandate the strict sequence: `INSPECT -> AUDIT -> DOCUMENT -> PROPOSE -> AUTHORIZE -> IMPLEMENT -> TEST -> REVIEW -> ACCEPT -> AUTHORIZE COMMIT/PUB -> STOP`.
- **Consequences:** Zero unverified code commits; all claims backed by observable system facts.

---

### ADR-002: Host Environment & Lens Studio v5.24.1 Intel Compatibility Ceiling
- **Date:** 2026-10-28
- **Status:** `ACCEPTED`
- **Context:** Host machine is an Intel Mac (macOS Ventura 13.7.8, Core i7-7820HQ). Snap announced v5.25 as final Intel release.
- **Decision:** Target Lens Studio v5.24.1 (installed: `5.24.1.26100516`). Do not attempt upgrades to v5.26+ on this host.
- **Consequences:** Preserves stability; avoids breaking toolchain compatibility on x86_64 architecture.

---

### ADR-003: Strict Preview-Only Emulation & Absence of Physical Glasses
- **Date:** 2026-10-28
- **Status:** `ACCEPTED`
- **Context:** No physical Spectacles hardware is available to the team.
- **Decision:** All development, interaction testing, and demonstrations will be conducted in Lens Studio Preview.
- **Consequences:** All test protocols must be valid in desktop Preview; zero claims of physical-device validation.

---

### ADR-004: Default-Deny Git & Credential Security Policy
- **Date:** 2026-10-28
- **Status:** `ACCEPTED & IMPLEMENTED` (Milestone 0D verified: root `.gitignore` hardened and baseline commit created with zero excluded files)
- **Context:** Lens Studio auto-generates `.mcp.json` containing authorization bearer tokens, local configuration files, and live instance/lock files.
- **Decision:** Enforce default-deny Git policy in principle. `.mcp.json`, local IDE configs, lock files, and caches must be strictly excluded. Full `.gitignore` rule expansion and verification against the candidate allowlist are deferred to Milestone 0D before repository initialization.
- **Consequences:** Eliminates risk of credential leaks to public repositories; preserves strict verification sequence before any Git initialization.

---

### ADR-005: Antigravity MCP Integration Strategy
- **Date:** 2026-10-28
- **Status:** `NOT VERIFIED` (Investigation complete; live integration and discovery unverified pending Milestone 0D/0E)
- **Context:** Antigravity does not automatically ingest Lens Studio `.mcp.json` (which uses `type: "http"`, `url`). Antigravity requires `mcp_config.json` with `serverUrl` and `headers`.
- **Decision:** Investigate mapping Lens Studio endpoint via Antigravity-compatible schema. Antigravity MCP live integration remains NOT VERIFIED. Maintain Cursor / Claude Code CLI strictly as authorized fallbacks if bridge fails.
- **Consequences:** Verification protocol established in Milestone 0C; live implementation and testing deferred to authorized Milestone 0D/0E.

---

### ADR-006: Prevalidated Procedural JSON Fixtures as MVP Data Contract
- **Date:** 2026-10-28
- **Status:** `PROPOSED (Pending Human Authorization)`
- **Context:** Real-time arbitrary PDF OCR on Spectacles requires external cloud APIs, latency, and complex auth. Ingestion architecture was initially evaluated during Milestones 1 and 2 to establish the most reliable, demonstrable foundation for the hackathon MVP.
- **Milestone 2 Evidence & Verification:**
  1. *Schema Specification:* Defined `data/schemas/ManualSchema.json` under JSON Schema Draft-07, formalizing appliance applicability, source documentation metadata, ordered procedural phases, step citations, safety notices, and dual-mode presentation fields.
  2. *Source Verification:* Authored `data/procedures/delonghi_ec680_descaling.json` grounded strictly in the official *De'Longhi Dedica Instructions for Use* (Doc Ref 5713225811 / 5713239811, Section 13 "Descaling", pp. 14–16).
  3. *Automated Validation:* Implemented `scripts/validate_procedure.py` (dependency-free Python standard library), verifying syntax, structural schema conformity, and semantic domain rules across 10 operational steps, while correctly rejecting 7 corrupted negative test payloads.
- **Evaluation & Trade-Off Analysis:**
  - *Lens Studio Runtime Constraints:* Lens Studio engine lacks native PDF parsing, layout analysis, or local OCR. Dynamic parsing would require heavy external dependencies or cloud roundtrips unsuited for on-device AR.
  - *Preview-Only Development Environment:* Prevalidated local JSON runs with negligible local asset load latency, deterministic offline execution, and zero external network dependencies, verifiable in Lens Studio Preview once runtime components are integrated.
  - *Deterministic Source-Grounded Safety:* Eliminates runtime generative LLM hallucination in safety-critical guidance by relying on pre-authored, schema-validated manufacturer and standard data contracts. Every operational instruction is backed by exact manual page citations, verbatim excerpts, and mandatory safety warnings.
  - *Hackathon Delivery Timeline:* Decouples AR UX/HUD development from complex document-parsing pipelines, ensuring a working vertical slice can be completed and recorded before the hackathon deadline.
  - *Product Distinction & Scope Boundaries:* Bounding the MVP to prevalidated fixtures delivers a functional vertical slice while establishing a clean data contract (`ManualSchema.json`) that can serve as the target schema for future cloud ingestion pipelines.
- **Architectural Recommendation:** Formally accept prevalidated JSON procedure fixtures conforming to `ManualSchema.json` as the authoritative data contract for the FixWhat? hackathon MVP vertical slice. Arbitrary user PDF ingestion is formally classified as a post-hackathon enhancement.
- **Human Approval Status:** `PENDING HUMAN AUTHORIZATION`. Must not be marked `ACCEPTED` without explicit human authorization.

---

### ADR-007: Commit Author Privacy & Future Public Remote Publication Policy
- **Date:** 2026-10-28
- **Status:** `ACCEPTED`
- **Context:** The initial repository baseline commit (`8fa1d63`) was created using the default system identity containing a local machine `.local` hostname.
- **Decision:** Local development proceeds without rewriting or amending existing commit history. Before any public remote is added or repository is pushed to GitHub/Devpost, the developer must explicitly configure public Git credentials (`git config user.name` and `git config user.email`) and make an explicit decision regarding historical author privacy (e.g. author reset on public push).
- **Consequences:** Eliminates risk of leaking local machine hostnames to public repositories while allowing local development to proceed unblocked.


---

### ADR-008: Persistent Maintenance History Architecture & Session-Only Fallback
- **Date:** 2026-10-28
- **Status:** `PROPOSED (Pending Human Review)`
- **Context:** The application requires tracking completed procedures and safety check verifications across sessions. Lens Studio 5.24 type definitions declare `global.persistentStorageSystem` with a `GeneralDataStore`, but runtime cross-session disk persistence has not yet been demonstrated in Preview execution.
- **Decision:** Proposed approach: Implement `PersistenceService.ts` utilizing `global.persistentStorageSystem.store` (`GeneralDataStore.putString`/`getString`) with a formal storage state machine:
  1. `DURABLE_STORAGE_ACTIVE`: Verified reading/writing to host persistent storage.
  2. `SESSION_ONLY_FALLBACK`: If persistent storage is unavailable, throws, or fails in Preview, fallback transparently to an in-memory dictionary.
  The UI must explicitly indicate whether maintenance history is *Durable* or *Session-Only*, ensuring users and testers are never deceived.
- **Consequences:** Eliminates runtime crashes in Preview while establishing a testable path to verify physical persistence in Milestone 3.

---

### ADR-009: Two-Fixture MVP Scope (Consumer Remote & Workshop Wire Splicing)
- **Date:** 2026-10-28
- **Status:** `PROPOSED (Pending Human Review)`
- **Context:** The earlier De'Longhi espresso descaling proposal served as an initial exploratory contract, but has been superseded by a dual-scenario MVP targeting broader consumer and maker educational value.
- **Decision:** Formalize the FixWhat? MVP scope around two verified fixtures:
  1. *Consumer Scenario:* GE 33709 Universal Remote Control (battery door removal, reverse-parallel polarity orientation, direct code entry TV pairing). Supported models restricted strictly to `["33709", "33711"]` based on verified Jasco Products documentation; direct TV code entry directed to the code list booklet or Jasco online database matching the remote's hardware code library version (e.g., CL5); North American retail distribution limitation explicitly documented (simulated via 3D proxy in Lens Studio Preview).
  2. *Workshop Scenario:* Low-Voltage Wire Splicing & Soldering (training-first instruction for joining two disconnected, non-energized 20–24 AWG stranded copper wires). Structured as an 11-step procedure incorporating round-conductor stripping integrity per NASA-STD-8739.4A Change 4 §10.1.1(d),(f) (p. 48), mandatory conductor pre-tinning per §19.7.1(a) prior to 3-turn Western Union splice formation (§19.7.1(b)–(c), p. 82), Weller T0055745804 (Rev 08.2023) thermal transfer and safety-rest practices, concave fillet inspection and natural ambient cooling (NASA-STD-8739.3 Change 3 §13.6.1 & §10.1.4), splice insulation encapsulation extending at least two wire diameters (§19.2.6, using a 6.35 mm / 0.25 in educational workshop guideline for simple measurement), and safe power down allowing full cooldown in its rated safety rest. SAC305 lead-free rosin-core solder is documented as an educational maker training selection to reduce heavy-metal material-contact and ingestion concerns during beginner practice, while emphasizing that thermal flux fumes occur with both leaded and lead-free alloys and require active cross-ventilation and eye protection, explicitly distinguished from historical aerospace flight requirements (Sn60/Pb40). Bounded strictly to non-energized bench practice wire; not certified for mains AC, automotive, or flight hardware.
  The historical De'Longhi fixtures are preserved in `data/procedures/` as regression test assets, but are retired from active MVP delivery.
- **Consequences:** Delivers a compelling comparison between consumer everyday maintenance and technical workshop skills training within a bounded, testable Preview scope with rigorous source grounding and clear simulation boundaries.
---

### ADR-010: Design Governance Establishment & 15-Screen Storyboard Reference Baseline
- **Date:** 2026-10-29
- **Status:** `PROPOSED (Pending Human Review & Authorization)`
- **Context:** The user supplied a 15-screen full-application storyboard establishing the intended visual direction for FixWhat?. To ensure scalable, consistent implementation across milestones without visual regression or scope creep, formal design governance is proposed under DGE-01.
- **Decision:** Proposed approach (Reconciled via DGE-01-CORR-01 & DGE-01-CORR-02):
  1. Formalize `docs/DESIGN_GOVERNANCE.md` (DGE-01) as the proposed Level 3 design contract, remaining non-authoritative until explicitly adopted by the user.
  2. Treat the 15-screen storyboard as an approved visual-direction reference only to the extent explicitly authorized, without granting blanket authority for unbuilt screens or behavioral changes.
  3. Explicitly distinguish warning display from safety-gate enforcement (interactive blocking barrier gates are unbuilt and deferred to Milestone 6).
  4. Formally distinguish implemented Milestone 3 runtime screens (Screens 6, 7, 8 display, 9, 10 logic, 11) from proposed post-M3 screens (Screens 1–5, 10 modal, 12, 13 overlay, 14) and optical reference benchmarks (Screen 15).
  5. Enforce strict change control: autonomous agent actions restricted to authorized milestone tasks; material changes require written proposals and explicit human authorization.
  6. Maintain strict independence between M3 Preview acceptance, DGE-01/ADR-010 adoption, and M4 authorization.
- **Consequences:** Establishes an evidence-backed design benchmark; prevents uncoordinated UI divergence; guarantees safety priority and source citation fidelity.

---

### Governance Decision: Product Experience Baseline Adoption
- **Date:** 2026-10-31
- **Status:** `APPROVED & ADOPTED BY HUMAN DEVELOPER`
- **Context:** Following the completion and forensic review of `PRODUCT-EXPERIENCE-ALIGNMENT-05`, the human developer has explicitly approved the reconciled documentation suite, establishing the master product experience baseline.
- **Decision:**
  1. Formally adopt `docs/PRODUCT_EXPERIENCE_SPECIFICATION.md` (Rev 4.1) as the approved product experience baseline.
  2. Formally adopt `docs/PRODUCT_EXPERIENCE_GAP_AUDIT.md` (Rev 4.1) as the approved product experience gap audit baseline.
  3. The seven-screen product journey, reconciled MVP boundaries (GE 33709 Remote setup and non-energized workshop wire splicing), and exclusion of unsupported appliances (coffee machines, routers, game controllers, and camera scanning as VISUAL REFERENCE ONLY — NOT SELECTABLE — OUT OF MVP SCOPE) become the approved product baseline.
  4. The five spatial architecture alternatives (Head-Locked Compact, World-Locked Peripheral, Table-Anchored, Contextual Paged, Hybrid Gaze) retain their documented status as OPEN (PROPOSED); no spatial architecture is selected or hardware-verified by this adoption.
  5. Source verification requirements remain open wherever primary source inspection or claim verification is pending (GE 33709, Weller, NASA educational benchmark, and Snap hardware specs remain SOURCE VERIFICATION PENDING).
  6. Safety acknowledgement and progression blocking remain verified as NOT IMPLEMENTED in the runtime; pre-authored warnings are display-only.
  7. No feature implementation, runtime code modification, visual asset production, or milestone advancement is authorized by this decision.
  8. DGE-01 and ADR-010 remain PROPOSED — NOT ADOPTED. M3/M3.1 human Preview acceptance remains PENDING. M4 remains NOT AUTHORIZED.
- **Consequences:** Establishes an unambiguous, forensically grounded product experience baseline while maintaining strict boundary separation from runtime implementation and hardware verification.

---

### Governance Decision: FixWhat? AR Design Brief Formal Approval
- **Date:** 2026-10-31
- **Status:** `APPROVED BY PRODUCT OWNER`
- **Context:** Following the completion of the learner-led planning interview under `PLAN-LENS-01` (governed by `.agents/skills/plan-lens/SKILL.md`) and iterative source-integrity review, the product owner has granted explicit approval of `devpost/design-brief.md`.
- **Decision:**
  1. Formally adopt `devpost/design-brief.md` as the approved design brief for the FixWhat? AR Lens build.
  2. The approved scope establishes two distinct experiences: Consumer Remote Assistance (GE/Jasco 33709/33711) and Workshop Learning (20–24 AWG stranded copper wire soldering exercise).
  3. The spatial arrangement specifies a world-anchored mentor panel (at a comfortable distance, ~50–70 cm), edge directional indicator, deliberate "Bring Mentor Back" recovery action, SIK pinch navigation, and explicit blocking safety checkpoint confirmation.
  4. Preview execution remains strictly simulated (two-stage onboarding with stand-in placement; no live computer vision, sensor measurement, or automated pairing claimed).
  5. Safety claims and procedure parameters follow distinct authority tiers (Weller equipment operating safety vs. NASA technical reference baselines for 20–24 AWG mock wire geometry and wetting vs. project interaction choices vs. Jasco manual requirements and general maintenance practice).
  6. Source reference caveat preserved: Document editions, section headings, and page citations are recorded as inspected by Antigravity from repository fixtures, not independently verified by the product owner.
  7. Done criteria define five observable Preview acceptance tests verifiable with keyboard and mouse clicks.
  8. Boundary: Planning approval only. Zero CLAD implementation, runtime code modification, scene mutation, or LEAF test generation is authorized. The next milestone is the separate UI/UX Design Specification.
- **Consequences:** Establishes the authoritative, source-grounded product design brief governing subsequent UI/UX design specification and technical implementation planning.

---

### Governance Decision: UIUX-02 UI/UX Baseline v1.0 Approval & Implementation Authorization
- **Date:** 2026-10-31
- **Status:** `APPROVED BY PRODUCT OWNER — IMPLEMENTATION AUTHORIZED`
- **Context:** Following the final state and traceability correction under UIUX-01, the Product Owner has formally approved `docs/UI_UX_DESIGN_SPECIFICATION.md` as the UI/UX Implementation Baseline v1.0 and authorized commencement of implementation under milestone UIUX-02.
- **Decision:**
  1. Formally approve `docs/UI_UX_DESIGN_SPECIFICATION.md` as the authoritative **UI/UX Implementation Baseline v1.0**.
  2. Approve the seven core UI/UX architecture decisions for implementation v1.0:
     - `DEC-UI-01`: Inline Why? explanation accordion.
     - `DEC-UI-02`: Screen-space peripheral directional chevron indicator.
     - `DEC-UI-03`: Visible paused panel with clear paused-state visual treatment (tunable opacity).
     - `DEC-UI-04`: Text step counter plus phase indicators.
     - `DEC-UI-05`: Defer Mentor Introduction as a separate mandatory screen; integrate concise goal context directly into the mentor experience (strict 2-stage onboarding).
     - `DEC-UI-06`: Consumer Remote contextual, non-blocking caution notices.
     - `DEC-UI-07`: In-place content replacement for Procedure Overview on the world-anchored Mentor Panel.
  3. Authorize implementation under milestone `UIUX-02` in bounded stages (Stage A through Stage E) governed by the Permanent CLAD-First Directive.
  4. Spatial dimensions, angles, opacity values, animation durations, and presentation parameters remain initial implementation targets only (tunable following Preview testing; not certified ergonomic or physical-hardware values).
  5. Boundaries reaffirmed: GE 33709/33711 models only; 20–24 AWG low-voltage non-energized wire joining only; simulated recognition stand-in; pre-authored data fixtures; learner safety acknowledgment is an explicit declaration, not physical/sensor verification; AGENTS.md byte-for-byte preserved.
- **Consequences:** Transitions FixWhat? AR from planning and documentation into active CLAD-orchestrated runtime implementation.

---

### ADR-011: Preferred Architecture for Manual Intelligence System (Route D: Cloud Ingestion & Preprocessed Delivery)
- **Date:** 2026-11-04
- **Status:** `PREFERRED ARCHITECTURE APPROVED — IMPLEMENTATION PENDING TECHNICAL VALIDATION`
- **Context:**
  - The FixWhat? AR product concept envisions learners and technicians consulting authoritative manufacturer documentation, schematics, and service manuals alongside live 3D AR task guidance.
  - A forensic investigation was conducted in `docs/MANUAL_UPLOAD_OCR_FEASIBILITY_REPORT.md` across the authoritative Lens Studio 5.24.1 runtime environment (`Support/StudioLib.d.ts`, 38,986 lines) and official Spectacles (2024) hardware specifications.
  - The investigation established that native on-device document handling on Spectacles is technically impossible: Spectacles OS provides no file picker, no file manager, no native PDF rendering engine, and no on-device optical character recognition (OCR) API. Furthermore, Spectacles hardware operates under strict compute, thermal, and RAM/texture memory constraints that preclude on-device parsing of heavy arbitrary PDF files.
- **Decision:**
  1. **Evaluation of Architectural Routes:** Formally evaluate and record the five investigated routes:
     - *Route A: Device-Local Processing:* Completely on-device upload, parsing, OCR, and rendering on Spectacles. **REJECTED AS TECHNICALLY INFEASIBLE** due to lack of file system APIs, absence of native PDF engines, lack of on-device OCR, and memory limits.
     - *Route B: Hybrid Local/Remote:* Local document storage with selective cloud OCR offloading. **REJECTED** due to excessive local complexity, incomplete local PDF parsing capabilities, and high memory consumption on glasses.
     - *Route C: Live Cloud Proxy:* Streaming raw document requests to an LLM/multimodal API in real time. **REJECTED** due to high recurring latency, unpredictable token costs, bandwidth spikes, and session fragility on wearable connections.
     - *Route D: Cloud Ingestion and Preprocessed Delivery:* Off-glasses companion upload, cloud validation/OCR/rasterization, and structured asset streaming to Spectacles. **APPROVED AS THE PREFERRED LONG-TERM ARCHITECTURE**.
     - *Route E / Alternative 3: Pre-Bundled Reference Assets:* Pre-rendered manual pages bundled into project assets. **RETAINED STRICTLY AS AN INTERIM EVALUATION OPTION** for MVP devices/procedures; NOT a replacement for Route D; NOT automatically authorized for M3 implementation.
  2. **Three-Tier Responsibility Separation for Route D:**
     - **Tier 1 — Companion Web/Mobile Interface:** Responsible for document upload, manual library management, user selection, hardware model/revision association, and multi-tenant document ownership.
     - **Tier 2 — Cloud Ingestion & Processing Backend:** Responsible for document validation, malware scanning, digital text extraction, cloud OCR of scanned pages, document structure extraction (sections, steps, warnings, schematics) into schema-conforming JSON, high-contrast page rasterization (initial proposed target resolution: $1200 \times 800$ PNG/JPG, subject to Gate 4 validation), full-text search indexing, secure cloud storage, and token-based access control.
     - **Tier 3 — Spectacles AR Client:** Responsible for authenticated metadata retrieval via `InternetModule.fetch()`, contextual manual reference display anchored to active procedure steps, high-resolution page texture streaming via `RemoteMediaModule.loadResourceAsImageTexture()`, SIK pinch/poke navigation and diagram zooming, strict texture memory management (initial proposed cache size: bounded LRU cache of 2–3 active textures, subject to Gate 6 profiling), and graceful offline degradation.
  3. **Rejection of Unverified Platform Assumptions:**
     - Spectacles does NOT have native PDF rendering or document decoding.
     - Spectacles does NOT have on-device OCR.
     - Spectacles does NOT have a file manager, file picker, or browser upload dialog.
     - Manual upload MUST occur off-glasses via a companion web or mobile application.
     - In-lens delivery MUST be preprocessed into rasterized page textures (initial proposed target resolution: $1200 \times 800$, subject to Gate 4 validation) and structured JSON.
  4. **Thirteen Open Technical Validation Items (Mandatory Gate Before Implementation):**
     - Implementation of any part of Route D remains frozen pending explicit prototyping and validation of:
       1. Spectacles Authentication & Secure Document Access (token storage and transmission).
       2. `InternetModule.fetch()` Payload & Transfer Limits (throughput, timeout handling).
       3. `RemoteMediaModule.loadResourceAsImageTexture()` Behavior & Limits (dynamic texture instantiation reliability).
       4. Page Image Resolution & Rendering Quality (testing proposed $1200 \times 800$ readability vs. downsampling in Spectacles waveguides).
       5. Multipage Navigation & User Interaction (SIK paging and zoom latency).
       6. Texture Memory & Lifecycle Management (evaluating proposed 2–3 texture LRU disposal to prevent out-of-memory crashes).
       7. Caching & Persistence (`GeneralDataStore` vs. session memory across Lens restarts).
       8. Offline Behavior & Graceful Degradation (handling loss of connectivity mid-procedure).
       9. Backend Ownership & Access Control (multi-tenant security model).
       10. OCR / Processing Provider Selection (evaluating cloud vision/OCR accuracy on technical schematics).
       11. Privacy, Retention, and Deletion Policies (handling sensitive or proprietary enterprise manuals).
       12. Actual Spectacles Hardware Validation (waveguide contrast, thermal throttling during continuous downloads).
       13. Lens Studio Preview Compatibility (confirming Preview simulation parity with hardware network stack).
  5. **Non-Negotiable Safety Mandate:**
     - Manual-derived content is advisory and reference-only.
     - Manual-derived text or diagrams must **NEVER** automatically become an executable procedure or safety gate without human validation against `scripts/validate_procedure.py`.
     - FixWhat? safety rules and verification requirements strictly override unverified manual testing instructions.
  6. **Implementation Status & Scope Boundary:**
     - This ADR represents **planning and architectural-direction approval only**.
     - **Zero implementation is authorized** by this decision.
     - Milestone 3 (Core Experience Completeness) remains the immediate next implementation milestone.
- **Consequences:** Establishes the authoritative architectural blueprint for manual intelligence across FixWhat? AR, preventing architectural divergence, eliminating unverified technical assumptions, and defining clear empirical validation gates before any implementation begins.
