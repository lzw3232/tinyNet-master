import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {STChange} from "@delon/abc";
import {DevicesService} from "../../../../user-service/devicesService";

const DataSet = require('@antv/data-set');

@Component({
  selector: 'app-device-ice-storage-detail-view',
  templateUrl: './view.component.html',
})
export class IceStorageDetailViewComponent implements OnInit {
  record: any = {};
  i: any;

  data;
  forceFit = true;
  width = 400;
  height = 400;
  style = { stroke: '#fff', lineWidth: 1 };
  chart_title_x = {text: '容量', textStyle: {fill: '#515151'} };
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
    this.devicesService.select(this.record.id,"ice_storage").subscribe((res)=>{
      console.log(res);
      if(res["errno"]=="0"){
        this.i = res["data"]["data"]["data"];
        const sourceData: any[] = [
          {x : this.i.capacity1, 初建成本 : this.i.initialConstructionCost1, 替换成本 : this.i.updateCost1, 运维成本 : this.i.operationAndMaintenanceCosts1},
          {x : this.i.capacity2, 初建成本 : this.i.initialConstructionCost2, 替换成本 : this.i.updateCost2, 运维成本 : this.i.operationAndMaintenanceCosts2},
          {x : this.i.capacity3, 初建成本 : this.i.initialConstructionCost3, 替换成本 : this.i.updateCost3, 运维成本 : this.i.operationAndMaintenanceCosts3},
          {x : this.i.capacity4, 初建成本 : this.i.initialConstructionCost4, 替换成本 : this.i.updateCost4, 运维成本 : this.i.operationAndMaintenanceCosts4},
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
