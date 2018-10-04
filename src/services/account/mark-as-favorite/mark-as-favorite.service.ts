import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Constants } from '../../../app/app.constants';
import { IAddToWatchlist } from '../../../interface/add-to-watchlist.interface';

@Injectable()
export class MarkAsFavoriteService {
  private _getMarkAsFavoriteUrl: string;

  constructor(private _http: Http) { }

  private handleError(error: Response) {
    return Observable.throw(error);
  }

  markFavorite(account_id: number, session_id: string, media_type: string, media_id: number, favorite: boolean): Observable<IAddToWatchlist> {
    this._getMarkAsFavoriteUrl = Constants.API_URL + 'account/'+ account_id +'/favorite?api_key=' + Constants.API_Key_v3 + '&session_id=' + session_id;
    let parameter_with_header = {
      media_type: media_type,
      media_id: media_id,
      favorite: favorite
    }

    return this._http
              .post(this._getMarkAsFavoriteUrl, parameter_with_header)
              .map((response: Response) => {
                return <IAddToWatchlist>response.json();
              })
              .catch(this.handleError);
  }
}
