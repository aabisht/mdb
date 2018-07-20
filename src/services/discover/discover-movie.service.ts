import { Constants } from './../../app/app.constants';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IMovieResult } from '../../interface/movie';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class DiscoverMovieService {
  private _discoverMovieUrl = Constants.API_URL + 'discover/movie?api_key=' +
                              Constants.API_Key_v3 + '&language' + Constants.Default_Language;

  constructor(private _http: Http) { }

  getDiscoverMovie(sort_by?: string, page?: number, year?: number, region?: string,
    primary_release_year?: number, include_adult?: boolean, include_video?: boolean): Observable<IMovieResult[]> {
      if (region) {
        this._discoverMovieUrl = this._discoverMovieUrl + '&region=' + region.toLocaleUpperCase();
      }
      if (sort_by) {
        this._discoverMovieUrl = this._discoverMovieUrl + '&sort_by=' + sort_by;
      }
      if (include_adult) {
        this._discoverMovieUrl = this._discoverMovieUrl + '&include_adult=' + include_adult;
      } else {
        this._discoverMovieUrl = this._discoverMovieUrl + '&include_adult=false';
      }
      if (include_video) {
        this._discoverMovieUrl = this._discoverMovieUrl + '&include_video=' + include_video;
      } else {
        this._discoverMovieUrl = this._discoverMovieUrl + '&include_video=false';
      }
      if (page) {
        this._discoverMovieUrl = this._discoverMovieUrl + '&page=' + page;
      } else {
        this._discoverMovieUrl = this._discoverMovieUrl + '&page=1';
      }
      if (primary_release_year) {
        this._discoverMovieUrl = this._discoverMovieUrl + '&primary_release_year=' + primary_release_year;
      }
      if (year) {
        this._discoverMovieUrl = this._discoverMovieUrl + '&year=' + year;
      }
      return this._http
          .get(this._discoverMovieUrl)
          .map((response: Response) => {
            return <IMovieResult[]>response.json().results;
          })
          .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
