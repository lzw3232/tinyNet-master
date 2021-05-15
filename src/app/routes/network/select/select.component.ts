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
import {NetworkSelectDieselComponent} from './diesel/diesel.component';
import { NetworkSelectCentrifugalElectricitychillerComponent } from './centrifugal-electricitychiller/centrifugal-electricitychiller.component';
import {NetworkSelectGasAbschilleComponent} from './gas-abschille/gas-abschille.component';
import {NetworkSelectElecBoilerComponent} from './elec-boiler/elec-boiler.component';
import {NetworkSelectGasBoilerComponent} from './gas-boiler/gas-boiler.component';
import { NetworkSelectGasSteamBoilerComponent } from './gas-steam-boiler/gas-steam-boiler.component';
import {NetworkSelectGasTurbineComponent} from './gas-turbine/gas-turbine.component';
import { NetworkSelectElecairconditionComponent } from './elecaircondition/elecaircondition.component';
import { NetworkSelectCoolStorageComponent } from './cool-storage/cool-storage.component';
import { NetworkSelectAbschilleComponent } from './abschille/abschille.component';
import { NetworkSelectHeatExchangerComponent } from './heat-exchanger/heat-exchanger.component';
import { NetworkSelectHeatStorageComponent } from './heat-storage/heat-storage.component';
import { NetworkSelectHydroTurbineComponent } from './hydro-turbine/hydro-turbine.component';
import { NetworkSelectInternalGasTurbineComponent } from './internal-gas-turbine/internal-gas-turbine.component';
import { NetworkSelectNuclearPowerComponent } from './nuclear-power/nuclear-power.component';
import { NetworkSelectPhotovoltaicComponent } from './photovoltaic/photovoltaic.component';
import { NetworkSelectPumpComponent } from './pump/pump.component';
import { NetworkSelectScrewElectricitychillerComponent } from './screw-electricitychiller/screw-electricitychiller.component';
import { NetworkSelectWasteHeatBoilerComponent } from './waste-heat-boiler/waste-heat-boiler.component';
import { NetworkSelectWindTurbineComponent } from './wind-turbine/wind-turbine.component';
import {  NetworkSelectElectricitychillerComponent  } from './electricitychiller/electricitychiller.component';


@Component({
  selector: 'app-network-select',
  templateUrl: './select.component.html',
  styleUrls : ['./select.component.css']
})
export class NetworkSelectComponent implements OnInit, OnDestroy {

  @Input() radioValue: any;

  @Input() checkOptions: any;

  @Input() defaultSelectDeviceData: any;

  @Output() selectDeviceDataEmitter = new EventEmitter<any>();

  @Output() listDataEmitter = new EventEmitter<any>();
  list_data=[];
  lines=[];

  default_select_device_data = {
    abschille : {
      id : null,
      numberofAbschilleMinimum : '1.00',
      numberofAbschilleMaximum : '10.00'
    },
    battery : {
      id : null,
      currentSOC : '0.00',
      maximumSOC : '0.00',
      minimumSOC : '0.00',
      convEfficiency : '0.00',
      invEfficiency : '0.00',
      numberofBatteryMinimum : '1.00',
      numberofBatteryMaximum : '10.00',
    },
    centrifugal_electricitychiller : {
      id : null,
      numberofCentrifugalElectricitychillerMinimum : '1.00',
      numberofCentrifugalElectricitychillerMaximum : '10.00'
    },
    cool_storage : {
      id : null,
      currentSOC : '0.00',
      minimumSOC : '0.00',
      maximumSOC : '0.00',
      capacityofCoolstorageMinimum : '1.00',
      capacityofCoolstorageMaximum : '10.00'
    },
    diesel : {
      id : null,
      numberofDieselMinimum : '1.00',
      numberofDieselMaximum : '10.00'
    },
    elecaircondition : {
      id : null,
      numberofElecairconditionMinimum : '1.00',
      numberofElecairconditionMaximum : '10.00'
    },
    elec_boiler : {
      id : null,
      numberofElecboilerMinimum : '1.00',
      numberofElecboilerMaximum : '10.00'
    },
    electricitychiller : {
      id : null,
      numberofElectricitychillerMinimum : '1.00',
      numberofElectricitychillerMaximum : '10.00'
    },
    gas_abschille : {
      id : null,
      numberofGasabschilleMinimum : '1.00',
      numberofGasabschilleMaximum : '10.00'
    },
    gas_boiler : {
      id : null,
      numberofGasboilerMinimum : '1.00',
      numberofGasboilerMaximum : '10.00'
    },
    gas_steam_boiler : {
      id : null,
      numberofSteamboilerMinimum : '1.00',
      numberofSteamboilerMaximum : '10.00'
    },
    gas_turbine : {
      id : null,
      numberofGasturebineMinimum : '1.00',
      numberofGasturebineMaximum : '10.00'
    },
    heat_exchanger : {
      id : null,
      numberofHeatexchangerMinimum : '1.00',
      numberofHeatexchangerMaximum : '10.00'
    },
    heat_storage : {
      id : null,
      currentSOC : '0.00',
      minimumSOC : '0.00',
      maximumSOC : '0.00',
      capacityofHeatstorageMinimum : '1.00',
      capacityofHeatstorageMaximum : '10.00'
    },
    hydro_turbine : {
      id : null,
      numberofhydroTurbineMinimum : '1.00',
      numberofhydroTurbineMaximum : '10.00'
    },
    internal_gas_turbine : {
      id : null,
      numberofInternalGasturebineMinimum : '1.00',
      numberofInternalGasturebineMaximum : '10.00'
    },
    nuclear_power : {
      data : null,
      capacityofNuclearPowerMinimum : '1.00',
      capacityofNuclearPowerMaximum : '10.00'
    },
    photovoltaic : {
      id : null,
      groundReflectance : '0.00',
      slope : '0.00',
      azimuth : '0.00',
      transmissivity : '0.00',
      capacityofPVMinimum : '1.00',
      capacityofPVMaximum : '10.00'
    },
    pump :  {
      id : null,
      numberofPumpMinimum : '1.00',
      numberofPumpMaximum : '10.00'
    },
    screw_electricitychiller : {
      id : null,
      numberofScrewElectricitychillerMinimum : '1.00',
      numberofScrewElectricitychillerMaximum : '10.00'
    },
    waste_heat_boiler : {
      id : null,
      numberofWasteheatboilerMinimum : '1.00',
      numberofWasteheatboilerMaximum : '10.00'
    },
    wind_turbine :{
      id : null,
      numberofwindTurbineMinimum : '1.00',
      numberofwindTurbineMaximum : '10.00'
    },
  }

  select_device_data:any;

  toComponent = {
    battery : NetworkSelectBatteryComponent,
    centrifugal_electricitychiller : NetworkSelectCentrifugalElectricitychillerComponent,
    gas_abschille : NetworkSelectGasAbschilleComponent,
    elec_boiler : NetworkSelectElecBoilerComponent,
    gas_boiler : NetworkSelectGasBoilerComponent,
    internal_gas_turbine : NetworkSelectInternalGasTurbineComponent,
    gas_steam_boiler : NetworkSelectGasSteamBoilerComponent,
    gas_turbine : NetworkSelectGasTurbineComponent,
    diesel : NetworkSelectDieselComponent,
    pump : NetworkSelectPumpComponent,
    heat_storage : NetworkSelectHeatStorageComponent,
    elecaircondition : NetworkSelectElecairconditionComponent,
    cool_storage : NetworkSelectCoolStorageComponent,
    abschille : NetworkSelectAbschilleComponent,
    nuclear_power : NetworkSelectNuclearPowerComponent,
    photovoltaic : NetworkSelectPhotovoltaicComponent,
    heat_exchanger :NetworkSelectHeatExchangerComponent,
    waste_heat_boiler : NetworkSelectWasteHeatBoilerComponent,
    screw_electricitychiller : NetworkSelectScrewElectricitychillerComponent,
    electricitychiller : NetworkSelectElectricitychillerComponent,
    hydro_turbine : NetworkSelectHydroTurbineComponent,
    wind_turbine : NetworkSelectWindTurbineComponent,
  };

  loading = false;

  i = 1;

  constructor(
    private modalService: NzModalService,
    private el: ElementRef,
  ) { }

  ngOnInit() {
    console.log('NetworkSelectComponent init');
    console.log(this.radioValue);
    console.log(this.checkOptions);
    console.log(this.defaultSelectDeviceData);
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
          if(res.name=="cool_storage"){
            this.list_data.push({label:"双工况主机",name:"elecaircondition"});
            data["elecaircondition"]=this.default_select_device_data["elecaircondition"];
          }
        }
      })
    }
    if(!this.defaultSelectDeviceData){
      this.select_device_data = data;
    }
    else{
      this.select_device_data = this.defaultSelectDeviceData;
    }
    console.log(this.list_data);
    console.log(this.select_device_data);
    console.log(this.checkOptions);

    this.lines[0] = this.checkOptions.checkOptionsOne_load[0].checked
      ||this.checkOptions.checkOptionsOne_renewable_energy[0].checked
      ||this.checkOptions.checkOptionsOne_renewable_energy[1].checked
      ||this.checkOptions.checkOptionsOne_renewable_energy[2].checked
      ||this.checkOptions.checkOptionsOne_stored_energy[1].checked
      ||this.checkOptions.checkOptionsOne_electric_generator[1].checked
      ||(this.radioValue=="B")
    ;
    this.lines[1]=this.checkOptions.checkOptionsOne_load[1].checked;
    this.lines[2]=this.checkOptions.checkOptionsOne_load[2].checked;
    this.lines[3]=this.checkOptions.checkOptionsOne_electric_generator[0].checked||this.checkOptions.checkOptionsOne_electric_generator[2].checked||this.checkOptions.checkOptionsOne_component[9].checked;
    this.lines[4]=this.checkOptions.checkOptionsOne_component[5].checked||this.checkOptions.checkOptionsOne_component[3].checked;
    this.lines[5]=this.checkOptions.checkOptionsOne_load[3].checked;
    this.lines[6]=this.checkOptions.checkOptionsOne_component[5].checked||this.checkOptions.checkOptionsOne_component[8].checked;

  }

  ngOnDestroy() {
    this.selectDeviceDataEmitter.emit(this.select_device_data);
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
    console.log(name);
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
