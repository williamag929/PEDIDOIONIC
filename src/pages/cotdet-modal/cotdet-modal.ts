import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { CotizacionServiceProvider } from '../../providers/cotizacion-service/cotizacion-service';
import { ProductoServiceProvider } from '../../providers/producto-service/producto-service';

/**
 * Generated class for the PeddetModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-cotdet-modal',
  templateUrl: 'cotdet-modal.html',
  //template: '<input [textMask]="{mask: mask}" [(ngModel)]="myModel" type="text"/>'
})
export class CotdetModalPage {
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

  item: {
    pro_id: string,
    pro_nom: string,
    pro_und: string,
    precio: number,
    ordenado: number,
    existencia: number
  } = {
    pro_id: '',
      pro_nom: '',
      pro_und: '',
      precio: 0,
      ordenado: 0,
      existencia: 0
    };


  cot_det: { cot_det_id: number, cot_id: number, pro_id: string, pro_nom: string, cant: number, precio: number, porc_desc: number, val_desc: number, porc_imp: number, val_imp: number, subtotal: number }
    = { cot_det_id: 0, cot_id: 0, pro_id: '', pro_nom: '', cant: 0, precio: 0, porc_desc: 0, val_desc: 0, porc_imp: 0, val_imp: 0, subtotal: 0 };


  cot_id: number;

  descuento: number = 0;
  mensaje: string = '';
  modprecio: boolean = false;
  verexistencia: boolean = false;
  valido: boolean = true;
  validaexistencia: boolean = false;


  constructor(public navParams: NavParams,
    public viewCtrl: ViewController,
    public productoService: ProductoServiceProvider,
    public cotizacionsService: CotizacionServiceProvider) {

    this.cot_id = this.navParams.get('cot_id');

    //permisos
    //console.log('modprecio',localStorage.getItem('modprecio'));

    if (localStorage.getItem('verexistencia') == 'true')
      this.verexistencia = true;

    if (localStorage.getItem('modprecio') == 'true')
      this.modprecio = true;

    if (localStorage.getItem('validaexistencia') == 'true')
      this.validaexistencia = true;

    this.valido = true;

    this.descuento = this.navParams.get('descuento');
    console.log("descuento", this.descuento);

    this.item = this.navParams.get('item');

    this.loadProducto();

    console.log('cot_id', this.cot_id);

  }


  loadProducto() {

    this.productoService.GetProductoCot(this.cot_id, this.item.pro_id).subscribe(
      data => {
        this.producto = data;


        console.log(data);


        this.cot_det.pro_id = this.producto.pro_id;
        this.cot_det.pro_nom = this.producto.pro_nom;
        this.cot_det.cant = this.producto.ordenado;
        this.cot_det.precio = this.producto.precio;
        this.cot_det.cot_id = this.cot_id;
        this.cot_det.porc_imp = this.producto.imp_porc;
        this.cot_det.val_imp = 0;
        this.cot_det.subtotal = 0;
        this.cot_det.porc_desc = this.descuento;



      },
      err => {
        console.log(err);
      },
      () => console.log('Proceso Completo')
    );

  }


  PutModal() {

    //calcular 

    this.cot_det.val_imp = this.cot_det.cant * this.cot_det.precio * (this.cot_det.porc_imp / 100);
    this.cot_det.subtotal = (this.cot_det.cant * this.cot_det.precio) + this.cot_det.val_imp;

    //validar existencia
    if (this.cot_det.cant > this.producto.existencia && this.validaexistencia) //&& this.verexistencia
    {
      this.mensaje = "Producto supera el disponible";
      this.valido = false
    }
    else {

      this.valido = true;
      //guardar informa


      
      if (this.cot_det.cant > 0) {
        this.cotizacionsService.Setcotizaciondet(this.cot_det).subscribe(res => {
          this.cot_det.cot_det_id = res.cot_det_id;
          this.viewCtrl.dismiss(this.cot_det);

        }, err => console.log(err));
      }
      else {

        this.viewCtrl.dismiss(this.cot_det);
      }
    }
    //console.log("resp", this.cotizacionsService.Setcotizaciondet(this.cot_det));


  }

  validaprom(cantidad) {

    console.log("Existencia", this.producto.existencia)

    if (cantidad > this.producto.existencia && this.validaexistencia) //&& this.verexistencia
    {
      this.mensaje = "Producto supera el disponible";
      this.valido = false
    }
    else {
      this.mensaje = "";
      this.valido = true;
    }

    if (cantidad >= this.producto.cantprom && this.producto.cantprom > 0) {
      this.mensaje = "Producto aplica descuento " + this.producto.porc_descprom.toString();
      this.cot_det.porc_desc = this.descuento + this.producto.porc_descprom;
    }
    this.validaprecio();
  }

  validaprecio() {
    this.cot_det.val_desc = (this.cot_det.precio * this.cot_det.cant) * this.cot_det.porc_desc / 100;
    this.cot_det.subtotal = (this.cot_det.precio * this.cot_det.cant) - this.cot_det.val_desc;
  }

  dismiss() {
    var empty = {};
    this.viewCtrl.dismiss(empty);
  }


}
