import { AddToWatchlistService } from './../../services/account/add-to-watchlist/add-to-watchlist.service';
import { Component, Input } from '@angular/core';
import { HomePosterMedia } from '../../interface/home-poster-media';
import { ToastController } from 'ionic-angular';
import { IAccountDetail } from '../../interface/account-detail';

@Component({
  selector: 'mdb-media-card',
  templateUrl: 'mdb-media-card.html'
})
export class MdbMediaCardComponent {
  @Input() mediaData: HomePosterMedia;
  @Input() mediaType: string;
  @Input() isLogin: boolean;

  constructor(private _addToWatchlist: AddToWatchlistService,
              private _toastCtrl: ToastController) {}

  ngOnChanges(): void {
    if (!this.mediaData.title || !this.mediaData.original_title) {
      this.mediaData.title = this.mediaData.name;
      this.mediaData.original_title = this.mediaData.original_name;
    }
    if (this.mediaType) {
      this.mediaType = this.mediaType.toLocaleLowerCase();
    }
  }

  addToWatchList(media_type: string, media_id: number, watchlist: boolean): void {
    let userdata: IAccountDetail = JSON.parse(sessionStorage.getItem('accountDetail')),
        account_id = userdata.id,
        session_id = sessionStorage.getItem('sessionID');

    this._addToWatchlist.setAddToWatchlist(account_id, session_id, media_type, media_id, watchlist)
      .subscribe(
        data => {
          debugger;
          this.toastMessage(data.status_message);
        },
        error => {
          let errorMSG = JSON.parse(error._body);
          this.toastMessage(errorMSG.status_message);
        }
      )

  }

  toastMessage(message: string) {
    let toast = this._toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }
}
