import {CookieService} from "ngx-cookie-service";
import {apiHttpInterceptorProvider} from "./cine-web/components/shared/api-http-interceptor";

export const _providers = [
  CookieService,
  apiHttpInterceptorProvider
]
