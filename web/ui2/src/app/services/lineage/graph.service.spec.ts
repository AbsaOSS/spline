import { TestBed } from '@angular/core/testing';

import { GraphService } from './graph.service';

describe('GraphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphService = TestBed.get(GraphService);
    expect(service).toBeTruthy();
  });
});
