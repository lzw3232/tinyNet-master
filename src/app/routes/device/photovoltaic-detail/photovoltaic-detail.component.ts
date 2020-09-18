import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import {NzMessageService} from 'ng-zorro-antd';
import {DevicePhotovoltaicDetailViewComponent} from './view/view.component';
import {DevicePhotovoltaicDetailEditComponent} from './edit/edit.component';

@Component({
  selector: 'app-device-photovoltaic-detail',
  templateUrl: './photovoltaic-detail.component.html',
})
export class DevicePhotovoltaicDetailComponent implements OnInit {
  url = `/tinyNet/device/photovoltaic/list`;
  searchSchema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '型号名称'
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '型号名称', index: 'name' , fixed: 'left', width: '100px'},
    { title: '额定容量', type: 'number', index: 'edrl' },
    // { title: '太阳能透过率(%)', type: 'number', index: 'tyntgl' },
    { title: '降噪因数', type: 'number', index: 'jeys' },
    { title: '光伏阵列太阳能吸收率(%)', type: 'number', index: 'gfzltynxsl' },
    { title: '光伏发电效率(%)', type: 'number', index: 'gffdxl' },
    { title: 'noct环境温度(°C)', type: 'number', index: 'noctwd' },
    { title: '寿命(年)', type: 'number', index: 'life' },
    { title: '温度系数(%/°C)', type: 'number', index: 'wdxs' },
    { title: 'noct光照强度(kWh/m2/d)', type: 'number', index: 'noctgz' },
    { title: '光伏板标准温度(°C)', type: 'number', index: 'gfbbzwd' },
    { title: 'stcPV电池温度(°C)', type: 'number', index: 'stcwd' },
    // { title: '地面反射率(%)', type: 'number', index: 'dmfsl' },
    // { title: '方位角(°)', type: 'number', index: 'fwj' },
    // { title: '倾斜角(°)', type: 'number', index: 'qxj' },
    { title: '制造商', index: 'factory', width: '150px' },
    { title: '类型', index: 'type', width: '100px'},
    {
      title: '',
      fixed: 'right', width: '120px',
      buttons: [
        { text: '<i class="anticon anticon-file-text"></i>', type: 'static',
          component: DevicePhotovoltaicDetailViewComponent,
          click: (item: any) => console.log('查看成功' + item.name)
        },
        { text: '<i class="anticon anticon-edit"></i>',
          type: 'static', component: DevicePhotovoltaicDetailEditComponent,
          click: 'reload'
        },
        { text: '<i class="anticon anticon-delete"></i>',
          type: 'del',
          click: (record, modal, comp) => {
            this.http
              .post('/tinyNet/device/photovoltaic/delete', {id : record.id})
              .subscribe(res => {
                this.msgSrv.success(`成功删除 ${record.name}`);
                // comp.removeRow(record);
                comp.reload();
              });
          }
        },
      ]
    }
  ];

  constructor(private http: _HttpClient,
              private modal: ModalHelper,
              private msgSrv: NzMessageService) { }

  ngOnInit() { }

  add() {
    this.modal
      .createStatic(DevicePhotovoltaicDetailEditComponent, { i: { id: 0 } })
      .subscribe(() => this.st.reload());
  }

}
