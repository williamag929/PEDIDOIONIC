import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocationServiceProvider } from '../../providers/location-service/location-service';

import { ClienteServiceProvider } from '../../providers/cliente-service/cliente-service';
import { Platform, ActionSheetController } from 'ionic-angular';

import { VendedorServiceProvider } from '../../providers/vendedor-service/vendedor-service';
import { AlertController } from 'ionic-angular';
import { ProductoServiceProvider } from '../../providers/producto-service/producto-service';
import { PedproductosPage } from '../../pages/pedproductos/pedproductos';
import { PedidoServiceProvider } from '../../providers/pedido-service/pedido-service';
import { PedidopreviewPage } from '../pedidopreview/pedidopreview';




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
})
export class PedidosPage {
  cliente: {
    cli_id: number, cli_nombre: string,
    cli_direccion: string,
    descuento: number,
    lista_id: string
  } = {
      cli_id: 0,
      cli_nombre: '',
      cli_direccion: '',
      descuento: 0,
      lista_id: '00'
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
    ped_note: string,
    descuento: number,
    formapago: string,
    plazo: number,
    direccionentr: string
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
      ped_note: '',
      descuento: 0,
      formapago: '',
      plazo: 0,
      direccionentr: ''
    };

  ped_det: { ped_det_id: number, ped_id: number, pro_id: string, pro_nom: string, cant: number, precio: number, porc_desc: number, val_desc: number, porc_imp: number, val_imp: number, subtotal: number }
    = { ped_det_id: 0, ped_id: 0, pro_id: '', pro_nom: '', cant: 0, precio: 0, porc_desc: 0, val_desc: 0, porc_imp: 0, val_imp: 0, subtotal: 0 };

  ped_dets: Array<{ ped_det_id: number, ped_id: number, codigo: string, descripcion: string, cant: number, precio: number, porc_desc: number, val_desc: number, porc_imp: number, val_imp: number, subtotal: number, valido: boolean }>;

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

  coords: {
    latitude: number,
    longitude: number
  } =
    { latitude: 0.0, longitude: 0.0 }


  producto: {
    pro_id: string, pro_nom: string, pro_ref: string, pro_und: string,
    pro_grupo1: string,
    pro_grupo2: string,
    pro_grupo3: string,
    imp_cod: number,
    imp_porc: number,
    precio: number,
    precio1: number,
    precio2: number,
    precio3: number,
    precio4: number,
    precio5: number,
    preccio6: number,
    estado: string,
    peso: number,
    ordenado: number,
    existencia: number,
    cantprom: number,
    porc_descprom: number
  } =
    {
      pro_id: '', pro_nom: '', pro_ref: '', pro_und: '',
      pro_grupo1: '',
      pro_grupo2: '',
      pro_grupo3: '',
      imp_cod: 0,
      imp_porc: 0,
      precio: 0,
      precio1: 0,
      precio2: 0,
      precio3: 0,
      precio4: 0,
      precio5: 0,
      preccio6: 0,
      estado: '',
      peso: 0,
      ordenado: 0,
      existencia: 0,
      cantprom: 0,
      porc_descprom: 0

    };

  vendedor: any;
  validaexistencia: boolean = false;
  verplazo: boolean = false;
  verformapago: boolean = false;

  listaprecio: string = '00';



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public pedidosService: PedidoServiceProvider,
    public locationService: LocationServiceProvider,
    public clienteService: ClienteServiceProvider,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    private vendedorService: VendedorServiceProvider,
    public productoService: ProductoServiceProvider,
    public alertCtrl: AlertController

  ) { }

  ///carga el formulario
  ionViewDidLoad() {

    this.pedido.ped_id = this.navParams.get('ped_id');

    console.log('ped_id', this.pedido.ped_id);

    var vend_id = localStorage.getItem('vend_id');


    //retirar usado solo para permisos

    this.vendedorService.GetVendedor(vend_id).subscribe(
      data => {
        this.vendedor = data;
        console.log('vendedor', data);
        localStorage.setItem('modprecio', data.modprecio);
        localStorage.setItem('verexistencia', data.verexistencia);
        localStorage.setItem('verformapago', data.verformapago);
        localStorage.setItem('verplazo', data.verplazo);
        localStorage.setItem('validaexistencia', data.validaexistencia);


        if (data.validaexistencia)
          this.validaexistencia = true;

        if (data.verformapago)
          this.verformapago = true;

        if (data.verplazo)
          this.verplazo = true;

      },
      err => {
        console.log(err);
      },
      () => console.log('Proceso Completo')
    );



    this.getLocation();



    if (this.pedido.ped_id == 0) {
      //es un nuevo pedido
      this.cliente = this.navParams.get('item');

      this.pedido.direccionentr = this.cliente.cli_direccion;

      this.listaprecio = this.cliente.lista_id;

      this.pedido.ped_tipo = this.navParams.get('ped_tipo');

      this.pedido.cli_id = this.cliente.cli_id;
      this.pedido.ped_numero = 0;  //buscar prox numero  
      this.pedido.ped_fec_ent = new Date().toISOString().slice(0, 16);
      this.pedido.ped_fecha = new Date().toISOString().slice(0, 16);



      this.pedido.vend_id = parseInt(vend_id);

      this.pedido.descuento = this.cliente.descuento;



      //this.pedido.ped_fec_ent = new Date(Date.now());
    }
    else {

      this.pedido = this.navParams.get('item');

      //carga pedido
      this.fillpedido(this.pedido.ped_id);

    }

  }

  ///envia el pedido para ser marcado como
  //cerrado y enviar el correo
  showAlert(titulo, mensaje) {
    const alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }


  async verificapedido() {

    let promises = [];

    this.ped_dets.map(async (data) => {
      this.productoService.GetProducto(data.ped_id, data.codigo).subscribe(
        prod => {
          this.producto = prod;

          if (data.cant > prod.existencia && this.validaexistencia) //&& this.verexistencia
          {
            data.valido = false;
            promises.push(data);
          }
          else {
            data.valido = true;
          }

        },
        err => {
          console.log(err);
        },
        () => console.log('Proceso Completo'));
    });

    return promises;
  }

  //envia pedido marca como cerrado
  sendpedido(ped_id) {
    //leer encabezado
    //validar primero el pedido y es valido
    var invalidos = this.ped_dets.filter(c => c.valido == false).length;
    //console.log("invalidos", invalidos);
    if (invalidos > 0) {
      this.showAlert('Alerta!', 'Verificar productos agotados')
    }
    else {
      this.pedidosService.SendPedido(this.pedido).subscribe(
        data => {
          this.pedido = data;
          //console.log('envio correo', data);
          this.showAlert('Exitoso!', 'Pedido Enviado');
          this.fillpedido(this.pedido.ped_id);
          //alert('Pedido Enviado');
          //leer datos cliente
        },
        err => {
          console.log(err);
          this.showAlert('Error!', 'Error al enviar');
          //alert('Error al enviar');
        },
        () => console.log('Proceso Completo')
      );
    }


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
        this.verificapedido();

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
        this.listaprecio = data.lista_id;
        this.pedido.descuento = this.cliente.descuento;

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
    //si ya existe modifica
    if (this.pedido.ped_id > 0) {
      this.pedidosService.SetPedido(this.pedido)
        .subscribe(res => {
          console.log("suscb", res);
        });
      //ubicacion 
      console.log("coords", this.coords);


      try {
        this.location.geolocid = 0;
        this.location.tiporeg = "Pedido";
        this.location.regid = this.pedido.ped_id;
        this.location.fecha = this.pedido.ped_fecha;

        this.location.geolocpos = JSON.stringify({ latitude: this.coords.latitude, longitude: this.coords.longitude });
        this.location.vend_id = this.pedido.vend_id;
        this.location.cli_id = this.pedido.cli_id;

        //console.log(this.location.geolocpos);

        this.locationService.SetLocation(this.location)
          .subscribe(res => {
            console.log("loc", res)
          });
      } catch (err) { }

      //adiciona productos
      this.navCtrl.push(PedproductosPage, {
        pedido: this.pedido, ped_id: this.pedido.ped_id, descuento: this.pedido.descuento, callback: this.myCallbackFunction
      });
    }
    else {
      this.pedidosService.SetPedido(this.pedido).subscribe(res => {
        console.log("suscb", res);
        this.pedido.ped_id = res.ped_id;
        this.navCtrl.push(PedproductosPage, {
          pedido: this.pedido, ped_id: this.pedido.ped_id, descuento: this.pedido.descuento, callback: this.myCallbackFunction
        });
      }, err => console.log(err));
    }
  }

  //borra item
  itemDeleted(item) {

    let index = this.ped_dets.indexOf(item);

    if (index > -1) {


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
      title: 'Opciones',
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
          icon: 'print',
          handler: () => {
            this.navCtrl.push(PedidopreviewPage, {
              pedido: this.pedido, callback: this.myCallbackFunction
            });
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
