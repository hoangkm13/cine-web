import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "./cine-web/components/auth/sign-in/sign-in.component";
import {SignUpComponent} from "./cine-web/components/auth/sign-up/sign-up.component";
import {HomeCineWebComponent} from "./cine-web/components/pages/home-cine-web/home-cine-web.component";
import {DetailFilmComponent} from "./cine-web/components/pages/detail-film/detail-film.component";
import {LandingCineWebComponent} from "./cine-web/components/pages/landing-cine-web/landing-cine-web.component";
import {FilmsByGenreComponent} from "./cine-web/components/pages/films-by-genre/films-by-genre.component";
import {ErrorDialogComponent} from "./cine-web/components/shared/error-dialog/error-dialog.component";

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
  },
  {
    path: "sign-in",
    component: SignInComponent
  },
  {
    path: "sign-up",
    component: SignUpComponent
  },
  {
    path: "welcome",
    component: LandingCineWebComponent
  },
  {
    path: "films/:genre",
    component: FilmsByGenreComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollOffset: [0, 0],
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
