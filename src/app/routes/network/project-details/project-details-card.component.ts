/**
 * Created by liyuze on 19/4/4.
 */

import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {_HttpClient} from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import {ProjectService} from "../../../user-service/project.service";

@Component({
  selector: 'app-project-details-card',
  templateUrl: './project-details-card.component.html',
  styleUrls: ['./project-details-card.component.css']
})
export class NetworkProjectDetailsCardComponent implements OnInit {

  @Input() record;

  detail:boolean;
  result:any;
  interval:any;
  text:any;
  loading:boolean;


  constructor(
    private http: _HttpClient,
    private router: Router,
    private projectService: ProjectService,
    private msgSrv: NzMessageService
  ) {
    this.detail=false;
    this.loading=true;
    this.result={
      no:"0",
      text:"loading..."
    }
  }

  ngOnInit() { }


  getDetail(recorname){
    // this.interval=window.setInterval(()=>{
    //   this.projectService.getProjectDetail(recorname).subscribe((res)=>{
    //     console.log(res);
    //     if(res["errno"]=="0"){
    //       this.text = res["data"]["data"]["data"];
    //       let x = this.text.split("<br/>");
    //       //console.log(x);
    //       for(let i = (x.length-1);i>=0;i--){
    //         if(x[i].search("遗传算法第")!=-1){
    //           // console.log(x[i]);
    //           var reg =/[\u4e00-\u9fa5]/g;
    //           this.result.no = String(Math.ceil(x[i].replace(reg, "")/99*100));
    //           this.loading=false;
    //           break;
    //         }
    //       }
    //     }
    //     else if(res["errno"]=="2"){
    //       this.projectService.tologin();
    //     }
    //     else{
    //       this.msgSrv.error(res["errmsg"]);
    //     }
    //     this.projectService.setCookie("token",res["data"]["data"]["token"]);
    //   })
    // },"1000");

      this.projectService.getProjectOutput(recorname).subscribe((res)=>{
        if(res["errno"]=="0"){
          console.log(res);
          this.loading = false;
        }
        else if(res["errno"]=="2"){
          this.projectService.tologin();
        }
        else{
          this.msgSrv.error(res["errmsg"]);
        }
        this.projectService.setCookie("token",res["data"]["data"]["token"]);
      })
      this.detail=true;
  }

  handleCancel(){
    this.detail=false;
    window.clearInterval(this.interval);
    this.loading = true;
  }

}
