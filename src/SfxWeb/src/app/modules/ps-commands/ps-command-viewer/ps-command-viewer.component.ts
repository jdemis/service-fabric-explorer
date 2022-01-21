import { Component, Input, OnInit } from '@angular/core';
import { CommandHandler, ICommand } from 'src/app/Models/powershellCommands/command';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ps-command-viewer',
  templateUrl: './ps-command-viewer.component.html',
  styleUrls: ['./ps-command-viewer.component.scss']
})
export class PsCommandViewerComponent implements OnInit {

  @Input() commandHandler: CommandHandler;

  connectToCluster: ICommand = {
    name: "Connect-ServiceFabricCluster",
    command: 'Connect-ServiceFabricCluster',
    description: 'Connecting to a service fabric cluster is required before performing any of the following operations.',
    link: 'https://docs.microsoft.com/en-us/powershell/module/servicefabric/connect-servicefabriccluster'
  }

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getClusterManifest().subscribe(manifest => {

    })
  }

  trackByFn(index, command: ICommand) {
    return command.command;
  }

}
