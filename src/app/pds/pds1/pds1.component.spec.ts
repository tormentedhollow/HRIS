/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Pds1Component } from './pds1.component';

describe('Pds1Component', () => {
  let component: Pds1Component;
  let fixture: ComponentFixture<Pds1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pds1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pds1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
