/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Pds4Component } from './pds4.component';

describe('Pds4Component', () => {
  let component: Pds4Component;
  let fixture: ComponentFixture<Pds4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pds4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pds4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
