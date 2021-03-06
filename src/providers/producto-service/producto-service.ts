import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProductoServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProductoServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ProductoServiceProvider Provider');
  }

  //private baseApiUrl = GlobalVariable.BASE_API_URL;
  private baseApiUrl = localStorage.getItem("urlapi");



    GetProductos(pedid) {
    var url = this.baseApiUrl + 'producto/' + encodeURI(pedid);
    var response = this.http.get(url).map(res => res.json());
    return response;

  }

  GetProducto(pedid,pro_id) {
    var url = this.baseApiUrl + 'producto?id=' + encodeURI(pedid)+'&pro_id='+encodeURI(pro_id);
    var response = this.http.get(url).map(res => res.json());
    return response;
    
  }

  GetProductosCot(cotid) {
    var url = this.baseApiUrl + 'productoCot/' + encodeURI(cotid);
    var response = this.http.get(url).map(res => res.json());
    return response;

  }

  GetProductoCot(cotid,pro_id) {
    var url = this.baseApiUrl + 'productoCot?id=' + encodeURI(cotid)+'&pro_id='+encodeURI(pro_id);
    var response = this.http.get(url).map(res => res.json());
    return response;
    
  }


}
