import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApiResponseLoginResponseDTO, UserControllerService} from "../../../cine-svc";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginController: UserControllerService, private route: Router) {
    this.formGroup = this.formBuilder.group({
      username: [],
      password: []
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.loginController.login({
      username: this.formGroup.controls['username'].value,
      password: this.formGroup.controls['password'].value
    }).subscribe((response: ApiResponseLoginResponseDTO) => {
      if (response.errorCode != null) {
        console.log(response.errorCode + "," + response.message);
      } else {
        this.route.navigateByUrl("/welcome").then();
      }
    })
  }

}
