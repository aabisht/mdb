import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { FooterBannerService } from './footer-banner.service';

describe('FooterBannerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FooterBannerService
      ]
    });
  });

  it('should be created', inject([FooterBannerService], (service: FooterBannerService) => {
    expect(service).toBeTruthy();
  }));
});
