//import { HttpClient } from '@angular/common/http';
import { Http,Request } from '@angular/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../../app/app.config';
import { RequestOptions, Headers, Response } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

/*
  Generated class for the SucesoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SucesoServiceProvider {

  constructor(public http: Http) {
    console.log('Hello SucesoServiceProvider Provider');
  }

  private baseApiUrl = GlobalVariable.BASE_API_URL;
  
  data: any;
  private headers: Headers;




  GetSucesos(vend_id) {
    var url = this.baseApiUrl + 'vsuceso/' + encodeURI(vend_id);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  GetSuceso(id) {
    var url = this.baseApiUrl +'suceso/' + encodeURI(id);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  SetSuceso(object) {
    
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

    let bodyString = JSON.stringify(object);

    console.log(bodyString);

    //let options = new RequestOptions({ headers: this.headers });

    var url =  this.baseApiUrl + 'suceso/';

    var response = this.http.post(url, bodyString, { headers: this.headers })
    .map(res => res.json())

    return response;
  }

  DeleteSuceso(object) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');


    let bodyString = JSON.stringify({id: object});

    console.log("borrar",bodyString);


    var url =  this.baseApiUrl + 'suceso?id='+object;

    var response = this.http.delete(url).map(res => res.json())

   

    return response;
  }

}
