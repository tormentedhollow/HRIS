/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetstmtService } from './getstmt.service';

describe('GetstmtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetstmtService]
    });
  });

  it('should ...', inject([GetstmtService], (service: GetstmtService) => {
    expect(service).toBeTruthy();
  }));
});
