import { Constants } from './../../app/app.constants';
import { IRequestToken, IValidateWithLogin, ISession } from './../../interface/authentication.interface';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AuthenticationService {

  private _getRequestTokenUrl = Constants.API_URL + 'authentication/token/new?api_key=' + Constants.API_Key_v3;
  private _validateWithLoginUrl: string;
  private _getSessionIDUrl: string;

  constructor(private _http: Http) { }

  // Get Request Token
  getRequestToken(): Observable<IRequestToken> {
    return this._http
            .get(this._getRequestTokenUrl)
            .map((response: Response) => {
              return <IRequestToken>response.json();
            })
            .catch(this.handleError);
  }

  // Create Session With Login
  validateWithLogin(username: string, password: string, request_token: string): Observable<IValidateWithLogin> {
    if (username && password && request_token) {
      // tslint:disable-next-line:max-line-length
      this._validateWithLoginUrl = Constants.API_URL + 'authentication/token/validate_with_login?api_key=' + Constants.API_Key_v3 + '&username=' + username + '&password=' + password + '&request_token=' + request_token;
      return this._http
              .get(this._validateWithLoginUrl)
              .map((response: Response) => {
                return <IValidateWithLogin>response.json();
              })
              .catch(this.handleError);
    }
  }

  // Create Session
  getSessionID(request_token: string): Observable<ISession> {
    if (request_token) {
      // tslint:disable-next-line:max-line-length
      this._getSessionIDUrl = Constants.API_URL + 'authentication/session/new?api_key=' + Constants.API_Key_v3 + '&request_token=' + request_token;
      return this._http
              .get(this._getSessionIDUrl)
              .map((response: Response) => {
                return <ISession>response.json();
              })
              .catch(this.handleError);
    }
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}