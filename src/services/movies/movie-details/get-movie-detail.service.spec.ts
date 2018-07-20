import { TestBed, inject } from '@angular/core/testing';

import { GetMovieDetail.ServiceService } from './get-movie-detail.service.service';

describe('GetMovieDetail.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetMovieDetail.ServiceService]
    });
  });

  it('should be created', inject([GetMovieDetail.ServiceService], (service: GetMovieDetail.ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
