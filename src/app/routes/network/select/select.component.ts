import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {_HttpClient, ModalHelper} from '@delon/theme';
import { NetworkSelectBatteryViewComponent } from './view/battery-view.component';
import {NzModalService} from 'ng-zorro-antd';
import {NetworkSelectTurbineComponent} from './turbine/turbine.component';
import {NetworkSelectWindTurbineComponent} from './wind-turbine/wind-turbine.component';
import {NetworkSelectPhotovoltaicComponent} from './photovoltaic/photovoltaic.component';
import {NetworkSelectGeneratorComponent} from './generator/generator.component';



@Component({
  selector: 'app-network-select',
  templateUrl: './select.component.html',
  styleUrls : ['./select.component.css']
})
export class NetworkSelectComponent implements OnInit, OnDestroy {

  @Input() radioValue: any;

  @Input() checkOptionsSet: Set<string>;

  @Input() checkOptions: any;

  @Input() defaultSelectDeviceData: any;

  @Input() defaultListData: any;

  @Output() selectDeviceDataEmitter = new EventEmitter<any>();

  @Output() listDataEmitter = new EventEmitter<any>();


  select_device_data = {
    dianwang : { data : null },
    guangziyuan : { data : null },
    photovoltaic : { data : null },
    fengziyuan : { data : null },
    wind_turbines : { data : null },
    shuiziyuan : { data : null },
    turbine : { data : null },
    generator : { data : null },
    ranqilunji : { data : null },
    battery : { data : null },
    dianfuhe : { data : null },
    dianzhilengji : { data : null },
    shuanggongkuangzhuji : { data : null },
    xubingzhuangzhi : { data : null },
    rebeng : { data : null },
    dianguolu : { data : null },
    xiulihuakongtiao : { data : null },
    yureguolu : { data : null },
    ranqiguolu : { data : null },
    lengfuhe : { data : null },
    refuhe : { data : null },
    xurezhuangzhi : { data : null }
  };

  loading = false;
  list_data = [];

  i = 1;

  constructor(
    private http: _HttpClient,
    private modalService: NzModalService,
    private el: ElementRef,
  ) { }

  ngOnInit() {
    console.log('NetworkSelectComponent init');
    // console.log(this.checkOptionsSet);
    if (this.defaultListData.length > 0) {
      this.list_data = this.defaultListData;
      this.select_device_data = this.defaultSelectDeviceData;
    }
  }

  ngOnDestroy() {
    this.selectDeviceDataEmitter.emit(this.select_device_data);
    this.listDataEmitter.emit(this.list_data);
    console.log('NetworkSelectComponent Destroy');
  }

  /**
   * 删除 list 列表的 item
   *
   */
  deleteItem(item: any): void {
    console.log(item);
    const temp = [];
    this.list_data.forEach(function (value) {
      if (value['device'] !== item['device']) {
        temp.push(value);
      }
    });
    this.loading = true;
    setTimeout(() => {
      this.list_data = temp;
      this.loading = false;
    }, 100);
    this.select_device_data[item['device']]['data'] = null;
  }

  /**
   * 查看 item 详情
   *
   */
  viewItem(item: any): void {
    console.log(item);
  }

  /**
   * 更新列表
   * @param obj 列表传入数据
   */
  updateTheList(obj: any): void {
    this.loading = true;
    setTimeout(() => {
      this.list_data.push(obj);
      this.loading = false;
    });
  }

  cancel(): void {
    console.log('取消删除');
  }

  hello(name) {
    // console.log(name);
    let temp;
    switch (name) {
      case 'dianchi':
        temp = NetworkSelectBatteryViewComponent;
        break;
      case 'shuilifadianji':
        temp = NetworkSelectTurbineComponent;
        break;
      case 'fenglifadianji':
        temp = NetworkSelectWindTurbineComponent;
        break;
      case 'guangfuzhenlie':
        temp = NetworkSelectPhotovoltaicComponent;
        break;
      case 'changguifadianji':
        temp = NetworkSelectGeneratorComponent;
        break;
      default:
        break;
    }
    const modal = this.modalService.create({
      nzTitle: '设备详情',
      nzContent: temp,
      nzComponentParams: {
        title: name,
        record: {
          id: 1
        }
      },
      nzGetContainer: this.el.nativeElement.querySelector('#battery-view'),
      nzMaskClosable: false,
      nzWidth: '90%',
      nzFooter: [
        {
          label: '关闭',
          shape: 'default',
          onClick: () => modal.destroy()
        },
        {
          label: '确认',
          type: 'primary',
          onClick: () => {
            this.modalService.confirm({
              nzTitle: '提交',
              nzContent: '是否确认选择？',
              nzOnOk: () => modal.getContentComponent().close()
            });
          }
        },
      ]
    });

    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    // Return a result when closed
    modal.afterClose.subscribe((result) => {
      console.log('[afterClose] The result is:', result);
      if (result) {
        switch (result['device']) {
          case 'dianchi':
            if (result['data']['battery_ids'].length > 0) {
              this.select_device_data.battery.data = result['data'];
              this.updateTheList({
                title: '电池',
                device: 'battery',
                avatar: './assets/device/icon-battery.png',
                description: '您已经选择了 ' + result['data']['battery_ids'].length + ' 个电池。',
              });
            } else {
              console.log('数据不合法');
            }
            break;
          case 'shuilifadianji':
            if (result['data']['turbine_ids'].length > 0) {
              this.select_device_data.turbine.data = result['data'];
              this.updateTheList({
                title: '水力发电机',
                device: 'turbine',
                avatar: './assets/device/icon-turbine.png',
                description: '您已经选择了 ' + result['data']['turbine_ids'].length + ' 台水力发电机。',
              });
            } else {
              console.log('数据不合法');
            }
            break;
          case 'fenglifadianji':
            if (result['data']['wind_turbines_ids'].length > 0) {
              this.select_device_data.wind_turbines.data = result['data'];
              this.updateTheList({
                title: '风力发电机',
                device: 'wind_turbines',
                avatar: './assets/device/icon-wind-turbine.png',
                description: '您已经选择了 ' + result['data']['wind_turbines_ids'].length + ' 台风力发电机。',
              });
            } else {
              console.log('数据不合法');
            }
            break;
          case 'guangfuzhenlie':
            if (result['data']['photovoltaic_ids'].length > 0) {
              this.select_device_data.photovoltaic.data = result['data'];
              this.updateTheList({
                title: '光伏阵列',
                device: 'photovoltaic',
                avatar: './assets/device/icon-photovoltaic.png',
                description: '您已经选择了 ' + result['data']['photovoltaic_ids'].length + ' 台光伏发电机。',
              });
            } else {
              console.log('数据不合法');
            }
            break;
          case 'changguifadianji':
            if (result['data']['generator_ids'].length > 0) {
              this.select_device_data.generator.data = result['data'];
              this.updateTheList({
                title: '常规发电机',
                device: 'generator',
                avatar: './assets/device/icon-generator.png',
                description: '您已经选择了 ' + result['data']['generator_ids'].length + ' 台常规发电机。',
              });
            } else {
              console.log('数据不合法');
            }
            break;
          default:
            break;
        }
      }
      // console.log(this.select_device_data);
    });
  }

}
