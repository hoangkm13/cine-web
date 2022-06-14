import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCineWebComponent } from './home-cine-web.component';

describe('HomeCineWebComponent', () => {
  let component: HomeCineWebComponent;
  let fixture: ComponentFixture<HomeCineWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCineWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCineWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
