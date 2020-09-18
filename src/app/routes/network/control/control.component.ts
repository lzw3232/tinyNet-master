import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-network-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class NetworkControlComponent implements OnInit, OnDestroy {

  @Input() radioValue: string;

  @Output() controlFormDataEmitter = new EventEmitter<any>();

  strategy_internal = true;
  strategy_pollution = true;

  form_data =  {
    system : {
      strategy_radioValue : 'strategy1',
      strategy_radioValue_all : 'strategy0',
      strategy_internal_rate : '0.00',
      strategy_pollution_rate : '0.00',
      buy_constraint_1 : '0.00',
      sell_constraint_2 : '0.00'
    },
    economy : {
      system_economy_1 : '0.00',
      system_economy_2 : '0.00',
      system_economy_3 : '0.00',
      system_economy_4 : '0.00',
      system_economy_5 : '0.00',
      engineering_economy_1 : '0.00',
      engineering_economy_2 : '0.00',
      engineering_economy_3 : '0.00',
      engineering_economy_4 : '0.00',
      engineering_economy_5 : '0.00',
      engineering_economy_6 : '0.00',
      engineering_economy_7 : '0.00',
      engineering_economy_8 : '0.00',
    },
    emission : {
      emission_punishment_1 : '0.00',
      emission_punishment_2 : '0.00',
      emission_punishment_3 : '0.00',
      emission_punishment_4 : '0.00',
      emission_punishment_5 : '0.00',
      emission_punishment_6 : '0.00',
    },
    constraint : {
      system_constraint_1 : '0.00',
      system_constraint_2 : '0.00',
      spare_constraint_1 : '0.00',
      spare_constraint_2 : '0.00',
      spare_constraint_3 : '0.00',
      spare_constraint_4 : '0.00',
    }
  };

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.controlFormDataEmitter.emit(this.form_data);
    console.log('NetworkControlComponent Destroy');
  }

  getData() {
    console.log(JSON.stringify(this.form_data));
  }

}
