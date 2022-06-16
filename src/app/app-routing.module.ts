import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeCineWebComponent} from "./cine-web/components/home-cine-web/home-cine-web.component";
import {SignInComponent} from "./cine-web/components/sign-in/sign-in.component";
import {SignUpComponent} from "./cine-web/components/sign-up/sign-up.component";

let routes: Routes = [];
routes = [
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
export class AppRoutingModule {
}
