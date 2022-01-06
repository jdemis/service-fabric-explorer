import { Component, Injector, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { IResponseMessageHandler } from 'src/app/Common/ResponseMessageHandlers';
import { CommandHandler } from 'src/app/Models/powershellCommands/command';
import { ServiceCommandHandler } from 'src/app/Models/powershellCommands/service.command';
import { DataService } from 'src/app/services/data.service';
import { ServiceBaseControllerDirective } from '../ServiceBase';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent extends ServiceBaseControllerDirective {

  commandHandler: CommandHandler;

  constructor(protected data: DataService, injector: Injector) {
    super(data, injector);
  }

  refresh(messageHandler?: IResponseMessageHandler){
    this.commandHandler = new ServiceCommandHandler(this.service);

    return of(null);
  }
}
