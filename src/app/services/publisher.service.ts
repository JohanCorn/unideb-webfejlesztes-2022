import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";
import {Publisher} from "../interfaces/publisher.interface";

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  private _apiUrl = `${environment.apiUrl}/publishers`;

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) {
  }

  public getPublishers(books: boolean = false, books_authors: boolean = false) {
    return this._httpClient.get<Publisher[]>(this._apiUrl, this.createHttpOptions(false, books, books_authors));
  }

  public getPublisher(publisherId: number, books: boolean = false, books_authors: boolean = false) {
    return this._httpClient.get<Publisher>(`${this._apiUrl}/${publisherId}`, this.createHttpOptions(false, books, books_authors));
  }

  public createPublisher(publisher: Publisher) {
    return this._httpClient.post<Publisher>(this._apiUrl, publisher, this.createHttpOptions(true));
  }

  public updatePublisher(publisher: Publisher) {
    return this._httpClient.put<Publisher>(`${this._apiUrl}/${publisher.id}`, publisher, this.createHttpOptions(true));
  }

  public deletePublisher(publisherId: number) {
    return this._httpClient.delete<Publisher>(`${this._apiUrl}/${publisherId}`, this.createHttpOptions(true));
  }

  private createHttpOptions(authorization: boolean = false, books: boolean = false, books_authors: boolean = false) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    if (authorization) httpHeaders = httpHeaders.append('Authorization', `Bearer ${this._authService.accessToken}`);

    let httpPrams = new HttpParams();
    if (books) httpPrams = httpPrams.append('books', true);
    if (books_authors) httpPrams = httpPrams.append('books_authors', true);

    return {
      headers: httpHeaders,
      params: httpPrams
    };
  }

}
