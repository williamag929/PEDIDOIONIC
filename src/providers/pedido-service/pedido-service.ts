import { Injectable } from '@angular/core';
import { Http,Request } from '@angular/http';
import { RequestOptions, Headers, Response } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { Observable } from "rxjs/Observable";

import { GlobalVariable} from '../../app/app.config';

/*
  Generated class for the PedidoServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PedidoServiceProvider {

  constructor(public http: Http) {
    console.log('Hello PedidoServiceProvider Provider');
  }

  private baseApiUrl = GlobalVariable.BASE_API_URL;

  data: any;
  private headers: Headers;

  GetPedidos(vend_id) {
    var url = this.baseApiUrl + 'vpedido/' + encodeURI(vend_id);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  GetPedido(ped_id) {
    var url = this.baseApiUrl +'pedido/' + encodeURI(ped_id);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  SetPedido(object) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

    let bodyString = JSON.stringify(object);

    console.log(bodyString);

    //let options = new RequestOptions({ headers: this.headers });

    var url =  this.baseApiUrl + 'pedido/';

    var response = this.http.post(url, bodyString, { headers: this.headers })
    .map(res => res.json())

    return response;

  }


  GetPedidosdet(ped_id) {
    var url =  this.baseApiUrl + 'vpedidodet/' + encodeURI(ped_id);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  GetPedidodet(ped_det_id) {
    var url =  this.baseApiUrl + 'pedidodet/' + encodeURI(ped_det_id);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  SetPedidodet(object) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

    let bodyString = JSON.stringify(object);

    //let options = new RequestOptions({ headers: this.headers });

    var url =  this.baseApiUrl + 'pedidodet/';

    var response = this.http.post(url, bodyString, { headers: this.headers })
    .map(res => res.json())

    return response;
  }

  DeletePedidodet(object) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

    let bodyString = JSON.stringify(object);

    //let options = new RequestOptions({ headers: this.headers });

    var url =  this.baseApiUrl + 'pedidodet/';

    var response = this.http.delete(url,bodyString).map(res => res.json())

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
