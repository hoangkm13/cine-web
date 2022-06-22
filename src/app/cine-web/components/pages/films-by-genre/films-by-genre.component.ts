import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiResponsePageFilm, Film, FilmControllerService} from "../../../cine-svc";

@Component({
  selector: 'app-films-by-genre',
  templateUrl: './films-by-genre.component.html',
  styleUrls: ['./films-by-genre.component.scss']
})
export class FilmsByGenreComponent implements OnInit {

  beforePath = "././assets/images/films/";
  afterPath = "/small.jpg";

  genre: string;

  list: any;

  currentPage: number = 1;

  public constructor(private route: ActivatedRoute, private router: Router,
                     private filmController: FilmControllerService) {
    this.genre = this.route.snapshot.params['genre'];
    this.getData(this.genre);
  }

  ngOnInit(): void {
  }

  getData(genre?: any) {
    this.filmController.getFilmsByGenre(genre, 1, 20, "id")
      .subscribe((response: ApiResponsePageFilm) => {
        if (response.errorCode == null) {
          this.list = response.result?.content;
        }
      })
  }

  setStarRating(star: any): number{
    return Number(star);
  }
}
