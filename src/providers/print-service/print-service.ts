import { Injectable } from '@angular/core';
import domtoimage from 'dom-to-image';

/*
  Generated class for the PrintProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrintProvider {

  constructor() {
    console.log('Hello PrintProvider Provider');
  }

  print(componetName){
    var node = document.getElementById(componetName);

    domtoimage.toPng(node)
    .then(function (dataurl)
    {
      var popup = window.open();
      popup.document.write('<img src='+ dataurl + '>');
      popup.document.close();
      popup.focus();
      popup.print();
      popup.close();
    }).catch(function(error){
      console.error('something went wrong!',error);
    });
  }

}
