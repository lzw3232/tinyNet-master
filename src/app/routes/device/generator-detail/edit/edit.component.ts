import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import {DevicesService} from "../../../../user-service/devicesService";

@Component({
  selector: 'app-device-generator-detail-edit',
  templateUrl: './edit.component.html',
  styleUrls : ['./edit.component.css']
})
export class DeviceGeneratorDetailEditComponent implements OnInit {
  record: any = {};
  i: any;
  public outPower:any[] = [];
  public fuelUse:any[] = [];
  public shiyan:any[] = [];
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '型号名称' },
      edgl: { type: 'string', title: '额定功率', default: 0, minimum: 0, ui: {
        // widget: 'string',
        addOnAfter: 'kW',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      zdfzl: { type: 'string', title: '最低负载率', default: 0, minimum: 0, ui: {
        addOnAfter: '%',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      zxyysj: { type: 'string', title: '最小运营时间', default: 0, minimum: 0, ui: {
        addOnAfter: '时',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      co2: { type: 'string', title: '二氧化碳',  default: 0, minimum: 0, ui: {
        addOnAfter: 'g/L',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      co: { type: 'string', title: '一氧化碳',  default: 0, minimum: 0, ui: {
        addOnAfter: 'g/L',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      wrsdqhhw: { type: 'string', title: '未燃烧碳氢化合物',  default: 0, minimum: 0, ui: {
        addOnAfter: 'g/L',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      life: { type: 'string', title: '寿命', default: 0, minimum: 0, ui: {
        addOnAfter: '年',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      klw: { type: 'string', title: '颗粒物', default: 0, minimum: 0, ui: {
        addOnAfter: 'g/L',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      so2: { type: 'string', title: '二氧化硫',  default: 0, minimum: 0, ui: {
        addOnAfter: 'g/L',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      dyhw: { type: 'string', title: '氮氧化物', default: 0, minimum: 0, ui: {
        addOnAfter: 'g/L',
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      glqxnum: { type: 'string', title: '功率曲线点数',  default: 0, minimum: 0, ui: {
        placeholder: '请输入数字',
      }, format: 'regex', pattern: '^0$|^([1-9][0-9]*)$|^((0|([1-9][1-9]*))\.[0-9]+)$'},
      factory: { type: 'string', title: '制造商', maxLength: 140 },
      type: {
        type: 'string',
        title: '类型',
        enum: [ { label: '汽油', value: "0" }, { label: '柴油', value: "1" } ],
        default: "0" },
      capacity1: { type: 'number', title: '个数1',  default: 0, minimum: 0 },
      cjcb1: { type: 'number', title: '初建成本1',  default: 0, minimum: 0 },
      gxcb1: { type: 'number', title: '替换成本1',  default: 0, minimum: 0 },
      yxwhcb1: { type: 'number', title: '运维成本1',  default: 0, minimum: 0 },
      capacity2: { type: 'number', title: '个数2',  default: 1, minimum: 0 },
      cjcb2: { type: 'number', title: '初建成本2',  default: 1, minimum: 0 },
      gxcb2: { type: 'number', title: '替换成本2',  default: 1, minimum: 0 },
      yxwhcb2: { type: 'number', title: '运维成本2',  default: 1, minimum: 0 },
      capacity3: { type: 'number', title: '个数3',  default: 100, minimum: 0 },
      cjcb3: { type: 'number', title: '初建成本3',  default: 10000, minimum: 0 },
      gxcb3: { type: 'number', title: '替换成本3',  default: 10000, minimum: 0 },
      yxwhcb3: { type: 'number', title: '运维成本3',  default: 10000, minimum: 0 },
      capacity4: { type: 'number', title: '个数4',  default: 10000, minimum: 0 },
      cjcb4: { type: 'number', title: '初建成本4',  default: 1000000, minimum: 0 },
      gxcb4: { type: 'number', title: '替换成本4',  default: 1000000, minimum: 0 },
      yxwhcb4: { type: 'number', title: '运维成本4',  default: 1000000, minimum: 0 },
      // scgl1: { type: 'number', title: '输出功率1(kW)',  default: 10, minimum: 0 },
      // scgl2: { type: 'number', title: '输出功率2(kW)',  default: 10, minimum: 0 },
      // scgl3: { type: 'number', title: '输出功率3(kW)',  default: 10, minimum: 0 },
      // rlxh1: { type: 'number', title: '燃料消耗1(L/kW)',  default: 20, minimum: 0 },
      // rlxh2: { type: 'number', title: '燃料消耗2(L/kW)',  default: 20, minimum: 0 },
      // rlxh3: { type: 'number', title: '燃料消耗3(L/kW)',  default: 20, minimum: 0 },
    },
    required: ['name', 'edgl', 'zdfzl', 'zxyysj', 'co2', 'co', 'wrsdqhhw', 'life',
      'klw', 'so2', 'dyhw', 'glqxnum', 'factory', 'type',
      'capacity1', 'cjcb1', 'gxcb1', 'yxwhcb1',
      'capacity2', 'cjcb2', 'gxcb2', 'yxwhcb2',
      'capacity3', 'cjcb3', 'gxcb3', 'yxwhcb3',
      'capacity4', 'cjcb4', 'gxcb4', 'yxwhcb4',],
  };
  ui: SFUISchema = {
    '*': {
      grid: { span: 12 },
      spanLabel : 10,
      spanControl : 14
    },
    '$capacity1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$cjcb1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gxcb1': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$yxwhcb1': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capacity2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$cjcb2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gxcb2': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$yxwhcb2': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capacity3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$cjcb3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gxcb3': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$yxwhcb3': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$capacity4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$cjcb4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12},
    '$gxcb4': {grid: { span: 6 }, spanLabel : 12, spanControl : 12 },
    '$yxwhcb4': { grid: { span: 6 }, spanLabel : 12, spanControl : 12},
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
        .select(this.record.id,"generator")
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
    res["outPower"]=outPower;
    res["fuelUse"]=fuelUse;


    //如果存在 record 记录，则做更新操作，否则为新建操作
    console.log(value);
    if (this.record.id) {
      this.devicesService.update(res,"generator").subscribe((res)=>{
        console.log(res);
        if(res["errno"]=="0"){
          this.modal.destroy("true");
          this.msgSrv.create('success', `success`);
        }
      })
    } else {
      this.devicesService.add(res,"generator").subscribe((res)=>{
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
