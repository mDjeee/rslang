import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, tap } from "rxjs";
import { ApiService } from "src/app/core/api.service";
import { User } from "./user.module";

@Injectable({providedIn: 'root'})
export class AuthService {

  user = new BehaviorSubject<User | null>(null);

  constructor(private apiService: ApiService, private router: Router) {  }

  signUp(name: string, email: string, password: string) {
    return this.apiService.postUser(name, email, password).pipe(tap(resData => {
      this.handleAuthentication(resData.token, resData.message, resData.userId, resData.refreshToken, resData.name);
    }));
  }

  autoLogin() {
    const userData: {
      name: string,
      message: string,
      userId: string,
      _token: string,
      _refreshToken: string
    } = JSON.parse(`${localStorage.getItem('userData')}`);
    if(!userData) {
      return;
    }

    const loadedUser = new User(userData.message, userData.name, userData.userId, userData._token, userData._refreshToken);

    if(loadedUser.token) {
      this.user.next(loadedUser);
    }

    console.log(loadedUser);
  }

  logIn(email: string, password: string) {
    return this.apiService.signInUser(email, password).pipe(tap(resData => {
      this.handleAuthentication(resData.token, resData.message, resData.userId, resData.refreshToken, resData.name);
    }));
  }

  logOut() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/authorization']);
  }

  private handleAuthentication(token: string, message: string, userId: string, refreshToken: string, name: string) {
    const user = new User(message, name, userId, token, refreshToken);

    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
