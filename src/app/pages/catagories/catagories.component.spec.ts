import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagoriesComponent } from './catagories.component';

describe('CatagoriesComponent', () => {
  let component: CatagoriesComponent;
  let fixture: ComponentFixture<CatagoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatagoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatagoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
