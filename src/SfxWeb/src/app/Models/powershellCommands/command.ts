export enum CommandSafety {
  Safe = "Safe",
  Warning = "Potential Harm",
  Danger = "Dangerous"
}

export interface ICommandInput {
  replaceText: string;
  displayName: string;
  options?: string[];
  safety?: CommandSafety;
  adminRequired?: boolean;
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
        displayName: 'Health Property',
        replaceText: "<hp>"
      },
      {
        displayName: 'Source Id',
        replaceText: "<SourceId>"
      },
      {
        displayName: 'Health State',
        replaceText: "<HealthState>",
        options: [
          "Error",
          "Warning",
          "Ok"
        ]
      }
    ],
  }
}
