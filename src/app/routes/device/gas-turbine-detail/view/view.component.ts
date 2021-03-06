import { Component, OnInit,Input,ElementRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {STChange} from "@delon/abc";
import {DevicesService} from "../../../../user-service/devicesService";
//const声明的对象，对象本身是不能被赋值覆盖的，但是对象的可修改属性是被允许被修改值的
const DataSet = require('@antv/data-set');
const G2 = require('@antv/g2');

@Component({
  selector: 'app-device-gas-turbine-detail-view',

  templateUrl: './view.component.html',
})
export class GasTurbineDetailViewComponent implements OnInit {
  record: any = {};  //定义数据
  i: any;   //定义数据
  j: any;
  data;
  data1;
  forceFit = true;
  width = 400;
  height = 400;
  style = { stroke: '#fff', lineWidth: 1 };
  //定义坐标轴
  chart_title_x = {text: '个数', textStyle: {fill: '#515151'} };
  chart_title_y = {text: '成本(元)', textStyle: {fill: '#515151'}};
  chart_title_a = {text: '输出功率(kW)', textStyle: {fill: '#515151'} };
  chart_title_b = {text: '燃料消耗(m^3)', textStyle: {fill: '#515151'}};

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private devicesService: DevicesService,
  ) { }

  ngOnInit(): void {
    console.log(this.record);  //在控制台上输出信息
    console.log(this.i);
    // console.log(this.j);
    this.devicesService.select(this.record.id,"gas_turbine").subscribe((res)=>{
      console.log(res);
      if(res["errno"]=="0"){
        this.i = res["data"]["data"]["data"];
        console.log(this.i);
        //载入数据，为JSON格式
        const sourceData: any[] = [
          {x : this.i.numberOrCapacity1, 初建成本 : this.i.capitalCurve1, 替换成本 : this.i.replacementCost1, 运维成本 : this.i.maintainCost1},
          {x : this.i.numberOrCapacity2, 初建成本 : this.i.capitalCurve2, 替换成本 : this.i.replacementCost2, 运维成本 : this.i.maintainCost2},
          {x : this.i.numberOrCapacity3, 初建成本 : this.i.capitalCurve3, 替换成本 : this.i.replacementCost3, 运维成本 : this.i.maintainCost3},
          {x : this.i.numberOrCapacity4, 初建成本 : this.i.capitalCurve4, 替换成本 : this.i.replacementCost4, 运维成本 : this.i.maintainCost4},

        ];
        //处理数据
        const dv = new DataSet.View().source(sourceData);
        dv.transform({
          type: 'fold',
          fields: ['初建成本', '替换成本', '运维成本'],
          key: 'cost_type',
          value: 'cost_number',
        });
        const data = dv.rows;
        console.log(data);
        this.data = data;


        let x = this.i.fGasPower.split(",");
        let y = this.i.gasConsumption.split(",");
        if(x.length>1) x.pop();
        if(y.length>1) y.pop();
        const sourceData2: any[] = [  ];
        for(var i=0;i<x.length;i++){
          var tt2 = {"xaxis":x[i],"yaxis":y[i]};
          sourceData2.push(tt2);
        }
        const dv1 = new DataSet.View().source(sourceData2);
        const data1 = dv1.rows;
        console.log(data1);
        this.data1 = data1;
      }
    })

  }
  //关闭页面
  close() {
    this.modal.destroy();
  }
}
