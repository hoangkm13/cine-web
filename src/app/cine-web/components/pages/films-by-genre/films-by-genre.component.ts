import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {
  ApiResponsePageFilm,
  FavoriteDTO,
  Film,
  FilmControllerService,
  UserControllerService
} from "../../../cine-svc";
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

  list: Array<Film> = [];

  currentPage: number = 1;
  searchKey: string[] = [];

  public constructor(private route: ActivatedRoute, private router: Router,
                     private filmController: FilmControllerService,
                     private dialogService: DialogService,
                     private userController: UserControllerService,
                     private cookie: CookieService) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.searchKey = val.url.split('/');
        this.getData()
      }
    });
  }

  ngOnInit(): void {
  }

  getByGenre(genre?: any) {
    this.filmController.getFilmsByGenre(genre, 1, 20, "id")
      .subscribe((response: ApiResponsePageFilm) => {
        if (response.errorCode == null) {
          this.list = response.result?.content ? response.result?.content : [];
        }else {
          this.showError(response.message)
        }
      })
  }


  getDataBySearch(searchText?: any, size?: any, searchType?: any) {
    this.filmController.getSearchData(searchText, 1, size, 'id')
      .subscribe((response: ApiResponsePageFilm) => {
        if (response.errorCode == null) {
          this.list = response.result?.content ? response.result?.content : [];
          if (searchType == 'byFavorite') {
            this.getByFavorite()
          }
        }
      })
  }

  showError(message: any){
    this.dialogService.showErrorDialog({
      title: "Error",
      description: `${message}`,
      buttonText: "Exit",
      onAccept: () => {
      }
    })
  }

  getByFavorite() {
    this.userController.getCurrentUser().subscribe((res) => {
      if (res.errorCode == null){
        let favoriteList: Array<FavoriteDTO>;
        favoriteList = res.result?.favorites ? res.result?.favorites : [];
        this.list = this.list.filter((ele) => favoriteList.find(({filmId}) => ele.id === filmId));
      }else{
        this.showError(res.message)
      }
    })
  }

  searchType: string = ""

  getData() {
    this.searchType = this.cookie.get('searchType')
    if (this.searchType == 'bySearch') {
      this.searchKey[1] = this.route.snapshot.params['searchValue'];
      this.getDataBySearch(this.searchKey[1], 20)
    }
    if (this.searchType == 'byGenre') {
      this.searchKey[1] = this.route.snapshot.params['searchValue'];
      this.getByGenre(this.searchKey[1])
    }
    if (this.searchType == 'byFavorite') {
      this.searchKey[1] = this.route.snapshot.params['searchValue'];
      this.getDataBySearch('', 300, this.searchType)
    }
  }

  goToFilmDetail(id: any) {
    this.router.navigate(['/film', id, "detail"]).then();
  }

  setStarRating(star: any): number {
    return Number(star);
  }
}
