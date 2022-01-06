import { Component, Injector, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { IResponseMessageHandler } from 'src/app/Common/ResponseMessageHandlers';
import { CommandHandler } from 'src/app/Models/powershellCommands/command';
import { ReplicaCommandHandler } from 'src/app/Models/powershellCommands/replica.command';
import { DataService } from 'src/app/services/data.service';
import { ReplicaBaseControllerDirective } from '../ReplicaBase';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent extends ReplicaBaseControllerDirective {

  commandHandler: CommandHandler;

  constructor(protected data: DataService, injector: Injector) {
    super(data, injector);
  }

  refresh(messageHandler?: IResponseMessageHandler){
    this.commandHandler = new ReplicaCommandHandler(this.replica);

    return of(null);
  }
}
