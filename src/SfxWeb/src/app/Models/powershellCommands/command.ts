export interface ICommandInput {
  replaceText: string;
  displayName: string;
  options?: string[];
}

export interface ICommand {
  name: string;
  command: string;
  description: string;
  inputs?: ICommandInput[];
  link?: string;
}

export class CommandHandler {
  public commands: ICommand[] = [];
}


export const healthReportCommand = (name: string, description: string, prefix: string): ICommand => {
  return {
    name,
    command: `${prefix} -HealthState <HealthState> -SourceId <SourceId> -HealthProperty <hp> `,
    description,
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
  }
}
