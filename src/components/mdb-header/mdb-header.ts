import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { MultiSearchService } from '../../services/search/multi-search/multi-search.service';
import { ISearchMedia } from '../../interface/search-interface';
import { Constants } from '../../app/app.constants';
import { MediaDetail } from '../../pages/media-detail/media-detail';

@Component({
  selector: 'mdb-header',
  templateUrl: 'mdb-header.html'
})
export class MdbHeaderComponent {

  constructor(public navCtrl: NavController,
              private _multiSearchService: MultiSearchService,
              public _modalCtrl: ModalController) {}

  showSearch: boolean = false;
  searchData: ISearchMedia[];
  searchValue: string;

  showSearchBar(className: string) {
    this.showSearch = !this.showSearch;
    this.searchValue = '';
    this.searchData = [];
  }

  initializeSearchData(keyword: string) {
    this._multiSearchService.getSearchResult(keyword)
      .subscribe(
        data => {
          data.results.forEach((mediaData) => {
            if(mediaData.poster_path == null) {
              mediaData.poster_path = "./assets/imgs/img-not-available-banner.jpg";
            } else {
              mediaData.poster_path = Constants.Images_Base_Path + 'original' + mediaData.poster_path;
            }
          });
          this.searchData = data.results;
          console.log(this.searchData);
        }, error => {
          console.log('Error: ' + error);
        }
      )
  }

  getSearchItems(ev: any) {
    const keyword = ev.target.value;
    this.initializeSearchData(keyword);
  }

  openMediaDetailModal(mediaId: number, mediaType: string) {
    let modal = this._modalCtrl.create(MediaDetail, {mediaId: mediaId, mediaType: mediaType});
    modal.present();
  }

}
