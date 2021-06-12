import { TestBed } from '@angular/core/testing';

import { NgxGoldenLayoutService } from './ngx-golden-layout.service';

describe('NgxGoldenLayoutService', () => {
  let service: NgxGoldenLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxGoldenLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
