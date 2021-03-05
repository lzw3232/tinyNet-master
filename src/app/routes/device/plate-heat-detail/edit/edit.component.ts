import {Component, OnInit} from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {FormProperty, PropertyGroup, SFSchema, SFUISchema} from '@delon/form';
import {DevicesService} from "../../../../user-service/devicesService";

@Component({
  selector: 'app-device-plate-heat-detail-edit',
  templateUrl: './edit.component.html',
})
export class PlateHeatDetailEditComponent implements OnInit {
  i : any;
  record: any = {};
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '型号名称' },
      heatTransferEff: { type: 'string', title: '换热效率', default: 0, minimum: 0, ui: {
        // widget: 'string',
        addOnAfter: '%',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      ratedJacketWaterPower: { type: 'string', title: '额定缸套水功率', default: 0, minimum: 0, ui: {
        addOnAfter: 'kW',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      lifetime: { type: 'string', title: '寿命', default: 0, minimum: 0, ui: {
        addOnAfter: '年',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      manufacturer: { type: 'string', title: '制造商', maxLength: 140 },
      number1: { type: 'number', title: '台数1',  default: 0, minimum: 0 },
      fBuildCost1: { type: 'number', title: '初建成本1',  default: 0, minimum: 0 },
      rBuildCost1: { type: 'number', title: '更新成本1',  default: 0, minimum: 0 },
      operCost1: { type: 'number', title: '运维成本1',  default: 0, minimum: 0 },
      number2: { type: 'number', title: '台数2',  default: 0, minimum: 0 },
      fBuildCost2: { type: 'number', title: '初建成本2',  default: 0, minimum: 0 },
      rBuildCost2: { type: 'number', title: '更新成本2',  default: 0, minimum: 0 },
      operCost2: { type: 'number', title: '运维成本2',  default: 0, minimum: 0 },
      number3: { type: 'number', title: '台数3',  default: 0, minimum: 0 },
      fBuildCost3: { type: 'number', title: '初建成本3',  default: 0, minimum: 0 },
      rBuildCost3: { type: 'number', title: '更新成本3',  default: 0, minimum: 0 },
      operCost3: { type: 'number', title: '运维成本3',  default: 0, minimum: 0 },
      number4: { type: 'number', title: '台数4',  default: 0, minimum: 0 },
      fBuildCost4: { type: 'number', title: '初建成本4',  default: 0, minimum: 0 },
      rBuildCost4: { type: 'number', title: '更新成本4',  default: 0, minimum: 0 },
      operCost4: { type: 'number', title: '运维成本4',  default: 0, minimum: 0 },
    },
    required: ['name', 'heatTransferEff', 'ratedJacketWaterPower', 'lifetime', 'manufacturer',
      'number1', 'fBuildCost1', 'rBuildCost1', 'operCost1',
      'number2', 'fBuildCost2', 'rBuildCost2', 'operCost2',
      'number3', 'fBuildCost3', 'rBuildCost3', 'operCost3',
      'number4', 'fBuildCost4', 'rBuildCost4', 'operCost4'],
  };
  ui: SFUISchema = {
    '*': {
      grid: { span: 12 },
      spanLabel : 10,
      spanControl : 14
    },
    '$manufacturer': {grid: { span: 24 }, spanLabel : 5, spanControl : 7},
    '$number1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fBuildCost1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$rBuildCost1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$operCost1': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$number2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fBuildCost2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$rBuildCost2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$operCost2': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$number3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fBuildCost3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$rBuildCost3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$operCost3': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$number4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fBuildCost4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$rBuildCost4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$operCost4': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
  };

  constructor(
    private modal: NzModalRef,
    public http: _HttpClient,
    public devicesService: DevicesService,
    private msgSrv: NzMessageService
  ) {}

  ngOnInit(): void {
    console.log(this.record);
    if (this.record.id) {
      // this.http.get(`/user/${this.record.id}`).subscribe(res => (this.i = res));
      this.devicesService
        .select(this.record.id,"plate_heat")
        .subscribe(res => {
          console.log(res);
          if(res["errno"]=="0"){
            this.i = res["data"]["data"]["data"];
          }
        });
    }
  }

  save(value: any) {
    //如果存在 record 记录，则做更新操作，否则为新建操作
    console.log(value);
    if (this.record.id) {
      this.devicesService.update(value,"plate_heat").subscribe((res)=>{
        console.log(res);
        if(res["errno"]=="0"){
          this.modal.destroy("true");
          this.msgSrv.create('success', `success`);
        }
      })
    } else {
      this.devicesService.add(value,"plate_heat").subscribe((res)=>{
        console.log(res);
        if(res["errno"]=="0"){
          this.modal.destroy("true");
          this.msgSrv.create('success', `success`);
        }
      })
    }

  }

  close() {
    this.modal.destroy(false);
  }
}
