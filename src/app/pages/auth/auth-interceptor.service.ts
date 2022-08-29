import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = JSON.parse(`${localStorage.getItem("userData")}`)._token;

    if (idToken) {
      const cloned = req.clone({
          headers: req.headers.set("Authorization",
              "Bearer " + idToken)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   return this.authService.user.pipe(
  //     take(1),
  //     exhaustMap(user => {
  //       if(!user) {
  //         return next.handle(req);
  //       }
  //       console.log(user.token)
  //       const modifiedReq = req.clone({ params: new HttpParams().set('Authorization', "Bearer " + user.token)
  //     });
  //     this.authService.user.subscribe();
  //     return next.handle(modifiedReq);
  //     })
  //   )
  // }
}
