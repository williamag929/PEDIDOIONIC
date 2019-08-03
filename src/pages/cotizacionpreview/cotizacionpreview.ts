import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CotizacionServiceProvider } from '../../providers/cotizacion-service/cotizacion-service';
import { VendedorServiceProvider } from '../../providers/vendedor-service/vendedor-service';
import { ClienteServiceProvider } from '../../providers/cliente-service/cliente-service';
import { PrintProvider } from '../../providers/print-service/print-service';

/**
 * Generated class for the CotizacionpreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cotizacionpreview',
  templateUrl: 'cotizacionpreview.html',
})
export class CotizacionpreviewPage {


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

  vendedor: any;
  validaexistencia: boolean = false;
  verplazo: boolean = false;
  verformapago: boolean = false;

  listaprecio: string = '00';

  callback: any;

  constructor(private navCtrl: NavController, 
    private navParams: NavParams,
    private vendedorService: VendedorServiceProvider,
    private cotizacionService: CotizacionServiceProvider,
    private clienteService: ClienteServiceProvider,
    private printService: PrintProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CotizacionpreviewPage');

    this.cotizacion = this.navParams.get('cotizacion')

    //this.cotizacion.cot_id = this.navParams.get('cot_id');

    var vend_id = localStorage.getItem('vend_id');


    this.callback = this.navParams.get("callback");


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

      //carga cotizacion
      this.fillcotizacion(this.cotizacion.cot_id);


  }


  ///regresa al formulario de cotizacion con callback
  openCotizacion() {
    var param = this.cotizacion.cot_id;

    console.log("param", param);

    this.callback(param).then(() => {
      this.navCtrl.pop();
    });
  }

 ///llena la pantalla con los datos
  ///del cotizacion
  fillcotizacion(cot_id) {

    //leer encabezado
    this.cotizacionService.Getcotizacion(cot_id).subscribe(
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

    this.cotizacionService.Getcotizacionesdet(this.cotizacion.cot_id).subscribe(
      data => {
        this.cot_dets = data;

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

  print(componentName){
    this.printService.print(componentName);
  }


  

}
