# FIXWHAT? AR — FW-06
## FINAL APPROVED PUBLICATION MANIFEST (PATH-EXACT ALLOWLIST)

**Milestone:** FW-06 (Option B — Clean Initial Public GitHub Publication)  
**Deliverable ID:** DEL-01  
**Technical Lead:** Antigravity (Principal Software Architect)  
**Design Authority:** CLAD (Creative Lens AR Designer)  
**Final Authority:** Product Owner  
**Target Repository:** `https://github.com/kanku57/Fixwhat-AR.git`  
**Date:** 2026-11-09  

---

## 1. Executive Summary & Reconciliation Rationale

Milestone FW-06 resolves the candidate publication inventory discrepancy between the Milestone FW-05C baseline (121 files) and the Milestone FW-05D proposed manifest (135 files).

Following explicit review by CLAD and Antigravity:
1. **Pruning Internal Operational Memos:** The 14 additional files proposed in FW-05D consisted largely of internal agent scratchpads, local Git configuration logs, Option B execution shell runbooks, and temporary sign-off requests. Publishing these internal deliberations dilutes repository clarity.
2. **Exclusion of Corrupted Scene Backup:** The baseline 121 list included `docs/evidence/Scene_pre_fw05a_cleanup.scene` (a 95 KB pre-cleanup backup containing the orphaned `AiPreviewAgent Handler`). This backup binary is strictly excluded from public release to prevent re-introducing deprecated scene objects.
3. **Inclusion of Authoritative Evidence & Governance:** The manifest retains all foundational architectural ledgers, adds the authoritative live runtime certification report (`docs/FW-05E_LIVE_RUNTIME_REVALIDATION_REPORT.md`), `docs/DESIGN_GOVERNANCE.md`, and the authoritative Milestone FW-06 release documents.

The resulting authoritative allowlist contains **exactly 122 verified files**.

---

## 2. Reconciled Comparison Matrix

| Inventory Set | Total Files | Composition Summary | Publication Status |
| :--- | :---: | :--- | :--- |
| **FW-05C Baseline** | 121 | Core Application (103) + Devpost (1) + Foundational Docs & Audits (16) + `Scene_pre_fw05a_cleanup.scene` (1) | **SUPERSEDED** (Contains broken pre-cleanup scene backup) |
| **FW-05D Proposed** | 135 | Baseline (121) + 14 internal operational reports (7 FW-05C + 7 FW-05D) | **REJECTED BY CLAD** (Contains internal agent memos and runbooks) |
| **FW-06 Curated Allowlist** | **122** | Core Application (103) + Devpost (1) + Authoritative Docs (13) + FW-06 Release Reports (5) | **APPROVED BY CLAD & PRODUCT OWNER** |

### Individual Classification of Differences:

| File Path | Set Source | Category | Disposition | Justification |
| :--- | :---: | :--- | :---: | :--- |
| `docs/evidence/Scene_pre_fw05a_cleanup.scene` | 121 Baseline | Temporary Artifact / Backup | **EXCLUDED** | 95 KB backup of broken scene containing `AiPreviewAgent Handler`. Forbidden by publication policy. |
| `docs/FW-05C_GIT_IDENTITY_CONFIGURATION_REPORT.md` | 135 Proposed | Internal Operational Report | **EXCLUDED** | Documents local `git config` shell commands. Not relevant to public users. |
| `docs/FW-05C_EXISTING_HISTORY_PRIVACY_AUDIT.md` | 135 Proposed | Internal Audit Record | **EXCLUDED** | Contains local machine hostname metadata from old local commits. |
| `docs/FW-05C_GITHUB_REMOTE_VERIFICATION.md` | 135 Proposed | Temporary Operational Report | **EXCLUDED** | Ephemeral report verifying virgin status of remote before Option B. |
| `docs/FW-05C_PUBLICATION_HISTORY_STRATEGY.md` | 135 Proposed | Internal Audit Record | **EXCLUDED** | Internal trade-off analysis between Option A and Option B. |
| `docs/FW-05C_FINAL_PUBLICATION_MANIFEST.md` | 135 Proposed | Superseded Manifest | **EXCLUDED** | Superseded by this authoritative FW-06 manifest. |
| `docs/FW-05C_PUBLICATION_SECURITY_REVIEW.md` | 135 Proposed | Internal Audit Record | **EXCLUDED** | Redundant pre-staging checklist. |
| `docs/FW-05C_FINAL_RELEASE_AUTHORIZATION_REQUEST.md`| 135 Proposed | Temporary Operational Memo | **EXCLUDED** | Internal sign-off request to Product Owner. |
| `docs/FW-05D_CLAD_PUBLICATION_REVIEW.md` | 135 Proposed | Internal Audit Record | **EXCLUDED** | Interim design review memo; superseded by final CLAD approval in FW-06. |
| `docs/FW-05D_GIT_IDENTITY_AND_HISTORY_VERIFICATION.md`| 135 Proposed | Internal Operational Report | **EXCLUDED** | Investigated macOS sandbox exit code 255 file lock. |
| `docs/FW-05D_FINAL_MANIFEST_VERIFICATION.md` | 135 Proposed | Superseded Manifest | **EXCLUDED** | Intermediate comparison draft. |
| `docs/FW-05D_PUBLIC_SECURITY_AND_ATTRIBUTION_REVIEW.md`| 135 Proposed | Internal Audit Record | **EXCLUDED** | Consolidated into `docs/FW-06_RELEASE_SECURITY_AND_ATTRIBUTION_REPORT.md`. |
| `docs/FW-05D_OPTION_B_EXECUTION_RUNBOOK.md` | 135 Proposed | Internal Operational Report | **EXCLUDED** | Agent execution shell script runbook. |
| `docs/FW-05D_FINAL_PUBLICATION_AUTHORIZATION_REQUEST.md`| 135 Proposed | Temporary Operational Memo | **EXCLUDED** | Internal authorization request to Product Owner. |
| `docs/FW-05D_PRODUCT_AND_RUNTIME_RELEASE_CLAIMS.md` | 135 Proposed | Essential Product Documentation | **INCLUDED** | Authoritative verification of README claims against runtime source code. |
| `docs/DESIGN_GOVERNANCE.md` | Repository | Essential Product Documentation | **INCLUDED** | Core CLAD design specification for spatial Glass UI and optical ergonomics. |
| `docs/FW-05E_LIVE_RUNTIME_REVALIDATION_REPORT.md` | FW-05E | Public Release Evidence | **INCLUDED** | Certifies 100% pass of live host, native TSC, 6/6 LEAF tests, and 19/19 schema tests. |
| `docs/FW-06_FINAL_APPROVED_PUBLICATION_MANIFEST.md` | FW-06 | Essential Product Documentation | **INCLUDED** | This authoritative manifest. |
| `docs/FW-06_PUBLICATION_EXECUTION_REPORT.md` | FW-06 | Public Release Evidence | **INCLUDED** | Documents the authorized Option B execution, commit, and push. |
| `docs/FW-06_PUBLIC_GITHUB_VERIFICATION.md` | FW-06 | Public Release Evidence | **INCLUDED** | Independent post-push verification of the public GitHub repository. |
| `docs/FW-06_LOCAL_HISTORY_PRESERVATION_REPORT.md` | FW-06 | Essential Product Documentation | **INCLUDED** | Proves the 5-commit local history is preserved in `archive/local-history`. |
| `docs/FW-06_RELEASE_SECURITY_AND_ATTRIBUTION_REPORT.md`| FW-06 | Public Release Evidence | **INCLUDED** | Final zero-secrets certification and complete IP attribution ledger. |

---

## 3. Path-Exact Publication Allowlist (122 Files)

### Category 1: Authoritative Root Configuration & Documentation (5 Files)
1. `.gitattributes` — Git LFS binary rules and line-ending normalization
2. `.gitignore` — Security-hardened exclusion patterns
3. `Fixwhat.esproj` — Lens Studio 5.24.1 project manifest
4. `README.md` — Authoritative project presentation, architecture, and setup instructions
5. `ROADMAP.md` — Living project roadmap and milestone control ledger

### Category 2: Production Scene & Custom Shaders (5 Files)
6. `Assets/Scene.scene` — Authoritative production scene graph (purged of orphaned objects)
7. `Assets/Render/StepVisualMaterial.mat` — Step visual material definition
8. `Assets/Render/StepVisualMaterial.mat.meta` — Material metadata
9. `Assets/Render/unlit.graphShader` — Custom unlit shader with depth-write isolation
10. `Assets/Render/unlit.graphShader.meta` — Shader graph metadata

### Category 3: Application TypeScript Source & Meta Descriptors (40 Files)
11. `Assets/Scripts/FixWhatBootstrap.ts` — Main runtime lifecycle coordinator
12. `Assets/Scripts/FixWhatBootstrap.ts.meta`
13. `Assets/Scripts/UI/GlassDesignTokens.ts` — Authoritative spatial UI design tokens
14. `Assets/Scripts/UI/GlassDesignTokens.ts.meta`
15. `Assets/Scripts/UI/FixWhatHUD.ts` — Spatial HUD container and positioning
16. `Assets/Scripts/UI/FixWhatHUD.ts.meta`
17. `Assets/Scripts/UI/FixWhatInitPanel.ts` — Centered initialization banner
18. `Assets/Scripts/UI/FixWhatInitPanel.ts.meta`
19. `Assets/Scripts/UI/FixWhatWelcomePanel.ts` — Welcome gateway and dual-track selector
20. `Assets/Scripts/UI/FixWhatWelcomePanel.ts.meta`
21. `Assets/Scripts/UI/FixWhatMentorPanel.ts` — Core procedural 3-column guidance panel
22. `Assets/Scripts/UI/FixWhatMentorPanel.ts.meta`
23. `Assets/Scripts/Data/FixWhatProcedureStore.ts` — Procedural state machine and step evaluation
24. `Assets/Scripts/Data/FixWhatProcedureStore.ts.meta`
25. `Assets/Scripts/Data/FixWhatVisualRegistry.ts` — Decoupled visual asset binding registry
26. `Assets/Scripts/Data/FixWhatVisualRegistry.ts.meta`
27. `Assets/Scripts/Data/ProcedureFixtures.ts` — Embedded TypeScript fallback fixtures
28. `Assets/Scripts/Data/ProcedureFixtures.ts.meta`
29. `Assets/Scripts/Types/ProcedureTypes.ts` — Strict TypeScript data contracts
30. `Assets/Scripts/Types/ProcedureTypes.ts.meta`
31. `Assets/Scripts/Tests/LeafIndex.ts` — LEAF scenario index and registration
32. `Assets/Scripts/Tests/LeafIndex.ts.meta`
33. `Assets/Scripts/Tests/LeafTestHelpers.ts` — LEAF test assertion utilities
34. `Assets/Scripts/Tests/LeafTestHelpers.ts.meta`
35. `Assets/Scripts/Tests/FixWhatStartupScenario.ts` — Lifecycle boot and SIK init test
36. `Assets/Scripts/Tests/FixWhatStartupScenario.ts.meta`
37. `Assets/Scripts/Tests/FixWhatGatewayScenario.ts` — Welcome gateway navigation test
38. `Assets/Scripts/Tests/FixWhatGatewayScenario.ts.meta`
39. `Assets/Scripts/Tests/FixWhatCatalogueScenario.ts` — Catalogue selection test
40. `Assets/Scripts/Tests/FixWhatCatalogueScenario.ts.meta`
41. `Assets/Scripts/Tests/FixWhatConsumerScopeScenario.ts` — GE 33709 vs 33711 scope test
42. `Assets/Scripts/Tests/FixWhatConsumerScopeScenario.ts.meta`
43. `Assets/Scripts/Tests/FixWhatRemoteJourneyScenario.ts` — 9-step Consumer Remote journey test
44. `Assets/Scripts/Tests/FixWhatRemoteJourneyScenario.ts.meta`
45. `Assets/Scripts/Tests/FixWhatWorkshopSafetyScenario.ts` — Step 00 blocking safety barrier test
46. `Assets/Scripts/Tests/FixWhatWorkshopSafetyScenario.ts.meta`
47. `Assets/Scripts/Tests/FixWhatWorkshopJourneyScenario.ts` — 11-step Workshop journey test
48. `Assets/Scripts/Tests/FixWhatWorkshopJourneyScenario.ts.meta`
49. `Assets/Scripts/Tests/FixWhatNavigationRecoveryScenario.ts` — Fast forward/backward jump test
50. `Assets/Scripts/Tests/FixWhatNavigationRecoveryScenario.ts.meta`

### Category 4: Production Technical Guidance Illustrations (40 Files)
51. `Assets/Textures/Guidance/AST-REM-01.png` — Remote Step 1 (1200x400 px)
52. `Assets/Textures/Guidance/AST-REM-01.png.meta`
53. `Assets/Textures/Guidance/AST-REM-02.png` — Remote Step 2
54. `Assets/Textures/Guidance/AST-REM-02.png.meta`
55. `Assets/Textures/Guidance/AST-REM-03.png` — Remote Step 3
56. `Assets/Textures/Guidance/AST-REM-03.png.meta`
57. `Assets/Textures/Guidance/AST-REM-04.png` — Remote Step 4
58. `Assets/Textures/Guidance/AST-REM-04.png.meta`
59. `Assets/Textures/Guidance/AST-REM-05.png` — Remote Step 5
60. `Assets/Textures/Guidance/AST-REM-05.png.meta`
61. `Assets/Textures/Guidance/AST-REM-06.png` — Remote Step 6
62. `Assets/Textures/Guidance/AST-REM-06.png.meta`
63. `Assets/Textures/Guidance/AST-REM-07.png` — Remote Step 7
64. `Assets/Textures/Guidance/AST-REM-07.png.meta`
65. `Assets/Textures/Guidance/AST-REM-08.png` — Remote Step 8
66. `Assets/Textures/Guidance/AST-REM-08.png.meta`
67. `Assets/Textures/Guidance/AST-REM-09.png` — Remote Step 9
68. `Assets/Textures/Guidance/AST-REM-09.png.meta`
69. `Assets/Textures/Guidance/AST-WRK-01.png` — Workshop Step 1 (1200x400 px)
70. `Assets/Textures/Guidance/AST-WRK-01.png.meta`
71. `Assets/Textures/Guidance/AST-WRK-02.png` — Workshop Step 2
72. `Assets/Textures/Guidance/AST-WRK-02.png.meta`
73. `Assets/Textures/Guidance/AST-WRK-03.png` — Workshop Step 3
74. `Assets/Textures/Guidance/AST-WRK-03.png.meta`
75. `Assets/Textures/Guidance/AST-WRK-04.png` — Workshop Step 4
76. `Assets/Textures/Guidance/AST-WRK-04.png.meta`
77. `Assets/Textures/Guidance/AST-WRK-05.png` — Workshop Step 5
78. `Assets/Textures/Guidance/AST-WRK-05.png.meta`
79. `Assets/Textures/Guidance/AST-WRK-06.png` — Workshop Step 6
80. `Assets/Textures/Guidance/AST-WRK-06.png.meta`
81. `Assets/Textures/Guidance/AST-WRK-07.png` — Workshop Step 7
82. `Assets/Textures/Guidance/AST-WRK-07.png.meta`
83. `Assets/Textures/Guidance/AST-WRK-08.png` — Workshop Step 8
84. `Assets/Textures/Guidance/AST-WRK-08.png.meta`
85. `Assets/Textures/Guidance/AST-WRK-09.png` — Workshop Step 9
86. `Assets/Textures/Guidance/AST-WRK-09.png.meta`
87. `Assets/Textures/Guidance/AST-WRK-10.png` — Workshop Step 10
88. `Assets/Textures/Guidance/AST-WRK-10.png.meta`
89. `Assets/Textures/Guidance/AST-WRK-11.png` — Workshop Step 11
90. `Assets/Textures/Guidance/AST-WRK-11.png.meta`

### Category 5: Procedural Schemas, Fixtures & Scripts (7 Files)
91. `data/schemas/ManualSchema.json` — Canonical JSON Schema for procedures
92. `data/schemas/MaintenanceHistorySchema.json` — Schema for repair history logging
93. `data/procedures/ge_33709_remote_setup.json` — Consumer Remote MVP fixture
94. `data/procedures/wire_soldering_splice.json` — Workshop Wire Splicing MVP fixture
95. `data/procedures/delonghi_ec680_descaling.json` — Historical regression fixture
96. `data/procedures/delonghi_ec685_descaling.json` — Historical regression fixture
97. `scripts/validate_procedure.py` — Multi-fixture automated test suite (19/19 checks)

### Category 6: Essential Native Packages (6 Files)
98. `Packages/SpectaclesInteractionKit 2.lspkg` — SIK 2.0 native package
99. `Packages/SpectaclesInteractionKit 2.lspkg.meta`
100. `Packages/SpectaclesUIKit 2.lspkg` — Spectacles UI Kit 2.0 native package
101. `Packages/SpectaclesUIKit 2.lspkg.meta`
102. `Packages/Leaf.lspkg` — LEAF testing framework package
103. `Packages/Leaf.lspkg.meta`

### Category 7: Competition Specification (1 File)
104. `devpost/design-brief.md` — Authoritative Learn AR competition submission brief

### Category 8: Authoritative Architecture, Governance & Release Reports (18 Files)
105. `docs/PROJECT_CONSTITUTION.md` — Governing principles and operational boundaries
106. `docs/PROJECT_STATE.md` — Single source of truth for verified project state
107. `docs/ARCHITECTURE.md` — System architecture and spatial coordinate specifications
108. `docs/DESIGN_GOVERNANCE.md` — Authoritative CLAD spatial design and token governance
109. `docs/DECISION_LOG.md` — Architectural Decision Records (ADRs)
110. `docs/INSTALLATION_AND_SETUP.md` — Reproducible setup instructions
111. `docs/KNOWN_LIMITATIONS.md` — Exhaustive boundary, mock, and hardware disclosures
112. `docs/TEST_STRATEGY.md` — Multi-tier verification strategy
113. `docs/CHANGELOG.md` — Chronological modification log
114. `docs/FW-05_ASSET_AND_ATTRIBUTION_REGISTER.md` — Third-party IP and citation register
115. `docs/FW-05_COMPETITION_SUBMISSION_AUDIT.md` — Hackathon criteria compliance audit
116. `docs/FW-05D_PRODUCT_AND_RUNTIME_RELEASE_CLAIMS.md` — Scope boundary verification
117. `docs/FW-05E_LIVE_RUNTIME_REVALIDATION_REPORT.md` — Live runtime revalidation certification (100% pass)
118. `docs/FW-06_FINAL_APPROVED_PUBLICATION_MANIFEST.md` — This authoritative manifest document
119. `docs/FW-06_PUBLICATION_EXECUTION_REPORT.md` — Option B execution log and release commit audit
120. `docs/FW-06_PUBLIC_GITHUB_VERIFICATION.md` — Post-push verification of public repository
121. `docs/FW-06_LOCAL_HISTORY_PRESERVATION_REPORT.md` — Evidence of preserved local Git history
122. `docs/FW-06_RELEASE_SECURITY_AND_ATTRIBUTION_REPORT.md` — Zero-secrets certification and IP review

$$\mathbf{TOTAL \ AUTHORIZED \ PUBLICATION \ CANDIDATES: \ 122 \ FILES}$$

---

## 4. Reconciled Excluded Items Register

The following items are strictly **EXCLUDED** from publication:
1. `docs/evidence/Scene_pre_fw05a_cleanup.scene` (Corrupted legacy scene backup containing `AiPreviewAgent Handler`)
2. `Packages/SpectaclesInteractionKitExamples.lspkg` (27.0 MB optional examples package)
3. `Packages/SpectaclesSyncKit.lspkg` (1.4 MB unused networking package)
4. `Packages/Icons 2.lspkg` (1.8 MB duplicate icons package)
5. `Assets/Textures/Guidance/original_stage_c_backup/` (3.6 MB raw artwork backup)
6. Duplicate folders in `Assets/`: `3D Loading Indicator [2-5]`, `Chroma-Key [2-4]`, `Liquid Glass [2-6]` (4.5 MB)
7. Internal agent operational memos (`docs/FW-05C_*.md` operational logs, `docs/FW-05D_*.md` internal memos)
8. Ephemeral editor caches and metadata: `.virtual-scene*.json`, `Cache/`, `Support/`, `Workspaces/`
9. Private configuration and keys: `.mcp.json`, `ls-live-instance.json`, `spk_debug_key.pem`
