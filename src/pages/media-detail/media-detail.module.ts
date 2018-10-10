import { LoginCheckService } from './../../services/login-check/login-check.service';
import { GetMovieCreditsService } from './../../services/movies/movie-credits/get-movie-credits.service';
import { NgModule } from '@angular/core';
import { IonicModule, Events } from 'ionic-angular';
import { MediaDetail } from './media-detail';
import { GetMovieDetailService } from '../../services/movies/movie-details/get-movie-detail.service';
import { GetMovieVideosService } from '../../services/movies/get-video/get-movie-video.service';
import { ExternalIdService } from '../../services/movies/external-ids/external-ids.service';
import { MovieReviewService } from '../../services/movies/moview-review/movie-review.service';
import { HttpModule } from '@angular/http';

import { EmbedVideo } from 'ngx-embed-video';
import { MdbSimilarMediaCardComponent } from '../../components/mdb-similar-media-card/mdb-similar-media-card';

@NgModule({
  declarations: [
    MdbSimilarMediaCardComponent,
    MediaDetail
  ],
  imports: [
    HttpModule,
    IonicModule.forRoot(MediaDetail),
    EmbedVideo.forRoot(),
  ],
  entryComponents: [
    MediaDetail,
  ],
  providers: [
    GetMovieDetailService,
    GetMovieVideosService,
    ExternalIdService,
    GetMovieCreditsService,
    MovieReviewService,
    LoginCheckService,
    Events
  ],
  exports: [MdbSimilarMediaCardComponent]
})
export class MediaDetailModule {}
