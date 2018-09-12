import { ExternalIdService } from './../services/movies/external-ids/external-ids.service';
import { SimilarMovieService } from './../services/movies/similar-movies/similar-movies.service';
import { MovieReviewService } from './../services/movies/moview-review/movie-review.service';
import { GetMovieDetailService } from './../services/movies/movie-details/get-movie-detail.service';
import { GetMovieCreditsService } from './../services/movies/movie-credits/get-movie-credits.service';
import { FooterBannerService } from './../services/footer-banner/footer-banner.service';
import { DiscoverMovieService } from './../services/discover/discover-movie.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MovieGenresListService } from '../services/Genres/movie-genres-list.service';
import { TVShowGenresListService } from '../services/Genres/tv-show-genres-list.service';
import { HomeModule } from '../pages/home/home.module';
import { LoginModule } from '../pages/login/login.module';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    HomeModule,
    LoginModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DiscoverMovieService,
    FooterBannerService,
    GetMovieDetailService,
    GetMovieCreditsService,
    MovieReviewService,
    SimilarMovieService,
    ExternalIdService,
    MovieGenresListService,
    TVShowGenresListService,
  ]
})
export class AppModule {}
