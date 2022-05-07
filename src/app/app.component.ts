import { Component, VERSION } from '@angular/core';
import { BitcoinService } from './bitcoin.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Atualização de taxa do BitCoin';
  head = 'Renê Pádua - RA: 0050xxxxx23';

  constructor(
    public bitcoinService: BitcoinService
    ){}

updateBitcoinRates(){
  this.bitcoinService.update();
}

}
