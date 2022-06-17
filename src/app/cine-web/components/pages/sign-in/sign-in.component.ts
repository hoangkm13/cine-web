import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  formGroup: FormGroup ;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      username: [],
      password: []
    });
  }

  ngOnInit(): void {
  }

}
