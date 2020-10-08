import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NetworkRoutingModule } from './network-routing.module';
import { NetworkDesignComponent } from './design/design.component';
import { NetworkGenerateProjectComponent } from './generate-project/generate-project.component';
import { NetworkSelectComponent } from './select/select.component';
import { NetworkControlComponent } from './control/control.component';
import { NetworkResultComponent } from './result/result.component';
import { ViserModule } from 'viser-ng';
import { NetworkSelectBatteryLinechartComponent } from './select/battery/battery-linechart.component'; // 导入 viser 模块
import { G2BarModule} from '@delon/chart';
import { NetworkProjectDetailsComponent } from './project-details/project-details.component';
import {NetworkProjectDetailsCardComponent} from "./project-details/project-details-card.component";
// import {BatteryLinehartHostDirective} from "./select/view/battery-linechart-host.directive";

import { NetworkSelectBatteryComponent } from './select/battery/battery.component';
import { NetworkSelectTurbineComponent } from './select/turbine/turbine.component';
import { NetworkSelectWindTurbinesComponent } from './select/wind-turbines/wind-turbines.component';
import { NetworkSelectPhotovoltaicComponent } from './select/photovoltaic/photovoltaic.component';
import { NetworkSelectGeneratorComponent } from './select/generator/generator.component';
import { NetworkSelectCentrifugalComponent } from './select/centrifugal/centrifugal.component';
import {NetworkSelectDirectFiredLithiumBromideComponent} from './select/direct-fired-lithium-bromide/direct-fired-lithium-bromide.component';
import {NetworkSelectElectricBoilerComponent} from './select/electric-boiler/electric-boiler.component';
import {NetworkSelectGasBoilerComponent} from './select/gas-boiler/gas-boiler.component';
import {NetworkSelectGasEngineComponent} from './select/gas-engine/gas-engine.component';
import { NetworkSelectGasSteamComponent } from './select/gas-steam/gas-steam.component';
import {NetworkSelectGasTurbineComponent} from './select/gas-turbine/gas-turbine.component';
import { NetworkSelectHeatPumpComponent } from './select/heat-pump/heat-pump.component';
import { NetworkSelectHeatStorageComponent } from './select/heat-storage/heat-storage.component';
import { NetworkSelectHostComponent } from './select/host/host.component';
import { NetworkSelectIceStorageComponent } from './select/ice-storage/ice-storage.component';
import { NetworkSelectLithiumBromideComponent } from './select/lithium-bromide/lithium-bromide.component';
import { NetworkSelectNuclearComponent } from './select/nuclear/nuclear.component';
import { NetworkSelectPlateHeatComponent } from './select/plate-heat/plate-heat.component';
import { NetworkSelectResidualHeatComponent } from './select/residual-heat/residual-heat.component';
import { NetworkSelectScrewComponent } from './select/screw/screw.component';
import { NetworkSelectScrollComponent } from './select/scroll/scroll.component';


const COMPONENTS = [
  NetworkDesignComponent,
  NetworkGenerateProjectComponent,
  NetworkSelectComponent,
  NetworkControlComponent,
  NetworkResultComponent,
  // BatteryLinehartHostDirective,
  NetworkProjectDetailsComponent];
const COMPONENTS_NOROUNT = [
  NetworkSelectBatteryComponent,
  // NetworkSelectBatteryLinechartComponent,
  NetworkSelectTurbineComponent,
  NetworkSelectWindTurbinesComponent,
  NetworkSelectPhotovoltaicComponent,
  NetworkSelectGeneratorComponent,
  NetworkProjectDetailsCardComponent,
  NetworkSelectCentrifugalComponent,
  NetworkSelectDirectFiredLithiumBromideComponent,
  NetworkSelectElectricBoilerComponent,
  NetworkSelectGasBoilerComponent,
  NetworkSelectGasEngineComponent,
  NetworkSelectGasSteamComponent,
  NetworkSelectGasTurbineComponent,
  NetworkSelectHeatPumpComponent,
  NetworkSelectHeatStorageComponent,
  NetworkSelectHostComponent,
  NetworkSelectIceStorageComponent,
  NetworkSelectLithiumBromideComponent,
  NetworkSelectNuclearComponent,
  NetworkSelectPlateHeatComponent,
  NetworkSelectResidualHeatComponent,
  NetworkSelectScrewComponent,
  NetworkSelectScrollComponent,
];

@NgModule({
  imports: [
    SharedModule,
    NetworkRoutingModule,
    ViserModule,
    G2BarModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class NetworkModule { }
