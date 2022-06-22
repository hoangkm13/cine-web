import {Component, OnInit} from '@angular/core';
import {
  ApiResponseListCategorizedFilmsDTO,
  FilmControllerService,
  FilmDTO, Genre
} from "../../../cine-svc";

export interface SLIDE_DATA {
  genre: string;
  filmList: Array<FilmDTO>
}

@Component({
  selector: 'app-landing-cine-web',
  templateUrl: './landing-cine-web.component.html',
  styleUrls: ['./landing-cine-web.component.scss'],
})
export class LandingCineWebComponent implements OnInit {

  beforePath = "././assets/images/films/";
  afterPath = "/small.jpg";

  currentStar: number = 3

  slides: SLIDE_DATA[] = [];

  constructor(private filmController: FilmControllerService) {

  }

  ngOnInit(): void {
    this.filmController.getBrowseData(10).subscribe((response: ApiResponseListCategorizedFilmsDTO) => {
      response.result?.map((ele) => {
        this.slides.push(<SLIDE_DATA>{genre: ele.genre?.name, filmList: ele.films})
      })
    })
    console.log(this.slides)
  }

  slideConfig = {
    slidesToShow: 1,
    infinite: true,
    variableWidth: true,
    outerEdgeLimit: true,
    arrows: true,
  };

  setStarRating(star: any): number{
    return Number(star);
  }
}
