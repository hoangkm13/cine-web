import { Component, OnInit } from '@angular/core';
import {FilmControllerService, UserControllerService, ViewControllerService} from "../../../cine-svc";
import {CookieService} from "ngx-cookie-service";
import {GlobalConstants} from "../../shared/GlobalConstants";

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
    private authService: UserControllerService,
    private cookie: CookieService
  ) {
    this.authService.login({username: "hoangkm13", password: "Hoangkm133131"}).subscribe(result => {
      this.cookie.set(GlobalConstants.authToken, <string>result.result?.token, undefined, "/")
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
