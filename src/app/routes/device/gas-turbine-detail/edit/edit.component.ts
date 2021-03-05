import {Component, OnInit} from '@angular/core';
import { NzModalRef, NzMessageService, NzModalService} from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {FormProperty, PropertyGroup, SFSchema, SFUISchema} from '@delon/form';


import {DevicesService} from "../../../../user-service/devicesService";

@Component({
  selector: 'app-device-gas-turbine-detail-edit',
  templateUrl: './edit.component.html',
  styleUrls : ['./edit.component.css']   //连接CSS
})
export class GasTurbineDetailEditComponent implements OnInit {
  record: any = {};
  i: any;
  k = 1;
  public n = 1;


  public outPower:any[] = [];
  public fuelUse:any[] = [];
  public shiyan:any[] = [];
 //定义变量
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '型号名称' },

      ratedPower: { type: 'string', title: '额定功率', default: 0, minimum: 0, ui: {
        // widget: 'string',
        addOnAfter: 'kW',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},

      mLoadRate: { type: 'string', title: '最小负载率(0-1)', default: 0, minimum: 0, ui: {

        placeholder: '请输入数字',
      //}, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      }, format: 'regex', pattern: '^((0)\.[0-9]+)$'},

      //}, format: 'regex', pattern: '^(0|([1-9]\d?)|(1[01]\d)|(120))(\.\d*)?$'},
      //}, format: 'regex', pattern: '^0[1-9]$|^[1-9][0-9]?$|^00?\.(?:0[1-9]|[1-9][0-9]?)$|^(?:0[1-9]|[1-9][0-9]?)\.[0-9]$'},
      gasTurbineEff: { type: 'string', title: '燃气轮机效率', default: 0, minimum: 0, ui: {
        addOnAfter: '%',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},

      gasCogRatio: { type: 'string', title: '燃机热电比', default: 0, minimum: 0, ui: {
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},

      lifetime: { type: 'string', title: '寿命', default: 0, minimum: 0, ui: {
        addOnAfter: '年',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},


      number1: { type: 'number', title: '个数1',  default: 0, minimum: 0 },
      fBuildCost1: { type: 'number', title: '初建成本1',  default: 0, minimum: 0 },
      rBuildCost1: { type: 'number', title: '替换成本1',  default: 0, minimum: 0 },
      operCost1: { type: 'number', title: '运维成本1',  default: 0, minimum: 0 },
      number2: { type: 'number', title: '个数2',  default: 1, minimum: 0 },
      fBuildCost2: { type: 'number', title: '初建成本2',  default: 1, minimum: 0 },
      rBuildCost2: { type: 'number', title: '替换成本2',  default: 1, minimum: 0 },
      operCost2: { type: 'number', title: '运维成本2',  default: 1, minimum: 0 },
      number3: { type: 'number', title: '个数3',  default: 100, minimum: 0 },
      fBuildCost3: { type: 'number', title: '初建成本3',  default: 10000, minimum: 0 },
      rBuildCost3: { type: 'number', title: '替换成本3',  default: 10000, minimum: 0 },
      operCost3: { type: 'number', title: '运维成本3',  default: 10000, minimum: 0 },
      number4: { type: 'number', title: '个数4',  default: 10000, minimum: 0 },
      fBuildCost4: { type: 'number', title: '初建成本4',  default: 1000000, minimum: 0 },
      rBuildCost4: { type: 'number', title: '替换成本4',  default: 1000000, minimum: 0 },
      operCost4: { type: 'number', title: '运维成本4',  default: 1000000, minimum: 0 },

    },
    //必填项
    required: ['name', 'ratedPower', 'mLoadRate', 'gasTurbineEff','gasCogRatio', 'lifetime',
    'number1', 'fBuildCost1', 'rBuildCost1', 'operCost1',
    'number2', 'fBuildCost2', 'rBuildCost2', 'operCost2',
    'number3', 'fBuildCost3', 'rBuildCost3', 'operCost3',
    'number4', 'fBuildCost4', 'rBuildCost4', 'operCost4',
    ],
  };
  ui: SFUISchema = {
    '*': {
      grid: { span: 12 },
      spanLabel : 10,
      spanControl : 14
    },
    '$number1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fBuildCost1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$rBuildCost1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$operCost1': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$number2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fBuildCost2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$rBuildCost2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$operCost2': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$number3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fBuildCost3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$rBuildCost3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$operCost3': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$number4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$fBuildCost4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$rBuildCost4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$operCost4': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},

  };
  constructor(
    private modal: NzModalRef,
    public http: _HttpClient,
    public devicesService: DevicesService,
    private msgSrv: NzMessageService
  ) {}

  ngOnInit(): void {

    console.log(this.record);


    //console.log(this.i);
    if (this.record.id) {
      // this.http.get(`/user/${this.record.id}`).subscribe(res => (this.i = res));
      this.devicesService
        .select(this.record.id,"gas_turbine")
        .subscribe(res => {
          console.log(res);
          if(res["errno"]=="0"){
            this.i = res["data"]["data"]["data"];
            //将动态数据进行显示
            var outPower="";
            var fuelUse="";
            if(this.i["outPower"].length>=2){
              outPower=this.i["outPower"].substr(0,this.i["outPower"].length-1).split(",");
              fuelUse=this.i["fuelUse"].substr(0,this.i["fuelUse"].length-1).split(",");
              for(let i=0;i<outPower.length;i++){
                this.shiyan.push({checked:false,value1:outPower[i],value2:fuelUse[i]});
              }
            }

          }
        });
    }
  }
  save(value: any) {
    //如果存在 record 记录，则做更新操作，否则为新建操作
    console.log(value);
    var res=value;

    var outPower="";
    var fuelUse="";
    for(let i=0;i<this.shiyan.length;i++){
      outPower=outPower+this.shiyan[i].value1+",";
      fuelUse=fuelUse+this.shiyan[i].value2+",";
    }
    res["outPower"]=outPower;
    res["fuelUse"]=fuelUse;
    console.log(value);

    if (this.record.id) {
      this.devicesService.update(res,"gas_turbine").subscribe((res)=>{
        console.log(res);
        if(res["errno"]=="0"){
          this.modal.destroy("true");
          this.msgSrv.create('success', 'success');
        }
      })
    } else {

      this.devicesService.add(res,"gas_turbine").subscribe((res)=>{
        console.log(res);
        if(res["errno"]=="0"){
          this.modal.destroy("true");
          this.msgSrv.create('success', `success`);
        }
      })
    }
  }


  //每点击一次增加,n+1,MVVM,传入数据
  add() {

      this.shiyan.push({
        checked:false,
        value1:0,
        value2:0
      });

      console.log(this.shiyan);

    }
  //删除数据函数，利用.splice

  delete1(){
    console.log(this.shiyan);
    for(let i=0;i<this.shiyan.length;i++){
      if(this.shiyan[i].checked==true){
        this.shiyan.splice(i,1);
        i--;
      }
    }
  }
  close() {
    this.modal.destroy(false);
  }
}
