import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Constants } from './../../../app/app.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { IMediaDetail } from '../../../interface/media-detail';

@Injectable()
export class GetMovieDetailService {
  private _getMovieDetailUrl: string;

  constructor(private _http: Http) { }

  getMovieDetail(movieId: number): Observable<IMediaDetail> {
    this._getMovieDetailUrl = Constants.API_URL + 'movie/' +  movieId + '?api_key=' + Constants.API_Key_v3 +
                              '&language=' + Constants.Default_Language;
    return this._http
              .get(this._getMovieDetailUrl)
              .map((response: Response) => {
                return <IMediaDetail>response.json();
              })
              .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
