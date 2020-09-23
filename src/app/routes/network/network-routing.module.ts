import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NetworkDesignComponent } from './design/design.component';
import { NetworkGenerateProjectComponent } from './generate-project/generate-project.component';
import { NetworkSelectComponent } from './select/select.component';
import { NetworkControlComponent } from './control/control.component';
import { NetworkResultComponent } from './result/result.component';
import { NetworkProjectDetailsComponent } from './project-details/project-details.component';
import {AuthGuard} from "../../user-service/login-guard.service";

const routes: Routes = [

  { path: 'projects', component: NetworkProjectDetailsComponent ,canActivate:[AuthGuard]},
  { path: 'generateProject', component: NetworkGenerateProjectComponent ,canActivate:[AuthGuard]},
  { path: 'select', component: NetworkSelectComponent ,canActivate:[AuthGuard]},
  { path: 'control', component: NetworkControlComponent ,canActivate:[AuthGuard]},
  { path: 'result', component: NetworkResultComponent ,canActivate:[AuthGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkRoutingModule { }
