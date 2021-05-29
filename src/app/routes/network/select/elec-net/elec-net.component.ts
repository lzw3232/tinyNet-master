import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {NzModalRef, NzMessageService, NzTableComponent} from 'ng-zorro-antd';
import {_HttpClient} from '@delon/theme';
import {STChange, STColumn, STData, STPage} from '@delon/abc';
import {SFSchema} from "@delon/form";
import {DevicesService} from "../../../../user-service/devicesService";

const DataSet = require('@antv/data-set');

@Component({
  selector: 'app-network-select-elec-net',
  templateUrl: './elec-net.component.html',
  styleUrls: ['./elec-net.component.css']
})

export class NetworkSelectElecNetComponent implements OnInit, AfterViewInit {

  @Input() public title;
  @Input() public result;
  forceFit = true; // 宽度自适应
  height = 400;
  data: any;

  chart_title_a = {text: '时间', textStyle: {fill: '#515151'}};
  chart_title_b = {text: '价格', textStyle: {fill: '#515151'}};
  style = {stroke: '#fff', lineWidth: 1};



  result_data = {
    elec_pr : [],
    vGridEmissionFactor: {
      vGridEmissionFactor0: "0.00",
      vGridEmissionFactor1: "0.00",
      vGridEmissionFactor2: "0.00",
      vGridEmissionFactor3: "0.00",
      vGridEmissionFactor4: "0.00",
      vGridEmissionFactor5: "0.00",
    }
  }

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    private el: ElementRef,
    private devicesService: DevicesService,
  ) {
  }

  ngOnInit(): void {

    this.result_data = this.result;
    // for (let i = 0; i < 24; i++) {
    //   let tmp = {
    //     time: i + ":00-" + (i + 1) + ":00",
    //     purchasePriceGrid: "0.00",
    //     sellingPriceGrid: "0.00",
    //   };
    //   this.result_data.elec_pr.push(tmp);
    // }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const sourceData: any[] = [];
      for (var i = 0; i < 24; i++) {
        var tt2 = {"time": i, "purchase": this.result_data.elec_pr[i].purchasePriceGrid, "sell": this.result_data.elec_pr[i].sellingPriceGrid};
        sourceData.push(tt2);
      }
      const dv = new DataSet.View().source(sourceData);
      dv.transform({
        type: 'fold',
        fields: ['purchase', 'sell'],
        key: 'pr',
        value: 'price',
      });
      this.data = dv.rows;
    })
  }

  close() {
    this.modal.destroy(this.result_data);
  }
}
