import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Constants } from '../../app/app.constants';
import { IGenres } from '../../interface/genres.interface';
import 'rxjs/Rx';

@Injectable()
export class TVShowGenresListService {
  private _getTVShowsGenresListUrl: string;

  constructor(private _http: Http) { }

  getTVShowGenresList(): Observable<IGenres> {
    this._getTVShowsGenresListUrl = Constants.API_URL + 'genre/tv/list?api_key=' + Constants.API_Key_v3 +
      '&language=' + Constants.Default_Language;

      return this._http
                 .get(this._getTVShowsGenresListUrl)
                 .map((response: Response) => {
                  return <IGenres>response.json();
                 })
                 .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
