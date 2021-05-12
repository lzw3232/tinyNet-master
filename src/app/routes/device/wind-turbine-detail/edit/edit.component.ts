import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import {DevicesService} from "../../../../user-service/devicesService";

@Component({
  selector: 'app-device-wind-turbine-detail-edit',
  templateUrl: './edit.component.html',
  styleUrls : ['./edit.component.css']
})
export class WindTurbineDetailEditComponent implements OnInit {
  record: any = {};
  i: any;
  public shiyan:any[] = [];
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '型号名称' },
      ratedPower: { type: 'string', title: '额定功率', default: 0, minimum: 0, ui: {
        // widget: 'string',
        addOnAfter: 'kW',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      hubHeight: { type: 'string', title: '风机轮毂高度', default: 0, minimum: 0, ui: {
        addOnAfter: '米',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      decayFactor: { type: 'string', title: '衰减系数(%)', default: 0, minimum: 0,
        format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      lifeTime: { type: 'string', title: '寿命', default: 0, minimum: 0, ui: {
        addOnAfter: '年',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      manufacturer: { type: 'string', title: '制造商', maxLength: 140 },
      dAtype: {
        type: 'string',
        title: '类型',
        enum: [ { label: '交流', value: 0 }, { label: '直流', value: 1 } ],
        default: 0 },
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
    required: ['name', 'ratedPower', 'hubHeight', 'decayFactor', 'lifeTime', 'manufacturer', 'dAtype',
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
    '$dAtype': {grid: { span: 24 }, spanLabel : 5, spanControl : 7},
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
    private devicesService:DevicesService
  ) {}

  ngOnInit(): void {
    console.log(this.record);
    console.log(this.i);
    if (this.record.id) {
      // this.http.get(`/user/${this.record.id}`).subscribe(res => (this.i = res));
      this.devicesService
        .select(this.record.id,"wind_turbine")
        .subscribe(res => {
          console.log(res);
          if(res["errno"]=="0"){
            this.i = res["data"]["data"]["data"];

            //将动态数据进行显示
            var fWindSpeed="";
            var fPower="";
            if(this.i["fWindSpeed"].length>=2){
              fWindSpeed=this.i["fWindSpeed"].substr(0,this.i["fWindSpeed"].length-1).split(",");
              fPower=this.i["fPower"].substr(0,this.i["fPower"].length-1).split(",");
              for(let i=0;i<fWindSpeed.length;i++){
                this.shiyan.push({checked:false,value1:fWindSpeed[i],value2:fPower[i]});
              }
            }
          }
          else if(res["errno"]=="2"){
            this.devicesService.tologin();
          }
          else{
            this.msgSrv.create('error', `error`);
          }
          this.devicesService.setCookie("token",res["data"]["data"]["token"]);
        });
    }
  }

  save(value: any) {
    //如果存在 record 记录，则做更新操作，否则为新建操作
    console.log(value);

    var res=value;

    var fWindSpeed="";
    var fPower="";
    if(this.shiyan.length<3){
      this.msgSrv.create('error', `功率曲线不少于三个`);
      return;
    }
    for(let i=0;i<this.shiyan.length;i++){
      fWindSpeed=fWindSpeed+this.shiyan[i].value1+",";
      fPower=fPower+this.shiyan[i].value2+",";
    }
    res["fWindSpeed"]=fWindSpeed;
    res["fPower"]=fPower;

    if (this.record.id) {
      this.devicesService.update(res,"wind_turbine").subscribe((res)=>{
        console.log(res);
        if(res["errno"]=="0"){
          this.modal.destroy("true");
          this.msgSrv.create('success', `success`);
        }
        else if(res["errno"]=="2"){
          this.devicesService.tologin();
        }
        else{
          this.msgSrv.create('error', `error`);
        }
        this.devicesService.setCookie("token",res["data"]["data"]["token"]);
      })
    } else {
      this.devicesService.add(res,"wind_turbine").subscribe((res)=>{
        console.log(res);
        if(res["errno"]=="0"){
          this.modal.destroy("true");
          this.msgSrv.create('success', `success`);
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
  }
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
    this.shiyan = this.shiyan.filter(item=>item.checked==false);
  }
  close() {
    this.modal.destroy(false);
  }

}
