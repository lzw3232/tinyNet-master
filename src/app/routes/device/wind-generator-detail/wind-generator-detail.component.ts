import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {STChange, STColumn, STComponent, STPage} from '@delon/abc';
import { SFSchema } from '@delon/form';
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {DeviceWindGeneratorDetailViewComponent} from "./view/view.component";
import {DeviceWindGeneratorDetailEditComponent} from "./edit/edit.component";
import {DevicesService} from "../../../user-service/devicesService";

@Component({
  selector: 'app-device-wind-generator-detail',
  templateUrl: './wind-generator-detail.component.html',
})
export class DeviceWindGeneratorDetailComponent implements OnInit {
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
    { title: '型号名称', index: 'name', fixed: 'left', width: '120px' },
    { title: '制造商', index: 'factory', fixed: 'left', width: '150px' },
    { title: '额定功率(kW)', index: 'edgl', type: 'number' },
    { title: '风机轮毂高度(米)', index: 'fjlggd', type: 'number' },
    { title: '功率曲线绘制点个数', index: 'glqxnum', type: 'number' },
    { title: '寿命(年)', index: 'life', type: 'number' },
    { title: '类型', index: 'type', render:'custom' },
    {
      title: '',
      fixed: 'right', width: '120px',
      buttons: [
        { text: '<i class="anticon anticon-file-text"></i>', type: 'static',
          component: DeviceWindGeneratorDetailViewComponent,
        },
        { text: '<i class="anticon anticon-edit"></i>',
          type: 'static', component: DeviceWindGeneratorDetailEditComponent,
          click: (record, _modal, comp) => {
            this.getlist(this.pi);
          }
        },
        { text: '<i class="anticon anticon-delete"></i>',click: (record, _modal, comp) => {
            this.modalService.confirm({
              nzTitle: '确认删除么？？？',
              nzOkText: 'OK',
              nzCancelText: 'Cancel',
              nzOnOk:()=>{
                this.devicesService.delete(record.id,"wind_turbines")
                  .subscribe((res) => {
                    console.log(res);
                    if(res["errno"]=="0"){
                      this.msgSrv.success(`成功删除 ${record.name}`);
                    }
                    else if(res["errno"]=="2"){
                      this.devicesService.tologin();
                    }
                    else{
                      this.msgSrv.create('error', `error`);
                    }
                    this.devicesService.setCookie("token",res["data"]["data"]["token"]);
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
              private devicesService:DevicesService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.pi = 1;
    this.ps = 10;
    this.getlist(this.pi);
  }

  add() {
    this.modal
      .createStatic(DeviceWindGeneratorDetailEditComponent, { i: { id: 0 } })
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
    this.devicesService.list(pi,this.ps,this.val,"wind_turbines").subscribe((res)=>{
      console.log(res);
      if(res["errno"]=="0"){
        this.total = res["data"]["data"]["total"];
        this.pages.total = '共' + this.total + '条';
        this.data = res["data"]["data"]["list"];
        this.pi = pi;
        // this.ps = 10;
      }
      else if(res["errno"]=="2"){
        this.devicesService.tologin();
      }
      else{
        this.msgSrv.create('error', `error`);
      }
      this.devicesService.setCookie("token",res["data"]["data"]["token"]);
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
