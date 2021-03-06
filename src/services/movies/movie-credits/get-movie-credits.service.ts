import { Constants } from './../../../app/app.constants';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { IMediaCredits } from '../../../interface/media-credits.interface';

@Injectable()
export class GetMovieCreditsService {
  private _getGetMovieCreditsUrl: string;

  constructor(private _http: Http) { }

  getCredits(movie_id: number): Observable<IMediaCredits> {
    this._getGetMovieCreditsUrl = Constants.API_URL + 'movie/' + movie_id + '/credits?api_key=' + Constants.API_Key_v3;

    return this._http
              .get(this._getGetMovieCreditsUrl)
              .map((response: Response) => {
                return <IMediaCredits>response.json();
              })
              .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
