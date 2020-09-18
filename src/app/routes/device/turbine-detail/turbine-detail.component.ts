import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import {DeviceTurbineDetailViewComponent} from "./view/view.component";
import {NzMessageService} from "ng-zorro-antd";
import {DeviceTurbineDetailEditComponent} from "./edit/edit.component";

@Component({
  selector: 'app-device-turbine-detail',
  templateUrl: './turbine-detail.component.html',
})
export class DeviceTurbineDetailComponent implements OnInit {
  url = `/tinyNet/device/turbine/list`;
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
    { title: '额定水头(m)', type: 'number', index: 'edst' },
    { title: '额定功率(kW)', type: 'number', index: 'edgl' },
    { title: '水轮机效率(%)', type: 'number', index: 'sljxl' },
    { title: '发电机效率(%)', type: 'number', index: 'fdjxl' },
    { title: '寿命(年)', type: 'number', index: 'life' },
    { title: '制造商', index: 'factory' },
    {
      title: '',
      fixed: 'right', width: '120px',
      buttons: [
        { text: '<i class="anticon anticon-file-text"></i>', type: 'static',
          component: DeviceTurbineDetailViewComponent,
          click: (item: any) => console.log('查看成功' + item.name)
        },
        { text: '<i class="anticon anticon-edit"></i>',
          type: 'static', component: DeviceTurbineDetailEditComponent,
          click: 'reload'
        },
        { text: '<i class="anticon anticon-delete"></i>',
          type: 'del',
          click: (record, modal, comp) => {
            this.http
              .post('/tinyNet/device/turbine/delete', {id : record.id})
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
              public msgSrv: NzMessageService) { }

  ngOnInit() { }

  add() {
    this.modal
      .createStatic(DeviceTurbineDetailEditComponent, { i: { id: 0 } })
      .subscribe(() => this.st.reload());
  }

}
