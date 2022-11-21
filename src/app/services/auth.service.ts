import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {RegistrationRequest} from "../interfaces/registration-request.interface";
import {RegistrationResponse} from "../interfaces/registration-response.interface";
import {LoginRequest} from "../interfaces/login-request.interface";
import {LoginResponse} from "../interfaces/login-response.interface";
import {User} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: User | null;
  private _accessToken: string | null;

  constructor(
    private _httpClient: HttpClient
  ) {
    this._user = JSON.parse(localStorage.getItem('user')!);
    this._accessToken = localStorage.getItem('access_token')!;
  }

  public set user(user: User | null) {
    this._user = user;
    user ? localStorage.setItem('user', JSON.stringify(user)) : localStorage.removeItem('user');
  }

  public get accessToken() {
    return this._accessToken;
  }

  public set accessToken(accessToken: string | null) {
    this._accessToken = accessToken;
    accessToken ? localStorage.setItem('access_token', accessToken) : localStorage.removeItem('access_token');
  }

  public get isLoggedIn() {
    return this._user !== null && this._accessToken !== null;
  }

  public registration(request: RegistrationRequest) {
    return new Observable((subscriber) => {
      this._httpClient.post<RegistrationResponse>(`${environment.apiUrl}/auth/registration`, request, this.createHttpOptions())
        .subscribe({
          next: (registrationResponse) => {
            this.user = registrationResponse.user;
            this.accessToken = registrationResponse.access_token;
            subscriber.next();
            subscriber.complete();
          },
          error: (error) => {
            subscriber.error(error);
            subscriber.complete();
          }
        });
    });
  }

  public login(request: LoginRequest) {
    return new Observable((subscriber) => {
      this._httpClient.post<LoginResponse>(`${environment.apiUrl}/auth/login`, request, this.createHttpOptions())
        .subscribe({
          next: (loginResponse) => {
            this.user = loginResponse.user;
            this.accessToken = loginResponse.access_token;
            subscriber.next();
            subscriber.complete();
          },
          error: (error) => subscriber.error(error)
        });
    });
  }

  public logout() {
    return new Observable((subscriber) => {
      this._httpClient.delete(`${environment.apiUrl}/auth/logout`, this.createHttpOptions())
        .subscribe({
          next: () => {
            this.user = null;
            this.accessToken = null;
            subscriber.next();
            subscriber.complete();
          },
          error: () => {
            this.user = null;
            this.accessToken = null;
            subscriber.error();
          }
        });
    });
  }

  private createHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._accessToken}`
      })
    };
  }

}
