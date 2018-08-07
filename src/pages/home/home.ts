import { HomeTVShowTabsPage } from './homeTVShowTabsPage/homeTVShowTabsPage';
import { HomeMovieTabPage } from './homeMovieTabPage/homeMovieTabPage';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1Root = HomeMovieTabPage;
  tab2Root = HomeTVShowTabsPage;

  constructor(public navCtrl: NavController) {

  }

}
