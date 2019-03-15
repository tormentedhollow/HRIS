/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Pds2Component } from './pds2.component';

describe('Pds2Component', () => {
  let component: Pds2Component;
  let fixture: ComponentFixture<Pds2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pds2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pds2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
