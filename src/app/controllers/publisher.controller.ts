import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {MessageService} from "primeng/api";
import {PublisherService} from "../services/publisher.service";
import {Publisher} from "../interfaces/publisher.interface";

@Injectable({
  providedIn: 'root'
})
export class PublisherController {

  constructor(
    private _messageService: MessageService,
    private _publisherService: PublisherService
  ) {
  }

  public getPublishers(books: boolean = false, books_authors: boolean = false) {
    return new Observable<Publisher[]>((subscriber) => {
      this._publisherService.getPublishers(books, books_authors)
        .subscribe({
          next: (publishers) => subscriber.next(publishers),
          error: (error) => {
            subscriber.error(error);
            this._messageService.add({severity: 'error', summary: 'Publishers Load Failed!', detail: 'Internal Server Error!'});
          }
        });
    });
  }

  public getPublisher(publisherId: number, books: boolean = false, books_authors: boolean = false) {
    return new Observable<Publisher>((subscriber) => {
      this._publisherService.getPublisher(publisherId, books, books_authors)
        .subscribe({
          next: (publisher) => subscriber.next(publisher),
          error: (error) => {
            subscriber.error(error);

            if (error instanceof HttpErrorResponse && error.status !== 404) {
              this._messageService.add({severity: 'error', summary: 'Publisher Load Failed!', detail: 'Internal Server Error!'});
            }
          }
        });
    });
  }

  public createPublisher(publisher: Publisher) {
    return new Observable((subscriber) => {
      this._publisherService.createPublisher(publisher)
        .subscribe({
          next: () => subscriber.next(),
          error: (error) => {
            subscriber.error(error);
            this._messageService.add({
              severity: 'error',
              summary: 'Publisher Create Failed!',
              detail: error instanceof HttpErrorResponse && error.status === 422 ? error.error.message : 'Internal Server Error!'
            });
          }
        });
    });
  }

  public updatePublisher(publisher: Publisher) {
    return new Observable((subscriber) => {
      this._publisherService.updatePublisher(publisher)
        .subscribe({
          next: () => subscriber.next(),
          error: (error) => {
            subscriber.error(error);
            this._messageService.add({
              severity: 'error',
              summary: 'Publisher Update Failed!',
              detail: error instanceof HttpErrorResponse && error.status === 422 ? error.error.message : 'Internal Server Error!'
            });
          }
        });
    });
  }

  public deletePublisher(publisherId: number) {
    return new Observable((subscriber) => {
      this._publisherService.deletePublisher(publisherId)
        .subscribe({
          next: () => subscriber.next(),
          error: (error) => {
            subscriber.error(error);
            this._messageService.add({severity: 'error', summary: 'Publisher Delete Failed!', detail: 'Internal Server Error!'});
          }
        });
    });
  }

}
