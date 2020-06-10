import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgMarqueeModule } from 'ng-marquee';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './common/top-menu/top-menu.component';
import { QueBarComponent } from './common/que-bar/que-bar.component';
import { PlayerBarComponent } from './common/player-bar/player-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SongsComponent } from './pages/songs/songs.component';
import { CatagoriesComponent } from './pages/catagories/catagories.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SplashComponent } from './pages/splash/splash.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    QueBarComponent,
    PlayerBarComponent,
    HomeComponent,
    NotFoundPageComponent,
    SongsComponent,
    CatagoriesComponent,
    SigninComponent,
    SignupComponent,
    SplashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgMarqueeModule,
    environment.production ? [] : AkitaNgDevtools
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
