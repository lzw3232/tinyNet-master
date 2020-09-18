import {AfterViewInit, Component, ComponentFactoryResolver, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {STChange, STColumn, STData} from '@delon/abc';
import {BatteryLinehartHostDirective} from "./battery-linechart-host.directive";
import {NetworkSelectBatteryLinechartComponent} from "./battery-linechart.component";
import {fromEvent} from "rxjs/index";
const DataSet = require('@antv/data-set');

const sourceData: any[] = [
  {x : 0,     初建成本 : 0,        替换成本 : 0,              运维成本 : 0},
  {x : 1,     初建成本 : 1000,     替换成本 : 1000 * 0.8,     运维成本 : 0},
  {x : 100,   初建成本 : 100000,   替换成本 : 100000 * 0.8,   运维成本 : 0},
  {x : 10000, 初建成本 : 10000000, 替换成本 : 10000000 * 0.8, 运维成本 : 0},
];

const dv = new DataSet.View().source(sourceData);
dv.transform({
  type: 'fold',
  fields: ['初建成本', '替换成本', '运维成本'],
  key: 'cost_type',
  value: 'cost_number',
});
const data = dv.rows;

const scale = [

];



@Component({
  selector: 'app-network-select-battery-view',
  templateUrl: './battery-view.component.html',

})
export class NetworkSelectBatteryViewComponent implements OnInit, AfterViewInit {

  // @ViewChild(BatteryLinehartHostDirective) batteryLinehartHostDirective: BatteryLinehartHostDirective;

  record: any = {};
  i: any = 1;
  @Input() public title;

  forceFit = false; // 宽度自适应
  height = 400;
  data1;
  data2;
  data3;
  scale = scale;
  style = { stroke: '#fff', lineWidth: 1 };
  chart_title_x = {text: '个数', textStyle: {fill: '#515151'} };
  chart_title_y1 = {text: '初建成本(元)', textStyle: {fill: '#515151'}};
  chart_title_y2 = {text: '替换成本(元)', textStyle: {fill: '#515151'}};
  chart_title_y3 = {text: '运维成本(元)', textStyle: {fill: '#515151'}};


  url = `/tinyNet/device/battery/list`;
  params = { pi: 1, ps: 3 };
  columns: STColumn[] = [
    { title: '编号', index: 'id', type: 'checkbox', fixed: 'left', width: '80px' },
    { title: '名称', index: 'name', fixed: 'left', width: '120px' },
    { title: '制造商', index: 'factory', fixed: 'left', width: '150px' },
    { title: '额定电压(V)', index: 'eddy', type: 'number' },
    { title: '循环充放电效率(%)', index: 'xhcfdxl', type: 'number' },
    { title: '最大充电速率', index: 'zdcdsl', type: 'number' },
    { title: '最大充电电流(A)', index: 'zdcddl', type: 'number' },
    { title: '最大放电速率', index: 'zdfdsl', type: 'number' },
    { title: '电池容量', index: 'dcrl', type: 'number' },
    { title: '寿命', index: 'life', type: 'number' },
    { title: '全寿命放电量', index: 'qsmfd', type: 'number' },
    { title: '类型', index: 'type' },
    { title: '串联个数', index: 'clgs', type: 'number' },
  ];

  result_data = {
    device : null,
    data : {
      battery_ids : [],
      battery_soc_1 : '0.00',
      battery_soc_2 : '0.00',
      battery_soc_3 : '0.00',
      battery_total_flow : '0.00',
      battery_back_flow : '0.00',
      battery_upper_limit : '1.00',
      battery_lower_limit : '10.00'
    }
  };

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    // private componentFactoryResolver: ComponentFactoryResolver,
    private el: ElementRef,
  ) { }

  ngOnInit(): void {
    // this.http.get(`/user/${this.record.id}`).subscribe(res => this.i = res);
    this.result_data.device = this.title;

    // fromEvent(window, 'resize').subscribe(function () {
    //   console.log("1");
    // });
  }

  ngAfterViewInit() {

  }

  close() {
    this.modal.destroy(this.result_data);
  }

  changeData() {
    const sourceData1: any[] = [
      {x : 0,     初建成本 : 0,        替换成本 : 0,              运维成本 : 0},
      {x : 1,     初建成本 : 1000,     替换成本 : 1000 * 0.3,     运维成本 : 0},
      {x : 100,   初建成本 : 100000,   替换成本 : 100000 * 0.3,   运维成本 : 0},
      {x : 10000, 初建成本 : 10000000, 替换成本 : 10000000 * 0.3, 运维成本 : 0},
    ];

    const dv1 = new DataSet.View().source(sourceData1);
    dv1.transform({
      type: 'fold',
      fields: ['初建成本', '替换成本', '运维成本'],
      key: 'cost_type',
      value: 'cost_number',
    });
    const dataTemp = dv1.rows;
    this.data1 = dataTemp;
    console.log(this.data1);
  }

  change(e: STChange) {

    if (e.type === 'checkbox') {
      console.log('change', e);
      this.result_data.data.battery_ids = [];
      const array = e.checkbox;
      const sourceData1: any[] = [];
      const sourceData2: any[] = [];
      const sourceData3: any[] = [];
      const _this = this;
      array.forEach(function (value) {
        for (let i = 1; i <= 4; i++) {
          sourceData1.push({x : value['capacity' + i], cost_type : value.name, cost_number : value['cjcb' + i]});
          sourceData2.push({x : value['capacity' + i], cost_type : value.name, cost_number : value['gxcb' + i]});
          sourceData3.push({x : value['capacity' + i], cost_type : value.name, cost_number : value['yxwhcb' + i]});
        }
        _this.result_data.data.battery_ids.push(value);
      });
      this.data1 = sourceData1;
      this.data2 = sourceData2;
      this.data3 = sourceData3;

      console.log(this.result_data.data.battery_ids);

      // this.result_data.data.battery_id = e.radio.id;
    }
  }

  dataProcess(data: STData[]) {
    return data.map((i: STData, index: number) => {
      i.checked = false;
      return i;
    });
  }

  /**
   * 在 modal 中使用 G2图表 会有打开modal后图标不渲染的情况，
   * 这是因为图标设置了 forceFit = true，但是在 modal 打开时，
   * 其父容器的宽度为0（不知原因），导致图表不能渲染。
   * 因此，使用动态组件的方法，在 ngAfterViewInit() 方法中加载该图表组件
   * （在 ngOnInit() 加载也会导致不渲染）。
   *
   * PS: 失败！发生异常错误
   */
  // loadComponent() {
  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NetworkSelectBatteryLinechartComponent);
  //
  //   const viewContainerRef = this.batteryLinehartHostDirective.viewContainerRef;
  //   viewContainerRef.clear();
  //
  //   const componentRef = viewContainerRef.createComponent(componentFactory);
  //   (<NetworkSelectBatteryLinechartComponent>componentRef.instance).title = 'hahaha';
  // }
}
