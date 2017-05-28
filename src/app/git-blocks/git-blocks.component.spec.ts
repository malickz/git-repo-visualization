import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GitBlocksComponent } from './git-blocks.component';

describe('GitBlocksComponent', () => {
  let component: GitBlocksComponent;
  let fixture: ComponentFixture<GitBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GitBlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GitBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
