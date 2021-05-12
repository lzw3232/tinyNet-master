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
import { NetworkSelectDieselComponent } from './select/diesel/diesel.component';
import { NetworkSelectCentrifugalElectricitychillerComponent } from './select/centrifugal-electricitychiller/centrifugal-electricitychiller.component';
import {NetworkSelectGasAbschilleComponent} from './select/gas-abschille/gas-abschille.component';
import {NetworkSelectElecBoilerComponent} from './select/elec-boiler/elec-boiler.component';
import {NetworkSelectGasBoilerComponent} from './select/gas-boiler/gas-boiler.component';
import { NetworkSelectGasSteamBoilerComponent } from './select/gas-steam-boiler/gas-steam-boiler.component';
import {NetworkSelectGasTurbineComponent} from './select/gas-turbine/gas-turbine.component';
import { NetworkSelectElecairconditionComponent } from './select/elecaircondition/elecaircondition.component';
import { NetworkSelectCoolStorageComponent } from './select/cool-storage/cool-storage.component';
import { NetworkSelectAbschilleComponent } from './select/abschille/abschille.component';

import { NetworkSelectHeatExchangerComponent } from './select/heat-exchanger/heat-exchanger.component';
import { NetworkSelectHeatStorageComponent } from './select/heat-storage/heat-storage.component';
import { NetworkSelectHydroTurbineComponent } from './select/hydro-turbine/hydro-turbine.component';
import { NetworkSelectInternalGasTurbineComponent } from './select/internal-gas-turbine/internal-gas-turbine.component';
import { NetworkSelectNuclearPowerComponent } from './select/nuclear-power/nuclear-power.component';
import { NetworkSelectPhotovoltaicComponent } from './select/photovoltaic/photovoltaic.component';
import { NetworkSelectPumpComponent } from './select/pump/pump.component';
import { NetworkSelectScrewElectricitychillerComponent } from './select/screw-electricitychiller/screw-electricitychiller.component';
import { NetworkSelectWasteHeatBoilerComponent } from './select/waste-heat-boiler/waste-heat-boiler.component';
import { NetworkSelectWindTurbineComponent } from './select/wind-turbine/wind-turbine.component';
import {  NetworkSelectElectricitychillerComponent  } from './select/electricitychiller/electricitychiller.component';


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
  NetworkSelectHeatExchangerComponent,
  NetworkSelectHydroTurbineComponent,
  NetworkSelectPhotovoltaicComponent,
  NetworkSelectDieselComponent,
  NetworkProjectDetailsCardComponent,
  NetworkSelectCentrifugalElectricitychillerComponent,
  NetworkSelectGasAbschilleComponent,
  NetworkSelectElecBoilerComponent,
  NetworkSelectGasBoilerComponent,
  NetworkSelectInternalGasTurbineComponent,
  NetworkSelectGasSteamBoilerComponent,
  NetworkSelectGasTurbineComponent,
  NetworkSelectNuclearPowerComponent,
  NetworkSelectHeatStorageComponent,
  NetworkSelectElecairconditionComponent,
  NetworkSelectCoolStorageComponent,
  NetworkSelectAbschilleComponent,
  NetworkSelectPumpComponent,
  NetworkSelectScrewElectricitychillerComponent,
  NetworkSelectWasteHeatBoilerComponent,
  NetworkSelectWindTurbineComponent,
  NetworkSelectElectricitychillerComponent,
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
