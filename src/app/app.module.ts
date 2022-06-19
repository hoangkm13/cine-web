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
import { SignUpComponent } from './cine-web/components/pages/sign-up/sign-up.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiModule, Configuration} from "./cine-web/cine-svc";
import {GlobalConstants} from "./cine-web/components/shared/GlobalConstants";
import { FooterCineComponent } from './cine-web/components/shared/footer-cine/footer-cine.component';
import { HeaderCineComponent } from './cine-web/components/shared/header-cine/header-cine.component';
import {DetailFilmComponent} from "./cine-web/components/pages/detail-film/detail-film.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {_providers} from "./provider";
import {ApiHttpInterceptor, apiHttpInterceptorProvider} from "./cine-web/components/shared/api-http-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomeCineWebComponent,
    FooterCineComponent,
    HeaderCineComponent,
    SignInComponent,
    SignUpComponent,
    DetailFilmComponent
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
    NgbModule
  ],
  exports: [
    FooterCineComponent,
    HomeCineWebComponent,
    HeaderCineComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
