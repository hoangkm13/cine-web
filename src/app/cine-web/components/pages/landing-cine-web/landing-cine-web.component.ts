import {Component, OnInit} from '@angular/core';
import {
  ApiResponseFavorite,
  ApiResponseFilmDTO,
  ApiResponseListCategorizedFilmsDTO,
  ApiResponseLoginResponseDTO,
  ApiResponseUserDTO,
  FavoriteControllerService, FavoriteDTO,
  FilmControllerService,
  FilmDTO, UserControllerService
} from "../../../cine-svc";
import {NavigationExtras, Router} from "@angular/router";
import {DialogService} from "../../shared/dialog.service";
import {CookieService} from "ngx-cookie-service";
import {GlobalConstants} from "../../shared/GlobalConstants";

export interface SLIDE_DATA {
  genre: string;
  filmList: Array<FilmDTO>
}

@Component({
  selector: 'app-landing-cine-web',
  templateUrl: './landing-cine-web.component.html',
  styleUrls: ['./landing-cine-web.component.scss'],
})
export class LandingCineWebComponent implements OnInit {

  beforePath = "././assets/images/films/";
  afterPath = "/small.jpg";

  slides: SLIDE_DATA[] = [];

  hotFilm: any;

  favoriteList: Array<FavoriteDTO> = [];

  favorites: boolean[] = [];

  slideConfig = {
    slidesToShow: 1,
    infinite: true,
    variableWidth: true,
    outerEdgeLimit: false,
    arrows: true,
    draggable: false,
  };

  constructor(private filmController: FilmControllerService,
              private router: Router,
              private userController: UserControllerService,
              private favoriteController: FavoriteControllerService,
              private dialogService: DialogService,
              private cookie: CookieService
  ) {

  }

  ngOnInit(): void {
    this.getFilmData().then();
    this.getFavoriteData().then()
  }

  async getFilmData() {
    await this.filmController.getBrowseData(10).subscribe((response: ApiResponseListCategorizedFilmsDTO) => {
      response.result?.map((ele) => {
        if (response.errorCode == null) {
          this.slides.push(<SLIDE_DATA>{genre: ele.genre?.name, filmList: ele.films})
          ele.films?.map((film, index) => {
            this.favoriteControl(film.id)
          })
        } else {
          this.dialogService.showErrorDialog({
            title: "Error",
            description: `${response.message}`,
            buttonText: "Exit",
            onAccept: () => {

            }
          })
        }
      })
    })
  }

  goToFilmByGenre(genreName: string) {
    this.cookie.set(GlobalConstants.searchType, 'byGenre', undefined, "/")
    this.router.navigate(['/films', genreName]).then();
  }

  goToFilmDetail(id: any) {
    this.router.navigate(['/film', id, "detail"]).then();
  }

  async getFavoriteData() {
    await this.userController.getCurrentUser().subscribe((response: ApiResponseUserDTO) => {
      if (response.errorCode == null) {
        this.favoriteList = response.result?.favorites ? response.result?.favorites : []
      } else {
        this.dialogService.showErrorDialog({
          title: "Error",
          description: `${response.message}`,
          buttonText: "Exit",
          onAccept: () => {
          }
        })
      }

    })
  }

  addToFavorite(filmId: any) {
    let id: any;
    this.userController.getCurrentUser().subscribe((res) => {
      id = res.result?.id
      this.favoriteController.createFavorite({filmId: filmId, userId: id})
        .subscribe((response: ApiResponseFavorite) => {
            if (response.errorCode == null) {

            } else {
              this.dialogService.showErrorDialog({
                title: "Error",
                description: `${response.message}`,
                buttonText: "Exit",
                onAccept: () => {
                }
              })
            }
          }
        )
    })
  }

  removeFromFavorite(filmId: any) {
    let foundFilm = this.favoriteList.filter((ele) => {
      return ele.filmId == filmId
    })
    this.favoriteController.deleteFavorite(<number>foundFilm[0].id).subscribe((response) => {
      if (response.errorCode == null) {

      } else {
        this.dialogService.showErrorDialog({
          title: "Error",
          description: `${response.message}`,
          buttonText: "Exit",
          onAccept: () => {}
        })
      }
    })
  }

  setStarRating(star: any): number {
    return Number(star);
  }

  favoriteControl(id?: any, index?: any): boolean {
    for (const ele of this.favoriteList) {
      if (ele.filmId == id) {
        this.favorites[id] = true;
      } else {
        this.favorites[id] = false;
      }
    }
    return this.favorites[id]
  }
}
