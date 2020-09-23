import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";

@Injectable({
  providedIn: 'root'
})
export class apiService {

  constructor(
    private router: Router,
    private msgSrv: NzMessageService) {
  }

  getUrl(): string {
    return 'http://localhost:8080';
    //return 'api/v1';
  }

  getHeaders(): Headers {
    return new Headers({
      'Access-Control-Allow-Origin':' *',
      'FromAgent':'Broswer',
      'Content-Type': 'application/json',
      'Authorization':'my-auth-token',
      "Access-Control-Allow-Headers":"X-Requested-With",
      "token":"dsds"
    });
  }
  getCookie(name: string):String
  {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))

      return unescape(arr[2]);
    else
      return null;
  }


  setCookie(name: string,value: string)
  {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toString();
  }

  tologin(){
    this.msgSrv.create('error', `登陆超时，请重新登录`);
    this.setCookie("token","");
    this.router.navigateByUrl('/passport/login');
  }

}
