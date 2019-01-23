import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaDetailsComponent } from './schema-details.component';

describe('LineageDetailsComponent', () => {
  let component: SchemaDetailsComponent;
  let fixture: ComponentFixture<SchemaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SchemaDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
