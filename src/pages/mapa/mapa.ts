import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions
} from '@ionic-native/google-maps';


/**
 * Generated class for the MapaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 * https://blog.ng-classroom.com/blog/ionic2/google-maps-and-geocoder/
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  coordenadas: { latitude, longitude };
  address: string = "";
  //latitude: string = '';
  //longitude: string = '';
  //markers: Array<{ title: string, longitude: string, latitude: string }>;

  map: GoogleMap;
  myPosition: any = {};

  markers: any[] = [
    {
      position:{
        latitude: -17.3666745,
        longitude: -66.2387878,
      },
      title:'Point 1',
      icon: 'www/assets/imgs/marker-green.png'
    },
    {
      position:{
        latitude: -17.3706884,
        longitude: -66.2397749,
      },
      title:'Point 2',
      icon: 'www/assets/imgs/marker-green.png'
    },
    {
      position:{
        latitude: -17.391398,
        longitude: -66.2407904,
      },
      title:'Point 3',
      icon: 'www/assets/imgs/marker-green.png'
    },
    {
      position:{
        latitude: -17.3878887,
        longitude: -66.223664,
      },
      title:'Point 4',
      icon: 'www/assets/imgs/marker-green.png'
    },
  ];



  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private googleMaps: GoogleMaps) {

    this.coordenadas = navParams.get('item');
    this.address = navParams.get('addres');

    this.myPosition = this.coordenadas;
    //this.latitude = this.coordenadas.latitude;
    //this.longitude = this.coordenadas.longitude;

  }

  ionViewDidLoad(){
    this.getCurrentPosition();
  }

  getCurrentPosition(){
    this.geolocation.getCurrentPosition()
    .then(position => {
      this.myPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      this.loadMap();
    })
    .catch(error=>{
      console.log(error);
    })
  }

  loadMap(){
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    // create CameraPosition
    let position: CameraPosition<LatLng> = {
      target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
      zoom: 12,
      tilt: 30
    };

    this.map.moveCamera(position);

    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      console.log('Map is ready!');

      // move the map's camera to position
      this.map.moveCamera(position);

      let markerOptions: MarkerOptions = {
        position: this.myPosition,
        title: "Hello",
        icon: 'www/assets/imgs/marker-pink.png'
      };

      this.addMarker(markerOptions);

      this.markers.forEach(marker=>{
        this.addMarker(marker);
      });
      
    });
  }

  addMarker(options){
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.position.latitude, options.position.longitude),
      title: options.title,
      icon: options.icon
    };
    this.map.addMarker(markerOptions);
  }
  
}
