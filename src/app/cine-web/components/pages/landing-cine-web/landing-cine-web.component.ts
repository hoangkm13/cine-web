import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-cine-web',
  templateUrl: './landing-cine-web.component.html',
  styleUrls: ['./landing-cine-web.component.scss']
})
export class LandingCineWebComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  children = [
    { title: 'Child 1' },
    { title: 'Child 2' },
    { title: 'Child 3' },
    { title: 'Child 4' },
    { title: 'Child 5' },
    { title: 'Child 6' },
  ];

  flickityOptions = {
    cellAlign: 'left',
    groupCells: true,
    initialIndex: 2,
  };
}
