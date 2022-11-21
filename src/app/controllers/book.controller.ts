import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {MessageService} from "primeng/api";
import {BookService} from "../services/book.service";
import {Book} from "../interfaces/book.interface";

@Injectable({
  providedIn: 'root'
})
export class BookController {

  constructor(
    private _messageService: MessageService,
    private _bookService: BookService
  ) {
  }

  public getBooks(publisher: boolean = false, authors: boolean = false) {
    return new Observable<Book[]>((subscriber) => {
      this._bookService.getBooks(publisher, authors)
        .subscribe({
          next: (publishers) => subscriber.next(publishers),
          error: (error) => {
            subscriber.error(error);
            this._messageService.add({severity: 'error', summary: 'Books Load Failed!', detail: 'Internal Server Error!'});
          }
        });
    });
  }

  public getBook(bookId: number, publisher: boolean = false, authors: boolean = false) {
    return new Observable<Book>((subscriber) => {
      this._bookService.getBook(bookId, publisher, authors)
        .subscribe({
          next: (publisher) => subscriber.next(publisher),
          error: (error) => {
            subscriber.error(error);

            if (error instanceof HttpErrorResponse && error.status !== 404) {
              this._messageService.add({severity: 'error', summary: 'Book Load Failed!', detail: 'Internal Server Error!'});
            }
          }
        });
    });
  }

  public createBook(book: Book) {
    return new Observable((subscriber) => {
      this._bookService.createBook(book)
        .subscribe({
          next: () => subscriber.next(),
          error: (error) => {
            subscriber.error(error);
            this._messageService.add({
              severity: 'error',
              summary: 'Book Create Failed!',
              detail: error instanceof HttpErrorResponse && error.status === 422 ? error.error.message : 'Internal Server Error!'
            });
          }
        });
    });
  }

  public updateBook(book: Book) {
    return new Observable((subscriber) => {
      this._bookService.updateBook(book)
        .subscribe({
          next: () => subscriber.next(),
          error: (error) => {
            subscriber.error(error);
            this._messageService.add({
              severity: 'error',
              summary: 'Book Update Failed!',
              detail: error instanceof HttpErrorResponse && error.status === 422 ? error.error.message : 'Internal Server Error!'
            });
          }
        });
    });
  }

  public deleteBook(bookId: number) {
    return new Observable((subscriber) => {
      this._bookService.deleteBook(bookId)
        .subscribe({
          next: () => subscriber.next(),
          error: (error) => {
            subscriber.error(error);
            this._messageService.add({severity: 'error', summary: 'Book Delete Failed!', detail: 'Internal Server Error!'});
          }
        });
    });
  }

}
