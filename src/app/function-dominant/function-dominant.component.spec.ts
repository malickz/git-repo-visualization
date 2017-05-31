import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionDominantComponent } from './function-dominant.component';

describe('FunctionDominantComponent', () => {
  let component: FunctionDominantComponent;
  let fixture: ComponentFixture<FunctionDominantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionDominantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionDominantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
