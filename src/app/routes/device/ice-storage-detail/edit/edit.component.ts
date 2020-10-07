import {Component, OnInit} from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {FormProperty, PropertyGroup, SFSchema, SFUISchema} from '@delon/form';
import {DevicesService} from "../../../../user-service/devicesService";

@Component({
  selector: 'app-device-ice-storage-detail-edit',
  templateUrl: './edit.component.html',
})
export class IceStorageDetailEditComponent implements OnInit {
  i : any;
  record: any = {};
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '型号名称' },
      iceStorageEfficiency: { type: 'string', title: '蓄热效率', default: 0, minimum: 0, ui: {
        addOnAfter: '%',
        placeholder: '请输入数字',
        validator: val => ((Number(val) > 100) ? [{ keyword: 'required', message: '请输入100以内的数' }] : [])
      }, format: 'regex', pattern: '^\\d+(\\.\\d+)?$'},
      iceReleaseEfficiency: { type: 'string', title: '放热效率', default: 0, minimum: 0, ui: {
        addOnAfter: '%',
        placeholder: '请输入数字',
        validator: val => ((Number(val) > 100) ? [{ keyword: 'required', message: '请输入100以内的数' }] : [])
      }, format: 'regex', pattern: '^\\d+(\\.\\d+)?$'},
      maximumIceStorageRate: { type: 'string', title: '最大蓄热倍率', default: 0, minimum: 0,ui: {
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^\\d+(\\.\\d+)?$'},
      maximumIceReleaseRate: { type: 'string', title: '最大放热倍率', default: 0, minimum: 0, ui: {
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^\\d+(\\.\\d+)?$'},
      selfLossRate: { type: 'string', title: '自损耗率', default: 0, minimum: 0, ui: {
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^\\d+(\\.\\d+)?$'},
      life: { type: 'string', title: '寿命', default: 0, minimum: 0, ui: {
        addOnAfter: '年',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^\\d+(\\.\\d+)?$'},
      manufacturer: { type: 'string', title: '制造商', maxLength: 140 },

      capacity1: { type: 'number', title: '容量1',  default: 0, minimum: 0 },
      initialConstructionCost1: { type: 'number', title: '初建成本1',  default: 0, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      updateCost1: { type: 'number', title: '替换成本1',  default: 0, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      operationAndMaintenanceCosts1: { type: 'number', title: '运维成本1',  default: 0, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      capacity2: { type: 'number', title: '容量2',  default: 1, minimum: 0 },
      initialConstructionCost2: { type: 'number', title: '初建成本2',  default: 1, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      updateCost2: { type: 'number', title: '替换成本2',  default: 1, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      operationAndMaintenanceCosts2: { type: 'number', title: '运维成本2',  default: 1, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      capacity3: { type: 'number', title: '容量3',  default: 100, minimum: 0 },
      initialConstructionCost3: { type: 'number', title: '初建成本3',  default: 10000, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      updateCost3: { type: 'number', title: '替换成本3',  default: 10000, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      operationAndMaintenanceCosts3: { type: 'number', title: '运维成本3',  default: 10000, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      capacity4: { type: 'number', title: '容量4',  default: 10000, minimum: 0 },
      initialConstructionCost4: { type: 'number', title: '初建成本4',  default: 1000000, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      updateCost4: { type: 'number', title: '替换成本4',  default: 1000000, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
      operationAndMaintenanceCosts4: { type: 'number', title: '运维成本4',  default: 1000000, minimum: 0 , ui: {
        validator: val => (!String(val).match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) ? [{ keyword: 'required', message: '至多为两位小数' }] : []
      },},
    },
    required: ['name', 'iceStorageEfficiency', 'iceReleaseEfficiency',
    'maximumIceStorageRate', 'maximumIceReleaseRate', 'selfLossRate', 'life', 'manufacturer',
      'capacity1', 'initialConstructionCost1', 'updateCost1', 'operationAndMaintenanceCosts1',
      'capacity2', 'initialConstructionCost2', 'updateCost2', 'operationAndMaintenanceCosts2',
      'capacity3', 'initialConstructionCost3', 'updateCost3', 'operationAndMaintenanceCosts3',
      'capacity4', 'initialConstructionCost4', 'updateCost4', 'operationAndMaintenanceCosts4'],
  };
  ui: SFUISchema = {
    '*': {
      grid: { span: 12 },
      spanLabel : 10,
      spanControl : 14
    },
    '$capacity1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$initialConstructionCost1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$updateCost1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$operationAndMaintenanceCosts1': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capacity2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$initialConstructionCost2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$updateCost2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$operationAndMaintenanceCosts2': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capacity3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$initialConstructionCost3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$updateCost3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$operationAndMaintenanceCosts3': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capacity4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$initialConstructionCost4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$updateCost4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$operationAndMaintenanceCosts4': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
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
        .select(this.record.id,"ice_storage")
        .subscribe(res => {
          console.log(res);
          if(res["errno"]=="0"){
            this.i = res["data"]["data"]["data"];
          }
          else if(res["errno"]=="2"){
            this.devicesService.tologin();
          }
          else{
            this.msgSrv.create('error', `error`);
          }
          this.devicesService.setCookie("token",res["data"]["data"]["token"]);
        });
    }
  }

  save(value: any) {
    //如果存在 record 记录，则做更新操作，否则为新建操作
    console.log(value);
    if (this.record.id) {
      this.devicesService.update(value,"ice_storage").subscribe((res)=>{
        console.log(res);
        if(res["errno"]=="0"){
          this.modal.destroy("true");
          this.msgSrv.create('success', `success`);
        }
        else if(res["errno"]=="2"){
          this.devicesService.tologin();
        }
        else{
          this.msgSrv.create('error', `error`);
        }
        this.devicesService.setCookie("token",res["data"]["data"]["token"]);
      })
    } else {
      this.devicesService.add(value,"ice_storage").subscribe((res)=>{
        console.log(res);
        if(res["errno"]=="0"){
          this.modal.destroy("true");
          this.msgSrv.create('success', `success`);
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

  }

  close() {
    this.modal.destroy(false);
  }
}
