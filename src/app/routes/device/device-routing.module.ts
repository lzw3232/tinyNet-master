import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "../../user-service/login-guard.service";
import { DeviceBatteryDetailComponent } from './battery-detail/battery-detail.component';
import { DeviceWindGeneratorDetailComponent } from './wind-generator-detail/wind-generator-detail.component';
import { DeviceTurbineDetailComponent } from './turbine-detail/turbine-detail.component';
import { DevicePhotovoltaicDetailComponent } from './photovoltaic-detail/photovoltaic-detail.component';
import { DeviceGeneratorDetailComponent } from './generator-detail/generator-detail.component';
import {GasTurbineDetailComponent} from "./gas-turbine-detail/gas-turbine-detail.component";
import {GasEngineDetailComponent} from "./gas-engine-detail/gas-engine-detail.component";
import {ElectricBoilerDetailComponent} from "./electric-boiler-detail/electric-boiler-detail.component";
import {GasBoilerDetailComponent} from "./gas-boiler-detail/gas-boiler-detail.component";
import {GasSteamDetailComponent} from "./gas-steam-detail/gas-steam-detail.component";
import {HeatPumpDetailComponent} from "./heat-pump-detail/heat-pump-detail.component";
import {ScrollDetailComponent} from "./scroll-detail/scroll-detail.component";
import {ScrewDetailComponent} from "./screw-detail/screw-detail.component";
import {CentrifugalDetailComponent} from "./centrifugal-detail/centrifugal-detail.component";
import {LithiumBromideDetailComponent} from "./lithium-bromide-detail/lithium-bromide-detail.component";
import {DirectFiredLithiumBromideDetailComponent} from "./direct-fired-lithium-bromide-detail/direct-fired-lithium-bromide-detail.component";
import {HostDetailComponent} from "./host-detail/host-detail.component";
import {HeatStorageDetailComponent} from "./heat-storage-detail/heat-storage-detail.component";
import {IceStorageDetailComponent} from "./ice-storage-detail/ice-storage-detail.component";
import {ResidualHeatDetailComponent} from "./residual-heat-detail/residual-heat-detail.component";
import {PlateHeatDetailComponent} from "./plate-heat-detail/plate-heat-detail.component";
import {NuclearDetailComponent} from "./nuclear-detail/nuclear-detail.component";

const routes: Routes = [
  { path: 'batteryDetail', component: DeviceBatteryDetailComponent ,canActivate:[AuthGuard]},
  { path: 'windGeneratorDetail', component: DeviceWindGeneratorDetailComponent ,canActivate:[AuthGuard]},
  { path: 'turbineDetail', component: DeviceTurbineDetailComponent ,canActivate:[AuthGuard]},
  { path: 'photovoltaicDetail', component: DevicePhotovoltaicDetailComponent ,canActivate:[AuthGuard]},
  { path: 'generatorDetail', component: DeviceGeneratorDetailComponent ,canActivate:[AuthGuard]},
  { path: 'gasTurbineDetail', component: GasTurbineDetailComponent ,canActivate:[AuthGuard]},
  { path: 'GasEngineDetail', component: GasEngineDetailComponent ,canActivate:[AuthGuard]},
  { path: 'electricBoilerDetail', component: ElectricBoilerDetailComponent ,canActivate:[AuthGuard]},
  { path: 'gasBoilerDetail', component: GasBoilerDetailComponent ,canActivate:[AuthGuard]},
  { path: 'gasSteamDetail', component: GasSteamDetailComponent ,canActivate:[AuthGuard]},
  { path: 'heatPumpDetail', component: HeatPumpDetailComponent ,canActivate:[AuthGuard]},
  { path: 'scrollDetail', component: ScrollDetailComponent ,canActivate:[AuthGuard]},
  { path: 'screwDetail', component: ScrewDetailComponent ,canActivate:[AuthGuard]},
  { path: 'centrifugalDetail', component: CentrifugalDetailComponent ,canActivate:[AuthGuard]},
  { path: 'lithiumBromideDetail', component: LithiumBromideDetailComponent ,canActivate:[AuthGuard]},
  { path: 'DirectFiredLithiumBromideDetail', component: DirectFiredLithiumBromideDetailComponent ,canActivate:[AuthGuard]},
  { path: 'hostDetail', component: HostDetailComponent ,canActivate:[AuthGuard]},
  { path: 'heatStorageDetail', component: HeatStorageDetailComponent ,canActivate:[AuthGuard]},
  { path: 'iceStorageDetail', component: IceStorageDetailComponent ,canActivate:[AuthGuard]},
  { path: 'residualHeatDetail', component: ResidualHeatDetailComponent ,canActivate:[AuthGuard]},
  { path: 'plateHeatDetail', component: PlateHeatDetailComponent ,canActivate:[AuthGuard]},
  { path: 'nuclearDetail', component: NuclearDetailComponent ,canActivate:[AuthGuard]},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceRoutingModule { }
