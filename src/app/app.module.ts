import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TwitterTraderService } from './services/twitter-trader.service';
import { DataSingleComponent } from './components/data-single/data-single.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DataListComponent,
    HomeComponent,
    NotFoundComponent,
    DataSingleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [TwitterTraderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
