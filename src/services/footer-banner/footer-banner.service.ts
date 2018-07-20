import { Injectable } from '@angular/core';

@Injectable()
export class FooterBannerService {

  constructor() { }

  setFooterBannerImage(data: any[]): void {
    const randomNum: number = Math.floor(Math.random() * Math.floor(data.length));
    localStorage.setItem('footerBannerImage', data[randomNum].backdrop_path);
  }

  getFooterBannerImage(): string {
    return localStorage.getItem('footerBannerImage');
  }

}
