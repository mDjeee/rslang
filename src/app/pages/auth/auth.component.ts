import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  error: string | null = null;
  currentLevel = 0;

  constructor(private authService: AuthService) { }

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
      // ...
    } else {
      this.authService.signUp(name, email, password).subscribe(resData => {
        console.log(resData)
      }, errorRes => {
        console.log(errorRes);
        switch (errorRes.status) {
          case 417:
            this.error = errorRes.error;
            break;
        }
        // this.error = 'An error occured';
      });
    }


    form.reset();
  }

  ngOnInit(): void {
  }

}
