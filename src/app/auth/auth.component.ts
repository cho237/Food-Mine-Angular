import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLogin: boolean = true;
  isLoading: boolean = false;
  error: string = '';


  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  changeMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.toastr.error('Invalid Form!', '', {
        progressBar: true,
        closeButton: true,
        timeOut: 3000,
      });
      return;
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    if (this.isLogin) {
      authObs = this.authService.logIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe({
      next: (authData) => {
        console.log(authData)
        this.isLoading = false;
        this.router.navigate(["/"])
        form.reset();
      },
      error: (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage
        this.toastr.error(this.error, '', {
          progressBar: true,
          closeButton: true,
          timeOut: 3000,
        });
        console.log(errorMessage);
      },
    });

    
  }
}
