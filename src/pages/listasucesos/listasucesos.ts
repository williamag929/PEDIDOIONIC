import { SucesoPage } from './../suceso/suceso';
import { SucesoServiceProvider } from './../../providers/suceso-service/suceso-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListasucesosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-listasucesos',
  templateUrl: 'listasucesos.html',
})
export class ListasucesosPage {

  
  sucesomodel: {
    sucesoid: number,
    vend_id: number,
    cli_id: number,
    fecha: any,
    tiempo: number,
    cadena: string,
    nota: string,
    tipo: string
  } =
    {
      sucesoid: 0,
      vend_id: 0,
      cli_id: 0,
      fecha: '',
      tiempo: 0,
      cadena: '',
      nota: '',
      tipo: ''
    }

    public sucesos: any;
    public sucesosloaded: any;
    selectedItem: any;
    cliente:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public sucesoService:SucesoServiceProvider) {
  }

  ionViewDidLoad() {

    
    var vend_id = localStorage.getItem('vend_id');
    this.cliente = this.navParams.get('cli_id');
    console.log('ionViewDidLoad ListasucesosPage');
    console.log('vendped',vend_id);
    
    this.sucesoService.GetSucesos(vend_id).subscribe(
      data => {
        this.sucesos = data;
        this.sucesosloaded = data;

        if (this.cliente > 0)
       {
          this.sucesos = this.filtercliente(this.cliente,"cli_id");
          this.sucesosloaded = this.sucesos;
        }

        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => console.log('Proceso Completo')
    );

  }

  filtercliente(element,field) {
    let results = [];
    results = this.sucesos.filter(function (item) {
      //por cada propieda del item busca
      for (let property in item) {
        //si la propieda es null continua
        if (item[field] === null) {
          continue;
        }
        //si la busqueda es acertada retorna true
        if (item[field] == element) {
          return true;
        }
      }
      //si no se cumple retorna falso
      return false;
    });
    return results
  }

  getItems(ev: any) {

    let val = ev.target.value;
    //lee el objeto y lo convierte a un array
    let fObj = val.split(" ");

    //reinicia la busqueda
    this.sucesos = this.sucesosloaded;

    //por cada elemento realiza la busqueda
    fObj.forEach(element => {
      //acumula la busqueda
      this.sucesos = this.sucesos.filter(function (item) {
        //por cada propieda del item busca
        for (let property in item) {
          //si la propieda es null continua
          if (item[property] === null) {
            continue;
          }
          //si la busqueda es acertada retorna true
          if (item[property].toString().toLowerCase().includes(element.toLowerCase())) {
            return true;
          }
        }
        //si no se cumple retorna falso
        return false;
      });
    });
  
  }



  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!

    console.log('Ped Sel',item);

    //this.navCtrl.setRoot(PedidosPage);
    this.navCtrl.push(SucesoPage, {
      item: item, sucesoid: item.sucesoid
    });
  }
}

