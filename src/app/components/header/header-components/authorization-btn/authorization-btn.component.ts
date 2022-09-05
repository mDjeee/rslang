import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Component({
  selector: 'app-authorization-btn',
  templateUrl: './authorization-btn.component.html',
  styleUrls: ['./authorization-btn.component.css']
})
export class AuthorizationBtnComponent implements OnInit, OnDestroy  {

  constructor(private authService: AuthService) { }

  user: {
    name: string,
    message: string,
    userId: string,
    _token: string,
    _refreshToken: string
  } = JSON.parse(`${localStorage.getItem('userData')}`);

  userName = 'User';

  userSubs: Subscription | undefined;

  onLogout() {
    this.authService.logOut();
  }

  isAuthenticated = false;

  ngOnInit(): void {
    this.userSubs = this.authService.user.subscribe((user: any) => {
      this.isAuthenticated = !!user;
      this.userName = user.name
    });
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
  }
}
