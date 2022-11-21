import {Component, EventEmitter, Output} from '@angular/core';
import {PublisherController} from "../../../controllers/publisher.controller";
import {BookController} from "../../../controllers/book.controller";
import {Publisher} from "../../../interfaces/publisher.interface";
import {Book} from "../../../interfaces/book.interface";

@Component({
  selector: 'app-create-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class CreateBookComponent {

  @Output()
  public createSuccess = new EventEmitter;

  public book!: Book;
  public publishers: Publisher[] = [];

  public visibleDialog = false;
  public publishersLoading = false;
  public createLoading = false;

  constructor(
    private _publisherController: PublisherController,
    private _bookController: BookController
  ) {
  }

  public show() {
    this.book = {name: undefined, description: undefined, image_link: undefined, pages_num: undefined, publish_year: undefined, publisher_id: undefined};
    this.publishers = [];
    this.visibleDialog = true;
    this.publishersLoading = true;

    this._publisherController.getPublishers(false)
      .subscribe((publishers) => {
        this.publishers = publishers;
        this.publishersLoading = false;
      });
  }

  public create() {
    this.createLoading = true;
    this._bookController.createBook(this.book)
      .subscribe({
        next: () => {
          this.createLoading = false;
          this.visibleDialog = false;
          this.createSuccess.emit();
        },
        error: () => this.createLoading = false
      });
  }

  public get isLoading() {
    return this.createLoading || this.publishersLoading;
  }

}
