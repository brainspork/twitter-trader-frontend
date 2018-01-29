import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TwitterTraderService } from '../../services/twitter-trader.service';
import { Hour } from '../../models/Hour';
import { Day } from '../../models/Day';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-data-single',
  templateUrl: './data-single.component.html',
  styleUrls: ['./data-single.component.css']
})
export class DataSingleComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  stocks: Hour[];
  dayCount: Day[];
  loaded: boolean = false;
  chartLabels: number[];
  chartData: any[];
  chartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          userCallback: function (label, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label;
            }

          },
        }
      }],
      xAxes: [{
        ticks: {
          autoSkip: true,
          stepSize: 1,
          min: 12
        }
      }]
    }
  };
  chartLoaded: boolean = false;
  dayChart: boolean = false;
  mobWidth: any;


  constructor(private twitterTraderService: TwitterTraderService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.mobWidth = (window.screen.width);
    const name = this.route.snapshot.paramMap.get('stock');
    this.twitterTraderService.getStockHourly(name).subscribe(stocks => {
      this.stocks = stocks;
      this.initChart(stocks);
      this.loaded = true;
    });

    this.twitterTraderService.getStocksDaily(name).subscribe(stocks => {
      this.dayCount = stocks;
    });
  }

  initChart(stocks) {
    this.chartLabels = stocks.map(curr => {
      if (!this.dayChart) {
        return new Date(curr.date).getHours();
      } else {
        return curr.date
      }
    });

    this.chartData = [{
      data: stocks.map(curr => { return curr.count }),
      label: stocks[0].name,
      lineTension: 0
    }];

    this.refresh_chart();

    this.chartLoaded = true;
  }

  switchHourChart(data: Hour[]) {
    this.dayChart = false;
    this.initChart(data);
  }

  switchDayChart(data: Day[]) {
    this.dayChart = true;
    this.initChart(data);
  }

  refresh_chart() {
    setTimeout(() => {
      if (this.chart && this.chart.chart && this.chart.chart.config) {
        this.chart.chart.config.data.labels = this.chartLabels;
        this.chart.chart.config.data.datasets = this.chartData;
        this.chart.chart.update();
      }
    });
  }
}
