import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = true;
  error: string | null = null;
  currentLevel = 0;

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;

    if(this.isLoginMode) {
      this.authService.logIn(email, password).subscribe(resData => {
        console.log(resData);
        this.router.navigate(['/']);
      }, errorRes => {
        console.log(errorRes);
        console.log(errorRes.status);
        switch(errorRes.status) {
          case 404:
            this.error = errorRes.error;
            break;
          case 403:
            this.error = errorRes.error + ': wrong email or password';
            break;
          case 0:
            this.error = 'Unknown error';
            break;
          case 404:
            this.error = 'Not found';
            break;
          default:
            this.error = 'Unknown error;'
        }
      })
    }
    else {
      this.authService.signUp(name, email, password).subscribe(resData => {
        console.log(resData);
        this.router.navigate(['/']);
      }, errorRes => {
        console.log(errorRes);
        switch (errorRes.status) {
          case 417:
            this.error = errorRes.error;
            break;
          case 0:
            this.error = 'Unknown error';
            break;
          case 404:
            this.error = 'Not found';
            break;
          default:
            this.error = 'Unknown error';
        }
      });
    }


    form.reset();
  }

  ngOnInit(): void {
  }

}
