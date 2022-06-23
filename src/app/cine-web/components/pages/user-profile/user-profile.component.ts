import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserControllerService} from "../../../cine-svc";
import * as moment from "moment";
import {result} from "lodash";
import * as _ from "lodash";

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

  avatarUrl: string = ""

  actionEdit: string = ""

  genderChoice = [
    {
      value: "MALE",
      viewValue: "Male"
    },
    {
      value: "FEMALE",
      viewValue: "Female"
    },
    {
      value: "ANOTHER",
      viewValue: "Another"
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserControllerService
  ) {
    this.userProfile = formBuilder.group({
      username: [""],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: ["", Validators.required],
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

    this.getData()
  }

  ngOnInit(): void {
  }

  handleUser(actionField: string) {
    this.actionEdit = actionField
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

  getData() {
    this.userService.getCurrentUser().subscribe(result => {
      if(!result.errorCode) {
        this.dataBackup = _.cloneDeep(result.result)
        this.userProfile.patchValue({
          username: this.dataBackup.username,
          firstName: this.dataBackup.firstName,
          lastName: this.dataBackup.lastName,
          gender: this.dataBackup.gender,
          dateOfBirth: moment(new Date(this.dataBackup.birthOfDate)).format("yyyy-MM-DD"),
          mobile: this.dataBackup.mobile,
          email: this.dataBackup.email
        })

        console.log(result)

        this.avatarUrl = `assets/images/users/${this.dataBackup.avatar}`
      }
    })
  }

  editUser() {
    if(this.actionEdit === 'editProfile') {
      this.userService.updateUser(
        this.dataBackup.id,
        {
          firstName: this.userProfile.controls['firstName'].value,
          lastName: this.userProfile.controls['lastName'].value,
          gender: this.userProfile.controls['gender'].value,
          birthOfDate: moment(this.userProfile.controls['dateOfBirth'].value).toISOString(),
          mobile: this.userProfile.controls['mobile'].value,
          email: this.userProfile.controls['email'].value
        }
      ).subscribe(result => {
        if(!result.errorCode) {
          this.handleUser("cancel")
          this.getData()
        }
      })

    }
  }
}
