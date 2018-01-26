import { Component, OnInit } from '@angular/core';
import { TwitterTraderService } from '../../services/twitter-trader.service';
import { Hour } from '../../models/Hour';
import { Average } from '../../models/Average';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {

  stocks: Hour[];
  stocksLoaded: boolean = false;

  constructor(private twitterTraderService: TwitterTraderService) { }

  ngOnInit() {
    this.twitterTraderService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
      console.log(stocks[0]);
      this.stocksLoaded = true;
    });
  }
}
