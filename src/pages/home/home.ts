import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username = '';
  email = '';

  constructor(private navCtrl: NavController, private auth: AuthService) {
    
    console.log('Iniciando Home')
    let info = this.auth.getUserInfo();
    //this.username = info['name'];
    //this.email = info['email'];

        this.username = 'user';
        this.email = 'mail';

    localStorage.setItem('vend_id', '99');
  }
 
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage)
    });
  }
}
