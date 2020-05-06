import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocationServiceProvider } from '../../providers/location-service/location-service';

import { ClienteServiceProvider } from '../../providers/cliente-service/cliente-service';
import { Platform, ActionSheetController } from 'ionic-angular';

import { VendedorServiceProvider } from '../../providers/vendedor-service/vendedor-service';
import { AlertController } from 'ionic-angular';
import { ProductoServiceProvider } from '../../providers/producto-service/producto-service';
import { CotizacionServiceProvider } from '../../providers/cotizacion-service/cotizacion-service';
import { CotproductosPage } from '../cotproductos/cotproductos';
import { CotizacionpreviewPage } from '../cotizacionpreview/cotizacionpreview';


//import { ModalController } from 'ionic-angular';
//import { ModalPage } from '../pages/modal-page';

/**
 * Generated class for the cotizacionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-cotizaciones',
  templateUrl: 'cotizaciones.html'
  //template: '<pdf-viewer [src]="pdfSrc" [show-all]="true"></pdf-viewer>'
})
export class CotizacionesPage {
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

  cotizacion: {
    cot_id: number,
    cot_numero: number,
    cot_tipo: string,
    cli_id: number,
    cli_suc: number,
    vend_id: number,
    cot_fecha: any,
    cot_fec_ent: any,
    cot_subtotal: number,
    cot_impuesto: number,
    cot_total: number,
    cot_desc: number,
    cot_procesado: boolean,
    cot_closed: boolean,
    cot_note: string,
    descuento: number,
    formapago: string,
    plazo: number,
    direccionentr: string
  } = {
      cot_id: 0,
      cot_numero: 0,
      cot_tipo: '',
      cli_id: 0,
      cli_suc: 0,
      vend_id: 0,
      cot_fecha: '',
      cot_fec_ent: '',
      cot_subtotal: 0,
      cot_impuesto: 0,
      cot_total: 0,
      cot_desc: 0,
      cot_procesado: false,
      cot_closed: false,
      cot_note: '',
      descuento: 0,
      formapago: '',
      plazo: 0,
      direccionentr: ''
    };

  cot_det: { cot_det_id: number, cot_id: number, pro_id: string, pro_nom: string, cant: number, precio: number, porc_desc: number, val_desc: number, porc_imp: number, val_imp: number, subtotal: number }
    = { cot_det_id: 0, cot_id: 0, pro_id: '', pro_nom: '', cant: 0, precio: 0, porc_desc: 0, val_desc: 0, porc_imp: 0, val_imp: 0, subtotal: 0 };

  cot_dets: Array<{ cot_det_id: number, cot_id: number, codigo: string, descripcion: string, cant: number, precio: number, porc_desc: number, val_desc: number, porc_imp: number, val_imp: number, subtotal: number, valido: boolean }>;

  //cot_dets: Array<{ cot_det_id: number, cot_id: number, pro_id: string, pro_nom: string, cant: number, precio: number, subtotal: number }>;

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
    public cotizacionsService: CotizacionServiceProvider,
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

    this.cotizacion.cot_id = this.navParams.get('cot_id');

    console.log('cot_id', this.cotizacion.cot_id);

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


        //if (data.validaexistencia)
        //  this.validaexistencia = true;

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



    if (this.cotizacion.cot_id == 0) {
      //es un nuevo cotizacion
      this.cliente = this.navParams.get('item');

      this.cotizacion.direccionentr = this.cliente.cli_direccion;

      this.listaprecio = this.cliente.lista_id;

      this.cotizacion.cot_tipo = this.navParams.get('cot_tipo');

      this.cotizacion.cli_id = this.cliente.cli_id;

      this.cotizacion.cot_numero = 0;  //buscar prox numero  
      this.cotizacion.cot_fec_ent = new Date().toISOString().slice(0, 16);
      this.cotizacion.cot_fecha = new Date().toISOString().slice(0, 16);



      this.cotizacion.vend_id = parseInt(vend_id);

      this.cotizacion.descuento = this.cliente.descuento;



      //this.cotizacion.cot_fec_ent = new Date(Date.now());
    }
    else {

      this.cotizacion = this.navParams.get('item');

      //carga cotizacion
      this.fillcotizacion(this.cotizacion.cot_id);

    }

  }

  ///envia el cotizacion para ser marcado como
  //cerrado y enviar el correo
  showAlert(titulo, mensaje) {
    const alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }


  async verificacotizacion() {

    let promises = [];

    this.cot_dets.map(async (data) => {
      this.productoService.GetProductoCot(data.cot_id, data.codigo).subscribe(
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

  //envia cotizacion marca como cerrado
  sendcotizacion(cot_id) {
    //leer encabezado
    //validar primero el cotizacion y es valido

      this.cotizacionsService.Sendcotizacion(this.cotizacion).subscribe(
        data => {
          this.cotizacion = data;
          //console.log('envio correo', data);
          this.showAlert('Exitoso!', 'cotizacion Enviado');
          this.fillcotizacion(this.cotizacion.cot_id);
          //alert('cotizacion Enviado');
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

  ///descarga el pdf
  getpedpdf(cot_id) {
    // this.cotizacionsService.GetPdf(cot_id).subscribe((file: ArrayBuffer) => {
    //   this.pdfSrc = new Uint8Array(file);
    // or directly passing ArrayBuffer
    // this.pdfSrc = file;
    //  });
    console.log(cot_id);


    //var baseApiUrl = GlobalVariable.BASE_API_URL;

    var baseApiUrl = localStorage.getItem("urlapi");

    //const transfer = this.transfer.create();

    var url = baseApiUrl + 'cotizacionPdf/' + encodeURI(cot_id);

    console.log(url);

    //transfer.download(url, path + cot_id + '.pdf').then(entry => {
    //  let url = entry.toURL();
    //  this.document.viewDocument(url, 'application/pdf', {});
    //  console.log('procesado');
    //});

  }

  ///llena la pantalla con los datos
  ///del cotizacion
  fillcotizacion(cot_id) {

    //leer encabezado
    this.cotizacionsService.Getcotizacion(cot_id).subscribe(
      data => {
        this.cotizacion = data;
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

    this.cotizacionsService.Getcotizacionesdet(this.cotizacion.cot_id).subscribe(
      data => {
        this.cot_dets = data;
        this.verificacotizacion();

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
        this.cotizacion.descuento = this.cliente.descuento;

      },
      err => {
        console.log(err);
      },
      () => console.log('Proceso Completo')
    );
  }


  // callback para refrescar pantalla
  //al regresar del carrito fillcotizacion
  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      console.log("_params", _params);
      this.fillcotizacion(_params);
      resolve();
    });
  }

  //carrito para adicionar productos
  //push a pagina PedproductosPage
  getproductos(event) {
    //guarda cotizacion
    //si ya existe modifica
    if (this.cotizacion.cot_id > 0) {
      this.cotizacionsService.Setcotizacion(this.cotizacion)
        .subscribe(res => {
          console.log("suscb", res);
        });
      //ubicacion 
      console.log("coords", this.coords);


      try {
        this.location.geolocid = 0;
        this.location.tiporeg = "cotizacion";
        this.location.regid = this.cotizacion.cot_id;
        this.location.fecha = this.cotizacion.cot_fecha;

        this.location.geolocpos = JSON.stringify({ latitude: this.coords.latitude, longitude: this.coords.longitude });
        this.location.vend_id = this.cotizacion.vend_id;
        this.location.cli_id = this.cotizacion.cli_id;

        //console.log(this.location.geolocpos);

        this.locationService.SetLocation(this.location)
          .subscribe(res => {
            console.log("loc", res)
          });
      } catch (err) { }

      //adiciona productos
      this.navCtrl.push(CotproductosPage, {
        cotizacion: this.cotizacion, cot_id: this.cotizacion.cot_id, descuento: this.cotizacion.descuento, callback: this.myCallbackFunction
      });
    }
    else {
      this.cotizacionsService.Setcotizacion(this.cotizacion).subscribe(res => {
        console.log("suscb", res);
        this.cotizacion.cot_id = res.cot_id;
        this.navCtrl.push(CotproductosPage, {
          cotizacion: this.cotizacion, cot_id: this.cotizacion.cot_id, descuento: this.cotizacion.descuento, callback: this.myCallbackFunction
        });
      }, err => console.log(err));
    }
  }

  //borra item
  itemDeleted(item) {

    let index = this.cot_dets.indexOf(item);

    if (index > -1) {


      console.log("suscb", item);
      this.cotizacionsService.Deletecotizaciondet(item.cot_det_id).subscribe(res => {
        console.log("suscb res", res);
        this.cot_dets.splice(index, 1);
      }, err => console.log(err));

    }
    //cot_dets
    //this.cotizacionsService.

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
          text: 'Procesar a Pedido',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'send' : null,
          handler: () => {
            this.sendcotizacion(this.cotizacion.cot_id);
            console.log('Enviar clicked');
          }
        },
        {
          text: 'Imprimir',
          icon: 'print',
          handler: () => {
            //this.getpedpdf(this.cotizacion.cot_id);
            this.navCtrl.push(CotizacionpreviewPage, {
              cotizacion: this.cotizacion, callback: this.myCallbackFunction
            });            
            console.log('Get Pdf clicked');
          }
        },
        {
          text: 'Actualizar',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'refresh' : null,
          handler: () => {
            this.fillcotizacion(this.cotizacion.cot_id);
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
