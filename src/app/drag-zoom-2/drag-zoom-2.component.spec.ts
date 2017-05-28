import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragZoom2Component } from './drag-zoom-2.component';

describe('DragZoom2Component', () => {
  let component: DragZoom2Component;
  let fixture: ComponentFixture<DragZoom2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragZoom2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragZoom2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
