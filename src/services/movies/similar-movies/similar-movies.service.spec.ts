import { MockBackend } from '@angular/http/testing';
import { HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { NowPlayingMovieService } from './similar-movies.service';

describe('NowPlayingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NowPlayingMovieService,
        MockBackend
      ],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([NowPlayingMovieService], (service: NowPlayingMovieService) => {
    expect(service).toBeTruthy();
  }));
});
