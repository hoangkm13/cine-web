import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserControllerService} from "../../../cine-svc";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private route: Router,
              private signUpController: UserControllerService) {
    this.formGroup = this.formBuilder.group({
      username: [],
      password: [],
      cf_password: [],
      fullName: [],
      gender: [],
      birthDay: [],
      phone: [],
    })
  }

  ngOnInit(): void {
  }

  signUp() {
    console.log(this.formGroup.getRawValue())
  }
}
