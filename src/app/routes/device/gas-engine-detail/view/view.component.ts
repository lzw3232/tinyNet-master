import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {STChange} from "@delon/abc";
import {DevicesService} from "../../../../user-service/devicesService";

const DataSet = require('@antv/data-set');

@Component({
  selector: 'app-device-gas-engine-detail-view',
  templateUrl: './view.component.html',
})
export class GasEngineDetailViewComponent implements OnInit {
  record: any = {};
  i: any;
  j: any;
  data;
  data1;
  forceFit = true;
  width = 400;
  height = 400;
  style = { stroke: '#fff', lineWidth: 1 };
  chart_title_x = {text: '个数', textStyle: {fill: '#515151'} };
  chart_title_y = {text: '成本(元)', textStyle: {fill: '#515151'}};
  chart_title_a = {text: '输出功率(kW)', textStyle: {fill: '#515151'} };
  chart_title_b = {text: '燃料消耗(m^3)', textStyle: {fill: '#515151'}};

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private devicesService: DevicesService,
  ) { }

  ngOnInit(): void {
    console.log(this.record);
    console.log(this.i);
    this.devicesService.select(this.record.id,"gas_engine").subscribe((res)=>{
      console.log(res);
      if(res["errno"]=="0"){
        this.i = res["data"]["data"]["data"];
        const sourceData: any[] = [
          {x : this.i.number1, 初建成本 : this.i.fBuildCost1, 替换成本 : this.i.rBuildCost1, 运维成本 : this.i.operCost1},
          {x : this.i.number2, 初建成本 : this.i.fBuildCost2, 替换成本 : this.i.rBuildCost2, 运维成本 : this.i.operCost2},
          {x : this.i.number3, 初建成本 : this.i.fBuildCost3, 替换成本 : this.i.rBuildCost3, 运维成本 : this.i.operCost3},
          {x : this.i.number4, 初建成本 : this.i.fBuildCost4, 替换成本 : this.i.rBuildCost4, 运维成本 : this.i.operCost4},
        ];

        const dv = new DataSet.View().source(sourceData);
        dv.transform({
          type: 'fold',
          fields: ['初建成本', '替换成本', '运维成本'],
          key: 'cost_type',
          value: 'cost_number',
        });
        const data = dv.rows;
        this.data = data;


         //this.j = res["data"]["data"];
         this.j = res["data"]["data"]["data"];
         //console.log(this.j.outPower[1]);
         // let y:number[]=[];
         let y:number[]=[];
         let z:number[]=[];
         //var z:any[]=[];
         let k = 0;
         let k1 = 0;
         let account = 0;
         let account1 = 0;
         //分离这个字符串并且转换为数组
         for(let i=0;i<this.j.outPower.length;i++){
           k++;
           if(this.j.outPower[i]==','){
             var y1="";
             for(let m=i-k+1;m<i;m++){
               y1=y1+this.j.outPower[m];
               //y=Number(y1);
             }
             account = account + 1;
             y[account] = Number(y1);
             console.log(y);
             k=0;
           }
         }
         //分离这个字符串并且转换为数组
         for(let i1=0;i1<this.j.fuelUse.length;i1++){
           k1++;
           if(this.j.fuelUse[i1]==','){
             var z1="";
             for(let m1=i1-k1+1;m1<i1;m1++){
               z1=z1+this.j.fuelUse[m1];
               //y=Number(y1);
             }
             account1 = account1 + 1;
             z[account1] = Number(z1);
             console.log(z);
             k1=0;
           }
         }
         
      
         
    
        
         const sourceData1: any[] = [  ];      
           
       
       
         for(var i=0;i<account;i++){
           var ttt2 = "{"+'"'+"yaxis"+'"'+":"+y[i+1]+","+'"'+"zaxis"+'"'+":"+z[i+1]+"}";
           var ttt3 = JSON.parse(ttt2);
           sourceData1.push(ttt3);
           
         }
         
         
         console.log("测试6"+sourceData1);
         const dv1 = new DataSet.View().source(sourceData1);
         const data1 = dv1.rows;
         console.log(data1);
         this.data1 = data1;
        
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
  
  close() {
    this.modal.destroy();
  }
}
