import { Constants } from './../../app/app.constants';
import { HomePosterMedia } from './../../interface/home-poster-media';
import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { MediaDetail } from '../../pages/media-detail/media-detail';

@Component({
  selector: 'mdb-similar-media-card',
  templateUrl: 'mdb-similar-media-card.html'
})
export class MdbSimilarMediaCardComponent {
  @Input() mediaData: HomePosterMedia;
  @Input() mediaType: string;
  @Input() isLogin: boolean;


  constructor(public _modalCtrl: ModalController) {}

  ngOnChanges(): void {
    if(this.mediaData.backdrop_path == null) {
      this.mediaData.backdrop_path = "./assets/imgs/img-not-available-banner.jpg";
    } else {
      this.mediaData.backdrop_path = Constants.Images_Base_Path + 'original' + this.mediaData.backdrop_path;
    }

    if(this.mediaData.poster_path == null) {
      this.mediaData.poster_path = "./assets/imgs/img-not-available-poster.jpg";
    } else {
      this.mediaData.poster_path = Constants.Images_Base_Path + 'original' + this.mediaData.poster_path;
    }
  }

  openMediaDetailModal(mediaId: number, mediaType: string) {
    let modal = this._modalCtrl.create(MediaDetail, {mediaId: mediaId, mediaType: mediaType});
    modal.present();
  }
}
