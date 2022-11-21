import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Message} from "primeng/api";
import {AuthController} from "../../../controllers/auth.controller";

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPageComponent {

  public email = '';
  public password = '';
  public messages: Message[] = [];
  public loginInProgress = false;

  constructor(
    private _router: Router,
    private _authController: AuthController
  ) {
  }

  public login() {
    this.messages = [];
    this.loginInProgress = true;
    this._authController.login(this.email, this.password)
      .subscribe({
        next: () => {
          this.loginInProgress = false;
          this._router.navigate(['dashboard'])
        },
        error: (error) => {
          this.loginInProgress = false;
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 401:
              case 422:
                this.addErrorMessage('Invalid Email or Password!');
                break;
              default:
                this.addErrorMessage('Service Unavailable!');
            }
          } else {
            this.addErrorMessage('Service Unavailable!');
          }
        }
      });
  }

  public addErrorMessage(message: string) {
    this.messages = [...this.messages, {severity: 'error', summary: 'Login Failed!', detail: message}];
  }

}
