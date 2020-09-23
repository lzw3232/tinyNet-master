import { Injectable } from '@angular/core';
import {apiService} from "./apiService";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {


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

  add(value:string,name:string):Observable<any>{
    let serverurl = this.url+"/tinyNet/device/"+name+"/add";
    let data = {
      "token":this.api.getCookie("token")
    }
    data[name]=value;
    console.log(data);
    // @ts-ignore
    return this.http.post(serverurl, data, this.api.getHeaders());
  }

  list(pi:Number,ps:Number,val:string,name:string):Observable<any>{
    let serverurl = this.url+"/tinyNet/device/"+name+"/list";
    let data = {
      "ps":ps,
      "pi":pi,
      "val":val,
      "token":this.api.getCookie("token")
    }
    // @ts-ignore
    return this.http.post(serverurl,data,this.api.getHeaders());
  }

  select(id:Number,name:string):Observable<any>{
    let serverurl = this.url+"/tinyNet/device/"+name+"/select"
    let data = {
      "id":id,
      "token":this.api.getCookie("token")
    }
    // @ts-ignore
    return this.http.post(serverurl,data,this.api.getHeaders());
  }

  update(value:string,name:string):Observable<any>{
    let serverurl = this.url+"/tinyNet/device/"+name+"/update"
    let data = {
      "token":this.api.getCookie("token")
    }
    data[name]=value;
    // @ts-ignore
    return this.http.post(serverurl,data,this.api.getHeaders());
  }

  delete(id:Number,name:string):Observable<any>{
    let serverurl = this.url+"/tinyNet/device/"+name+"/delete";
    let data = {
      "id":id,
      "token":this.api.getCookie("token")
    }
    // @ts-ignore
    return this.http.post(serverurl,data,this.api.getHeaders());
  }


  tologin(){
    this.api.tologin();
  }

  setCookie(name:string,value:string){
    this.api.setCookie(name,value);
  }


}
