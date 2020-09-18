import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import {NzMessageService} from "ng-zorro-antd";
import {DeviceWindGeneratorDetailViewComponent} from "./view/view.component";
import {DeviceWindGeneratorDetailEditComponent} from "./edit/edit.component";

@Component({
  selector: 'app-device-wind-generator-detail',
  templateUrl: './wind-generator-detail.component.html',
})
export class DeviceWindGeneratorDetailComponent implements OnInit {
  url = `/tinyNet/device/wind_turbines/list`;
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
    { title: '型号名称', index: 'name', fixed: 'left', width: '120px' },
    { title: '制造商', index: 'factory', fixed: 'left', width: '150px' },
    { title: '额定功率(kW)', index: 'edgl', type: 'number' },
    { title: '风机轮毂高度(米)', index: 'fjlggd', type: 'number' },
    { title: '功率曲线绘制点个数', index: 'glqxnum', type: 'number' },
    { title: '寿命(年)', index: 'life', type: 'number' },
    { title: '类型', index: 'type' },
    {
      title: '',
      fixed: 'right', width: '120px',
      buttons: [
        { text: '<i class="anticon anticon-file-text"></i>', type: 'static',
          component: DeviceWindGeneratorDetailViewComponent,
          click: (item: any) => console.log('查看成功' + item.name)
        },
        { text: '<i class="anticon anticon-edit"></i>',
          type: 'static', component: DeviceWindGeneratorDetailEditComponent,
          click: 'reload'
        },
        { text: '<i class="anticon anticon-delete"></i>',
          type: 'del',
          click: (record, modal, comp) => {
            this.http
              .post('/tinyNet/device/wind_turbines/delete', {id : record.id})
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
      .createStatic(DeviceWindGeneratorDetailEditComponent, { i: { id: 0 } })
      .subscribe(() => this.st.reload());
  }

}
