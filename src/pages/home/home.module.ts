import { AddToWatchlistService } from './../../services/account/add-to-watchlist/add-to-watchlist.service';
import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { HomeTVShowTabsPage } from './homeTVShowTabsPage/homeTVShowTabsPage';
import { HomeMovieTabPage } from './homeMovieTabPage/homeMovieTabPage';
import { NowPlayingMovieService } from '../../services/movies/now-playing/now-playing.service';
import { OnTheAirTVService } from '../../services/tv/on-the-air.service';
import { MdbHeaderComponent } from '../../components/mdb-header/mdb-header';
import { IonicPageModule } from 'ionic-angular';
import { MdbMediaCardComponent } from '../../components/mdb-media-card/mdb-media-card';

@NgModule({
  declarations: [
    MdbHeaderComponent,
    MdbMediaCardComponent,
    HomePage,
    HomeMovieTabPage,
    HomeTVShowTabsPage
  ],
  imports: [
    IonicPageModule.forChild(MdbHeaderComponent),
  ],
  entryComponents: [
    MdbHeaderComponent,
    MdbMediaCardComponent,
    HomePage,
    HomeMovieTabPage,
    HomeTVShowTabsPage
  ],
  providers: [
    NowPlayingMovieService,
    OnTheAirTVService,
    AddToWatchlistService
  ]
})
export class HomeModule {}
