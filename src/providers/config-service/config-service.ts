import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { Http } from '@angular/http';


/*
  Generated class for the ConfigServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ConfigServiceProvider Provider');
  }

  
  private baseApiUrl = localStorage.getItem("urlapi");

  data: any;

  GetConfig() {
    var url = this.baseApiUrl + 'config/';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }


}
