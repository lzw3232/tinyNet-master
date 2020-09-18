import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-device-turbine-detail-view',
  templateUrl: './view.component.html',
})
export class DeviceTurbineDetailViewComponent implements OnInit {
  record: any = {};
  i: any;

  data;
  forceFit = true;
  width = 400;
  height = 400;
  style = { stroke: '#fff', lineWidth: 1 };
  chart_title_x = {text: '个数', textStyle: {fill: '#515151'} };
  chart_title_y = {text: '成本(元)', textStyle: {fill: '#515151'}};

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient
  ) { }

  ngOnInit(): void {
    this.http
      .post('/tinyNet/device/turbine/select', {id : this.record.id})
      .subscribe(res => {
        this.i = res;
        const sourceData: any[] = [
          {x : this.i.capacity1, 初建成本 : this.i.cjcb1, 替换成本 : this.i.gxcb1, 运维成本 : this.i.yxwhcb1},
          {x : this.i.capacity2, 初建成本 : this.i.cjcb2, 替换成本 : this.i.gxcb2, 运维成本 : this.i.yxwhcb2},
          {x : this.i.capacity3, 初建成本 : this.i.cjcb3, 替换成本 : this.i.gxcb3, 运维成本 : this.i.yxwhcb3},
          {x : this.i.capacity4, 初建成本 : this.i.cjcb4, 替换成本 : this.i.gxcb4, 运维成本 : this.i.yxwhcb4},
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
      });
  }

  close() {
    this.modal.destroy();
  }
}
