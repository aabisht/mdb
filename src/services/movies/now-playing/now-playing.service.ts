import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Constants } from '../../../app/app.constants';
import { IMovieResult } from '../../../interface/movie';

@Injectable()
export class NowPlayingMovieService {
  private _nowPlayingMovieUrl: string ;

  constructor(private _http: Http) { }

  getNowPlayingMovie(pageNumber?: number): Observable<IMovieResult[]> {
    this._nowPlayingMovieUrl = Constants.API_URL + 'movie/now_playing?api_key=' +
                                Constants.API_Key_v3 + '&language' + Constants.Default_Language;
    if (pageNumber) {
      this._nowPlayingMovieUrl = this._nowPlayingMovieUrl + '&page=' + pageNumber;
    }
    return this._http
          .get(this._nowPlayingMovieUrl)
          .map((response: Response) => {
            return <IMovieResult[]>response.json().results;
          })
          .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
