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

  checkOptions = {
    checkOptionsOne_load: [
      { label: '电负荷', value: '1_1', checked: false, disabled: false },
      { label: '冷负荷', value: '1_2', checked: false, disabled: false },
      { label: '热水负荷', value: '1_3', checked: false, disabled: false },
      { label: '蒸汽负荷', value: '1_4', checked: false, disabled: false }
    ],
    checkOptionsOne_renewable_energy: [
      { label: '风力发电机', value: '2_1', checked: false, disabled: false },
      { label: '光伏发电系统', value: '2_2', checked: false, disabled: false },
      { label: '水力发电机', value: '2_3', checked: false, disabled: false }
    ],
    checkOptionsOne_stored_energy: [
      { label: '蓄冰空调', value: '3_1', checked: false, disabled: false },
      { label: '电池储能系统', value: '3_2', checked: false, disabled: false },
      { label: '储热装置', value: '3_3', checked: false, disabled: false }
    ],
    checkOptionsOne_component: [
      { label: '热泵', value: '4_1', checked: false, disabled: false },
      { label: '燃气热水锅炉', value: '4_2', checked: false, disabled: false },
      { label: '电锅炉', value: '4_3', checked: false, disabled: false },
      { label: '余热锅炉', value: '4_4', checked: false, disabled: false },
      { label: '涡旋式电制冷机', value: '4_5', checked: false, disabled: false },
      { label: '溴化锂空调', value: '4_6', checked: false, disabled: false },
      { label: '螺杆式电制冷机', value: '4_7', checked: false, disabled: false },
      { label: '离心式电制冷机', value: '4_8', checked: false, disabled: false },
      { label: '板式换热器', value: '4_9', checked: false, disabled: false },
      { label: '燃气蒸汽锅炉', value: '4_10', checked: false, disabled: false },
      { label: '直燃型溴化锂空调', value: '4_11', checked: false, disabled: false },
      { label: '市政蒸汽', value: '4_12', checked: false, disabled: false },
    ],
    checkOptionsOne_electric_generator: [
      { label: '燃气轮机', value: '5_1', checked: false, disabled: false },
      { label: '常规发电机', value: '5_2', checked: false, disabled: false },
      { label: '燃气内燃机', value: '5_3', checked: false, disabled: false },
      { label: '核电机组', value: '5_4', checked: false, disabled: false },
    ],
  };

  checkOptionsMapping = [
    'checkOptionsOne_load',
    'checkOptionsOne_renewable_energy',
    'checkOptionsOne_stored_energy',
    'checkOptionsOne_component',
    'checkOptionsOne_electric_generator',
  ];

  // 初始值
  init_radioValue = 'A';
  init_checkOptions = new Set(['1_1', '2_1', '2_2', '2_3', '3_2', '5_2']);
  init_no_init_checkOptions = new Set(['1_2', '1_3','1_4', '3_1', '3_3', '4_1', '4_2', '4_3', '4_4', '4_5', '4_6','4_7','4_8','4_9','4_10','4_11','4_12','5_1']);

  init_B_checkOptions = new Set(['1_2', '1_3']);
  init_cold_checkOptions = new Set(['3_2', '4_2', '4_5', '5_2']);
  init_hot_checkOptions = new Set(['3_3', '4_1', '4_2', '4_3', '5_2']);

  // 负荷 多选框 状态
  allChecked_load = false;
  indeterminate_load = false;

  // 可再生能源 多选框 状态
  allChecked_renewable_energy = false;
  indeterminate_renewable_energy = false;

  // 储能 多选框 状态
  allChecked_stored_energy = false;
  indeterminate_stored_energy = false;

  // 元件 多选框 状态
  allChecked_component = false;
  indeterminate_component = false;


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
    this.setDefaultValues();
  }

  ngOnDestroy() {
    this.checkOptionsEmitter.emit(this.current_checkOptions);
    this.radioValueEmitter.emit(this.radioValue);
    this.allCheckOptionsEmitter.emit(this.checkOptions);
    // console.log('NetworkDesignComponent Destroy');
  }


  _onReuseInit() {
    console.log('_onReuseInit');
  }

  hello(name) {
    // console.log(name);
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  updateRadio() {
    if (this.radioValue === 'A') {
      this.init_no_init_checkOptions.forEach((key, value) => {
        const temp = value.split('_');
        const a = parseInt(temp[0], 10);
        const b = parseInt(temp[1], 10);
        this.checkOptions[this.checkOptionsMapping[a - 1]][b - 1]['disabled'] = true;
        if (this.checkOptions[this.checkOptionsMapping[a - 1]][b - 1]['checked'] === true) {
          this.checkOptions[this.checkOptionsMapping[a - 1]][b - 1]['checked'] = false;
          this.current_checkOptions.delete(value);
          // console.log(this.current_checkOptions);
        }
      });
      // const c = this.parseValue('4_1');
      // if (this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['disabled'] === true) {
      //   this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['disabled'] = false;
      // }
    } else {
      this.init_B_checkOptions.forEach((key, value) => {
        const temp = value.split('_');
        const a = parseInt(temp[0], 10);
        const b = parseInt(temp[1], 10);
        this.checkOptions[this.checkOptionsMapping[a - 1]][b - 1]['disabled'] = false;
      });
    }
  }

  /**
   * 负荷 多选框的全选框的回调事件
   */
  updateAllChecked_load(): void {
    this.indeterminate_load = false;
    if (this.allChecked_load) {
      this.checkOptions.checkOptionsOne_load.forEach(item => {
        item.checked = true;
        this.current_checkOptions.add(item.value);
      });
      // console.log(this.current_checkOptions);
    } else {
      this.checkOptions.checkOptionsOne_load.forEach(item => {
        item.checked = false;
        this.current_checkOptions.delete(item.value);
      });
      // console.log(this.current_checkOptions);
    }
  }

  updateSingleChecked_load(event, value): void {
    if (event === true) {

      // 当选定 冷负荷 时，解锁所有的冷设备
      if (value === '1_2') {
        this.init_cold_checkOptions.forEach((key, value1) => {
          const c = this.parseValue(key);
          this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['disabled'] = false;
        });
        // 当选定 热负荷 时，解锁所有的热设备
      } else if (value === '1_3') {
        this.init_hot_checkOptions.forEach((key, value1) => {
          const c = this.parseValue(key);
          this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['disabled'] = false;
        });

        // 当选定 热负荷时，如果在 冷负荷 状态选择了 燃气轮机，则解锁 余热锅炉
        if (this.current_checkOptions.has('5_2')) {
          const d = this.parseValue('4_4');
          this.checkOptions[this.checkOptionsMapping[d[0] - 1]][d[1] - 1]['disabled'] = false;
        }
      }
      this.current_checkOptions.add(value);
    } else {
      // 当取消选定 冷负荷 时，锁住所有的冷设备并取消以前的选择
      if (value === '1_2') {
        this.init_cold_checkOptions.forEach((key, value1) => {

          // 如果此时选定了 热负荷，则对 燃气轮机 和 热泵 不做处理
          if (this.current_checkOptions.has('1_3')) {
            if (key !== '4_2' && key !== '5_2') {
              const c = this.parseValue(key);
              this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['checked'] = false;
              this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['disabled'] = true;
              this.current_checkOptions.delete(key);
            }
          } else {
            const c = this.parseValue(key);
            this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['checked'] = false;
            this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['disabled'] = true;
            this.current_checkOptions.delete(key);
            if (key === '5_2') {
              const d = this.parseValue('4_6');
              this.checkOptions[this.checkOptionsMapping[d[0] - 1]][d[1] - 1]['checked'] = false;
              this.checkOptions[this.checkOptionsMapping[d[0] - 1]][d[1] - 1]['disabled'] = true;
              this.current_checkOptions.delete('4_6');
            }
          }
          // 当冷设备里面选择了 吸收式制冷机 时，取消锁定 热负荷
          // if (key === '4_7') {
          //   const d = this.parseValue('1_3');
          //   if (this.checkOptions[this.checkOptionsMapping[d[0] - 1]][d[1] - 1]['disabled'] === true) {
          //     this.checkOptions[this.checkOptionsMapping[d[0] - 1]][d[1] - 1]['disabled'] = false;
          //   }
          // }
        });
        // 当取消选定 热负荷 时，锁住所有的热设备并取消以前的选择
      } else if (value === '1_3') {
        this.init_hot_checkOptions.forEach((key, value1) => {

          // 如果此时选定了 冷负荷，则对 燃气轮机 和 热泵 不做处理
          if (this.current_checkOptions.has('1_2')) {
            if (key !== '4_2' && key !== '5_2') {
              const c = this.parseValue(key);
              this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['checked'] = false;
              this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['disabled'] = true;
              this.current_checkOptions.delete(key);
            }
          } else {
            const c = this.parseValue(key);
            this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['checked'] = false;
            this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['disabled'] = true;
            this.current_checkOptions.delete(key);
            if (key === '5_2') {
              const d = this.parseValue('4_6');
              this.checkOptions[this.checkOptionsMapping[d[0] - 1]][d[1] - 1]['checked'] = false;
              this.checkOptions[this.checkOptionsMapping[d[0] - 1]][d[1] - 1]['disabled'] = true;
              this.current_checkOptions.delete('4_6');
            }
          }
          // 当热设备里面选择了 热交换装置 时，取消锁定 常规发电机
          // if (key === '4_5') {
          //   const d = this.parseValue('4_1');
          //   if (this.checkOptions[this.checkOptionsMapping[d[0] - 1]][d[1] - 1]['disabled'] === true) {
          //     this.checkOptions[this.checkOptionsMapping[d[0] - 1]][d[1] - 1]['disabled'] = false;
          //   }
          // }
        });

        // 在取消 热负荷 的时候，如果勾选了 余热锅炉，则对 余热锅炉进行处理
        const e = this.parseValue('4_4');
        this.checkOptions[this.checkOptionsMapping[e[0] - 1]][e[1] - 1]['checked'] = false;
        this.checkOptions[this.checkOptionsMapping[e[0] - 1]][e[1] - 1]['disabled'] = true;
        this.current_checkOptions.delete('4_4');
      }

      this.current_checkOptions.delete(value);
    }
    if (this.checkOptions.checkOptionsOne_load.every(item => item.checked === false)) {
      this.allChecked_load = false;
      this.indeterminate_load = false;
    } else if (this.checkOptions.checkOptionsOne_load.every(item => item.checked === true)) {
      this.allChecked_load = true;
      this.indeterminate_load = false;
    } else {
      this.indeterminate_load = true;
    }
    // console.log(this.current_checkOptions);
  }

  /**
   * 可再生能源 多选框的全选框的回调事件
   */
  updateAllChecked_renewable_energy(): void {
    this.indeterminate_renewable_energy = false;
    if (this.allChecked_renewable_energy) {
      this.checkOptions.checkOptionsOne_renewable_energy.forEach(item => {
        item.checked = true;
        this.current_checkOptions.add(item.value);
      });
      // console.log(this.current_checkOptions);
    } else {
      this.checkOptions.checkOptionsOne_renewable_energy.forEach(item => {
        item.checked = false;
        this.current_checkOptions.delete(item.value);
      });
      // console.log(this.current_checkOptions);
    }
  }

  updateSingleChecked_renewable_energy(event, value): void {
    if (event === true) {
      this.current_checkOptions.add(value);
    } else {
      this.current_checkOptions.delete(value);
    }
    if (this.checkOptions.checkOptionsOne_renewable_energy.every(item => item.checked === false)) {
      this.allChecked_renewable_energy = false;
      this.indeterminate_renewable_energy = false;
    } else if (this.checkOptions.checkOptionsOne_renewable_energy.every(item => item.checked === true)) {
      this.allChecked_renewable_energy = true;
      this.indeterminate_renewable_energy = false;
    } else {
      this.indeterminate_renewable_energy = true;
    }
    // console.log(this.current_checkOptions);
  }

  /**
   * 储能 多选框的全选框的回调事件
   */
  updateAllChecked_stored_energy(): void {
    this.indeterminate_stored_energy = false;
    if (this.allChecked_stored_energy) {
      this.checkOptions.checkOptionsOne_stored_energy.forEach(item => {
        item.checked = true;
        this.current_checkOptions.add(item.value);
      });
      // console.log(this.current_checkOptions);
    } else {
      this.checkOptions.checkOptionsOne_stored_energy.forEach(item => {
        item.checked = false;
        this.current_checkOptions.delete(item.value);
      });
      // console.log(this.current_checkOptions);
    }
  }

  updateSingleChecked_stored_energy(event, value): void {
    if (event === true) {
      this.current_checkOptions.add(value);
    } else {
      this.current_checkOptions.delete(value);
    }
    if (this.checkOptions.checkOptionsOne_stored_energy.every(item => item.checked === false)) {
      this.allChecked_stored_energy = false;
      this.indeterminate_stored_energy = false;
    } else if (this.checkOptions.checkOptionsOne_stored_energy.every(item => item.checked === true)) {
      this.allChecked_stored_energy = true;
      this.indeterminate_stored_energy = false;
    } else {
      this.indeterminate_stored_energy = true;
    }
    // console.log(this.current_checkOptions);
  }

  /**
   * 发电机 多选框的回调事件
   */

  updateSingleChecked_electric_generator(event, value): void {
    if (event === true) {
      this.current_checkOptions.add(value);
      // 1. 如果勾选了 燃气轮机，必须勾选 溴化锂空调
      if (value === '5_2') {
        if (!this.current_checkOptions.has('4_6')) {
          this.parseAndAddValue('4_6');
        }
        const c = this.parseValue('4_6');
        this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['disabled'] = true;
        // 2. 燃气轮机 + 热负荷 ， 可以选择余热锅炉
        if (this.current_checkOptions.has('1_3')) {
          const d = this.parseValue('4_4');
          this.checkOptions[this.checkOptionsMapping[d[0] - 1]][d[1] - 1]['disabled'] = false;
        }
      }

    } else {
      this.current_checkOptions.delete(value);
      // 1. 取消勾选 燃气轮机，则取消勾 溴化锂空调
      if (value === '5_2') {
        const c = this.parseValue('4_6');
        this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['checked'] = false;
        this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['disabled'] = true;
        this.current_checkOptions.delete('4_6');
        // 2. 取消 选择 燃气轮机
        if (this.current_checkOptions.has('1_3')) {
          const d = this.parseValue('4_4');
          this.checkOptions[this.checkOptionsMapping[d[0] - 1]][d[1] - 1]['disabled'] = true;
          this.checkOptions[this.checkOptionsMapping[d[0] - 1]][d[1] - 1]['checked'] = false;
        }

      }
    }

    // console.log(this.current_checkOptions);
  }

  /**
   * 元件 多选框的全选框的回调事件
   */
  updateAllChecked_component(): void {
    this.indeterminate_component = false;
    if (this.allChecked_component) {
      this.checkOptions.checkOptionsOne_component.forEach(item => {
        item.checked = true;
        this.current_checkOptions.add(item.value);
      });
      // console.log(this.current_checkOptions);
    } else {
      this.checkOptions.checkOptionsOne_component.forEach(item => {
        item.checked = false;
        this.current_checkOptions.delete(item.value);
      });
      // console.log(this.current_checkOptions);
    }
  }

  updateSingleChecked_component(event, value): void {
    if (event === true) {

      // // 当选择 热交换装置 时，自动勾选 常规发电机 并锁定
      // if (value === '4_5') {
      //   if (!this.current_checkOptions.has('4_1')) {
      //     this.parseAndAddValue('4_1');
      //   }
      //   const c = this.parseValue('4_1');
      //   this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['disabled'] = true;
      // }
      //
      // // 当选择 吸收式制冷机 时，自动勾选 热负荷 并锁定
      // if (value === '4_7') {
      //   this.parseAndAddValue('1_3');
      //   const c = this.parseValue('1_3');
      //   this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['disabled'] = true;
      // }

      this.current_checkOptions.add(value);
    } else {

      // // 当取消 热交换装置 时，取消 常规发电机 锁定
      // if (value === '4_5') {
      //   const c = this.parseValue('4_1');
      //   this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['disabled'] = false;
      // }
      //
      // // 当取消 吸收式制冷机 时，取消 热负荷 锁定
      // if (value === '4_7') {
      //   const c = this.parseValue('1_3');
      //   this.checkOptions[this.checkOptionsMapping[c[0] - 1]][c[1] - 1]['disabled'] = false;
      // }


      this.current_checkOptions.delete(value);
    }
    if (this.checkOptions.checkOptionsOne_component.every(item => item.checked === false)) {
      this.allChecked_component = false;
      this.indeterminate_component = false;
    } else if (this.checkOptions.checkOptionsOne_component.every(item => item.checked === true)) {
      this.allChecked_component = true;
      this.indeterminate_component = false;
    } else {
      this.indeterminate_component = true;
    }
    // console.log(this.current_checkOptions);
  }

  /**
   * 设置该页面的默认值或初始值
   * ［默认值］ 在页面切换时，会导致页面子组件的重新加载，因此该值保存了之前选定的数据
   * ［初始值］ 最开始默认的值
   */
  setDefaultValues() {
    if (!this.default_radioValue) {
      this.radioValue = this.init_radioValue;
      this.init_no_init_checkOptions.forEach((key, value) => {
        const temp = value.split('_');
        const a = parseInt(temp[0], 10);
        const b = parseInt(temp[1], 10);
        this.checkOptions[this.checkOptionsMapping[a - 1]][b - 1]['disabled'] = true;
      });
    } else {
      this.radioValue = this.default_radioValue;
    }

    if (this.default_checkOptions_object) {
      this.checkOptions = this.default_checkOptions_object;
    }

    if (!this.default_checkOptions) {
      this.init_checkOptions.forEach((value, key) => {
        this.parseAndAddValue(value);
      });
    } else {
      this.default_checkOptions.forEach((value, key) => {
        this.parseAndAddValue(value);
      });
    }
  }

  /**
   * 1. 解析 checkOption 的value
   * 2. 将该 checkOption 置为选中状态
   * 3. 改变全选框的状态
   */
  parseAndAddValue(value) {
    const temp = value.split('_');
    const a = parseInt(temp[0], 10);
    const b = parseInt(temp[1], 10);
    this.checkOptions[this.checkOptionsMapping[a - 1]][b - 1]['checked'] = true;
    if (a === 1) {
      this.updateSingleChecked_load(true, value);
    } else if (a === 2) {
      this.updateSingleChecked_renewable_energy(true, value);
    } else if (a === 3) {
      this.updateSingleChecked_stored_energy(true, value);
    } else {
      this.updateSingleChecked_component(true, value);
    }
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
