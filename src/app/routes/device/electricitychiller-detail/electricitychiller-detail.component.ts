import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {_HttpClient, MenuService, ModalHelper} from '@delon/theme';
import {STChange, STColumn, STComponent, STPage} from '@delon/abc';
import { SFSchema } from '@delon/form';
import {ElectricitychillerDetailViewComponent} from './view/view.component';
import {ElectricitychillerDetailEditComponent} from './edit/edit.component'
import {DevicesService} from "../../../user-service/devicesService";
import {NzMessageService, NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-device-electricitychiller-detail',
  templateUrl: './electricitychiller-detail.component.html',
})
export class ElectricitychillerDetailComponent implements OnInit {

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
    { title: '额定电功率(kW)', type: 'number', index: 'ratedPower' },
    { title: '耗电系数(%)', type: 'number', index: 'powerFactor' },
    { title: '综合部分负荷性能系数(IPLV)', type: 'number', index: 'cop' },
    { title: '寿命(年)', type: 'number', index: 'lifeTime' },
    { title: '制造商', index: 'manufacturer' },
    {
      title: '',
      fixed: 'right', width: '120px',
      buttons: [
        { text: '<i class="anticon anticon-file-text"></i>', type: 'static',
          component: ElectricitychillerDetailViewComponent,
        },
        { text: '<i class="anticon anticon-edit"></i>',
          type: 'static', component: ElectricitychillerDetailEditComponent,
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
                    this.devicesService.delete(record.id,"electricitychiller")
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
      .create(ElectricitychillerDetailEditComponent, { i: { id: 0 } })
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
    this.devicesService.list(pi,this.ps,this.val,"electricitychiller").subscribe((res)=>{
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
