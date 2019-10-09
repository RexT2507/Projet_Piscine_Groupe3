import { TestBed } from '@angular/core/testing';

import { ValidService } from './valid.service';

describe('ValidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidService = TestBed.get(ValidService);
    expect(service).toBeTruthy();
  });
});
