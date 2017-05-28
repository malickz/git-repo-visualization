import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoredLinesComponent } from './colored-lines.component';

describe('ColoredLinesComponent', () => {
  let component: ColoredLinesComponent;
  let fixture: ComponentFixture<ColoredLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColoredLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoredLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
