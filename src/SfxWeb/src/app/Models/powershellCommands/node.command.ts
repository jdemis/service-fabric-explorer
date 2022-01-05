import { Node } from "../DataModels/Node";
import { CommandHandler } from "./command";

export class NodeCommands extends CommandHandler {
  constructor(private node: Node) {
    super();

    this.commands = [
      {
        name: 'Get-ServiceFabricNode',
        command: `Get-ServiceFabricNode  -NodeName "${this.node.name}" `,
        description: 'Gets information for a specific node.'
      },
      {
        name: 'Get-ServiceFabricNodeHealth',
        command: `Get-ServiceFabricNodeHealth -NodeName "${this.node.name}" `,
        description: 'Gets the health state of a Service Fabric node.'
      },
      {
        name: 'Restart-ServiceFabricNode',
        command: `Restart-ServiceFabricNode -NodeName "${this.node.name}"`,
        description: 'restart the node.'
      },
      {
        name: 'Disable-ServiceFabricNode Intent Restart',
        command: `Disable-ServiceFabricNode -NodeName "${this.node.name}" -Intent Restart `,
        description: 'Disables a Service Fabric node.'
      },
      {
        name: 'Send-ServiceFabricPartitionHealthReport',
        command: `Send-ServiceFabricPartitionHealthReport -NodeName "${this.node.name}"  -HealthState <HealthState> -SourceId <SourceId> -HealthProperty <hp> `,
        description: 'Disables a Service Fabric node.',
        inputs: [
          {
            displayName: 'Health State',
            replaceText: "<HealthState>"
          },
          {
            displayName: 'Source Id',
            replaceText: "<SourceId>"
          },
          {
            displayName: 'Health Property',
            replaceText: "<hp>",
            options: [
              "Error",
              "Warning",
              "Ok"
            ]
          }
        ],
      },
    ]
  }
}
