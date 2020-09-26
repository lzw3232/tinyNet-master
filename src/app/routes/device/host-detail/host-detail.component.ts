import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {_HttpClient, MenuService, ModalHelper} from '@delon/theme';
import {STChange, STColumn, STComponent, STPage} from '@delon/abc';
import { SFSchema } from '@delon/form';
import {HostDetailViewComponent} from './view/view.component';
import {HostDetailEditComponent} from './edit/edit.component'
import {DevicesService} from "../../../user-service/devicesService";
import {NzMessageService, NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-device-host-detail',
  templateUrl: './host-detail.component.html',
})
export class HostDetailComponent implements OnInit {


  constructor(private http: _HttpClient,
              private modal: ModalHelper,
              private msgSrv: NzMessageService,
              private devicesService: DevicesService,
              private modalService: NzModalService,
  ) {
  }

  ngOnInit() {
  }



}
