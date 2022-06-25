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
import {SignInComponent} from "./cine-web/components/auth/sign-in/sign-in.component";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {SignUpComponent} from './cine-web/components/auth/sign-up/sign-up.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiModule, Configuration} from "./cine-web/cine-svc";
import {GlobalConstants} from "./cine-web/components/shared/GlobalConstants";
import {FooterCineComponent} from './cine-web/components/shared/footer-cine/footer-cine.component';
import {HeaderCineComponent} from './cine-web/components/shared/header-cine/header-cine.component';
import {DetailFilmComponent} from "./cine-web/components/pages/detail-film/detail-film.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ApiHttpInterceptor} from "./cine-web/components/shared/api-http-interceptor";
import {MatPaginatorModule} from "@angular/material/paginator";
import { UserProfileComponent } from './cine-web/components/pages/user-profile/user-profile.component';
import {MatDialogModule} from "@angular/material/dialog";

import {LandingCineWebComponent} from './cine-web/components/pages/landing-cine-web/landing-cine-web.component';

import {MatCardModule} from "@angular/material/card";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {MatTooltipModule} from "@angular/material/tooltip";
import { FilmsByGenreComponent } from './cine-web/components/pages/films-by-genre/films-by-genre.component';
import {NgxPaginationModule} from "ngx-pagination";
import { LoadingDataComponent } from './cine-web/components/shared/loading-data/loading-data.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ErrorDialogComponent } from './cine-web/components/shared/error-dialog/error-dialog.component';
import { VideoPlayerComponent } from './cine-web/components/shared/video-player/video-player.component';
import {MatSelectModule} from "@angular/material/select";
import { ClickStopPropagationDirective } from './cine-web/components/directives/click-stop-propagation.directive';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    HomeCineWebComponent,
    FooterCineComponent,
    HeaderCineComponent,
    SignInComponent,
    SignUpComponent,
    DetailFilmComponent,
    UserProfileComponent,
    LandingCineWebComponent,
    FilmsByGenreComponent,
    LoadingDataComponent,
    ErrorDialogComponent,
    VideoPlayerComponent,
    ClickStopPropagationDirective,
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
    MatCardModule,
    SlickCarouselModule,
    MatTooltipModule,
    MatPaginatorModule,
    NgxPaginationModule,
    ApiModule.forRoot(() => {
      return new Configuration({
        basePath: `${GlobalConstants.baseUrl}`
      })
    }),
    MatExpansionModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  exports: [
    FooterCineComponent,
    HomeCineWebComponent,
    HeaderCineComponent,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
