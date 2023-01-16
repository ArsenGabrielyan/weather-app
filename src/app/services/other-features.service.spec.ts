import { TestBed } from '@angular/core/testing';

import { OtherFeaturesService } from './other-features.service';

describe('OtherFeaturesService', () => {
  let service: OtherFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
