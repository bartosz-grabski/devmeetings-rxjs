import { TestBed, inject } from '@angular/core/testing';

import { MessageDbService } from './message-db.service';

describe('MessageDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageDbService]
    });
  });

  it('should be created', inject([MessageDbService], (service: MessageDbService) => {
    expect(service).toBeTruthy();
  }));
});
