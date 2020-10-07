import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {STChange} from "@delon/abc";
import {DevicesService} from "../../../../user-service/devicesService";

const DataSet = require('@antv/data-set');

@Component({
  selector: 'app-device-gas-boiler-detail-view',
  templateUrl: './view.component.html',
})
export class GasBoilerDetailViewComponent implements OnInit {
  record: any = {};  //定义数据
  i: any;   //定义数据

  data;
  forceFit = true;
  width = 400;
  height = 400;
  style = { stroke: '#fff', lineWidth: 1 };
  chart_title_x = {text: '个数', textStyle: {fill: '#515151'} };
  chart_title_y = {text: '成本(元)', textStyle: {fill: '#515151'}};

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private devicesService: DevicesService,
  ) { }

  ngOnInit(): void {
    console.log(this.record);  //在控制台上输出信息
    console.log(this.i);
    this.devicesService.select(this.record.id,"gas_boiler").subscribe((res)=>{
      console.log(res);
      if(res["errno"]=="0"){
        this.i = res["data"]["data"]["data"];
        const sourceData: any[] = [
          {x : this.i.number1, 初建成本 : this.i.fBuildCost1, 替换成本 : this.i.rBuildCost1, 运维成本 : this.i.operCost1},
          {x : this.i.number2, 初建成本 : this.i.fBuildCost2, 替换成本 : this.i.rBuildCost2, 运维成本 : this.i.operCost2},
          {x : this.i.number3, 初建成本 : this.i.fBuildCost3, 替换成本 : this.i.rBuildCost3, 运维成本 : this.i.operCost3},
          {x : this.i.number4, 初建成本 : this.i.fBuildCost4, 替换成本 : this.i.rBuildCost4, 运维成本 : this.i.operCost4},
        ];

        const dv = new DataSet.View().source(sourceData);
        dv.transform({
          type: 'fold',
          fields: ['初建成本', '替换成本', '运维成本'],
          key: 'cost_type',
          value: 'cost_number',
        });
        const data = dv.rows;
        this.data = data;
      }
      else if(res["errno"]=="2"){
        this.devicesService.tologin();
      }
      else{
        this.msgSrv.create('error', `error`);
      }
      this.devicesService.setCookie("token",res["data"]["data"]["token"]);
    })
  }
  close() {
    this.modal.destroy();
  }
}
