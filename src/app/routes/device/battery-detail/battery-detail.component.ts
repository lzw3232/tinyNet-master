import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {_HttpClient, MenuService, ModalHelper} from '@delon/theme';
import {STChange, STColumn, STComponent, STPage} from '@delon/abc';
import { SFSchema } from '@delon/form';
import {BatteryDetailViewComponent} from './view/view.component';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BatteryDetailEditComponent} from './edit/edit.component'
import {DevicesService} from "../../../user-service/devicesService";

@Component({
  selector: 'app-device-battery-detail',
  templateUrl: './battery-detail.component.html',
})
export class BatteryDetailComponent implements OnInit {

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
    },
  };
  pages: STPage = {
    total: '',//分页显示多少条数据，字符串型
    show: true,//显示分页
    front: false //关闭前端分页，true是前端分页，false后端控制分页
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '型号名称', index: 'name' , fixed: 'left', width: '100px'},
    { title: '额定电压(V)', type: 'number', index: 'ratedVoltage' },
    { title: '循环充放电效率(%)', type: 'number', index: 'roundTridEfficiency' },
    { title: '最大充电速率', type: 'number', index: 'maximumChargeRate' },
    { title: '最大充电电流(A)', type: 'number', index: 'maximumChargeCurrent' },
    { title: '最大放电速率', type: 'number', index: 'constRate' },
    { title: '电池容量(Ah)', type: 'number', index: 'maximumCapacity' },
    { title: '寿命(年)', type: 'number', index: 'floatLife' },
    { title: '全寿命放电量(kWh)', type: 'number', index: 'lifeTimeThroughput' },
    { title: '串联个数', type: 'number', index: 'numberofBattery' },
    { title: '制造商', index: 'manufacturer' },
    { title: '类型', index: 'dAtype', render: "custom"},
    {
      title: '',
      fixed: 'right', width: '120px',
      buttons: [
        { text: '<i class="anticon anticon-file-text"></i>', type: 'static',
          component: BatteryDetailViewComponent,
        },
        { text: '<i class="anticon anticon-edit"></i>',
          type: 'static', component: BatteryDetailEditComponent,
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
                    this.devicesService.delete(record.id,"battery")
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
              private modalService: NzModalService,
  ) {
  }

  ngOnInit() {
    this.pi = 1;
    this.ps = 10;
    this.getlist(this.pi);
  }


  add() {
    this.modal
      .create(BatteryDetailEditComponent, { i: { id: 0 } })
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
    this.devicesService.list(pi,this.ps,this.val,"battery").subscribe((res)=>{
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
