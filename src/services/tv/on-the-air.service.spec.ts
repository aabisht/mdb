import { MockBackend } from '@angular/http/testing';
import { HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { OnTheAirTVService } from './on-the-air.service';

describe('OnTheAirService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OnTheAirTVService,
        MockBackend
      ],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([OnTheAirTVService], (service: OnTheAirTVService) => {
    expect(service).toBeTruthy();
  }));
});
