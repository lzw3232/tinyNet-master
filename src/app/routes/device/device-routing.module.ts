import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceBatteryDetailComponent } from './battery-detail/battery-detail.component';
import { DeviceWindGeneratorDetailComponent } from './wind-generator-detail/wind-generator-detail.component';
import { DeviceTurbineDetailComponent } from './turbine-detail/turbine-detail.component';
import { DevicePhotovoltaicDetailComponent } from './photovoltaic-detail/photovoltaic-detail.component';
import { DeviceGeneratorDetailComponent } from './generator-detail/generator-detail.component';
import {AuthGuard} from "../../user-service/login-guard.service";

const routes: Routes = [
  { path: 'batteryDetail', component: DeviceBatteryDetailComponent ,canActivate:[AuthGuard]},
  { path: 'windGeneratorDetail', component: DeviceWindGeneratorDetailComponent ,canActivate:[AuthGuard]},
  { path: 'turbineDetail', component: DeviceTurbineDetailComponent ,canActivate:[AuthGuard]},
  { path: 'photovoltaicDetail', component: DevicePhotovoltaicDetailComponent ,canActivate:[AuthGuard]},
  { path: 'generatorDetail', component: DeviceGeneratorDetailComponent ,canActivate:[AuthGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceRoutingModule { }
