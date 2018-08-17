import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OnTheAirTVService } from '../../../services/tv/on-the-air.service';
import { ITVResult } from '../../../interface/tv';
import { Constants } from '../../../app/app.constants';

@Component({
  selector: 'home-tv-show-tab',
  templateUrl: 'homeTVShowTabsPage.html'
})

export class HomeTVShowTabsPage implements OnInit {
  topTVShows: ITVResult[] = [];
  loadMoreFlag: boolean = false;
  pageNumber: number = 1;

  constructor(public navCtrl: NavController,
              private _onTheAirTVService: OnTheAirTVService) {}

  ngOnInit(){
    this.getOnAirTVShows(this.pageNumber);
  }

  getOnAirTVShows(pageNumber?: number): void {
    let topTVShows: ITVResult[] = [];

    if(!pageNumber) {
      pageNumber = 1;
    }

    this._onTheAirTVService.getOnTheAirTV(pageNumber)
      .subscribe(
        data => {
          topTVShows = this.filterTVShowData(data);
          this.populateTVShow(topTVShows);
          this.pageNumber = ++this.pageNumber;
          this.loadMoreFlag = false;
        },
        error => {
          console.log('Error: ' + error);
        }
      );


  }

  filterTVShowData(data: ITVResult[]): ITVResult[] {
    let topTVShows: ITVResult[] = [];
    data.forEach((tvShow) => {
      if (tvShow.backdrop_path == null) {
        tvShow.backdrop_path = "./assets/imgs/img-not-available-banner.jpg"
      } else {
        tvShow.backdrop_path = Constants.Images_Base_Path + 'original' + tvShow.backdrop_path;
      }
      if (tvShow.poster_path == null) {
        tvShow.poster_path = "./assets/imgs/img-not-available-poster.jpg"
      } else {
        tvShow.poster_path = Constants.Images_Base_Path + 'original' + tvShow.poster_path;
      }
      this.getTVGenre(tvShow);
      topTVShows.push(tvShow);
    });
    return topTVShows;
  }

  getTVGenre(tvShow: ITVResult): void {
    tvShow.genre_name = [];
    let delay = 100, max_delay_time= 12800;
    let timerId = setTimeout(function request() {
      if(localStorage.getItem('tv-genres')) {
        tvShow.genre_ids.forEach(function(genreID ) {
          JSON.parse(localStorage.getItem('tv-genres')).genres.forEach(function(genreIDS) {
            if(genreID === genreIDS.id) {
              tvShow.genre_name.push(genreIDS.name)
            }
          });
        });
        clearTimeout(timerId);
      } else {
        if(delay < max_delay_time) {
          delay  *= 2;
        }
        clearTimeout(timerId);
        timerId = setTimeout(request, delay);
      }
    }, delay);
  }

  populateTVShow(topTVShows: ITVResult[]): void {
    if( this.topTVShows.length > 0 ) {
      topTVShows.forEach(movieData => {
        this.topTVShows.push(movieData);
      });
    } else {
      this.topTVShows = topTVShows;
    }

    this.loadMoreFlag = false;
  }

}
