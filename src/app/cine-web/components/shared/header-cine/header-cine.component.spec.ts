import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCineComponent } from './header-cine.component';

describe('HeaderCineComponent', () => {
  let component: HeaderCineComponent;
  let fixture: ComponentFixture<HeaderCineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
