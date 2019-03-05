import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { PedidoServiceProvider } from '../../providers/pedido-service/pedido-service';
import { ProductoServiceProvider } from '../../providers/producto-service/producto-service';

/**
 * Generated class for the PeddetModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-peddet-modal',
  templateUrl: 'peddet-modal.html',
  //template: '<input [textMask]="{mask: mask}" [(ngModel)]="myModel" type="text"/>'
})
export class PeddetModalPage {
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
    cantprom:number,
    porc_descprom:number
  }=
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
    cantprom:0,
    porc_descprom:0

  };

  item : {
    pro_id : string,
    pro_nom : string,
    pro_und: string,
    precio : number,
    ordenado: number,
    existencia: number
  }={pro_id:'',
pro_nom:'',
pro_und:'',
precio: 0,
ordenado: 0,
existencia:0} ;


  ped_det: { ped_det_id: number, ped_id: number, pro_id: string, pro_nom: string, cant: number, precio: number, porc_desc: number, val_desc: number, porc_imp: number, val_imp: number, subtotal: number }
  = { ped_det_id: 0, ped_id: 0, pro_id: '', pro_nom: '', cant: 0, precio: 0, porc_desc: 0, val_desc: 0, porc_imp: 0, val_imp: 0, subtotal: 0 };


  ped_id: number;

  descuento: number = 0;
  mensaje: string = '';
  modprecio: boolean = false;


  constructor(public navParams: NavParams,
    public viewCtrl: ViewController,
    public productoService: ProductoServiceProvider,
    public pedidosService: PedidoServiceProvider) {

    this.ped_id = this.navParams.get('ped_id');

    //permisos
    //console.log('modprecio',localStorage.getItem('modprecio'));

    if (localStorage.getItem('modprecio') =='true')
      this.modprecio = true;

    
    this.descuento = this.navParams.get('descuento');
    console.log("descuento",this.descuento);

    this.item = this.navParams.get('item');

    this.loadProducto();

    console.log('ped_id', this.ped_id);

  }


  loadProducto() {

    this.productoService.GetProducto(this.ped_id, this.item.pro_id).subscribe(
      data => {
        this.producto = data;


        console.log(data);
      

        this.ped_det.pro_id = this.producto.pro_id;
        this.ped_det.pro_nom = this.producto.pro_nom;
        this.ped_det.cant = this.producto.ordenado;
        this.ped_det.precio = this.producto.precio;
        this.ped_det.ped_id = this.ped_id;
        this.ped_det.porc_imp = this.producto.imp_porc;
        this.ped_det.val_imp = 0; 
        this.ped_det.subtotal = 0;
        this.ped_det.porc_desc = this.descuento;
          
      
      },
      err => {
        console.log(err);
      },
      () => console.log('Proceso Completo')
    );

  }


  AceptModal() {
    //validar campos

    //guardar cambios

    this.ped_det.val_imp = this.ped_det.cant * this.ped_det.precio *  (this.ped_det.porc_imp /100);
    this.ped_det.subtotal = (this.ped_det.cant * this.ped_det.precio) + this.ped_det.val_imp;

    console.log("guardar",this.ped_det);

    this.pedidosService.SetPedidodet(this.ped_det).subscribe(res => {
      console.log("suscb",res);
      this.ped_det.ped_det_id = res.ped_det_id;
      this.viewCtrl.dismiss(this.ped_det);

   }, err => console.log(err));


    //console.log("resp", this.pedidosService.SetPedidodet(this.ped_det));


  }

  validaprom(cantidad)
  {

    if (cantidad >= this.producto.cantprom && this.producto.cantprom > 0)
    {
      this.mensaje = "Producto aplica descuento "+this.producto.porc_descprom.toString();
      this.ped_det.porc_desc = this.descuento + this.producto.porc_descprom;
    }
    this.validaprecio();
  }

  validaprecio()
  {
    this.ped_det.val_desc = (this.ped_det.precio *  this.ped_det.cant) * this.ped_det.porc_desc /100;
    this.ped_det.subtotal = (this.ped_det.precio *  this.ped_det.cant) - this.ped_det.val_desc;
  }

  dismiss() {
    var empty = {};
    this.viewCtrl.dismiss(empty);
  }


}
