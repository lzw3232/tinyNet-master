import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-device-turbine-detail-edit',
  templateUrl: './edit.component.html',
})
export class DeviceTurbineDetailEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '型号名称' },
      edst: { type: 'string', title: '额定水头', default: 0, minimum: 0, ui: {
        // widget: 'string',
        addOnAfter: 'm',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      edgl: { type: 'string', title: '额定功率', default: 0, minimum: 0, ui: {
        addOnAfter: 'kW',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      sljxl: { type: 'string', title: '水轮机效率', default: 0, minimum: 0, ui: {
        addOnAfter: '%',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      fdjxl: { type: 'string', title: '发电机效率',  default: 0, minimum: 0, ui: {
        addOnAfter: '%',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      life: { type: 'string', title: '寿命', default: 0, minimum: 0, ui: {
        addOnAfter: '年',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      factory: { type: 'string', title: '制造商', maxLength: 140 },

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
    },
    required: ['name', 'edst', 'edgl', 'sljxl', 'fdjxl', 'life', 'factory',
      'capacity1', 'cjcb1', 'gxcb1', 'yxwhcb1',
      'capacity2', 'cjcb2', 'gxcb2', 'yxwhcb2',
      'capacity3', 'cjcb3', 'gxcb3', 'yxwhcb3',
      'capacity4', 'cjcb4', 'gxcb4', 'yxwhcb4'],
  };
  ui: SFUISchema = {
    '*': {
      grid: { span: 12 },
      spanLabel : 10,
      spanControl : 14
    },
    '$factory': {grid: { span: 24 }, spanLabel : 5, spanControl : 7},
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
  };

  constructor(
    private modal: NzModalRef,
    public http: _HttpClient,
    public msgSrv: NzMessageService,
  ) {}

  ngOnInit(): void {
    if (this.record.id) {
      this.http
        .post('/tinyNet/device/turbine/select', {id : this.record.id})
        .subscribe(res => {
          this.i = res;
        });
    }
  }

  save(value: any) {
    // 如果存在 record 记录，则做更新操作，否则为新建操作
    if (this.record.id) {
      this.http
        .post('/tinyNet/device/turbine/update', {battery : value})
        .subscribe(
          res => {
            this.msgSrv.success('更新成功');
            this.modal.close(true);
          },
          error => {
            this.msgSrv.error('更新失败');
            this.modal.close(true);
          });
    } else {
      this.http
        .post('/tinyNet/device/turbine/add', {battery : value})
        .subscribe(
          res => {
            this.msgSrv.success('添加成功');
            this.modal.close(true);
          },
          error => {
            this.msgSrv.error('添加失败');
            this.modal.close(true);
          });
    }
  }

  close() {
    this.modal.destroy();
  }
}
