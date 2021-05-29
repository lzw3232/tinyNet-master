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
      intStrategy : "", //运行策略 0:并网调度策略  1:离网硬充电策略  2:离网平滑功率策略
      system:{
        factorEconomic : '100.0', //内部收益率
        factorEmission : '0.0', //污染排放量
        allowableGridPowerPurchase : '0.00',//购电上限
        allowableGridPowerSelling : '0.00',//售电上限
      },
      steam:{
        steamprice : '0.00',//单位价格
        steamenthaply : '0.00',//蒸汽比焓
        steamefficiency : '0.00',//换热效率
        steammax : '0.00',//购买上限
        steammin : '0.00',//购买下限
      }
    },
    economy : {
      system:{
        systemCapitalCost : '0.00',//系统固定初始投资成本
        gasprice : '0.00',//燃气价格
        vESellingPrice : '0.00',//微网电价
        capacitycharge : '0.00',//变压器单位容量基本电费
        transcapacity : '0.00',//变压器容量
        vSteamSellingPrice : '0.00',//蒸汽费用
        caloricity : '0.00',//天然气低位发热量
        valuetionmethods : '0',//按照...计价
        vWaterSellingPrice:"0.00",vCoolSellingPrice:"0.00",//单价{热水，取冷}
        waterarea:"0.00",unitwaterprice:"0.00",coolingarea:"0.00",unitcoolprice:"0.00",//建筑{热水面积，热水价格，冷水价格，冷水价格}
        vDiscountRate : '0.00',//贴现率
        nominalInterestRate : '0.00',//名义利率
        inflationRate : '0.00',//通货膨胀率
        projectConstructTime : '0.00',//项目建设期
        longterminterestrate : '0.00',//银行长期贷款利率
        rateofCapital : '0.00',//初始投资本金比例
        projectLifeTime : '0.00',//项目寿命周期
        returndeadline : '0.00',//银行还款期限
      },
      fuelPrice : '0.00',//发电机燃料价格
    },
    emission : {
      penaltyforCO2Emissions : '0.00',//二氧化碳排放惩罚系数
      penaltyforCOEmissions : '0.00',//一氧化碳排放惩罚系数
      penaltyforUnburnedEmissions : '0.00',//未燃烧碳氰化物排放惩罚系数
      penaltyforMatter : '0.00',//颗粒物排放惩罚系数
      penaltyforSO2Emissions : '0.00',//二氧化硫排放惩罚系数
      penaltyforONEmissions : '0.00',//氮氧化物排放惩罚系数
    },
    constraint : {
      range0Maximum : '0.00',//最大负荷容量缺失率
      range1Minimum : '0.00',//最小可再生能源渗透率
      SourceParameter:{
        pvPriLoarFactor : '0.00',//光伏功率备用比例
        wtPriLoadFactor : '0.00',//风机功率备用比例
        hourlyPriLoadFactor : '0.00',//实时负荷备用率
        peakPriLoadFactor : '0.00',//峰值负荷备用率
      }
    }
  };

  constructor(private http: _HttpClient) { }

  ngOnInit() {
    this.form_data.system.intStrategy=(this.radioValue=="A")?"strategy1":"strategy0";

    if(this.controlFormData){
      this.form_data = this.controlFormData;
    }
  }

  factor(factor,factor2){
    // if(this.form_data.system[factor2]>100) this.form_data.system[factor2] =100;
    // if(this.form_data.system[factor2]<0) this.form_data.system[factor2] =0;
    this.form_data.system[factor] = 100-this.form_data.system[factor2];
  }

  ngOnDestroy() {
    this.controlFormDataEmitter.emit(this.form_data);
    console.log('NetworkControlComponent Destroy');
  }
}
