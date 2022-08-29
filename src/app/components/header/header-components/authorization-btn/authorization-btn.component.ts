import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Component({
  selector: 'app-authorization-btn',
  templateUrl: './authorization-btn.component.html',
  styleUrls: ['./authorization-btn.component.css']
})
export class AuthorizationBtnComponent implements OnInit {

  constructor(private authService: AuthService) { }

  user: {
    name: string,
    message: string,
    userId: string,
    _token: string,
    _refreshToken: string
  } = JSON.parse(`${localStorage.getItem('userData')}`);

  onLogout() {
    this.authService.logOut();
  }

  isAuthenticated = false;

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

}
