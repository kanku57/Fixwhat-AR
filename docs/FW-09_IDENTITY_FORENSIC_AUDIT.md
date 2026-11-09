# FIXWHAT? AR — FW-09
## IDENTITY FORENSIC AUDIT & ROOT CAUSE INVESTIGATION REPORT

**Milestone:** FW-09 (Release v1.0.2 / Public Identity Correction)  
**Deliverable ID:** DEL-01  
**Technical Lead:** Antigravity (Principal Software Architect)  
**Design Authority:** CLAD (Creative Lens AR Designer)  
**Final Authority:** Product Owner  
**Date:** 2026-11-09  
**Repository:** `https://github.com/kanku57/Fixwhat-AR.git`  
**Target Branch:** `main`  

---

## 1. Executive Summary

During final submission verification of the public repository `https://github.com/kanku57/Fixwhat-AR`, an identity attribution discrepancy was identified on the published commits on `main`:
- **Current Published Commits:**
  - `bc63c62a0d017b01edaa832273a3f33e77aaa473` (`feat: FixWhat? AR competition release for Learn AR with Spectacles 2026`)
  - `8d111d392abc1a6f9b0641dc54fc1993e9c39148` (`docs: reconcile FixWhat? AR v1.0.1 for competition submission`)
- **Configured Identity:** Both commits were authored and committed under:
  `kanku57 <41878724+kanku57@users.noreply.github.com>`
- **Observed Behavior on GitHub:** GitHub commit API (`/repos/kanku57/Fixwhat-AR/commits/<sha>`) attributed both commits to GitHub user **`ErsinDOGDU`** (avatar `https://avatars.githubusercontent.com/u/41878724?v=4`), rather than the repository owner and Product Owner **`kanku57`**.
- **Root Cause:** GitHub resolves commit email addresses with the format `[ID]+[username]@users.noreply.github.com` primarily by the numeric `[ID]`. The numeric ID `41878724` belongs to GitHub user `ErsinDOGDU`. The true immutable numeric ID for account `kanku57` is **`241878724`** (a single digit difference: missing leading `2`).
- **Resolution Path:** Perform a controlled, surgical rewrite of both commit objects using the verified identity `kanku57 <241878724+kanku57@users.noreply.github.com>`, preserving exact trees, messages, and parentage, followed by an authorized `--force-with-lease` update to `origin/main`.

---

## 2. GitHub Account Identity Audit (Live Evidence)

Direct live forensic queries were executed against GitHub's API and authenticated CLI session:

### 2.1 Authenticated Session (`gh auth status`)
```text
github.com
  ✓ Logged in to github.com account kanku57 (keyring)
  - Active account: true
  - Git operations protocol: https
  - Token scopes: 'gist', 'read:org', 'repo', 'workflow'
```

### 2.2 User Object Forensic Query (`gh api user` / `api.github.com/users/kanku57`)
```json
{
  "login": "kanku57",
  "id": 241878724,
  "node_id": "U_kgDODmrGxA",
  "avatar_url": "https://avatars.githubusercontent.com/u/241878724?v=4",
  "html_url": "https://github.com/kanku57",
  "type": "User",
  "site_admin": false,
  "name": "Kaangku Baruah",
  "blog": "www.symfinntechstudios.com",
  "public_repos": 1,
  "created_at": "2025-11-04T02:24:17Z",
  "updated_at": "2026-11-09T08:39:56Z"
}
```

### 2.3 Identity Comparison & Discrepancy Matrix

| Parameter | Erroneous Configured Value | True Verified Account Value | Impact / Analysis |
| :--- | :--- | :--- | :--- |
| **GitHub Login** | `kanku57` | `kanku57` | Match |
| **GitHub User ID** | `41878724` | **`241878724`** | Missing leading digit `2` |
| **Attributed User** | `ErsinDOGDU` (ID: 41878724) | `kanku57` (ID: 241878724) | GitHub maps to ID owner |
| **Noreply Email** | `41878724+kanku57@users.noreply.github.com` | **`241878724+kanku57@users.noreply.github.com`** | Must update to true ID |

---

## 3. Local & Remote Git Repository State Audit

### 3.1 Local Repository Branches
- `main` (active): Points to `8d111d392abc1a6f9b0641dc54fc1993e9c39148`, tracked to `origin/main`.
- `archive/local-history`: Points to `49bdd7a6ff99e7b25121bc0844f2ffbc04db9cfd` (5 original developmental commits preserved intact).

### 3.2 Remote Repository Refs (`git ls-remote origin`)
- `HEAD` $\rightarrow$ `8d111d392abc1a6f9b0641dc54fc1993e9c39148`
- `refs/heads/main` $\rightarrow$ `8d111d392abc1a6f9b0641dc54fc1993e9c39148`

### 3.3 Commit Graph & Immutable Tree Hashes

```text
Commit 1 (Root, Orphan):
  SHA:        bc63c62a0d017b01edaa832273a3f33e77aaa473
  Tree:       b91051cd2c78812cb74d624b741962c7cdcbb669
  Author:     kanku57 <41878724+kanku57@users.noreply.github.com> 1794218835 +0530
  Committer:  kanku57 <41878724+kanku57@users.noreply.github.com> 1794218835 +0530
  Subject:    feat: FixWhat? AR competition release for Learn AR with Spectacles 2026
  Parents:    (none - orphan root commit)

Commit 2:
  SHA:        8d111d392abc1a6f9b0641dc54fc1993e9c39148
  Tree:       bfdd00953f9fae0e9d573cd424e3d5dab05e4e63
  Author:     kanku57 <41878724+kanku57@users.noreply.github.com> 1794227027 +0530
  Committer:  kanku57 <41878724+kanku57@users.noreply.github.com> 1794227027 +0530
  Subject:    docs: reconcile FixWhat? AR v1.0.1 for competition submission
  Parents:    bc63c62a0d017b01edaa832273a3f33e77aaa473
```

---

## 4. Documentation References to Erroneous ID

A repository-wide grep identified references to `41878724` across past operational ledgers:
- `docs/FW-05C_*.md`, `docs/FW-05D_*.md`, `docs/FW-05E_*.md`
- `docs/FW-06_*.md`
- `docs/FW-07_*.md`
- `docs/FW-08_*.md`
- `docs/CHANGELOG.md`

All active governing documentation (`README.md`, `LICENSE`, `THIRD_PARTY_NOTICES.md`, `devpost/submission-text.md`, `docs/PROJECT_STATE.md`, `docs/CHANGELOG.md`) will be reconciled to reflect the verified identity `241878724+kanku57@users.noreply.github.com`. Historical logs from completed milestones remain preserved as immutable historical records.

---

## 5. Audit Conclusion & Go/No-Go Recommendation

- **Identity Verification:** **100% CONFIRMED**. True GitHub user ID is `241878724`.
- **Target Email:** `241878724+kanku57@users.noreply.github.com`.
- **Recommendation:** **PROCEED TO PHASE B (BACKUP & HISTORY PRESERVATION)**.

