import { Component, OnInit } from '@angular/core';
import { ViewController, ToastController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { LoginCheckService } from '../../services/login-check/login-check.service';
import { AccountService } from '../../services/account/account-detail/account.service';
import { IRequestToken, IValidateWithLogin, ISession } from '../../interface/authentication.interface';
import { Constants } from '../../app/app.constants';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  loginForm : FormGroup;
  isLogin: boolean;
  userData = {'username': '', 'password': ''};
  bannerImage: string;

  constructor(public _viewCtrl: ViewController,
              private _formBuilder: FormBuilder,
              private _toastCtrl: ToastController,
              private _authenticationService: AuthenticationService,
              private _loginCheckService: LoginCheckService,
              private _accountService: AccountService,
              private _events: Events) {}

  public ngOnInit() {

    if(sessionStorage.getItem('sessionID')) {
      this._loginCheckService.checkLogin(true);
      this._loginCheckService.currentHsLogin.subscribe(isLogin => this.isLogin = isLogin);
      this.dismiss();
    }

    this.getBannerImage();

    this.loginForm = this._formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

  }

  dismiss() {
    this._viewCtrl.dismiss();
  }

  toastMessage(message: string) {
    let toast = this._toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  onLogin() {
    if(this.loginForm.controls.username.value && this.loginForm.controls.password.value) {
      this.userData.username = this.loginForm.controls.username.value;
      this.userData.password = this.loginForm.controls.password.value;
      this.getRequestToken();
    }
  }

  getRequestToken(): void {
    this._authenticationService.getRequestToken()
      .subscribe(
        data => this.authenticateUser(data),
        error => {
          let errorMSG = JSON.parse(error._body);
          this.toastMessage(errorMSG.status_message);
        }
      );
  }

  authenticateUser(data: IRequestToken): void {
    if(data.success) {
      this._authenticationService.validateWithLogin(this.userData.username, this.userData.password, data.request_token)
        .subscribe(
          validateData => this.getSessionId(validateData),
          error => {
            let errorMSG = JSON.parse(error._body);
            this.toastMessage(errorMSG.status_message);
          }
        )
    }
  }

  getSessionId(data: IValidateWithLogin): void {
    if(data.success) {
      this._authenticationService.getSessionID(data.request_token)
        .subscribe(
          sessionData => {
            if(sessionData.success) {
              sessionStorage.setItem('sessionID', sessionData.session_id);
              this.getAccountDetail(sessionData)
            }
          },
          error => {
            let errorMSG = JSON.parse(error._body);
            this.toastMessage(errorMSG.status_message);
          }
        )
    }
  }

  getAccountDetail(data: ISession): void {
    this._accountService.getAccountDetail(data.session_id)
      .subscribe(
        accountData => {
          sessionStorage.setItem('avatar', Constants.Gravatar_Path + accountData.avatar.gravatar.hash);
          sessionStorage.setItem('accountDetail', JSON.stringify(accountData));
          this._events.publish('user:login');
          this.dismiss();
        },
        error => {
          let errorMSG = JSON.parse(error._body);
          this.toastMessage(errorMSG.status_message);
        }
      )
  }

  getBannerImage() {
    if(localStorage.getItem('poster-path')) {
      this.bannerImage = localStorage.getItem('poster-path');
    }
  }

}
