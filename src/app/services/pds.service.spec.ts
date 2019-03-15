/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PdsService } from './pds.service';

describe('Service: Pds', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdsService]
    });
  });

  it('should ...', inject([PdsService], (service: PdsService) => {
    expect(service).toBeTruthy();
  }));
});
