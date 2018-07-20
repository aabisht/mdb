import { TestBed, inject } from '@angular/core/testing';

import { GetMovieCreditsService } from './get-movie-credits.service';

describe('GetMovieCreditsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetMovieCreditsService]
    });
  });

  it('should be created', inject([GetMovieCreditsService], (service: GetMovieCreditsService) => {
    expect(service).toBeTruthy();
  }));
});
