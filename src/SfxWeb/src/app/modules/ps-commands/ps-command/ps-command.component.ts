import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ICommand, ICommandInput } from 'src/app/Models/powershellCommands/command';

@Component({
  selector: 'app-ps-command',
  templateUrl: './ps-command.component.html',
  styleUrls: ['./ps-command.component.scss']
})
export class PsCommandComponent implements OnChanges {

  @Input() command: ICommand;

  commandText: string = "";

  inputValues = {};

  constructor() { }


  ngOnChanges(): void {
    if(this.command.inputs) {
      let newMap = this.getInputMap();
      this.inputValues = {...newMap, ...this.inputValues};
      this.updateText();
    }else{
      this.commandText = this.command.command;
    }
  }

  getInputMap() {
    return this.command.inputs.reduce( (map, input) => {map[input.displayName] = " "; return map}, {});
  }

  updateText() {
    let newCommandText = this.command.command;

    this.command.inputs.forEach(input => {
      newCommandText =  newCommandText.replace(input.replaceText, this.inputValues[input.displayName]);
    });

    this.commandText = newCommandText;
  }

  reset() {
    this.inputValues =  this.getInputMap();
    this.updateText();
  }

}
