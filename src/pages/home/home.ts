import { HomeTVShowTabsPage } from './homeTVShowTabsPage/homeTVShowTabsPage';
import { HomeMovieTabPage } from './homeMovieTabPage/homeMovieTabPage';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginCheckService } from '../../services/login-check/login-check.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  tab1Root = HomeMovieTabPage;
  tab2Root = HomeTVShowTabsPage;
  isLogin: boolean;

  constructor(public navCtrl: NavController,
              private _loginCheckService: LoginCheckService) {

  }

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin() {
    if(sessionStorage.getItem('sessionID')) {
      this._loginCheckService.checkLogin(true);
    }
    this._loginCheckService.currentHsLogin.subscribe(isLogin => this.isLogin = isLogin);
  }

}
