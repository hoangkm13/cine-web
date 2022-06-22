import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {GlobalConstants} from "../GlobalConstants";
import {MatDialog} from "@angular/material/dialog";
import {UserProfileComponent} from "../../pages/user-profile/user-profile.component";

@Component({
  selector: 'app-header-cine',
  templateUrl: './header-cine.component.html',
  styleUrls: ['./header-cine.component.scss']
})
export class HeaderCineComponent implements OnInit {

  token: string = ""
  constructor(
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {
    this.token = cookieService.get(GlobalConstants.authToken)
  }

  ngOnInit(): void {
  }

  openUserProfile() {
    this.dialog.open(UserProfileComponent, {
      width: '80vw',
      height: '75vh'
    })
  }
}
