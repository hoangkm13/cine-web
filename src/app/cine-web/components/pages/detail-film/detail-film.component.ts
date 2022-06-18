import { Component, OnInit } from '@angular/core';
import {FilmControllerService, UserControllerService, ViewControllerService} from "../../../cine-svc";

@Component({
  selector: 'app-detail-film',
  templateUrl: './detail-film.component.html',
  styleUrls: ['./detail-film.component.scss']
})
export class DetailFilmComponent implements OnInit {

  currentRate: number = 3.5
  filmLargeImage: string = ""


  actor: Array<string> = [
    "Ngoc Nghia", "Hoang Khuat", "Quoc Viet"
  ]
  constructor(
    private service: FilmControllerService,
    private authService: UserControllerService
  ) {
    this.authService.login({username: "hoangkm13", password: "Hoangkm133131"}).subscribe(result => {
      console.log(result)
    })
    this.getData()

  }

  getData() {
    this.service.getBrowseData(5).subscribe(result => {
      console.log(result)
    })
  }

  ngOnInit(): void {
  }

}
