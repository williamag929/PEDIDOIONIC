import { Component } from '@angular/core';
import { App, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProductoServiceProvider } from '../../providers/producto-service/producto-service';
import { ModalController } from 'ionic-angular';
import { PeddetModalPage } from '../../pages/peddet-modal/peddet-modal';
import { PedidosPage } from '../../pages/pedidos/pedidos';

/**
 * Generated class for the PedproductosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-pedproductos',
  templateUrl: 'pedproductos.html',
  providers: [ProductoServiceProvider]
})
export class PedproductosPage {
  callback: any;

  public productos: any;
  public productosloaded: any;
  selectedItem: any;

  descuento: number = 0.0;
  
  //public fObj = {};

  pedido: {
    ped_id: number,
    ped_numero: number,
    ped_tipo: string,
    cli_id: number,
    ped_fecha: any,
    ped_fec_ent: any,
    ped_subtotal: number,
    ped_desc: number,
    ped_procesado: boolean,
    ped_closed: boolean,
    ped_note: string,
    descuento : number
  } = {
      ped_id: 0,
      ped_numero: 0,
      ped_tipo: '',
      cli_id: 0,
      ped_fecha: '',
      ped_fec_ent: '',
      ped_subtotal: 0,
      ped_desc: 0,
      ped_procesado: false,
      ped_closed: false,
      ped_note: '',
      descuento: 0
    };

  ped_det: { ped_det_id: number, ped_id: number, pro_id: string, pro_nom: string, cant: number, precio: number, porc_desc: number, val_desc: number, porc_imp: number, val_imp: number, subtotal: number }
    = { ped_det_id: 0, ped_id: 0, pro_id: '', pro_nom: '', cant: 0, precio: 0, porc_desc: 0, val_desc: 0, porc_imp: 0, val_imp: 0, subtotal: 0 };

  ped_dets: Array<{ ped_det_id: number, ped_id: number, pro_id: string, pro_nom: string, cant: number, precio: number, porc_desc: number, val_desc: number, porc_imp: number, val_imp: number, subtotal: number }>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productoService: ProductoServiceProvider,
    public modalCtrl: ModalController,
    public appCtrl: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedproductosPage');

    this.pedido.ped_id = this.navParams.get('ped_id');

    this.descuento = this.navParams.get('descuento');

    this.callback = this.navParams.get("callback");

    console.log('ped_id', this.pedido.ped_id);

    this.ped_dets = [];

    this.loadProductos();
  }

  //cargue inicial
  loadProductos() {

    this.productoService.GetProductos(this.pedido.ped_id).subscribe(
      data => {
        this.productos = data;
        this.productosloaded = data;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => console.log('Proceso Completo')
    );

  }



  //descargar los productos segun 
  //la busqueda
  getItems(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;
    //lee el objeto y lo convierte a un array
    let fObj = val.split(" ");

    //reinicia la busqueda
    this.productos = this.productosloaded;

    //por cada elemento realiza la busqueda
    fObj.forEach(element => {
      //acumula la busqueda
      this.productos = this.productos.filter(function (item) {
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

  ///regresa al formulario de pedido con callback
  openPedido() {
    var param = this.pedido.ped_id;

    console.log("param", param);

    this.callback(param).then(() => {
      this.navCtrl.pop();
    });
  }

  ///muestra modal de producto 
  ///para ingresar cantidad
  openModal(event, item) {

    let modaldet = this.modalCtrl.create(PeddetModalPage, {
      item: item, ped_id: this.pedido.ped_id, descuento : this.descuento
    });

    console.log('envia', item);

    modaldet.onDidDismiss(data => {

      if (data) {
        console.log('recibe', data);
        this.ped_det = data;
        this.ped_dets.push(data);

        item.ordenado = data.cant;
      }
    });

    console.log('ped_dets', this.ped_dets);
    modaldet.present();

  }



  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    console.log(item);
    this.navCtrl.push(PedproductosPage, {
      item: item
    });
  }
}
