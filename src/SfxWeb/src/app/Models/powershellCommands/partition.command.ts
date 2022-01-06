import { Partition } from "../DataModels/Partition";
import { CommandHandler, healthReportCommand } from "./command";

export class PartitionCommandHandler extends CommandHandler {
  constructor(private partition: Partition) {
    super();

    this.commands = [
      {
        name: 'Get-ServiceFabricPartition',
        command: `Get-ServiceFabricPartition -PartitionId ${this.partition.id}`,
        description: 'Gets information about the partitions of a specified Service Fabric partition.'
      },
      {
        name: 'Restart the primary replica',
        command: `Restart-ServiceFabricReplica -ReplicaKindPrimary -PartitionId ${this.partition.id} -ServiceName ${this.partition.parent.name}`,
        description: 'Gets information about the partitions of a specified Service Fabric partition.'
      },
      healthReportCommand('Send-ServiceFabricPartitionHealthReport',
      'Sends a health report on a Service Fabric service partition.',
      `Send-ServiceFabricPartitionHealthReport -PartitionId ${this.partition.id}`)
    ]
  }
}
