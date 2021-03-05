import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-network-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class NetworkControlComponent implements OnInit, OnDestroy {

  @Input() radioValue: string;
  @Input() controlFormData: any;

  @Output() controlFormDataEmitter = new EventEmitter<any>();

  form_data =  {
    system : {
      strategy_radioValue : "", //运行策略 0:并网调度策略  1:离网硬充电策略  2:离网平滑功率策略
      strategy_internal_rate : [true,'100.0'], //内部收益率
      strategy_pollution_rate : [true,'100.0'], //污染排放量
      buy_constraint_1 : '0.00',//购电上限
      sell_constraint_2 : '0.00',//售电上限
      price : '0.00',//单位价格
      steam : '0.00',//蒸汽比焓
      efficiency : '0.00',//换热效率
      upper_limit : '0.00',//购买上限
      lower_limit : '0.00',//购买下限
    },
    economy : {
      system_economy_1 : '0.00',//系统固定初始投资成本
      system_economy_2 : '0.00',//燃气价格
      system_economy_3 : '0.00',//汽油价格
      system_economy_4 : '0.00',//柴油价格
      system_economy_5 : '0.00',//微网电价
      system_economy_6 : '0.00',//变压器单位容量基本电费
      system_economy_7 : '0.00',//变压器容量
      system_economy_8 : '0.00',//蒸汽费用
      system_economy_9 : '0.00',//天然气低位发热量
      system_economy_10 : 'price',//按照...计价
      price : {cost_1:"0.00",cost_2:"0.00"},//单价{热水，取冷}
      area : {cost_1:"0.00",cost_2:"0.00",cost_3:"0.00",cost_4:"0.00"},//建筑{热水面积，热水价格，冷水价格，冷水价格}
      engineering_economy_1 : '0.00',//贴现率
      engineering_economy_2 : '0.00',//名义利率
      engineering_economy_3 : '0.00',//通货膨胀率
      engineering_economy_4 : '0.00',//项目建设期
      engineering_economy_5 : '0.00',//银行长期贷款利率
      engineering_economy_6 : '0.00',//初始投资本金比例
      engineering_economy_7 : '0.00',//项目寿命周期
      engineering_economy_8 : '0.00',//银行还款期限
    },
    emission : {
      emission_punishment_1 : '0.00',//二氧化碳排放惩罚系数
      emission_punishment_2 : '0.00',//一氧化碳排放惩罚系数
      emission_punishment_3 : '0.00',//未燃烧碳氰化物排放惩罚系数
      emission_punishment_4 : '0.00',//颗粒物排放惩罚系数
      emission_punishment_5 : '0.00',//二氧化硫排放惩罚系数
      emission_punishment_6 : '0.00',//氮氧化物排放惩罚系数
    },
    constraint : {
      system_constraint_1 : '0.00',//最大负荷容量缺失率
      system_constraint_2 : '0.00',//最小可再生能源渗透率
      spare_constraint_1 : '0.00',//光伏功率备用比例
      spare_constraint_2 : '0.00',//风机功率备用比例
      spare_constraint_3 : '0.00',//实时负荷备用率
      spare_constraint_4 : '0.00',//峰值负荷备用率
    }
  };

  constructor(private http: _HttpClient) { }

  ngOnInit() {
    this.form_data.system.strategy_radioValue=(this.radioValue=="A")?"strategy1":"strategy0";

    if(this.controlFormData){
      this.form_data = this.controlFormData;
    }
  }

  ngOnDestroy() {
    this.controlFormDataEmitter.emit(this.form_data);
    console.log('NetworkControlComponent Destroy');
  }
}
