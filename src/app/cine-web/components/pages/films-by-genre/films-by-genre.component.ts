import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ApiResponsePageFilm, Film, FilmControllerService, UserControllerService} from "../../../cine-svc";
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
  searchKey: string[] = [];

  public constructor(private route: ActivatedRoute, private router: Router,
                     private filmController: FilmControllerService,
                     private dialogService: DialogService,
                     private userController: UserControllerService) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.searchKey = val.url.split('/');
        this.getExtraData()
      }
    });
  }

  ngOnInit(): void {
  }

  getData(genre?: any) {
      this.filmController.getFilmsByGenre(genre, 1, 20, "id")
        .subscribe((response: ApiResponsePageFilm) => {
          if (response.errorCode == null) {
            this.list = response.result?.content;
          } else {
            this.dialogService.showErrorDialog({
              title: "",
              description: `${response.message}`,
              buttonText: "Đóng",
              onAccept: () => {}
            })
          }
        })
    }


  getDataBySearch(searchText?: any){
    this.filmController.getSearchData(searchText, 1, 20, 'id')
      .subscribe((response: ApiResponsePageFilm) => {
        if (response.errorCode == null) {
          console.log(response.result?.content)
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

  getByFavorite(){
    this.userController.getCurrentUser().subscribe((res) => {
      console.log(res.result?.favorites)
      // this.list = res.result?.favorites
    })
  }

  check: string = ""

  getExtraData() {
    const state: any = this.router.getCurrentNavigation()?.extras
    console.log(state)
    if(state) {
      this.check = state.state.check;
      if(this.check == 'bySearch'){
        this.searchKey[1] = this.route.snapshot.params['searchValue'];
        this.getDataBySearch(this.searchKey[1])
      }
      if(this.check == 'byGenre'){
        this.searchKey[1] = this.route.snapshot.params['searchValue'];
        this.getData(this.searchKey[1])
      }
      if(this.check == 'byFavorite'){
        this.getDataBySearch('')
        this.getByFavorite()
      }
    }
  }

  goToFilmDetail(id: any) {
    this.router.navigate(['/film', id, "detail"]).then();
  }

  setStarRating(star: any): number {
    return Number(star);
  }
}
