import {Component, ElementRef, Input, OnInit} from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {STChange, STColumn, STData, STPage} from '@delon/abc';
import {SFSchema} from "@delon/form";
import {DevicesService} from "../../../../user-service/devicesService";

@Component({
  selector: 'app-network-select-heat-storage',
  templateUrl: './heat-storage.component.html',
  styleUrls:['../modal.component.css']
})




export class NetworkSelectHeatStorageComponent implements OnInit {
  @Input() public title;
  @Input() public result;
  forceFit = true; // 宽度自适应
  height = 400;
  data;
  params = { pi: 1, ps: 3 ,total:0,val:""};
  pages: STPage = {
    total: '',//分页显示多少条数据，字符串型
    show: true,//显示分页
    front: false //关闭前端分页，true是前端分页，false后端控制分页
  };
  searchSchema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '型号名称'
      }
    },
  };
  data1;

  style = { stroke: '#fff', lineWidth: 1 };
  chart_title_x = {text: '个数', textStyle: {fill: '#515151'} };
  chart_title_y1 = {text: '初建成本(元)', textStyle: {fill: '#515151'}};

  columns: STColumn[] = [
    { title: '编号', index: 'id', type: 'radio', fixed: 'left', width: '80px' },
    { title: '型号名称', index: 'name' , fixed: 'left', width: '100px'},
    { title: '蓄热效率(%)', type: 'number', index: 'heatStorageEfficiency' },
    { title: '放热效率(%)', type: 'number', index: 'heatReleaseEfficiency' },
    { title: '最大蓄热倍率', type: 'number', index: 'maximumHeatStorageRate' },
    { title: '最大放热倍率', type: 'number', index: 'maximumHeatReleaseRate' },
    { title: '自损耗率', type: 'number', index: 'selfLossRate' },
    { title: '寿命(年)', type: 'number', index: 'life' },
    { title: '制造商', index: 'manufacturer' },
  ];

  result_data = {
    id : null,
    soc_1 : '0.00',
    soc_2 : '0.00',
    soc_3 : '0.00',
    upper_limit : '1.00',
    lower_limit : '10.00'
  };

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    private el: ElementRef,
    private devicesService: DevicesService,
  ) { }

  ngOnInit(): void {
    this.result_data=this.result;
    this.getlist(this.params.pi);
  }

  ngAfterViewInit() {
  }

  close() {
    this.modal.destroy(this.result_data);
  }

  getlist(pi) {
    this.devicesService.list(pi, this.params.ps, this.params.val, this.title).subscribe((res) => {
      console.log(res);
      if (res["errno"] == "0") {
        this.params.total = res["data"]["data"]["total"];
        this.pages.total = '共' + this.params.total + '条';
        this.data = res["data"]["data"]["list"];
        this.params.pi = pi;
        // this.ps = 10;

        if(this.result_data.id==null){
          this.result_data.id = this.data[0].id;
          this.data[0].checked=true;
          this.showChart(this.data[0]);
        }
        else{
          this.data.map((res)=>{
            res.checked=(res.id===this.result_data.id);
          })

        }

      } else if (res["errno"] == "2") {
        this.devicesService.tologin();
      } else {
        this.msgSrv.create('error', `error`);
      }
      this.devicesService.setCookie("token", res["data"]["data"]["token"]);
    })
  }
  submit(value:any){
    this.params.val = (value["name"]==undefined)?"":value["name"];
    this.getlist(1);
  }

  reset(value:any){
    this.params.val = "";
    this.getlist(1);
  }

  change(e: STChange) {
    console.log('change', e);
    if (e.type === 'radio') {
      const value = e.radio;
      this.showChart(value);
    }

    if(e.pi!=this.params.pi){
      this.getlist(e.pi);
    }
  }

  showChart(value){
    const sourceData: any[] = [
      {x : value.capacity1, 初建成本 : value.cjcb1, 替换成本 : value.gxcb1, 运维成本 : value.yxwhcb1},
      {x : value.capacity2, 初建成本 : value.cjcb2, 替换成本 : value.gxcb2, 运维成本 : value.yxwhcb2},
      {x : value.capacity3, 初建成本 : value.cjcb3, 替换成本 : value.gxcb3, 运维成本 : value.yxwhcb3},
      {x : value.capacity4, 初建成本 : value.cjcb4, 替换成本 : value.gxcb4, 运维成本 : value.yxwhcb4},
    ];

    const dv = new DataSet.View().source(sourceData);
    dv.transform({
      type: 'fold',
      fields: ['初建成本', '替换成本', '运维成本'],
      key: 'cost_type',
      value: 'cost_number',
    });
    const data1 = dv.rows;
    this.data1 = data1;
    this.result_data.id = value.id;
  }
}
