import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import {HomeCineWebComponent} from "./cine-web/components/pages/home-cine-web/home-cine-web.component";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {SignInComponent} from "./cine-web/components/pages/sign-in/sign-in.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {HttpClientModule} from "@angular/common/http";
import {ApiModule, Configuration} from "./cine-web/cine-svc";
import {GlobalConstants} from "./cine-web/components/shared/GlobalConstants";
import {DetailFilmComponent} from "./cine-web/components/pages/detail-film/detail-film.component";

import {FooterCineComponent} from './cine-web/components/shared/footer-cine/footer-cine.component';
import {HeaderCineComponent} from './cine-web/components/shared/header-cine/header-cine.component';
import {LandingCineWebComponent} from './cine-web/components/pages/landing-cine-web/landing-cine-web.component';
import {SignUpComponent} from "./cine-web/components/pages/sign-up/sign-up.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeCineWebComponent,
    FooterCineComponent,
    HeaderCineComponent,
    DetailFilmComponent,
    SignInComponent,
    SignUpComponent,
    LandingCineWebComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ApiModule.forRoot(() => {
      return new Configuration({
        basePath: `${GlobalConstants.baseUrl}`
      })
    }),
    MatExpansionModule,
    HttpClientModule,
  ],
  exports: [
    FooterCineComponent,
    HomeCineWebComponent,
    HeaderCineComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
