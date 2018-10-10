import { LoginCheckService } from './../../services/login-check/login-check.service';
import { Constants } from './../../app/app.constants';
import { SimilarMovieService } from './../../services/movies/similar-movies/similar-movies.service';
import { IRelatedMedia } from './../../interface/related-media';
import { MovieReviewService } from './../../services/movies/moview-review/movie-review.service';
import { MediaReviews } from './../../interface/media.reviews.interface';
import { IExternalIDS } from './../../interface/external-ids.interface';
import { IMediaVideoResult } from './../../interface/media-video';
import { GetMovieVideosService } from './../../services/movies/get-video/get-movie-video.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewController, NavParams, Events } from 'ionic-angular';
import { GetMovieDetailService } from '../../services/movies/movie-details/get-movie-detail.service';
import { IMediaDetail } from '../../interface/media-detail';
import { ExternalIdService } from '../../services/movies/external-ids/external-ids.service';
import { GetMovieCreditsService } from '../../services/movies/movie-credits/get-movie-credits.service';
import { IMediaCredits } from '../../interface/media-credits.interface';
import { DomSanitizer} from '@angular/platform-browser';

import { Slides } from 'ionic-angular';

import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'media-detail',
  templateUrl: 'media-detail.html'
})
export class MediaDetail implements OnInit {
  @ViewChild(Slides) slides: Slides;
  mediaData: IMediaDetail;
  mediaVideo: IMediaVideoResult[];
  mediaId: number;
  mediaType: string;
  mediaExternalId: IExternalIDS;
  mediaCredits: IMediaCredits;
  mediaReview: MediaReviews;
  similarMedia: IRelatedMedia;
  media_traler_iframe: any;
  watch_media_iframe: any;
  isLogin: boolean;

  constructor(private _viewCtrl: ViewController,
              private _param: NavParams,
              private _embedService: EmbedVideoService,
              private _getMovieDetailService: GetMovieDetailService,
              private _getMovieVideosService: GetMovieVideosService,
              private _externalIdService: ExternalIdService,
              private _getMovieCreditsService: GetMovieCreditsService,
              private _movieReviewService: MovieReviewService,
              private _similarMovieService: SimilarMovieService,
              private _sanitizer: DomSanitizer,
              private _loginCheckService: LoginCheckService,
              private _events: Events) {}

  public ngOnInit() {
    this.mediaId = this._param.get('mediaId');
    this.mediaType = this._param.get('mediaType');
    this.checkLogin();

    this._getMovieDetailService.getMovieDetail(this.mediaId)
      .subscribe(
        data => {
          if(data.backdrop_path == null) {
            data.backdrop_path = "./assets/imgs/img-not-available-banner.jpg";
          } else {
            data.backdrop_path = Constants.Images_Base_Path + 'original' + data.backdrop_path;
          }

          if(data.poster_path == null) {
            data.poster_path = "./assets/imgs/img-not-available-poster.jpg";
          } else {
            data.poster_path = Constants.Images_Base_Path + 'original' + data.poster_path;
          }

          data.runtime_string = this.convertRuntime(data.runtime);

          this.mediaData = data;
          this.watch_media_iframe = this._sanitizer.bypassSecurityTrustResourceUrl(Constants.Watch_Movie_URL() + data.imdb_id) ;
        },
        error => {
          console.log('Error: ' + error);
        }
    );

    this._getMovieVideosService.getCredits(this.mediaId)
      .subscribe(
        data => {
          this.mediaVideo = data.results;
          if(this.mediaVideo.length > 0) {
            this.media_traler_iframe = this._embedService.embed_youtube(this.mediaVideo[0].key + '?autoplay=1&loop=1&rel=0&controls=0&showinfo=0', {attr: {allow: 'autoplay=1; loop=1; encrypted-media', frameborder: '0'}});
          }
        },
        error => {
          console.log('Error: ' + error);
        }
    );

    this._externalIdService.getExternalIds(this.mediaId)
      .subscribe(
        data => {
          this.mediaExternalId = data;
        },
        error => {
          console.log('Error: ' + error);
        }
    );

    this._getMovieCreditsService.getCredits(this.mediaId)
      .subscribe(
        data => {
          data.cast = this.replaceCastCrewImg(data.cast);
          data.crew = this.replaceCastCrewImg(data.crew);
          this.mediaCredits = data;
        },
        error => {
          console.log('Error: ' + error);
        }
    );

    this._movieReviewService.getMovieReviews(this.mediaId)
      .subscribe(
        data => {
          this.mediaReview = data;
        },
        error => {
          console.log('Error: ' + error);
        }
    );

    this._similarMovieService.getSimilarMovie(this.mediaId)
      .subscribe(
        data => {
          this.similarMedia = data;
        },
        error => {
          console.log('Error: ' + error);
        }
    );

  }

  replaceCastCrewImg(data: any[]): any {
    data.forEach(function(cast) {
      if(cast.profile_path == null ) {
        if(cast.gender == 2 || cast.gender == 0) {
          cast.profile_path = './assets/imgs/no-cast-male.jpg'
        } else if(cast.gender == 1) {
          cast.profile_path = './assets/imgs/no-cast-female.jpg'
        }
      } else {
        cast.profile_path = Constants.Images_Base_Path + 'w200' + cast.profile_path;
      }
    });

    return data;
  }

  dismiss() {
    this._viewCtrl.dismiss();
  }

  checkLogin(): void {
    if(sessionStorage.getItem('sessionID')) {
      this._loginCheckService.checkLogin(true);
    }
    this._loginCheckService.currentHsLogin.subscribe(isLogin => this.isLogin = isLogin);

    // Check for logged in case
    this._events.subscribe('user:login', () => {
      this.isLogin = this.checkforLoginData();
    });

    this._events.subscribe('user:logout', () => {
      this.isLogin = this.checkforLoginData();
    });

    this.isLogin = this.checkforLoginData();
  }

  checkforLoginData(): boolean {
    return (sessionStorage.getItem('accountDetail')) ? true : false;
  }

  convertRuntime(runtime: number): string {
    let time: string = '';
    if(runtime > 60) {
      time = Math.floor(runtime/60) + 'hr ' + (runtime%60) + 'min';
    } else {
      time = runtime + 'min'
    }
    return time;
  }

}
