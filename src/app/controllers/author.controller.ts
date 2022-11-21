import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {MessageService} from "primeng/api";
import {AuthorService} from "../services/author.service";
import {Author} from "../interfaces/author.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthorController {

  constructor(
    private _messageService: MessageService,
    private _authorService: AuthorService
  ) {
  }

  public getAuthors(books: boolean = false, books_publisher: boolean = false) {
    return new Observable<Author[]>((subscriber) => {
      this._authorService.getAuthors(books, books_publisher)
        .subscribe({
          next: (authors) => subscriber.next(authors),
          error: (error) => {
            subscriber.error(error);
            this._messageService.add({severity: 'error', summary: 'Authors Load Failed!', detail: 'Internal Server Error!'});
          }
        });
    });
  }

  public getAuthor(authorId: number, books: boolean = false, books_publisher: boolean = false) {
    return new Observable<Author>((subscriber) => {
      this._authorService.getAuthor(authorId, books, books_publisher)
        .subscribe({
          next: (author) => subscriber.next(author),
          error: (error) => {
            subscriber.error(error);

            if (error instanceof HttpErrorResponse && error.status !== 404) {
              this._messageService.add({severity: 'error', summary: 'Author Load Failed!', detail: 'Internal Server Error!'});
            }
          }
        });
    });
  }

  public createAuthor(author: Author) {
    return new Observable((subscriber) => {
      this._authorService.createAuthor(author)
        .subscribe({
          next: () => subscriber.next(),
          error: (error) => {
            subscriber.error(error);
            this._messageService.add({
              severity: 'error',
              summary: 'Author Create Failed!',
              detail: error instanceof HttpErrorResponse && error.status === 422 ? error.error.message : 'Internal Server Error!'
            });
          }
        });
    });
  }

  public updateAuthor(author: Author) {
    return new Observable((subscriber) => {
      this._authorService.updateAuthor(author)
        .subscribe({
          next: () => subscriber.next(),
          error: (error) => {
            subscriber.error(error);
            this._messageService.add({
              severity: 'error',
              summary: 'Author Update Failed!',
              detail: error instanceof HttpErrorResponse && error.status === 422 ? error.error.message : 'Internal Server Error!'
            });
          }
        });
    });
  }

  public deleteAuthor(authorId: number) {
    return new Observable((subscriber) => {
      this._authorService.deleteAuthor(authorId)
        .subscribe({
          next: () => subscriber.next(),
          error: (error) => {
            subscriber.error(error);
            this._messageService.add({severity: 'error', summary: 'Author Delete Failed!', detail: 'Internal Server Error!'});
          }
        });
    });
  }

}
