import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudUserPage } from './crud-user.page';

describe('CrudUserPage', () => {
  let component: CrudUserPage;
  let fixture: ComponentFixture<CrudUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
