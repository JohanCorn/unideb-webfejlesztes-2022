import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";
import {Author} from "../interfaces/author.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private _apiUrl = `${environment.apiUrl}/authors`;

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) {
  }

  public getAuthors(books: boolean = false, books_publisher: boolean = false) {
    return this._httpClient.get<Author[]>(this._apiUrl, this.createHttpOptions(false, books, books_publisher));
  }

  public getAuthor(authorId: number, books: boolean = false, books_publisher: boolean = false) {
    return this._httpClient.get<Author>(`${this._apiUrl}/${authorId}`, this.createHttpOptions(false, books, books_publisher));
  }

  public createAuthor(author: Author) {
    return this._httpClient.post<Author>(this._apiUrl, author, this.createHttpOptions(true));
  }

  public updateAuthor(author: Author) {
    return this._httpClient.put<Author>(`${this._apiUrl}/${author.id}`, author, this.createHttpOptions(true));
  }

  public deleteAuthor(authorId: number) {
    return this._httpClient.delete<Author>(`${this._apiUrl}/${authorId}`, this.createHttpOptions(true));
  }

  private createHttpOptions(authorization: boolean = false, books: boolean = false, books_publisher: boolean = false) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    if (authorization) httpHeaders = httpHeaders.append('Authorization', `Bearer ${this._authService.accessToken}`);

    let httpPrams = new HttpParams();
    if (books) httpPrams = httpPrams.append('books', true);
    if (books_publisher) httpPrams = httpPrams.append('books_publisher', true);

    return {
      headers: httpHeaders,
      params: httpPrams
    };
  }

}
