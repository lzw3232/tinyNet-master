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
import {NetworkSelectWindTurbineComponent} from './wind-turbine/wind-turbine.component';
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

  @Input() checkOptionsSet: Set<string>;

  @Input() checkOptions: any;

  @Input() defaultSelectDeviceData: any;

  @Input() defaultListData: any;

  @Output() selectDeviceDataEmitter = new EventEmitter<any>();

  @Output() listDataEmitter = new EventEmitter<any>();
  lines=[];

  select_device_data = {
    battery : { data : null },
    centrifugal : { data : null },
    direct_fired_lithium_bromide : { data : null },
    electric_boiler : { data : null },
    gas_boiler : { data : null },
    gas_engine : { data : null },
    gas_steam : { data : null },
    gas_turbine : { data : null },
    generator : { data : null },
    heat_pump : { data : null },
    heat_storage : { data : null },
    host : { data : null },
    ice_storage : { data : null },
    lithium_bromide : { data : null },
    nuclear : { data : null },
    photovoltaic : { data : null },
    plate_heat : { data : null },
    residual_heat : { data : null },
    screw : { data : null },
    scroll : { data : null },
    turbine : { data : null },
    wind_turbines : { data : null },
  };

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
    wind_turbines : NetworkSelectWindTurbineComponent,
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
    //console.log(this.checkOptions);
    if (this.defaultListData.length > 0) {
      this.list_data = this.defaultListData;
      this.select_device_data = this.defaultSelectDeviceData;
    }
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
   * 删除 list 列表的 item
   *
   */
  deleteItem(item: any): void {
    console.log(item);
    const temp = [];
    this.list_data.forEach(function (value) {
      if (value['device'] !== item['device']) {
        temp.push(value);
      }
    });
    this.loading = true;
    setTimeout(() => {
      this.list_data = temp;
      this.loading = false;
    }, 100);
    this.select_device_data[item['device']]['data'] = null;
  }

  /**
   * 查看 item 详情
   *
   */
  viewItem(item: any): void {
    console.log(item);
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
        record: {
          id: 1
        }
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
      if (result) {
        switch (result['device']) {
          case 'battery':
            if (result['data']['battery_ids'].length > 0) {
              this.select_device_data.battery.data = result['data'];
              this.updateTheList({
                title: '电池',
                device: 'battery',
                avatar: './assets/device/icon-battery.png',
                description: '您已经选择了 ' + result['data']['battery_ids'].length + ' 个电池。',
              });
            } else {
              console.log('数据不合法');
            }
            break;
          case 'shuilifadianji':
            if (result['data']['turbine_ids'].length > 0) {
              this.select_device_data.turbine.data = result['data'];
              this.updateTheList({
                title: '水力发电机',
                device: 'turbine',
                avatar: './assets/device/icon-turbine.png',
                description: '您已经选择了 ' + result['data']['turbine_ids'].length + ' 台水力发电机。',
              });
            } else {
              console.log('数据不合法');
            }
            break;
          case 'fenglifadianji':
            if (result['data']['wind_turbines_ids'].length > 0) {
              this.select_device_data.wind_turbines.data = result['data'];
              this.updateTheList({
                title: '风力发电机',
                device: 'wind_turbines',
                avatar: './assets/device/icon-wind-turbine.png',
                description: '您已经选择了 ' + result['data']['wind_turbines_ids'].length + ' 台风力发电机。',
              });
            } else {
              console.log('数据不合法');
            }
            break;
          case 'guangfuzhenlie':
            if (result['data']['photovoltaic_ids'].length > 0) {
              this.select_device_data.photovoltaic.data = result['data'];
              this.updateTheList({
                title: '光伏阵列',
                device: 'photovoltaic',
                avatar: './assets/device/icon-photovoltaic.png',
                description: '您已经选择了 ' + result['data']['photovoltaic_ids'].length + ' 台光伏发电机。',
              });
            } else {
              console.log('数据不合法');
            }
            break;
          case 'changguifadianji':
            if (result['data']['generator_ids'].length > 0) {
              this.select_device_data.generator.data = result['data'];
              this.updateTheList({
                title: '常规发电机',
                device: 'generator',
                avatar: './assets/device/icon-generator.png',
                description: '您已经选择了 ' + result['data']['generator_ids'].length + ' 台常规发电机。',
              });
            } else {
              console.log('数据不合法');
            }
            break;
          default:
            break;
        }
      }
      // console.log(this.select_device_data);
    });
  }

}
