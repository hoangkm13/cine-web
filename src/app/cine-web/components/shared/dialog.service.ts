import {Injectable} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoadingDataComponent} from "./loading-data/loading-data.component";

@Injectable({
  providedIn: "root",
})

export class DialogService {
  loadingAnimation: MatDialogRef<LoadingDataComponent> | undefined;

  constructor(
    private matDialog: MatDialog
  ) {
  }

  showLoadingData() {
    this.loadingAnimation = this.matDialog.open(LoadingDataComponent, {
      panelClass: "reset-class",
      disableClose: true
    })
  }

  closeLoadingData() {
    // @ts-ignore
    this.loadingAnimation.close()
  }
}
