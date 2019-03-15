/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LeaveBalanceService } from './leave-balance.service';

describe('LeaveBalanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveBalanceService]
    });
  });

  it('should ...', inject([LeaveBalanceService], (service: LeaveBalanceService) => {
    expect(service).toBeTruthy();
  }));
});
