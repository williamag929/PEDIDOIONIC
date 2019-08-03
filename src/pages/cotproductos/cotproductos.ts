import { CotizacionesPage } from './../cotizaciones/cotizaciones';
import { Component } from '@angular/core';
import { App, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProductoServiceProvider } from '../../providers/producto-service/producto-service';
import { ModalController } from 'ionic-angular';
import { CotdetModalPage } from '../cotdet-modal/cotdet-modal';

/**
 * Generated class for the PedproductosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-cotproductos',
  templateUrl: 'cotproductos.html',
  providers: [ProductoServiceProvider]
})
export class CotproductosPage {
  callback: any;

  public productos: any;
  public productosloaded: any;
  selectedItem: any;

  searchfav : any;

  descuento: number = 0.0;
  
  verexistencia: boolean = false;
  //public fObj = {};

  cotizacion: {
    cot_id: number,
    cot_numero: number,
    cot_tipo: string,
    cli_id: number,
    cot_fecha: any,
    cot_fec_ent: any,
    cot_subtotal: number,
    cot_desc: number,
    cot_procesado: boolean,
    cot_closed: boolean,
    cot_note: string,
    descuento : number
  } = {
      cot_id: 0,
      cot_numero: 0,
      cot_tipo: '',
      cli_id: 0,
      cot_fecha: '',
      cot_fec_ent: '',
      cot_subtotal: 0,
      cot_desc: 0,
      cot_procesado: false,
      cot_closed: false,
      cot_note: '',
      descuento: 0
    };

  cot_det: { cot_det_id: number, cot_id: number, pro_id: string, pro_nom: string, cant: number, precio: number, porc_desc: number, val_desc: number, porc_imp: number, val_imp: number, subtotal: number }
    = { cot_det_id: 0, cot_id: 0, pro_id: '', pro_nom: '', cant: 0, precio: 0, porc_desc: 0, val_desc: 0, porc_imp: 0, val_imp: 0, subtotal: 0 };

  cot_dets: Array<{ cot_det_id: number, cot_id: number, pro_id: string, pro_nom: string, cant: number, precio: number, porc_desc: number, val_desc: number, porc_imp: number, val_imp: number, subtotal: number }>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productoService: ProductoServiceProvider,
    public modalCtrl: ModalController,
    public appCtrl: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedproductosPage');

    this.cotizacion.cot_id = this.navParams.get('cot_id');

    this.descuento = this.navParams.get('descuento');

    if (localStorage.getItem('verexistencia') =='true')
      this.verexistencia = true;
    
    console.log("descuento",this.descuento);

    this.callback = this.navParams.get("callback");

    console.log('cot_id', this.cotizacion.cot_id);

    this.cot_dets = [];

    this.loadProductos();
  }

  //cargue inicial
  loadProductos() {

    this.productoService.GetProductosCot(this.cotizacion.cot_id).subscribe(
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

    try{
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
    catch{}
  }

  ///regresa al formulario de cotizacion con callback
  opencotizacion() {
    var param = this.cotizacion.cot_id;

    console.log("param", param);

    this.callback(param).then(() => {
      this.navCtrl.pop();
    });
  }

  ///muestra modal de producto 
  ///para ingresar cantidad
  openModal(event, item) {

    let modaldet = this.modalCtrl.create(CotdetModalPage, {
      item: item, cot_id: this.cotizacion.cot_id, descuento : this.descuento
    });

    console.log('envia', item);

    modaldet.onDidDismiss(data => {

      if (data) {
        console.log('recibe', data);
        this.cot_det = data;
        this.cot_dets.push(data);

        item.ordenado = data.cant;
      }
    });

    console.log('cot_dets', this.cot_dets);
    modaldet.present();

  }



  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    console.log(item);
    this.navCtrl.push(CotproductosPage, {
      item: item
    });
  }
}
