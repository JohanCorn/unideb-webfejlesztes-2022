import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Message} from "primeng/api";
import {AuthController} from "../../../controllers/auth.controller";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationPageComponent {

  public name = '';
  public email = '';
  public password = '';
  public passwordConfirmation = '';
  public messages: Message[] = [];
  public registrationInProgress = false;

  constructor(
    private _router: Router,
    private _authController: AuthController
  ) {
  }

  public registration() {
    this.messages = [];
    this.registrationInProgress = true;
    this._authController.registration(this.name, this.email, this.password, this.passwordConfirmation)
      .subscribe({
        next: () => {
          this.registrationInProgress = false;
          this._router.navigate(['dashboard']);
        },
        error: (error) => {
          this.registrationInProgress = false;
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 403:
                this.addErrorMessage('Librarian Already Registered!');
                break;
              case 422:
                this.addErrorMessage(error.error.message);
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
    this.messages = [...this.messages, {severity: 'error', summary: 'Registration Failed!', detail: message}];
  }

}
