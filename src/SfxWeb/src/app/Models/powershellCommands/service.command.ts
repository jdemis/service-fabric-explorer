import { Service } from "../DataModels/Service";
import { CommandHandler, healthReportCommand } from "./command";

export class ServiceCommandHandler extends CommandHandler {
  constructor(private service: Service) {
    super();

    this.commands = [
      {
        name: 'Get-ServiceFabricService',
        command: `Get-ServiceFabricService ${this.serviceNameFlag}`,
        description: 'Gets the specific Service from the cluster.'
      },
      {
        name: 'Get-ServiceFabricServiceHealth',
        command: `Get-ServiceFabricServiceHealth ${this.serviceNameFlag}`,
        description: 'Gets the health of a Service Fabric service'
      },

      healthReportCommand('Send-ServiceFabricServiceHealth',
      'Sends a health report on a Service Fabric service.',
      `Send-ServiceFabricServiceHealth ${this.serviceNameFlag}`),
    ]
  }

  get serviceNameFlag() {
    return `-ServiceName ${this.service.id} -ApplicationName ${this.service.parent.name}`;
  }
}
