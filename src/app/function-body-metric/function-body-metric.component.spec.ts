import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionBodyMetricComponent } from './function-body-metric.component';

describe('FunctionBodyMetricComponent', () => {
  let component: FunctionBodyMetricComponent;
  let fixture: ComponentFixture<FunctionBodyMetricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionBodyMetricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionBodyMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
