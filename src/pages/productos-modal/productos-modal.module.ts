import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductosModalPage } from './productos-modal';

@NgModule({
  declarations: [
    ProductosModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductosModalPage),
  ],
})
export class ProductosModalPageModule {}
