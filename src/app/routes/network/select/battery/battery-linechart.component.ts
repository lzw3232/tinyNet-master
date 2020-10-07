import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
const DataSet = require('@antv/data-set');

const sourceData = [
  { month: 'Jan', Tokyo: 7.0, London: 3.9 },
  { month: 'Feb', Tokyo: 6.9, London: 4.2 },
  { month: 'Mar', Tokyo: 9.5, London: 5.7 },
  { month: 'Apr', Tokyo: 14.5, London: 8.5 },
  { month: 'May', Tokyo: 18.4, London: 11.9 },
  { month: 'Jun', Tokyo: 21.5, London: 15.2 },
  { month: 'Jul', Tokyo: 25.2, London: 17.0 },
  { month: 'Aug', Tokyo: 26.5, London: 16.6 },
  { month: 'Sep', Tokyo: 23.3, London: 14.2 },
  { month: 'Oct', Tokyo: 18.3, London: 10.3 },
  { month: 'Nov', Tokyo: 13.9, London: 6.6 },
  { month: 'Dec', Tokyo: 9.6, London: 4.8 },
];

const dv = new DataSet.View().source(sourceData);
dv.transform({
  type: 'fold',
  fields: ['Tokyo', 'London'],
  key: 'city',
  value: 'temperature',
});
const data = dv.rows;

const scale = [{
  dataKey: 'month',
  min: 0,
  max: 1,
}];

var data1 = [{
  "month": "Jan",
  "city": "Tokyo",
  "temperature": 7
}, {
  "month": "Jan",
  "city": "London",
  "temperature": 3.9
}, {
  "month": "Feb",
  "city": "Tokyo",
  "temperature": 6.9
}, {
  "month": "Feb",
  "city": "London",
  "temperature": 4.2
}, {
  "month": "Mar",
  "city": "Tokyo",
  "temperature": 9.5
}, {
  "month": "Mar",
  "city": "London",
  "temperature": 5.7
}, {
  "month": "Apr",
  "city": "Tokyo",
  "temperature": 14.5
}, {
  "month": "Apr",
  "city": "London",
  "temperature": 8.5
}, {
  "month": "May",
  "city": "Tokyo",
  "temperature": 18.4
}, {
  "month": "May",
  "city": "London",
  "temperature": 11.9
}, {
  "month": "Jun",
  "city": "Tokyo",
  "temperature": 21.5
}, {
  "month": "Jun",
  "city": "London",
  "temperature": 15.2
}, {
  "month": "Jul",
  "city": "Tokyo",
  "temperature": 25.2
}, {
  "month": "Jul",
  "city": "London",
  "temperature": 17
}, {
  "month": "Aug",
  "city": "Tokyo",
  "temperature": 26.5
}, {
  "month": "Aug",
  "city": "London",
  "temperature": 16.6
}, {
  "month": "Sep",
  "city": "Tokyo",
  "temperature": 23.3
}, {
  "month": "Sep",
  "city": "London",
  "temperature": 14.2
}, {
  "month": "Oct",
  "city": "Tokyo",
  "temperature": 18.3
}, {
  "month": "Oct",
  "city": "London",
  "temperature": 10.3
}, {
  "month": "Nov",
  "city": "Tokyo",
  "temperature": 13.9
}, {
  "month": "Nov",
  "city": "London",
  "temperature": 6.6
}, {
  "month": "Dec",
  "city": "Tokyo",
  "temperature": 9.6
}, {
  "month": "Dec",
  "city": "London",
  "temperature": 4.8
}];

@Component({
  selector: 'app-network-select-battery-linechart',
  template: `
    <div id="kkk">
      <button nz-button nzType="primary" (click)="changeData()">Primary</button>
      {{title}}
      <v-chart [forceFit]="forceFit" [height]="height" [data]="data" [scale]="scale">
        <v-tooltip></v-tooltip>
        <v-axis></v-axis>
        <v-legend></v-legend>
        <v-smooth-line position="month*temperature" color="city" shape="smooth"></v-smooth-line>
        <v-point position="month*temperature" color="city" shape="circle"></v-point>
      </v-chart>
      <div id="test">
      </div>
    </div>
  `
})

export class NetworkSelectBatteryLinechartComponent implements OnInit, AfterViewInit {
  title;
  forceFit = true;
  height = 400;
  data = data;
  scale = scale;

  chart;

  data1 = data1;

  constructor(
    private el: ElementRef,
  ) { }

  ngAfterViewInit() {
    const temp = this.el.nativeElement.querySelector('#test');
    console.log(temp.clientWidth);
    this.chart = new G2.Chart({
      container: temp,
      forceFit: true,
      height: window.innerHeight
    });
    this.chart.source(data1, {
      month: {
        range: [0, 1]
      }
    });
    this.chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    this.chart.axis('temperature', {
      label: {
        formatter: function formatter(val) {
          return val + '°C';
        }
      }
    });
    this.chart.line().position('month*temperature').color('city');
    this.chart.point().position('month*temperature').color('city').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    this.chart.render();
  }

  changeData() {
    console.log(this.data1);
    this.data1.push({
      "month": "Dec",
      "city": "beijing",
      "temperature": 8.8
    });
    console.log(this.data1);
    this.chart.changeData(this.data1);
  }

  ngOnInit(): void {
    console.log('NetworkSelectBatteryLinechartComponent !!');
  }
}
