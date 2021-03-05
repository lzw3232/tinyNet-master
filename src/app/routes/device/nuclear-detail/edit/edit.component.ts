import {Component, OnInit} from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {FormProperty, PropertyGroup, SFSchema, SFUISchema} from '@delon/form';
import {DevicesService} from "../../../../user-service/devicesService";

@Component({
  selector: 'app-device-nuclear-detail-edit',
  templateUrl: './edit.component.html',
})
export class NuclearDetailEditComponent implements OnInit {
  i : any;
  record: any = {};
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '型号名称' },
      frequencyModulationCoefficient: { type: 'string', title: '调频系数', default: 0, minimum: 0, ui: {
        // widget: 'string',
        addOnAfter: '%',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      quantityOfNuclearFuel: { type: 'string', title: '核燃料数量', default: 0, minimum: 0, ui: {
        addOnAfter: '根',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      manufacturer: { type: 'string', title: '制造商', maxLength: 140 },
      minimuLoadRate: { type: 'string', title: '最低负载率', default: 0, minimum: 0, ui: {
        addOnAfter: '%',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      nuclearFuelPrices: { type: 'string', title: '核燃料价格', default: 0, minimum: 0, ui: {
        addOnAfter: '元/根',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      lifetime: { type: 'string', title: '寿命', default: 0, minimum: 0, ui: {
        addOnAfter: '年',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      upperLimitOfNuclearPowerGeneration: { type: 'string', title: '核电发电占比上限', default: 0, minimum: 0, ui: {
        addOnAfter: '%',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      nuclearPowerFuelReplacementTime: { type: 'string', title: '核电燃料更换时间', default: 0, minimum: 0, ui: {
        addOnAfter: '年/次',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      capacity1: { type: 'number', title: '容量1',  default: 0, minimum: 0 },
      fBuildCost1: { type: 'number', title: '初建成本1',  default: 0, minimum: 0 },
      rBuildCost1: { type: 'number', title: '更新成本1',  default: 0, minimum: 0 },
      operCost1: { type: 'number', title: '运维成本1',  default: 0, minimum: 0 },
      capacity2: { type: 'number', title: '容量2',  default: 0, minimum: 0 },
      fBuildCost2: { type: 'number', title: '初建成本2',  default: 0, minimum: 0 },
      rBuildCost2: { type: 'number', title: '更新成本2',  default: 0, minimum: 0 },
      operCost2: { type: 'number', title: '运维成本2',  default: 0, minimum: 0 },
      capacity3: { type: 'number', title: '容量3',  default: 0, minimum: 0 },
      fBuildCost3: { type: 'number', title: '初建成本3',  default: 0, minimum: 0 },
      rBuildCost3: { type: 'number', title: '更新成本3',  default: 0, minimum: 0 },
      operCost3: { type: 'number', title: '运维成本3',  default: 0, minimum: 0 },
      capacity4: { type: 'number', title: '容量4',  default: 0, minimum: 0 },
      fBuildCost4: { type: 'number', title: '初建成本4',  default: 0, minimum: 0 },
      rBuildCost4: { type: 'number', title: '更新成本4',  default: 0, minimum: 0 },
      operCost4: { type: 'number', title: '运维成本4',  default: 0, minimum: 0 },
    },
    required: ['name', 'frequencyModulationCoefficient', 'quantityOfNuclearFuel', 'manufacturer', 'minimuLoadRate', 'nuclearFuelPrices', 'lifetime', 'upperLimitOfNuclearPowerGeneration', 'nuclearPowerFuelReplacementTime',
      'capacity1', 'fBuildCost1', 'rBuildCost1', 'operCost1',
      'capacity2', 'fBuildCost2', 'rBuildCost2', 'operCost2',
      'capacity3', 'fBuildCost3', 'rBuildCost3', 'operCost3',
      'capacity4', 'fBuildCost4', 'rBuildCost4', 'operCost4'],
  };
  ui: SFUISchema = {
    '*': {
      grid: { span: 12 },
      spanLabel : 10,
      spanControl : 14
    },
    '$nuclearPowerFuelReplacementTime': {grid: { span: 24 }, spanLabel : 5, spanControl : 7},
    '$capacity1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fBuildCost1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$rBuildCost1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$operCost1': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capacity2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fBuildCost2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$rBuildCost2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$operCost2': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capacity3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fBuildCost3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$rBuildCost3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$operCost3': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capacity4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
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
        .select(this.record.id,"nuclear")
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
      this.devicesService.update(value,"nuclear").subscribe((res)=>{
        console.log(res);
        if(res["errno"]=="0"){
          this.modal.destroy("true");
          this.msgSrv.create('success', `success`);
        }
      })
    } else {
      this.devicesService.add(value,"nuclear").subscribe((res)=>{
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
