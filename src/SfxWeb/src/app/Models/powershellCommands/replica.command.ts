import { Node } from "../DataModels/Node";
import { ReplicaOnPartition } from "../DataModels/Replica";
import { CommandHandler } from "./command";

export class ReplicaCommandHandler extends CommandHandler {
  constructor(private replica: ReplicaOnPartition) {
    super();

    this.commands = [
      {
        name: 'Get-ServiceFabricReplica',
        command: `Get-ServiceFabricReplica -PartitionId ${replica.parent.id} -ReplicaOrInstanceId ${replica.id}`,
        description: 'Gets Service Fabric replicas of a partition.'
      },
      {
        name: 'Restart-ServiceFabricReplica',
        command: `Restart-ServiceFabricReplica -NodeName "${replica.raw.NodeName}" -PartitionId ${replica.parent.id} -ReplicaOrInstanceId ${replica.id}`,
        description: 'Restarts a Service Fabric replica to simulate the reopening of a stateful service replica'
      },
      {
        name: 'Remove-ServiceFabricReplica',
        command: `Remove-ServiceFabricReplica -NodeName "${replica.raw.NodeName}" -PartitionId ${replica.parent.id} -ReplicaOrInstanceId ${replica.id}`,
        description: 'The Remove-ServiceFabricReplica cmdlet simulates a Service Fabric replica failure by removing a replica from a Service Fabric cluster. The removal closes the replica, transitions the replica to the role None, and then removes all of the state information of the replica from the cluster. This cmdlet tests the replica state removal path, and simulates the report fault permanent path through client APIs.'
      },
      {
        name: 'Get-ServiceFabricDeployedReplica',
        command: `Get-ServiceFabricDeployedReplica -NodeName "${this.replica.raw.NodeName}" -ApplicationName ${this.replica.parent.parent.parent.name} `,
        description: 'Gets information about a Service Fabric replica on a node.'
      },
      {
        name: 'Get-ServiceFabricDeployedReplicaDetail',
        command: `Get-ServiceFabricDeployedReplicaDetail -NodeName "${replica.raw.NodeName}" -PartitionId ${replica.parent.id} -ReplicaOrInstanceId ${replica.id}`,
        description: 'Gets information about Service Fabric replicas from a host process. To also get Replicator information include the -ReplicatorDetail flag'
      },
    ]
  }
}
