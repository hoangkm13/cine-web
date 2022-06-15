import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import {HomeCineWebComponent} from "./cine-web/components/home-cine-web/home-cine-web.component";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {FooterCineComponent} from './cine-web/components/footer-cine/footer-cine.component';
import {SignInComponent} from './cine-web/components/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeCineWebComponent,
    FooterCineComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule
  ],
  exports: [
    FooterCineComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
