import { Injectable } from '@angular/core';
import { Http,Request } from '@angular/http';
import { RequestOptions, Headers, Response } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { Observable } from "rxjs/Observable";

import { GlobalVariable} from '../../app/app.config';

/*
  Generated class for the ClienteServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/


@Injectable()
export class ClienteServiceProvider {

  static get parameters() {
    return [[Http]];
  }

  iconfig: string;

  constructor(private http: Http) {
    console.log('Hello ClienteServiceProvider Provider');

  }

  private baseApiUrl = GlobalVariable.BASE_API_URL;

  data: any;
  private headers: Headers;

  GetClientes(vend_id) {
    var url = this.baseApiUrl + 'vcliente/' + encodeURI(vend_id);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }



  GetCliente(cli_id) {
    var url = this.baseApiUrl + 'cliente/' + encodeURI(cli_id);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }
}
