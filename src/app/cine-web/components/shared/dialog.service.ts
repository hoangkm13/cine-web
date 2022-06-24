import {Injectable} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoadingDataComponent} from "./loading-data/loading-data.component";
import {ErrorDialogData} from "../../interface/data";
import {ErrorDialogComponent} from "./error-dialog/error-dialog.component";

@Injectable({
  providedIn: "root",
})

export class DialogService {
  loadingAnimation: MatDialogRef<LoadingDataComponent> | undefined;

  constructor(
    private matDialog: MatDialog
  ) {
  }

  showErrorDialog(errorDialogData: ErrorDialogData) {
    this.matDialog.open(ErrorDialogComponent, {
      width: "35vw",
      data: {
        title: `${errorDialogData.title == null ? "Error" : errorDialogData.title}`,
        description: `${
          errorDialogData.description == null ? "UNKNOWN_ERROR" : errorDialogData.description
        }`,
        buttonText: `${errorDialogData.buttonText == null ? "Exit" : errorDialogData.buttonText}`,
      }
    }).afterClosed().subscribe(() => errorDialogData.onAccept)
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
