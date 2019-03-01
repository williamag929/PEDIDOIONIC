import { ListasucesosPage } from './../listasucesos/listasucesos';
import { SucesoPage } from './../suceso/suceso';
import { ListapedidosPage } from './../listapedidos/listapedidos';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClienteServiceProvider } from '../../providers/cliente-service/cliente-service';
import { PedidosPage } from '../../pages/pedidos/pedidos';
import { ListacarteraPage } from '../listacartera/listacartera';
import { Platform, ActionSheetController } from 'ionic-angular';
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
    descuento: number,
    pedidos: number,
    visitas: number,
    cartera: number,
    cotizaciones: number
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
      descuento: 0,
      pedidos: 0,
      visitas: 0,
      cartera: 0,
      cotizaciones: 0
    };
  selectedItem: any;

  coords: {};

  documentos: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    public clienteService: ClienteServiceProvider) {
    this.selectedItem = navParams.get('item');

    console.log('seleccionado', this.selectedItem);

    this.loadClientes();

    this.getLocation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClienteInfoPage');
  }

  //crea pedido nuevo
  pedido(event) {
    //this.navCtrl.setRoot(PedidosPage);

    //mostrar menu por tipo documento
    this.clienteService.GetDocumentos('PE').subscribe(
      data => {
        this.documentos = data;

        //console.log(data);
        //console.log(data[0].tipo)
        if (data.length > 1) {
          this.openMenu();
        }
        else {
          //crear pedido
          this.navCtrl.push(PedidosPage, {
            item: this.cliente, ped_id: 0, ped_tipo: data[0].tipo
          });
        }
      },
      err => {
        console.log(err);
      });



  }

  //lista de pedidos
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

  suceso(event) {
    //this.navCtrl.setRoot(PedidosPage);
    this.navCtrl.push(SucesoPage, {
      item: this.cliente, sucesoid: 0
    });
  }

  sucesos(event) {
    //this.navCtrl.setRoot(PedidosPage);
    this.navCtrl.push(ListasucesosPage, {
      cli_id: this.cliente.cli_id
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


  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Pedido P1',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Pedido P1',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'add-circle' : null,
          handler: () => {
            this.navCtrl.push(PedidosPage, {
              item: this.cliente, ped_id: 0, ped_tipo: 'P1'
            });
          }
        },
        {
          text: 'Pedido P2',
          icon: !this.platform.is('ios') ? 'add-circle' : null,
          handler: () => {
            this.navCtrl.push(PedidosPage, {
              item: this.cliente, ped_id: 0, ped_tipo: 'P2'
            });
          }
        }
      ]
    });
    actionSheet.present();
  }




}
