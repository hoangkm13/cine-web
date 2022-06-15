import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCineComponent } from './footer-cine.component';

describe('FooterCineComponent', () => {
  let component: FooterCineComponent;
  let fixture: ComponentFixture<FooterCineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterCineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterCineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
