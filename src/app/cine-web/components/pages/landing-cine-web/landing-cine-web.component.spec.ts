import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCineWebComponent } from './landing-cine-web.component';

describe('LandingCineWebComponent', () => {
  let component: LandingCineWebComponent;
  let fixture: ComponentFixture<LandingCineWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingCineWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingCineWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
