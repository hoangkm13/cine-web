import {Injectable} from "@angular/core"
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http"
import {catchError, finalize, Observable, of, retry, throwError} from "rxjs"
import {CookieService} from "ngx-cookie-service"
import {GlobalConstants} from "./GlobalConstants"
import {DialogService} from "./dialog.service"
import {MatDialog} from "@angular/material/dialog"
import {Router} from "@angular/router"

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

  private totalRequest = 0

  constructor(
    private cookieService: CookieService,
    private dialog: DialogService,
    private matDialog: MatDialog,
    private router: Router
  ) {
  }
  intercept
  (
    request: HttpRequest<any>,
    next: HttpHandler
  )
    : Observable<HttpEvent<any>> {
    this.totalRequest++
    console.log(this.totalRequest)
    if (this.totalRequest === 1) {
      this.dialog.showLoadingData()
    }

    const dupReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.cookieService.get(
          GlobalConstants.authToken
        )}`,
      },
    })

    return next.handle(dupReq).pipe(
      finalize(() => {
        if (this.totalRequest > 0) this.totalRequest--
        console.log(this.totalRequest)
        if(this.totalRequest === 0) {
          this.dialog.closeLoadingData()
        }

      }),
      retry(0),
      catchError((error: HttpErrorResponse) => {
        console.log(this.totalRequest)
        if (this.totalRequest > 0) this.totalRequest--
        if (this.totalRequest === 0) {
          this.dialog.closeLoadingData()
        }
        this.handleBaseErrorStatus(error)
        return throwError(error)
      }
    )
    )
  }

  private handleBaseErrorStatus(error: HttpErrorResponse): Observable<any> {
    switch (error.status) {
      case 400:
        this.router.navigate(["sign-in"])
        break
      case 401:
        this.router.navigate(["sign-in"])
        break
      case 403:
        this.router.navigate(["welcome"])
        break
      case 0:
        break
      case 502:
        this.router.navigate(["cine-web"]).then(() => {})
        break
      default:
        break
    }
    return of()
  }
}

export let apiHttpInterceptorProvider = {
  provider: HTTP_INTERCEPTORS,
  useClass: ApiHttpInterceptor,
  multi: true
}
