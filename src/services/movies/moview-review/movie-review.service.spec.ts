import { TestBed, inject } from '@angular/core/testing';

import { MovieReviewService } from './movie-review.service';

describe('MovieReviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieReviewService]
    });
  });

  it('should be created', inject([MovieReviewService], (service: MovieReviewService) => {
    expect(service).toBeTruthy();
  }));
});
