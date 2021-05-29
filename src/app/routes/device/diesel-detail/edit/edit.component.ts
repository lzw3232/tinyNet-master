import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import {DevicesService} from "../../../../user-service/devicesService";

@Component({
  selector: 'app-device-diesel-detail-edit',
  templateUrl: './edit.component.html',
  styleUrls : ['./edit.component.css']
})
export class DieselDetailEditComponent implements OnInit {
  record: any = {};
  i: any;
  public outPower:any[] = [];
  public fuelUse:any[] = [];
  public shiyan:any[] = [];
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '型号名称' },
      ratedCapacity: { type: 'string', title: '额定功率', default: 0, minimum: 0, ui: {
        // widget: 'string',
        addOnAfter: 'kW',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      minimumLoadRate: { type: 'string', title: '最低负载率', default: 0, minimum: 0, ui: {
        addOnAfter: '%',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      minimumRunningTime: { type: 'string', title: '最小运营时间', default: 0, minimum: 0, ui: {
        addOnAfter: '时',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      percentofCO2: { type: 'string', title: '二氧化碳',  default: 0, minimum: 0, ui: {
        addOnAfter: 'g/L',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      percentofCO: { type: 'string', title: '一氧化碳',  default: 0, minimum: 0, ui: {
        addOnAfter: 'g/L',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      percentofUnburned: { type: 'string', title: '未燃烧碳氢化合物',  default: 0, minimum: 0, ui: {
        addOnAfter: 'g/L',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      lifeTime: { type: 'string', title: '寿命', default: 0, minimum: 0, ui: {
        addOnAfter: '年',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      percentofMatter: { type: 'string', title: '颗粒物', default: 0, minimum: 0, ui: {
        addOnAfter: 'g/L',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      percentofSO2: { type: 'string', title: '二氧化硫',  default: 0, minimum: 0, ui: {
        addOnAfter: 'g/L',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      percentofNO: { type: 'string', title: '氮氧化物', default: 0, minimum: 0, ui: {
        addOnAfter: 'g/L',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      manufacturer: { type: 'string', title: '制造商', maxLength: 140 },
      type: {
        type: 'string',
        title: '类型',
        enum: [ { label: '汽油', value: "0" }, { label: '柴油', value: "1" } ],
        default: "0" },
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
      // scgl1: { type: 'number', title: '输出功率1(kW)',  default: 10, minimum: 0 },
      // scgl2: { type: 'number', title: '输出功率2(kW)',  default: 10, minimum: 0 },
      // scgl3: { type: 'number', title: '输出功率3(kW)',  default: 10, minimum: 0 },
      // rlxh1: { type: 'number', title: '燃料消耗1(L/kW)',  default: 20, minimum: 0 },
      // rlxh2: { type: 'number', title: '燃料消耗2(L/kW)',  default: 20, minimum: 0 },
      // rlxh3: { type: 'number', title: '燃料消耗3(L/kW)',  default: 20, minimum: 0 },
    },
    required: ['name', 'ratedCapacity', 'minimumLoadRate', 'minimumRunningTime', 'percentofCO2', 'percentofCO', 'percentofUnburned', 'lifeTime',
      'percentofMatter', 'percentofSO2', 'percentofNO', 'manufacturer', 'type',
      'numberOrCapacity1', 'capitalCurve1', 'replacementCost1', 'maintainCost1',
      'numberOrCapacity2', 'capitalCurve2', 'replacementCost2', 'maintainCost2',
      'numberOrCapacity3', 'capitalCurve3', 'replacementCost3', 'maintainCost3',
      'numberOrCapacity4', 'capitalCurve4', 'replacementCost4', 'maintainCost4',],
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
    private msgSrv: NzMessageService,
    private devicesService: DevicesService
  ) {}

  ngOnInit(): void {
    console.log(this.record);
    console.log(this.i);
    if (this.record.id) {
      // this.http.get(`/user/${this.record.id}`).subscribe(res => (this.i = res));
      this.devicesService
        .select(this.record.id,"diesel")
        .subscribe(res => {
          console.log(res);
          if(res["errno"]=="0"){
            this.i = res["data"]["data"]["data"];
            //将动态数据进行显示
            var outPower="";
            var fuelUse="";
            if(this.i["fDieselPower"].length>=2){
              outPower=this.i["fDieselPower"].substr(0,this.i["fDieselPower"].length-1).split(",");
              fuelUse=this.i["fuelConsumption"].substr(0,this.i["fuelConsumption"].length-1).split(",");
              for(let i=0;i<outPower.length;i++){
                this.shiyan.push({checked:false,value1:outPower[i],value2:fuelUse[i]});
              }
            }
          }
        });
    }
  }

  save(value: any) {

    if(this.shiyan.length!=3&&this.shiyan.length!=5){
      this.msgSrv.create('error', `燃烧功率必须为3组或者5组`);
      return;
    }
    console.log(value);
    var res=value;

    var outPower="";
    var fuelUse="";
    for(let i=0;i<this.shiyan.length;i++){
      outPower=outPower+this.shiyan[i].value1+",";
      fuelUse=fuelUse+this.shiyan[i].value2+",";
    }
    res["fDieselPower"]=outPower;
    res["fuelConsumption"]=fuelUse;


    //如果存在 record 记录，则做更新操作，否则为新建操作
    console.log(value);
    if (this.record.id) {
      this.devicesService.update(res,"diesel").subscribe((res)=>{
        console.log(res);
        if(res["errno"]=="0"){
          this.modal.destroy("true");
          this.msgSrv.create('success', `success`);
        }
      })
    } else {
      this.devicesService.add(res,"diesel").subscribe((res)=>{
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
