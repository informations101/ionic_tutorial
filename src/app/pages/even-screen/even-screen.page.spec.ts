import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenScreenPage } from './even-screen.page';

describe('EvenScreenPage', () => {
  let component: EvenScreenPage;
  let fixture: ComponentFixture<EvenScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvenScreenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
