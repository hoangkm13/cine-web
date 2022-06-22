import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiResponseUserDTO, UserControllerService} from "../../../cine-svc";
import * as moment from "moment";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userController: UserControllerService) {
    this.formGroup = this.formBuilder.group({
      username: [],
      password: [],
      cf_password: [],
      firstName: [],
      lastName: [],
      gender: [],
      birthOfDate: [],
      mobile: [],
      email: []
    })
  }

  ngOnInit(): void {
  }

  signUp() {
    let formValue = this.formGroup.getRawValue();
    if(formValue.password === formValue.cf_password){
      this.userController.register({
        username: formValue.username,
        password: formValue.password,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        gender: formValue.gender,
        birthOfDate: moment(formValue.birthOfDate).toISOString(),
        email: formValue.email,
        mobile: formValue.mobile
      }).subscribe((response: ApiResponseUserDTO) => {
        if(response.errorCode != null){
          this.router.navigate(["\sign-in"]).then()
        }
      })
    }else{
      console.log("Loi")
    }
  }
}
