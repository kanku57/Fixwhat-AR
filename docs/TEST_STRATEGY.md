# FixWhat? Test Strategy & Verification Protocol

**Platform:** Lens Studio 5.24.1 (SPECS 2024 Target)  
**Execution Environment:** Lens Studio Preview Panel (macOS Intel)  
**Document Status:** `AUTHORITATIVE`

---

## 1. Testing Hierarchy

```text
Level 1: Static Verification (TypeScript Compiler / Typings Audit)
   ↓
Level 2: Lens Studio Preview Interactive Simulation
   ↓
Level 3: LEAF Automated Scenario Execution
   ↓
Level 4: Human Ergonomic & Safety Gate Review
```

---

## 2. Test Level Specifications

### Level 1: Static Type & API Compliance
- **Scope:** Scripts in `Assets/Scripts/`.
- **Tool:** TypeScript compiler / `Support/StudioLib.d.ts` and `Support/editor.d.ts`.
- **Verification:** All components compile with zero type errors; no browser DOM references (`window`, `document`); all components extend `BaseScriptComponent`.

### Level 2: Preview Panel Simulation
- **Scope:** Runtime rendering, UI layout, focal plane, state transitions.
- **Tool:** Lens Studio Preview panel with simulated camera and hand input.
- **Checks:**
  - Text readability against dark and light simulated backgrounds.
  - Step card anchoring at 120 cm without drifting or clipping camera near-plane (near clip is ~10 cm).
  - SIK hand interactor responsiveness (air-pinch triggers step advance).
  - Frame rate maintains ≥ 30 FPS in Studio profiler.

### Level 3: LEAF Automated Scenario Testing
- **Scope:** Headless regression testing of procedure state machines.
- **Tool:** Spectacles LEAF (Lens Event Automation Framework).
- **Checks:**
  - Full automated walkthrough from Step 1 through Step N.
  - Abort / safety gate test (warning barrier prevents advance until acknowledged).
  - State reset on procedure restart.

### Level 4: Human Ergonomic & Safety Review
- **Scope:** Cognitive load, instruction clarity, safety messaging.
- **Evaluator:** Human developer.
- **Criteria:** Instructions unambiguous; safety warnings prominent; zero confusion during repair simulation.

---

## 5. Milestone 3 Verification Protocol & Test Results

### Automated Test Results (Executed 2026-10-29)
- **Data Contract Validator (`scripts/validate_procedure.py`):**
  - Result: `PASS` (Exit code 0).
  - Positive Fixtures: 5/5 valid (GE 33709 Remote, Wire Soldering Splice, EC680, EC685, Maintenance History).
  - Negative Regression Payloads: 14/14 caught and rejected with descriptive schema errors.
- **TypeScript Static Compilation & Type Checks:**
  - **Strict Toolchain Check:** `npx -p typescript tsc <project_scripts> Cache/TypeScript/lib/LensifyTS/Declarations/*.d.ts --noEmit --skipLibCheck --lib es2021 --strict true --ignoreConfig`
    - Result: `PASS` (0 type errors, 0 syntax errors under full `strict: true` settings).
  - **Project tsconfig Check:** `npx -p typescript tsc --project Cache/TypeScript/Src/tsconfig.json --strict false --noEmit`
    - Result: `PASS` (0 errors against native SpecsBaseTemplate compiler configuration).

### Manual Lens Studio Preview Verification Protocol (Human Review Gate)
To verify Milestone 3 in the local Lens Studio 5.24.1 Preview panel:
1. Open project `Fixwhat.esproj` in Lens Studio 5.24.1.
2. In the **Objects** panel, verify `FixWhat_Runtime` is present with `FixWhatBootstrap` script component enabled.
3. Observe the **Preview** panel:
   - On startup, the consolidated spatial instruction panel appears directly in front of the camera at comfortable reading distance (85 cm):
     - **Header Card:** `FIXWHAT? AR • UNIVERSAL REMOTE CONTROL` with prominent step counter `STEP 01 / 09 • PHASE 1: Battery Compartment Inspection & Removal`.
     - **Primary Instruction Card:** Large headline `[ Locate Battery Compartment and Depress Latch ]` followed by complete, word-wrapped instruction text with high-contrast obsidian backing plate.
     - **Safety Notice Card:** Prominent amber warning card with explicit textual badge `⚠️ [CAUTION WARNING]` and safety instruction.
     - **Safety Semantics & Dynamic Balancing:** On unhazardous steps (such as Step 1 and Step 5), confirm that NO false `[SAFE OPERATION]` green card is rendered; the safety region is cleanly disabled, and Header, Instruction, and Footer reposition dynamically into a tight 19 cm panel ($y = +7.5$, $+0.5$, $-6.5$ cm) without empty holes. On hazardous steps (e.g. Workshop Step 0 DANGER or Step 2 CAUTION), verify the HUD smoothly expands to 27 cm with the prominent red/amber safety card active.
     - **Supporting Footer Card:** `🔧 Tools: GE 33709 Remote Unit`, complete unwrapped source citation `📖 Source: 1. Battery Installation (p.2) — "..."`, and clean navigation hints `◄ PREVIOUS STEP   │   NEXT STEP ►` (raw `Key 9: Test` removed from user text).
   - Verify all cards form a cohesive, high-contrast industrial group (96% dark obsidian fill, crisp 0.6 corner radius, dark text outline) without room background bleed-through.
4. **Step Forward:** Click the right half of the Preview window (or press `Right Arrow` / `Space`). Verify HUD advances to Step 2 ("Inspect Polarity Markings").
5. **Step Backward:** Click the left half of the Preview window (or press `Left Arrow`). Verify HUD returns to Step 1.
6. **Walkthrough to Completion:** Click right repeatedly through all 9 steps. After Step 9, verify the `✅ Procedure Complete` screen renders with the final condition and safety sign-off.
7. **Switch Procedure:** Click top-center of the Preview window (or press `Key 2`, or double-tap). Verify HUD loads Workshop MVP: `Low-Voltage Stranded Copper Wire Splicing (20–24 AWG)` (11 steps). Walk through steps to verify NASA-STD-8739.4 safety barriers and citations render.
8. **Test Adversarial Error Rejection:** Press `Key 9` (or click bottom-center of Preview window). Verify HUD immediately halts execution and renders the controlled `⛔ [FIXWHAT DATA CONTRACT REJECTION]` error overlay listing the specific schema violations caught.
9. **Error Dismissal:** Click top-center (or press `Key 1`). Verify system returns to normal valid procedure state.
