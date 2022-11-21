import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";
import {Book} from "../interfaces/book.interface";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _apiUrl = `${environment.apiUrl}/books`;

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) {
  }

  public getBooks(publisher: boolean = false, authors: boolean = false) {
    return this._httpClient.get<Book[]>(this._apiUrl, this.createHttpOptions(false, publisher, authors));
  }

  public getBook(bookId: number, publisher: boolean = false, authors: boolean = false) {
    return this._httpClient.get<Book>(`${this._apiUrl}/${bookId}`, this.createHttpOptions(false, publisher, authors));
  }

  public createBook(book: Book) {
    return this._httpClient.post<Book>(this._apiUrl, book, this.createHttpOptions(true));
  }

  public updateBook(book: Book) {
    return this._httpClient.put<Book>(`${this._apiUrl}/${book.id}`, book, this.createHttpOptions(true));
  }

  public deleteBook(bookId: number) {
    return this._httpClient.delete<Book>(`${this._apiUrl}/${bookId}`, this.createHttpOptions(true));
  }

  private createHttpOptions(authorization: boolean = false, publisher: boolean = false, authors: boolean = false) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    if (authorization) httpHeaders = httpHeaders.append('Authorization', `Bearer ${this._authService.accessToken}`);

    let httpPrams = new HttpParams();
    if (publisher) httpPrams = httpPrams.append('publisher', true);
    if (authors) httpPrams = httpPrams.append('authors', true);

    return {
      headers: httpHeaders,
      params: httpPrams
    };
  }

}
