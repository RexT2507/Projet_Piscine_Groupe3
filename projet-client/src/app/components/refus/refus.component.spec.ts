import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefusComponent } from './refus.component';

describe('RefusComponent', () => {
  let component: RefusComponent;
  let fixture: ComponentFixture<RefusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
