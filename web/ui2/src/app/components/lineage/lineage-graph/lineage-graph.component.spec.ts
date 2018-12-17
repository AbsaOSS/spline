import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineageGraphComponent } from './lineage-graph.component';

describe('LineageGraphComponent', () => {
  let component: LineageGraphComponent;
  let fixture: ComponentFixture<LineageGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineageGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineageGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
