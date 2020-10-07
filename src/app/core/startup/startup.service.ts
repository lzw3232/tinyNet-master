import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { DA_SERVICE_TOKEN, TokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';
import {apiService} from "../../user-service/apiService";

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    private menuService: MenuService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private httpClient: HttpClient,
    private injector: Injector,
    private apiService: apiService,
  ) { }

  private viaHttp(resolve: any, reject: any) {
    zip(
      this.httpClient.get('assets/tmp/app-data.json')
    ).pipe(
      // 接收其他拦截器后产生的异常消息
      catchError(([appData]) => {
          resolve(null);
          return [appData];
      })
    ).subscribe(([appData]) => {

      // application data
      const res: any = appData;
      // 应用信息：包括站点名、描述、年份
      this.settingService.setApp(res.app);
      // 用户信息：包括姓名、头像、邮箱地址
      this.settingService.setUser(res.user);
      // ACL：设置权限为全量
      this.aclService.setFull(true);
      // 初始化菜单
      this.menuService.add(res.menu);
      // 设置页面标题的后缀
      this.titleService.suffix = res.app.name;
    },
    () => { },
    () => {
      resolve(null);
    });
  }

  public set_user(){
    //lz未解决：此文件不能调用外部文件，如apiService中的函数，原因不明，所以目前只能在这里获取cookie，或者这里重新发送post/get请求获得个人信息
    var name;
    var arr,reg=new RegExp("(^| )name=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
      name=unescape(arr[2]);
    else
      name=null;

    const user: any = {
      name: name,
      avatar: './assets/tmp/img/avatar.jpg',
      email: 'lzw32321226@163.com',
    };


    this.settingService.setUser(user);
  }

  private viaMock(resolve: any, reject: any) {
    // const tokenData = this.tokenService.get();
    // if (!tokenData.token) {
    //   this.injector.get(Router).navigateByUrl('/passport/login');
    //   resolve({});
    //   return;
    // }
    // mock
    const app: any = {
      name: `ng-alain`,
      description: `Ng-zorro admin panel front-end framework`
    };

    const user: any = {
      name: "name",
      avatar: './assets/tmp/img/avatar.jpg',
      email: 'lzw32321226@163.com',
      token: '123456789'
    };

    // 应用信息：包括站点名、描述、年份
    this.settingService.setApp(app);
    // 用户信息：包括姓名、头像、邮箱地址
    //this.settingService.setUser(user);
    this.set_user();
    // ACL：设置权限为全量
    this.aclService.setFull(true);
    // 初始化菜单
    this.menuService.add([
      {
        text: '主导航',
        group: true,
        children: [
          {
            text: '工作台',
            link: '/dashboard',
            icon: 'anticon anticon-appstore-o',
            shortcutRoot: true,
            // reuse: false,
          },
          {
            text: '微电网管理',
            icon: 'anticon anticon-global',
            children: [
              {
                text: '新建方案',
                link: '/network/generateProject',
                // reuse: false,
              },
              {
                text: '方案详情',
                link: '/network/projects',
                // reuse: false,
              },
              // {
              //   text: '设备管理',
              //   // link: '/sys/log',
              //   // reuse: false,
              // }
            ]
          },
          {
            text: '设备管理',
            icon: 'anticon anticon-database',
            children: [
              {
                text: '电池',
                link: '/device/batteryDetail',
                // reuse: false,
              },
              {
                text: '风机',
                link: '/device/windGeneratorDetail',
                // reuse: false,
              },
              {
                text: '水轮机',
                link: '/device/turbineDetail',
                // reuse: false,
              },
              {
                text: '光伏',
                link: '/device/photovoltaicDetail',
                // reuse: false,
              },
              {
                text: '发电机',
                link: '/device/generatorDetail',
                // reuse: false,
              },
              {
                text: '燃气轮机',
                link: '/device/gasTurbineDetail',
                // reuse: false,
              },
              {
                text: '燃气内燃机',
                link: '/device/GasEngineDetail',
                // reuse: false,
              },
              {
                text: '电锅炉',
                link: '/device/electricBoilerDetail',
                // reuse: false,
              },
              {
                text: '燃气热水锅炉',
                link: '/device/gasBoilerDetail',
                // reuse: false,
              },
              {
                text: '燃气蒸汽锅炉',
                link: '/device/gasSteamDetail',
                // reuse: false,
              },
              {
                text: '热泵',
                link: '/device/heatPumpDetail',
                // reuse: false,
              },
              {
                text: '电制冷机',
                icon: 'anticon anticon-rocket',
                children: [
                  {
                    text: '涡旋式电制冷机',
                    link: '/device/scrollDetail',
                    // reuse: false,
                  },
                  {
                    text: '螺杆式电制冷机',
                    link: '/device/screwDetail',
                    // reuse: false,
                  },
                  {
                    text: '离心式电制冷机',
                    link: '/device/centrifugalDetail',
                    // reuse: false,
                  },
                  ]
                // reuse: false,
              },
              {
                text: '溴化锂空调',
                link: '/device/lithiumBromideDetail',
                // reuse: false,
              },
              {
                text: '直燃型溴化锂空调',
                link: '/device/DirectFiredLithiumBromideDetail',
                // reuse: false,
              },
              {
                text: '双工况主机',
                link: '/device/hostDetail',
                // reuse: false,
              },
              {
                text: '蓄热装置',
                link: '/device/heatStorageDetail',
                // reuse: false,
              },
              {
                text: '蓄冰装置',
                link: '/device/iceStorageDetail',
                // reuse: false,
              },
              {
                text: '余热锅炉',
                link: '/device/residualHeatDetail',
                // reuse: false,
              },
              {
                text: '板式换热器',
                link: '/device/plateHeatDetail',
                // reuse: false,
              },
              {
                text: '核电机组',
                link: '/device/nuclearDetail',
                // reuse: false,
              },
            ]
          },
          {
            text: '系统管理',
            icon: 'anticon anticon-rocket',
            // link: '/sys/log',
            // shortcutRoot: true,
            children: [
              {
                text: '日志管理',
                link: '/sys/log',
                // reuse: false,
              },
              // {
              //   text: '用户管理',
              //   // link: '/sys/log',
              //   // reuse: false,
              // },
              // {
              //   text: '付费管理',
              //   // link: '/sys/log',
              //   // reuse: false,
              // }
            ]
          },
        ]
      },
    ]);
    // 设置页面标题的后缀
    this.titleService.suffix = app.name;

    resolve({});
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      // this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      this.viaMock(resolve, reject);
    });
  }
}
