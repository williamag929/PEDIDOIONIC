import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoServiceProvider } from '../../providers/pedido-service/pedido-service';
import { VendedorServiceProvider } from '../../providers/vendedor-service/vendedor-service';
import { ClienteServiceProvider } from '../../providers/cliente-service/cliente-service';
import { PrintProvider } from '../../providers/print-service/print-service';

/**
 * Generated class for the PedidopreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidopreview',
  templateUrl: 'pedidopreview.html',
})
export class PedidopreviewPage {


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

  vendedor: any;
  validaexistencia: boolean = false;
  verplazo: boolean = false;
  verformapago: boolean = false;

  listaprecio: string = '00';

  callback: any;

  constructor(private navCtrl: NavController, 
    private navParams: NavParams,
    private vendedorService: VendedorServiceProvider,
    private pedidosService: PedidoServiceProvider,
    private clienteService: ClienteServiceProvider,
    private printService: PrintProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidopreviewPage');

    this.pedido = this.navParams.get('pedido')

    //this.pedido.ped_id = this.navParams.get('ped_id');

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

      //carga pedido
      this.fillpedido(this.pedido.ped_id);


  }


  ///regresa al formulario de pedido con callback
  openPedido() {
    var param = this.pedido.ped_id;

    console.log("param", param);

    this.callback(param).then(() => {
      this.navCtrl.pop();
    });
  }

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
        this.listaprecio = data.lista_id;
        this.pedido.descuento = this.cliente.descuento;

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
