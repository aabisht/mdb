import { Constants } from './../../../app/app.constants';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { IMediaVideo } from '../../../interface/media-video';

@Injectable()
export class GetMovieVideosService {
  private _getGetMovieVideosUrl: string;

  constructor(private _http: Http) { }

  getCredits(movie_id: number): Observable<IMediaVideo> {
    this._getGetMovieVideosUrl = Constants.API_URL + 'movie/' + movie_id + '/videos?api_key=' + Constants.API_Key_v3;

    return this._http
              .get(this._getGetMovieVideosUrl)
              .map((response: Response) => {
                return <IMediaVideo>response.json();
              })
              .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
