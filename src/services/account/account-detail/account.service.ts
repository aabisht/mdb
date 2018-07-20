import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Constants } from '../../../app/app.constants';
import { IAccountDetail } from '../../../interface/account-detail';

@Injectable()
export class AccountService {

  private _getAccountDetailUrl: string;

  constructor(private _http: Http) { }

  // Get Account Detail
  getAccountDetail(session_id: string): Observable<IAccountDetail> {
    this._getAccountDetailUrl = Constants.API_URL + 'account?api_key=' + Constants.API_Key_v3 + '&session_id=' + session_id;
    return this._http
              .get(this._getAccountDetailUrl)
              .map((response: Response) => {
                return <IAccountDetail>response.json();
              })
              .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
