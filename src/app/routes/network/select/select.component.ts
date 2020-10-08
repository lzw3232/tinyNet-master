import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {_HttpClient, ModalHelper} from '@delon/theme';
import {NzModalService} from 'ng-zorro-antd';
import { NetworkSelectBatteryComponent } from './battery/battery.component';
import {NetworkSelectTurbineComponent} from './turbine/turbine.component';
import {NetworkSelectWindTurbinesComponent} from './wind-turbines/wind-turbines.component';
import {NetworkSelectPhotovoltaicComponent} from './photovoltaic/photovoltaic.component';
import {NetworkSelectGeneratorComponent} from './generator/generator.component';
import { NetworkSelectCentrifugalComponent } from './centrifugal/centrifugal.component';
import {NetworkSelectDirectFiredLithiumBromideComponent} from './direct-fired-lithium-bromide/direct-fired-lithium-bromide.component';
import {NetworkSelectElectricBoilerComponent} from './electric-boiler/electric-boiler.component';
import {NetworkSelectGasBoilerComponent} from './gas-boiler/gas-boiler.component';
import {NetworkSelectGasEngineComponent} from './gas-engine/gas-engine.component';
import { NetworkSelectGasSteamComponent } from './gas-steam/gas-steam.component';
import {NetworkSelectGasTurbineComponent} from './gas-turbine/gas-turbine.component';
import { NetworkSelectHeatPumpComponent } from './heat-pump/heat-pump.component';
import { NetworkSelectHeatStorageComponent } from './heat-storage/heat-storage.component';
import { NetworkSelectHostComponent } from './host/host.component';
import { NetworkSelectIceStorageComponent } from './ice-storage/ice-storage.component';
import { NetworkSelectLithiumBromideComponent } from './lithium-bromide/lithium-bromide.component';
import { NetworkSelectNuclearComponent } from './nuclear/nuclear.component';
import { NetworkSelectPlateHeatComponent } from './plate-heat/plate-heat.component';
import { NetworkSelectResidualHeatComponent } from './residual-heat/residual-heat.component';
import { NetworkSelectScrewComponent } from './screw/screw.component';
import { NetworkSelectScrollComponent } from './scroll/scroll.component';


@Component({
  selector: 'app-network-select',
  templateUrl: './select.component.html',
  styleUrls : ['./select.component.css']
})
export class NetworkSelectComponent implements OnInit, OnDestroy {

  @Input() radioValue: any;

  @Input() checkOptions: any;

  @Input() defaultSelectDeviceData: any;

  @Input() defaultListData: any;

  @Output() selectDeviceDataEmitter = new EventEmitter<any>();

  @Output() listDataEmitter = new EventEmitter<any>();

  lines=[];

  default_select_device_data = {
    battery : {
      id : null,
      soc_1 : '0.00',
      soc_2 : '0.00',
      soc_3 : '0.00',
      total_flow : '0.00',
      back_flow : '0.00',
      upper_limit : '1.00',
      lower_limit : '10.00'},
    centrifugal : {
      id : null,
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
    direct_fired_lithium_bromide : {
      id : null,
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
    electric_boiler : { data : null },
    gas_boiler : {
      id : null,
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
    gas_engine : {
      id : null,
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
    gas_steam : {
      id : null,
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
    gas_turbine : {
      id : null,
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
    generator : {
      id : null,
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
    heat_pump :  {
      id : null,
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
    heat_storage : {
      id : null,
      soc_1 : '0.00',
      soc_2 : '0.00',
      soc_3 : '0.00',
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
    host : {
      id : null,
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
    ice_storage : {
      id : null,
      soc_1 : '0.00',
      soc_2 : '0.00',
      soc_3 : '0.00',
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
    lithium_bromide : {
      id : null,
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
    nuclear : { data : null },
    photovoltaic : {
      id : null,
      ground_reflection : '0.00',
      angle_1 : '0.00',
      angle_2 : '0.00',
      solar_transmittance : '0.00',
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
    plate_heat : {
      id : null,
      soc_1 : '0.00',
      soc_2 : '0.00',
      soc_3 : '0.00',
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
    residual_heat : {
      id : null,
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
    screw : {
      id : null,
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
    scroll : {
      id : null,
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
    turbine : {
      id : null,
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
    wind_turbines :{
      id : null,
      upper_limit : '1.00',
      lower_limit : '10.00'
    },
  }

  select_device_data:any;

  toComponent = {
    battery : NetworkSelectBatteryComponent,
    centrifugal : NetworkSelectCentrifugalComponent,
    direct_fired_lithium_bromide : NetworkSelectDirectFiredLithiumBromideComponent,
    electric_boiler : NetworkSelectElectricBoilerComponent,
    gas_boiler : NetworkSelectGasBoilerComponent,
    gas_engine : NetworkSelectGasEngineComponent,
    gas_steam : NetworkSelectGasSteamComponent,
    gas_turbine : NetworkSelectGasTurbineComponent,
    generator : NetworkSelectGeneratorComponent,
    heat_pump : NetworkSelectHeatPumpComponent,
    heat_storage : NetworkSelectHeatStorageComponent,
    host : NetworkSelectHostComponent,
    ice_storage : NetworkSelectIceStorageComponent,
    lithium_bromide : NetworkSelectLithiumBromideComponent,
    nuclear : NetworkSelectNuclearComponent,
    photovoltaic : NetworkSelectPhotovoltaicComponent,
    plate_heat :NetworkSelectPlateHeatComponent,
    residual_heat : NetworkSelectResidualHeatComponent,
    screw : NetworkSelectScrewComponent,
    scroll : NetworkSelectScrollComponent,
    turbine : NetworkSelectTurbineComponent,
    wind_turbines : NetworkSelectWindTurbinesComponent,
  };

  loading = false;
  list_data = [];

  i = 1;

  constructor(
    private modalService: NzModalService,
    private el: ElementRef,
  ) { }

  ngOnInit() {
    console.log('NetworkSelectComponent init');
    console.log(this.radioValue);
    console.log(this.checkOptions);
    // if (this.defaultListData.length > 0) {
    //   this.list_data = this.defaultListData;
    //   this.select_device_data = this.defaultSelectDeviceData;
    // }else{
    const data={};
    for(let i in this.checkOptions){
      this.checkOptions[i].map((res)=>{
        if(res.checked===true&&res.name){
          this.list_data.push({label:res.label,name:res.name});
          data[res.name]=this.default_select_device_data[res.name];
          if(res.name=="ice_storage"){
            this.list_data.push({label:"双工况主机",name:"host"});
            data["host"]=this.default_select_device_data["host"];
          }
        }
      })
    }
    this.select_device_data = data;
    console.log(this.list_data);
    console.log(this.select_device_data);

    this.lines[0] = this.checkOptions.checkOptionsOne_load[0].checked
      ||this.checkOptions.checkOptionsOne_renewable_energy[0].checked
      ||this.checkOptions.checkOptionsOne_renewable_energy[1].checked
      ||this.checkOptions.checkOptionsOne_renewable_energy[2].checked
      ||this.checkOptions.checkOptionsOne_stored_energy[1].checked
      ||this.checkOptions.checkOptionsOne_electric_generator[1].checked
      ||(this.radioValue=="B")
    ;
    console.log(this.lines[0]);
    console.log(this.checkOptions.checkOptionsOne_load[0].checked);
    this.lines[1]=this.checkOptions.checkOptionsOne_load[1].checked;
    this.lines[2]=this.checkOptions.checkOptionsOne_load[2].checked;
    this.lines[3]=this.checkOptions.checkOptionsOne_electric_generator[0].checked||this.checkOptions.checkOptionsOne_electric_generator[2].checked||this.checkOptions.checkOptionsOne_component[9].checked;
    this.lines[4]=this.checkOptions.checkOptionsOne_component[5].checked||this.checkOptions.checkOptionsOne_component[3].checked;
    this.lines[5]=this.checkOptions.checkOptionsOne_load[3].checked;
    this.lines[6]=this.checkOptions.checkOptionsOne_component[5].checked||this.checkOptions.checkOptionsOne_component[8].checked;

  }

  ngOnDestroy() {
    this.selectDeviceDataEmitter.emit(this.select_device_data);
    this.listDataEmitter.emit(this.list_data);
    console.log('NetworkSelectComponent Destroy');
  }

  /**
   * 查看 list 列表的 item
   *
   */
  viewItem(item){
    this.hello(item.name);
  }

  /**
   * 删除 list 列表的 item
   *
   */
  deleteItem(item: any): void {
    alert("shanchu");
  }

  /**
   * 更新列表
   * @param obj 列表传入数据
   */
  updateTheList(obj: any): void {
    this.loading = true;
    setTimeout(() => {
      this.list_data.push(obj);
      this.loading = false;
    });
  }

  cancel(): void {
    console.log('取消删除');
  }

  hello(name) {
    // console.log(name);
    let temp = this.toComponent[name];

    const modal = this.modalService.create({
      nzTitle: '设备详情',
      nzContent: temp,
      nzComponentParams: {
        title: name,
        result:this.select_device_data[name]
      },
      nzGetContainer: this.el.nativeElement.querySelector('#battery-view'),
      nzMaskClosable: false,
      nzWidth: '90%',
      nzFooter: [
        {
          label: '关闭',
          shape: 'default',
          onClick: () => modal.destroy()
        },
        {
          label: '确认',
          type: 'primary',
          onClick: () => {
            this.modalService.confirm({
              nzTitle: '提交',
              nzContent: '是否确认选择？',
              nzOnOk: () => modal.getContentComponent().close()
            });
          }
        },
      ]
    });

    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    // Return a result when closed
    modal.afterClose.subscribe((result) => {
      console.log('[afterClose] The result is:', result);
      if(result){
        this.select_device_data[name]=result;
      }

      // console.log(this.select_device_data);
    });
  }

}
