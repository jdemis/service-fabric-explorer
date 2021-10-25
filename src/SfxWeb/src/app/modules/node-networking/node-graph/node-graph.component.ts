import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Chart, Options, chart  } from 'highcharts';
import * as Highcharts from "highcharts";

var vbp = require('highcharts/modules/networkgraph');
vbp(Highcharts);

import { TimeUtils } from 'src/app/Utils/TimeUtils';

@Component({
  selector: 'app-node-graph',
  templateUrl: './node-graph.component.html',
  styleUrls: ['./node-graph.component.scss']
})
export class NodeGraphComponent  implements OnInit, OnChanges {

  @Input() xAxisCategories: string[];
  @Input() dataSet: any[] = [];
  @Input() title = '';
  @Input() subtitle = '';

  private chart: Chart;

  fontColor = {
                color: '#fff'
              };

  public options: Options = {

    chart: {
      type: 'networkgraph',
      height: '50%',
      backgroundColor: null,
      borderColor: 'lightblue'

  },
  plotOptions: {
    networkgraph: {
        layoutAlgorithm: {
            // enableSimulation: true,
            integration: 'euler',
            linkLength: 50
        },
        keys: ['from', 'to'],
        marker: {
            radius: 5,
            lineWidth: 1
        }
    }
},
    series: [
      {
        nodes: this.generateNodes(),
        data: this.generateData()
      } as any]
  }


  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart){
      this.chart.series[0].setData(this.dataSet);
      this.chart.title.update({text: this.title});
      this.chart.subtitle.update({text: this.subtitle});
      this.chart.xAxis[0].update({categories: this.xAxisCategories});
    }
  }

  ngOnInit() {
    this.chart = chart('container2', this.options);
    console.log(this.options)
  }

  generateData() {
    const nodes = 20;
    let data = [];

    for(let i = 0; i < nodes; i++) {
      for(let j = i; j < nodes; j++) {
        if(Math.random() < .5) {
          data.push([i.toString(), j.toString()])
        }
      }
    }

    return data;
  }

  generateNodes() {
  const nodes = 20;
  let data = [];
  for(let i = 0; i < nodes; i++) {
    const r= Math.max(Math.round(Math.random() * 30), 10);
    data.push({
      id: i.toString(),
      dataLabels: {
          enabled: true
      },
      marker: {
          radius: r,
          fillColor: r > 15 ? 'red' : 'green'
      }
  })
  }

  return data;
}
}
