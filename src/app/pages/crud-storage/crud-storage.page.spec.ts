import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudStoragePage } from './crud-storage.page';

describe('CrudStoragePage', () => {
  let component: CrudStoragePage;
  let fixture: ComponentFixture<CrudStoragePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudStoragePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudStoragePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
