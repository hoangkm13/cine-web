import { Component, OnInit } from '@angular/core';
import {
  FavoriteControllerService,
  FavoriteDTO,
  FilmControllerService,
  UserControllerService
} from "../../../cine-svc";
import {CookieService} from "ngx-cookie-service";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as _ from "lodash";
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../shared/dialog.service";

@Component({
  selector: 'app-detail-film',
  templateUrl: './detail-film.component.html',
  styleUrls: ['./detail-film.component.scss']
})
export class DetailFilmComponent implements OnInit {

  currentRate: number = 3.5
  formGroup: FormGroup
  data: any
  dataUser: any
  starRating: number = 0

  idFilm: number = 1

  length: number | undefined = 0
  pageSize: number = 5
  pageIndex: number = 0

  avatarUser: string = ``

  checkFavorite: boolean = false
  favoriteList: FavoriteDTO[] = []
  idFavoriteFilm: number = 0

  avatarUserComment: string = `assets/images/users/`

  actor: Array<string> = [
    "Ngoc Nghia", "Hoang Khuat", "Quoc Viet"
  ]
  urlImage: string = "";
  constructor(
    private filmService: FilmControllerService,
    private authService: UserControllerService,
    private cookie: CookieService,
    private formBuilder: FormBuilder,
    private favouriteService: FavoriteControllerService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) {
    this.formGroup = formBuilder.group({
      nameFilm: [""],
      maturity: [0],
      description: [""],
      year: [""],
      slug: [""],
      actors: [[]],
      comments: [[]],
      genres: [[]],
      director: [null],
      ratingStar: [0],
      commentUser: [""]
    })

    this.getFilmID()
    this.getCurrentUser()
    this.getData()
    this.getCommentData()
  }

  ngOnInit(): void {

  }

  getData() {
    this.filmService.getFilmById(this.idFilm).subscribe(result => {
      if(!result.errorCode) {
        this.data = _.cloneDeep(result.result)
        this.formGroup.patchValue({
          nameFilm: this.data.title,
          maturity: this.data.maturity,
          description: this.data.description,
          year: this.data.year,
          slug: this.data.slug,
          genres: this.data.genres,
          actors: this.data.actors,
          director: this.data.director.name,
          ratingStar: this.data.ratingStar
        })
        this.starRating = this.formGroup.controls['ratingStar'].value

        this.urlImage = `../../../../../../assets/images/films/${this.formGroup.controls['slug'].value}/large.jpg`;
      }
      else {
        this.showErrorDialog(result)
      }
    })
  }

  handleFavourite(action: string) {
    if(action === "add") {
      this.favouriteService.createFavorite(
        {
          userId: this.dataUser.id,
          filmId: this.idFilm
        }
      ).subscribe(result => {
        if(!result.errorCode) {
          this.checkFavorite = true
          this.getCurrentUser()
        } else {
          this.showErrorDialog(result)
        }
      })
    } else if(action === 'remove') {
      this.favouriteService.deleteFavorite(this.idFavoriteFilm).subscribe(result => {
        if(!result.errorCode) {
          this.checkFavorite = false
          this.getCurrentUser()
        } else {
          this.showErrorDialog(result)
        }
      })
    }

  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(result => {
      if(!result.errorCode) {
        this.dataUser = _.cloneDeep(result.result)
        this.avatarUser = `assets/images/users/${this.dataUser.avatar}`
        this.favoriteList = this.dataUser.favorites
        this.getIDFavorite()
      } else {
        this.showErrorDialog(result)
      }
    })

  }

  getIDFavorite() {
    let idFilm = Number(this.idFilm)

    let foundFilm = this.favoriteList.filter((favourite) => {
      return favourite.filmId === idFilm
    })

    if(foundFilm.length > 0) {
      this.checkFavorite = true
      this.idFavoriteFilm = <number>foundFilm[0].id
    }
  }

  getCommentData() {
    this.filmService.getCommentPagination(
      this.idFilm,
      this.pageIndex + 1,
      this.pageSize,
      'createdAt',
      'DSC').subscribe(result => {
        if(!result.errorCode) {
          this.formGroup.controls["comments"].setValue(result.result?.commentDTOList)
          this.length = result.result?.totalElements
        }
        else {
          this.showErrorDialog(result)
        }
    })
  }

  userComment() {
    let comment = this.formGroup.controls["commentUser"].value.trim()
    if(!comment) {
      return
    }

    this.filmService.createCommentDTO({
      userId: this.dataUser.id,
      filmId: this.idFilm,
      commentText: this.formGroup.controls["commentUser"].value
    }).subscribe(result => {
      if(!result.errorCode) {
        this.getCommentData()
        this.formGroup.controls["commentUser"].setValue("")
      } else {
        this.showErrorDialog(result)
      }
    })
  }

  onPagination(event: PageEvent) {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize

    this.getCommentData()
  }

  getFilmID() {
    this.activeRouter.params.forEach(param => {
      this.idFilm = param['id']
    }).then(result => {
      console.log(result)
    })
  }

  redirectToPage(genre: string) {
    this.router.navigate(["/films/", genre])
  }

  showErrorDialog(result: any) {
    this.dialogService.showErrorDialog({
      title: "Error",
      description: `${result.message}`,
      buttonText: "Exit",
      onAccept: () => {}
    })
  }
}
