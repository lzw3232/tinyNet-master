import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import {ProjectService} from "../../../user-service/project.service";

@Component({
  selector: 'app-network-project-details',
  templateUrl: './project-details.component.html',
})
export class NetworkProjectDetailsComponent implements OnInit {

  tagCheck1 = true;
  tagCheck2 = true;
  tagCheck3 = true;

  loading = 1;

  items = [];
  items_done = [];
  items_none = [];

  constructor(
    private http: _HttpClient,
    private router: Router,
    private projectService: ProjectService,
    private msgSrv: NzMessageService
  ) {
    this.projectService.getProject().subscribe((res)=> {
      console.log(res);
      if (res["errno"] == "0") {
        this.items = res["data"]["data"]["data"];
        this.items_done = res["data"]["data"]["data"].filter(item=>item["state"]==2);
        this.items_none = res["data"]["data"]["data"].filter(item=>item["state"]!=2);
        this.loading = 0;
        this.change();
      } else {
        this.msgSrv.error(res["errmsg"]);
      }
      this.projectService.setCookie("token", res["data"]["data"]["token"]);
    })
  }

  ngOnInit() { }

  generateNewProject() {
    this.router.navigateByUrl('/network/generateProject');
  }

  checkChange (event, index) {
    if (index === 1) {
      if (event === true) {
        this.tagCheck2 = true;
        this.tagCheck3 = true;
      } else {
        this.tagCheck2 = false;
        this.tagCheck3 = false;
      }
    } else if (index === 2) {
      if (event === false) {
        this.tagCheck1 = false;
      } else {
        if (this.tagCheck3 === true) {
          this.tagCheck1 = true;
        }
      }
    } else {
      if (event === false) {
        this.tagCheck1 = false;
      } else {
        if (this.tagCheck2 === true) {
          this.tagCheck1 = true;
        }
      }
    }
    this.change();
  }

  change(){
    if(this.tagCheck1){
      this.items = this.items_done.concat(this.items_none);
    }
    else if(this.tagCheck2){
      this.items = this.items_none;
    }
    else if(this.tagCheck3){
      this.items = this.items_done;
    }
    else{
      this.items = [];
    }
  }

}
