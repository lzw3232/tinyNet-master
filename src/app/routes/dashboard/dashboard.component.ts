import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ReuseTabService } from '@delon/abc';
import {Router} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(
    private http: _HttpClient,
    private reuseTabService: ReuseTabService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.reuseTabService.closable = false;
    this.reuseTabService.title = '工作台';
  }


  _onReuseInit() {
    console.log('_onReuseInit');
  }
  _onReuseDestroy() {
    console.log('_onReuseDestroy');
  }

  clickToDevice(deviceName: string) {
    switch (deviceName) {
      case 'battery':
        this.router.navigateByUrl('/device/batteryDetail');
        break;
      case 'wind-turbine':
        this.router.navigateByUrl('/device/windGeneratorDetail');
        break;
      case 'turbine':
        this.router.navigateByUrl('/device/turbineDetail');
        break;
      case 'photovoltaic':
        this.router.navigateByUrl('/device/photovoltaicDetail');
        break;
      case 'generator':
        this.router.navigateByUrl('/device/generatorDetail');
        break;
      default:
        break;
    }
  }


}
