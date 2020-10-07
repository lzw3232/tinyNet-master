import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DeviceRoutingModule } from './device-routing.module';
import { DeviceBatteryDetailComponent } from './battery-detail/battery-detail.component';
import { DeviceWindGeneratorDetailComponent } from './wind-generator-detail/wind-generator-detail.component';
import { DeviceBatteryDetailViewComponent } from './battery-detail/view/view.component';
import { DeviceBatteryDetailEditComponent } from './battery-detail/edit/edit.component';
import { ViserModule } from 'viser-ng';
import { DeviceWindGeneratorDetailViewComponent } from './wind-generator-detail/view/view.component';
import { DeviceWindGeneratorDetailEditComponent } from './wind-generator-detail/edit/edit.component';
import { DeviceTurbineDetailComponent } from './turbine-detail/turbine-detail.component';
import { DeviceTurbineDetailViewComponent } from './turbine-detail/view/view.component';
import { DeviceTurbineDetailEditComponent } from './turbine-detail/edit/edit.component';
import { DevicePhotovoltaicDetailComponent } from './photovoltaic-detail/photovoltaic-detail.component';
import { DevicePhotovoltaicDetailViewComponent } from './photovoltaic-detail/view/view.component';
import { DevicePhotovoltaicDetailEditComponent } from './photovoltaic-detail/edit/edit.component';
import { DeviceGeneratorDetailComponent } from './generator-detail/generator-detail.component';
import { DeviceGeneratorDetailViewComponent } from './generator-detail/view/view.component';
import { DeviceGeneratorDetailEditComponent } from './generator-detail/edit/edit.component';
import { GasTurbineDetailComponent } from './gas-turbine-detail/gas-turbine-detail.component';
import { GasTurbineDetailViewComponent } from './gas-turbine-detail/view/view.component';
import { GasTurbineDetailEditComponent } from './gas-turbine-detail/edit/edit.component';
import { GasEngineDetailComponent } from './gas-engine-detail/gas-engine-detail.component';
import { GasEngineDetailViewComponent } from './gas-engine-detail/view/view.component';
import { GasEngineDetailEditComponent } from './gas-engine-detail/edit/edit.component';
import { ElectricBoilerDetailComponent } from './electric-boiler-detail/electric-boiler-detail.component';
import { ElectricBoilerDetailViewComponent } from './electric-boiler-detail/view/view.component';
import { ElectricBoilerDetailEditComponent } from './electric-boiler-detail/edit/edit.component';
import { GasBoilerDetailComponent } from './gas-boiler-detail/gas-boiler-detail.component';
import { GasBoilerDetailViewComponent } from './gas-boiler-detail/view/view.component';
import { GasBoilerDetailEditComponent } from './gas-boiler-detail/edit/edit.component';
import { GasSteamDetailComponent } from './gas-steam-detail/gas-steam-detail.component';
import { GasSteamDetailViewComponent } from './gas-steam-detail/view/view.component';
import { GasSteamDetailEditComponent } from './gas-steam-detail/edit/edit.component';
import { HeatPumpDetailComponent } from './heat-pump-detail/heat-pump-detail.component';
import { HeatPumpDetailViewComponent } from './heat-pump-detail/view/view.component';
import { HeatPumpDetailEditComponent } from './heat-pump-detail/edit/edit.component';
import { ScrollDetailComponent } from './scroll-detail/scroll-detail.component';
import { ScrollDetailViewComponent } from './scroll-detail/view/view.component';
import { ScrollDetailEditComponent } from './scroll-detail/edit/edit.component';
import { ScrewDetailComponent } from './screw-detail/screw-detail.component';
import { ScrewDetailViewComponent } from './screw-detail/view/view.component';
import { ScrewDetailEditComponent } from './screw-detail/edit/edit.component';
import { CentrifugalDetailComponent } from './centrifugal-detail/centrifugal-detail.component';
import { CentrifugalDetailViewComponent } from './centrifugal-detail/view/view.component';
import { CentrifugalDetailEditComponent } from './centrifugal-detail/edit/edit.component';
import { LithiumBromideDetailComponent } from './lithium-bromide-detail/lithium-bromide-detail.component';
import { LithiumBromideDetailViewComponent } from './lithium-bromide-detail/view/view.component';
import { LithiumBromideDetailEditComponent } from './lithium-bromide-detail/edit/edit.component';
import { DirectFiredLithiumBromideDetailComponent } from './direct-fired-lithium-bromide-detail/direct-fired-lithium-bromide-detail.component';
import { DirectFiredLithiumBromideDetailViewComponent } from './direct-fired-lithium-bromide-detail/view/view.component';
import { DirectFiredLithiumBromideDetailEditComponent } from './direct-fired-lithium-bromide-detail/edit/edit.component';
import { HostDetailComponent } from './host-detail/host-detail.component';
import { HostDetailViewComponent } from './host-detail/view/view.component';
import { HostDetailEditComponent } from './host-detail/edit/edit.component';
import { HeatStorageDetailComponent } from './heat-storage-detail/heat-storage-detail.component';
import { HeatStorageDetailViewComponent } from './heat-storage-detail/view/view.component';
import { HeatStorageDetailEditComponent } from './heat-storage-detail/edit/edit.component';
import { IceStorageDetailComponent } from './ice-storage-detail/ice-storage-detail.component';
import { IceStorageDetailViewComponent } from './ice-storage-detail/view/view.component';
import { IceStorageDetailEditComponent } from './ice-storage-detail/edit/edit.component';
import { ResidualHeatDetailComponent } from './residual-heat-detail/residual-heat-detail.component';
import { ResidualHeatDetailViewComponent } from './residual-heat-detail/view/view.component';
import { ResidualHeatDetailEditComponent } from './residual-heat-detail/edit/edit.component';
import { PlateHeatDetailComponent } from './plate-heat-detail/plate-heat-detail.component';
import { PlateHeatDetailViewComponent } from './plate-heat-detail/view/view.component';
import { PlateHeatDetailEditComponent } from './plate-heat-detail/edit/edit.component';
import { NuclearDetailComponent } from './nuclear-detail/nuclear-detail.component';
import { NuclearDetailViewComponent } from './nuclear-detail/view/view.component';
import { NuclearDetailEditComponent } from './nuclear-detail/edit/edit.component';

const COMPONENTS = [
  DeviceBatteryDetailComponent,
  DeviceWindGeneratorDetailComponent
,
  DeviceTurbineDetailComponent,
  DevicePhotovoltaicDetailComponent,
  DeviceGeneratorDetailComponent];
const COMPONENTS_NOROUNT = [
  DeviceBatteryDetailViewComponent,
  DeviceBatteryDetailEditComponent,
  DeviceWindGeneratorDetailViewComponent,
  DeviceWindGeneratorDetailEditComponent,
  DeviceTurbineDetailViewComponent,
  DeviceTurbineDetailEditComponent,
  DevicePhotovoltaicDetailViewComponent,
  DevicePhotovoltaicDetailEditComponent,
  DeviceGeneratorDetailViewComponent,
  DeviceGeneratorDetailEditComponent,
  GasTurbineDetailComponent,
  GasTurbineDetailViewComponent,
  GasTurbineDetailEditComponent,
  GasEngineDetailComponent,
  GasEngineDetailViewComponent,
  GasEngineDetailEditComponent,
  ElectricBoilerDetailComponent,
  ElectricBoilerDetailViewComponent,
  ElectricBoilerDetailEditComponent,
  GasBoilerDetailComponent,
  GasBoilerDetailViewComponent,
  GasBoilerDetailEditComponent,
  GasSteamDetailComponent,
  GasSteamDetailViewComponent,
  GasSteamDetailEditComponent,
  HeatPumpDetailComponent,
  HeatPumpDetailViewComponent,
  HeatPumpDetailEditComponent,
  ScrollDetailComponent,
  ScrollDetailViewComponent,
  ScrollDetailEditComponent,
  ScrewDetailComponent,
  ScrewDetailViewComponent,
  ScrewDetailEditComponent,
  CentrifugalDetailComponent,
  CentrifugalDetailViewComponent,
  CentrifugalDetailEditComponent,
  LithiumBromideDetailComponent,
  LithiumBromideDetailViewComponent,
  LithiumBromideDetailEditComponent,
  DirectFiredLithiumBromideDetailComponent,
  DirectFiredLithiumBromideDetailViewComponent,
  DirectFiredLithiumBromideDetailEditComponent,
  HostDetailComponent,
  HostDetailViewComponent,
  HostDetailEditComponent,
  HeatStorageDetailComponent,
  HeatStorageDetailViewComponent,
  HeatStorageDetailEditComponent,
  IceStorageDetailComponent,
  IceStorageDetailViewComponent,
  IceStorageDetailEditComponent,
  ResidualHeatDetailComponent,
  ResidualHeatDetailViewComponent,
  ResidualHeatDetailEditComponent,
  PlateHeatDetailComponent,
  PlateHeatDetailViewComponent,
  PlateHeatDetailEditComponent,
  NuclearDetailComponent,
  NuclearDetailViewComponent,
  NuclearDetailEditComponent,



];

@NgModule({
    imports: [
        SharedModule,
        DeviceRoutingModule,
        ViserModule
    ],
    declarations: [
        ...COMPONENTS,
        ...COMPONENTS_NOROUNT
    ],
    exports: [
        DeviceBatteryDetailComponent
    ],
    entryComponents: COMPONENTS_NOROUNT
})
export class DeviceModule { }
