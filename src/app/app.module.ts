import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ClientesPage } from '../pages/clientes/clientes';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { ListapedidosPage } from '../pages/listapedidos/listapedidos';
import { PedproductosPage } from '../pages/pedproductos/pedproductos';
import { PeddetModalPage } from '../pages/peddet-modal/peddet-modal';
import { ClienteInfoPage } from '../pages/cliente-info/cliente-info';
import { ListacarteraPage } from '../pages/listacartera/listacartera';
import { MapaPage } from '../pages/mapa/mapa';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ClienteServiceProvider } from '../providers/cliente-service/cliente-service';
import { ProductoServiceProvider } from '../providers/producto-service/producto-service';
import { PedidoServiceProvider } from '../providers/pedido-service/pedido-service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../providers/auth-service/auth-service';
import { VendedorServiceProvider } from '../providers/vendedor-service/vendedor-service';
import { CarteraServiceProvider } from '../providers/cartera-service/cartera-service';

//import {AgmCoreModule} from 'angular2-google-maps/core';
import { LocationServiceProvider } from '../providers/location-service/location-service';
//import {NativeGeocoder} from '@ionic-native/native-geocoder'

import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, Geocoder } from '@ionic-native/google-maps';
import { Toast } from '@ionic-native/toast';


@NgModule({
  declarations: [
    MyApp,
    LoginPage, 
    HomePage,
    ListPage,
    ClientesPage,
    ListapedidosPage,
    PedidosPage,
    PedproductosPage,
    PeddetModalPage,
    ClienteInfoPage,
    ListacarteraPage,
    MapaPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    //AgmCoreModule.forRoot({apiKey:'AIzaSyA_ilIcEf7N06opMqZInZN10rfP3zz5QTs'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,    
    HomePage,
    ListPage,
    ClientesPage,
    ListapedidosPage,
    PedidosPage,
    PedproductosPage,
    PeddetModalPage,
    ClienteInfoPage,
    ListacarteraPage,
    MapaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ClienteServiceProvider,
    ProductoServiceProvider,
    PedidoServiceProvider,
    AuthService,
    VendedorServiceProvider,
    CarteraServiceProvider,
    LocationServiceProvider,
    //NativeGeocoder,
    Geolocation,
    GoogleMaps, Geocoder,
    Toast
    
  ]
})
export class AppModule { }
