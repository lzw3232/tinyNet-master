import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {STChange, STColumn, STComponent, STPage} from '@delon/abc';
import { SFSchema } from '@delon/form';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {DeviceGeneratorDetailViewComponent} from './view/view.component';
import {DeviceGeneratorDetailEditComponent} from "./edit/edit.component";
import {DevicesService} from "../../../user-service/devicesService";

@Component({
  selector: 'app-device-generator-detail',
  templateUrl: './generator-detail.component.html',
})
export class DeviceGeneratorDetailComponent implements OnInit {
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
    { title: '类型', index: 'type', width: '100px',render:'custom'},
    {
      title: '',
      fixed: 'right', width: '120px',
      buttons: [
        { text: '<i class="anticon anticon-file-text"></i>', type: 'static',
          component: DeviceGeneratorDetailViewComponent,
        },
        { text: '<i class="anticon anticon-edit"></i>',
          type: 'static', component: DeviceGeneratorDetailEditComponent,
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
                    this.devicesService.delete(record.id,"generator")
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
      .createStatic(DeviceGeneratorDetailEditComponent, { i: { id: 0 } })
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
    this.devicesService.list(pi,this.ps,this.val,"generator").subscribe((res)=>{
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
