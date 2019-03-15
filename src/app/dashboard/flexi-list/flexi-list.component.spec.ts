/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FlexiListComponent } from './flexi-list.component';

describe('FlexiListComponent', () => {
  let component: FlexiListComponent;
  let fixture: ComponentFixture<FlexiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
