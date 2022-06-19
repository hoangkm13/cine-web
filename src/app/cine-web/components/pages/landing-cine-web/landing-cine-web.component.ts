import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-cine-web',
  templateUrl: './landing-cine-web.component.html',
  styleUrls: ['./landing-cine-web.component.scss'],
})
export class LandingCineWebComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'Ngx-Slick-Carousel-In-Angular-Material-Card-with-Custom-Arrows';
  slides = [
    {img: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {img: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {img: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {img: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
  ];
  slideConfig = {
    slidesToShow: 1,
    infinite: true,
    variableWidth: true,
    outerEdgeLimit: true,
    nextArrow: '<div style=\'position: absolute; top: 35%; right: 5px; cursor: pointer;\' class=\'next-slide\'><i class="fa fa-angle-double-right"></i></div>',
    prevArrow: '<div style=\'position: absolute; top: 35%; left: 5px; z-index: 1; cursor: pointer;\' class=\'next-slide\'><i class="fa fa-angle-double-left"></i></div>'
  };

}
