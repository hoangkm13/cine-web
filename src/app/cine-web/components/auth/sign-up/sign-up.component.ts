import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiResponseUserDTO, UserControllerService} from "../../../cine-svc";
import * as moment from "moment";
import {DialogService} from "../../shared/dialog.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  checkPassword: boolean = false;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userController: UserControllerService,
              private dialogService: DialogService
  ) {
    this.formGroup = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],
      cf_password: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: [" ", Validators.required],
      birthOfDate: ["", Validators.required],
      mobile: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      termAndPrivacy: [false]
    })

    this.getExtraData()
  }

  ngOnInit(): void {
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  signUp() {
    let formValue = this.formGroup.getRawValue();
    this.formGroup.markAllAsTouched();
    if (formValue.password === formValue.cf_password && this.formGroup.valid) {
      if (formValue.termAndPrivacy) {
        this.userController.register({
          username: formValue.userName,
          password: formValue.password,
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          gender: formValue.gender,
          birthOfDate: moment(formValue.birthOfDate).toISOString(),
          email: formValue.email,
          mobile: formValue.mobile
        }).subscribe((response: ApiResponseUserDTO) => {
          if (response.errorCode == null) {
            this.router.navigate(["/sign-in"]).then()
          } else {
            this.showError(response.message);
          }
        })
      } else {
        this.showError("Please accept Terms of Use & Privacy Policy");
      }
    } else {
      this.checkPassword = true
      this.showError("Please check your information");
    }
  }

  getExtraData() {
    const state: any = this.router.getCurrentNavigation()?.extras
    this.formGroup.controls['email'].setValue(state?.state?.email)
  }

  showError(message: any) {
    this.dialogService.showErrorDialog({
      title: "Error",
      description: `${message}`,
      buttonText: "Exit",
      onAccept: () => {
      }
    })
  }
}
