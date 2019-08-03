import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the VendedorServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class VendedorServiceProvider {

  constructor(public http: Http) {
    console.log('Hello VendedorServiceProvider Provider');
  }

  //private baseApiUrl = GlobalVariable.BASE_API_URL;
  private baseApiUrl = localStorage.getItem("urlapi");
  
    data: any;
  
    //http://localhost:5000/api/vcliente/
    //${this.config.apiEndpoint}
    GetVendedores() {
  
      var url = this.baseApiUrl + 'vendedor';
      var response = this.http.get(url).map(res => res.json());
      return response;
    }
  
    GetVendedor(user) {
      var url = this.baseApiUrl + 'vendedor/' + encodeURI(user);
      var response = this.http.get(url).map(res => res.json());
      return response;
    }

    GetDataChar(vend_id, clase)
    {
      var url = this.baseApiUrl + 'DashBoard?vend_id='+vend_id+'&clase=' + encodeURI(clase);
      var response = this.http.get(url).map(res => res.json());
      return response;

    }

  }
  
