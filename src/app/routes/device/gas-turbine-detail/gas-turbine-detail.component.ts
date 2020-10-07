import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {_HttpClient, MenuService, ModalHelper} from '@delon/theme';
import {STChange, STColumn, STComponent, STPage} from '@delon/abc';
import { SFSchema } from '@delon/form';
import {GasTurbineDetailViewComponent} from './view/view.component';
import {GasTurbineDetailEditComponent} from './edit/edit.component'
import {DevicesService} from "../../../user-service/devicesService";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
//装饰器，组件
@Component({
  selector: 'app-device-gas-turbine-detail',
  templateUrl: './gas-turbine-detail.component.html',
})
export class GasTurbineDetailComponent implements OnInit {
  //定义数据
  data : any;
  pi : Number;
  ps : Number;
  total=0;
  val="";
  //sf自动生成表单，填入数据
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
  //st表格标签
  @ViewChild('st') st: STComponent;
  //表头名称
  columns: STColumn[] = [
    { title: '型号名称', index: 'name' , fixed: 'left', width: '100px'},
    { title: '额定功率(kW)', type: 'number', index: 'ratedPower' },
    { title: '最小负载率', type: 'number', index: 'mLoadRate' },
    { title: '燃气轮机效率(%)', type: 'number', index: 'gasTurbineEff' },
    { title: '燃机电热比', type: 'number', index: 'gasCogRatio' },
    { title: '寿命(年)', type: 'number', index: 'lifetime' },
    //侧边栏
    {
      title: '',
      fixed: 'right', width: '120px',
      buttons: [
        { text: '<i class="anticon anticon-file-text"></i>', type: 'static',   //查看按钮，调用View组件
          component: GasTurbineDetailViewComponent,
        },
        { text: '<i class="anticon anticon-edit"></i>',
          type: 'static', component: GasTurbineDetailEditComponent,            //修改按钮，调用Edit组件
          click: (record, _modal, comp) => {
              this.getlist(this.pi);
          }
        },   //删除数据
        { text: '<i class="anticon anticon-delete"></i>',
          click: (record, _modal, comp) => {
                this.modalService.confirm({
                  nzTitle: '确认删除么？？？',
                  nzOkText: 'OK',
                  nzCancelText: 'Cancel',
                  nzOnOk:()=>{
                    this.devicesService.delete(record.id,"gas_turbine")
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
              private devicesService: DevicesService,
              private modalService: NzModalService,
  ) { }
  //初始化，pi是初始页数，ps是每一页的条数
  ngOnInit() {
    this.pi = 1;
    this.ps = 10;
    this.getlist(this.pi);
  }
  //点击新建，添加按钮
  add() {
    this.modal
      .create(GasTurbineDetailEditComponent, { i: { id: 0 } })
      .subscribe(res=>{
        if(res){
          this.getlist(this.pi);
        }
      })
  }
  //修改
  change(ret: STChange) {
    if(ret.pi!=this.pi){
      this.getlist(ret.pi);
    }
  }
  //获得表单
  getlist(pi){
    this.devicesService.list(pi,this.ps,this.val,"gas_turbine").subscribe((res)=>{
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

  //提交函数
  submit(value:any){
    this.val = (value["name"]==undefined)?"":value["name"];
    this.getlist(1);
  }
  //重置函数
  reset(value:any){
    this.val = "";
    this.getlist(1);
  }


}
