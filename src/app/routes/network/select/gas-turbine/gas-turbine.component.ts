import {Component, ElementRef, Input, OnInit} from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {STChange, STColumn, STData, STPage} from '@delon/abc';
import {SFSchema} from "@delon/form";
import {DevicesService} from "../../../../user-service/devicesService";

@Component({
  selector: 'app-network-select-gas-turbine',
  templateUrl: './gas-turbine.component.html',
  styleUrls:['../modal.component.css']
})




export class NetworkSelectGasTurbineComponent implements OnInit {
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

  chart_title_a = {text: '输出功率(kW)', textStyle: {fill: '#515151'} };
  chart_title_b = {text: '燃料消耗(m^3)', textStyle: {fill: '#515151'}};

  data2;
  columns: STColumn[] = [
    { title: '编号', index: 'id', type: 'radio', fixed: 'left', width: '80px' },
    { title: '型号名称', index: 'name' , fixed: 'left', width: '100px'},
    { title: '额定功率(kW)', type: 'number', index: 'ratedCapacity' },
    { title: '最小负载率', type: 'number', index: 'minimumLoadRate' },
    { title: '燃气轮机效率(%)', type: 'number', index: 'efficiency' },
    { title: '燃机电热比', type: 'number', index: 'smoke' },
    { title: '寿命(年)', type: 'number', index: 'lifeTime' },
  ];

  result_data = {
    par:{
      id : null,
    },
    num:{
      numberofGasturebineMinimum : '1.00',
      numberofGasturebineMaximum : '10.00'
    }
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
    let x = value.fGasPower.split(",");
    let y = value.gasConsumption.split(",");
    if(x.length>1) x.pop();
    if(y.length>1) y.pop();
    const sourceData2: any[] = [  ];
    for(var i=0;i<x.length;i++){
      var tt2 = {"xaxis":x[i],"yaxis":y[i]};
      sourceData2.push(tt2);
    }
    const dv1 = new DataSet.View().source(sourceData2);
    const data2 = dv1.rows;
    console.log(data2);
    this.data2 = data2;
  }
}
