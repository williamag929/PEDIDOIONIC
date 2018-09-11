import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PedidoServiceProvider } from '../../providers/pedido-service/pedido-service';
import { PedidosPage } from '../../pages/pedidos/pedidos';

/**
 * Generated class for the ListapedidosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-listapedidos',
  templateUrl: 'listapedidos.html',
})
export class ListapedidosPage {
  public pedidos: any;
  public pedidosloaded: any;
  selectedItem: any;
  cliente:any;

  pedido: {
    ped_id: number,
    ped_tipo: string,
    ped_numero: number,
    cli_id: number,
    cli_nombre: string,
    cli_suc: number,
    cli_direccion: string,
    vend_id: number,
    vend_nomb: string,
    ped_fecha: Date,
    ped_fec_ent: Date,
    ped_subtotal: number,
    ped_impuesto: number,
    ped_total: number,
    cli_ciudad: string,
    vend_zona: string,
    ped_procesado: boolean,
    ped_closed: boolean
  }={
    ped_id: 0,
    ped_tipo: 'PE',
    ped_numero: 0,
    cli_id: 0,
    cli_nombre: '',
    cli_suc: 0,
    cli_direccion: '',
    vend_id: 0,
    vend_nomb: '',
    ped_fecha: null,
    ped_fec_ent: null,
    ped_subtotal: 0,
    ped_impuesto: 0,
    ped_total: 0,
    cli_ciudad: '',
    vend_zona: '',
    ped_procesado: false,
    ped_closed: false
  };


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public pedidosService: PedidoServiceProvider) {
    this.loadData();
  }


  loadData() {

    var vend_id = localStorage.getItem('vend_id');
    this.cliente = this.navParams.get('cli_id');

    console.log('vendped',vend_id);
    
    this.pedidosService.GetPedidos(vend_id).subscribe(
      data => {
        this.pedidos = data;
        this.pedidosloaded = data;

        if (this.cliente > 0)
       {
          this.pedidos = this.filtercliente(this.cliente,"cli_id");
          this.pedidosloaded = this.pedidos;
        }

        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => console.log('Proceso Completo')
    );

  }

  filtercliente(element,field) {
    let results = [];
    results = this.pedidos.filter(function (item) {
      //por cada propieda del item busca
      for (let property in item) {
        //si la propieda es null continua
        if (item[field] === null) {
          continue;
        }
        //si la busqueda es acertada retorna true
        if (item[field] == element) {
          return true;
        }
      }
      //si no se cumple retorna falso
      return false;
    });
    return results
  }

  getItems(ev: any) {

    let val = ev.target.value;
    //lee el objeto y lo convierte a un array
    let fObj = val.split(" ");

    //reinicia la busqueda
    this.pedidos = this.pedidosloaded;

    //por cada elemento realiza la busqueda
    fObj.forEach(element => {
      //acumula la busqueda
      this.pedidos = this.pedidos.filter(function (item) {
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



  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!

    console.log('Ped Sel',item);

    //this.navCtrl.setRoot(PedidosPage);
    this.navCtrl.push(PedidosPage, {
      item: item, ped_id: item.ped_id
    });
  }
}

