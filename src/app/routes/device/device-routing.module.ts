import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "../../user-service/login-guard.service";
import { BatteryDetailComponent } from './battery-detail/battery-detail.component';
import { HydroTurbineDetailComponent } from './hydro-turbine-detail/hydro-turbine-detail.component';
import { PhotovoltaicDetailComponent } from './photovoltaic-detail/photovoltaic-detail.component';
import { DieselDetailComponent } from './diesel-detail/diesel-detail.component';
import {GasTurbineDetailComponent} from "./gas-turbine-detail/gas-turbine-detail.component";
import {InternalGasTurbineDetailComponent} from "./internal-gas-turbine-detail/internal-gas-turbine-detail.component";
import {ElecBoilerDetailComponent} from "./elec-boiler-detail/elec-boiler-detail.component";
import {GasBoilerDetailComponent} from "./gas-boiler-detail/gas-boiler-detail.component";
import {GasSteamBoilerDetailComponent} from "./gas-steam-boiler-detail/gas-steam-boiler-detail.component";
import {ElectricitychillerDetailComponent} from "./electricitychiller-detail/electricitychiller-detail.component";
import {CentrifugalElectricitychillerDetailComponent} from "./centrifugal-electricitychiller-detail/centrifugal-electricitychiller-detail.component";
import {AbschilleDetailComponent} from "./abschille-detail/abschille-detail.component";
import {GasAbschilleDetailComponent} from "./gas-abschille-detail/gas-abschille-detail.component";
import {ElecairconditionDetailComponent} from "./elecaircondition-detail/elecaircondition-detail.component";
import {HeatStorageDetailComponent} from "./heat-storage-detail/heat-storage-detail.component";
import {CoolStorageDetailComponent} from "./cool-storage-detail/cool-storage-detail.component";
import {HeatExchangerDetailComponent} from "./heat-exchanger-detail/heat-exchanger-detail.component";
import {NuclearPowerDetailComponent} from "./nuclear-power-detail/nuclear-power-detail.component";
import {PumpDetailComponent} from "./pump-detail/pump-detail.component";
import {ScrewElectricitychillerDetailComponent} from "./screw-electricitychiller-detail/screw-electricitychiller-detail.component";
import {WasteHeatBoilerDetailComponent} from "./waste-heat-boiler-detail/waste-heat-boiler-detail.component";
import {WindTurbineDetailComponent} from "./wind-turbine-detail/wind-turbine-detail.component";

const routes: Routes = [
  { path: 'abschilleDetail', component: AbschilleDetailComponent ,canActivate:[AuthGuard]},
  { path: 'batteryDetail', component: BatteryDetailComponent ,canActivate:[AuthGuard]},
  { path: 'centrifugalElectricitychillerDetail', component: CentrifugalElectricitychillerDetailComponent ,canActivate:[AuthGuard]},
  { path: 'coolStorageDetail', component: CoolStorageDetailComponent ,canActivate:[AuthGuard]},
  { path: 'dieselDetail', component: DieselDetailComponent ,canActivate:[AuthGuard]},
  { path: 'elecairconditionDetail', component: ElecairconditionDetailComponent ,canActivate:[AuthGuard]},
  { path: 'elecBoilerDetail', component: ElecBoilerDetailComponent ,canActivate:[AuthGuard]},
  { path: 'electricitychillerDetail', component: ElectricitychillerDetailComponent ,canActivate:[AuthGuard]},
  { path: 'gasAbschilleDetail', component: GasAbschilleDetailComponent ,canActivate:[AuthGuard]},
  { path: 'gasBoilerDetail', component: GasBoilerDetailComponent ,canActivate:[AuthGuard]},
  { path: 'gasSteamBoilerDetail', component: GasSteamBoilerDetailComponent ,canActivate:[AuthGuard]},
  { path: 'gasTurbineDetail', component: GasTurbineDetailComponent ,canActivate:[AuthGuard]},
  { path: 'heatexchangerDetail', component: HeatExchangerDetailComponent ,canActivate:[AuthGuard]},
  { path: 'heatStorageDetail', component: HeatStorageDetailComponent ,canActivate:[AuthGuard]},
  { path: 'hydroTurbineDetail', component: HydroTurbineDetailComponent ,canActivate:[AuthGuard]},
  { path: 'internalGasturbineDetail', component: InternalGasTurbineDetailComponent ,canActivate:[AuthGuard]},
  { path: 'nuclearPowerDetail', component: NuclearPowerDetailComponent ,canActivate:[AuthGuard]},
  { path: 'photovoltaicDetail', component: PhotovoltaicDetailComponent ,canActivate:[AuthGuard]},

  { path: 'pumpDetail', component: PumpDetailComponent ,canActivate:[AuthGuard]},
  { path: 'screwElectricitychillerDetail', component: ScrewElectricitychillerDetailComponent ,canActivate:[AuthGuard]},
  { path: 'wasteHeatBoilerDetail', component: WasteHeatBoilerDetailComponent ,canActivate:[AuthGuard]},
  { path: 'windTurbineDetail', component:  WindTurbineDetailComponent ,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceRoutingModule { }
