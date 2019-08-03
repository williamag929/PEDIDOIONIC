import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { ProductoServiceProvider } from '../../providers/producto-service/producto-service';
import { ModalController } from 'ionic-angular';
import { PeddetModalPage } from '../../pages/peddet-modal/peddet-modal';

/**
 * Generated class for the ProductosModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-productos-modal',
  templateUrl: 'productos-modal.html',
  providers: [ProductoServiceProvider]
})
export class ProductosModalPage {

  public productos: any;
  public productosloaded: any;
  selectedItem: any;

  descuento: number = 0.0;

  searchfav : any;

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
    ped_note: string
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
    ped_note: ''
  };

  ped_det: { ped_det_id: number, ped_id: number, pro_id: string, pro_nom: string, cant: number, precio: number, porc_desc: number, val_desc: number, porc_imp: number, val_imp: number, subtotal: number }
  = { ped_det_id: 0, ped_id: 0, pro_id: '', pro_nom: '', cant: 0, precio: 0, porc_desc: 0, val_desc: 0, porc_imp: 0, val_imp: 0, subtotal: 0 };

  ped_dets: Array<{ped_det_id: number, ped_id: number, pro_id: string, pro_nom: string, cant: number, precio: number, porc_desc: number, val_desc: number, porc_imp: number, val_imp: number, subtotal: number}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public productoService: ProductoServiceProvider, 
    public modalCtrl: ModalController,
    public appCtrl : App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedproductosPage');

    this.pedido.ped_id = this.navParams.get('ped_id');

    this.descuento = this.navParams.get('descuento');
    console.log("descuento",this.descuento);

    console.log('ped_id',this.pedido.ped_id);

    this.ped_dets = [];

    this.loadProductos(this.pedido.ped_id);
  }


  loadProductos(ped_id) {

    this.productoService.GetProductos(ped_id).subscribe(
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


  getItems(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;

    //console.log('busca',val);
    //this.clientes = searchfilter(this.clientesloaded,val); 

    this.productos = this.productosloaded.filter(function (item) {
      for (let property in item) {
        if (item[property] === null) {
          continue;
        }
        if (item[property].toString().toLowerCase().includes(val.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }


  openPedido()
  {
    //this.navCtrl.setRoot(PedidosPage);

    // this.appCtrl.getRootNav().push(PedidosPage,{
    //        item: {}, ped_id: this.pedido.ped_id
    //});
    
    this.navCtrl.pop();

    //this.navCtrl.push(PedidosPage,{
    //  item: {}, ped_id: this.pedido.ped_id
    //});

    
  }

  openModal(event, item) {

    let modaldet = this.modalCtrl.create(PeddetModalPage, {
      item: item, ped_id: this.pedido.ped_id, descuento : this.descuento
    });

    console.log('envia',item);

    modaldet.onDidDismiss(data => {

      console.log('recibe', data);
      this.ped_det = data;
      if (this.ped_det.cant > 0)
        this.ped_dets.push(data);

    });

    console.log('ped_dets',this.ped_dets);
    modaldet.present();

  }



  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    console.log(item);
//    this.navCtrl.push(PedproductosPage, {
//      item: item
//    });
  }
}
