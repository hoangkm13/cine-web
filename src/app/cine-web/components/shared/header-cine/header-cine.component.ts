import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {GlobalConstants} from "../GlobalConstants";
import {MatDialog} from "@angular/material/dialog";
import {UserProfileComponent} from "../../pages/user-profile/user-profile.component";
import {NavigationExtras, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {GenreControllerService} from "../../../cine-svc";
import {DialogService} from "../dialog.service";

@Component({
  selector: 'app-header-cine',
  templateUrl: './header-cine.component.html',
  styleUrls: ['./header-cine.component.scss']
})
export class HeaderCineComponent implements OnInit {

  token: string = ""
  searchKey: string = ""
  clickGenre: boolean = false
  genreList: FormControl
  genreClick = new FormControl('')

  constructor(
    private cookieService: CookieService,
    private dialog: MatDialog,
    private router: Router,
    private genreService: GenreControllerService,
    private dialogService: DialogService
  ) {
    this.genreList = new FormControl([])
    this.token = cookieService.get(GlobalConstants.authToken)
    this.getGenres()
  }

  ngOnInit(): void {
  }

  openUserProfile() {
    this.dialog.open(UserProfileComponent, {
    })
  }

  getGenres() {
    if(this.token) {
      this.genreService.getAllGenres().subscribe(result => {
        if(!result.errorCode) {
          this.genreList.setValue(result.result)
        } else {
          this.dialogService.showErrorDialog({
            title: "Error",
            description: `${result.message}`,
            buttonText: "Exit",
            onAccept: () => {}
          })
        }
      })
    }
  }

  navigationPage() {
    if(this.token) this.router.navigate(['/welcome'])
    else this.router.navigate(['/cine-web'])
  }

  onSignIn() {
    this.router.navigate(['/sign-in'])
  }

  onSearchKey() {
    const extraData: NavigationExtras = {
      state: {
        searchKey: this.searchKey
      }
    }
    this.router.navigate(['/films/', this.searchKey], extraData)
  }

  navigationPageGenre(genre: string) {
    if(genre) {
      this.router.navigate(['/films/', genre])
      console.log(genre)
    } else {
      const extraData: NavigationExtras = {
        state: {
          searchKey: ''
        }
      }
      this.router.navigate(['/films/favorites', ], extraData)
    }
  }
}
