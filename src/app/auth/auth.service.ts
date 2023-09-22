import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  id: string;
  email: string;
  expiresIn: string;
  idToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient) {}

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:5000/auth/login', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleAuthError),
        tap((resData) => {
          this.handleAuthentification(
            resData.email,
            resData.id,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:5000/auth/signup', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleAuthError),
        tap((resData) => {
          this.handleAuthentification(
            resData.email,
            resData.id,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const user = localStorage.getItem('userData');
    if (user == null) {
      return;
    }
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpiration: string;
    } = JSON.parse(user);
   
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpiration)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpiration).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logOut() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  private handleAuthentification(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expiresDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expiresDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleAuthError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occured!';
    if (!errorRes.error) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.message) {
      case 'email_exist':
        errorMessage = 'This email already exist.';
        break;
      case 'weak_password':
        errorMessage = 'Weak password.';
        break;
      case 'user_not_found':
        errorMessage = 'This email does not exist.';
        break;
      case 'wrong_password':
        errorMessage = 'Incorrect password.';
        break;
    }
    return throwError(() => errorMessage);
  }
}
