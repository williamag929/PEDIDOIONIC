import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the CarteraServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CarteraServiceProvider {

  constructor(public http: Http) {
    console.log('Hello CarteraServiceProvider Provider');
  }

  private baseApiUrl = localStorage.getItem("urlapi");
  //private baseApiUrl = GlobalVariable.BASE_API_URL;
  
    data: any;
  
    //http://localhost:5000/api/vcliente/
    //${this.config.apiEndpoint}
    GetCartera(cli_nit) {
      var url = this.baseApiUrl + 'vcartera/' + encodeURI(cli_nit);
      var response = this.http.get(url).map(res => res.json());
      return response;
    }
  
}
