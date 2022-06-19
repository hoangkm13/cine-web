import {Injectable} from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {GlobalConstants} from "./GlobalConstants";

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService
  ) {
  }
  intercept
  (
    request: HttpRequest<any>,
    next: HttpHandler
  )
    : Observable<HttpEvent<any>> {
    const dupReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.cookieService.get(
          GlobalConstants.authToken
        )}`,
      },
    })

    console.log(
      `Authorization: Bearer ${this.cookieService.get(
        GlobalConstants.authToken
      )}`
    );

    return next.handle(dupReq).pipe(
      retry(0),
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        return throwError(error);
      }
    )
    )
  }
}

export let apiHttpInterceptorProvider = {
  provider: HTTP_INTERCEPTORS,
  useClass: ApiHttpInterceptor,
  multi: true
}
