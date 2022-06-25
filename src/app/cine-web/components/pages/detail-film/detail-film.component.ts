import { Component, OnInit } from '@angular/core';
import {
  CommentDTO,
  DislikeDTO,
  FavoriteControllerService,
  FavoriteDTO,
  FilmControllerService, LikeDTO,
  UserControllerService, ViewControllerService
} from "../../../cine-svc";
import {CookieService} from "ngx-cookie-service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import * as _ from "lodash";
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {DialogService} from "../../shared/dialog.service";
import {CommentUser} from "../../../interface/data";

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

  listComment : Array<CommentUser> = []

  reactLikeUser: boolean = false
  reactDislikeUser: boolean = false

  likeList: LikeDTO[] = []
  dislikeList: DislikeDTO[] = []
  idLike: number = 1
  idDislike: number = 1

  orderByValue = [
    {
      value: 'DSC',
      viewValue: "Newest"
    },
    {
      value: 'ASC',
      viewValue: "Oldest"
    }
  ]

  orderBySelect = new FormControl('DSC')

  avatarUserComment: string = `assets/images/users/`

  urlImage: string = "";
  constructor(
    private filmService: FilmControllerService,
    private authService: UserControllerService,
    private cookie: CookieService,
    private formBuilder: FormBuilder,
    private favouriteService: FavoriteControllerService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private viewService: ViewControllerService,
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
      commentUser: [""],
      viewCount: [0]
    })

    this.getCommentData()
    this.getFilmID()
    this.getCurrentUser()
    this.getData()
    this.getViewCount()
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
          ratingStar: this.data.ratingStar,
        })
        this.starRating = this.formGroup.controls['ratingStar'].value
        this.likeList = this.data.likes
        this.dislikeList = this.data.dislikes
        this.urlImage = `../../../../../../assets/images/films/${this.formGroup.controls['slug'].value}/large.jpg`;
        this.checkLikeUser()
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
    this.listComment = []
    this.filmService.getCommentPagination(
      this.idFilm,
      this.pageIndex + 1,
      this.pageSize,
      'createdAt',
      this.orderBySelect.value).subscribe(result => {
        if(!result.errorCode) {
          this.formGroup.controls["comments"].setValue(result.result?.commentDTOList)
          this.length = result.result?.totalElements

          this.formGroup.controls["comments"].value.forEach((comment: CommentDTO) => {
            if(comment.userId === this.dataUser.id) {
              this.listComment.push({
                idComment: comment.id,
                data: comment
              })
              } else {
              this.listComment.push({
                data: comment
              })
            }
          })

          console.log(this.listComment)
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
        this.dialogService.showSnackBar({message: "Add comment successfully"})
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

    const extraData: NavigationExtras = {
      state: {
        check: 'byGenre',
      }
    }
    this.router.navigate(['/films/', genre], extraData)
  }

  showErrorDialog(result: any) {
    this.dialogService.showErrorDialog({
      title: "Error",
      description: `${result.message}`,
      buttonText: "Exit",
      onAccept: () => {}
    })
  }

  playVideo() {
    this.dialogService.showVideoPlayer().afterClosed().subscribe(result => {
      if(result) {
        this.viewService.createView({
          filmId: this.idFilm,
          userId: this.dataUser.id
        }).subscribe(result => {
          if(!result.errorCode) {
            this.getViewCount()
          } else {
            this.showErrorDialog(result)
          }
        })
      }
    })
  }

  getViewCount() {
    this.viewService.getViewCountByFilmId(this.idFilm).subscribe(result => {
      if(!result.errorCode) {
        this.formGroup.controls['viewCount'].setValue(result.result?.count)
      } else {
        this.showErrorDialog(result)
      }
    })
  }

  checkLikeUser() {
    let foundReact
    foundReact = this.likeList.find(like => {
      return like.userId === this.dataUser.id
    })

    if(foundReact) {
      this.reactLikeUser = true
      this.idLike = <number>foundReact.id
      return
    } else {
      foundReact = this.dislikeList.find(dislike => {
        return dislike.userId === this.dataUser.id
      })

      if(foundReact) {
        this.reactDislikeUser = true
        this.idDislike = <number>foundReact.id
      }
    }

  }

  handleReact(action: string) {
    if(action === 'like') {
      if(this.reactDislikeUser) this.handleUndoReact('dislike')
      this.filmService.createLike({
        userId: this.dataUser.id,
        filmId: this.idFilm
      }).subscribe(result => {
        if(!result.errorCode) {
          this.idLike = <number>result.result?.id
          this.reactLikeUser = true
          this.likeList.length++
        } else {
          this.showErrorDialog(result)
        }
      })
    } else if(action === 'dislike') {
      if(this.reactLikeUser) this.handleUndoReact('like')
      this.filmService.createDislike({
        userId: this.dataUser.id,
        filmId: this.idFilm
      }).subscribe(result => {
        if(!result.errorCode) {
          this.idDislike = <number>result.result?.id
          this.reactDislikeUser = true
          this.dislikeList.length++
        } else {
          this.showErrorDialog(result)
        }
      })
    }
  }

  handleUndoReact(action: string) {
    if(action === 'like') {
      this.filmService.deleteLike(this.idLike).subscribe(result => {
        if(result.errorCode) {
          this.showErrorDialog(result)
        } else {
          this.reactLikeUser = false
          this.likeList.length--
        }
      })
    } else if(action === 'dislike') {
      this.filmService.deleteDislike(this.idDislike).subscribe(result => {
        if(result.errorCode) {
          this.showErrorDialog(result)
        } else {
          this.reactDislikeUser = false
          this.dislikeList.length--
        }
      })
    }
  }

  deleteComment(idComment: any) {
    this.filmService.deleteComment(idComment).subscribe(result => {
      if(!result.errorCode) {
        this.getCommentData()
        this.dialogService.showSnackBar({message: "Delete comment successfully"})
      } else {
        this.showErrorDialog(result)
      }
    })
  }
}
