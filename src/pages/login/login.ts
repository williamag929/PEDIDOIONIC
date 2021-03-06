import { Component } from '@angular/core';
import { NavController,LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ClientesPage } from '../../pages/clientes/clientes';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
 
  constructor(private nav: NavController, private auth: AuthService, 
     private loadingCtrl: LoadingController) { }
 
  public createAccount() {
    this.nav.push('RegisterPage');
  }

  ionViewDidLoad() 
 {

  this.registerCredentials.email =         localStorage.getItem('email');
  this.registerCredentials.password =   localStorage.getItem('password'); 

 }
  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {   

        localStorage.setItem('email', this.registerCredentials.email);
        localStorage.setItem('password', this.registerCredentials.password);        
        //establer urlApi
        //establecer vendedor
        console.log("Access Enabled");
        //this.nav.push(HomePage);  
        this.nav.setRoot(ClientesPage);   
        //this.nav.setRoot('HomePage');
      } else {
        console.log("Access Denied");
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    //let alert = this.alertCtrl.create({
    //  title: 'Fail',
    //  subTitle: text,
    //  buttons: ['OK']
    //});
    //alert.present(prompt);
  }
}
