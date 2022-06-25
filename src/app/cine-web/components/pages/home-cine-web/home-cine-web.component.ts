import { Component, OnInit } from '@angular/core';
import {FREQUENTLY_QUIZ, Frequently_quiz} from "../../../static/frequently_quiz";
import {CookieService} from "ngx-cookie-service";
import {GlobalConstants} from "../../shared/GlobalConstants";
import {FormControl, Validators} from "@angular/forms";
import {NavigationExtras, Router} from "@angular/router";
import {DialogService} from "../../shared/dialog.service";

@Component({
  selector: 'app-home-cine-web',
  templateUrl: './home-cine-web.component.html',
  styleUrls: ['./home-cine-web.component.scss']
})
export class HomeCineWebComponent implements OnInit {

  frequently_quiz: Frequently_quiz[] = []
  email: FormControl

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private dialogService: DialogService
  ) {

    this.email = new FormControl("", Validators.email)
    cookieService.delete(GlobalConstants.authToken, "/")

    this.frequently_quiz = FREQUENTLY_QUIZ
  }

  ngOnInit(): void {
  }

  onSignUp() {
    if(this.email.invalid || this.email.value === "") {
      this.dialogService.showErrorDialog({
        title: "Error",
        description: "Please input format email",
        buttonText: "Exit",
        onAccept: () => {}
      })
      return
    }
    const extraData: NavigationExtras = {
      state: {
        email: this.email.value
      }
    }
    this.router.navigate(['sign-up'], extraData)
  }

}
