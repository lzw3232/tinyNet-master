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
      id : null,
      soc_1 : '0.00',
      soc_2 : '0.00',
      soc_3 : '0.00',
      total_flow : '0.00',
      back_flow : '0.00',
      upper_limit : '1.00',
      lower_limit : '10.00'
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

        if(this.result_data.id==null){
          this.result_data.id = this.data[0].id;
          this.data[0].checked=true;
          this.showChart(this.data[0]);
        }
        else{
          this.data.map((res)=>{
            res.checked=(res.id===this.result_data.id);
          })

        }

      } else if (res["errno"] == "2") {
        this.devicesService.tologin();
      } else {
        this.msgSrv.create('error', `error`);
      }
      this.devicesService.setCookie("token", res["data"]["data"]["token"]);
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
      {x : value.capacity1, 初建成本 : value.cjcb1, 替换成本 : value.gxcb1, 运维成本 : value.yxwhcb1},
      {x : value.capacity2, 初建成本 : value.cjcb2, 替换成本 : value.gxcb2, 运维成本 : value.yxwhcb2},
      {x : value.capacity3, 初建成本 : value.cjcb3, 替换成本 : value.gxcb3, 运维成本 : value.yxwhcb3},
      {x : value.capacity4, 初建成本 : value.cjcb4, 替换成本 : value.gxcb4, 运维成本 : value.yxwhcb4},
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
    this.result_data.id = value.id;
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
