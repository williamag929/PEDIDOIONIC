import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientesPage } from './clientes';
import {HttpModule} from '@angular/http';
import {SearchfilterPipe} from '../../utilities/Search-filter.pipe';

@NgModule({
  declarations: [
    ClientesPage,
    SearchfilterPipe
  ],
  imports: [
    HttpModule,
    IonicPageModule.forChild(ClientesPage),
  ],

})
export class ClientesPageModule {}
