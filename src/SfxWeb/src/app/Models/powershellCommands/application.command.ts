import { Application } from "../DataModels/Application";
import { CommandHandler, healthReportCommand } from "./command";

export class ApplicationCommandHandler extends CommandHandler {
  constructor(private app: Application) {
    super();

    this.commands = [
      {
        name: 'Get-ServiceFabricApplication',
        command: `Get-ServiceFabricApplication ${this.appNameFlag}`,
        description: 'Gets the specific application from the cluster.'
      },
      {
        name: 'Get-ServiceFabricApplicationHealth',
        command: `Get-ServiceFabricApplicationHealth ${this.appNameFlag}`,
        description: 'Gets the health of a Service Fabric application'
      },

      healthReportCommand('Send-ServiceFabricApplicationHealthReport',
      'Sends a health report on a Service Fabric service application.',
      `Send-ServiceFabricApplicationHealthReport ${this.appNameFlag}`),
    ]
  }

  get appNameFlag() {
    return `-ApplicationName ${this.app.id}`;
  }
}
