/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Pds3Component } from './pds3.component';

describe('Pds3Component', () => {
  let component: Pds3Component;
  let fixture: ComponentFixture<Pds3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pds3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pds3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
