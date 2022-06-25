import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiResponsePageFilm, Film, FilmControllerService} from "../../../cine-svc";
import {DialogService} from "../../shared/dialog.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-films-by-genre',
  templateUrl: './films-by-genre.component.html',
  styleUrls: ['./films-by-genre.component.scss']
})
export class FilmsByGenreComponent implements OnInit {

  beforePath = "././assets/images/films/";
  afterPath = "/small.jpg";

  genre: string = "";

  list: any;

  currentPage: number = 1;
  searchKey: string = "";

  public constructor(private route: ActivatedRoute, private router: Router,
                     private filmController: FilmControllerService,
                     private dialogService: DialogService) {
    this.genre = this.route.snapshot.params['genre'] ? this.route.snapshot.params['genre'] : ""
    this.searchKey = this.route.snapshot.params['searchKey'] ? this.route.snapshot.params['searchKey'] : "";
    this.getData(this.genre, this.searchKey);
  }

  ngOnInit(): void {
  }

  getData(genre?: any, searchText?: any) {
    if (this.route.snapshot.params['genre']) {
      this.filmController.getFilmsByGenre(genre, 1, 20, "id")
        .subscribe((response: ApiResponsePageFilm) => {
          console.log(response)
          if (response.errorCode == null) {
            this.list = response.result?.content;
          } else {
            this.dialogService.showErrorDialog({
              title: "",
              description: `${response.message}`,
              buttonText: "Đóng",
              onAccept: () => {

              }
            })
          }
        })
    } else {
      this.filmController.getSearchData(searchText, 1, 20, 'id')
        .subscribe((response: ApiResponsePageFilm) => {
          if (response.errorCode == null) {
            this.list = response.result?.content;
          } else {
            this.dialogService.showErrorDialog({
              title: "",
              description: `${response.message}`,
              buttonText: "Đóng",
              onAccept: () => {

              }
            })
          }
        })
    }

  }

  goToFilmDetail(id: any) {
    this.router.navigate(['/film', id, "detail"]).then();
  }

  setStarRating(star: any): number {
    return Number(star);
  }
}
