import { TestBed, inject } from '@angular/core/testing';

import { TreeDataService } from './tree-data.service';

describe('TreeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeDataService]
    });
  });

  it('should ...', inject([TreeDataService], (service: TreeDataService) => {
    expect(service).toBeTruthy();
  }));
});
