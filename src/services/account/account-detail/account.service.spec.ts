import { MockBackend } from '@angular/http/testing';
import { HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { AccountService } from './account.service';

describe('AccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountService,
        MockBackend,
      ],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
  }));
});
