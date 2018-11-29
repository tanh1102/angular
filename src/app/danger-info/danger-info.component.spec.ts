import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerInfoComponent } from './danger-info.component';

describe('DangerInfoComponent', () => {
  let component: DangerInfoComponent;
  let fixture: ComponentFixture<DangerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DangerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DangerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
