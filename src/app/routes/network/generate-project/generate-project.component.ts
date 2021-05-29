import {Component, OnInit, ViewChild} from '@angular/core';
import { _HttpClient } from '@delon/theme';


import { NetworkDesignComponent } from '../design/design.component';
import { NetworkSelectComponent } from '../select/select.component';
import { ReuseTabService } from '@delon/abc';
import {NzModalService} from "ng-zorro-antd";
import {NetworkControlComponent} from "../control/control.component";
import {ProjectService} from "../../../user-service/project.service";
import {NetworkResultComponent} from "../result/result.component";
import {NetworkSelectElecairconditionComponent} from "../select/elecaircondition/elecaircondition.component";

@Component({
  selector: 'app-network-generate-project',
  templateUrl: './generate-project.component.html',
  styleUrls: ['./generate-project.component.css']
})
export class NetworkGenerateProjectComponent implements OnInit {

  @ViewChild(NetworkDesignComponent) networkDesignComponent: NetworkDesignComponent;
  @ViewChild(NetworkSelectComponent) NetworkSelectComponent: NetworkSelectComponent;
  @ViewChild(NetworkControlComponent) networkControlComponent: NetworkControlComponent;
  @ViewChild(NetworkResultComponent) networkResultComponent: NetworkResultComponent;

  // design页面 Emitter 传来的参数
  checkOptions: any;
  radioValue: any;
  result:any;
  name:string;

  get_chinese_name = {
    wind_turbine: '风力发电机',
    photovoltaic: '光伏发电系统',
    hydro_turbine: '水力发电机',
    cool_storage: '蓄冰空调',
    battery: '电池储能系统',
    heat_storage: '储热装置',
    pump: '热泵',
    gas_boiler: '燃气热水锅炉',
    elec_boiler: '电锅炉',
    waste_heat_boiler: '余热锅炉',
    electricitychiller: '涡旋式电制冷机',
    abschille: '溴化锂空调',
    screw_electricitychiller: '螺杆式电制冷机',
    centrifugal_electricitychiller: '离心式电制冷机',
    heat_exchanger: '板式换热器',
    gas_steam_boiler: '燃气蒸汽锅炉',
    gas_abschille: '直燃型溴化锂空调',
    gas_turbine: '燃气轮机',
    diesel: '常规发电机',
    internal_gas_turbine: '燃气内燃机',
    nuclear_power: '核电机组',
    elecaircondition : '双工况主机',
  }

  //最终传向后台的数据
  data = {
    selectDeviceData: null, // select页面 Emitter 传来的参数
    controlFormData: null, // control界面 Emitter 传来的参数
  }
  current = 0;

  index = 'First-content';

  constructor(
    private http: _HttpClient,
    private reuseTabService: ReuseTabService,
    private modalService: NzModalService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.reuseTabService.title = '新建方案';
    this.result={
      isdone:false,
      msg:""
    };
  }


  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    /*
      该方法本身用来处理父组件获得子组件app-network-design的设置参数，
      但是由于该组件在步骤条切换时会 destroy 及重新 init，
      故可以使用生命周期方法ngOnDestroy()，在组件destroy时将设置参数发送到父组件，
      因此该方法留以备用
      但是因为选择设备不够不切换使就不能通过destroy来获得,能通过ViewChildren获得
     */
    // if (this.current === 0) {
    //   this.checkOptions = this.networkDesignComponent.current_checkOptions;
    //   this.radioValue = this.networkDesignComponent.radioValue;
    //   console.log(this.checkOptions);
    // }

    if ( this.current === 0) {
      this.checkOptions = this.networkDesignComponent.checkOptions;
      const temp_checkOption = new Set();
      for(let i in this.checkOptions){
        for(let j=0;j<this.checkOptions[i].length;j++){
          if(this.checkOptions[i][j].checked==true){
            temp_checkOption.add(this.checkOptions[i][j].value);
          }
        }
      }
      const temp_radioValue = this.networkDesignComponent.radioValue;
      // if(!temp_checkOption.has('1_1')){
      //   this.modalService.error({
      //     nzTitle: '选择错误',
      //     nzContent: '<b>电负荷</b>必须勾选',
      //     nzWidth: '650'
      //   });
      // }
      if (temp_checkOption.has('1_2')) {
        if ( !temp_checkOption.has('3_1') &&!temp_checkOption.has('4_1') && !temp_checkOption.has('4_5')
          && !temp_checkOption.has('4_7')&& !temp_checkOption.has('4_8')&& !temp_checkOption.has('4_11')) {
          this.modalService.error({
            nzTitle: '选择错误',
            nzContent: '请选择<b>冷设备</b>',
            nzWidth: '650'
          });
          return;
        }
      }
      if (temp_checkOption.has('1_3')) {
        if ( !temp_checkOption.has('4_1')
          && !temp_checkOption.has('4_2')
          && !temp_checkOption.has('4_11')
          && !temp_checkOption.has('3_3')) {
          this.modalService.error({
            nzTitle: '选择错误',
            nzContent: '请选择<b>热设备</b>',
            nzWidth: '650'
          });
          return;
        }
      }
      if (temp_checkOption.has('5_1')||temp_checkOption.has('5_3')) {
        if ( !temp_checkOption.has('4_6')) {
          this.modalService.error({
            nzTitle: '选择错误',
            nzContent: '请选择<b>烟气设备</b>',
            nzWidth: '650'
          });
          return;
        }
      }
      if (temp_radioValue === 'A') {
        if (!temp_checkOption.has('5_2') &&
            !temp_checkOption.has('3_2')) {
          this.modalService.error({
            nzTitle: '选择错误',
            nzContent: '<b>电池储能系统</b>、<b>常规发电机</b>至少包含一个',
            nzWidth: '650'
          });
          return;
        }
      }
    }
    if(this.current==1){
      for(let i in this.NetworkSelectComponent.select_device_data){
        if(i=="num"||i=="GrowthFactor"||i=="elec_net"||i=="elec"||i=="cool"||i=="steam"||i=="heat") continue;
        if(this.NetworkSelectComponent.select_device_data[i]["id"]==null){
          this.modalService.error({
            nzTitle: '选择错误',
            nzContent: '请选择<b>'+this.get_chinese_name[i]+'</b>的设备',
            nzWidth: '650'
          });
          return;
        }
      }
    }
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    // this.changeContent();
    const data = {
      name : this.name,
      radioValue : this.radioValue,
      deviceData : this.data.selectDeviceData,
      formData : this.networkControlComponent.form_data
    };
    console.log('方案创建完成');
    console.log(data);
    this.projectService.add(data).subscribe((res=>{
      console.log(res);
      if(res["errno"]=="0"){
        // this.result["isdone"]=true;
      }
      else{
        // this.result["isdone"]=false;
        // this.result["msg"] = res["errmsg"];
      }
      // this.current += 1;
      // this.changeContent();
    }))

  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }


  getCheckOptions(event) {
    this.checkOptions = event;
    // console.log(this.checkOptions);
  }

  getRadioValue(event) {
    this.radioValue = event;
    // console.log(this.radioValue);
  }

  getName(event) {
    this.name = event;
    // console.log(this.radioValue);
  }

  getSelectDeviceData(event) {
    if (this.current === 0) {
      this.data.selectDeviceData = null;
    } else {
      this.data.selectDeviceData = event;
      // console.log('NetworkGenerateProjectComponent - ');
      // console.log(this.selectDeviceData);
    }
  }

  getControlFormData(event) {
    this.data.controlFormData = event;
  }
}
