import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CotizacionServiceProvider } from '../../providers/cotizacion-service/cotizacion-service';
import { CotizacionesPage } from '../cotizaciones/cotizaciones';


/**
 * Generated class for the ListacotizacionesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-listacotizaciones',
  templateUrl: 'listacotizaciones.html',
})
export class ListacotizacionesPage {
  public cotizaciones: any;
  public cotizacionesloaded: any;
  selectedItem: any;
  cliente:any;

  searchfav : any;

  cotizacion: {
    cot_id: number,
    cot_tipo: string,
    cot_numero: number,
    cli_id: number,
    cli_nombre: string,
    cli_suc: number,
    cli_direccion: string,
    vend_id: number,
    vend_nomb: string,
    cot_fecha: Date,
    cot_fec_ent: Date,
    cot_subtotal: number,
    cot_impuesto: number,
    cot_total: number,
    cli_ciudad: string,
    vend_zona: string,
    descuento : number,
  }={
    cot_id: 0,
    cot_tipo: 'CT',
    cot_numero: 0,
    cli_id: 0,
    cli_nombre: '',
    cli_suc: 0,
    cli_direccion: '',
    vend_id: 0,
    vend_nomb: '',
    cot_fecha: null,
    cot_fec_ent: null,
    cot_subtotal: 0,
    cot_impuesto: 0,
    cot_total: 0,
    cli_ciudad: '',
    vend_zona: '',
    descuento: 0
  };


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public cotizacionesService: CotizacionServiceProvider) {
    this.loadData();
  }


  loadData() {

    var vend_id = localStorage.getItem('vend_id');
    this.cliente = this.navParams.get('cli_id');

    console.log('vendped',vend_id);
    
    this.cotizacionesService.Getcotizaciones(vend_id).subscribe(
      data => {
        this.cotizaciones = data;
        this.cotizacionesloaded = data;

        if (this.cliente > 0)
       {
          this.cotizaciones = this.filtercliente(this.cliente,"cli_id");
          this.cotizacionesloaded = this.cotizaciones;
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
    results = this.cotizaciones.filter(function (item) {
      //por cada propieda del item busca
        //si la propieda es null continua
        //if (item[field] === null) {
        //  continue;
        //}
        //si la busqueda es acertada retorna true
        if (item[field] == element) {
          return true;
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
    this.cotizaciones = this.cotizacionesloaded;

    //por cada elemento realiza la busqueda
    fObj.forEach(element => {
      //acumula la busqueda
      this.cotizaciones = this.cotizaciones.filter(function (item) {
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

    //this.navCtrl.setRoot(cotizacionesPage);
    this.navCtrl.push(CotizacionesPage, {
      item: item, cot_id: item.cot_id
    });
  }
}

