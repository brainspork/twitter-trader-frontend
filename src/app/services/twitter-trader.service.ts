import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Hour } from '../models/Hour';
import { Average } from '../models/Average';
import { Day } from '../models/Day';

@Injectable()
export class TwitterTraderService {

  url: string = 'https://twitter-trader.herokuapp.com/api/tracker';

  constructor(private http: HttpClient) { }

  getStocks() : Observable<Hour[]> {
    let getUrl = this.url + '/retrieve/list/stock';
    return this.http.get<Hour[]>(getUrl);
  }

  getStockHourly(stock) : Observable<Hour[]> {
    let getUrl = this.url + '/retrieve/all/hours/' + stock;
    return this.http.get<Hour[]>(getUrl);
  }

  getStocksDaily(stock) : Observable<Day[]> {
    let getUrl = this.url + '/retrieve/all/days/' + stock;
    return this.http.get<Day[]>(getUrl);
  }
}
