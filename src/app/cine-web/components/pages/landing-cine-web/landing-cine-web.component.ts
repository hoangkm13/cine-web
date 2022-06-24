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
import {Router} from "@angular/router";

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
  //
  favoriteList: Array<FavoriteDTO> = [];

  constructor(private filmController: FilmControllerService,
              private router: Router,
              private userController: UserControllerService,
              private favoriteController: FavoriteControllerService
  ) {
   this.getFavoriteData()
  }

  ngOnInit(): void {
    this.getFilmData().then();
  }

  async getFilmData(id?: any) {
    // await this.filmController.getFilmById(3).subscribe((response: ApiResponseFilmDTO) => {
    //   this.hotFilm = response.result;
    // })

    await this.filmController.getBrowseData(10).subscribe((response: ApiResponseListCategorizedFilmsDTO) => {
      response.result?.map((ele) => {
        this.slides.push(<SLIDE_DATA>{genre: ele.genre?.name, filmList: ele.films})
      })
    })
    console.log(this.slides)
  }

  goToFilmByGenre(genreName: string) {
    this.router.navigate(['/films', genreName]).then();
  }

  goToFilmDetail(id: any) {
    this.router.navigate(['/film', id, "detail"]).then();
  }

  getFavoriteData(){
    this.userController.getCurrentUser().subscribe((response: ApiResponseUserDTO) => {
      response.result?.favorites?.map((ele) => {
        this.favoriteList.push({id: ele.id, filmId: ele.filmId, userId: ele.userId})
      })
    })
  }

  addToFavorite(filmId: any) {
    let id: any;
    this.userController.getCurrentUser().subscribe((res) => {
      id = res.result?.id
      this.favoriteController.createFavorite({filmId: filmId, userId: id})
        .subscribe((response: ApiResponseFavorite) => {
            if(response.errorCode != null) {
              this.isFavorite(filmId)
            }
          }
        )
    })
  }

  removeFromFavorite(filmId: any) {
    this.favoriteController.deleteFavorite(filmId).subscribe((response) => {
      console.log(response)
      this.getFilmData().then()
    })
  }

  slideConfig = {
    slidesToShow: 1,
    infinite: true,
    variableWidth: true,
    outerEdgeLimit: true,
    arrows: true,
  };

  setStarRating(star: any): number {
    return Number(star);
  }

  isFavorite(id?: any): boolean {
    for (const ele of this.favoriteList){
      if(ele.filmId == id){
        return false
      }
    }
    return true
  }
}
