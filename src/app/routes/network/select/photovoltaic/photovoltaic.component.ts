import {Component, Input, OnInit} from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {STChange, STColumn, STData} from '@delon/abc';

@Component({
  selector: 'app-network-select-photovoltaic',
  templateUrl: './photovoltaic.component.html',
})
export class NetworkSelectPhotovoltaicComponent implements OnInit {
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

  url = `/tinyNet/device/photovoltaic/list`;
  params = { pi: 1, ps: 3 };

  columns: STColumn[] = [
    { title: '编号', index: 'id', type: 'checkbox', fixed: 'left', width: '80px' },
    { title: '名称', index: 'name', fixed: 'left', width: '120px' },
    { title: '制造商', index: 'factory', fixed: 'left', width: '150px' },
    { title: '额定容量', index: 'edrl', type: 'number' },
    { title: '降噪因数', index: 'jeys', type: 'number' },
    { title: '光伏阵列太阳能吸收率(%)', index: 'gfzltynxsl', type: 'number' },
    { title: '光伏发电效率(%)', index: 'gffdxl', type: 'number' },
    { title: 'noct条件下的环境温度(°C)', index: 'noctwd', type: 'number' },
    { title: '温度系数(%/°C)', index: 'wdxs', type: 'number' },
    { title: 'noct条件下的光照强度', index: 'noctgz', type: 'number' },
    { title: '光伏板标准温度(°C)', index: 'gfbbzwd', type: 'number' },
    { title: 'stc条件下的PV电池温度(°C)', index: 'stcwd', type: 'number' },
    { title: '寿命', index: 'life', type: 'number' },
    { title: '类型', index: 'type' },
  ];

  result_data = {
    device : null,
    data : {
      photovoltaic_ids : [],
      photovoltaic_upper_limit : '1.00',
      photovoltaic_lower_limit : '10.00',
      photovoltaic_fwj : '20.00',  // 方位角（°）
      photovoltaic_qxj : '22.00', // 倾斜角（°）
      photovoltaic_dmfsl : '20.00', // 地面反射率
      photovoltaic_tyntgl : '90.00' // 太阳能通过率
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
      this.result_data.data.photovoltaic_ids = [];
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

        _this.result_data.data.photovoltaic_ids.push(value);
      });
      this.data1 = sourceData1;
      this.data2 = sourceData2;
      this.data3 = sourceData3;

      console.log(this.result_data.data.photovoltaic_ids);

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
