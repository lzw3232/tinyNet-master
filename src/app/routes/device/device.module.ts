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
  DeviceGeneratorDetailEditComponent];

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
