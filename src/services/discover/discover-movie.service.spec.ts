import { MockBackend } from '@angular/http/testing';
import { HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { DiscoverMovieService } from './discover-movie.service';

describe('MovieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DiscoverMovieService,
        MockBackend
      ],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([DiscoverMovieService], (service: DiscoverMovieService) => {
    expect(service).toBeTruthy();
  }));
});
