import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsByGenreComponent } from './films-by-genre.component';

describe('FilmsByGenreComponent', () => {
  let component: FilmsByGenreComponent;
  let fixture: ComponentFixture<FilmsByGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmsByGenreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsByGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
