/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExitComponent } from './exit.component';

describe('ExitComponent', () => {
  let component: ExitComponent;
  let fixture: ComponentFixture<ExitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
