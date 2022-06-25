import {Component, OnInit} from '@angular/core';
import {
  ApiResponseListCategorizedFilmsDTO,
  CategorizedFilmsDTO,
  FavoriteControllerService,
  FavoriteDTO,
  FilmControllerService,
  UserControllerService,
  UserDTO
} from "../../../cine-svc";
import {Router} from "@angular/router";
import {DialogService} from "../../shared/dialog.service";
import {FilmByGenre, idFavorite, LandingData} from "../../../interface/data";
import * as _ from "lodash";
import {result} from "lodash";
import {CookieService} from "ngx-cookie-service";
import {GlobalConstants} from "../../shared/GlobalConstants";


@Component({
  selector: 'app-landing-cine-web',
  templateUrl: './landing-cine-web.component.html',
  styleUrls: ['./landing-cine-web.component.scss'],
})
export class LandingCineWebComponent implements OnInit {

  beforePath = "././assets/images/films/";
  afterPath = "/small.jpg";

  hotFilm: any;

  landingData: Array<LandingData> = []
  listIdFavorite: Array<idFavorite> = []

  favoriteList: Array<FavoriteDTO> = [];
  dataUser: any | UserDTO

  favorites: boolean[] = [];
  slides: any[] = []

  slideConfig = {
    slidesToShow: 1,
    infinite: false,
    variableWidth: true,
    outerEdgeLimit: true,
    arrows: true,
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
    ]
  };

  constructor(
    private filmController: FilmControllerService,
    private router: Router,
    private userController: UserControllerService,
    private favoriteController: FavoriteControllerService,
    private dialogService: DialogService,
    private cookie: CookieService
  ) {
    this.getDataUser()
  }

  ngOnInit(): void {
    this.getFilmData().then();
  }

  async getFilmData() {
    await this.filmController.getBrowseData(10).subscribe((response: ApiResponseListCategorizedFilmsDTO) => {
      if (!response.errorCode) {
        response.result?.forEach(response => {
          this.landingData.push(
            {
              genre: <string>response.genre?.name,
              data: this.getFilmByGenre(response)
            }
          )
        })
        console.log(this.landingData)
      } else {
        this.showErrorDialog(result)
      }
    })
  }

  getFilmByGenre(response: CategorizedFilmsDTO): Array<FilmByGenre> {
    let filmByGenre: FilmByGenre[] = []
    let foundFilmFavor
    response.films?.forEach(res => {
      foundFilmFavor = this.checkFavorite(res.id)
      if (foundFilmFavor) {
        filmByGenre.push({
          film: res,
          idFavorite: foundFilmFavor.idFavorite
        })
      } else {
        filmByGenre.push({
          film: res,
        })
      }
    })
    return filmByGenre
  }

  goToFilmByGenre(genreName: string) {
    this.cookie.set(GlobalConstants.searchType, 'byGenre', undefined, "/")
    this.router.navigate(['/films', genreName]).then();
  }

  getDataUser() {
    this.userController.getCurrentUser().subscribe(result => {
      if (!result.errorCode) {
        this.dataUser = _.cloneDeep(result.result)
        result.result?.favorites?.forEach(favor => {
          this.listIdFavorite.push({
            idFavorite: <number>favor.id,
            idFilm: favor.filmId
          })
        })
      } else {
        this.showErrorDialog(result)
      }
    })
  }

  checkFavorite(idFilm: number) {
    let foundFilm
    foundFilm = this.listIdFavorite.find(favor => {
      return favor.idFilm === idFilm
    })
    return foundFilm
  }

  goToFilmDetail(id: any) {
    this.router.navigate(['/film', id, "detail"]).then();
  }

  watchTrailer(){
    this.dialogService.showVideoPlayer()
  }

  addToFavorite(genre: string, filmId: number) {
    let foundList: LandingData
    this.favoriteController.createFavorite({
      filmId: filmId,
      userId: this.dataUser.id
    }).subscribe(result => {
      if (!result.errorCode) {
        foundList = <LandingData>this.landingData.find(landing => {
          return landing.genre === genre
        })
        _.set(
          <FilmByGenre>foundList.data.find(film => {
            return film.film.id === filmId
          }),
          'idFavorite',
          result.result?.id)
      } else {
        this.showErrorDialog(result)
      }
    })
  }

  removeFromFavorite(genre: string, idFavorite: any, filmId: number) {
    let foundList: LandingData
    this.favoriteController.deleteFavorite(idFavorite).subscribe((response) => {
      if (!response.errorCode) {
        foundList = <LandingData>this.landingData.find(landing => {
          return landing.genre === genre
        })
        _.set(
          <FilmByGenre>foundList.data.find(film => {
            return film.film.id === filmId
          }),
          'idFavorite',
          undefined
        )
      } else {
        this.showErrorDialog(response)
      }
    })
  }

  setStarRating(star: any): number {
    return Number(star);
  }

  showErrorDialog(result: any) {
    this.dialogService.showErrorDialog({
      title: "Error",
      description: `${result.message}`,
      buttonText: "Exit",
      onAccept: () => {
      }
    })
  }
}
