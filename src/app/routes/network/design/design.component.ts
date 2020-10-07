import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';

 // 自己导入的
import * as svgPanZoom from 'assets/js/svg-pan-zoom.min.js';
import {NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-network-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css'],
})
export class NetworkDesignComponent implements OnInit, OnDestroy {

  @Input() default_checkOptions: Set<string>;

  @Input() default_radioValue: any;

  @Input() default_checkOptions_object: any;

  @Output() checkOptionsEmitter = new EventEmitter<Set<string>>();

  @Output() radioValueEmitter = new EventEmitter<string>();

  @Output() allCheckOptionsEmitter = new EventEmitter<any>();

  current_checkOptions = new Set();

  zoomSvg: any;

  radioValue: string;

  lines=[false,false,false,false,false,false,false];

  checkOptions = {
    checkOptionsOne_load: [
      { label: '电负荷', value: '1_1', checked: true, disabled: true },
      { label: '冷负荷', value: '1_2', checked: false, disabled: true },
      { label: '热水负荷', value: '1_3', checked: false, disabled: true },
      { label: '蒸汽负荷', value: '1_4', checked: false, disabled: true }
    ],
    checkOptionsOne_renewable_energy: [
      { label: '风力发电机', value: '2_1', checked: false, disabled: false },
      { label: '光伏发电系统', value: '2_2', checked: false, disabled: false },
      { label: '水力发电机', value: '2_3', checked: false, disabled: false }
    ],
    checkOptionsOne_stored_energy: [
      { label: '蓄冰空调', value: '3_1', checked: false, disabled: true },
      { label: '电池储能系统', value: '3_2', checked: false, disabled: false },
      { label: '储热装置', value: '3_3', checked: false, disabled: true }
    ],
    checkOptionsOne_component: [
      { label: '热泵', value: '4_1', checked: false, disabled: true },
      { label: '燃气热水锅炉', value: '4_2', checked: false, disabled: true },
      { label: '电锅炉', value: '4_3', checked: false, disabled: true },
      { label: '余热锅炉', value: '4_4', checked: false, disabled: true },
      { label: '涡旋式电制冷机', value: '4_5', checked: false, disabled: true },
      { label: '溴化锂空调', value: '4_6', checked: false, disabled: true },
      { label: '螺杆式电制冷机', value: '4_7', checked: false, disabled: true },
      { label: '离心式电制冷机', value: '4_8', checked: false, disabled: true },
      { label: '板式换热器', value: '4_9', checked: false, disabled: true },
      { label: '燃气蒸汽锅炉', value: '4_10', checked: false, disabled: true },
      { label: '直燃型溴化锂空调', value: '4_11', checked: false, disabled: true },
      { label: '市政蒸汽', value: '4_12', checked: false, disabled: true },
    ],
    checkOptionsOne_electric_generator: [
      { label: '燃气轮机', value: '5_1', checked: false, disabled: true },
      { label: '常规发电机', value: '5_2', checked: false, disabled: false },
      { label: '燃气内燃机', value: '5_3', checked: false, disabled: true },
      { label: '核电机组', value: '5_4', checked: false, disabled: true },
    ],
  };

  checkOptionsMapping = [
    'checkOptionsOne_load',
    'checkOptionsOne_renewable_energy',
    'checkOptionsOne_stored_energy',
    'checkOptionsOne_component',
    'checkOptionsOne_electric_generator',
  ];

  constructor(private http: _HttpClient,
              private modal: ModalHelper,
              private modalService: NzModalService
  ) { }

  ngOnInit() {
    // console.log('NetworkDesignComponent init');
    this.zoomSvg = svgPanZoom('#xianlutu', {
      zoomEnabled: true,
      controlIconsEnabled: true,
      fit: false,
      center: true,
      zoomScaleSensitivity: 0.5,
      dblClickZoomEnabled: false
    });
    if(this.default_radioValue){
      this.checkOptions=this.default_checkOptions_object;
      this.radioValue=this.default_radioValue;
      this.current_checkOptions=this.default_checkOptions;
    }
    else{
      this.radioValue="A";
    }
    this.condition()
    //this.setDefaultValues();
  }

  ngOnDestroy() {
    console.log(this.current_checkOptions);
    this.checkOptionsEmitter.emit(this.current_checkOptions);
    this.radioValueEmitter.emit(this.radioValue);
    this.allCheckOptionsEmitter.emit(this.checkOptions);
    // console.log('NetworkDesignComponent Destroy');
  }

  _onReuseInit() {
    console.log('_onReuseInit');
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  condition() {
    //负荷解锁条件 电负荷无条件
    this.checkOptions.checkOptionsOne_load[1].disabled = !(this.radioValue == "B");
    this.checkOptions.checkOptionsOne_load[2].disabled = !(this.radioValue == "B");
    this.checkOptions.checkOptionsOne_load[3].disabled = !(this.radioValue == "B");

    for(let i=1;i<this.checkOptions.checkOptionsOne_load.length;i++){
      if (this.checkOptions.checkOptionsOne_load[i].disabled === true)
        this.checkOptions.checkOptionsOne_load[i].checked = false;
    }

    //可再生资源解锁条件：无

    for(let i=0;i<this.checkOptions.checkOptionsOne_renewable_energy.length;i++){
      if (this.checkOptions.checkOptionsOne_renewable_energy[i].disabled === true)
        this.checkOptions.checkOptionsOne_renewable_energy[i].checked = false;
    }

    //储能解锁条件：无
    //蓄冰空调需要冷负荷
    this.checkOptions.checkOptionsOne_stored_energy[0].disabled = !this.checkOptions.checkOptionsOne_load[1].checked;
    //电池不需要条件
    //储热装置需要热水负荷
    this.checkOptions.checkOptionsOne_stored_energy[2].disabled = !this.checkOptions.checkOptionsOne_load[2].checked;

    for(let i=0;i<this.checkOptions.checkOptionsOne_stored_energy.length;i++){
      if (this.checkOptions.checkOptionsOne_stored_energy[i].disabled === true)
        this.checkOptions.checkOptionsOne_stored_energy[i].checked = false;
    }

    //发电机解锁条件
    //燃气轮机需要冷负荷或热水负荷或蒸汽负荷
    this.checkOptions.checkOptionsOne_electric_generator[0].disabled = !(this.checkOptions.checkOptionsOne_load[1].checked || this.checkOptions.checkOptionsOne_load[2].checked || this.checkOptions.checkOptionsOne_load[3].checked);
    //常规发电机不需要条件
    //燃气内燃机需要冷负荷或热水负荷或蒸汽负荷
    this.checkOptions.checkOptionsOne_electric_generator[2].disabled = !(this.checkOptions.checkOptionsOne_load[1].checked || this.checkOptions.checkOptionsOne_load[2].checked || this.checkOptions.checkOptionsOne_load[3].checked);
    //核电机组需要离网和常规发电机
    this.checkOptions.checkOptionsOne_electric_generator[3].disabled = !(this.radioValue == "A") || !this.checkOptions.checkOptionsOne_electric_generator[1].checked;

    for(let i=0;i<this.checkOptions.checkOptionsOne_electric_generator.length;i++){
      if (this.checkOptions.checkOptionsOne_electric_generator[i].disabled == true)
        this.checkOptions.checkOptionsOne_electric_generator[i].checked = false;
    }

    //元件解锁条件
    //热泵需要冷负荷或热水负荷
    this.checkOptions.checkOptionsOne_component[0].disabled = !(this.checkOptions.checkOptionsOne_load[1].checked || this.checkOptions.checkOptionsOne_load[2].checked);
    //燃气热水电锅炉需要热水负荷
    this.checkOptions.checkOptionsOne_component[1].disabled = !(this.checkOptions.checkOptionsOne_load[2].checked);
    //电锅炉需要蒸汽负荷
    this.checkOptions.checkOptionsOne_component[2].disabled = !(this.checkOptions.checkOptionsOne_load[3].checked);
    //余热锅炉需要燃气轮机或燃气内燃机
    this.checkOptions.checkOptionsOne_component[3].disabled = !(this.checkOptions.checkOptionsOne_electric_generator[0].checked || this.checkOptions.checkOptionsOne_electric_generator[2].checked);
    //涡旋式电制冷机需要冷负荷
    this.checkOptions.checkOptionsOne_component[4].disabled = !(this.checkOptions.checkOptionsOne_load[1].checked);
    //溴化锂空调需要燃气轮机或燃气内燃机
    this.checkOptions.checkOptionsOne_component[5].disabled = !(this.checkOptions.checkOptionsOne_electric_generator[0].checked || this.checkOptions.checkOptionsOne_electric_generator[2].checked);
    //螺杆式电制冷机需要冷负荷
    this.checkOptions.checkOptionsOne_component[6].disabled = !(this.checkOptions.checkOptionsOne_load[1].checked);
    //离心式电制冷机需要冷负荷
    this.checkOptions.checkOptionsOne_component[7].disabled = !(this.checkOptions.checkOptionsOne_load[1].checked);
    //板式换热器需要燃气内燃机
    this.checkOptions.checkOptionsOne_component[8].disabled = !(this.checkOptions.checkOptionsOne_electric_generator[2].checked);
    //燃气蒸汽锅炉需要蒸汽负荷
    this.checkOptions.checkOptionsOne_component[9].disabled = !(this.checkOptions.checkOptionsOne_load[3].checked);
    //直燃型溴化锂空调需要冷负荷或热水负荷
    this.checkOptions.checkOptionsOne_component[10].disabled = !(this.checkOptions.checkOptionsOne_load[1].checked || this.checkOptions.checkOptionsOne_load[2].checked);
    //市政蒸汽需要蒸汽负荷
    this.checkOptions.checkOptionsOne_component[11].disabled = !(this.checkOptions.checkOptionsOne_load[3].checked);

    for(let i=0;i<this.checkOptions.checkOptionsOne_component.length;i++){
      if (this.checkOptions.checkOptionsOne_component[i].disabled === true)
        this.checkOptions.checkOptionsOne_component[i].checked = false;
    }
    this.lines[0] = this.checkOptions.checkOptionsOne_load[0].checked
      ||this.checkOptions.checkOptionsOne_renewable_energy[0].checked
      ||this.checkOptions.checkOptionsOne_renewable_energy[1].checked
      ||this.checkOptions.checkOptionsOne_renewable_energy[2].checked
      ||this.checkOptions.checkOptionsOne_stored_energy[1].checked
      ||this.checkOptions.checkOptionsOne_electric_generator[1].checked
      ||(this.radioValue=="B")
    ;

    this.lines[1]=this.checkOptions.checkOptionsOne_load[1].checked;
    this.lines[2]=this.checkOptions.checkOptionsOne_load[2].checked;
    this.lines[3]=this.checkOptions.checkOptionsOne_electric_generator[0].checked||this.checkOptions.checkOptionsOne_electric_generator[2].checked||this.checkOptions.checkOptionsOne_component[9].checked;
    this.lines[4]=this.checkOptions.checkOptionsOne_component[5].checked||this.checkOptions.checkOptionsOne_component[3].checked;
    this.lines[5]=this.checkOptions.checkOptionsOne_load[3].checked;
    this.lines[6]=this.checkOptions.checkOptionsOne_component[5].checked||this.checkOptions.checkOptionsOne_component[8].checked;


    for(let i in this.checkOptions){
      this.checkOptions[i].map(res=>{
        if(res.checked==true){
          this.current_checkOptions.add(res.value);
        }
      })
    }

  }

  /**
   * 运行模式 多选框的回调事件
   */
  updateRadio() {
    this.condition();
  }

  /**
   * 负荷 多选框的回调事件
   */
  updateSingleChecked_load(event, value): void {
    this.condition();
    // console.log(this.current_checkOptions);
  }

  /**
   * 可再生 多选框的回调事件
   */
  updateSingleChecked_renewable_energy(event, value): void {
    this.condition();
      // console.log(this.current_checkOptions);
  }

  /**
   * 储能 多选框的回调事件
   */
  updateSingleChecked_stored_energy(event, value): void {
    this.condition();
    // console.log(this.current_checkOptions);
  }

  /**
   * 发电机 多选框的回调事件
   */

  updateSingleChecked_electric_generator(event, value,option): void {
    this.condition();

    // console.log(this.current_checkOptions);
  }

  /**
   * 元件 多选框的全选框的回调事件
   */
  updateSingleChecked_component(event, value): void {
    this.condition();
    //console.log(this.current_checkOptions);
  }

  /**
   * 解析属性
   */
  parseValue(value) {
    const temp = value.split('_');
    const a = parseInt(temp[0], 10);
    const b = parseInt(temp[1], 10);
    return [a, b];
  }

  /**
   * 须知
   */
  getModalKnowledge() {
    this.modalService.info({
      nzTitle: '您应该了解',
      nzContent: '<p>1. 在离网模式下，<b>电池储能系统</b>与<b>常规发电机</b>至少包含一个。</p>' +
                 '<p>2. 在并网模式下，<b>电池储能系统</b>、<b>蓄冰装置</b>、<b>储热装置</b>与<b>常规发电机</b>至少包含一个。</p>' +
                 '<p>3. 在选择冷负荷下，<b>电制冷机</b>与<b>吸收式制冷机</b>至少包含一个</p>' +
                 '<p>4. 在选择热负荷下，<b>燃气锅炉</b>、<b>热泵</b>、<b>电锅炉</b>与<b>热交换装置</b>至少包含一个</p>',
      nzWidth: '650'
    });
  }
}
