import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Response {
  time: {
    updated: string;
  };
  bpi: {
    BRL: {
      rate_float: number;
    };
    USD: {
      rate_float: number;
    };
  };
}


@Injectable()
export class BitcoinService {
  list: Array<Response> = []; 

  constructor(private http: HttpClient) {
    if (this.list.length == 0) {
      this.update();
    }
    this.timerUpdate();
  }

  timerUpdate() {
    setInterval(() => {
      this.update();
    }, 60000);
  }

  verificarTaxa(velhaTaxa: number, novaTaxa: number) {
    if (velhaTaxa === novaTaxa) {
      return 0;
    }
    else {
      return 1;
    }
  }

  update() {
    this.http
      .get<Response>('https://api.coindesk.com/v1/bpi/currentprice/BRL.json')
      .subscribe((data) => {
        if (this.list.length == 0) {
          this.list.push(data);
        }

        if (
          this.verificarTaxa(
            this.list[this.list.length - 1].bpi.USD.rate_float,
            data.bpi.USD.rate_float) != 0 ||

          this.verificarTaxa(
            this.list[this.list.length - 1].bpi.BRL.rate_float,
            data.bpi.BRL.rate_float) != 0 ) 
            {
              this.list.push(data);
            }
      });
  }
}
