import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {STChange, STColumn, STComponent, STPage} from '@delon/abc';
import { SFSchema } from '@delon/form';
import {DeviceTurbineDetailViewComponent} from "./view/view.component";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {DeviceTurbineDetailEditComponent} from "./edit/edit.component";
import {DevicesService} from "../../../user-service/devicesService";

@Component({
  selector: 'app-device-turbine-detail',
  templateUrl: './turbine-detail.component.html',
})
export class DeviceTurbineDetailComponent implements OnInit {
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
        },
        { text: '<i class="anticon anticon-edit"></i>',
          type: 'static', component: DeviceTurbineDetailEditComponent,
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
                this.devicesService.delete(record.id,"turbine")
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
              public msgSrv: NzMessageService,
              private devicesService: DevicesService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.pi = 1;
    this.ps = 10;
    this.getlist(this.pi);
  }

  add() {
    this.modal
      .createStatic(DeviceTurbineDetailEditComponent, { i: { id: 0 } })
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
    this.devicesService.list(pi,this.ps,this.val,"turbine").subscribe((res)=>{
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
