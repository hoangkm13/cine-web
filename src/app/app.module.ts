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
import {HeaderCineComponent} from './cine-web/components/header-cine/header-cine.component';
import {SignInComponent} from "./cine-web/components/sign-in/sign-in.component";
import {ReactiveFormsModule} from "@angular/forms";
import { SignUpComponent } from './cine-web/components/sign-up/sign-up.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    AppComponent,
    HomeCineWebComponent,
    FooterCineComponent,
    HeaderCineComponent,
    SignInComponent,
    SignUpComponent
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
    MatCheckboxModule
  ],
  exports: [
    FooterCineComponent,
    HomeCineWebComponent,
    HeaderCineComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
