import { Constants } from './../../../app/app.constants';
import { IMovieResult } from './../../../interface/movie';
import { NowPlayingMovieService } from './../../../services/movies/now-playing/now-playing.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'home-movie-tab',
  templateUrl: 'homeMovieTabPage.html',
  providers: [NowPlayingMovieService]
})

export class HomeMovieTabPage implements OnInit {
  topMovies: IMovieResult[] = [];
  loadMoreFlag: boolean = false;
  pageNumber: number = 1;

  constructor(public navCtrl: NavController,
              private _nowPlayingMovieService: NowPlayingMovieService) {}


  ngOnInit(){
    this.getNowPlayingMovies(this.pageNumber);
  }

  getNowPlayingMovies(pageNumber?: number): void {
    let topMoviesData: IMovieResult[] = [];

    if(!pageNumber) {
      pageNumber = 1;
    }

    this._nowPlayingMovieService.getNowPlayingMovie(pageNumber)
      .subscribe(
        data => {
          topMoviesData = this.filterMovieData(data);
          this.populateMovieData(topMoviesData);
          this.pageNumber = ++this.pageNumber;
          this.loadMoreFlag = false;
        },
        error => {
          console.log('Error: ' + error);
        }
    );

  }

  getMovieGenre(movie: IMovieResult): void {
    movie.genre_name = [];
    var time: number = 100;
    setTimeout(function() {
      if(localStorage.getItem('movie-genres')) {
        movie.genre_ids.forEach(function(genreID ) {
          JSON.parse(localStorage.getItem('movie-genres')).genres.forEach(function(genreIDS) {
            if(genreID === genreIDS.id) {
              movie.genre_name.push(genreIDS.name)
            }
          });
        });
      }
      time = time * 2;
    }, time);
  }

  populateMovieData(topMoviesData: IMovieResult[]): void {
    if( this.topMovies.length > 0 ) {
      topMoviesData.forEach(movieData => {
        this.topMovies.push(movieData);
      });
    } else {
      this.topMovies = topMoviesData;
    }

    this.loadMoreFlag = false;
  }

  filterMovieData(data: IMovieResult[]): IMovieResult[] {
    let topMoviesData: IMovieResult[] = [];
    data.forEach((movie) => {
      if (movie.backdrop_path == null) {
        movie.backdrop_path = "./assets/imgs/img-not-available-banner.jpg"
      } else {
        movie.backdrop_path = Constants.Images_Base_Path + 'original' + movie.backdrop_path;
      }
      if (movie.poster_path == null) {
        movie.poster_path = "./assets/imgs/img-not-available-poster.jpg"
      } else {
        movie.poster_path = Constants.Images_Base_Path + 'original' + movie.poster_path;
      }
      this.getMovieGenre(movie);
      topMoviesData.push(movie);
    });
    return topMoviesData;
  }

  loadMoreNowPlayingMovies():void {
    this.loadMoreFlag = true;
    this.getNowPlayingMovies(this.pageNumber);
  }

}
