import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import {NzMessageService} from 'ng-zorro-antd';
import {DeviceGeneratorDetailViewComponent} from './view/view.component';
import {DeviceGeneratorDetailEditComponent} from "./edit/edit.component";

@Component({
  selector: 'app-device-generator-detail',
  templateUrl: './generator-detail.component.html',
})
export class DeviceGeneratorDetailComponent implements OnInit {
  url = `/tinyNet/device/generator/list`;
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
    { title: '额定功率(kW)', type: 'number', index: 'edgl' },
    { title: '最低负载率(%)', type: 'number', index: 'zdfzl' },
    { title: '最小运营时间(时)', type: 'number', index: 'zxyysj' },
    { title: '二氧化碳(g/L)', type: 'number', index: 'co2' },
    { title: '一氧化碳(g/L)', type: 'number', index: 'co' },
    { title: '未燃烧碳氢化合物(g/L)', type: 'number', index: 'wrsdqhhw' },
    { title: '寿命(年)', type: 'number', index: 'life' },
    { title: '颗粒物(g/L)', type: 'number', index: 'klw' },
    { title: '二氧化硫(g/L)', type: 'number', index: 'so2' },
    { title: '氮氧化物(g/L)', type: 'number', index: 'dyhw' },
    { title: '功率曲线点数', type: 'number', index: 'glqxnum' },
    { title: '制造商', index: 'factory', width: '150px' },
    { title: '类型', index: 'type', width: '100px'},
    {
      title: '',
      fixed: 'right', width: '120px',
      buttons: [
        { text: '<i class="anticon anticon-file-text"></i>', type: 'static',
          component: DeviceGeneratorDetailViewComponent,
          click: (item: any) => console.log('查看成功' + item.name)
        },
        { text: '<i class="anticon anticon-edit"></i>',
          type: 'static', component: DeviceGeneratorDetailEditComponent,
          click: 'reload'
        },
        { text: '<i class="anticon anticon-delete"></i>',
          type: 'del',
          click: (record, modal, comp) => {
            this.http
              .post('/tinyNet/device/generator/delete', {id : record.id})
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
      .createStatic(DeviceGeneratorDetailEditComponent, { i: { id: 0 } })
      .subscribe(() => this.st.reload());
  }

}
