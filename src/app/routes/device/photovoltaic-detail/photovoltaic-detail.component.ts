import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {STChange, STColumn, STComponent, STPage} from '@delon/abc';
import { SFSchema } from '@delon/form';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {PhotovoltaicDetailViewComponent} from './view/view.component';
import {PhotovoltaicDetailEditComponent} from './edit/edit.component';
import {DevicesService} from "../../../user-service/devicesService";

@Component({
  selector: 'app-device-photovoltaic-detail',
  templateUrl: './photovoltaic-detail.component.html',
})
export class PhotovoltaicDetailComponent implements OnInit {
  data : any;
  pi : Number;
  ps : Number;
  total=0;
  val="";

  searchSchema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '型号名称'
      }
    }
  };
  pages: STPage = {
    total: '',//分页显示多少条数据，字符串型
    show: true,//显示分页
    front: false //关闭前端分页，true是前端分页，false后端控制分页
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '型号名称', index: 'name' , fixed: 'left', width: '100px'},
    { title: '额定容量', type: 'number', index: 'deratingFactor' },
    // { title: '太阳能透过率(%)', type: 'number', index: 'tyntgl' },
    { title: '降噪因数', type: 'number', index: 'decayFactor' },
    { title: '光伏阵列太阳能吸收率(%)', type: 'number', index: 'absorptivity' },
    { title: '光伏发电效率(%)', type: 'number', index: 'efficiency' },
    { title: 'noct环境温度(°C)', type: 'number', index: 'noctEnvirTemper' },
    { title: '寿命(年)', type: 'number', index: 'lifeTime' },
    { title: '温度系数(%/°C)', type: 'number', index: 'temperatureCoefficient' },
    { title: 'noct光照强度(kWh/m2/d)', type: 'number', index: 'noctRadiation' },
    { title: '光伏板标准温度(°C)', type: 'number', index: 'nominalOperatingCellTemperature' },
    { title: 'stcPV电池温度(°C)', type: 'number', index: 'batteryTemperInStc' },
    // { title: '地面反射率(%)', type: 'number', index: 'dmfsl' },
    // { title: '方位角(°)', type: 'number', index: 'fwj' },
    // { title: '倾斜角(°)', type: 'number', index: 'qxj' },
    { title: '制造商', index: 'manufacturer', width: '150px' },
    { title: '类型', index: 'dAtype', width: '100px',render:'custom'},
    {
      title: '',
      fixed: 'right', width: '120px',
      buttons: [
        { text: '<i class="anticon anticon-file-text"></i>', type: 'static',
          component: PhotovoltaicDetailViewComponent,
          click: (item: any) => console.log('查看成功' + item.name)
        },
        { text: '<i class="anticon anticon-edit"></i>',
          type: 'static', component: PhotovoltaicDetailEditComponent,
          click: (record, _modal, comp) => {
            this.getlist(this.pi);
          }
        },
        { text: '<i class="anticon anticon-delete"></i>',
          click: (record, _modal, comp) => {
            this.modalService.confirm({
              nzTitle: '确认删除么？？？',
              nzOkText: 'OK',
              nzCancelText: 'Cancel',
              nzOnOk:()=>{
                this.devicesService.delete(record.id,"photovoltaic")
                  .subscribe((res) => {
                    console.log(res);
                    if(res["errno"]=="0"){
                      this.msgSrv.success(`成功删除 ${record.name}`);
                    }
                    // comp.removeRow(record);
                    this.getlist(this.pi);
                  });
              }
            })

          }
        },
      ]
    }
  ];

  constructor(private http: _HttpClient,
              private modal: ModalHelper,
              private msgSrv: NzMessageService,
              private devicesService: DevicesService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.pi = 1;
    this.ps = 10;
    this.getlist(this.pi);
  }

  add() {
    this.modal
      .createStatic(PhotovoltaicDetailEditComponent, { i: { id: 0 } })
      .subscribe(res=>{
        if(res){
          this.getlist(this.pi);
        }
      })
  }

  change(ret: STChange) {
    if(ret.pi!=this.pi){
      this.getlist(ret.pi);
    }
  }

  getlist(pi){
    this.devicesService.list(pi,this.ps,this.val,"photovoltaic").subscribe((res)=>{
      console.log(res);
      if(res["errno"]=="0"){
        this.total = res["data"]["data"]["total"];
        this.pages.total = '共' + this.total + '条';
        this.data = res["data"]["data"]["list"];
        this.pi = pi;
        // this.ps = 10;
      }
    })
  }


  submit(value:any){
    this.val = (value["name"]==undefined)?"":value["name"];
    this.getlist(1);
  }

  reset(value:any){
    this.val = "";
    this.getlist(1);
  }

}
