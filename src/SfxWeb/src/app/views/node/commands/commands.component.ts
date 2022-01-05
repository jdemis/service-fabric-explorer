import { Component, Injector, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { IResponseMessageHandler } from 'src/app/Common/ResponseMessageHandlers';
import { NodeCommands } from 'src/app/Models/powershellCommands/node.command';
import { DataService } from 'src/app/services/data.service';
import { NodeBaseControllerDirective } from '../NodeBase';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent extends NodeBaseControllerDirective {

  commandHandler;

  constructor(protected data: DataService, injector: Injector) {
    super(data, injector);
  }

  setup() {
    console.log(this)
    // this.commandHandler = new NodeCommands(this.node);
  }

  refresh(messageHandler?: IResponseMessageHandler){
    this.commandHandler = new NodeCommands(this.node);

    return of(null);
  }
}

