import { Injectable } from '@angular/core';
import { Http,Request } from '@angular/http';
import { RequestOptions, Headers, Response } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { Observable } from "rxjs/Observable";
import { GlobalVariable } from '../../app/app.config';



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

  private baseApiUrl = GlobalVariable.BASE_API_URL;
  
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
