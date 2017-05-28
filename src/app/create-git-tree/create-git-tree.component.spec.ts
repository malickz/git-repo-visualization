import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGitTreeComponent } from './create-git-tree.component';

describe('CreateGitTreeComponent', () => {
  let component: CreateGitTreeComponent;
  let fixture: ComponentFixture<CreateGitTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGitTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGitTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
