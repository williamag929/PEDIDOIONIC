import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {  Headers } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'



/*
  Generated class for the LocationServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LocationServiceProvider {

  constructor(public http: Http) {
    console.log('Hello LocationServiceProvider Provider');
  }

  //private baseApiUrl = GlobalVariable.BASE_API_URL;
  private baseApiUrl = localStorage.getItem("urlapi");

    data: any;
    private headers: Headers;
  

  SetLocation(object) {
    
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    
        let bodyString = JSON.stringify(object);

        console.log(bodyString);

        console.log("coords"+object.geolocpos);
    
        //let options = new RequestOptions({ headers: this.headers });
    
        var url =  this.baseApiUrl + 'GeoLoc/';
    
        var response = this.http.post(url, bodyString, { headers: this.headers })
        .map(res => res.json())

        return response;
      }
    
    

}
