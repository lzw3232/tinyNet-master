import {Component, OnInit} from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {FormProperty, PropertyGroup, SFSchema, SFUISchema} from '@delon/form';
import {DevicesService} from "../../../../user-service/devicesService";

@Component({
  selector: 'app-device-nuclear-power-detail-edit',
  templateUrl: './edit.component.html',
})
export class NuclearPowerDetailEditComponent implements OnInit {
  i : any;
  record: any = {};
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '型号名称' },
      fmFactor: { type: 'string', title: '调频系数', default: 0, minimum: 0, ui: {
        // widget: 'string',
        addOnAfter: '%',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      nuclearFuelNumber: { type: 'string', title: '核燃料数量', default: 0, minimum: 0, ui: {
        addOnAfter: '根',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      minimulLoadRate: { type: 'string', title: '最低负载率', default: 0, minimum: 0, ui: {
        addOnAfter: '%',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      nuclearFuelPrice: { type: 'string', title: '核燃料价格', default: 0, minimum: 0, ui: {
        addOnAfter: '元/根',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      lifeTime: { type: 'string', title: '寿命', default: 0, minimum: 0, ui: {
        addOnAfter: '年',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      generationMaxrate: { type: 'string', title: '核电发电占比上限', default: 0, minimum: 0, ui: {
        addOnAfter: '%',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      nuclearFuelRep: { type: 'string', title: '核电燃料更换时间', default: 0, minimum: 0, ui: {
        addOnAfter: '年/次',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      manufacturer: { type: 'string', title: '制造商', maxLength: 140 },
      numberOrCapacity1: { type: 'number', title: '容量1',  default: 0, minimum: 0 },
      capitalCurve1: { type: 'number', title: '初建成本1',  default: 0, minimum: 0 },
      replacementCost1: { type: 'number', title: '更新成本1',  default: 0, minimum: 0 },
      maintainCost1: { type: 'number', title: '运维成本1',  default: 0, minimum: 0 },
      numberOrCapacity2: { type: 'number', title: '容量2',  default: 0, minimum: 0 },
      capitalCurve2: { type: 'number', title: '初建成本2',  default: 0, minimum: 0 },
      replacementCost2: { type: 'number', title: '更新成本2',  default: 0, minimum: 0 },
      maintainCost2: { type: 'number', title: '运维成本2',  default: 0, minimum: 0 },
      numberOrCapacity3: { type: 'number', title: '容量3',  default: 0, minimum: 0 },
      capitalCurve3: { type: 'number', title: '初建成本3',  default: 0, minimum: 0 },
      replacementCost3: { type: 'number', title: '更新成本3',  default: 0, minimum: 0 },
      maintainCost3: { type: 'number', title: '运维成本3',  default: 0, minimum: 0 },
      numberOrCapacity4: { type: 'number', title: '容量4',  default: 0, minimum: 0 },
      capitalCurve4: { type: 'number', title: '初建成本4',  default: 0, minimum: 0 },
      replacementCost4: { type: 'number', title: '更新成本4',  default: 0, minimum: 0 },
      maintainCost4: { type: 'number', title: '运维成本4',  default: 0, minimum: 0 },
    },
    required: ['name', 'fmFactor', 'nuclearFuelNumber', 'manufacturer', 'minimulLoadRate', 'nuclearFuelPrice', 'lifeTime', 'generationMaxrate', 'nuclearFuelRep',
      'numberOrCapacity1', 'capitalCurve1', 'replacementCost1', 'maintainCost1',
      'numberOrCapacity2', 'capitalCurve2', 'replacementCost2', 'maintainCost2',
      'numberOrCapacity3', 'capitalCurve3', 'replacementCost3', 'maintainCost3',
      'numberOrCapacity4', 'capitalCurve4', 'replacementCost4', 'maintainCost4'],
  };
  ui: SFUISchema = {
    '*': {
      grid: { span: 12 },
      spanLabel : 10,
      spanControl : 14
    },
    '$manufacturer': {grid: { span: 24 }, spanLabel : 5, spanControl : 7},
    '$numberOrCapacity1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capitalCurve1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$replacementCost1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$maintainCost1': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$numberOrCapacity2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capitalCurve2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$replacementCost2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$maintainCost2': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$numberOrCapacity3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capitalCurve3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$replacementCost3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$maintainCost3': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$numberOrCapacity4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capitalCurve4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$replacementCost4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$maintainCost4': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
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
        .select(this.record.id,"nuclear_power")
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
      this.devicesService.update(value,"nuclear_power").subscribe((res)=>{
        console.log(res);
        if(res["errno"]=="0"){
          this.modal.destroy("true");
          this.msgSrv.create('success', `success`);
        }
      })
    } else {
      this.devicesService.add(value,"nuclear_power").subscribe((res)=>{
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
