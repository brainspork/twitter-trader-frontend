import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataListComponent } from './components/data-list/data-list.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'stocks', component: DataListComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
