import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeCineWebComponent} from "./cine-web/components/pages/home-cine-web/home-cine-web.component";
import {DetailFilmComponent} from "./cine-web/components/pages/detail-film/detail-film.component";

let routes: Routes = [];
routes = [
  {
    path: '',
    component: HomeCineWebComponent
  },
  {
    path: '#',
    component: HomeCineWebComponent
  },
  {
    path: 'cine-web',
    component: HomeCineWebComponent,
  },
  {
    path: 'film/:id/detail',
    component: DetailFilmComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
