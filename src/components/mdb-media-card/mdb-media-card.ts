import { Component, Input } from '@angular/core';
import { HomePosterMedia } from '../../interface/home-poster-media';

@Component({
  selector: 'mdb-media-card',
  templateUrl: 'mdb-media-card.html'
})
export class MdbMediaCardComponent {
  @Input() mediaData: HomePosterMedia;
  @Input() mediaType: string;
  @Input() isLogin: boolean;

  constructor() {}

  ngOnChanges(): void {
    if (!this.mediaData.title || !this.mediaData.original_title) {
      this.mediaData.title = this.mediaData.name;
      this.mediaData.original_title = this.mediaData.original_name;
    }
    if (this.mediaType) {
      this.mediaType = this.mediaType.toLocaleLowerCase();
    }
  }
}
