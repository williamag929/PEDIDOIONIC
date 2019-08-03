import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

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

  private baseApiUrl = localStorage.getItem("urlapi");

  data: any;

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

  //retorna los tipos de documentos 
  GetDocumentos(clase) {
    var url = this.baseApiUrl + 'Documentos?clase=' + encodeURI(clase);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

}
