import {Component, OnInit} from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {FormProperty, PropertyGroup, SFSchema, SFUISchema} from '@delon/form';
import {DevicesService} from "../../../../user-service/devicesService";

@Component({
  selector: 'app-device-screw-detail-edit',
  templateUrl: './edit.component.html',
})
export class ScrewDetailEditComponent implements OnInit {
  i : any;
  record: any = {};
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '型号名称' },
      power: { type: 'string', title: '额定电功率', default: 0, minimum: 0, ui: {
        // widget: 'string',
        addOnAfter: 'kW',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      costRate: { type: 'string', title: '耗电系数', default: 0, minimum: 0, ui: {
        addOnAfter: '%',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      loadRate: { type: 'string', title: '综合部分负荷性能系数', default: 0, minimum: 0,ui: {
        addOnAfter: 'IPLV',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      life: { type: 'string', title: '寿命', default: 0, minimum: 0, ui: {
        addOnAfter: '年',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      manufacturer: { type: 'string', title: '制造商', maxLength: 140 },

      number1: { type: 'number', title: '个数1',  default: 0, minimum: 0 },
      newCost1: { type: 'number', title: '初建成本1',  default: 0, minimum: 0 },
      updateCost1: { type: 'number', title: '替换成本1',  default: 0, minimum: 0 },
      runCost1: { type: 'number', title: '运维成本1',  default: 0, minimum: 0 },
      number2: { type: 'number', title: '个数2',  default: 1, minimum: 0 },
      newCost2: { type: 'number', title: '初建成本2',  default: 1, minimum: 0 },
      updateCost2: { type: 'number', title: '替换成本2',  default: 1, minimum: 0 },
      runCost2: { type: 'number', title: '运维成本2',  default: 1, minimum: 0 },
      number3: { type: 'number', title: '个数3',  default: 100, minimum: 0 },
      newCost3: { type: 'number', title: '初建成本3',  default: 10000, minimum: 0 },
      updateCost3: { type: 'number', title: '替换成本3',  default: 10000, minimum: 0 },
      runCost3: { type: 'number', title: '运维成本3',  default: 10000, minimum: 0 },
      number4: { type: 'number', title: '个数4',  default: 10000, minimum: 0 },
      newCost4: { type: 'number', title: '初建成本4',  default: 1000000, minimum: 0 },
      updateCost4: { type: 'number', title: '替换成本4',  default: 1000000, minimum: 0 },
      runCost4: { type: 'number', title: '运维成本4',  default: 1000000, minimum: 0 },
    },
    required: ['name', 'power', 'costRate', 'loadRate', 'life', 'manufacturer',
      'number1', 'newCost1', 'updateCost1', 'runCost1',
      'number2', 'newCost2', 'updateCost2', 'runCost2',
      'number3', 'newCost3', 'updateCost3', 'runCost3',
      'number4', 'newCost4', 'updateCost4', 'runCost4'],
  };
  ui: SFUISchema = {
    '*': {
      grid: { span: 12 },
      spanLabel : 10,
      spanControl : 14
    },
    '$number1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$newCost1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$updateCost1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$runCost1': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$number2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$newCost2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$updateCost2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$runCost2': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$number3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$newCost3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$updateCost3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$runCost3': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$number4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$newCost4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$updateCost4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$runCost4': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
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
        .select(this.record.id,"screw")
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
      this.devicesService.update(value,"screw").subscribe((res)=>{
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
      this.devicesService.add(value,"screw").subscribe((res)=>{
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
