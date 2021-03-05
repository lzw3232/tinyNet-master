import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import {DevicesService} from "../../../../user-service/devicesService";

@Component({
  selector: 'app-device-wind-turbines-detail-edit',
  templateUrl: './edit.component.html',
})
export class DeviceWindTurbinesDetailEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '型号名称' },
      edgl: { type: 'string', title: '额定功率', default: 0, minimum: 0, ui: {
        // widget: 'string',
        addOnAfter: 'kW',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      fjlggd: { type: 'string', title: '风机轮毂高度', default: 0, minimum: 0, ui: {
        addOnAfter: '米',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      glqxnum: { type: 'string', title: '功率曲线绘制点个数', default: 0, minimum: 0,
        format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      life: { type: 'string', title: '寿命', default: 0, minimum: 0, ui: {
        addOnAfter: '年',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      factory: { type: 'string', title: '制造商', maxLength: 140 },
      type: {
        type: 'string',
        title: '类型',
        enum: [ { label: '交流', value: 0 }, { label: '直流', value: 1 } ],
        default: 0 },
      capacity1: { type: 'number', title: '个数1',  default: 0, minimum: 0 },
      cjcb1: { type: 'number', title: '初建成本1',  default: 0, minimum: 0 },
      gxcb1: { type: 'number', title: '替换成本1',  default: 0, minimum: 0 },
      yxwhcb1: { type: 'number', title: '运维成本1',  default: 0, minimum: 0 },
      capacity2: { type: 'number', title: '个数2',  default: 1, minimum: 0 },
      cjcb2: { type: 'number', title: '初建成本2',  default: 1, minimum: 0 },
      gxcb2: { type: 'number', title: '替换成本2',  default: 1, minimum: 0 },
      yxwhcb2: { type: 'number', title: '运维成本2',  default: 1, minimum: 0 },
      capacity3: { type: 'number', title: '个数3',  default: 100, minimum: 0 },
      cjcb3: { type: 'number', title: '初建成本3',  default: 10000, minimum: 0 },
      gxcb3: { type: 'number', title: '替换成本3',  default: 10000, minimum: 0 },
      yxwhcb3: { type: 'number', title: '运维成本3',  default: 10000, minimum: 0 },
      capacity4: { type: 'number', title: '个数4',  default: 10000, minimum: 0 },
      cjcb4: { type: 'number', title: '初建成本4',  default: 1000000, minimum: 0 },
      gxcb4: { type: 'number', title: '替换成本4',  default: 1000000, minimum: 0 },
      yxwhcb4: { type: 'number', title: '运维成本4',  default: 1000000, minimum: 0 },
      fs1: { type: 'number', title: '风速1',  default: 0, minimum: 0 },
      fs2: { type: 'number', title: '风速2',  default: 0, minimum: 0 },
      fs3: { type: 'number', title: '风速3',  default: 0, minimum: 0 },
      fs4: { type: 'number', title: '风速4',  default: 0, minimum: 0 },
      fs5: { type: 'number', title: '风速5',  default: 0, minimum: 0 },
      fs6: { type: 'number', title: '风速6',  default: 0, minimum: 0 },
      fs7: { type: 'number', title: '风速7',  default: 0, minimum: 0 },
      fs8: { type: 'number', title: '风速8',  default: 0, minimum: 0 },
      fs9: { type: 'number', title: '风速9',  default: 0, minimum: 0 },
      fs10: { type: 'number', title: '风速10',  default: 0, minimum: 0 },
      fs11: { type: 'number', title: '风速11',  default: 0, minimum: 0 },
      fs12: { type: 'number', title: '风速12',  default: 0, minimum: 0 },
      fs13: { type: 'number', title: '风速13',  default: 0, minimum: 0 },
      fs14: { type: 'number', title: '风速14',  default: 0, minimum: 0 },
      fs15: { type: 'number', title: '风速15',  default: 0, minimum: 0 },
      fs16: { type: 'number', title: '风速16',  default: 0, minimum: 0 },
      fs17: { type: 'number', title: '风速17',  default: 0, minimum: 0 },
      fs18: { type: 'number', title: '风速18',  default: 0, minimum: 0 },
      fs19: { type: 'number', title: '风速19',  default: 0, minimum: 0 },
      fs20: { type: 'number', title: '风速20',  default: 0, minimum: 0 },
      gl1: { type: 'number', title: '功率1',  default: 0, minimum: 0 },
      gl2: { type: 'number', title: '功率2',  default: 0, minimum: 0 },
      gl3: { type: 'number', title: '功率3',  default: 0, minimum: 0 },
      gl4: { type: 'number', title: '功率4',  default: 0, minimum: 0 },
      gl5: { type: 'number', title: '功率5',  default: 0, minimum: 0 },
      gl6: { type: 'number', title: '功率6',  default: 0, minimum: 0 },
      gl7: { type: 'number', title: '功率7',  default: 0, minimum: 0 },
      gl8: { type: 'number', title: '功率8',  default: 0, minimum: 0 },
      gl9: { type: 'number', title: '功率9',  default: 0, minimum: 0 },
      gl10: { type: 'number', title: '功率10',  default: 0, minimum: 0 },
      gl11: { type: 'number', title: '功率11',  default: 0, minimum: 0 },
      gl12: { type: 'number', title: '功率12',  default: 0, minimum: 0 },
      gl13: { type: 'number', title: '功率13',  default: 0, minimum: 0 },
      gl14: { type: 'number', title: '功率14',  default: 0, minimum: 0 },
      gl15: { type: 'number', title: '功率15',  default: 0, minimum: 0 },
      gl16: { type: 'number', title: '功率16',  default: 0, minimum: 0 },
      gl17: { type: 'number', title: '功率17',  default: 0, minimum: 0 },
      gl18: { type: 'number', title: '功率18',  default: 0, minimum: 0 },
      gl19: { type: 'number', title: '功率19',  default: 0, minimum: 0 },
      gl20: { type: 'number', title: '功率20',  default: 0, minimum: 0 },
    },
    required: ['name', 'edgl', 'fjlggd', 'glqxnum', 'life', 'factory', 'type',
      'capacity1', 'cjcb1', 'gxcb1', 'yxwhcb1',
      'capacity2', 'cjcb2', 'gxcb2', 'yxwhcb2',
      'capacity3', 'cjcb3', 'gxcb3', 'yxwhcb3',
      'capacity4', 'cjcb4', 'gxcb4', 'yxwhcb4',
      'fs1', 'fs2', 'fs3', 'fs4', 'fs5',
      'fs6', 'fs7', 'fs8', 'fs9', 'fs10',
      'fs11', 'fs12', 'fs13', 'fs14', 'fs15',
      'fs16', 'fs17', 'fs18', 'fs19', 'fs20',
      'gl1', 'gl2', 'gl3', 'gl4', 'gl5',
      'gl6', 'gl7', 'gl8', 'gl9', 'gl10',
      'gl11', 'gl12', 'gl13', 'gl14', 'gl15',
      'gl16', 'gl17', 'gl18', 'gl19', 'gl20'],
  };
  ui: SFUISchema = {
    '*': {
      grid: { span: 12 },
      spanLabel : 10,
      spanControl : 14
    },
    '$type': {grid: { span: 24 }, spanLabel : 5, spanControl : 7},
    '$capacity1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$cjcb1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gxcb1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$yxwhcb1': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capacity2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$cjcb2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gxcb2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$yxwhcb2': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capacity3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$cjcb3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gxcb3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$yxwhcb3': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capacity4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$cjcb4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gxcb4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$yxwhcb4': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs1': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs2': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs3': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs4': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs5': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs6': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs7': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs8': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs9': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs10': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs11': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs12': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs13': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs14': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs15': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs16': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs17': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs18': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs19': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fs20': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl1': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl2': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl3': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl4': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl5': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl6': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl7': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl8': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl9': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl10': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl11': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl12': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl13': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl14': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl15': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl16': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl17': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl18': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl19': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gl20': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
  };

  constructor(
    private modal: NzModalRef,
    public http: _HttpClient,
    private msgSrv: NzMessageService,
    private devicesService:DevicesService
  ) {}

  ngOnInit(): void {
    console.log(this.record);
    console.log(this.i);
    if (this.record.id) {
      // this.http.get(`/user/${this.record.id}`).subscribe(res => (this.i = res));
      this.devicesService
        .select(this.record.id,"wind_turbines")
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
      this.devicesService.update(value,"wind_turbines").subscribe((res)=>{
        console.log(res);
        if(res["errno"]=="0"){
          this.modal.destroy("true");
          this.msgSrv.create('success', `success`);
        }
      })
    } else {
      this.devicesService.add(value,"wind_turbines").subscribe((res)=>{
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
