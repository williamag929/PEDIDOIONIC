import { AppSetting } from './../../app/app.config';
import { Injectable } from '@angular/core';
import { Http,Request } from '@angular/http';
import { RequestOptions, Headers, Response } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { Observable } from "rxjs/Observable";
import {DomSanitizer} from '@angular/platform-browser';

import { GlobalVariable} from '../../app/app.config';

/*
  Generated class for the cotizacionServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CotizacionServiceProvider {


  constructor(public http: Http) {
    console.log('Hello cotizacionServiceProvider Provider');
  }

  //private baseApiUrl = GlobalVariable.AppSetting;
  private baseApiUrl = localStorage.getItem("urlapi");

  data: any;
  private headers: Headers;

  Getcotizaciones(vend_id) {
    var url = this.baseApiUrl + 'vcotizacion/' + encodeURI(vend_id);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  Getcotizacion(cot_id) {
    var url = this.baseApiUrl +'cotizacion/' + encodeURI(cot_id);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  GetDocumentos(clase) {
    var url = this.baseApiUrl + 'Documentos?clase=' + encodeURI(clase);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }


  Sendcotizacion(object) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

    let bodyString = JSON.stringify(object);

    console.log(bodyString);

    //let options = new RequestOptions({ headers: this.headers });
    var url = this.baseApiUrl +'cotizacionPdf/';
    var response = this.http.post(url, bodyString, { headers: this.headers })
    .map(res => res.json())

    return response;    
  }

  GetPdf(cot_id) {

    //this.headers = new Headers();
    //this.headers.append('Content-Type', 'application/json');


    var url = this.baseApiUrl +'cotizacionPdf/'+ + encodeURI(cot_id);
    var response = this.http.get(url).map(res => res.json());
    return response;
 
  }


  Setcotizacion(object) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

    let bodyString = JSON.stringify(object);

    console.log(bodyString);

    //let options = new RequestOptions({ headers: this.headers });

    var url =  this.baseApiUrl + 'cotizacion/';

    var response = this.http.post(url, bodyString, { headers: this.headers })
    .map(res => res.json())

    return response;

  }


  Getcotizacionesdet(cot_id) {
    var url =  this.baseApiUrl + 'vcotizaciondet/' + encodeURI(cot_id);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  Getcotizaciondet(cot_det_id) {
    var url =  this.baseApiUrl + 'cotizaciondet/' + encodeURI(cot_det_id);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  Setcotizaciondet(object) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

    let bodyString = JSON.stringify(object);

    //let options = new RequestOptions({ headers: this.headers });

    var url =  this.baseApiUrl + 'cotizaciondet/';

    var response = this.http.post(url, bodyString, { headers: this.headers })
    .map(res => res.json())

    return response;
  }

  Deletecotizaciondet(object) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');


    let bodyString = JSON.stringify({id: object});

    console.log("borrar",bodyString);

    //let options = new RequestOptions({ headers: this.headers });

    var url =  this.baseApiUrl + 'cotizaciondet?id='+object;

    var response = this.http.delete(url).map(res => res.json())

    //var response = this.http.delete(url, bodyString, { headers: this.headers }).map(res => res.json())
    

    return response;
  }

  public handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


  saveJwt(jwt: string) {
    if (jwt) localStorage.setItem('status', jwt)
  }

  logError(err: any) {
    console.log(err);
  }


}
