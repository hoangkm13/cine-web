import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserControllerService} from "../../../cine-svc";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfile: FormGroup
  passwordForm:FormGroup

  inProcessEdit: boolean = false
  dataBackup: any
  inProcessChangePass: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserControllerService
  ) {
    this.userProfile = formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: ["female", Validators.required],
      dateOfBirth: ["", Validators.required],
      mobile: ["", Validators.required],
      email: ["", Validators.required]
    })

    this.userProfile.disable()

    this.passwordForm = formBuilder.group({
      newPassword: ["", Validators.required],
      confirmNewPassword: ["", Validators.required],

    })


    this.passwordForm.disable()
  }

  ngOnInit(): void {
  }

  handleUser(actionField: string) {
    if(actionField === 'editProfile') {
      this.userProfile.enable()
      this.inProcessEdit = !this.inProcessEdit
    }
    else if(actionField === 'changePassword') {
      this.passwordForm.enable()
      this.inProcessChangePass = !this.inProcessChangePass
    }

    else {
      this.inProcessEdit = false
      this.inProcessChangePass = false
      this.userProfile.disable()
      this.userProfile.reset()
      this.passwordForm.disable()
      this.passwordForm.reset()
    }
  }

}
