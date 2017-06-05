import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionMetricComponent } from './function-metric.component';

describe('FunctionMetricComponent', () => {
  let component: FunctionMetricComponent;
  let fixture: ComponentFixture<FunctionMetricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionMetricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
