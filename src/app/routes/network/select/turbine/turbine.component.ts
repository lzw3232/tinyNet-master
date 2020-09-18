import {Component, Input, OnInit} from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {STChange, STColumn, STData} from "@delon/abc";

@Component({
  selector: 'app-network-select-turbine',
  templateUrl: './turbine.component.html',
})
export class NetworkSelectTurbineComponent implements OnInit {
  record: any = {};
  i: any;

  @Input() public title;

  forceFit = false; // 宽度自适应
  height = 400;
  data1;
  data2;
  data3;
  scale;
  style = { stroke: '#fff', lineWidth: 1 };
  chart_title_x = {text: '个数', textStyle: {fill: '#515151'} };
  chart_title_y1 = {text: '初建成本(元)', textStyle: {fill: '#515151'}};
  chart_title_y2 = {text: '替换成本(元)', textStyle: {fill: '#515151'}};
  chart_title_y3 = {text: '运维成本(元)', textStyle: {fill: '#515151'}};

  url = `/tinyNet/device/turbine/list`;
  params = { pi: 1, ps: 3 };

  columns: STColumn[] = [
    { title: '编号', index: 'id', type: 'checkbox', fixed: 'left', width: '80px' },
    { title: '名称', index: 'name', fixed: 'left', width: '120px' },
    { title: '制造商', index: 'factory', fixed: 'left', width: '150px' },
    { title: '额定水头(m)', index: 'edst', type: 'number' },
    { title: '额定功率(kW)', index: 'edgl', type: 'number' },
    { title: '水轮机效率(%)', index: 'sljxl', type: 'number' },
    { title: '发电机效率(%)', index: 'fdjxl', type: 'number' },
    { title: '寿命', index: 'life', type: 'number' },
    { title: '类型', index: 'type' },
  ];

  result_data = {
    device : null,
    data : {
      turbine_ids : [],
      turbine_upper_limit : '1.00',
      turbine_lower_limit : '10.00'
    }
  };

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient
  ) { }

  ngOnInit(): void {
    this.result_data.device = this.title;
  }

  close() {
    this.modal.destroy(this.result_data);
  }

  change(e: STChange) {

    if (e.type === 'checkbox') {
      console.log('change', e);
      this.result_data.data.turbine_ids = [];
      const array = e.checkbox;
      const sourceData1: any[] = [];
      const sourceData2: any[] = [];
      const sourceData3: any[] = [];
      const _this = this;
      array.forEach(function (value) {
        for (let i = 1; i <= 4; i++) {
          sourceData1.push({x : value['capacity' + i], cost_type : value.name, cost_number : value['cjcb' + i]});
          sourceData2.push({x : value['capacity' + i], cost_type : value.name, cost_number : value['gxcb' + i]});
          sourceData3.push({x : value['capacity' + i], cost_type : value.name, cost_number : value['yxwhcb' + i]});
        }
        _this.result_data.data.turbine_ids.push(value);
      });
      this.data1 = sourceData1;
      this.data2 = sourceData2;
      this.data3 = sourceData3;

      console.log(this.result_data.data.turbine_ids);

      // this.result_data.data.battery_id = e.radio.id;
    }
  }

  dataProcess(data: STData[]) {
    return data.map((i: STData, index: number) => {
      i.checked = false;
      return i;
    });
  }
}
