import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { GlobalVariable} from '../../app/app.config';

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

  private baseApiUrl = GlobalVariable.BASE_API_URL;

    GetProductos(pedid) {
    var url = this.baseApiUrl + 'producto/' + encodeURI(pedid);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }


}
