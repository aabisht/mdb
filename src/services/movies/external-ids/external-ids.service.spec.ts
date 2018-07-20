import { ExternalIdService } from './external-ids.service';
import { TestBed, inject } from '@angular/core/testing';

describe('MovieReviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExternalIdService]
    });
  });

  it('should be created', inject([ExternalIdService], (service: ExternalIdService) => {
    expect(service).toBeTruthy();
  }));
});
