import { Injectable } from '@angular/core';
import {apiService} from "./apiService";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {valueFunctionProp} from "ng-zorro-antd/src/core/util/convert";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


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

  login(name,password):Observable<any>{
    let serverurl = this.url+"/login";
    var header = this.api.getHeaders();
    let data={
      "username":name,
      "password":password
    };
    // @ts-ignore
    return this.http.post(serverurl, data, header);
  }

  setCookie(name:string,value:string){
    console.log(value);
    this.api.setCookie(name,value);
  }


}
