import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineageDetailsComponent } from './lineage-details.component';

describe('LineageDetailsComponent', () => {
  let component: LineageDetailsComponent;
  let fixture: ComponentFixture<LineageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
