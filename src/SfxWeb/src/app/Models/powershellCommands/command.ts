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
