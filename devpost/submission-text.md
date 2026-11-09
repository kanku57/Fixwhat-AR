# FixWhat? AR — Devpost Submission Package
**Target Competition:** Learn AR with Spectacles 2026 (Devpost)  
**Public Repository:** https://github.com/kanku57/Fixwhat-AR  
**Platform:** Snap Spectacles (2024) / SPECS 27 / Lens Studio 5.24.1  

---

## 1. Project Title & Tagline

- **Project Title:** FixWhat? AR — Context-Grounded Spatial Repair Assistant
- **Elevator Pitch (Under 200 characters):**  
  Hands-free spatial repair assistant for Spectacles that transforms flat manuals into interactive 3D guidance, enforced safety gates, and pedagogical explanations.

---

## 2. Devpost Submission Text (Full Description)

### 💡 Inspiration: The Friction of Flat Manuals
Anyone who has repaired an appliance, assembled hardware, or soldered a wire knows the struggle: oily or busy hands, juggling a smartphone, balancing a laptop on a cluttered bench, or squinting at tiny font diagrams in a paper booklet. 

Constantly breaking focus and shifting gaze between a 2D document and a 3D physical workpiece creates cognitive friction, leads to overlooked safety warnings, and results in abandoned repairs. We asked: *What if the manual lived in the room with you, floating right beside your tools, keeping your hands completely free?*

### 👓 Why It Belongs on Spectacles (Hands-Free Spatial Context)
Physical maintenance and technical craftsmanship are inherently two-handed, physical activities. Spectacles allow technical schematics, warnings, and step-by-step instructions to exist in the user's natural workspace.

FixWhat? AR is engineered specifically for the Spectacles optical display:
- **Optical Ergonomics:** Built for additive waveguide optics using luminous white (`#FFFFFF`) typography and high-contrast vector diagrams over deep navy backing plates (`#0A1128`), avoiding optical wash-out.
- **Natural Spatial Depth:** Anchored at a comfortable 120–150 cm focal distance within a 26° central visual cone, preventing neck strain and vergence-accommodation conflict.

### 🛠️ What FixWhat? AR Does: The Luminous Spatial HUD
FixWhat? AR provides an ergonomic, 3-column spatial dashboard:
1. **Column 1 (Step Guidance):** Clear sequential instructions, tool requirements, duration estimates, and source citations.
2. **Column 2 (High-Contrast Diagrams):** 20 custom unlit technical diagrams with an on-demand zoom inspection modal.
3. **Column 3 (Predictable SIK Controls):** Large pinch buttons (`Next`, `Back`, `Why?`, `Overview`, `Pause`) designed for effortless interaction.
4. **Pedagogical Scaffolding ("Why?" Drawer):** Every step includes an expandable drawer explaining *why* a step is executed (e.g. why thermal bridging works, why mixing battery chemistries causes chemical leakage).

### 🚀 Two Implemented Learning Journeys

#### Track 1: Household Maintenance — GE 33709 Universal Remote (9 Steps)
Practical consumer problem solving. Guides learners through safe battery cover latch handling, reverse-parallel AAA polarity alignment, and a 9-step direct television code entry sequence.
*(Capability Honesty: The app guides code entry; television power response is confirmed by the learner without IR hardware telemetry. Selecting unsupported variants like the GE 33711 displays an educational warning modal).*

#### Track 2: Workshop Craftsmanship — Wire Splicing & Soldering (11 Steps)
Technical craftsmanship training for low-voltage stranded copper wire (20–24 AWG). Guides learners through wire stripping, forming the 3-turn Western Union mechanical splice, thermal transfer tinning, and heat-shrink insulation. Benchmarked against educational NASA-STD-8739.4A workmanship standards and Weller operating guidelines.

### 🛡️ Non-Bypassable Safety Barriers (The Step 00 Gate)
Traditional manuals hide critical warnings in footnotes. FixWhat? AR introduces non-bypassable spatial safety gates:
- Before high-risk actions (350°C soldering iron, chemical handling), the interface locks into a high-visibility modal.
- Progression remains locked until the learner reviews hazards and pinches **"I Confirm"**, after which the warning collapses into a persistent reminder.

### 🔬 Engineering Rigor & Multi-Tier Verification
FixWhat? AR was engineered with production-grade discipline:
- **Strict TypeScript (ES2021):** Zero compile errors against Lens Studio's `StudioLib.d.ts` and `editor.d.ts`.
- **Offline Schema Testing:** An automated Python test suite (`scripts/validate_procedure.py`) enforces strict schema conformity across 19 positive and negative test fixtures.
- **In-Engine Regression (LEAF):** 8 automated LEAF test scenarios executing in Lens Studio Preview verifying navigation, recovery, safety gates, and scope guards.
- **Fresh-Clone Tested:** 100% reproducible from GitHub without hidden local dependencies.

### 🔮 Capability Honesty & Future Vision
- **Development Environment:** All verification and interaction testing were conducted in the **Lens Studio Interactive Preview simulation** on macOS. (Physical Spectacles hardware was not available during development).
- **Object Recognition:** Target alignment is simulated via high-fidelity spatial proxy graphics ("Place Workbench / Find Object").
- **The Future:** The modular architecture is designed to scale. Future milestones will introduce live SnapML object classification (FW-03), on-device OCR model plate recognition (FW-04), and Route D cloud manual synchronization (FW-05).

---

## 3. Video Demonstration Recording Script (2 Minutes)

| Timecode | Visual (Preview Panel) | Voiceover / Narration Script |
| :---: | :--- | :--- |
| **0:00 – 0:20** | Split screen / Title card: Cluttered workbench, flat paper manual vs. FixWhat? AR HUD. | *"Fixing an appliance or soldering a wire should never require balancing a phone or squinting at a paper manual with busy hands. Welcome to FixWhat? AR — a hands-free spatial repair assistant built for Snap Spectacles."* |
| **0:20 – 0:40** | Preview panel: Launching Lens, progress bar fills to 100%, user pinches "GET STARTED" to enter Welcome Gateway. | *"Launching the Lens, an ergonomic glass HUD greets the learner, presenting two real-world learning tracks: Consumer Remote Maintenance and the Wire Joining Workshop."* |
| **0:40 – 1:15** | Preview panel: Select Wire Splicing $\rightarrow$ "Place Workbench" $\rightarrow$ Step 00 Safety Barrier modal blocks progression $\rightarrow$ Pinch "I Confirm" $\rightarrow$ Step 2 HUD opens with technical diagram and zoom modal. | *"Entering the Workshop track, FixWhat? AR enforces non-bypassable safety gates. Before working with a 350-degree soldering iron, the interface blocks progression until the learner explicitly confirms safety protocols. Once confirmed, high-contrast vector diagrams and step-by-step instructions guide the 3-turn Western Union splice benchmarked against NASA workmanship standards."* |
| **1:15 – 1:40** | Preview panel: Return to Menu $\rightarrow$ Select GE 33709 Remote $\rightarrow$ Step 1 battery cover $\rightarrow$ Pinch "Why?" drawer expands $\rightarrow$ Click GE 33711 button to show unsupported modal notice. | *"In the Consumer Remote track, learners navigate battery replacement and direct code entry. Every step features an expandable 'Why?' drawer explaining the physics behind the instruction. If an unsupported model like the 33711 is selected, an honest guidance screen redirects the user."* |
| **1:40 – 2:00** | Terminal running `python3 scripts/validate_procedure.py` (19/19 checks pass) $\rightarrow$ LEAF scenario pass banner $\rightarrow$ Closing slide. | *"Under the hood, FixWhat? AR is backed by strict TypeScript and 19 automated schema contract tests. FixWhat? AR: Manual says how. You make it happen."* |
