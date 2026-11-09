---
status: approved
---

# Design brief: FixWhat? AR

## Product Identity & Core Mission
**FixWhat? AR** is a spatial task guidance, practical learning and verification platform that recognises the user's environment, guides real-world tasks, observes actions, evaluates available evidence and helps users reach verified outcomes.

The platform embodies a 6-stage core intelligence progression:
$$\text{Perception} \longrightarrow \text{Procedure Intelligence} \longrightarrow \text{Contextual Guidance} \longrightarrow \text{Action Observation} \longrightarrow \text{Evidence Verification} \longrightarrow \text{Learning \& Competency}$$

FixWhat? AR spans three primary experience domains:
1. **Consumer Remote Experience (Core MVP):** Household device maintenance, safe battery orientation, and direct TV pairing for universal remote controls (GE/Jasco 33709/33711).
2. **Workshop Practical Learning (Core MVP):** Technical craftsmanship training for low-voltage stranded wire joining and lead-free soldering (20–24 AWG, NASA/Weller standards).
3. **Professional Field-Service Mode (Future Expansion — M10):** Enterprise maintenance, work order integration, equipment service histories, and supervisory sign-offs (strictly deferred post-competition).

---

## The one spatial moment
The learner stands at a well-lit workbench holding two disconnected, non-energized wires. Looking down naturally at the wire ends, spatial guidance highlights the joining area while a compact, world-anchored mentor panel sits comfortably in view below the physical work area, offering immediate explanations, clear progression, contextual manual citations/diagrams, and persistent safety reminders without getting in the way of their hands.

## Why it belongs on glasses
- **Uses:** Draws in the world / leaves your body free.
- **Why it's better than the phone or laptop version:** The learner's hands remain completely free to hold tools, wires, or the remote. They do not need to balance a phone on a crowded workbench or look away to scroll a flat manual; spatial guidance sits where the work is happening, while the mentor panel and manual reference viewer remain stable, legible, and world-anchored in room space.

## Product or overlay
- **Type:** Overlay: it responds to something real.
- **Intended future recognition targets (subject to technical validation):** In a future physical release, target recognition capabilities would encompass physical 20–24 AWG stranded copper wire ends, soldering iron tip/stand position, or GE/Jasco 33709/33711 universal remote controls (button keypad and battery compartment). These represent intended future engineering targets subject to technical validation, not established capabilities.
- **Stand-in for the preview:** The Preview build remains explicitly simulated. A two-stage starter experience: A welcome screen asks "What would you like to learn today?" with two large choices (Universal Remote vs. Wire Joining Workshop). Selecting a track opens a simulated recognition scene with a "Place Workbench / Find Object" action that simulates detection, displays "Workbench ready — simulated recognition" (or "Remote identified"), and unlocks the guided mentor experience. A "Back" action allows returning to task selection.

## Where things live
- **Where the user is looking during the main task:** Downward naturally toward the workbench, hands, and the object of interest.
- **Work area proxy:** Sits directly in front of the learner at a comfortable arm's length (approximately 50–70 cm away).
- **Mentor panel:** Sits slightly farther back or visually below the physical work area, world-anchored in the room so the learner can lean in, step back, or look around without it drifting. (Panel dimensions and exact vertical offset are tentative parameters refined during Preview comfort checks).
- **Manual Source Viewer (Contextual Reference Panel):** A dedicated secondary world-anchored panel positioned adjacent to the mentor panel that displays high-contrast preprocessed manufacturer manual pages (initial proposed target resolution: $1200 \times 800$, subject to Gate 4 validation), schematics, and pinout diagrams on demand.
- **Directional indicator:** A small, restrained directional arrow sits at the edge of the field of view when the mentor panel is outside the learner's view, disappearing as soon as they look back.

## Hands and input
- **Main navigation:** Large, predictable SIK pinch buttons along the bottom of the mentor panel:
  - **Previous:** Revisit earlier instruction.
  - **Next:** Proceed when current step is complete.
  - **Why?:** Expand concise explanation of why the step matters and the underlying technique.
  - **Pause / Resume:** Temporarily pause without losing place.
  - **Overview:** View full stage sequence and progress.
  - **Source / Manual:** Toggle contextual manual page excerpts and original schematics.
- **Safety checkpoints:** Explicit blocking gates. The "Next" action remains locked until the learner pinches a dedicated "I Confirm" button before hazardous actions. Acknowledgment is an explicit learner declaration, not a sensor measurement or physical proof of safety.
- **Panel recovery:** A deliberate "Bring Mentor Back" button. When selected, the panel smoothly repositions at a comfortable distance in front of the learner's current gaze at natural eye height, then locks in world space.
- **Targets are big and highlight when aimed at.**
- **Voice:** Planned for future perception milestones (M6 via Spectacles ASR module); all actions in this build are accessible via mouse pinch in Preview.

## When things show
- **Welcome screen:** Shows on launch; hides when track is chosen.
- **Stand-in recognition card:** Shows after track choice; hides when "Place Workbench / Find Object" is pinched.
- **Mentor panel:** Shows during procedure; stays world-anchored in room.
- **"Why?" explanation:** Shows when "Why?" is pinched; stays open until explicitly closed or automatically collapses upon advancing to the next step.
- **Manual Source Viewer:** Shows on-demand or when a step provides a direct manufacturer manual citation; docks cleanly beside the mentor panel.
- **Directional arrow:** Shows only when the mentor panel is outside the field of view; hides when the user faces the panel.
- **Completion screen:** Shows when all procedure steps are completed.

---

## Manual Intelligence System (Preferred Architecture: Route D)
To bridge physical tasks with authoritative technical documentation, FixWhat? AR incorporates a dedicated Manual Intelligence architecture approved at the architectural-direction level under **Route D (Cloud Document Ingestion and Preprocessed Delivery)**:

1. **Three-Tier Separation of Responsibilities:**
   - **Tier 1 — Companion Upload (Web/Mobile):** Users and educators upload manufacturer PDF manuals, manage document libraries, and associate manuals with specific hardware models (e.g. GE 33709 Rev CL5). Off-glasses execution eliminates the need for non-existent wearable file pickers.
   - **Tier 2 — Cloud Ingestion & Preprocessing:** Cloud services validate files, execute OCR text extraction on scanned pages, extract document structure (headings, steps, tables, warnings) into schema-conforming JSON, and rasterize high-contrast, readable page image textures (initial proposed target resolution: $1200 \times 800$ PNG/JPG, subject to Gate 4 validation).
   - **Tier 3 — Spectacles AR Delivery:** The Lens queries lightweight metadata and structured text snippets via `InternetModule.fetch()`, streams pre-rendered page textures on-demand via `RemoteMediaModule.loadResourceAsImageTexture()`, and manages active texture memory through an LRU cache (initial proposed cache size: 2–3 active pages maximum, subject to Gate 6 profiling).
2. **Contextual Source Citations:** Guided procedure steps link directly to exact manual pages, diagrams, and section headings in the Source Viewer.
3. **Manual-Grounded Q&A:** Learner questions are answered strictly from preprocessed manual text with explicit page citations, preventing generative hallucinations.
4. **Safety Boundary:** Manual-derived content is strictly advisory and reference-only; it must **never** automatically become an executable procedure or safety gate without human validation against `scripts/validate_procedure.py`.
5. **Interim Evaluation Option (Alternative 3):** For the initial Preview MVP, pre-bundled static reference page textures are retained as an interim evaluation option for supported devices, without replacing Route D.

---

## Safety requirements by track

### 1. Workshop Learning Track (Soldering Fundamentals)
- Distinct levels of authority and reference scope:
  - **Level 1 — Manufacturer Equipment Safety (Weller T0055745804 Rev 08.2023):** Equipment operating safety rules governing the soldering station: mandatory verification of non-energized circuits (*"Never work on voltage-carrying parts"*, p. 14), requirement to wear appropriate eye protection (*"Protect your eyes by wearing eye protection"*, p. 14), tool rest protocol (*"Always place the soldering tool in the safety rest while not in use"*, p. 14), and undisturbed cooling in safety rest prior to storage (p. 16).
  - **Level 2 — Technical Reference Baselines & Approved Procedure Parameters:** Technical specifications cited specifically for the 20–24 AWG stranded copper wire exercise in the approved procedure (`data/procedures/wire_soldering_splice.json`):
    - *Splice geometry:* 3 tight helical wraps for Western Union mechanical splice (NASA-STD-8739.4A §19.7.1).
    - *Workmanship inspection:* Smooth, concave solder wetting fillet criteria (NASA-STD-8739.3 §13.6).
    - *Heat-shrink insulation overlap:* The 6.35 mm (0.25 in) overlap guideline is explicitly attributed to Step 9 of the approved wire-joining procedure (`data/procedures/wire_soldering_splice.json`), which establishes this dimensional benchmark to operationalize the NASA-STD-8739.4A §19.2.6 requirement that insulation tubing extend at least two times (2X) the largest wire diameter over the original insulation.
    - *Scope & applicability qualification:* These criteria are technical parameters scoped strictly to this particular 20–24 AWG mock wire procedure. They are NOT presented as universal beginner rules, nor do they constitute or imply NASA certification, approval, or flight hardware compliance.
    - *Environmental guideline:* Adequate ventilation to control rosin flux vapors is referenced from general safety guidance (Weller p. 14; NASA-STD-8739.3 §4.2), without prescribing a specific mechanical arrangement.
  - **Level 3 — Project Interaction & Presentation Decisions:** Interaction and layout choices adopted for FixWhat? AR in Preview: the two-stage onboarding flow, SIK pinch controls, world-anchored panel placement, directional edge indicator, "Bring Mentor Back" recovery action, simulated recognition stand-in, and expandable "Why?" pedagogical explanations.
  - *Verification note:* Document editions, section headings, and page citations are recorded as inspected by Antigravity from repository fixtures, not independently verified by the user/product owner.
- Pre-work checkpoint: Learner must explicitly confirm that wires are completely disconnected and non-energized before commencing stripping, tinning, or joining (Weller p. 14; NASA-STD-8739.4A §4.1).
- Personal and environmental safety:
  - Eye protection: Mandatory instruction to wear appropriate eye protection (Weller p. 14).
  - Ventilation: Ensure adequate ventilation to avoid inhaling thermal rosin flux vapors (Weller p. 14; NASA-STD-8739.3 §4.2).
- Tool handling: The soldering iron must always remain seated in its rated safety rest (PH 70) when not in active use, and must remain in the safety rest to cool completely to room temperature before packing away (Weller pp. 14, 16).
- Warning behavior: Before acknowledgment, a prominent warning blocks progression; after the learner selects "I Confirm", it collapses into a compact persistent reminder ("Heat safety — remain aware") in the mentor panel.
- Strict boundary: Unsupported details must not become authoritative instructions. No sensor measurement of temperature or electrical current is claimed or implied.

### 2. Consumer Remote Track (GE/Jasco 33709 / 33711)
- Traceable source document & verification scope:
  - *GE 4-Device Universal Remote Instruction Manual & Code List (Models 33709 & 33711)*, Jasco Products Company LLC, Document Code `33709_33711_Manual_Rev_11-19`. (Recorded as inspected by Antigravity from repository fixtures, not independently verified by the user/product owner).
- Distinct levels of authority:
  - **Level 1 — Manufacturer Manual Requirements (Jasco Manual §1):**
    - Battery compartment & latch handling (p. 2, Fig. 1): Pull down on textured indent to slide cover downward, push upward to lock; avoid prying or forcing latch mechanisms.
    - Battery precautions & cell chemistry (p. 2, Fig. 2): Explicitly forbids mixing old and new batteries, and forbids mixing alkaline, standard (carbon-zinc), or rechargeable batteries.
    - Polarity alignment (p. 2, Fig. 2): Match positive (+) and negative (-) terminals of two fresh AAA batteries with corresponding compartment markings (Slot A negative on spring, Slot B reverse-parallel).
  - **Level 2 — General Maintenance Practice (Non-Manual Precaution):**
    - Visually inspecting compartment terminals for clean contacts prior to battery insertion is recommended as a standard workshop good practice; it is not an explicit instruction from the Jasco manual.
  - **Level 3 — Project Interaction Decisions:**
    - Simulated remote identification, model selection, step navigation, and code entry walk-through in Preview.
- Strict boundary: Unsupported details must not become authoritative instructions. Remote instructions do not display soldering or high-heat warnings, and no claim of automated wireless pairing or live RF detection is made.

### 3. Professional Field-Service Track (Future Expansion Only — M10)
- **Scope Notice:** This domain is classified strictly as **Future Expansion Only** and is **NOT authorized for implementation** in the current build.
- **Concept:** Enterprise maintenance, work order integration, equipment service histories, visual defect recognition, and supervisor digital sign-offs.


---

## Done criteria
Each one can be checked in Lens Studio's preview using keyboard movement and mouse clicks.
1. Complete the two-stage onboarding: Tester launches Lens, selects Wire Joining Workshop from the welcome screen, clicks "Place Workbench / Find Object", sees the workbench and "Workbench ready — simulated recognition" notification, and can use "Back" to return to task selection.
2. Navigate a complete workshop lesson: Tester uses Previous, Next, Why?, Pause/Resume, and Overview to advance through the soldering exercise stages, expand explanations, pause without losing their place, and reach a lesson completion screen.
3. Verify that safety checkpoints block progression: Tester encounters a safety gate (confirming wires are non-energized), attempts to click Next and verifies progression is blocked, clicks "I Confirm", verifies Next unlocks, and observes the warning collapse into a docked reminder.
4. Test spatial stability and panel recovery: Tester moves around the room using WASD/mouse look to verify the panel remains world-anchored; looks away and verifies the subtle directional arrow appears; activates "Bring Mentor Back" and verifies the panel repositions in front of gaze and re-anchors.
5. Complete the Universal Remote experience: Tester selects Universal Remote, activates simulated identification, steps through GE/Jasco remote controls, battery placement and polarity, and model setup, with pre-authored manual citations, reaching completion without false claims of live device pairing.

## Out of scope
- Native PDF parsing, file managers, or on-device OCR on Spectacles hardware (Route D utilizes cloud preprocessing).
- Live computer vision or webcam object recognition of physical remotes or wires (deferred to M6/M7).
- Automated sensor detection of electrical current, wire temperature, or solder joint quality.
- Runtime-generated or LLM-hallucinated repair steps (all procedures are pre-authored from source manuals).
- Mains electricity (110V/220V), household plumbing, automotive systems, or structural repairs.
- Two-hand custom gestures or live camera streaming across network.
- Validation on physical Spectacles (2024) hardware (development and testing are strictly Preview simulation).

## Risks and open questions
- Real glasses vs. Preview: True long-term ergonomic comfort of the downward gaze angle and hand-tracking precision during delicate wire holding can only be validated on physical Spectacles hardware.
- Recognition stand-in clarity: The UI must maintain unambiguous visual distinction so a user never confuses the simulated object placement with automated vision.
- Panel dimensions: Sizing parameters remain provisional until tested for legibility and field-of-view comfort in Preview.
- Manual Intelligence Validation Gates: The 13 open technical feasibility items (authentication, `InternetModule.fetch` limits, `RemoteMediaModule` texture streaming, memory pressure, offline caching) must be empirically proven in standalone prototypes prior to M9 implementation.

## Build notes for CLAD
- Build for SPECS so it runs and can be demonstrated in Lens Studio's preview. No SPECS device is available.
- Use Spectacles Interaction Kit (SIK) and UI Kit for all interactions, so they work with the mouse in Interactive Preview and with LEAF.
- Build any stand-in exactly as described above, and keep it obvious in the scene.
- Use real-world scale in centimeters. Keep content inside the user's view during the main task.
- The display is additive: black renders as transparent. Don't rely on black or very dark content to be seen; keep text light and readable from where the user stands.
- Get the basic flow working first, then add detail.
- Write LEAF scenarios for each done criterion, run them in preview, and report which pass. Say which criteria have no test.
- Don't record, identify, or follow people.

## After the build: judge it
This part is for you, after CLAD finishes.

1. **Does it work?** Ask your agent which LEAF tests passed and which done criteria have no test.
2. **Walk around it.** Open the preview in Interactive Preview. Use WASD to move, Q and E to go down and up, and right-drag (or hold Shift) to look around. Clicking acts as a pinch. Stand where a user would and look at the task.
3. **Ask these four questions.**
   - Does it use what I'm looking at?
   - Does it put something in my space, where it belongs?
   - Does it free my hands or let me keep my eyes up?
   - Would it be just as good on a phone? If so, what would make it need the glasses?
4. **Check comfort.**
   - Everything I need is in view while I do the task. Nothing sits at the edges, behind me, or stuck to my face.
   - Every control is within reach of someone standing there.
   - Text reads easily from where I stand. No dark UI disappearing.
   - Things show when needed and get out of the way.
5. **Label what you know.** Write "logic proven" next to anything the tests and preview show working, and "feel unproven" next to anything only real glasses could tell you (comfort over time, real hand tracking, real recognition).
6. **Fix with design notes, not code.** Tell your agent what to change in design terms, for example: "Move the step card 15 cm lower and next to the pan. Make the Next button twice as big. Re-run the tests." If a fix takes under a minute, like nudging a panel, do it yourself in the scene.
7. **Submit.** Record a video under 3 minutes of your Lens in the preview, public on YouTube. Make your repo public with your Lens Studio project and this `devpost/` folder. Details are on the hackathon site: https://learn-specs.devpost.com/resources
