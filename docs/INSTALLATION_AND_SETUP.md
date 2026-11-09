# FixWhat? Installation & Local Setup Guide

**Target Environment:** macOS Ventura 13.7.8 (Intel x86_64)  
**Project Path:** `/Users/kanku/antigravity/fixwhat`

---

## 1. Host Prerequisites

1. **Operating System:** macOS 12.0+ (Tested: macOS 13.7.8 Ventura).
2. **Node.js & npm:** Node.js v24.13.0+ and npm 11.6.2+ installed.
3. **Xcode Command Line Tools:** Installed (`xcode-select -p` returning `/Library/Developer/CommandLineTools`).
4. **Git:** Git v2.39+ available via `/usr/bin/git`.

---

## 2. Lens Studio Setup

1. **Download Lens Studio (Intel Mac Build):**
   - Download Lens Studio for macOS (Intel x86_64) from [ar.snap.com/download](https://ar.snap.com/download).
   - Ensure version is between **5.22 and 5.25** (Tested: `5.24.1.26100516`).
2. **Install Application:** Mount DMG and drag `Lens Studio.app` to `/Applications`.
3. **Open Project:**
   - Launch Lens Studio.
   - Open existing project at `/Users/kanku/antigravity/fixwhat/Fixwhat.esproj`.
   - Verify that Lens Studio indicates project is open and preview panel renders.

---

## 3. Secret Management & Git Hygiene

1. Ensure `.gitignore` is strictly respected before running any Git command.
2. Never remove `.mcp.json` from `.gitignore`.
3. Never stage files containing API keys or bearer tokens.


### 4. Git Repository & Author Configuration

The local repository baseline is established at commit `8fa1d63`.

To configure local Git identity for future commits:
```bash
git config --local user.name "Your Name"
git config --local user.email "your.email@example.com"
```

Verify clean working tree:
```bash
git status
```

### 5. Devpost Learn SPECS Skill Pack Installation

To install the official hackathon skill pack (`plan-lens`):
```bash
npx -y skills add challengepost/learn-specs --all -y
```
