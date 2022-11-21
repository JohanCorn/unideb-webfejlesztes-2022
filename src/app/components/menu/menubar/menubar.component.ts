import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MenuItem} from "primeng/api";
import {AuthController} from "../../../controllers/auth.controller";

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent {

  public items: MenuItem[] = [
    {
      label: 'Home',
      routerLink: ['/'],
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Books',
      routerLink: ['/', 'books'],
      routerLinkActiveOptions: { exact: true }
    },
    {
      label: 'Authors',
      routerLink: ['/', 'authors'],
      routerLinkActiveOptions: { exact: true }
    },
    {
      label: 'Publishers',
      routerLink: ['/', 'publishers'],
      routerLinkActiveOptions: { exact: true }
    }
  ];

  constructor(
    private _router: Router,
    private _authController: AuthController
  ) {
  }

  public logout() {
    this._authController.logout()
      .subscribe({
        next: () => this._router.navigate(['login']),
        error: () => this._router.navigate(['login'])
      });
  }

  public get isLoggedIn() {
    return this._authController.isLoggedIn;
  }

  public get isInProgress() {
    return this._authController.isRegistrationInProgress || this._authController.isLoginInProgress || this._authController.isLogoutInProgress;
  }

}
