/**
 * LeafIndex.ts
 * LEAF Scenario Index Registration for FixWhat? AR
 * Authoritative Index registering all 8 authorized test scenarios (FW-01 baseline + FW-02 extensions)
 */

import { scenariosIndex } from "Leaf.lspkg/Scenarios/decorator/ScenarioIndexDecorator";
import { ScenarioMetadata } from "Leaf.lspkg/Scenarios/scenario/ScenarioMetadata";
import { FixWhatStartupScenario } from "./FixWhatStartupScenario";
import { FixWhatRemoteJourneyScenario } from "./FixWhatRemoteJourneyScenario";
import { FixWhatWorkshopSafetyScenario } from "./FixWhatWorkshopSafetyScenario";
import { FixWhatWorkshopJourneyScenario } from "./FixWhatWorkshopJourneyScenario";
import { FixWhatNavigationRecoveryScenario } from "./FixWhatNavigationRecoveryScenario";
import { FixWhatConsumerScopeScenario } from "./FixWhatConsumerScopeScenario";
import { FixWhatGatewayScenario } from "./FixWhatGatewayScenario";
import { FixWhatCatalogueScenario } from "./FixWhatCatalogueScenario";

@component
export class LeafIndex extends BaseScriptComponent {
  @scenariosIndex
  static scenariosIndex: ScenarioMetadata[] = [
    {
      id: "fixwhat-startup-scenario",
      typename: FixWhatStartupScenario.getTypeName(),
    },
    {
      id: "fixwhat-remote-journey-scenario",
      typename: FixWhatRemoteJourneyScenario.getTypeName(),
    },
    {
      id: "fixwhat-consumer-scope-scenario",
      typename: FixWhatConsumerScopeScenario.getTypeName(),
    },
    {
      id: "fixwhat-workshop-safety-scenario",
      typename: FixWhatWorkshopSafetyScenario.getTypeName(),
    },
    {
      id: "fixwhat-workshop-journey-scenario",
      typename: FixWhatWorkshopJourneyScenario.getTypeName(),
    },
    {
      id: "fixwhat-navigation-recovery-scenario",
      typename: FixWhatNavigationRecoveryScenario.getTypeName(),
    },
    {
      id: "fixwhat-gateway-scenario",
      typename: FixWhatGatewayScenario.getTypeName(),
    },
    {
      id: "fixwhat-catalogue-scenario",
      typename: FixWhatCatalogueScenario.getTypeName(),
    },
  ];
}
