import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Constants } from './../../../app/app.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { MediaReviews } from '../../../interface/media.reviews.interface';

@Injectable()
export class MovieReviewService {
  private _getMovieReviewsUrl: string;

  constructor(private _http: Http) { }

  getMovieReviews(movieId: number, pageNumber?: number): Observable<MediaReviews> {
    this._getMovieReviewsUrl = Constants.API_URL + 'movie/' +  movieId + '/reviews?api_key=' + Constants.API_Key_v3 +
                                '&language=' + Constants.Default_Language;
    if (pageNumber) {
      this._getMovieReviewsUrl = this._getMovieReviewsUrl + '&page=' + pageNumber;
    } else {
      this._getMovieReviewsUrl = this._getMovieReviewsUrl + '&page=1';
    }
    return this._http
          .get(this._getMovieReviewsUrl)
          .map((response: Response) => {
            return <MediaReviews>response.json();
          })
          .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
