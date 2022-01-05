import { Component, Input, OnInit } from '@angular/core';
import { CommandHandler } from 'src/app/Models/powershellCommands/command';

@Component({
  selector: 'app-ps-command-viewer',
  templateUrl: './ps-command-viewer.component.html',
  styleUrls: ['./ps-command-viewer.component.scss']
})
export class PsCommandViewerComponent implements OnInit {

  @Input() commandHandler: CommandHandler;

  constructor() { }

  ngOnInit(): void {
    // this.commandHandler.commands
  }

}
