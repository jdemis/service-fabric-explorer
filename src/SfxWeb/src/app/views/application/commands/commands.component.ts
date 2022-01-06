import { Component, Injector, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { IResponseMessageHandler } from 'src/app/Common/ResponseMessageHandlers';
import { ApplicationCommandHandler } from 'src/app/Models/powershellCommands/application.command';
import { CommandHandler } from 'src/app/Models/powershellCommands/command';
import { DataService } from 'src/app/services/data.service';
import { ApplicationBaseControllerDirective } from '../applicationBase';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent extends ApplicationBaseControllerDirective  {

  commandHandler: CommandHandler;

  constructor(protected data: DataService, injector: Injector) {
    super(data, injector);
  }

  refresh(messageHandler?: IResponseMessageHandler){
    this.commandHandler = new ApplicationCommandHandler(this.app);

    return of(null);
  }
}
