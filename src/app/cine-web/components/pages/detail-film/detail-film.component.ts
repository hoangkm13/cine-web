import { Component, OnInit } from '@angular/core';
import {FavoriteControllerService, FilmControllerService, UserControllerService, UserDTO} from "../../../cine-svc";
import {CookieService} from "ngx-cookie-service";
import {GlobalConstants} from "../../shared/GlobalConstants";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as _ from "lodash";
import {PageEvent} from "@angular/material/paginator";

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

  length: number | undefined = 0
  pageSize: number = 5
  pageIndex: number = 0

  avatarUser: string = ``

  actor: Array<string> = [
    "Ngoc Nghia", "Hoang Khuat", "Quoc Viet"
  ]
  urlImage: string = "";
  constructor(
    private filmService: FilmControllerService,
    private authService: UserControllerService,
    private cookie: CookieService,
    private formBuilder: FormBuilder,
    private favouriteService: FavoriteControllerService
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

    // this.authService.login({username: "hoangkm13", password: "Hoangkm133131"}).subscribe(result => {
    //   this.cookie.set(GlobalConstants.authToken, <string>result.result?.token, undefined, "/")
    // })

    this.getCurrentUser()
    this.getData()
    this.getCommentData()

  }

  ngOnInit(): void {
  }

  getData() {
    this.filmService.getFilmById(42).subscribe(result => {
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
    })
  }

  handleFavourite() {
    this.favouriteService.createFavorite(
      {
        userId: this.dataUser.id,
        filmId: 42
      }
    ).subscribe(result => {
      console.log(result)
    })
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(result => {
      if(!result.errorCode) {
        this.dataUser = _.cloneDeep(result.result)
        this.avatarUser = `assets/images/users/${this.dataUser.avatar}`
      }
    })
  }

  getCommentData() {
    this.filmService.getCommentPagination(
      42,
      this.pageIndex + 1,
      this.pageSize,
      'createdAt',
      'DSC').subscribe(result => {
      this.formGroup.controls["comments"].setValue(result.result?.commentDTOList)
      this.length = result.result?.totalElements
    })
  }

  userComment() {
    let comment = this.formGroup.controls["commentUser"].value.trim()
    if(!comment) {
      return
    }

    this.filmService.createCommentDTO({
      userId: this.dataUser.id,
      filmId: 42,
      commentText: this.formGroup.controls["commentUser"].value
    }).subscribe(result => {
      console.log(result)
      if(!result.errorCode) {
        console.log(result.message)
        this.getCommentData()
        this.formGroup.controls["commentUser"].setValue("")
      }
    })
  }

  onPagination(event: PageEvent) {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize

    this.getCommentData()
  }
}
