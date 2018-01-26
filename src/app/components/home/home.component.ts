import { Component, OnInit } from '@angular/core';
import { TwitterTraderService } from '../../services/twitter-trader.service';

import { Hour } from '../../models/Hour';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  trendingStocks: Hour[];
  stocksLoaded: boolean = false;

  constructor(private twitterTraderService: TwitterTraderService) { }

  ngOnInit() {
    this.twitterTraderService.getStocks().subscribe(stocks => {
      this.trendingStocks = stocks.filter(curr => {return curr.trending === true});
      this.stocksLoaded = true;
    });
  }

}
