// import { Partition } from "../DataModels/Partition";
// import { CommandHandler } from "./command";

// export class PartitionCommandHandler extends CommandHandler {
//   constructor(private partition: Partition) {
//     super();

//     this.commands = [
//       {
//         name: 'Get-ServiceFabricPartition',
//         command: `Get-ServiceFabricPartition -PartitionId ${this.partition.id}`,
//         description: 'Gets information about the partitions of a specified Service Fabric partition.'
//       },
//       {
//         name: 'Restart the primary replica',
//         command: `Restart-ServiceFabricReplica -ReplicaKindPrimary -PartitionId ${this.partition.id}`,
//         description: 'Gets information about the partitions of a specified Service Fabric partition.'
//       },
//     ]
//   }
// }
