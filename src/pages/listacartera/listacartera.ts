import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CarteraServiceProvider } from '../../providers/cartera-service/cartera-service';
import { AuthService } from '../../providers/auth-service/auth-service';
import { SucesoPage } from '../suceso/suceso';


/**
 * Generated class for the ListacarteraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-listacartera',
  templateUrl: 'listacartera.html',
  providers: [CarteraServiceProvider,
    AuthService],
})

export class ListacarteraPage {
  public carteras: any;
  public carterasloaded: any;
  selectedItem: any;

  cliente: any;


  username = '';
  email = '';
  vend_id = '';

  cli_nombre = '';
  cli_nit = '';
  cli_suc = '';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public cartera: CarteraServiceProvider) {

    this.selectedItem = navParams.get('item');

    this.cliente = this.selectedItem;

    this.cli_nombre = this.selectedItem.cli_nombre;
    this.cli_nit = this.selectedItem.cli_nit;

    //let info = this.auth.getUserInfo();

    this.loadCartera();

  }


loadCartera(){
  
    //var vend_id = localStorage.getItem('vend_id');
  
    console.log('nit', this.selectedItem);
  
    this.cartera.GetCartera(this.selectedItem.cli_nit).subscribe(
      data => {
        this.carteras = data;
        this.carterasloaded = data;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => console.log('Proceso Completo')
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListacarteraPage');
  }

  suceso(event) {
    //this.navCtrl.setRoot(PedidosPage);
    this.navCtrl.push(SucesoPage, {
      item: this.cliente, sucesoid: 0
    });
  }

  getItems(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;

    //console.log('busca',val);
    //this.clientes = searchfilter(this.clientesloaded,val); 

    this.carteras = this.carterasloaded.filter(function(item) {
      for(let property in item){
        if (item[property] === null){
          continue;
        }
        if(item[property].toString().toLowerCase().includes(val.toLowerCase())){
          return true;
        }
      }
      return false;
    });
  }
}
