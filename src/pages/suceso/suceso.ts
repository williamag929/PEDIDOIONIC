import { ClienteInfoPage } from './../cliente-info/cliente-info';
import { ClienteServiceProvider } from './../../providers/cliente-service/cliente-service';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GlobalVariable } from '../../app/app.config';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
import { SucesoServiceProvider } from '../../providers/suceso-service/suceso-service';


/**
 * Generated class for the SucesoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-suceso',
  templateUrl: 'suceso.html',
})
export class SucesoPage {

  sucesomodel: {
    sucesoid: number,
    vend_id: number,
    cli_id: number,
    fecha: any,
    tiempo: number,
    cadena: string,
    nota: string,
    tipo: string
  } =
    {
      sucesoid: 0,
      vend_id: 0,
      cli_id: 0,
      fecha: '',
      tiempo: 0,
      cadena: '',
      nota: '',
      tipo: ''
    }

  coords: any;


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

  cliente: {
    cli_id: number, cli_nombre: string,
    cli_direccion: string
  } = {
      cli_id: 0,
      cli_nombre: '',
      cli_direccion: ''
    };


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public locationService: LocationServiceProvider,
    public sucesoService: SucesoServiceProvider,
    public clienteService: ClienteServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SucesoPage');

    this.cliente = this.navParams.get('item');

    var vend_id = localStorage.getItem('vend_id');

    console.log(this.navParams.get('sucesoid'));

    this.sucesomodel.sucesoid = this.navParams.get('sucesoid');
    this.sucesomodel.vend_id = parseInt(vend_id);
    this.sucesomodel.cli_id = this.cliente.cli_id;

    if (this.sucesomodel.sucesoid > 0) {
      this.fillsuceso(this.sucesomodel.sucesoid);
    }



    this.getLocation();

  }

  fillsuceso(sucesoid) {

    //leer encabezado
    this.sucesoService.GetSuceso(sucesoid).subscribe(
      data => {
        this.sucesomodel = data;
        console.log('lectura', data);

        //leer datos cliente
        //this.fillcliente(data.cli_id);
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
      },
      err => {
        console.log(err);
      },
      () => console.log('Proceso Completo')
    );
  }

  setsuceso() {
    this.sucesoService.SetSuceso(this.sucesomodel).subscribe(res => {
      console.log("suscb", res);
      console.log("ID", res.sucesoid);
      this.sucesomodel.sucesoid = res.sucesoid;

      this.location.geolocid = 0;
      this.location.tiporeg = "suceso: " + this.sucesomodel.tipo;
      this.location.regid = res.sucesoid;
      this.location.fecha = this.sucesomodel.fecha;
      this.location.geolocpos = JSON.stringify({ latitude: this.coords.latitude, longitude: this.coords.longitude });
      this.location.vend_id = this.sucesomodel.vend_id;
      this.location.cli_id = this.sucesomodel.cli_id;

      console.log(this.location.geolocpos);

      this.locationService.SetLocation(this.location)
        .subscribe(res => {
          console.log("loc", res)
        });

      this.navCtrl.pop();

    }, err => console.log(err));



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

}
