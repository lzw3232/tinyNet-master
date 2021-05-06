import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DeviceRoutingModule } from './device-routing.module';
import { BatteryDetailComponent } from './battery-detail/battery-detail.component';
import { BatteryDetailViewComponent } from './battery-detail/view/view.component';
import { BatteryDetailEditComponent } from './battery-detail/edit/edit.component';
import { ViserModule } from 'viser-ng';
import { HydroTurbineDetailComponent } from './hydro-turbine-detail/hydro-turbine-detail.component';
import { HydroTurbineDetailViewComponent } from './hydro-turbine-detail/view/view.component';
import { HydroTurbineDetailEditComponent } from './hydro-turbine-detail/edit/edit.component';
import { PhotovoltaicDetailComponent } from './photovoltaic-detail/photovoltaic-detail.component';
import { PhotovoltaicDetailViewComponent } from './photovoltaic-detail/view/view.component';
import { PhotovoltaicDetailEditComponent } from './photovoltaic-detail/edit/edit.component';
import { DieselDetailComponent } from './diesel-detail/diesel-detail.component';
import { DieselDetailViewComponent } from './diesel-detail/view/view.component';
import { DieselDetailEditComponent } from './diesel-detail/edit/edit.component';
import { GasTurbineDetailComponent } from './gas-turbine-detail/gas-turbine-detail.component';
import { GasTurbineDetailViewComponent } from './gas-turbine-detail/view/view.component';
import { GasTurbineDetailEditComponent } from './gas-turbine-detail/edit/edit.component';
import { InternalGasTurbineDetailComponent } from './internal-gas-turbine-detail/internal-gas-turbine-detail.component';
import { InternalGasTurbineDetailViewComponent } from './internal-gas-turbine-detail/view/view.component';
import { InternalGasTurbineDetailEditComponent } from './internal-gas-turbine-detail/edit/edit.component';
import { ElecBoilerDetailComponent } from './elec-boiler-detail/elec-boiler-detail.component';
import { ElecBoilerDetailViewComponent } from './elec-boiler-detail/view/view.component';
import { ElecBoilerDetailEditComponent } from './elec-boiler-detail/edit/edit.component';
import { GasBoilerDetailComponent } from './gas-boiler-detail/gas-boiler-detail.component';
import { GasBoilerDetailViewComponent } from './gas-boiler-detail/view/view.component';
import { GasBoilerDetailEditComponent } from './gas-boiler-detail/edit/edit.component';
import { GasSteamBoilerDetailComponent } from './gas-steam-boiler-detail/gas-steam-boiler-detail.component';
import { GasSteamBoilerDetailViewComponent } from './gas-steam-boiler-detail/view/view.component';
import { GasSteamBoilerDetailEditComponent } from './gas-steam-boiler-detail/edit/edit.component';
import { ElectricitychillerDetailComponent } from './electricitychiller-detail/electricitychiller-detail.component';
import { ElectricitychillerDetailViewComponent } from './electricitychiller-detail/view/view.component';
import { ElectricitychillerDetailEditComponent } from './electricitychiller-detail/edit/edit.component';
import { CentrifugalElectricitychillerDetailComponent } from './centrifugal-electricitychiller-detail/centrifugal-electricitychiller-detail.component';
import { CentrifugalElectricitychillerDetailViewComponent } from './centrifugal-electricitychiller-detail/view/view.component';
import { CentrifugalElectricitychillerDetailEditComponent } from './centrifugal-electricitychiller-detail/edit/edit.component';
import { AbschilleDetailComponent } from './abschille-detail/abschille-detail.component';
import { AbschilleDetailViewComponent } from './abschille-detail/view/view.component';
import { AbschilleDetailEditComponent } from './abschille-detail/edit/edit.component';
import { GasAbschilleDetailComponent } from './gas-abschille-detail/gas-abschille-detail.component';
import { GasAbschilleDetailViewComponent } from './gas-abschille-detail/view/view.component';
import { GasAbschilleDetailEditComponent } from './gas-abschille-detail/edit/edit.component';
import { ElecairconditionDetailComponent } from './elecaircondition-detail/elecaircondition-detail.component';
import { ElecairconditionDetailViewComponent } from './elecaircondition-detail/view/view.component';
import { ElecairconditionDetailEditComponent } from './elecaircondition-detail/edit/edit.component';
import { HeatStorageDetailComponent } from './heat-storage-detail/heat-storage-detail.component';
import { HeatStorageDetailViewComponent } from './heat-storage-detail/view/view.component';
import { HeatStorageDetailEditComponent } from './heat-storage-detail/edit/edit.component';
import { CoolStorageDetailComponent } from './cool-storage-detail/cool-storage-detail.component';
import { CoolStorageDetailViewComponent } from './cool-storage-detail/view/view.component';
import { CoolStorageDetailEditComponent } from './cool-storage-detail/edit/edit.component';
import { HeatExchangerDetailComponent } from './heat-exchanger-detail/heat-exchanger-detail.component';
import { HeatExchangerDetailViewComponent } from './heat-exchanger-detail/view/view.component';
import { HeatExchangerDetailEditComponent } from './heat-exchanger-detail/edit/edit.component';
import { NuclearPowerDetailComponent } from './nuclear-power-detail/nuclear-power-detail.component';
import { NuclearPowerDetailViewComponent } from './nuclear-power-detail/view/view.component';
import { NuclearPowerDetailEditComponent } from './nuclear-power-detail/edit/edit.component';
import {WasteHeatBoilerDetailComponent} from "./waste-heat-boiler-detail/waste-heat-boiler-detail.component";
import {WasteHeatBoilerDetailViewComponent} from "./waste-heat-boiler-detail/view/view.component";
import {WasteHeatBoilerDetailEditComponent} from "./waste-heat-boiler-detail/edit/edit.component";
import {PumpDetailViewComponent} from "./pump-detail/view/view.component";
import {PumpDetailEditComponent} from "./pump-detail/edit/edit.component";
import {PumpDetailComponent} from "./pump-detail/pump-detail.component";
import {ScrewElectricitychillerDetailViewComponent} from "./screw-electricitychiller-detail/view/view.component";
import {ScrewElectricitychillerDetailEditComponent} from "./screw-electricitychiller-detail/edit/edit.component";
import {ScrewElectricitychillerDetailComponent} from "./screw-electricitychiller-detail/screw-electricitychiller-detail.component";
import {WindTurbineDetailViewComponent} from "./wind-turbine-detail/view/view.component";
import {WindTurbineDetailEditComponent} from "./wind-turbine-detail/edit/edit.component";
import {WindTurbineDetailComponent} from "./wind-turbine-detail/wind-turbine-detail.component";

const COMPONENTS = [
  AbschilleDetailComponent,
  BatteryDetailComponent,
  CentrifugalElectricitychillerDetailComponent,
  CoolStorageDetailComponent,
  DieselDetailComponent,
  ElecairconditionDetailComponent,
  ElecBoilerDetailComponent,
  ElectricitychillerDetailComponent,
  GasAbschilleDetailComponent,
  GasBoilerDetailComponent,
  GasSteamBoilerDetailComponent,
  GasTurbineDetailComponent,
  HeatExchangerDetailComponent,
  HeatStorageDetailComponent,
  HydroTurbineDetailComponent,
  InternalGasTurbineDetailComponent,
  NuclearPowerDetailComponent,
  PhotovoltaicDetailComponent,
  PumpDetailComponent,
  ScrewElectricitychillerDetailComponent,
  WasteHeatBoilerDetailComponent,
  WindTurbineDetailComponent,

];

const COMPONENTS_NOROUNT = [
  AbschilleDetailEditComponent,
  AbschilleDetailViewComponent,
  BatteryDetailViewComponent,
  BatteryDetailEditComponent,
  CentrifugalElectricitychillerDetailViewComponent,
  CentrifugalElectricitychillerDetailEditComponent,
  CoolStorageDetailViewComponent,
  CoolStorageDetailEditComponent,
  DieselDetailViewComponent,
  DieselDetailEditComponent,
  ElecairconditionDetailViewComponent,
  ElecairconditionDetailEditComponent,
  ElecBoilerDetailViewComponent,
  ElecBoilerDetailEditComponent,
  ElectricitychillerDetailViewComponent,
  ElectricitychillerDetailEditComponent,
  GasAbschilleDetailViewComponent,
  GasAbschilleDetailEditComponent,
  GasBoilerDetailViewComponent,
  GasBoilerDetailEditComponent,
  GasSteamBoilerDetailViewComponent,
  GasSteamBoilerDetailEditComponent,
  GasTurbineDetailViewComponent,
  GasTurbineDetailEditComponent,
  HeatExchangerDetailViewComponent,
  HeatExchangerDetailEditComponent,
  HeatStorageDetailViewComponent,
  HeatStorageDetailEditComponent,
  HydroTurbineDetailViewComponent,
  HydroTurbineDetailEditComponent,
  InternalGasTurbineDetailViewComponent,
  InternalGasTurbineDetailEditComponent,
  NuclearPowerDetailViewComponent,
  NuclearPowerDetailEditComponent,
  PhotovoltaicDetailViewComponent,
  PhotovoltaicDetailEditComponent,
  PumpDetailViewComponent,
  PumpDetailEditComponent,
  ScrewElectricitychillerDetailViewComponent,
  ScrewElectricitychillerDetailEditComponent,
  WasteHeatBoilerDetailViewComponent,
  WasteHeatBoilerDetailEditComponent,
  WindTurbineDetailViewComponent,
  WindTurbineDetailEditComponent,

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
    ],
    entryComponents: COMPONENTS_NOROUNT
})
export class DeviceModule { }
