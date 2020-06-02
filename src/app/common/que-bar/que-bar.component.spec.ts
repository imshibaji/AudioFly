import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueBarComponent } from './que-bar.component';

describe('QueBarComponent', () => {
  let component: QueBarComponent;
  let fixture: ComponentFixture<QueBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
