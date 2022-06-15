import { Component, OnInit } from '@angular/core';
import {FREQUENTLY_QUIZ, Frequently_quiz} from "../../static/frequently_quiz";

@Component({
  selector: 'app-home-cine-web',
  templateUrl: './home-cine-web.component.html',
  styleUrls: ['./home-cine-web.component.scss']
})
export class HomeCineWebComponent implements OnInit {

  frequently_quiz: Frequently_quiz[] = []

  constructor() {
    this.frequently_quiz = FREQUENTLY_QUIZ
  }

  ngOnInit(): void {
  }

}
