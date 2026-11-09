# FixWhat? Known Limitations & Constraint Ledger

**Document Status:** `LIVING LEDGER`  
**Rule:** Every unverified feature, simulated API, physical constraint, or environment boundary must be recorded here.  
**Last Reconciled:** 2026-11-04 (Master Roadmap Formalisation)

---

## 1. Hardware & Physical Verification Boundaries
- **No Physical Spectacles 2024 Hardware:** Development, interaction testing, and demonstrations are conducted exclusively within the **Lens Studio Preview Panel** on macOS. Physical Qualcomm Snapdragon / Adreno GPU thermal dissipation, battery discharge curves, optical waveguide ambient sunlight contrast, and real-world optical transparency have not been tested on hardware.
- **Host Architecture Constraints:** Development is on an Intel Mac (macOS Ventura 13.7.8, Core i7-7820HQ, 16 GB RAM). Lens Studio version is capped at v5.24.1 / v5.25. Versions 5.26+ are unsupported on this machine.
- **Waveguide Optical Display Bounds:** Text typography and world-space positions (at $z = -80\text{ cm}$ to $-120\text{ cm}$) are calculated within the estimated $26.3^\circ$ diagonal display envelope, but optical legibility under varying ambient lux levels (e.g. bright outdoor sunlight) has not been field tested.

---

## 2. Input & Sensor Simulation Limitations
- **Hand Tracking Emulation:** Hand interactions in the Preview panel are simulated via mouse clicks, SIK interactors, and hotkeys. Physical hand occlusion, greasy/dirty finger tracking degradation, and physical hand-jitter under low-light conditions are unmodeled.
- **Microphone / Voice ASR:** Spectacles speech recognition via `AsrModule` is not implemented in MVP due to cloud permission dependencies and offline constraints. Navigation relies exclusively on SIK gestures, touch, and keyboard simulation.
- **Simulated Computer Vision & Perception:** Object recognition (GE 33709 / 33711) and workshop workbench surface alignment are simulated in Preview via 3D stand-in proxy geometries (`RecogStandinBox`) and manual keyboard triggers ('1', '2', 'F'). No live camera computer vision models or spatial SLAM surface anchors are executing on physical glasses in the MVP.

---

## 3. Document Ingestion & Content Boundaries
- **No Dynamic Cloud OCR or PDF Ingestion:** Arbitrary PDF parsing directly on the device is excluded from MVP. The application operates strictly with pre-authored, schema-validated offline JSON procedure contracts (`ManualSchema.json`).
- **Instructional Scope Bounding:** Guidance is bounded strictly to non-energized training wire joining (20–24 AWG stranded copper) and battery-powered universal remote setup (GE 33709/33711). No mains AC, no automotive, and no critical industrial repairs are supported.
- **Educational Craftsmanship Benchmark:** NASA standards (NASA-STD-8739.4A / NASA-STD-8739.3) and Weller guidelines serve strictly as educational craftsmanship benchmarks for beginner practice; they do not represent NASA certification, approval, or flight-hardware compliance.

---

## 4. Toolchain, MCP & Agent Integration Status
- **CLAD Toolkit Availability:** The Snap CLAD extension (`ls-clad`) is installed in the agent customization plugin directory (`~/.gemini/config/plugins/ls-clad/`) with 55 standard skills and specialized subagents.
- **Lens Studio MCP Bridging:** Lens Studio MCP server (`localhost:50040`) is verified active and accessible to Antigravity via registered tool wrappers and `call_mcp_tool`.
- **Git Commit Author Metadata:** The initial baseline commit (`8fa1d63`) contains a local machine `.local` hostname in the author/committer field. A dedicated privacy decision and author configuration gate is required before creating any public remote or pushing code.

---

## 5. Milestone 3 (Core Experience Completeness) Simulation Boundaries
- **Preview Input Channels:** M3 implements Preview-verified interaction channels: screen region clicks (`TouchStartEvent` / `TapEvent`), SIK button triggers, and keyboard shortcuts (`KeyPressEvent` arrows for navigation, '1'/'2' for procedure select, 'M' for menu, 'P' for pause, 'F' for simulated recognition/placement). Full physical Spectacles palm pinch gestures are simulated in desktop Preview.
- **Controlled Error Display:** Adversarial malformed test fixtures are isolated within the test path and never exposed in `listProcedures()`. Triggering an invalid contract displays the controlled `[FIXWHAT DATA CONTRACT REJECTION]` error overlay.
- **Zero Implementation Authorization:** The formalization of the Phase 0–11 Master Roadmap is a planning milestone only; zero implementation of M3 features has commenced.
