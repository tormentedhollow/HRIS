/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LeaveEntryService } from './leave-entry.service';

describe('LeaveEntryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveEntryService]
    });
  });

  it('should ...', inject([LeaveEntryService], (service: LeaveEntryService) => {
    expect(service).toBeTruthy();
  }));
});
