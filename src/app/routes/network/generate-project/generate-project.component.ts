import {Component, OnInit, ViewChild} from '@angular/core';
import { _HttpClient } from '@delon/theme';


import { NetworkDesignComponent } from '../design/design.component';
import { ReuseTabService } from '@delon/abc';
import {NzModalService} from "ng-zorro-antd";
import {NetworkControlComponent} from "../control/control.component";
import {ProjectService} from "../../../user-service/project.service";
import {NetworkResultComponent} from "../result/result.component";

@Component({
  selector: 'app-network-generate-project',
  templateUrl: './generate-project.component.html',
  styleUrls: ['./generate-project.component.css']
})
export class NetworkGenerateProjectComponent implements OnInit {

  @ViewChild(NetworkDesignComponent) networkDesignComponent: NetworkDesignComponent;
  @ViewChild(NetworkControlComponent) networkControlComponent: NetworkControlComponent;
  @ViewChild(NetworkResultComponent) networkResultComponent: NetworkResultComponent;

  // design页面 Emitter 传来的参数
  checkOptions: any;
  radioValue: any;
  allCheckOptions: any;

  result:any;

  // select页面 Emitter 传来的参数
  selectDeviceData: any;
  listData = [];

  // control界面 Emitter 传来的参数
  controlFormData: any;

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
      但是因为选择设备不够不切换使就不能通过destroy来获得
     */
    // if (this.current === 0) {
    //   this.checkOptions = this.networkDesignComponent.current_checkOptions;
    //   this.radioValue = this.networkDesignComponent.radioValue;
    //   console.log(this.checkOptions);
    // }

    if ( this.current === 0) {
      const temp_checkOption = this.networkDesignComponent.current_checkOptions;
      const temp_radioValue = this.networkDesignComponent.radioValue;
      if(!temp_checkOption.has('1_1')){
        this.modalService.error({
          nzTitle: '选择错误',
          nzContent: '<b>电负荷</b>必须勾选',
          nzWidth: '650'
        });
      }
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
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    // this.changeContent();
    const data = {
      deviceData : this.selectDeviceData,
      formData : this.networkControlComponent.form_data
    };
    console.log('方案创建完成');
    console.log(JSON.stringify(data));
    this.projectService.action().subscribe((res=>{
      console.log(res);
      if(res["errno"]=="0"){
        this.result["isdone"]=true;
      }
      else if(res["errno"]=="2"){
        this.projectService.tologin();
      }
      else{
        this.result["isdone"]=false;
        this.result["msg"] = res["errmsg"];
      }
      this.projectService.setCookie("token",res["data"]["data"]["token"]);
      this.current += 1;
      this.changeContent();
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

  getAllCheckOptions(event) {
    this.allCheckOptions = event;
  }

  getSelectDeviceData(event) {
    if (this.current === 0) {
      this.selectDeviceData = null;
    } else {
      this.selectDeviceData = event;
      // console.log('NetworkGenerateProjectComponent - ');
      // console.log(this.selectDeviceData);
    }
  }

  getListData(event) {
    if (this.current === 0) {
      this.listData = [];
    } else {
      this.listData = event;
    }
  }

  getControlFormData(event) {
    this.controlFormData = event;
  }
}
