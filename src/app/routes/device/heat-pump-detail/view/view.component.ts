import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {STChange} from "@delon/abc";
import {DevicesService} from "../../../../user-service/devicesService";

const DataSet = require('@antv/data-set');

@Component({
  selector: 'app-device-heat-pump-detail-view',
  templateUrl: './view.component.html',
})
export class HeatPumpDetailViewComponent implements OnInit {

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private devicesService: DevicesService,
  ) { }

  ngOnInit(): void {

  }

}
