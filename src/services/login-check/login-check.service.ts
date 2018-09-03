import { IAccountDetail } from './../../interface/account-detail';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginCheckService {

  private _accData1: IAccountDetail;

  private hsLogin = new BehaviorSubject<boolean>(false);
  private accData = new BehaviorSubject<IAccountDetail>(this._accData1);
  currentHsLogin = this.hsLogin.asObservable();
  accountData = this.accData.asObservable();

  @Output() _hsLogin: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  checkLogin(isLogin: boolean) {
    this.hsLogin.next(isLogin);
  }

  updateAccountDetail(_accData: IAccountDetail) {
    this.accData.next(_accData);
  }

}
