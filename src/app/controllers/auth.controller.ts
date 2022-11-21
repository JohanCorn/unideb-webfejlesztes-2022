import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AuthController {

  private _isRegistrationInProgress = false;
  private _isLoginInProgress = false;
  private _isLogoutInProgress = false;

  constructor(
    private _authService: AuthService,
    private _messageService: MessageService
  ) {
  }

  public get isLoggedIn() {
    return this._authService.isLoggedIn;
  }

  public get isRegistrationInProgress() {
    return this._isRegistrationInProgress;
  }

  public get isLoginInProgress() {
    return this._isLoginInProgress;
  }

  public get isLogoutInProgress() {
    return this._isLogoutInProgress;
  }

  public registration(name: string, email: string, password: string, passwordConfirmation: string) {
    this._isRegistrationInProgress = true;
    return new Observable((subscriber) => {
      this._authService.registration({
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      }).subscribe({
        next: () => {
          this._isRegistrationInProgress = false;
          this._messageService.add({severity: 'success', summary: 'Registration Success!', detail: 'Auto Login!'});
          subscriber.next();
          subscriber.complete();
        },
        error: (error) => {
          this._isRegistrationInProgress = false;
          subscriber.error(error);
        }
      });
    });
  }

  public login(email: string, password: string) {
    this._isLoginInProgress = true;
    return new Observable((subscriber) => {
      this._authService.login({
        email: email,
        password: password
      }).subscribe({
        next: () => {
          this._isLoginInProgress = false;
          this._messageService.add({severity: 'success', summary: 'Login Success!', detail: 'Welcome Back!'});
          subscriber.next();
          subscriber.complete();
        },
        error: (error) => {
          subscriber.error(error);
          this._isLoginInProgress = false;
        }
      });
    });
  }

  public logout() {
    this._isLogoutInProgress = true;
    return new Observable((subscriber) => {
      this._authService.logout()
        .subscribe({
          next: () => {
            this._isLogoutInProgress = false;
            subscriber.next();
            subscriber.complete();
          },
          error: (error) => {
            subscriber.error(error);
            this._isLogoutInProgress = false;
          }
        });
    });
  }

}
