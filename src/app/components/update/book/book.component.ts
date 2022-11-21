import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PublisherController} from "../../../controllers/publisher.controller";
import {BookController} from "../../../controllers/book.controller";
import {Publisher} from "../../../interfaces/publisher.interface";
import {Book} from "../../../interfaces/book.interface";

@Component({
  selector: 'app-update-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class UpdateBookComponent {

  @Input()
  public bookId!: number;

  @Output()
  public updateSuccess = new EventEmitter;

  public book!: Book;
  public publishers: Publisher[] = [];

  public visibleDialog = false;
  public bookLoading = false;
  public publishersLoading = false;
  public updateLoading = false;

  constructor(
    private _publisherController: PublisherController,
    private _bookController: BookController
  ) {
  }

  public show() {
    this.book = {name: undefined, description: undefined, image_link: undefined, pages_num: undefined, publish_year: undefined, publisher_id: undefined, publisher: undefined};
    this.publishers = [];
    this.visibleDialog = true;
    this.bookLoading = true;
    this.publishersLoading = true;

    this._bookController.getBook(this.bookId, true)
      .subscribe((book) => {
        this.book = book;
        this.publishers = book.publisher ? [book.publisher] : [];
        this.bookLoading = false;
      });

    this._publisherController.getPublishers(false)
      .subscribe((publishers) => {
        this.publishers = publishers;
        this.publishersLoading = false;
      });
  }

  public update() {
    this.updateLoading = true;
    this._bookController.updateBook(this.book)
      .subscribe({
        next: () => {
          this.updateLoading = false;
          this.visibleDialog = false;
          this.updateSuccess.emit();
        },
        error: () => this.updateLoading = false
      });
  }

  public get isLoading() {
    return this.updateLoading || this.bookLoading || this.publishersLoading;
  }

}
