import {Component, OnInit} from '@angular/core';
import {
  ApiResponseFavorite,
  ApiResponseFilmDTO,
  ApiResponseListCategorizedFilmsDTO,
  ApiResponseLoginResponseDTO,
  ApiResponseUserDTO,
  FavoriteControllerService,
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

  constructor(private filmController: FilmControllerService,
              private router: Router,
              private userController: UserControllerService,
              private favoriteController: FavoriteControllerService
              ) {
    // this.userController.getCurrentUser().subscribe((response: ApiResponseUserDTO) => {
    //   console.log(response.result?.favorites)
    // })
  }

  ngOnInit(): void {
    this.getFilmData().then();
  }

  async getFilmData(){
    await this.filmController.getFilmById(3).subscribe((response: ApiResponseFilmDTO) => {
      this.hotFilm = response.result;
    })

    await this.filmController.getBrowseData(10).subscribe((response: ApiResponseListCategorizedFilmsDTO) => {
      response.result?.map((ele) => {
        this.slides.push(<SLIDE_DATA>{genre: ele.genre?.name, filmList: ele.films})
      })
    })
  }

  goToFilmByGenre(genreName: string){
    this.router.navigate(['/films', genreName]).then();
  }

  goToFilmDetail(id: any){
    this.router.navigate(['/film', id , "detail"]).then();
  }

  addToFavorite(filmId: any){
    let id: any;
    this.userController.getCurrentUser().subscribe((res) => {
      id = res.result?.id
      // this.favoriteController.createFavorite({filmId: filmId, userId: id})
      //   .subscribe((response: ApiResponseFavorite) => {
      //       console.log(response)
      //     }
      //   )
    })
    this.router.navigate(['/film', id, "detail"]).then();
  }

  slideConfig = {
    slidesToShow: 1,
    infinite: true,
    variableWidth: true,
    outerEdgeLimit: true,
    arrows: true,
  };

  setStarRating(star: any): number{
    return Number(star);
  }
}
