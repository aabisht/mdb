import { HomeTVShowTabsPage } from './../pages/home/homeTVShowTabsPage/homeTVShowTabsPage';
import { HomeMovieTabPage } from './../pages/home/homeMovieTabPage/homeMovieTabPage';
import { ExternalIdService } from './../services/movies/external-ids/external-ids.service';
import { SimilarMovieService } from './../services/movies/similar-movies/similar-movies.service';
import { MovieReviewService } from './../services/movies/moview-review/movie-review.service';
import { GetMovieDetailService } from './../services/movies/movie-details/get-movie-detail.service';
import { GetMovieCreditsService } from './../services/movies/movie-credits/get-movie-credits.service';
import { AccountService } from './../services/account/account-detail/account.service';
import { LoginCheckService } from './../services/login-check/login-check.service';
import { AuthenticationService } from './../services/authentication/authentication.service';
import { FooterBannerService } from './../services/footer-banner/footer-banner.service';
import { OnTheAirTVService } from './../services/tv/on-the-air.service';
import { NowPlayingMovieService } from './../services/movies/now-playing/now-playing.service';
import { DiscoverMovieService } from './../services/discover/discover-movie.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MdbHeaderComponent } from '../components/mdb-header/mdb-header';
import { LoginPage } from '../pages/login/login';
import { MdbMediaCardComponent } from '../components/mdb-media-card/mdb-media-card';
import { MovieGenresListService } from '../services/Genres/movie-genres-list.service';
import { TVShowGenresListService } from '../services/Genres/tv-show-genres-list.service';

@NgModule({
  declarations: [
    MyApp,
    MdbHeaderComponent,
    HomePage,
    ListPage,
    LoginPage,
    HomeMovieTabPage,
    HomeTVShowTabsPage,
    MdbMediaCardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MdbHeaderComponent,
    HomePage,
    ListPage,
    LoginPage,
    HomeMovieTabPage,
    HomeTVShowTabsPage,
    MdbMediaCardComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DiscoverMovieService,
    NowPlayingMovieService,
    OnTheAirTVService,
    FooterBannerService,
    AuthenticationService,
    LoginCheckService,
    AccountService,
    GetMovieDetailService,
    GetMovieCreditsService,
    MovieReviewService,
    SimilarMovieService,
    ExternalIdService,
    MovieGenresListService,
    TVShowGenresListService
  ]
})
export class AppModule {}
