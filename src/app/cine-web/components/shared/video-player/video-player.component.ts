import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  constructor(
    private matDialogRef: MatDialogRef<VideoPlayerComponent>
  ) { }

  ngOnInit(): void {
  }

  closeVideoPlayer() {
    this.matDialogRef.close("viewed")
  }
}
