import { Component, OnInit } from '@angular/core';
import {FREQUENTLY_QUIZ, Frequently_quiz} from "../../../static/frequently_quiz";
import {ApiResponseLoginResponseDTO, FilmControllerService, UserControllerService} from "../../../cine-svc";
import {parseJSONData} from "../../shared/parseJSONData";

@Component({
  selector: 'app-home-cine-web',
  templateUrl: './home-cine-web.component.html',
  styleUrls: ['./home-cine-web.component.scss']
})
export class HomeCineWebComponent implements OnInit {

  frequently_quiz: Frequently_quiz[] = []
  // data: any

  constructor(
    // private service: UserControllerService
  ) {
    // this.service.login({username: "hoangkm13", password: "Hoangkm133131"}).subscribe(result => {
    //   this.data = parseJSONData(result)
    //   console.log(this.data.result.token)
    // })
    this.frequently_quiz = FREQUENTLY_QUIZ
  }

  ngOnInit(): void {
  }

}
