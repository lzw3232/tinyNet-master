import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NetworkRoutingModule } from './network-routing.module';
import { NetworkDesignComponent } from './design/design.component';
import { NetworkGenerateProjectComponent } from './generate-project/generate-project.component';
import { NetworkSelectComponent } from './select/select.component';
import { NetworkSelectBatteryViewComponent } from './select/view/battery-view.component';
import { NetworkControlComponent } from './control/control.component';
import { NetworkResultComponent } from './result/result.component';
import { ViserModule } from 'viser-ng';
import { NetworkSelectBatteryLinechartComponent } from './select/view/battery-linechart.component'; // 导入 viser 模块
import { G2BarModule} from '@delon/chart';
import { NetworkSelectTurbineComponent } from './select/turbine/turbine.component';
import { NetworkSelectWindTurbineComponent } from './select/wind-turbine/wind-turbine.component';
import { NetworkSelectPhotovoltaicComponent } from './select/photovoltaic/photovoltaic.component';
import { NetworkSelectGeneratorComponent } from './select/generator/generator.component';
import { NetworkProjectDetailsComponent } from './project-details/project-details.component';
import {NetworkProjectDetailsCardComponent} from "./project-details/project-details-card.component";
import {DeviceModule} from "../device/device.module";
// import {BatteryLinehartHostDirective} from "./select/view/battery-linechart-host.directive";

const COMPONENTS = [
  NetworkDesignComponent,
  NetworkGenerateProjectComponent,
  NetworkSelectComponent,
  NetworkControlComponent,
  NetworkResultComponent,
  // BatteryLinehartHostDirective,
  NetworkProjectDetailsComponent];
const COMPONENTS_NOROUNT = [
  NetworkSelectBatteryViewComponent,
  // NetworkSelectBatteryLinechartComponent,
  NetworkSelectTurbineComponent,
  NetworkSelectWindTurbineComponent,
  NetworkSelectPhotovoltaicComponent,
  NetworkSelectGeneratorComponent,
  NetworkProjectDetailsCardComponent];

@NgModule({
  imports: [
    SharedModule,
    NetworkRoutingModule,
    ViserModule,
    G2BarModule,
    DeviceModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class NetworkModule { }
