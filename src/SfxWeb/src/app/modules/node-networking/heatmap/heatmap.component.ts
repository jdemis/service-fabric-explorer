import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Chart, Options, chart  } from 'highcharts';
import * as Highcharts from 'highcharts';
import * as HighchartsMore from 'highcharts/highcharts-more';
import { TimeUtils } from 'src/app/Utils/TimeUtils';
HighchartsMore.default(Highcharts);

var vbp = require('highcharts/modules/heatmap');
vbp(Highcharts);
@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {


  // @Input() xAxisCategories: string[];
  // @Input() dataSet: any[] = [];
  @Input() title = '';
  @Input() subtitle = '';

  private chart: Chart;

  fontColor = {
                color: '#fff'
              };

  public options: Options = {
    chart: {
      height: '50%',
      inverted: false,
      animation: true,
      backgroundColor: '#191919',
      type: 'heatmap'

    },
    title: {
      text: '',
      style: this.fontColor
    },
    subtitle: {
      text: '',
      style: this.fontColor

   },
   legend: {
    enabled: true
   },
   yAxis: {
    categories: ['Node_1', 'Node_1', 'Node_1', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura'].map((item, i) => "node-" + i.toString())
  },
  xAxis: {
    type: 'datetime',
    // tickPixelInterval: 50,

    min: TimeUtils.AddSeconds(new Date(), -300).getTime(),
    max: new Date().getTime()
} ,
    colorAxis: {
      stops: [
          [0, '#7fba00'],
          [0.5, '#fffbbc'],
          [0.9, '#c4463a'],
          [1, '#c4463a']
      ],

      startOnTick: true,
      endOnTick: true,
      labels: {
          format: '{value} ms'
      }
  },
  tooltip: {
    headerFormat: 'Latency<br/>',
    formatter() {
      console.log(this)
      return `${new Date(this.point.options.x).toLocaleTimeString()}  <b>${this.point.options.value} MS </b>`;
    }
    // pointFormat: '{new Date(point.x).toLocaleDateString()} {point.y} <b>{point.value} MS </b>'
  },
    series: [{
      data: this.generateData(),
      colsize: 30000,
      dataLabels: {
        enabled: true,
        color: '#000000'
      }
    }]
  };
  constructor() {
    const l = Date.UTC(2017, 0, 1)

  }

//   series: [{
//     boostThreshold: 100,
//     borderWidth: 0,
//     nullColor: '#EFEFEF',
//     colsize: 24 * 36e5, // one day
//     tooltip: {
//         headerFormat: 'Temperature<br/>',
//         pointFormat: '{point.x:%e %b, %Y} {point.y}:00: <b>{point.value} ℃</b>'
//     },
//     turboThreshold: Number.MAX_VALUE // #3404, remove after 4.0.5 release
// }]

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart){
      // this.chart.series[0].setData(this.dataSet);
      this.chart.title.update({text: this.title});
      this.chart.subtitle.update({text: this.subtitle});
      // this.chart.xAxis[0].update({categories: this.xAxisCategories});
    }
  }

  ngOnInit() {
    console.log(this.options)
    this.chart = chart('container', this.options);
  }

  generateData () {
    const nodes = 5;
    let data = [];
    let date = new Date();
    for(let x = 0; x <= 10; x++) {
      for(let n = 0; n < nodes; n++) {
        data.push(
          {
            x: TimeUtils.AddSeconds(date, -30 * x).getTime(),
            y: n,
            value: Math.round(Math.random() * 100),
            name: "node" + n,
        }
        )
      }
    }

    console.log(data)
    return data;
  }
}
