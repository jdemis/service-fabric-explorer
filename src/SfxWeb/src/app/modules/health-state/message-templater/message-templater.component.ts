import { Component, OnInit } from '@angular/core';
import { HealthEvaluation } from 'src/app/Models/DataModels/Shared';
import { ListColumnSetting } from 'src/app/Models/ListSettings';
import { IRawNodeHealthEvluation } from 'src/app/Models/RawDataTypes';
import { DetailBaseComponent } from 'src/app/ViewModels/detail-table-base.component';

@Component({
  selector: 'app-message-templater',
  templateUrl: './message-templater.component.html',
  styleUrls: ['./message-templater.component.scss']
})
export class MessageTemplaterComponent  implements DetailBaseComponent, OnInit {

  item: HealthEvaluation;
  listSetting: ListColumnSetting;

  value: string;
  showGraph = false;
  graphData = [];
  categories = [];

  constructor() { }

  ngOnInit() {
    this.value = this.listSetting.getValue(this.item);
    this.showGraph =  this.item.description.includes("----");

    if(this.showGraph) {
      const splits = this.item.description.split("----");
      const lines = splits[1].split("\n");
      lines.forEach(line => {
        if(line.replace(" ", "").length > 0) {
          const splitLint = line.split(",");
          this.graphData.push(+splitLint[1]);
          this.categories.push(splitLint[0]);
        }
      })
      console.log(this)
    }
  }

}
