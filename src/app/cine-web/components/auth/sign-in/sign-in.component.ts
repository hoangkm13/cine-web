import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {ApiResponseLoginResponseDTO, UserControllerService} from "../../../cine-svc";
import {Router} from "@angular/router";
import {GlobalConstants} from "../../shared/GlobalConstants";
import {CookieService} from "ngx-cookie-service";
import {DialogService} from "../../shared/dialog.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userController: UserControllerService,
              private route: Router,
              private cookie: CookieService,
              private dialogService: DialogService) {
    this.formGroup = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.userController.login({
        username: this.formGroup.controls['userName'].value,
        password: this.formGroup.controls['password'].value
      }).subscribe((response: ApiResponseLoginResponseDTO) => {
        if (response.errorCode == null) {
          this.cookie.set(GlobalConstants.authToken, <string>response.result?.token, undefined, "/")
          this.route.navigateByUrl("/welcome").then();
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
  }
}
