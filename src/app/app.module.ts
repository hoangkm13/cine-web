import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import {HomeCineWebComponent} from "./cine-web/components/pages/home-cine-web/home-cine-web.component";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import { FooterCineComponent } from './cine-web/components/shared/footer-cine/footer-cine.component';
import { HeaderCineComponent } from './cine-web/components/shared/header-cine/header-cine.component';
import {HttpClientModule} from "@angular/common/http";
import {ApiModule, Configuration} from "./cine-web/cine-svc";
import {GlobalConstants} from "./cine-web/components/shared/GlobalConstants";
import { DetailFilmComponent } from './cine-web/components/pages/detail-film/detail-film.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeCineWebComponent,
    FooterCineComponent,
    HeaderCineComponent,
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
    ApiModule.forRoot(() => {
      return new Configuration({
        basePath: `${GlobalConstants.baseUrl}`
      })
    }),
    MatExpansionModule,
    HttpClientModule
  ],
  exports:[
    FooterCineComponent,
    HomeCineWebComponent,
    HeaderCineComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
