import { Injectable } from '@angular/core';
import {apiService} from "./apiService";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {valueFunctionProp} from "ng-zorro-antd/src/core/util/convert";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  url;
  constructor(private http: HttpClient,private api:apiService) {
    this.url= this.api.getUrl();
  }

  private handleError(error:String):void{
    console.error("dsds");
  }
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // };

  add(value:object):Observable<any>{
    let serverurl = this.url+"/tinyNet/record/add";
    let token = this.api.getCookie("token");
    let data={
      "token":token,
      record:value,
    };
    // @ts-ignore
    return this.http.post(serverurl, data, this.api.getHeaders());
  }

  action(value:object):Observable<any>{
    let serverurl = this.url+"/tinyNet/record/action";
    let token = this.api.getCookie("token");
    let data={
      "token":token,
      record:value,

    };
    // @ts-ignore
    return this.http.post(serverurl, data, this.api.getHeaders());
  }

  getProjectDetail(recordname:string):Observable<any>{
    let serverurl = this.url+"/tinyNet/record/getRes";
    let token = this.api.getCookie("token");
    let data={
      "token":token,
      "recordname":recordname,
    };
    // @ts-ignore
    return this.http.post(serverurl, data, this.api.getHeaders());
  }

  getProjectOutput(recordname:string):Observable<any>{
    let serverurl = this.url+"/tinyNet/record/getOutput";
    let token = this.api.getCookie("token");
    let data={
      "token":token,
      "recordname":recordname,
    };
    // @ts-ignore
    return this.http.post(serverurl, data, this.api.getHeaders());
  }

  getProject():Observable<any>{
    let serverurl = this.url+"/tinyNet/record/list";
    let token = this.api.getCookie("token");
    let data={
      "token":token,
    };
    // @ts-ignore
    return this.http.post(serverurl, data, this.api.getHeaders());
  }

  tologin(){
    this.api.tologin();
  }


  setCookie(name:string,value:string){
    this.api.setCookie(name,value);
  }


}
