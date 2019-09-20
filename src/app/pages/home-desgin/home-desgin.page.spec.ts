import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDesginPage } from './home-desgin.page';

describe('HomeDesginPage', () => {
  let component: HomeDesginPage;
  let fixture: ComponentFixture<HomeDesginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDesginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDesginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
