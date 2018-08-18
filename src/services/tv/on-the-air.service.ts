import { Constants } from './../../app/app.constants';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ITVResult } from '../../interface/tv';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class OnTheAirTVService {
  private _onTheAirTVUrl: string;

  constructor(private _http: Http) { }

  getOnTheAirTV(pageNumber?: number): Observable<ITVResult[]> {
    this._onTheAirTVUrl = Constants.API_URL + 'tv/on_the_air?api_key=' +
                          Constants.API_Key_v3 + '&language' + Constants.Default_Language;
    if (pageNumber) {
      this._onTheAirTVUrl = this._onTheAirTVUrl + '&page=' + pageNumber;
    }
    return this._http
          .get(this._onTheAirTVUrl)
          .map((response: Response) => {
            return <ITVResult[]>response.json().results;
          })
          .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
