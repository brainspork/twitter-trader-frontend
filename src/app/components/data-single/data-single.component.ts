import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TwitterTraderService } from '../../services/twitter-trader.service';
import { Hour } from '../../models/Hour';

@Component({
  selector: 'app-data-single',
  templateUrl: './data-single.component.html',
  styleUrls: ['./data-single.component.css']
})
export class DataSingleComponent implements OnInit {

  stocks: Hour[];
  loaded: boolean = false;
  chartLabels: number[];
  chartData: any[];
  chartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        fontSize: 20
      }]
     }
  };
  chartLoaded: boolean = false;
  mobWidth: any;


  constructor(private twitterTraderService: TwitterTraderService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.mobWidth = (window.screen.width);
    const name = this.route.snapshot.paramMap.get('stock');
    this.twitterTraderService.getStockHourly(name).subscribe(stocks => {
      this.stocks = stocks;
      console.log(this.stocks);
      this.initChart(stocks, () => this.chartLoaded = true);
      this.loaded = true;
    });
  }

  initChart(stocks: Hour[], callback) {
    this.chartLabels = stocks.map(curr => {return new Date(curr.date).getHours()});
    this.chartData = [{
      borderColor: '#0084b4',
      data: stocks.map(curr => {return curr.count}), 
      label: stocks[0].name, 
      fill: false, 
      lineTension: 0
    }];
    callback();
  }
}
