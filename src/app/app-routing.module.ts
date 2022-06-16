import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "./cine-web/components/pages/sign-in/sign-in.component";
import {SignUpComponent} from "./cine-web/components/pages/sign-up/sign-up.component";
import {HomeCineWebComponent} from "./cine-web/components/pages/home-cine-web/home-cine-web.component";

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
    component: HomeCineWebComponent
  },
  {
    path: "sign-in",
    component: SignInComponent
  },
  {
    path: "sign-up",
    component: SignUpComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
