import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLineComponent } from './map-line.component';

describe('MapLineComponent', () => {
  let component: MapLineComponent;
  let fixture: ComponentFixture<MapLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
