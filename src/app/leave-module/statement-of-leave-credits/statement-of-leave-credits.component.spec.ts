/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StatementOfLeaveCreditsComponent } from './statement-of-leave-credits.component';

describe('StatementOfLeaveCreditsComponent', () => {
  let component: StatementOfLeaveCreditsComponent;
  let fixture: ComponentFixture<StatementOfLeaveCreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatementOfLeaveCreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementOfLeaveCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
