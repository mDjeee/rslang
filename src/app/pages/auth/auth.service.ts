import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, tap } from "rxjs";
import { ApiService } from "src/app/core/api.service";
import { User } from "./user.module";

@Injectable({providedIn: 'root'})
export class AuthService {

  user = new Subject<User>();

  constructor(private apiService: ApiService) {  }

  signUp(name: string, email: string, password: string) {
    return this.apiService.postUser(name, email, password).pipe(tap(resData => {
      this.handleAuthentication(resData.email, resData.token, resData.message, resData.userId, resData.refreshToken);
    }));
  }

  logIn(email: string, password: string) {
    return this.apiService.signInUser(email, password);
  }

  private handleAuthentication(email: string, token: string, message: string, userId: string, refreshToken: string) {
    const user = new User(email, userId, token, refreshToken, message);

    this.user.next(user);
  }
}
