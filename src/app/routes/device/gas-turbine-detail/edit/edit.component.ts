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


  public fGasPower:any[] = [];
  public gasConsumption:any[] = [];
  public shiyan:any[] = [];
 //定义变量
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '型号名称' },

      ratedCapacity: { type: 'string', title: '额定功率', default: 0, minimum: 0, ui: {
        // widget: 'string',
        addOnAfter: 'kW',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},

      minimumLoadRate: { type: 'string', title: '最小负载率(0-1)', default: 0, minimum: 0, ui: {

        placeholder: '请输入数字',
      //}, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      }, format: 'regex', pattern: '^((0)\.[0-9]+)$'},

      //}, format: 'regex', pattern: '^(0|([1-9]\d?)|(1[01]\d)|(120))(\.\d*)?$'},
      //}, format: 'regex', pattern: '^0[1-9]$|^[1-9][0-9]?$|^00?\.(?:0[1-9]|[1-9][0-9]?)$|^(?:0[1-9]|[1-9][0-9]?)\.[0-9]$'},
      efficiency: { type: 'string', title: '燃气轮机效率', default: 0, minimum: 0, ui: {
        addOnAfter: '%',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},

      smoke: { type: 'string', title: '燃机热电比', default: 0, minimum: 0, ui: {
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},

      lifeTime: { type: 'string', title: '寿命', default: 0, minimum: 0, ui: {
        addOnAfter: '年',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},

      numberOrCapacity1: { type: 'number', title: '个数1',  default: 0, minimum: 0 },
      capitalCurve1: { type: 'number', title: '初建成本1',  default: 0, minimum: 0 },
      replacementCost1: { type: 'number', title: '替换成本1',  default: 0, minimum: 0 },
      maintainCost1: { type: 'number', title: '运维成本1',  default: 0, minimum: 0 },
      numberOrCapacity2: { type: 'number', title: '个数2',  default: 1, minimum: 0 },
      capitalCurve2: { type: 'number', title: '初建成本2',  default: 1, minimum: 0 },
      replacementCost2: { type: 'number', title: '替换成本2',  default: 1, minimum: 0 },
      maintainCost2: { type: 'number', title: '运维成本2',  default: 1, minimum: 0 },
      numberOrCapacity3: { type: 'number', title: '个数3',  default: 100, minimum: 0 },
      capitalCurve3: { type: 'number', title: '初建成本3',  default: 10000, minimum: 0 },
      replacementCost3: { type: 'number', title: '替换成本3',  default: 10000, minimum: 0 },
      maintainCost3: { type: 'number', title: '运维成本3',  default: 10000, minimum: 0 },
      numberOrCapacity4: { type: 'number', title: '个数4',  default: 10000, minimum: 0 },
      capitalCurve4: { type: 'number', title: '初建成本4',  default: 1000000, minimum: 0 },
      replacementCost4: { type: 'number', title: '替换成本4',  default: 1000000, minimum: 0 },
      maintainCost4: { type: 'number', title: '运维成本4',  default: 1000000, minimum: 0 },

    },
    //必填项
    required: ['name', 'ratedCapacity', 'minimumLoadRate', 'efficiency','smoke', 'lifeTime',
    'numberOrCapacity1', 'capitalCurve1', 'replacementCost1', 'maintainCost1',
    'numberOrCapacity2', 'capitalCurve2', 'replacementCost2', 'maintainCost2',
    'numberOrCapacity3', 'capitalCurve3', 'replacementCost3', 'maintainCost3',
    'numberOrCapacity4', 'capitalCurve4', 'replacementCost4', 'maintainCost4',
    ],
  };
  ui: SFUISchema = {
    '*': {
      grid: { span: 12 },
      spanLabel : 10,
      spanControl : 14
    },

    '$numberOrCapacity1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capitalCurve1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$replacementCost1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$maintainCost1': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$numberOrCapacity2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capitalCurve2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$replacementCost2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$maintainCost2': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$numberOrCapacity3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capitalCurve3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$replacementCost3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$maintainCost3': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$numberOrCapacity4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capitalCurve4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$replacementCost4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$maintainCost4': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},

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
            var fGasPower="";
            var gasConsumption="";
            if(this.i["fGasPower"].length>=2){
              fGasPower=this.i["fGasPower"].substr(0,this.i["fGasPower"].length-1).split(",");
              gasConsumption=this.i["gasConsumption"].substr(0,this.i["gasConsumption"].length-1).split(",");
              for(let i=0;i<fGasPower.length;i++){
                this.shiyan.push({checked:false,value1:fGasPower[i],value2:gasConsumption[i]});
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

    var fGasPower="";
    var gasConsumption="";
    for(let i=0;i<this.shiyan.length;i++){
      fGasPower=fGasPower+this.shiyan[i].value1+",";
      gasConsumption=gasConsumption+this.shiyan[i].value2+",";
    }
    res["fGasPower"]=fGasPower;
    res["gasConsumption"]=gasConsumption;
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
