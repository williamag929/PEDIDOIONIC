import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClienteServiceProvider } from '../../providers/cliente-service/cliente-service';
import { PedidosPage } from '../../pages/pedidos/pedidos';
import { ClienteInfoPage } from '../../pages/cliente-info/cliente-info';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html',
  providers: [ClienteServiceProvider]
})

export class ClientesPage {
  public clientes: any;
  public clientesloaded: any;
  selectedItem: any;
  username = '';
  email = '';
  vend_id = '';
  urlapi = '';
  location = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public clienteService: ClienteServiceProvider,
    private auth: AuthService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    let info = this.auth.getUserInfo();

    this.username = info['name'];
    this.email = info['email'];
    this.vend_id = info['vend_id'];
    this.urlapi = info['urlapi'];


    console.log('login', this.username);

    localStorage.setItem('vend_id', this.vend_id);

    this.loadClientes();

  }

  loadClientes() {

    var vend_id = localStorage.getItem('vend_id');

    console.log('vendedor', vend_id);



    this.clienteService.GetClientes(vend_id).subscribe(
      data => {
        this.clientes = data;
        this.clientesloaded = data;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => console.log('Proceso Completo')
    );

  }

  //busqueda inteligente usando espacios
  getItems(ev: any) {

    let val = ev.target.value;
    //lee el objeto y lo convierte a un array
    let fObj = val.split(" ");

    //reinicia la busqueda
    this.clientes = this.clientesloaded;

    //por cada elemento realiza la busqueda
    fObj.forEach(element => {
      //acumula la busqueda
      this.clientes = this.clientes.filter(function (item) {
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

    console.log(item);

    //this.navCtrl.setRoot(PedidosPage);
    this.navCtrl.push(PedidosPage, {
      item: item, ped_id: 0
    });
  }

  vercliente(event, item) {
    // That's right, we're pushing to ourselves!

    console.log(item);

    //this.navCtrl.setRoot(PedidosPage);
    this.navCtrl.push(ClienteInfoPage, {
      item: item
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      var self = this;
      navigator.geolocation.getCurrentPosition(function (response) {
        self.showPosition(response, self);
      }, function () {
        alert("Unable to get GPS Location");
      }, {
          enableHighAccuracy: true
        });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }


  showPosition(position: any, self: any) {

    console.log("Coordenadas",position.coords);


  }




}
