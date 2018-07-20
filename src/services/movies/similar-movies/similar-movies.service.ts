import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Constants } from './../../../app/app.constants';
import { IRelatedMedia } from '../../../interface/related-media';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SimilarMovieService {
  private _similarMovieServiceUrl: string;

  constructor(private _http: Http) { }

  getSimilarMovie(movieId: number, pageNumber?: number): Observable<IRelatedMedia> {
    this._similarMovieServiceUrl  = Constants.API_URL + 'movie/' + movieId + '/similar?api_key=' +
                                  Constants.API_Key_v3 + '&language' + Constants.Default_Language;

    if (pageNumber) {
      this._similarMovieServiceUrl = this._similarMovieServiceUrl + '&page=' + pageNumber;
    }
    return this._http
          .get(this._similarMovieServiceUrl)
          .map((response: Response) => {
            return <IRelatedMedia>response.json();
          })
          .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
