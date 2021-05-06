import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {STChange} from "@delon/abc";
import {DevicesService} from "../../../../user-service/devicesService";

const DataSet = require('@antv/data-set');

@Component({
  selector: 'app-device-nuclear-power-detail-view',
  templateUrl: './view.component.html',
})
export class NuclearPowerDetailViewComponent implements OnInit {
  record: any = {};
  i: any;

  data;
  forceFit = true;
  width = 400;
  height = 400;
  style = { stroke: '#fff', lineWidth: 1 };
  chart_title_x = {text: '台数', textStyle: {fill: '#515151'} };
  chart_title_y = {text: '成本(元)', textStyle: {fill: '#515151'}};

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private devicesService: DevicesService,
  ) { }

  ngOnInit(): void {
    console.log(this.record);
    console.log(this.i);
    this.devicesService.select(this.record.id,"nuclear_power").subscribe((res)=>{
      console.log(res);
      if(res["errno"]=="0"){
        this.i = res["data"]["data"]["data"];
        const sourceData: any[] = [
          {x : this.i.numberOrCapacity1, 初建成本 : this.i.capitalCurve1, 更新成本 : this.i.replacementCost1, 运维成本 : this.i.maintainCost1},
          {x : this.i.numberOrCapacity2, 初建成本 : this.i.capitalCurve2, 更新成本 : this.i.replacementCost2, 运维成本 : this.i.maintainCost2},
          {x : this.i.numberOrCapacity3, 初建成本 : this.i.capitalCurve3, 更新成本 : this.i.replacementCost3, 运维成本 : this.i.maintainCost3},
          {x : this.i.numberOrCapacity4, 初建成本 : this.i.capitalCurve4, 更新成本 : this.i.replacementCost4, 运维成本 : this.i.maintainCost4},
        ];

        const dv = new DataSet.View().source(sourceData);
        dv.transform({
          type: 'fold',
          fields: ['初建成本', '更新成本', '运维成本'],
          key: 'cost_type',
          value: 'cost_number',
        });
        const data = dv.rows;
        this.data = data;
      }
    })
    // this.http
    //   .post('/tinyNet/device/battery/select', {id : this.record.id})
    //   .subscribe(res => {
    //     this.i = res;
    //     const sourceData: any[] = [
    //       {x : this.i.numberOrCapacity1, 初建成本 : this.i.capitalCurve1, 替换成本 : this.i.replacementCost1, 运维成本 : this.i.maintainCost1},
    //       {x : this.i.numberOrCapacity2, 初建成本 : this.i.capitalCurve2, 替换成本 : this.i.replacementCost2, 运维成本 : this.i.maintainCost2},
    //       {x : this.i.numberOrCapacity3, 初建成本 : this.i.capitalCurve3, 替换成本 : this.i.replacementCost3, 运维成本 : this.i.maintainCost3},
    //       {x : this.i.numberOrCapacity4, 初建成本 : this.i.capitalCurve4, 替换成本 : this.i.replacementCost4, 运维成本 : this.i.maintainCost4},
    //     ];
    //
    //     const dv = new DataSet.View().source(sourceData);
    //     dv.transform({
    //       type: 'fold',
    //       fields: ['初建成本', '替换成本', '运维成本'],
    //       key: 'cost_type',
    //       value: 'cost_number',
    //     });
    //     const data = dv.rows;
    //     this.data = data;
    //   });
  }


  close() {
    this.modal.destroy();
  }
}
