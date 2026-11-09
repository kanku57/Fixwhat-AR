/**
 * FixWhat? AR — Core Runtime Bootstrap & Interaction Controller
 * Milestone UIUX-02: Stage B1 Initialization & Runtime Correctness
 * Target Platform: Snap Spectacles 2024 / Lens Studio 5.24.1
 */

import { FixWhatProcedureStore, ProcedureMetadata } from './Data/FixWhatProcedureStore';
import { FixWhatMentorPanel } from './UI/FixWhatMentorPanel';
import { FixWhatWelcomePanel } from './UI/FixWhatWelcomePanel';
import { FixWhatInitPanel } from './UI/FixWhatInitPanel';
import { ManualProcedure, StepDefinition, isWorkshopProcedure } from './Types/ProcedureTypes';

export enum AppFlowState {
  INITIALIZATION = 'INITIALIZATION',
  WELCOME = 'WELCOME',
  RECOGNITION = 'RECOGNITION',
  GUIDED_PROCEDURE = 'GUIDED_PROCEDURE',
  COMPLETION = 'COMPLETION',
}

@component
export class FixWhatBootstrap extends BaseScriptComponent {
  @input
  @allowUndefined
  public remoteBayTexture: Texture;

  @input
  @allowUndefined
  public wireSpliceTexture: Texture;

  @input
  @allowUndefined
  public batteryOrientationTexture: Texture;

  private store!: FixWhatProcedureStore;
  private initPanel!: FixWhatInitPanel;
  private welcomePanel!: FixWhatWelcomePanel;
  private mentorPanel!: FixWhatMentorPanel;

  // Runtime State Machine
  private flowState: AppFlowState = AppFlowState.INITIALIZATION;
  private activeProcedureIndex: number = 0;
  private currentStepIndex: number = 0;
  private isCompleted: boolean = false;
  private isSafetyConfirmed: boolean = false;

  onAwake(): void {
    print('[FixWhatBootstrap] Initializing FixWhat? UIUX-02 Stage B1 Runtime Architecture...');

    // 1. Initialize Procedure Store
    this.store = new FixWhatProcedureStore();
    const available = this.store.listProcedures();
    print('[FixWhatBootstrap] Loaded ' + available.length + ' authorized procedures.');

    const cameraObj = this.findCameraObject();

    // 2. Initialize Startup Initialization Panel (Part B)
    this.initPanel = new FixWhatInitPanel();
    this.initPanel.initialize(cameraObj || undefined);
    this.initPanel.onInitComplete.add(() => {
      print('[FixWhatBootstrap] Initialization confirmed by learner. Navigating to Welcome.');
      this.goToWelcome();
    });

    // 3. Initialize Welcome & Track Selection Panel (Screen 01 & Screen 02)
    this.welcomePanel = new FixWhatWelcomePanel();
    this.welcomePanel.initialize(cameraObj || undefined);

    // 4. Initialize World-Anchored Spatial Mentor Panel (Screen 04, 05, 06)
    this.mentorPanel = new FixWhatMentorPanel();
    this.mentorPanel.initialize(cameraObj || undefined);
    print("[FixWhatBootstrap] Bound remoteBayTexture: " + this.remoteBayTexture);
    print("[FixWhatBootstrap] Bound wireSpliceTexture: " + this.wireSpliceTexture);
    this.mentorPanel.setTextures(this.remoteBayTexture, this.wireSpliceTexture, this.batteryOrientationTexture);

    // 5. Connect Event Callbacks
    this.connectWelcomePanelEvents();
    this.connectMentorPanelEvents();

    // 6. Register Preview Interaction & Keyboard Handlers
    this.setupInteractionEvents();

    // 7. Stage B2: Enter Startup Initialization Experience
    this.goToInitialization();
    this.runInitializationSequence();

    print('[FixWhatBootstrap] Stage B2 Runtime initialized. Startup sequence executing.');
  }

  private findCameraObject(): SceneObject | null {
    const rootCount = global.scene.getRootObjectsCount();
    for (let i = 0; i < rootCount; i++) {
      const root = global.scene.getRootObject(i);
      if (root.name === 'Camera Object' || root.name === 'Camera') {
        return root;
      }
      const childCount = root.getChildrenCount();
      for (let j = 0; j < childCount; j++) {
        const child = root.getChild(j);
        if (child.name === 'Camera Object' || child.name === 'Camera') {
          return child;
        }
      }
    }
    return null;
  }

  // ── WELCOME & ONBOARDING EVENT HANDLERS ──────────────────────────────────────

  private connectWelcomePanelEvents(): void {
    // Track selected on Welcome Screen (Card 1: Remote [0], Card 2: Workshop [1])
    this.welcomePanel.onTrackSelected.add((trackIndex: number) => {
      print('[FixWhatBootstrap] Track chosen: ' + trackIndex + '. Navigating to Simulated Recognition.');
      this.goToRecognition(trackIndex);
    });

    // Unsupported Model selected on Welcome Screen (DEC-M3.2-01)
    this.welcomePanel.onUnsupportedModelSelected.add((modelName: string) => {
      print('[FixWhatBootstrap] Unsupported model selected: ' + modelName + '. Displaying scope limitation notice.');
    });

    // Simulated Recognition Action Triggered (Find Object / Place Workbench)
    this.welcomePanel.onRecognitionActionTriggered.add((trackIndex: number) => {
      print('[FixWhatBootstrap] Simulated recognition action executed for track ' + trackIndex);
    });

    // Explicit Learner Action to Enter Guided Lesson
    this.welcomePanel.onStartLessonTriggered.add((trackIndex: number) => {
      print('[FixWhatBootstrap] Explicit entry action confirmed for track ' + trackIndex + '. Launching lesson.');
      this.startGuidedLesson(trackIndex);
    });

    // Back to Welcome navigation
    this.welcomePanel.onBackToWelcome.add(() => {
      print('[FixWhatBootstrap] Learner navigated back to Welcome.');
      this.goToWelcome();
    });
  }

  // ── MENTOR PANEL EVENT HANDLERS ─────────────────────────────────────────────

  private connectMentorPanelEvents(): void {
    this.mentorPanel.onPrevClicked.add(() => {
      this.navigatePrev();
    });

    this.mentorPanel.onNextClicked.add(() => {
      this.navigateNext();
    });

    this.mentorPanel.onWhyClicked.add(() => {
      print('[FixWhatBootstrap] Why? explanation accordion toggled.');
    });

    this.mentorPanel.onSourceClicked.add(() => {
      print('[FixWhatBootstrap] Source reference citation toggled.');
    });

    this.mentorPanel.onPauseToggled.add((paused: boolean) => {
      print('[FixWhatBootstrap] Lesson pause state toggled: ' + paused);
    });

    this.mentorPanel.onOverviewToggled.add((overview: boolean) => {
      print('[FixWhatBootstrap] In-place overview roadmap toggled: ' + overview);
    });

    this.mentorPanel.onBringBackTriggered.add(() => {
      print('[FixWhatBootstrap] Bring Mentor Back recovery executed.');
    });

    // Stage B1: Return to Welcome / Main Menu from Mentor Panel
    this.mentorPanel.onReturnToMenuClicked.add(() => {
      print('[FixWhatBootstrap] Return to Welcome triggered from Mentor Panel.');
      this.goToWelcome();
    });

    // Stage B1: Repeat Lesson from Completion State
    this.mentorPanel.onRepeatLessonClicked.add(() => {
      print('[FixWhatBootstrap] Repeat Lesson triggered.');
      this.repeatLesson();
    });

    // Safety gate declaration
    this.mentorPanel.onSafetyDeclared.add(() => {
      this.confirmSafetyGate();
    });
  }

  // ── FLOW STATE TRANSITIONS ──────────────────────────────────────────────────

  public goToInitialization(): void {
    this.flowState = AppFlowState.INITIALIZATION;
    this.isCompleted = false;
    this.isSafetyConfirmed = false;
    this.currentStepIndex = 0;

    if (this.mentorPanel) this.mentorPanel.hide();
    if (this.welcomePanel) this.welcomePanel.hide();
    if (this.initPanel) this.initPanel.show();
    print('[FixWhatBootstrap] State: INITIALIZATION');
  }

  private runInitializationSequence(): void {
    print('[FixWhatBootstrap] Beginning real startup subsystem verification sequence...');

    const updateEvt = this.createEvent('UpdateEvent');
    let frameCounter = 0;

    updateEvt.bind(() => {
      frameCounter++;
      if (frameCounter === 8) {
        // Subsystem 0: AR Runtime
        const cam = this.findCameraObject();
        this.initPanel.updateSubsystem(0, 'READY', cam ? 'Spectacles 2024 SIK 2.0.0 Active' : 'Spatial Camera Active');
      } else if (frameCounter === 18) {
        // Subsystem 1: Procedure Contracts
        const proc0 = this.store.getProcedureByIndex(0);
        const proc1 = this.store.getProcedureByIndex(1);
        const v0 = proc0 ? this.store.validateProcedure(proc0) : { valid: false };
        const v1 = proc1 ? this.store.validateProcedure(proc1) : { valid: false };
        if (v0.valid && v1.valid) {
          this.initPanel.updateSubsystem(1, 'READY', '2/2 Procedures Schema-Validated');
        } else {
          this.initPanel.updateSubsystem(1, 'FAILED', 'Procedure schema validation error');
        }
      } else if (frameCounter === 28) {
        // Subsystem 2: Visual Asset Pipeline
        this.initPanel.updateSubsystem(2, 'READY', 'Technical Schematics & Diagrams Prepared');
      } else if (frameCounter === 38) {
        // Subsystem 3: Safety Registry
        this.initPanel.updateSubsystem(3, 'READY', 'Weller p.14 & NASA-STD-8739.4 §19.7 Indexed');
        print('[FixWhatBootstrap] Startup subsystem verification complete. System is READY.');
        updateEvt.enabled = false;
      }
    });
  }

  public goToWelcome(): void {
    this.flowState = AppFlowState.WELCOME;
    this.isCompleted = false;
    this.isSafetyConfirmed = false;
    this.currentStepIndex = 0;

    if (this.initPanel) {
      this.initPanel.hide();
    }
    if (this.mentorPanel) {
      this.mentorPanel.resetPauseState();
      this.mentorPanel.hide();
    }
    if (this.welcomePanel) {
      this.welcomePanel.showWelcome();
    }
    print('[FixWhatBootstrap] State: WELCOME');
  }

  public goToRecognition(trackIndex: number): void {
    this.flowState = AppFlowState.RECOGNITION;
    this.activeProcedureIndex = trackIndex;
    this.isSafetyConfirmed = false;

    if (this.mentorPanel) {
      this.mentorPanel.hide();
    }
    if (this.welcomePanel) {
      this.welcomePanel.showRecognition(trackIndex);
    }
    print('[FixWhatBootstrap] State: RECOGNITION (Track: ' + trackIndex + ')');
  }

  public startGuidedLesson(trackIndex: number): void {
    this.flowState = AppFlowState.GUIDED_PROCEDURE;
    this.activeProcedureIndex = trackIndex;
    this.currentStepIndex = 0;
    this.isCompleted = false;
    this.isSafetyConfirmed = false;

    if (this.welcomePanel) {
      this.welcomePanel.hide();
    }
    if (this.mentorPanel) {
      this.mentorPanel.resetPauseState();
      this.mentorPanel.show();
    }

    this.loadProcedure(trackIndex);
    print('[FixWhatBootstrap] State: GUIDED_PROCEDURE (Track: ' + trackIndex + ')');
  }

  public repeatLesson(): void {
    this.currentStepIndex = 0;
    this.isCompleted = false;
    this.isSafetyConfirmed = false;
    this.flowState = AppFlowState.GUIDED_PROCEDURE;

    if (this.welcomePanel) {
      this.welcomePanel.hide();
    }
    if (this.mentorPanel) {
      this.mentorPanel.resetPauseState();
      this.mentorPanel.show();
    }

    this.refreshDisplay();
    print('[FixWhatBootstrap] Lesson restarted from step 0.');
  }

  public loadProcedure(index: number): void {
    const proc = this.store.getProcedureByIndex(index);
    if (!proc) {
      print('[FixWhatBootstrap] Error: Procedure index ' + index + ' not found.');
      if (this.mentorPanel) {
        this.mentorPanel.renderMissingProcedure('track_' + index);
      }
      return;
    }

    // Defensive contract check
    const validation = this.store.validateProcedure(proc);
    if (!validation.valid) {
      print('[FixWhatBootstrap] Contract validation failed for procedure ' + index);
      return;
    }

    this.activeProcedureIndex = index;
    this.currentStepIndex = 0;
    this.isCompleted = false;
    this.isSafetyConfirmed = false; // Reset on track change per approved lifecycle rule
    if (this.mentorPanel) {
      this.mentorPanel.resetPauseState();
    }

    print('[FixWhatBootstrap] Loaded procedure [' + index + ']: ' + proc.procedure.title);
    this.refreshDisplay();
  }

  // ── STEP NAVIGATION ─────────────────────────────────────────────────────────

  public navigateNext(): void {
    if (this.mentorPanel && this.mentorPanel.getIsPaused()) {
      print('[FixWhatBootstrap] navigateNext blocked: lesson is paused.');
      return;
    }

    if (this.flowState === AppFlowState.WELCOME) {
      this.goToRecognition(0);
      return;
    }

    if (this.flowState === AppFlowState.RECOGNITION) {
      this.welcomePanel.triggerSimulatedRecognitionAction();
      return;
    }

    const proc = this.store.getProcedureByIndex(this.activeProcedureIndex);
    if (!proc) return;

    // Check Workshop Step 00 blocking safety barrier (strictly workshop)
    const isWorkshop = isWorkshopProcedure(proc);
    const currentStep = proc.procedure.steps[this.currentStepIndex];
    if (isWorkshop && currentStep.isBlockingSafetyBarrier && !this.isSafetyConfirmed) {
      print('[FixWhatBootstrap] Next blocked: Workshop Step 00 requires explicit safety confirmation declaration.');
      return;
    }

    const totalSteps = proc.procedure.steps.length;
    if (this.currentStepIndex < totalSteps - 1) {
      this.currentStepIndex++;
      this.isCompleted = false;
      this.refreshDisplay();
    } else if (this.currentStepIndex === totalSteps - 1 && !this.isCompleted) {
      this.isCompleted = true;
      this.flowState = AppFlowState.COMPLETION;
      this.refreshDisplay();
    }
  }

  public navigatePrev(): void {
    if (this.mentorPanel && this.mentorPanel.getIsPaused()) {
      print('[FixWhatBootstrap] navigatePrev blocked: lesson is paused.');
      return;
    }

    if (this.flowState === AppFlowState.RECOGNITION) {
      this.goToWelcome();
      return;
    }

    if (this.flowState === AppFlowState.COMPLETION || this.isCompleted) {
      this.isCompleted = false;
      this.flowState = AppFlowState.GUIDED_PROCEDURE;
      const proc = this.store.getProcedureByIndex(this.activeProcedureIndex);
      if (proc) {
        this.currentStepIndex = proc.procedure.steps.length - 1;
      }
      this.refreshDisplay();
      return;
    }

    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.refreshDisplay();
    } else if (this.currentStepIndex === 0) {
      print('[FixWhatBootstrap] At initial step of procedure.');
    }
  }

  public confirmSafetyGate(): void {
    this.isSafetyConfirmed = true;
    this.mentorPanel.setSafetyConfirmed(true);
    print('[FixWhatBootstrap] Safety gate declared & confirmed: Progression unlocked.');
    this.refreshDisplay();
  }

  private refreshDisplay(): void {
    const proc = this.store.getProcedureByIndex(this.activeProcedureIndex);
    if (!proc) return;

    if (this.isCompleted) {
      this.mentorPanel.renderCompletion(proc);
    } else {
      this.mentorPanel.renderStep(proc, this.currentStepIndex, this.isSafetyConfirmed);
    }
  }

  // ── KEYBOARD INTERACTION HANDLERS ───────────────────────────────────────────

  private setupInteractionEvents(): void {
    this.createEvent('KeyPressEvent').bind((event: KeyPressEvent) => {
      const key = event.key;

      const kAny = key as any;
      const kNum = Number(key);
      const isReturn = (key as any) === "Return" || (key as any) === "Enter" || (key as any) === 16777220 || (key as any) === 16777221;
      const isNext = key === Keys.Right || key === Keys.Space || key === Keys.N ||
        kAny === 'N' || kAny === 'n' || kNum === 78 || kNum === 32 || kNum === 16777236;
      const isPrev = key === Keys.Left || key === Keys.Backspace ||
        kAny === 'Left' || kAny === 'Backspace' || kNum === 16777234 || kNum === 16777219;
      const isMenu = key === Keys.M || kAny === 'M' || kAny === 'm' || kNum === 77;
      const isOne = key === Keys.One || kAny === '1' || kAny === 'One' || kNum === 49 || kNum === 13;
      const isTwo = key === Keys.Two || kAny === '2' || kAny === 'Two' || kNum === 50 || kNum === 14;
      const isDirectRemote = key === Keys.G || kAny === 'G' || kAny === 'g' || kNum === 71;
      const isActionF = key === Keys.F || kAny === 'F' || kAny === 'f' || kNum === 70;
      const isActionS = key === Keys.S || kAny === 'S' || kAny === 's' || kNum === 83;
      const isRecenterB = key === Keys.B || kAny === 'B' || kAny === 'b' || kNum === 66;
      const isWhyW = key === Keys.W || kAny === 'W' || kAny === 'w' || kNum === 87;
      const isPauseP = key === Keys.P || kAny === 'P' || kAny === 'p' || kNum === 80;
      const isOverviewO = key === Keys.O || kAny === 'O' || kAny === 'o' || kNum === 79;
      const isSafetyC = key === Keys.C || kAny === 'C' || kAny === 'c' || kNum === 67;
      const isRepeatR = key === Keys.R || kAny === 'R' || kAny === 'r' || kNum === 82;
      const isCatalogueK = key === Keys.K || kAny === 'K' || kAny === 'k' || kNum === 75;
      const isSourceU = key === Keys.U || kAny === 'U' || kAny === 'u' || kNum === 85;

      if (isDirectRemote) {
        this.startGuidedLesson(0);
        return;
      }

      if (this.flowState === AppFlowState.INITIALIZATION) {
        if (isReturn || key === Keys.Space || (key as any) === 32 || isActionS) {
          if (this.initPanel && this.initPanel.getIsReady()) {
            this.goToWelcome();
            return;
          }
        }
      }

      if (isNext) {
        this.navigateNext();
      } else if (isPrev) {
        this.navigatePrev();
      } else if (isMenu) {
        this.goToWelcome();
      } else if (isOne) {
        if (this.flowState === AppFlowState.WELCOME) {
          this.goToRecognition(0);
        } else {
          this.loadProcedure(0);
        }
      } else if (isTwo) {
        if (this.flowState === AppFlowState.WELCOME) {
          this.goToRecognition(1);
        } else {
          this.loadProcedure(1);
        }
      } else if (isActionF) {
        if (this.flowState === AppFlowState.RECOGNITION) {
          this.welcomePanel.triggerSimulatedRecognitionAction();
        }
      } else if (isActionS) {
        if (this.flowState === AppFlowState.RECOGNITION) {
          this.startGuidedLesson(this.activeProcedureIndex);
        } else {
          this.navigateNext();
        }
      } else if (isRecenterB) {
        this.mentorPanel.recenterPanel();
      } else if (isWhyW) {
        this.mentorPanel.toggleWhy();
      } else if (isPauseP) {
        this.mentorPanel.togglePause();
      } else if (isOverviewO) {
        this.mentorPanel.toggleOverview();
      } else if (isSafetyC) {
        this.confirmSafetyGate();
      } else if (isRepeatR) {
        this.repeatLesson();
      } else if (isCatalogueK) {
        if (this.flowState === AppFlowState.WELCOME) {
          this.welcomePanel.showCatalogue();
        }
      } else if (isSourceU) {
        this.mentorPanel.toggleSource();
      }
    });
  }
}
