import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceBatteryDetailComponent } from './battery-detail/battery-detail.component';
import { DeviceWindGeneratorDetailComponent } from './wind-generator-detail/wind-generator-detail.component';
import { DeviceTurbineDetailComponent } from './turbine-detail/turbine-detail.component';
import { DevicePhotovoltaicDetailComponent } from './photovoltaic-detail/photovoltaic-detail.component';
import { DeviceGeneratorDetailComponent } from './generator-detail/generator-detail.component';

const routes: Routes = [
  { path: 'batteryDetail', component: DeviceBatteryDetailComponent },
  { path: 'windGeneratorDetail', component: DeviceWindGeneratorDetailComponent },
  { path: 'turbineDetail', component: DeviceTurbineDetailComponent },
  { path: 'photovoltaicDetail', component: DevicePhotovoltaicDetailComponent },
  { path: 'generatorDetail', component: DeviceGeneratorDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceRoutingModule { }
