import {Component, OnInit} from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {FormProperty, PropertyGroup, SFSchema, SFUISchema} from '@delon/form';
import {DevicesService} from "../../../../user-service/devicesService";

@Component({
  selector: 'app-device-heat-storage-detail-edit',
  templateUrl: './edit.component.html',
})
export class HeatStorageDetailEditComponent implements OnInit {
  i : any;
  record: any = {};
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '型号名称' },
      efficiencycharge: { type: 'string', title: '蓄热效率', default: 0, minimum: 0, ui: {
        addOnAfter: '%',
        placeholder: '请输入数字',
        validator: val => ((Number(val) > 100) ? [{ keyword: 'required', message: '请输入100以内的数' }] : [])
      }, format: 'regex', pattern: '^\\d+(\\.\\d+)?$'},
      efficiencydischarge: { type: 'string', title: '放热效率', default: 0, minimum: 0, ui: {
        addOnAfter: '%',
        placeholder: '请输入数字',
        validator: val => ((Number(val) > 100) ? [{ keyword: 'required', message: '请输入100以内的数' }] : [])
      }, format: 'regex', pattern: '^\\d+(\\.\\d+)?$'},
      maxchargerate: { type: 'string', title: '最大蓄热倍率', default: 0, minimum: 0,ui: {
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^\\d+(\\.\\d+)?$'},
      maxdischargerate: { type: 'string', title: '最大放热倍率', default: 0, minimum: 0, ui: {
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^\\d+(\\.\\d+)?$'},
      decay: { type: 'string', title: '自损耗率', default: 0, minimum: 0, ui: {
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^\\d+(\\.\\d+)?$'},
      lifeTime: { type: 'string', title: '寿命', default: 0, minimum: 0, ui: {
        addOnAfter: '年',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^\\d+(\\.\\d+)?$'},
      manufacturer: { type: 'string', title: '制造商', maxLength: 140 },

      numberOrCapacity1: { type: 'number', title: '容量1',  default: 0, minimum: 0 },
      capitalCurve1: { type: 'number', title: '初建成本1',  default: 0, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      replacementCost1: { type: 'number', title: '替换成本1',  default: 0, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      maintainCost1: { type: 'number', title: '运维成本1',  default: 0, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      numberOrCapacity2: { type: 'number', title: '容量2',  default: 1, minimum: 0 },
      capitalCurve2: { type: 'number', title: '初建成本2',  default: 1, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      replacementCost2: { type: 'number', title: '替换成本2',  default: 1, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      maintainCost2: { type: 'number', title: '运维成本2',  default: 1, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      numberOrCapacity3: { type: 'number', title: '容量3',  default: 100, minimum: 0 },
      capitalCurve3: { type: 'number', title: '初建成本3',  default: 10000, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      replacementCost3: { type: 'number', title: '替换成本3',  default: 10000, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      maintainCost3: { type: 'number', title: '运维成本3',  default: 10000, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      numberOrCapacity4: { type: 'number', title: '容量4',  default: 10000, minimum: 0 },
      capitalCurve4: { type: 'number', title: '初建成本4',  default: 1000000, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      replacementCost4: { type: 'number', title: '替换成本4',  default: 1000000, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      maintainCost4: { type: 'number', title: '运维成本4',  default: 1000000, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
    },
    required: ['name', 'efficiencycharge', 'efficiencydischarge',
    'maxchargerate', 'maxdischargerate', 'decay', 'lifeTime', 'manufacturer',
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
        .select(this.record.id,"heat_storage")
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
      this.devicesService.update(value,"heat_storage").subscribe((res)=>{
        console.log(res);
        if(res["errno"]=="0"){
          this.modal.destroy("true");
          this.msgSrv.create('success', `success`);
        }
      })
    } else {
      this.devicesService.add(value,"heat_storage").subscribe((res)=>{
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
