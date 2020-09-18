import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NetworkDesignComponent } from './design/design.component';
import { NetworkGenerateProjectComponent } from './generate-project/generate-project.component';
import { NetworkSelectComponent } from './select/select.component';
import { NetworkControlComponent } from './control/control.component';
import { NetworkResultComponent } from './result/result.component';
import { NetworkProjectDetailsComponent } from './project-details/project-details.component';

const routes: Routes = [

  { path: 'projects', component: NetworkProjectDetailsComponent },
  { path: 'generateProject', component: NetworkGenerateProjectComponent },
  { path: 'select', component: NetworkSelectComponent },
  { path: 'control', component: NetworkControlComponent },
  { path: 'result', component: NetworkResultComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkRoutingModule { }
