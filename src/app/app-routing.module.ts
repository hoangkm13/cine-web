import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeCineWebComponent} from "./cine-web/components/home-cine-web/home-cine-web.component";

let routes: Routes = [];
routes = [
  {
    path: 'cine-web',
    component: HomeCineWebComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
