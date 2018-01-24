import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Hour } from '../models/Hour';

@Injectable()
export class TwitterTraderService {

  url: string = 'https://twitter-trader.herokuapp.com/api/tracker';

  constructor(private http: HttpClient) { }

  getStocks() : Observable<Hour[]> {
    let getUrl = this.url + '/retrieve/list/stock';
    return this.http.get<Hour[]>(getUrl);
  }

}
