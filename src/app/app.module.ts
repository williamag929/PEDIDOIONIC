import { ListasucesosPage } from './../pages/listasucesos/listasucesos';
import { SucesoServiceProvider } from './../providers/suceso-service/suceso-service';
import { SucesoPage } from './../pages/suceso/suceso';
import { ClienteInfoPage } from './../pages/cliente-info/cliente-info';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { LoadingController } from 'ionic-angular'
import { AlertController } from "ionic-angular"

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ClientesPage } from '../pages/clientes/clientes';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { ListapedidosPage } from '../pages/listapedidos/listapedidos';
import { PedproductosPage } from '../pages/pedproductos/pedproductos';
import { PeddetModalPage } from '../pages/peddet-modal/peddet-modal';
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
import {SearchfilterPipe} from '../utilities/Search-filter.pipe';


//import {AgmCoreModule} from 'angular2-google-maps/core';
import { LocationServiceProvider } from '../providers/location-service/location-service';
//import {NativeGeocoder} from '@ionic-native/native-geocoder'

import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, Geocoder } from '@ionic-native/google-maps';
import { Toast } from '@ionic-native/toast';

import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { DocumentViewer } from '@ionic-native/document-viewer';




@NgModule({
  declarations: [
    MyApp,
    LoginPage, 
    HomePage,
    ListPage,
    ClientesPage,
    ClienteInfoPage,
    ListapedidosPage,
    PedidosPage,
    PedproductosPage,
    PeddetModalPage,
    ListacarteraPage,
    MapaPage,
    SearchfilterPipe,
    SucesoPage,
    ListasucesosPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    IonicPageModule.forChild(ClientesPage),
    IonicPageModule.forChild(ClienteInfoPage),
    IonicPageModule.forChild(ListacarteraPage),   
    IonicPageModule.forChild(ListacarteraPage), 
    IonicPageModule.forChild(ListapedidosPage),
    IonicPageModule.forChild(ListasucesosPage),
    IonicPageModule.forChild(PeddetModalPage),
    IonicPageModule.forChild(MapaPage),
    IonicPageModule.forChild(PedidosPage),
    IonicPageModule.forChild(PedproductosPage),
    IonicPageModule.forChild(SucesoPage),
    //AgmCoreModule.forRoot({apiKey:'AIzaSyA_ilIcEf7N06opMqZInZN10rfP3zz5QTs'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,    
    HomePage,
    ListPage,
    ClientesPage,
    ClienteInfoPage,
    ListapedidosPage,
    PedidosPage,
    PedproductosPage,
    PeddetModalPage,
    ListacarteraPage,
    MapaPage,
    SucesoPage,
    ListasucesosPage
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
    SucesoServiceProvider,
    //NativeGeocoder,
    Geolocation,
    GoogleMaps, Geocoder,
    Toast,
    File,
    DocumentViewer,
    FileTransfer    
  ]
})
export class AppModule { }
