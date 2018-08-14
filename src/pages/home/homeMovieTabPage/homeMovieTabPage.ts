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

  constructor(public navCtrl: NavController,
              private _nowPlayingMovieService: NowPlayingMovieService) {}


  ngOnInit(){
    this._nowPlayingMovieService.getNowPlayingMovie()
      .subscribe(
        data => {

          this.topMovies = data;
          this.topMovies.forEach(function (movie) {
            movie.backdrop_path = Constants.Images_Base_Path + 'original' + movie.backdrop_path;
            movie.poster_path = Constants.Images_Base_Path + 'original' + movie.poster_path;
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
            }, time);
            time = time * 2;

          });
        },
        error => {
          console.log('Error: ' + error);
        }
      );
  }
}
