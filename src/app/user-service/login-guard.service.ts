import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad,
  CanDeactivate
} from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { UserLoginComponent } from '../routes/passport/login/login.component';
import {HttpClient} from "@angular/common/http";
import {apiService} from "./apiService";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  url;
  constructor(
    private router: Router,
    private http: HttpClient,
    private api:apiService,

  ) {
    this.url= this.api.getUrl();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // 权限控制逻辑如 是否登录/拥有访问权限
    return this.isLogin();
  }
  canActivateChild() {
    // 返回false则导航将失败/取消
    // 也可以写入具体的业务逻辑
    return this.isLogin();
  }

  private isLogin(){
    let token = this.api.getCookie("token");
    if(!token || token==""){
      this.router.navigateByUrl('/passport/login');
      return false;
    }
    else{
      return true;
    }
  }
}
