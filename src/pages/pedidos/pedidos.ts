import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PedproductosPage } from '../../pages/pedproductos/pedproductos';
import { PedidoServiceProvider } from '../../providers/pedido-service/pedido-service';
import { LocationServiceProvider } from '../../providers/location-service/location-service';

import { ClienteServiceProvider } from '../../providers/cliente-service/cliente-service';
import { Platform, ActionSheetController } from 'ionic-angular';
import { DecimalPipe } from '@angular/common';
import { File } from '@ionic-native/file';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer } from '@ionic-native/file-transfer';

import { GlobalVariable } from '../../app/app.config';




//import { ModalController } from 'ionic-angular';
//import { ModalPage } from '../pages/modal-page';

/**
 * Generated class for the PedidosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html'
  //template: '<pdf-viewer [src]="pdfSrc" [show-all]="true"></pdf-viewer>'
})
export class PedidosPage {
  cliente: {
    cli_id: number, cli_nombre: string,
    cli_direccion: string
  } = {
      cli_id: 0,
      cli_nombre: '',
      cli_direccion: ''
    };

  pdfSrc: any;

  cli_nombre: string;

  pedido: {
    ped_id: number,
    ped_numero: number,
    ped_tipo: string,
    cli_id: number,
    cli_suc: number,
    vend_id: number,
    ped_fecha: any,
    ped_fec_ent: any,
    ped_subtotal: number,
    ped_impuesto: number,
    ped_total: number,
    ped_desc: number,
    ped_procesado: boolean,
    ped_closed: boolean,
    ped_note: string
  } = {
      ped_id: 0,
      ped_numero: 0,
      ped_tipo: '',
      cli_id: 0,
      cli_suc: 0,
      vend_id: 0,
      ped_fecha: '',
      ped_fec_ent: '',
      ped_subtotal: 0,
      ped_impuesto: 0,
      ped_total: 0,
      ped_desc: 0,
      ped_procesado: false,
      ped_closed: false,
      ped_note: ''
    };

  ped_det: { ped_det_id: number, ped_id: number, pro_id: string, pro_nom: string, cant: number, precio: number, porc_desc: number, val_desc: number, porc_imp: number, val_imp: number, subtotal: number }
    = { ped_det_id: 0, ped_id: 0, pro_id: '', pro_nom: '', cant: 0, precio: 0, porc_desc: 0, val_desc: 0, porc_imp: 0, val_imp: 0, subtotal: 0 };

  ped_dets: Array<{ ped_det_id: number, ped_id: number, pro_id: string, pro_nom: string, cant: number, precio: number, porc_desc: number, val_desc: number, porc_imp: number, val_imp: number, subtotal: number }>;

  //ped_dets: Array<{ ped_det_id: number, ped_id: number, pro_id: string, pro_nom: string, cant: number, precio: number, subtotal: number }>;

  location: {
    geolocid: number,
    tiporeg: string,
    regid: number,
    fecha: any,
    geolocpos: any,
    vend_id: number,
    cli_id: number
  } =
    {
      geolocid: 0,
      tiporeg: '',
      regid: 0,
      fecha: '',
      geolocpos: '',
      vend_id: 0,
      cli_id: 0
    }

  coords: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public pedidosService: PedidoServiceProvider,
    public locationService: LocationServiceProvider,
    public clienteService: ClienteServiceProvider,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    private document: DocumentViewer,
    private file: File,
    private transfer: FileTransfer

  ) { }

  ionViewDidLoad() {

    this.pedido.ped_id = this.navParams.get('ped_id');

    console.log('ped_id', this.pedido.ped_id);

    this.getLocation();

    if (this.pedido.ped_id == 0) {
      //es un nuevo pedido
      this.cliente = this.navParams.get('item');

      this.pedido.cli_id = this.cliente.cli_id;
      this.pedido.ped_numero = 0;  //buscar prox numero  
      this.pedido.ped_fec_ent = new Date().toISOString().slice(0, 16);
      this.pedido.ped_fecha = new Date().toISOString().slice(0, 16);

      var vend_id = localStorage.getItem('vend_id');

      console.log('vend_id', vend_id);

      this.pedido.vend_id = parseInt(vend_id);

      //this.pedido.ped_fec_ent = new Date(Date.now());
    }
    else {

      this.pedido = this.navParams.get('item');

      //carga pedido
      this.fillpedido(this.pedido.ped_id);

    }

    console.log(this.cliente);
    console.log(this.pedido);
    console.log(this.ped_dets);
  }

///envia el pedido para ser marcado como
//cerrado y enviar el correo
  sendpedido(ped_id) {
    //leer encabezado
    this.pedidosService.SendPedido(this.pedido).subscribe(
      data => {
        this.pedido = data;
        console.log('envio correo', data);
        //leer datos cliente
      },
      err => {
        console.log(err);
      },
      () => console.log('Proceso Completo')
    );

  }

  ///descarga el pdf
  getpedpdf(ped_id) {
    // this.pedidosService.GetPdf(ped_id).subscribe((file: ArrayBuffer) => {
    //   this.pdfSrc = new Uint8Array(file);
    // or directly passing ArrayBuffer
    // this.pdfSrc = file;
    //  });
    console.log(ped_id);
    let path = null;

    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else if (this.platform.is('android')) {
      path = this.file.dataDirectory;
    }

    var baseApiUrl = GlobalVariable.BASE_API_URL;

    const transfer = this.transfer.create();

    var url = baseApiUrl + 'pedidoPdf/' + encodeURI(ped_id);

    console.log(url);

    transfer.download(url, path + ped_id + '.pdf').then(entry => {
      let url = entry.toURL();
      this.document.viewDocument(url, 'application/pdf', {});
      console.log('procesado');
    });

  }

  ///llena la pantalla con los datos
  ///del pedido
  fillpedido(ped_id) {

    //leer encabezado
    this.pedidosService.GetPedido(ped_id).subscribe(
      data => {
        this.pedido = data;
        console.log('lectura', data);

        //leer datos cliente
        this.fillcliente(data.cli_id);
      },
      err => {
        console.log(err);
      },
      () => console.log('Proceso Completo')
    );

    //leer detalle

    this.pedidosService.GetPedidosdet(this.pedido.ped_id).subscribe(
      data => {
        this.ped_dets = data;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => console.log('Proceso Completo')
    );

  }

  //llena los datos del cliente
  fillcliente(cli_id) {
    console.log('cli_id', cli_id);

    this.clienteService.GetCliente(cli_id).subscribe(
      data => {
        this.cliente = data;
        console.log('cliente', data);
      },
      err => {
        console.log(err);
      },
      () => console.log('Proceso Completo')
    );
  }


  // callback para refrescar pantalla
  //al regresar del carrito fillpedido
  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      console.log("_params", _params);
      this.fillpedido(_params);
      resolve();
    });
  }

//carrito para adicionar productos
//push a pagina PedproductosPage
  productos(event) {
    //guarda pedido
    if (this.pedido.ped_id > 0) {
      this.pedidosService.SetPedido(this.pedido)
        .subscribe(res => {
          console.log("suscb", res);
        });
      //ubicacion 
      console.log("coords",this.coords);

      this.location.geolocid = 0;
      this.location.tiporeg = "Pedido";
      this.location.regid = this.pedido.ped_id;
      this.location.fecha = this.pedido.ped_fecha;
      this.location.geolocpos = JSON.stringify({ latitude: this.coords.latitude, longitude:this.coords.longitude});
      this.location.vend_id = this.pedido.vend_id;     
      this.location.cli_id = this.pedido.cli_id;

      console.log(this.location.geolocpos);

      this.locationService.SetLocation(this.location)
        .subscribe(res => {
          console.log("loc", res)
        });

      //adiciona productos
      this.navCtrl.push(PedproductosPage, {
        pedido: this.pedido, ped_id: this.pedido.ped_id, callback: this.myCallbackFunction
      });
    }
    else {
      this.pedidosService.SetPedido(this.pedido).subscribe(res => {
        console.log("suscb", res);
        this.pedido.ped_id = res.ped_id;
        this.navCtrl.push(PedproductosPage, {
          pedido: this.pedido, ped_id: this.pedido.ped_id, callback: this.myCallbackFunction
        });
      }, err => console.log(err));
    }
  }

//borra item
  itemDeleted(item,idx) {

    let index = this.ped_dets.indexOf(item);

    if(index > -1){


    console.log("suscb", item);
    this.pedidosService.DeletePedidodet(item.ped_det_id).subscribe(res => {
      console.log("suscb res", res);
      this.ped_dets.splice(index, 1);
    }, err => console.log(err));

  }
    //ped_dets
    //this.pedidosService.

  }

  //leer ubicacion
  getLocation() {
    console.log("obtener coord");
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
//mostrar ubicacion
  showPosition(position: any, self: any) {
    console.log("Coordenadas", position.coords);
    this.coords = position.coords;
  }

  //menu emergente
  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Enviar',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'send' : null,
          handler: () => {
            this.sendpedido(this.pedido.ped_id);
            console.log('Enviar clicked');
          }
        },
        {
          text: 'Imprimir',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            this.getpedpdf(this.pedido.ped_id);
            console.log('Get Pdf clicked');
          }
        },
        {
          text: 'Refrescar',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'refresh' : null,
          handler: () => {
            this.fillpedido(this.pedido.ped_id);
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


}
