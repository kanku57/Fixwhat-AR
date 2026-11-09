/**
 * FixWhat? - Pre-Authored Procedure Fixtures
 * Generated directly from verified repository fixtures:
 * 1. data/procedures/ge_33709_remote_setup.json
 * 2. data/procedures/wire_soldering_splice.json
 * Plus an adversarial test fixture for failure state verification.
 * 
 * Target Platform: Snap Spectacles 2024 / Lens Studio 5.24.1
 */

import { ManualProcedure } from '../Types/ProcedureTypes';

export const GE_33709_REMOTE_PROCEDURE: ManualProcedure = {
  "$schema": "https://fixwhat.dev/schemas/ManualSchema.json",
  "schemaVersion": "1.0.0",
  "manualId": "manual_ge_33709_remote_setup",
  "appliance": {
    "manufacturer": "Jasco Products Company LLC (GE Licensee)",
    "modelFamily": "GE 33709 4-Device Universal Remote Series",
    "compatibleModels": [
      "33709",
      "33711"
    ],
    "category": "Universal Remote Control"
  },
  "sourceDocument": {
    "title": "GE 4-Device Universal Remote Instruction Manual & Code List (Models 33709 & 33711)",
    "publisher": "Jasco Products Company LLC",
    "documentCode": "33709_33711_Manual_Rev_11-19",
    "url": "https://byjasco.com/pages/universal-remote-codes",
    "accessDate": "2026-10-28",
    "verificationStatus": "VERIFIED_MANUFACTURER_SOURCE"
  },
  "procedure": {
    "procedureId": "proc_ge_33709_battery_and_tv_setup",
    "title": "GE 33709 Battery Installation & TV Setup Procedure",
    "taskType": "SETUP",
    "estimatedTimeMinutes": 5,
    "prerequisites": [
      "Two fresh AAA alkaline batteries (do not mix chemistries or ages)",
      "Target television powered on manually via front/side physical power switch",
      "Line-of-sight view to television front panel infrared receiver",
      "Clear workspace surface to prevent dropping small battery door"
    ],
    "requiredTools": [
      {
        "toolId": "tool_remote_body",
        "name": "GE 33709 Remote Unit",
        "specification": "4-Device Universal Remote with slide-off battery door",
        "isConsumable": false
      },
      {
        "toolId": "tool_aaa_batteries",
        "name": "AAA Alkaline Batteries",
        "specification": "Two 1.5V AAA cells (Alkaline recommended; do not mix chemistries)",
        "isConsumable": true
      }
    ],
    "phases": [
      {
        "phaseIndex": 0,
        "title": "Battery Compartment Inspection & Removal",
        "description": "Locate textured release indent and slide off battery door."
      },
      {
        "phaseIndex": 1,
        "title": "Battery Polarity Verification & Insertion",
        "description": "Install two fresh AAA batteries observing reverse-parallel polarity markings."
      },
      {
        "phaseIndex": 2,
        "title": "Television Pairing via Direct Code Entry",
        "description": "Enter TV setup mode, select TV bank, and enter 4-digit pairing code."
      }
    ],
    "steps": [
      {
        "stepId": "step_remote_open_battery_door",
        "stepIndex": 0,
        "phaseIndex": 0,
        "title": "Pull Down Textured Indent and Slide Off Battery Cover",
        "instructionText": "Turn the remote over so the keypad faces down. Locate the textured indent on the rear of the remote. Firmly pull down on the textured surface and slide the battery cover downward to expose the battery compartment.",
        "hazardLevel": "NONE",
        "safetyNotice": null,
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_remote_body"
        ],
        "sourceCitation": {
          "sectionHeading": "1. Battery Installation",
          "pageNumber": 2,
          "diagramReference": "Fig. 1",
          "exactExcerpt": "On the back of the remote, pull down on the textured surface and slide the battery cover downward to remove it."
        },
        "trainingExplanation": {
          "whyItMatters": "The battery door uses an interference friction clip. Pulling firmly downward prevents snapping the retention tab.",
          "componentInvolved": "Plastic battery door retaining clip",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": "In which direction should the battery door slide during removal?"
        }
      },
      {
        "stepId": "step_remote_inspect_polarity_markings",
        "stepIndex": 1,
        "phaseIndex": 1,
        "title": "Inspect Molded Polarity Markings and Battery Precautions",
        "instructionText": "Examine the molded (+) and (-) symbols inside the battery compartment. Note that the left slot has its coiled spring terminal at the top, while the right slot has its coiled spring terminal at the bottom.",
        "hazardLevel": "CAUTION",
        "safetyNotice": "Battery Precautions: Do not mix old and new batteries. Do not mix alkaline, standard (carbon-zinc) or rechargeable batteries. Always insert batteries with correct polarity alignment.",
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_remote_body"
        ],
        "sourceCitation": {
          "sectionHeading": "1. Battery Installation - Battery Precautions",
          "pageNumber": 2,
          "diagramReference": "Fig. 2",
          "exactExcerpt": "Battery Precautions: Do not mix old and new batteries. Do not mix alkaline, standard (carbon-zinc) or rechargeable batteries."
        },
        "trainingExplanation": {
          "whyItMatters": "Reverse battery installation can damage internal CMOS logic and cause electrolytic leakage. Coiled spring contacts always accommodate the flat negative (-) battery terminal.",
          "componentInvolved": "Molded polarity relief and coiled compression spring contacts",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": "Which battery terminal always aligns with the coiled spring contact?"
        }
      },
      {
        "stepId": "step_remote_insert_battery_left",
        "stepIndex": 2,
        "phaseIndex": 1,
        "title": "Install First AAA Battery (Slot A, Left / Negative on Spring)",
        "instructionText": "Take the first AAA alkaline battery. Align its flat negative (-) terminal against the spring contact at the top of the left slot (Slot A), compress the spring slightly, and push the protruding positive (+) button terminal down into place.",
        "hazardLevel": "NONE",
        "safetyNotice": null,
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_remote_body",
          "tool_aaa_batteries"
        ],
        "sourceCitation": {
          "sectionHeading": "1. Battery Installation",
          "pageNumber": 2,
          "diagramReference": "Fig. 2",
          "exactExcerpt": "Match the positive (+) and negative (-) marks on two (2) new AAA alkaline batteries to the corresponding (+) and (-) marks inside the battery compartment."
        },
        "trainingExplanation": {
          "whyItMatters": "Compressing the spring first prevents tearing the battery insulation wrapper against the contact housing.",
          "componentInvolved": "Slot A top spring contact",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": null
        }
      },
      {
        "stepId": "step_remote_insert_battery_right",
        "stepIndex": 3,
        "phaseIndex": 1,
        "title": "Install Second AAA Battery (Slot B, Right / Reverse-Parallel Orientation)",
        "instructionText": "Take the second AAA alkaline battery. Insert it into the right slot (Slot B) in opposite orientation: align the flat negative (-) terminal against the spring at the bottom of the slot, compress the spring, and snap the positive (+) terminal down at the top.",
        "hazardLevel": "CAUTION",
        "safetyNotice": "Reverse-Parallel Orientation: Battery 2 must face the opposite direction of Battery 1. Confirm both cells match their respective embossed markings.",
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_remote_body",
          "tool_aaa_batteries"
        ],
        "sourceCitation": {
          "sectionHeading": "1. Battery Installation",
          "pageNumber": 2,
          "diagramReference": "Fig. 2",
          "exactExcerpt": "Insert the fresh AAA batteries into the compartment, ensuring correct polarity alignment."
        },
        "trainingExplanation": {
          "whyItMatters": "The series electrical circuit connects the positive terminal of Cell 1 to the negative terminal of Cell 2, summing two 1.5V cells to provide the 3.0V required by the microcontroller and infrared emitter diode.",
          "componentInvolved": "Series connection jumper and PCB power rail",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": "Why are the two AAA batteries oriented in opposite directions?"
        }
      },
      {
        "stepId": "step_remote_replace_door",
        "stepIndex": 4,
        "phaseIndex": 1,
        "title": "Align and Slide Battery Cover Closed",
        "instructionText": "Position the battery cover slightly below the compartment opening, align the side rails, and push upward until the latch clicks securely into the locked position.",
        "hazardLevel": "NONE",
        "safetyNotice": null,
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_remote_body"
        ],
        "sourceCitation": {
          "sectionHeading": "1. Battery Installation",
          "pageNumber": 2,
          "diagramReference": null,
          "exactExcerpt": "Position the battery cover slightly below the opening and push upward to lock it into place."
        },
        "trainingExplanation": {
          "whyItMatters": "The cover maintains constant downward pressure on the cells, preventing intermittent battery disconnection during movement or drops.",
          "componentInvolved": "Plastic retention latch",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": null
        }
      },
      {
        "stepId": "step_remote_enter_setup_mode",
        "stepIndex": 5,
        "phaseIndex": 2,
        "title": "Press and Hold SETUP Button Until Red Indicator Stays Lit",
        "instructionText": "On the front keypad, press and hold down the dedicated SETUP button until the red indicator light turns on and stays steadily lit (approximately 2 to 3 seconds), then release the button.",
        "hazardLevel": "INFO",
        "safetyNotice": "Steady Red Indicator: The red LED indicates the microcontroller has entered programming mode. If the LED blinks and turns off, re-press and hold SETUP.",
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_remote_body"
        ],
        "sourceCitation": {
          "sectionHeading": "2. Programming Your Remote",
          "pageNumber": 3,
          "diagramReference": "Setup Button",
          "exactExcerpt": "Press and hold down the SETUP button on the remote until the remote's red indicator light turns on, then release the button."
        },
        "trainingExplanation": {
          "whyItMatters": "Holding SETUP triggers an interrupt on the remote's EEPROM controller, pausing normal IR command transmission and opening the code buffer register.",
          "componentInvolved": "Microcontroller EEPROM and Red Status LED indicator",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": "What visual signal confirms the remote has entered programming mode?"
        }
      },
      {
        "stepId": "step_remote_select_tv_button",
        "stepIndex": 6,
        "phaseIndex": 2,
        "title": "Press and Release the TV Device Button",
        "instructionText": "Press and release the TV device button on the top row of the remote. The red indicator light will blink once and remain steadily illuminated.",
        "hazardLevel": "NONE",
        "safetyNotice": null,
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_remote_body"
        ],
        "sourceCitation": {
          "sectionHeading": "2. Direct Code Entry",
          "pageNumber": 3,
          "diagramReference": null,
          "exactExcerpt": "Press and release the corresponding device button on the remote for the item you are setting up (e.g., TV)."
        },
        "trainingExplanation": {
          "whyItMatters": "Selecting the device bank assigns subsequent 4-digit codes to the TV memory slot rather than the CBL, DVD, or AUX slots.",
          "componentInvolved": "Device bank memory partition",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": null
        }
      },
      {
        "stepId": "step_remote_enter_code",
        "stepIndex": 7,
        "phaseIndex": 2,
        "title": "Enter 4-Digit TV Code from Version-Matched Code List",
        "instructionText": "Using the numeric keypad (0–9), enter the first 4-digit code listed for your TV brand from the code list booklet or Jasco online code lookup matching your remote's code library version (e.g., CL5, as indicated on the sticker inside the battery compartment). When the fourth digit is entered, the red indicator light will turn off automatically.",
        "hazardLevel": "NONE",
        "safetyNotice": null,
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_remote_body"
        ],
        "sourceCitation": {
          "sectionHeading": "2. Direct Code Entry",
          "pageNumber": 3,
          "diagramReference": null,
          "exactExcerpt": "Enter the first 4-digit code listed for your device's brand from the code list. When you finish entering the 4 digits, the red indicator light will turn off."
        },
        "trainingExplanation": {
          "whyItMatters": "The 4-digit code configures the infrared carrier frequency (typically 36kHz to 56kHz) and pulse-distance modulation protocol matching the TV receiver chip. Codes vary by television brand and remote code library version (CL3, CL4, CL5, or CL6), so the user must reference the code table matching their specific hardware sticker.",
          "componentInvolved": "Infrared carrier modulation register",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": "What happens to the red indicator light when a valid 4-digit code is accepted?"
        }
      },
      {
        "stepId": "step_remote_verify_tv_operation",
        "stepIndex": 8,
        "phaseIndex": 2,
        "title": "Point at TV and Test POWER and Volume",
        "instructionText": "Point the front infrared window directly at your TV and press the POWER button. If the TV turns off, pairing is successful. Turn the TV back on and test Volume (+) and (-) buttons. If the TV does not respond, repeat with the next code listed for your brand in the Jasco code manual.",
        "hazardLevel": "NONE",
        "safetyNotice": null,
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_remote_body"
        ],
        "sourceCitation": {
          "sectionHeading": "2. Direct Code Entry",
          "pageNumber": 3,
          "diagramReference": null,
          "exactExcerpt": "Point the remote at your device and test several buttons (such as power, volume, or channel up/down) to see if they respond as expected."
        },
        "trainingExplanation": {
          "whyItMatters": "Testing multiple button functions verifies both basic power toggle and variable duty-cycle commands across the full IR protocol map.",
          "componentInvolved": "High-output Infrared (IR) LED emitter (940nm wavelength)",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": null
        }
      }
    ],
    "completionCheck": {
      "finalCondition": "Batteries securely installed with correct polarity, cover clicked shut, red LED extinguishes after code entry, and television responds to remote commands.",
      "safetyVerificationText": "Verify the battery cover is securely locked and the remote body feels cool to the touch (no abnormal battery heat)."
    }
  }
};

export const WIRE_SOLDERING_SPLICE_PROCEDURE: ManualProcedure = {
  "$schema": "https://fixwhat.dev/schemas/ManualSchema.json",
  "schemaVersion": "1.0.0",
  "manualId": "manual_wire_soldering_splice_training",
  "appliance": {
    "manufacturer": "Educational Workshop Reference (Modeled on NASA-STD-8739.4 & Weller Guidelines)",
    "modelFamily": "Low-Voltage Stranded Copper Wire Splicing (20–24 AWG)",
    "compatibleModels": [
      "STRANDED_COPPER_20AWG",
      "STRANDED_COPPER_22AWG",
      "STRANDED_COPPER_24AWG"
    ],
    "category": "Electronics Assembly & Soldering Training"
  },
  "sourceDocument": {
    "title": "NASA-STD-8739.4A (w/ Change 4), NASA-STD-8739.3 (w/ Change 3) & Weller T0055745804 (Rev 08.2023) Operating Instructions",
    "publisher": "National Aeronautics and Space Administration / Apex Tool Group LLC",
    "documentCode": "NASA-STD-8739.4A_Ch4_NASA-STD-8739.3_Ch3_Weller_T0055745804_Rev082023",
    "url": "https://standards.nasa.gov/standard/NASA/NASA-STD-87394",
    "accessDate": "2026-10-28",
    "verificationStatus": "VERIFIED_MANUFACTURER_SOURCE"
  },
  "procedure": {
    "procedureId": "proc_wire_soldering_western_union_splice",
    "title": "Low-Voltage Wire Splicing & Soldering Training Procedure",
    "taskType": "ASSEMBLY",
    "estimatedTimeMinutes": 15,
    "prerequisites": [
      "Two disconnected, non-energized lengths of 20–24 AWG stranded copper wire",
      "ESD-safe, fire-retardant silicone workstation mat with adequate cross-ventilation",
      "Calibrated 40W–60W soldering iron station preheated to 350°C (660°F)",
      "Protective eye protection donned before handling hot tools"
    ],
    "requiredTools": [
      {
        "toolId": "tool_soldering_iron",
        "name": "Temperature-Controlled Soldering Iron & Stand",
        "specification": "40W–60W station calibrated to 350°C (660°F) with rated safety rest (Weller WE 1 / WEP 70 / PH 70, Doc T0055745804 Rev 08.2023)",
        "isConsumable": false
      },
      {
        "toolId": "tool_solder_wire",
        "name": "SAC305 Lead-Free Rosin-Core Solder Wire",
        "specification": "0.8mm (0.031 in) diameter, 96.5% Sn / 3.0% Ag / 0.5% Cu, Rosin Flux Core (educational maker workshop selection; lead-free alloy reduces heavy-metal material-contact and ingestion concerns compared to leaded alloys; flux fumes require ventilation)",
        "isConsumable": true
      },
      {
        "toolId": "tool_wire_stripper",
        "name": "Precision Wire Strippers",
        "specification": "Calibrated stripping notches for 20–24 AWG stranded wire",
        "isConsumable": false
      },
      {
        "toolId": "tool_heat_shrink",
        "name": "Polyolefin Heat-Shrink Tubing",
        "specification": "3.0mm internal diameter, 2:1 shrink ratio, 25mm length",
        "isConsumable": true
      },
      {
        "toolId": "tool_helping_hands",
        "name": "Helping Hands / Third-Hand Fixture",
        "specification": "Weighted base with dual insulated alligator clamps",
        "isConsumable": false
      },
      {
        "toolId": "tool_tip_cleaner",
        "name": "Brass Wire Tip Cleaner",
        "specification": "Coiled brass wire sponge with housing (or damp cellulose sponge)",
        "isConsumable": false
      },
      {
        "toolId": "tool_heat_gun",
        "name": "Mini Electronics Heat Gun",
        "specification": "Controlled hot air delivery (120°C–150°C)",
        "isConsumable": false
      },
      {
        "toolId": "tool_safety_glasses",
        "name": "Safety Glasses (PPE)",
        "specification": "Suitable protective safety glasses / eye protection",
        "isConsumable": false
      }
    ],
    "phases": [
      {
        "phaseIndex": 0,
        "title": "Pre-Flight Electrical Safety & Tool Purpose Identification",
        "description": "Verify non-energized conductors, don eye protection, and identify workshop tools."
      },
      {
        "phaseIndex": 1,
        "title": "Conductor Stripping & Preparation",
        "description": "Slide heat-shrink tubing, strip insulation without damaging strands, and pre-tin conductor tips per NASA-STD-8739.4 §19.7.1(a)."
      },
      {
        "phaseIndex": 2,
        "title": "Mechanical Splice Formation (Western Union Wrap)",
        "description": "Form interlocking 3-turn Western Union wraps with no gaps, overlaps, or protruding ends per NASA-STD-8739.4 §19.7.1(b)–(d)."
      },
      {
        "phaseIndex": 3,
        "title": "Thermal Joint Soldering & Capillary Wetting",
        "description": "Clean and tin iron tip to form thermal bridge, heat copper conductors, and apply solder directly to workpiece."
      },
      {
        "phaseIndex": 4,
        "title": "Inspection, Heat-Shrink Insulation & Safe Shutdown",
        "description": "Inspect smooth concave wetting fillet, contract heat-shrink tubing with hot air, tin iron tip, and power off station."
      }
    ],
    "steps": [
      {
        "stepId": "step_solder_verify_safety_and_ppe",
        "stepIndex": 0,
        "phaseIndex": 0,
        "title": "Verify Non-Energized Circuit & Put On Safety Glasses",
        "instructionText": "Confirm with 100% certainty that both wire conductors are completely disconnected from any power supply, battery, or energized circuit. Put on suitable protective eye protection before touching any heating tools.",
        "hazardLevel": "DANGER",
        "safetyNotice": "High Electrical and Severe Thermal Hazard: Never perform soldering on energized (live) electrical circuits. Always verify power disconnection and wear suitable eye protection. This procedure is strictly an educational workshop exercise on disconnected, non-energized mock wires and is not certified for mains AC, automotive, or flight hardware.",
        "isBlockingSafetyBarrier": true,
        "requiredToolIds": [
          "tool_safety_glasses"
        ],
        "sourceCitation": {
          "sectionHeading": "Safety Information / Electrical Shock & Burns",
          "pageNumber": 14,
          "diagramReference": null,
          "exactExcerpt": "\"Never work on voltage-carrying parts.\" \"Protect your eyes by wearing eye protection.\" (Weller T0055745804 p. 14, Safety Information). Wearing protective eye protection and confirming circuits are unpowered are mandatory workshop safety rules."
        },
        "trainingExplanation": {
          "whyItMatters": "Soldering an energized wire creates catastrophic short-circuit, arc flash, electrocution, and molten metal expulsion risks. Educational training must strictly be performed on non-energized, disconnected low-voltage copper conductors.",
          "componentInvolved": "20–24 AWG stranded copper wire and workstation circuit state",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": "Why must all electrical power be completely disconnected before starting any wire repair or soldering practice?"
        }
      },
      {
        "stepId": "step_solder_identify_workshop_tools",
        "stepIndex": 1,
        "phaseIndex": 0,
        "title": "Inspect and Identify Workshop Tools",
        "instructionText": "Inspect each workshop tool on the bench: soldering station, safety rest, brass tip cleaner, SAC305 rosin-core solder wire, precision wire strippers, heat-shrink tubing, mini heat gun, and helping hands fixture. Verify the iron tip is clean and securely fastened.",
        "hazardLevel": "INFO",
        "safetyNotice": "Tool Familiarization: Inspect each workshop tool and confirm temperature calibration, safety stand stability, tip cleaner condition, and wire stripper sizing before applying heat.",
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_soldering_iron",
          "tool_solder_wire",
          "tool_wire_stripper",
          "tool_heat_shrink",
          "tool_helping_hands",
          "tool_tip_cleaner",
          "tool_heat_gun",
          "tool_safety_glasses"
        ],
        "sourceCitation": {
          "sectionHeading": "Overview & Operating Elements / Technical Data",
          "pageNumber": 14,
          "diagramReference": "pp. 2–3, Figs. 1–3",
          "exactExcerpt": "[Authoritative Technical Summary] Soldering system configuration comprising WE 1 supply unit, WEP 70 temperature-controlled soldering tool, and PH 70 safety rest with brass cleaning insert (Weller T0055745804 pp. 2–3, 14–16). Auxiliary workshop bench tools (wire strippers, mini heat gun, helping hands) are educational training equipment."
        },
        "trainingExplanation": {
          "whyItMatters": "Each workshop tool serves a critical mechanical or thermal role. Using incorrect stripping notches severs strands, dirty tips impede thermal bridging, and lack of helping hands leads to unstable, defective solder joints.",
          "componentInvolved": "Workshop toolset (soldering station, brass cleaner, strippers, third-hand fixture, solder wire)",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": "What is the primary function of the brass wire sponge compared to a wet cellulose sponge?"
        }
      },
      {
        "stepId": "step_solder_slide_heat_shrink",
        "stepIndex": 2,
        "phaseIndex": 1,
        "title": "Slide Heat-Shrink Tubing onto Wire A Prior to Splicing",
        "instructionText": "Select a 25mm length of 3.0mm polyolefin heat-shrink tubing. Slide it onto one of the two wires (Wire A) and push it at least 75mm (3 inches) back from the stripped end so radiant soldering heat does not prematurely shrink the sleeve.",
        "hazardLevel": "INFO",
        "safetyNotice": "Positioning Precaution: Slide the heat-shrink tubing at least 75mm (3 inches) away from the stripped wire end to prevent radiant iron heat from prematurely shrinking the tubing.",
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_heat_shrink"
        ],
        "sourceCitation": {
          "sectionHeading": "19.2 Splices - General Requirements",
          "pageNumber": 78,
          "diagramReference": "Fig. 19-4",
          "exactExcerpt": "[Authoritative Technical Summary] Splice encapsulation requirement: \"The tubing or insulation used for splices shall completely encapsulate the splice body...\" (NASA-STD-8739.4A §19.2.6). Pre-positioning sleeving 75mm back on the wire prior to mechanical splice wrapping is an educational workshop sequencing practice for permanent splices, not a verbatim procedural mandate of the standard."
        },
        "trainingExplanation": {
          "whyItMatters": "Once two wires are spliced and soldered, a closed tubular insulation sleeve cannot be slipped over the junction. Installing it first and keeping it clear of the heat zone ensures proper post-solder insulation.",
          "componentInvolved": "Polyolefin 3mm heat-shrink tubing and wire insulation jacket",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": "Why must heat-shrink tubing be slid onto the wire before forming the mechanical splice?"
        }
      },
      {
        "stepId": "step_solder_strip_insulation",
        "stepIndex": 3,
        "phaseIndex": 1,
        "title": "Strip Insulation from Both Wire Ends (20–24 AWG)",
        "instructionText": "Using the calibrated notch matching your wire gauge (20, 22, or 24 AWG), strip 12mm to 15mm (approximately 0.5 inches) of insulation from the ends of both wires. Inspect the exposed strands to ensure zero strands are nicked or cut. Lightly twist the strands clockwise to restore the factory lay.",
        "hazardLevel": "NONE",
        "safetyNotice": null,
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_wire_stripper"
        ],
        "sourceCitation": {
          "sectionHeading": "10.1 Stripping Round Conductors",
          "pageNumber": 48,
          "diagramReference": null,
          "exactExcerpt": "\"After removal of the conductor insulation, the conductor shall not be nicked, cut, or scraped to the point that base metal is exposed.\" (NASA-STD-8739.4A §10.1.1(d)). \"The lay of wire strands shall be restored as nearly as possible to the original lay if disturbed.\" (§10.1.1(f)). Strip length of 12–15mm is an educational engineering specification suited to 3 Western Union wraps of 20–24 AWG wire."
        },
        "trainingExplanation": {
          "whyItMatters": "Nicking or cutting copper strands reduces conductor cross-sectional current capacity and introduces localized stress points prone to vibration fatigue breakage. Restoring the spiral lay prevents stray frayed strands.",
          "componentInvolved": "20–24 AWG stranded copper conductor strands and wire stripper cutting die",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": "What physical defect must you inspect for immediately after stripping stranded wire?"
        }
      },
      {
        "stepId": "step_solder_pre_tin_conductors",
        "stepIndex": 4,
        "phaseIndex": 1,
        "title": "Pre-Tin Individual Stranded Conductors Prior to Splicing",
        "instructionText": "Secure each stripped wire individually in the helping hands clamp. Wipe the heated iron tip on the brass sponge. Apply the flat face of the tinned iron tip against the bare strands and touch solder wire to the conductors until a thin, uniform coating of solder penetrates the outer strands. Ensure the tinned strands remain flexible and no heavy solder lumps form.",
        "hazardLevel": "CAUTION",
        "safetyNotice": "Thermal Burn Hazard: Hot soldering iron tip (350°C / 660°F) and molten solder present burn hazards. Support wire in helping hands clamp and avoid skin contact.",
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_soldering_iron",
          "tool_solder_wire",
          "tool_helping_hands",
          "tool_tip_cleaner",
          "tool_safety_glasses"
        ],
        "sourceCitation": {
          "sectionHeading": "19.7.1 Soldered Western Union/Lineman Splice",
          "pageNumber": 82,
          "diagramReference": "Fig. 19-15",
          "exactExcerpt": "\"The conductors shall be pre-tinned.\" (NASA-STD-8739.4A §19.7.1(a))."
        },
        "trainingExplanation": {
          "whyItMatters": "NASA-STD-8739.4A §19.7.1(a) requires conductors to be pre-tinned prior to splice wrapping. As an educational explanation of this requirement: pre-tinning coats individual wire strands with alloy and flux, which helps prevent loose strands from separating ('bird-caging') during manual wrapping and facilitates rapid heat transfer during final joint soldering.",
          "componentInvolved": "Bare stranded copper conductor tips, solder flux core, and soldering iron tip",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": "Why does NASA-STD-8739.4A require conductors to be pre-tinned before wrapping a Western Union splice?"
        }
      },
      {
        "stepId": "step_solder_form_western_union_splice",
        "stepIndex": 5,
        "phaseIndex": 2,
        "title": "Form Interlocking Western Union Mechanical Splice",
        "instructionText": "Cross the two pre-tinned conductor ends at right angles approximately one-third of the way from the insulation. Tightly wrap each conductor end around the opposing straight conductor for a minimum of 3 complete helical turns. Ensure turns are tightly packed without gaps or overlaps. Trim any excess conductor wire flush against the core with flush cutters to eliminate sharp protruding ends.",
        "hazardLevel": "NONE",
        "safetyNotice": null,
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_helping_hands"
        ],
        "sourceCitation": {
          "sectionHeading": "19.7.1 Soldered Western Union/Lineman Splice",
          "pageNumber": 82,
          "diagramReference": "Fig. 19-17",
          "exactExcerpt": "\"There shall be at least 3 turns around each conductor and the wraps shall be tight with no gaps between adjacent turns...\" (NASA-STD-8739.4A §19.7.1(b)). \"The wraps shall not overlap and the ends of the wrap shall be trimmed flush prior to soldering to prevent protruding ends.\" (§19.7.1(c))."
        },
        "trainingExplanation": {
          "whyItMatters": "The Western Union wrap provides 100% of the mechanical tensile strength of the splice. Solder is an electrical conductor, not a structural glue. Tight wraps prevent tensile failure and flush ends prevent puncturing heat-shrink insulation.",
          "componentInvolved": "Pre-tinned copper conductor helical wraps and flush-trimmed wire ends",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": "How many complete turns are required on each side of a Western Union splice according to NASA-STD-8739.4?"
        }
      },
      {
        "stepId": "step_solder_clamp_and_tin_iron",
        "stepIndex": 6,
        "phaseIndex": 3,
        "title": "Clamp Splice in Helping Hands & Prepare Iron Tip Thermal Bridge",
        "instructionText": "Clamp the completed mechanical Western Union splice horizontally in the insulated alligator clips of the helping hands fixture. Wipe the heated iron tip through the coiled brass wire cleaner. Immediately apply a small bead of fresh rosin-core solder to the tip face to establish an active liquid thermal bridge.",
        "hazardLevel": "CAUTION",
        "safetyNotice": "Thermal Burn Hazard: Soldering iron tip operates at 350°C (660°F). Always hold tool by insulated grip and keep helping hands firmly weighted.",
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_soldering_iron",
          "tool_solder_wire",
          "tool_helping_hands",
          "tool_tip_cleaner",
          "tool_safety_glasses"
        ],
        "sourceCitation": {
          "sectionHeading": "Soldering - Handling the Soldering Tips",
          "pageNumber": 15,
          "diagramReference": null,
          "exactExcerpt": "\"Coat the soldering tip well with solder to ensure that there is efficient heat transfer between the soldering tip and the soldering area.\" (Weller T0055745804 p. 15, Handling the soldering tips). Helping hands clamping and thermal bridging are workshop application techniques."
        },
        "trainingExplanation": {
          "whyItMatters": "Clean metallic contact between tip and copper is impeded by surface oxidation. A small bead of molten solder creates a liquid thermal bridge that dramatically increases contact surface area, conducting heat into the wire core within seconds.",
          "componentInvolved": "Soldering iron tip, brass wire wool, and alligator clamp heat sinks",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": "What is a 'thermal bridge' in soldering and how does it prevent joint overheating?"
        }
      },
      {
        "stepId": "step_solder_heat_and_feed",
        "stepIndex": 7,
        "phaseIndex": 3,
        "title": "Heat Workpiece and Flow Solder into Mechanical Splice",
        "instructionText": "Place the tinned iron tip against the underside of the wrapped splice joint. Wait approximately 1 to 2 seconds for the copper to absorb heat, then touch the solder wire to the top of the heated wraps opposite the iron tip (NOT directly against the iron tip). Allow solder to melt and flow through the helical wraps by capillary action for 2 to 3 seconds until all wraps are wetted. Remove solder wire first, then immediately lift the iron tip away.",
        "hazardLevel": "CAUTION",
        "safetyNotice": "Molten Solder & Chemical Flux Fume Hazard: Workpiece reaches 350°C. Rosin flux produces irritating vapors. Ensure cross-ventilation or bench fume extraction. Never inhale smoke directly.",
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_soldering_iron",
          "tool_solder_wire",
          "tool_helping_hands",
          "tool_safety_glasses"
        ],
        "sourceCitation": {
          "sectionHeading": "Handling the Soldering Tips / Western Union Solder Flow",
          "pageNumber": 15,
          "diagramReference": "Fig. 19-18",
          "exactExcerpt": "\"Apply solder directly to the soldering area, not to the soldering tip.\" (Weller T0055745804 p. 15). Solder flow requirement: \"Solder shall wet all elements of the connection. The solder shall fillet between connection elements over the complete periphery of the connection...\" (NASA-STD-8739.4A §19.7.1(f)–(g), p. 83). Molten alloy flows through helical wraps by capillary action (physical principle)."
        },
        "trainingExplanation": {
          "whyItMatters": "Applying solder directly to the heated workpiece proves the copper has achieved wetting temperature. Capillary action pulls molten alloy into interstitial crevices between wire strands. Note on solder alloy: SAC305 (96.5% Sn, 3.0% Ag, 0.5% Cu) rosin-core is an educational maker training selection to reduce heavy-metal material contact and ingestion concerns during beginner practice, contrasting with NASA aerospace flight specifications that historically mandated tin-lead Sn60/Pb40 or Sn63/Pb37. Note that thermal flux fumes arise from both leaded and lead-free soldering, so active bench ventilation and eye protection remain mandatory regardless of alloy choice. This procedure is strictly an educational workshop exercise on disconnected, non-energized mock wires and is not certified for mains AC, automotive, or flight hardware.",
          "componentInvolved": "Western Union splice wraps, SAC305 rosin-core solder wire, and soldering iron tip",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": "Why must solder wire be applied directly to the heated copper joint rather than directly to the soldering iron tip?"
        }
      },
      {
        "stepId": "step_solder_cool_and_inspect",
        "stepIndex": 8,
        "phaseIndex": 4,
        "title": "Allow Natural Cooling & Inspect Solder Fillet Workmanship",
        "instructionText": "Allow the joint to cool completely undisturbed in the helping hands clamp for at least 20 seconds. Do not move the wires or blow air across the joint. Inspect the solidified solder: it must exhibit a smooth, shiny, concave wetting fillet across all wraps, with the individual outlines of the wrapped turns clearly discernible. Reject any joint showing dull crystalline texture, voids, sharp solder icicles, or excess blob buildup.",
        "hazardLevel": "INFO",
        "safetyNotice": "Burn and Disturbed Joint Caution: Allow joint to cool naturally for 20–30 seconds. Do not blow air on the joint or disturb the wires during solidification.",
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_safety_glasses"
        ],
        "sourceCitation": {
          "sectionHeading": "13.6 Inspection Criteria & General Requirements",
          "pageNumber": 72,
          "diagramReference": null,
          "exactExcerpt": "\"The appearance of the solder joint surface shall be smooth, nonporous, undisturbed...\" (NASA-STD-8739.3 §13.6.1(a), p. 72). \"Solder shall wet all elements of the connection... The solder shall fillet between connection elements over the complete periphery of the connection...\" (§13.6.1(b)). \"Connections shall be cooled at room temperature only.\" (§10.1.4, p. 62). Rejection criteria include fractured or disturbed connections, poor wetting, and excessive or insufficient solder (§13.6.2(b), p. 74)."
        },
        "trainingExplanation": {
          "whyItMatters": "Disturbing or rapidly cooling a joint while the alloy transitions through its plastic phase creates microscopic crystallization cracks known as a 'cold' or 'disturbed' joint, leading to intermittent continuity and high resistance. Retaining visible wire contour proves optimal solder volume without thermal over-accumulation.",
          "componentInvolved": "Soldered Western Union splice and crystalline solder alloy matrix",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": "What visual characteristic distinguishes an acceptable solder joint from an oversoldered joint?"
        }
      },
      {
        "stepId": "step_solder_contract_heat_shrink",
        "stepIndex": 9,
        "phaseIndex": 4,
        "title": "Slide and Contract Heat-Shrink Tubing with Controlled Hot Air",
        "instructionText": "Once the soldered splice has fully cooled to ambient room temperature, slide the polyolefin heat-shrink tubing forward and center it over the splice. Confirm the tubing extends onto the original wire insulation on each side by at least two wire diameters of the largest wire in the splice, using our workshop guideline of 6.35mm (0.25 inches) for clear visual verification. Turn on the mini heat gun (calibrated to 120°C–150°C) and sweep the hot air stream back and forth evenly along the tubing until it contracts snugly and smoothly around the splice with zero wrinkles or voids.",
        "hazardLevel": "CAUTION",
        "safetyNotice": "Thermal Burn Hazard: Hot air stream (120°C–150°C) and heated tubing present thermal burn hazards. Keep hands clear of hot air exhaust. Never use an open flame or direct soldering iron tip to shrink tubing.",
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_heat_shrink",
          "tool_heat_gun",
          "tool_safety_glasses"
        ],
        "sourceCitation": {
          "sectionHeading": "19.2 Splices - General Requirements",
          "pageNumber": 78,
          "diagramReference": "Fig. 19-4",
          "exactExcerpt": "\"The tubing or insulation used for splices shall completely encapsulate the splice body and extend over the wires’ insulation a minimum of two times (2X) the diameter of the largest wire in the splice.\" (NASA-STD-8739.4A §19.2.6). Extending the tubing by 6.35 mm (0.25 inch) onto the insulation is an educational workshop choice adopted for simple visual measurement, rather than a verbatim NASA dimensional figure."
        },
        "trainingExplanation": {
          "whyItMatters": "Insulation sleeving restores dielectric isolation and provides environmental protection and mechanical bend relief. Using an open flame or direct iron contact burns and perforates the polyolefin wall, compromising electrical safety.",
          "componentInvolved": "Polyolefin 2:1 heat-shrink tubing, mini heat gun, and original wire insulation jackets",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": "By what minimum distance must heat-shrink tubing overlap the original wire insulation on each side of the splice?"
        }
      },
      {
        "stepId": "step_solder_safe_shutdown",
        "stepIndex": 10,
        "phaseIndex": 4,
        "title": "Tin Tip, Return Iron to Safety Stand & Safe Power Down",
        "instructionText": "Wipe the iron tip on the brass sponge and apply a fresh, generous bead of solder over the entire working face to seal the nickel-iron plating against atmospheric oxygen. Place the iron securely in its rated safety rest. Switch off the station power switch and disconnect the plug. Allow the tool to cool fully to ambient room temperature while securely seated in its safety rest before packing away.",
        "hazardLevel": "INFO",
        "safetyNotice": "Workspace Safety: Soldering iron remains hot after switching off. Always ensure tip is tinned and securely seated in its rated safety rest until fully cooled before leaving bench or storing.",
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_soldering_iron",
          "tool_solder_wire",
          "tool_safety_glasses"
        ],
        "sourceCitation": {
          "sectionHeading": "Safety Information / Handling the Soldering Tips",
          "pageNumber": 14,
          "diagramReference": null,
          "exactExcerpt": "\"Always place the soldering tool in the safety rest while not in use.\" (Weller T0055745804 p. 14). \"Coat the tip with solder prior to storage if you do not intend to use the soldering iron for an extended period of time.\" (p. 15). \"Leave the switched off soldering iron in the safety rest for at least 3 minutes until it has cooled down before packing away.\" (p. 16). In this workshop procedure, the tool is switched off, kept securely in its safety rest, and allowed to cool fully to ambient room temperature before packing away."
        },
        "trainingExplanation": {
          "whyItMatters": "Leaving a protective sacrificial solder coat on the tip prevents tip de-wetting and corrosive oxidation during cooling. Returning the iron to the safety stand prevents accidental bench fires or serious third-degree contact burns.",
          "componentInvolved": "Soldering iron tip plating, safety rest stand, and main AC power switch",
          "explanationOrigin": "DOMAIN_EXPERT_INFERRED",
          "knowledgeCheckQuestion": "Why must a fresh coat of solder be applied to the iron tip immediately before turning off the power?"
        }
      }
    ],
    "completionCheck": {
      "finalCondition": "Two 20–24 AWG stranded copper wires joined with an inspected 3-turn Western Union wrap, pre-tinned and capillary-soldered with concave wetting fillet, fully insulated inside heat-shrink tubing overlapping original insulation by >6.35mm, with soldering station tinned, switched off, and cooled in its safety stand.",
      "safetyVerificationText": "Verify soldering station power is switched OFF, the iron tip is seated in the metal safety stand and cooled to ambient temperature, the soldered workpiece is cold to the touch, and all workshop consumables are safely stored."
    }
  }
};

export const CORRUPT_TEST_PROCEDURE: any = {
  "schemaVersion": "1.0.0",
  "manualId": "corrupt_adversarial_test",
  "appliance": {
    "brand": "TestBrand",
    "modelName": "CorruptTestAppliance",
    "modelNumber": "ERR-999",
    "deviceCategory": "Test Fixture",
    "compatibleModels": [
      "ERR-999"
    ]
  },
  "sourceDocument": {
    "title": "Adversarial Corrupt Fixture for Failure State Verification",
    "publisher": "FixWhat QA Test Harness",
    "documentCode": "TEST_ERR_999",
    "url": "https://example.com/test",
    "accessDate": "2026-10-28",
    "verificationStatus": "UNVERIFIED"
  },
  "procedure": {
    "procedureId": "corrupt_test_procedure",
    "title": "Corrupt Procedure with Broken Index Sequence & Missing Citations",
    "taskType": "Verification Test",
    "estimatedTimeMinutes": 5,
    "prerequisites": [
      "None"
    ],
    "requiredTools": [
      {
        "toolId": "tool_valid_wrench",
        "name": "Test Wrench",
        "specification": "10mm",
        "isConsumable": false
      }
    ],
    "phases": [
      {
        "phaseIndex": 0,
        "phaseId": "phase_corrupt",
        "title": "Corrupted Phase"
      }
    ],
    "steps": [
      {
        "stepId": "step_corrupt_0",
        "stepIndex": 0,
        "phaseIndex": 0,
        "title": "Step With Unregistered Tool Reference",
        "instructionText": "This step references an unregistered tool to trigger validation rejection.",
        "hazardLevel": "NONE",
        "safetyNotice": null,
        "isBlockingSafetyBarrier": false,
        "requiredToolIds": [
          "tool_unregistered_laser"
        ],
        "sourceCitation": {
          "sectionHeading": "Test Section",
          "pageNumber": 1,
          "diagramReference": null,
          "exactExcerpt": "Test citation excerpt."
        }
      },
      {
        "stepId": "step_corrupt_1",
        "stepIndex": 99,
        "phaseIndex": 0,
        "title": "Step With Non-Sequential Step Index",
        "instructionText": "This step has a non-sequential step index (expected 1, got 99).",
        "hazardLevel": "CAUTION",
        "safetyNotice": "",
        "isBlockingSafetyBarrier": true,
        "requiredToolIds": [],
        "sourceCitation": {
          "sectionHeading": "Test Section",
          "pageNumber": 2,
          "diagramReference": null,
          "exactExcerpt": "Test citation excerpt."
        }
      }
    ],
    "completionCheck": "Test completion check."
  }
};
