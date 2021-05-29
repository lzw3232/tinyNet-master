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
import {NetworkSelectElecNetComponent} from './elec-net/elec-net.component';
import {NetworkSelectBatteryComponent} from './battery/battery.component';
import {NetworkSelectDieselComponent} from './diesel/diesel.component';
import {NetworkSelectCentrifugalElectricitychillerComponent} from './centrifugal-electricitychiller/centrifugal-electricitychiller.component';
import {NetworkSelectGasAbschilleComponent} from './gas-abschille/gas-abschille.component';
import {NetworkSelectElecBoilerComponent} from './elec-boiler/elec-boiler.component';
import {NetworkSelectGasBoilerComponent} from './gas-boiler/gas-boiler.component';
import {NetworkSelectGasSteamBoilerComponent} from './gas-steam-boiler/gas-steam-boiler.component';
import {NetworkSelectGasTurbineComponent} from './gas-turbine/gas-turbine.component';
import {NetworkSelectElecairconditionComponent} from './elecaircondition/elecaircondition.component';
import {NetworkSelectCoolStorageComponent} from './cool-storage/cool-storage.component';
import {NetworkSelectAbschilleComponent} from './abschille/abschille.component';
import {NetworkSelectHeatExchangerComponent} from './heat-exchanger/heat-exchanger.component';
import {NetworkSelectHeatStorageComponent} from './heat-storage/heat-storage.component';
import {NetworkSelectHydroTurbineComponent} from './hydro-turbine/hydro-turbine.component';
import {NetworkSelectInternalGasTurbineComponent} from './internal-gas-turbine/internal-gas-turbine.component';
import {NetworkSelectNuclearPowerComponent} from './nuclear-power/nuclear-power.component';
import {NetworkSelectPhotovoltaicComponent} from './photovoltaic/photovoltaic.component';
import {NetworkSelectPumpComponent} from './pump/pump.component';
import {NetworkSelectScrewElectricitychillerComponent} from './screw-electricitychiller/screw-electricitychiller.component';
import {NetworkSelectWasteHeatBoilerComponent} from './waste-heat-boiler/waste-heat-boiler.component';
import {NetworkSelectWindTurbineComponent} from './wind-turbine/wind-turbine.component';
import {NetworkSelectElectricitychillerComponent} from './electricitychiller/electricitychiller.component';
import {NetworkSelectElecComponent} from "./elec/elec.component";
import {NetworkSelectCoolComponent} from "./cool/cool.component";
import {NetworkSelectHeatComponent} from "./heat/heat.component";
import {NetworkSelectSteamComponent} from "./steam/steam.component";
import {NetworkSelectSolarComponent} from "./solar/solar.component";
import {NetworkSelectWaterComponent} from "./water/water.component";
import {NetworkSelectWindComponent} from "./wind/wind.component";


@Component({
  selector: 'app-network-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class NetworkSelectComponent implements OnInit, OnDestroy {

  @Input() radioValue: any;

  @Input() checkOptions: any;

  @Input() defaultSelectDeviceData: any;

  @Output() selectDeviceDataEmitter = new EventEmitter<any>();

  @Output() listDataEmitter = new EventEmitter<any>();
  list_data = [];
  lines = [];

  default_select_device_data = {
    abschille: {
      id: null,
    },
    battery: {
      id: null,
      currentSOC: '0.00',
      maximumSOC: '0.00',
      minimumSOC: '0.00',
      convEfficiency: '0.00',
      invEfficiency: '0.00',
    },
    centrifugal_electricitychiller: {
      id: null,
    },
    cool_storage: {
      id: null,
      currentSOC: '0.00',
      minimumSOC: '0.00',
      maximumSOC: '0.00',
    },
    diesel: {
      id: null,
    },
    elecaircondition: {
      id: null,
    },
    elec_boiler: {
      id: null,
    },
    electricitychiller: {
      id: null,
    },
    gas_abschille: {
      id: null,
    },
    gas_boiler: {
      id: null,
    },
    gas_steam_boiler: {
      id: null,
    },
    gas_turbine: {
      id: null,
    },
    heat_exchanger: {
      id: null,
    },
    heat_storage: {
      id: null,
      currentSOC: '0.00',
      minimumSOC: '0.00',
      maximumSOC: '0.00',
    },
    hydro_turbine: {
      id: null,
    },
    internal_gas_turbine: {
      id: null,
    },
    nuclear_power: {
      data: null,
    },
    photovoltaic: {
      id: null,
      groundReflectance: '0.00',
      slope: '0.00',
      azimuth: '0.00',
      transmissivity: '0.00',
    },
    pump: {
      id: null,
    },
    screw_electricitychiller: {
      id: null,
    },
    waste_heat_boiler: {
      id: null,
    },
    wind_turbine: {
      id: null,
    },
  }

  select_device_data: any;
  num = {
    numberofAbschilleMinimum: '1.00',
    numberofAbschilleMaximum: '10.00',
    numberofBatteryMinimum: '1.00',
    numberofBatteryMaximum: '10.00',
    numberofCentrifugalElectricitychillerMinimum: '1.00',
    numberofCentrifugalElectricitychillerMaximum: '10.00',
    capacityofCoolstorageMinimum: '1.00',
    capacityofCoolstorageMaximum: '10.00',
    numberofDieselMinimum: '1.00',
    numberofDieselMaximum: '10.00',
    numberofElecairconditionMinimum: '1.00',
    numberofElecairconditionMaximum: '10.00',
    numberofElecboilerMinimum: '1.00',
    numberofElecboilerMaximum: '10.00',
    numberofElectricitychillerMinimum: '1.00',
    numberofElectricitychillerMaximum: '10.00',
    numberofGasabschilleMinimum: '1.00',
    numberofGasabschilleMaximum: '10.00',
    numberofGasboilerMinimum: '1.00',
    numberofGasboilerMaximum: '10.00',
    numberofSteamboilerMinimum: '1.00',
    numberofSteamboilerMaximum: '10.00',
    numberofGasturebineMinimum: '1.00',
    numberofGasturebineMaximum: '10.00',
    numberofHeatexchangerMinimum: '1.00',
    numberofHeatexchangerMaximum: '10.00',
    capacityofHeatstorageMinimum: '1.00',
    capacityofHeatstorageMaximum: '10.00',
    numberofhydroTurbineMinimum: '1.00',
    numberofhydroTurbineMaximum: '10.00',
    numberofInternalGasturebineMinimum: '1.00',
    numberofInternalGasturebineMaximum: '10.00',
    capacityofNuclearPowerMinimum: '1.00',
    capacityofNuclearPowerMaximum: '10.00',
    capacityofPVMinimum: '1.00',
    capacityofPVMaximum: '10.00',
    numberofPumpMinimum: '1.00',
    numberofPumpMaximum: '10.00',
    numberofScrewElectricitychillerMinimum: '1.00',
    numberofScrewElectricitychillerMaximum: '10.00',
    numberofWasteheatboilerMinimum: '1.00',
    numberofWasteheatboilerMaximum: '10.00',
    numberofwindTurbineMinimum: '1.00',
    numberofwindTurbineMaximum: '10.00'
  };

  GrowthFactor = { //负荷增长系数 未实现
    elecGrowthFactor: '0.00',
    heatwaterGrowthFactor: '0.00',
    coolGrowthFactor: '0.00',
    steamGrowthFactor: '0.00',
  };

  elec_net = { //电网数据
    elec_pr: [],
    vGridEmissionFactor: {
      vGridEmissionFactor0: "0.00",
      vGridEmissionFactor1: "0.00",
      vGridEmissionFactor2: "0.00",
      vGridEmissionFactor3: "0.00",
      vGridEmissionFactor4: "0.00",
      vGridEmissionFactor5: "0.00",
    }
  }

  elec=[];
  cool=[];
  heat=[];
  steam=[];

  solar=[];
  water=[];
  wind=[];


  toComponent = {
    //负荷
    elec:NetworkSelectElecComponent,
    cool:NetworkSelectCoolComponent,
    heat:NetworkSelectHeatComponent,
    steam:NetworkSelectSteamComponent,
    //电网
    elec_net: NetworkSelectElecNetComponent,
    //资源
    solar:NetworkSelectSolarComponent,
    water:NetworkSelectWaterComponent,
    wind:NetworkSelectWindComponent,
    //设备
    battery: NetworkSelectBatteryComponent,
    centrifugal_electricitychiller: NetworkSelectCentrifugalElectricitychillerComponent,
    gas_abschille: NetworkSelectGasAbschilleComponent,
    elec_boiler: NetworkSelectElecBoilerComponent,
    gas_boiler: NetworkSelectGasBoilerComponent,
    internal_gas_turbine: NetworkSelectInternalGasTurbineComponent,
    gas_steam_boiler: NetworkSelectGasSteamBoilerComponent,
    gas_turbine: NetworkSelectGasTurbineComponent,
    diesel: NetworkSelectDieselComponent,
    pump: NetworkSelectPumpComponent,
    heat_storage: NetworkSelectHeatStorageComponent,
    elecaircondition: NetworkSelectElecairconditionComponent,
    cool_storage: NetworkSelectCoolStorageComponent,
    abschille: NetworkSelectAbschilleComponent,
    nuclear_power: NetworkSelectNuclearPowerComponent,
    photovoltaic: NetworkSelectPhotovoltaicComponent,
    heat_exchanger: NetworkSelectHeatExchangerComponent,
    waste_heat_boiler: NetworkSelectWasteHeatBoilerComponent,
    screw_electricitychiller: NetworkSelectScrewElectricitychillerComponent,
    electricitychiller: NetworkSelectElectricitychillerComponent,
    hydro_turbine: NetworkSelectHydroTurbineComponent,
    wind_turbine: NetworkSelectWindTurbineComponent,
  };

  loading = false;

  i = 1;

  constructor(
    private modalService: NzModalService,
    private el: ElementRef,
  ) {
  }

  /*
  如果generate-project传过来的有数据则使用传过来的数据，否则初始化一份数据
  页面结束时传给generate-project
   */
  ngOnInit() {
    console.log('NetworkSelectComponent init');
    console.log(this.radioValue);
    console.log(this.checkOptions);
    console.log(this.defaultSelectDeviceData);
    // if (this.defaultListData.length > 0) {
    //   this.list_data = this.defaultListData;
    //   this.select_device_data = this.defaultSelectDeviceData;
    // }else{
    const data = {};
    //初始化每个设备的上下限  负荷增长系数  电网 四个负荷
    data["num"] = this.num;

    data["GrowthFactor"] = this.GrowthFactor;

    for (let i = 0; i < 24; i++) { //初始化电网数据
      let tmp = {
        time: i + ":00-" + (i + 1) + ":00",
        purchasePriceGrid: "0.00",
        sellingPriceGrid: "0.00",
      };
      this.elec_net.elec_pr.push(tmp);
    }

    data["elec_net"] = this.elec_net;

    //初始化负荷数据
    for (let i = 0; i < 24; i++) {
      let tmp = {
        vPrimaryLoad: "0.00",
      };
      this.elec.push(tmp);
    }
    for (let i = 0; i < 24; i++) {
      let tmp = {
        vCoolLoad: "0.00",
      };
      this.cool.push(tmp);
    }
    for (let i = 0; i < 24; i++) {
      let tmp = {
        vHeatWaterLoad: "0.00",
      };
      this.heat.push(tmp);
    }
    for (let i = 0; i < 24; i++) {
      let tmp = {
        vSteamLoad: "0.00",
      };
      this.steam.push(tmp);
    }

    //初始化资源数据
    for (let i = 0; i < 8760; i++) {
      let tmp = {
        vPVSource: "0.00",
      };
      this.solar.push(tmp);
    }
    for (let i = 0; i < 8760; i++) {
      let tmp = {
        vWindSpeed: "0.00",
      };
      this.wind.push(tmp);
    }
    for (let i = 0; i < 8760; i++) {
      let tmp = {
        vWaterFlow: "0.00",
      };
      this.water.push(tmp);
    }

    for (let i in this.checkOptions) {
      this.checkOptions[i].map((res) => {
        if (res.checked === true && res.name) {
          this.list_data.push({label: res.label, name: res.name});
          data[res.name] = this.default_select_device_data[res.name];
          switch (res.name){
            case "cool_storage":
              this.list_data.push({label: "双工况主机", name: "elecaircondition"});
              data["elecaircondition"] = this.default_select_device_data["elecaircondition"];
              break;
            case "wind_turbine":
              this.list_data.push({label: "风资源", name: "wind"});
              break;
            case "photovoltaic":
              this.list_data.push({label: "光资源", name: "solar"});
              break;
            case "hydro_turbine":
              this.list_data.push({label: "水资源", name: "water"});
              break;
          }
        }
      })
    }


    data["wind"] = this.wind;
    data["solar"] = this.solar;
    data["water"] = this.water;

    data["elec"] = this.elec;
    data["cool"] = this.cool;
    data["heat"] = this.heat;
    data["steam"] = this.steam;

    if (this.radioValue == "B") {
      this.list_data.push({label: "电网", name: "elec_net"});
    }

    if (!this.defaultSelectDeviceData) { //是否初始化数据
      this.select_device_data = data;
    } else {
      this.select_device_data = this.defaultSelectDeviceData;
    }
    console.log(this.list_data);
    console.log(this.select_device_data);
    console.log(this.checkOptions);

    this.lines[0] = this.checkOptions.checkOptionsOne_load[0].checked
      || this.checkOptions.checkOptionsOne_renewable_energy[0].checked
      || this.checkOptions.checkOptionsOne_renewable_energy[1].checked
      || this.checkOptions.checkOptionsOne_renewable_energy[2].checked
      || this.checkOptions.checkOptionsOne_stored_energy[1].checked
      || this.checkOptions.checkOptionsOne_electric_generator[1].checked
      || (this.radioValue == "B")
    ;
    this.lines[1] = this.checkOptions.checkOptionsOne_load[1].checked;
    this.lines[2] = this.checkOptions.checkOptionsOne_load[2].checked;
    this.lines[3] = this.checkOptions.checkOptionsOne_electric_generator[0].checked || this.checkOptions.checkOptionsOne_electric_generator[2].checked || this.checkOptions.checkOptionsOne_component[9].checked;
    this.lines[4] = this.checkOptions.checkOptionsOne_component[5].checked || this.checkOptions.checkOptionsOne_component[3].checked;
    this.lines[5] = this.checkOptions.checkOptionsOne_load[3].checked;
    this.lines[6] = this.checkOptions.checkOptionsOne_component[5].checked || this.checkOptions.checkOptionsOne_component[8].checked;

  }

  ngOnDestroy() {
    this.select_device_data.elec.map((item)=>{
      delete item["time"];
    })

    this.select_device_data.cool.map((item)=>{
      delete item["time"];
    })

    this.select_device_data.heat.map((item)=>{
      delete item["time"];
    })

    this.select_device_data.steam.map((item)=>{
      delete item["time"];
    })

    this.selectDeviceDataEmitter.emit(this.select_device_data);
    console.log('NetworkSelectComponent Destroy');
  }

  /**
   * 查看 list 列表的 item
   *
   */
  viewItem(item) {
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
    console.log()
    let temp = this.toComponent[name];
    let result;
    switch (name) {
      case "elec_net":
        result = this.select_device_data["elec_net"];
        break;
      case "elec":
        result = {
          load: this.select_device_data[name],
          growth: this.select_device_data.GrowthFactor.elecGrowthFactor,
        }
        console.log(result);
        break;
      case "cool":
        result = {
          load: this.select_device_data[name],
          growth: this.select_device_data.GrowthFactor.coolGrowthFactor,
        }
        break;
      case "heat":
        result = {
          load: this.select_device_data[name],
          growth: this.select_device_data.GrowthFactor.heatwaterGrowthFactor,
        }
        break;
      case "steam":
        result = {
          load: this.select_device_data[name],
          growth: this.select_device_data.GrowthFactor.steamGrowthFactor,
        }
        break;
      case "solar":
        result = this.solar;
        break;
      case "wind":
        result = this.wind;
        break;
      case "water":
        result = this.water;
        break;
      default:
        result = {
          par: this.select_device_data[name],
          num: this.select_device_data["num"],
        }
        break;
    }
    const modal = this.modalService.create({
      nzTitle: '设备详情',
      nzContent: temp,
      nzComponentParams: {
        title: name,
        result: result
      },
      nzGetContainer: this.el.nativeElement.querySelector('#battery-view'),
      nzMaskClosable: false,
      nzWidth: '90%',
      nzOnCancel:() => modal.getContentComponent().close(),
      nzFooter: [
        {
          label: '关闭',
          shape: 'default',
          onClick: () => modal.getContentComponent().close()
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
      setTimeout(()=>{
        switch (name) {
          case "elec_net":
            this.select_device_data.elec_net["elec_pr"] = result["elec_pr"];
            break;
          case "elec":
            this.select_device_data.elec = result["load"];
            this.select_device_data.GrowthFactor.elecGrowthFactor= result["growth"];
            break;
          case "cool":
            this.select_device_data.cool = result["load"];
            this.select_device_data.GrowthFactor.coolGrowthFactor= result["growth"];
            break;
          case "heat":
            this.select_device_data.heat = result["load"];
            this.select_device_data.GrowthFactor.heatwaterGrowthFactor= result["growth"];
            break;
          case "steam":
            this.select_device_data.steam = result["load"];
            this.select_device_data.GrowthFactor.steamGrowthFactor= result["growth"];
            break;
          case "solar":
            this.select_device_data.solar = result;
            break;
          case "wind":
            this.select_device_data.wind = result;
            break;
          case "water":
            this.select_device_data.water = result;
            break;


          default:
            for (var o in result["num"]) {
              this.select_device_data["num"][o] = result["num"][o];
            }
            this.select_device_data[name] = result["par"];
            break;
        }
      })
      // if (result) {
      //   console.log(result)
      //
      // }


      console.log(this.select_device_data);
    });
  }

}
