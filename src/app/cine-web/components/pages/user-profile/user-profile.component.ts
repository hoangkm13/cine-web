import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserControllerService} from "../../../cine-svc";
import * as moment from "moment";
import {result} from "lodash";
import * as _ from "lodash";
import {CookieService} from "ngx-cookie-service";
import {GlobalConstants} from "../../shared/GlobalConstants";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {DialogService} from "../../shared/dialog.service";

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
      value: "OTHER",
      viewValue: "Other"
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserControllerService,
    private cookieService: CookieService,
    private router: Router,
    private matDialogRef: MatDialogRef<UserProfileComponent>,
    private dialogService: DialogService
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
      this.passwordForm.disable()
      this.passwordForm.reset()
      this.cloneData()
    }
  }

  getData() {
    this.userService.getCurrentUser().subscribe(result => {
      if(!result.errorCode) {
        this.dataBackup = _.cloneDeep(result.result)
        this.cloneData()
        this.avatarUrl = `assets/images/users/${this.dataBackup.avatar}`
      } else {
        this.showErrorDialog(result)
      }
    })
  }

  editUser() {
    if(this.userProfile.invalid || this.passwordForm.invalid) {
      this.dialogService.showErrorDialog({
        title: "Error",
        description: "Please fill out all fields",
        buttonText: "Exit",
        onAccept: () => {}
      })
      if(this.actionEdit === 'editProfile') {
        this.userProfile.markAllAsTouched()
      }
      if(this.actionEdit === 'changePassword'){
        this.passwordForm.markAllAsTouched()
      }
      return
    }
    if(this.passwordForm.controls['newPassword'].value !== this.passwordForm.controls['confirmNewPassword'].value) {
      this.dialogService.showErrorDialog({
        title: "Error",
        description: "Confirm password not matching",
        buttonText: "Exit",
        onAccept: () => {}
      })
      this.passwordForm.reset()
      return
    }
    if(this.actionEdit === 'editProfile') {
      this.userService.updateUser(
        this.dataBackup.id,
        {
          firstName: this.userProfile.controls['firstName'].value.trim(),
          lastName: this.userProfile.controls['lastName'].value.trim(),
          gender: this.userProfile.controls['gender'].value,
          birthOfDate: moment(this.userProfile.controls['dateOfBirth'].value).toISOString(),
          mobile: this.userProfile.controls['mobile'].value,
          email: this.userProfile.controls['email'].value.trim()
        }
      ).subscribe(result => {
        if(!result.errorCode) {
          this.handleUser("cancel")
          this.getData()
          this.showSnackBar("Edit user profile successfully")
        } else {
          this.showErrorDialog(result)
        }
      })

    }

    else if(this.actionEdit === 'changePassword') {
      this.userService.resetPassword(
        this.dataBackup.id,
        {
          password: this.passwordForm.controls["newPassword"].value
        }
      ).subscribe(result => {
        if(!result.errorCode) {
          this.handleUser("cancel")
          this.getData()
          this.showSnackBar("Edit user profile successfully")
        } else {
          this.showErrorDialog(result)
        }
      })
    }

  }

  cloneData() {
    this.userProfile.patchValue({
      username: this.dataBackup.username,
      firstName: this.dataBackup.firstName,
      lastName: this.dataBackup.lastName,
      gender: this.dataBackup.gender,
      dateOfBirth: moment(new Date(this.dataBackup.birthOfDate)).format("yyyy-MM-DD"),
      mobile: this.dataBackup.mobile,
      email: this.dataBackup.email
    })
  }

  isNumber(event: KeyboardEvent) {
    return event.keyCode >= 48 && event.keyCode <= 57
  }

  enterPassword(event: KeyboardEvent) {
    return event.keyCode != 32
  }

  onSignOut() {
    this.cookieService.delete(GlobalConstants.authToken, "/")
    this.cookieService.delete(GlobalConstants.searchType, "/")
    this.router.navigate(['/cine-web'])
    this.matDialogRef.close()
  }

  showErrorDialog(result: any) {
    this.dialogService.showErrorDialog({
      title: "Error",
      description: `${result.message}`,
      buttonText: "Exit",
      onAccept: () => {}
    })
  }

  showSnackBar(message: string) {
    this.dialogService.showSnackBar({message: message})
  }
}
