import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConseilComponent } from './conseil.component';

describe('ConseilComponent', () => {
  let component: ConseilComponent;
  let fixture: ComponentFixture<ConseilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConseilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConseilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
