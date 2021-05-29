import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {NzModalRef, NzMessageService, NzTableComponent} from 'ng-zorro-antd';
import {_HttpClient} from '@delon/theme';
import {STChange, STColumn, STData, STPage} from '@delon/abc';
import {SFSchema} from "@delon/form";
import {DevicesService} from "../../../../user-service/devicesService";

const DataSet = require('@antv/data-set');

@Component({
  selector: 'app-network-select-elec',
  templateUrl: './elec.component.html',
  styleUrls: ['./elec.component.css']
})

export class NetworkSelectElecComponent implements OnInit, AfterViewInit {

  @Input() public title;
  @Input() public result;
  forceFit = true; // 宽度自适应
  height = 400;
  data: any;

  chart_title_a = {text: '时间', textStyle: {fill: '#515151'}};
  chart_title_b = {text: '负荷', textStyle: {fill: '#515151'}};
  style = {stroke: '#fff', lineWidth: 1};



  result_data = {
    load : [],
    growth: "0",
  }

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    private el: ElementRef,
    private devicesService: DevicesService,
  ) {
  }

  ngOnInit(): void {
    console.log(this.result)
    this.result_data = this.result;
    for (let i = 0; i < 24; i++) {
      this.result_data.load[i]["time"] = i + ":00-" + (i + 1) + ":00";
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const sourceData: any[] = [];
      for (var i = 0; i < 24; i++) {
        var tt2 = {"time": i, "load": this.result_data.load[i].vPrimaryLoad,};
        sourceData.push(tt2);
      }
      const dv = new DataSet.View().source(sourceData);
      this.data = dv.rows;
    })
  }

  close() {
    this.modal.destroy(this.result_data);
  }
}
