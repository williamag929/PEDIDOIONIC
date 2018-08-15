import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedproductosPage } from './pedproductos';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    PedproductosPage,
  ],
  imports: [
    HttpModule,
    IonicPageModule.forChild(PedproductosPage),
  ],
})
export class PedproductosPageModule {}
