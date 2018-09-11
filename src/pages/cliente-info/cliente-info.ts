import { ListapedidosPage } from './../listapedidos/listapedidos';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClienteServiceProvider } from '../../providers/cliente-service/cliente-service';
import { PedidosPage } from '../../pages/pedidos/pedidos';
import { ListacarteraPage } from '../listacartera/listacartera';
import { MapaPage } from '../mapa/mapa'


/**
 * Generated class for the ClienteInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-cliente-info',
  templateUrl: 'cliente-info.html',
  providers: [ClienteServiceProvider]
})
export class ClienteInfoPage {

  cliente: {
    cli_id: number,
    cli_suc: number,
    cli_nit: string,
    cli_nombre: string,
    cli_direccion: string,
    cli_ciudad: string,
    cli_depto: string,
    cli_pais: string,
    cli_phone1: string,
    cli_phone2: string,
    cli_cupo: number,
    cli_estado: string,
    pedidos : number,
    visitas: number,
    cartera:number,
    cotizaciones:number
  } = {
      cli_id: 0,
      cli_suc: 0,
      cli_nit: '',
      cli_nombre: '',
      cli_direccion: '',
      cli_ciudad: '',
      cli_depto: '',
      cli_pais: '',
      cli_phone1: '',
      cli_phone2: '',
      cli_cupo: 0,
      cli_estado: '',
      pedidos:0,
      visitas:0,
      cartera:0,
      cotizaciones:0
    };
  selectedItem: any;

  coords: {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public clienteService: ClienteServiceProvider) {
    this.selectedItem = navParams.get('item');

    console.log('seleccionado', this.selectedItem);

    this.loadClientes();

    this.getLocation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClienteInfoPage');
  }

  pedido(event) {
    //this.navCtrl.setRoot(PedidosPage);
    this.navCtrl.push(PedidosPage, {
      item: this.cliente, ped_id: 0
    });
  }

  
  pedidos(event) {
    //this.navCtrl.setRoot(PedidosPage);
    this.navCtrl.push(ListapedidosPage, {
      cli_id: this.cliente.cli_id
    });
  }

  cartera(event) {
    //this.navCtrl.setRoot(PedidosPage);
    this.navCtrl.push(ListacarteraPage, {
      item: this.cliente
    });
  }

  vermapa(event) {
    //this.navCtrl.setRoot(PedidosPage);
    this.navCtrl.push(MapaPage, {
      item: this.coords,
      address: this.cliente.cli_direccion
    });
  }

  loadClientes() {

    var cli_id = this.selectedItem.cli_id;

    console.log('cli_loaded', cli_id);

    this.clienteService.GetCliente(cli_id).subscribe(
      data => {
        this.cliente = data;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => console.log('Proceso Completo')
    );

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

    console.log("Coordenadas", position.coords);
    this.coords = position.coords;

  }



}
