# FixWhat? Project Constitution & Core Principles

**Product Concept:** FixWhat?  
**Provisional Tagline:** “Manual says how. You make it happen.”  
**Target Platform:** Snap Spectacles (SPECS 2024 / Lens Studio 5.24.1)  
**Hackathon:** Learn AR with SPECS (Devpost)  
**Document Status:** `AUTHORITATIVE` — Binding on all human contributors and AI agents.

---

## 1. Product Mission & Vision

FixWhat? aims to empower people with limited technical experience to successfully and safely repair, maintain, and operate equipment using instructions from their own equipment manuals through a hands-free, glasses-oriented augmented reality interface.

Rather than forcing the user to juggle a smartphone, paper booklet, or laptop while holding tools, FixWhat? projects structured, contextual step cards, safety warnings, and tool prompts into the user's field of view on Spectacles.

---

## 2. Fundamental Architectural Ethics & Safety Mandates

1. **Safety-First Interaction:** Equipment repair involves real-world risks (electrical shock, high pressure, sharp edges, mechanical pinch points, chemical irritants). The system must prioritize safety above convenience.
   - Hazardous steps must display high-visibility warning overlays.
   - Hazardous steps must require explicit user confirmation before revealing procedural actions.
   - Disclaimers must explicitly state that FixWhat? is a guidance aid and not a licensed professional warranty or certification.
2. **User in the Loop:** The system must never automatically assume a physical action succeeded without human verification. The user remains the ultimate physical actor and inspector.
3. **Cognitive Ergonomics for Spectacles:**
   - Minimize visual clutter. Never occlude the center of the user's working field of view with opaque banners.
   - Anchor virtual content at natural reading distances (100 cm – 200 cm).
   - High contrast UI with semi-translucent backdrops for readability against varying real-world lighting environments.

---

## 3. Human Developer Primacy & Agent Governance

1. **Sole Authorizing Authority:** The human developer (USER) possesses exclusive authority over:
   - Product feature scope and concept approval.
   - Architectural boundaries and technology additions.
   - Code and configuration implementation approvals.
   - Git operations (branching, staging, committing, pushing).
   - Publication and external disclosure.
2. **Strict Sequential Lifecycle:** All work must proceed through the sequential discipline:
   ```text
   INSPECT -> AUDIT -> DOCUMENT -> PROPOSE -> AUTHORIZE -> IMPLEMENT -> TEST -> REVIEW -> ACCEPT -> AUTHORIZE COMMIT/PUB -> STOP
   ```
3. **No Silent Assumption:** Agents must never invent decisions, simulate missing tools, or proceed past incomplete gates. When an ambiguity arises, the agent must stop and report it.

---

## 4. Mandatory Credential & Secret Protection Policy

1. **Zero Credential Exposure:**
   - Under no circumstances shall `.env` files, API keys, tokens, passwords, private keys, or private MCP configurations containing credentials be staged, committed, or pushed to any repository.
   - All conversation reports, reviews, and logs must redact tokens and credentials.
2. **Default-Deny Version Control:**
   - Git tracking must be restricted strictly to non-sensitive project files, code, and documentation.
   - Git initialization and commits must follow pre-commit file inspection.

---

## 5. Hardware & Emulation Boundaries

- **No Physical Spectacles Device:** All design, development, and testing occur in **Lens Studio Preview** on macOS.
- **Prohibition on False Claims:** Neither documentation nor code comments shall claim or imply physical-device testing. All verification is evidenced strictly within Lens Studio Preview simulation.
