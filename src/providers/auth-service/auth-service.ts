import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { VendedorServiceProvider } from '../../providers/vendedor-service/vendedor-service';
import { GlobalVariable, AppSetting} from '../../app/app.config';
import { Http } from '@angular/http';
import { urlToNavGroupStrings } from 'ionic-angular/umd/navigation/url-serializer';

 
export class User {
  name: string;
  email: string;
  vend_id : string;
  urlapi : string;
 
  constructor( name: string, email: string, vend_id: string, urlapi: string) {
    this.name = name;
    this.email = email;
    this.vend_id = vend_id;
    this.urlapi = urlapi
  }
}

//https://devdactic.com/login-ionic-2/

//https://www.raymondcamden.com/2016/11/04/an-example-of-the-ionic-auth-service-with-ionic-2
 
@Injectable()
export class AuthService {

  constructor(public http: Http) {
    console.log('Hello VendedorServiceProvider Provider');
  }

  currentUser: User;
 
  //public baseApiUrl = GlobalVariable.BASE_API_URL;

  public login(credentials) {

    var baseApiUrl = GlobalVariable.LOG_API_URL;

    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      //

      return Observable.create(observer => {
        
        this.http.get(baseApiUrl+ 'loguser?user='+credentials.email+'&password='+credentials.password)
        .map(res => res.json())
        .subscribe(data =>
        {
          console.log(data);
          console.log(credentials);//you can format the response from your server

          //GlobalVariable.BASE_API_URL = data.urlapi;
          localStorage.setItem('vend_id', data.vend_id);
          localStorage.setItem('urlapi', data.urlapi);

          let access = (data.usuario == credentials.email  && data.clave == credentials.password);
          this.currentUser = new User(data.usuario, data.email, data.vend_id, data.urlapi);
          observer.next(access);// data.usuario != "" and then return data
          observer.complete();




        });
        });
        
              
      //
      //return Observable.create(observer => {

        //let access = (credentials.password === "pass" && credentials.email === "email");
        //this.currentUser = new User('Simon', 'saimon@devdactic.com');
        //observer.next(access);
        //observer.complete();
      //});
    }
  }
 
  private baseApiUrl = GlobalVariable.LOG_API_URL;

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }


  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}