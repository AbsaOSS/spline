import { TestBed } from '@angular/core/testing';

import { ContextualMenuService } from './contextual-menu.service';

describe('ContextualMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContextualMenuService = TestBed.get(ContextualMenuService);
    expect(service).toBeTruthy();
  });
});
