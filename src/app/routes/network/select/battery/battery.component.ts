import {AfterViewInit, Component, ComponentFactoryResolver, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {STChange, STColumn, STData, STPage} from '@delon/abc';
import {BatteryLinehartHostDirective} from "./battery-linechart-host.directive";
import {NetworkSelectBatteryLinechartComponent} from "./battery-linechart.component";
import {fromEvent} from "rxjs/index";
import { DevicesService} from '../../../../user-service/devicesService'
import {SFSchema} from "@delon/form";
const DataSet = require('@antv/data-set');

@Component({
  selector: 'app-network-select-battery',
  templateUrl: './battery.component.html',
  styleUrls:['../modal.component.css']

})
export class NetworkSelectBatteryComponent implements OnInit{
  @Input() public title;
  @Input() public result;
  forceFit = true; // 宽度自适应
  height = 400;
  data;
  params = { pi: 1, ps: 3 ,total:0,val:""};
  pages: STPage = {
    total: '',//分页显示多少条数据，字符串型
    show: true,//显示分页
    front: false //关闭前端分页，true是前端分页，false后端控制分页
  };
  searchSchema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '型号名称'
      }
    },
  };
  data1;

  style = { stroke: '#fff', lineWidth: 1 };
  chart_title_x = {text: '个数', textStyle: {fill: '#515151'} };
  chart_title_y1 = {text: '初建成本(元)', textStyle: {fill: '#515151'}};

  columns: STColumn[] = [
    { title: '编号', index: 'id', type: 'radio', fixed: 'left', width: '80px' },
    { title: '型号名称', index: 'name' , fixed: 'left', width: '100px'},
    { title: '额定电压(V)', type: 'number', index: 'ratedVoltage' },
    { title: '循环充放电效率(%)', type: 'number', index: 'roundTridEfficiency' },
    { title: '最大充电速率', type: 'number', index: 'maximumChargeRate' },
    { title: '最大充电电流(A)', type: 'number', index: 'maximumChargeCurrent' },
    { title: '最大放电速率', type: 'number', index: 'constRate' },
    { title: '电池容量(Ah)', type: 'number', index: 'maximumnumberOrCapacity' },
    { title: '寿命(年)', type: 'number', index: 'floatLife' },
    { title: '全寿命放电量(kWh)', type: 'number', index: 'lifeTimeThroughput' },
    { title: '串联个数', type: 'number', index: 'numberofBattery' },
    { title: '制造商', index: 'manufacturer' },
    { title: '类型', index: 'dAtype', render: "custom"},
  ];

  result_data = {
    par:{
      id : null,
      currentSOC : '0.00',
      maximumSOC : '0.00',
      minimumSOC : '0.00',
      convEfficiency : '0.00',
      invEfficiency : '0.00',
    },
    num:{
      numberofBatteryMinimum : '1.00',
      numberofBatteryMaximum : '10.00',
    },
  };

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    private el: ElementRef,
    private devicesService: DevicesService,
  ) { }

  ngOnInit(): void {
    this.result_data=this.result;
    this.getlist(this.params.pi);
  }

  close() {
    this.modal.destroy(this.result_data);
  }

  getlist(pi) {
    this.devicesService.list(pi, this.params.ps, this.params.val, this.title).subscribe((res) => {
      console.log(res);
      if (res["errno"] == "0") {
        this.params.total = res["data"]["data"]["total"];
        this.pages.total = '共' + this.params.total + '条';
        this.data = res["data"]["data"]["list"];
        this.params.pi = pi;
        // this.ps = 10;

        if(this.result_data.par.id==null){
          this.result_data.par.id = this.data[0].id;
          this.data[0].checked=true;
          this.showChart(this.data[0]);
        }
        else{
          this.data.map((res)=>{
            res.checked=(res.id===this.result_data.par.id);
          })

        }
      }
    })
  }
  submit(value:any){
    this.params.val = (value["name"]==undefined)?"":value["name"];
    this.getlist(1);
  }

  reset(value:any){
    this.params.val = "";
    this.getlist(1);
  }

  change(e: STChange) {
    console.log('change', e);
    if (e.type === 'radio') {
      const value = e.radio;
      this.showChart(value);
    }

    if(e.pi!=this.params.pi){
      this.getlist(e.pi);
    }
  }

  showChart(value){
    const sourceData: any[] = [
      {x : value.numberOrCapacity1, 初建成本 : value.capitalCurve1, 替换成本 : value.replacementCost1, 运维成本 : value.maintainCost1},
      {x : value.numberOrCapacity2, 初建成本 : value.capitalCurve2, 替换成本 : value.replacementCost2, 运维成本 : value.maintainCost2},
      {x : value.numberOrCapacity3, 初建成本 : value.capitalCurve3, 替换成本 : value.replacementCost3, 运维成本 : value.maintainCost3},
      {x : value.numberOrCapacity4, 初建成本 : value.capitalCurve4, 替换成本 : value.replacementCost4, 运维成本 : value.maintainCost4},
    ];

    const dv = new DataSet.View().source(sourceData);
    dv.transform({
      type: 'fold',
      fields: ['初建成本', '替换成本', '运维成本'],
      key: 'cost_type',
      value: 'cost_number',
    });
    const data1 = dv.rows;
    this.data1 = data1;
    this.result_data.par.id = value.id;
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
