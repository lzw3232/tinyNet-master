import {Component, Input, OnInit} from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {STChange, STColumn, STData} from '@delon/abc';

@Component({
  selector: 'app-network-select-heat-storage',
  templateUrl: './heat-storage.component.html',
})




export class NetworkSelectHeatStorageComponent implements OnInit {
  record: any = {};
  i: any;

  @Input() public title;

  forceFit = false; // 宽度自适应
  height = 400;
  data1;
  data2;
  data3;
  data4;
  data5;
  scale;
  style = { stroke: '#fff', lineWidth: 1 };
  chart_title_x = {text: '个数', textStyle: {fill: '#515151'} };
  chart_title_y1 = {text: '初建成本(元)', textStyle: {fill: '#515151'}};
  chart_title_y2 = {text: '替换成本(元)', textStyle: {fill: '#515151'}};
  chart_title_y3 = {text: '运维成本(元)', textStyle: {fill: '#515151'}};

  chart_title_x4 = {text: '风速点', textStyle: {fill: '#515151'} };
  chart_title_y4 = {text: '风速(m/s)', textStyle: {fill: '#515151'}};
  chart_title_x5 = {text: '功率点', textStyle: {fill: '#515151'} };
  chart_title_y5 = {text: '功率(kW)', textStyle: {fill: '#515151'}};

  url = `/tinyNet/device/wind_turbines/list`;
  params = { pi: 1, ps: 3 };

  columns: STColumn[] = [
    { title: '编号', index: 'id', type: 'checkbox', fixed: 'left', width: '80px' },
    { title: '名称', index: 'name', fixed: 'left', width: '120px' },
    { title: '制造商', index: 'factory', fixed: 'left', width: '150px' },
    { title: '额定功率(kW)', index: 'edgl', type: 'number' },
    { title: '风机轮毂高度(米)', index: 'fjlggd', type: 'number' },
    { title: '功率曲线绘制点个数', index: 'glqxnum', type: 'number' },
    { title: '寿命', index: 'life', type: 'number' },
    { title: '类型', index: 'type' },
  ];

  result_data = {
    device : null,
    data : {
      wind_turbines_ids : [],
      wind_turbines_upper_limit : '1.00',
      wind_turbines_lower_limit : '10.00'
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
      this.result_data.data.wind_turbines_ids = [];
      const array = e.checkbox;
      const sourceData1: any[] = [];
      const sourceData2: any[] = [];
      const sourceData3: any[] = [];
      const sourceData4: any[] = [];
      const sourceData5: any[] = [];
      const _this = this;
      array.forEach(function (value) {
        for (let i = 1; i <= 4; i++) {
          sourceData1.push({x : value['capacity' + i], cost_type : value.name, cost_number : value['cjcb' + i]});
          sourceData2.push({x : value['capacity' + i], cost_type : value.name, cost_number : value['gxcb' + i]});
          sourceData3.push({x : value['capacity' + i], cost_type : value.name, cost_number : value['yxwhcb' + i]});
        }

        for (let i = 1; i <= 20; i++) {
          sourceData4.push({x : i, cost_type : value.name, cost_number : value['fs' + i]});
          sourceData5.push({x : i, cost_type : value.name, cost_number : value['gl' + i]});
        }
        _this.result_data.data.wind_turbines_ids.push(value);
      });
      this.data1 = sourceData1;
      this.data2 = sourceData2;
      this.data3 = sourceData3;
      this.data4 = sourceData4;
      this.data5 = sourceData5;

      console.log(this.result_data.data.wind_turbines_ids);

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
