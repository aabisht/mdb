import { Constants } from './../../../app/app.constants';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { IExternalIDS } from '../../../interface/external-ids.interface';

@Injectable()
export class ExternalIdService {
  private _getExternalIdsUrl: string;

  constructor(private _http: Http) { }

  getExternalIds(movieId: number): Observable<IExternalIDS> {
    this._getExternalIdsUrl = Constants.API_URL + 'movie/' +  movieId + '/external_ids?api_key=' + Constants.API_Key_v3 +
                                '&language=' + Constants.Default_Language;
    return this._http
          .get(this._getExternalIdsUrl)
          .map((response: Response) => {
            return <IExternalIDS>response.json();
          })
          .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
