import { MovieGenresListService } from './../services/Genres/movie-genres-list.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import * as $ from "jquery";
import { LoginPage } from '../pages/login/login';
import { TVShowGenresListService } from '../services/Genres/tv-show-genres-list.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public modalCtrl: ModalController, private _movieGenresList: MovieGenresListService,
              private _tvShowGenresList: TVShowGenresListService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  ngOnInit(){
    this._movieGenresList.getMovieGenresList()
      .subscribe(
        data => {
          localStorage.setItem('movie-genres', JSON.stringify(data))
        },
        error => console.log('Error :: ' + error)
    );
    this._tvShowGenresList.getTVShowGenresList()
      .subscribe(
        data => {
          localStorage.setItem('tv-genres', JSON.stringify(data))
        },
        error => console.log('Error :: ' + error)
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  toggleDropdown(name: string, event: any) {
    $(event.currentTarget).siblings('.item').removeClass('active');
    $('#'+name).siblings('.list').slideUp();
    $('#'+name).slideToggle();
    $(event.currentTarget).toggleClass('active');
  }

  openModal() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }
}
