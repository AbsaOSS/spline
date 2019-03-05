import { TestBed } from '@angular/core/testing';

import { RouterService } from './router.service';

describe('RouterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouterService = TestBed.get(RouterService);
    expect(service).toBeTruthy();
  });
});
