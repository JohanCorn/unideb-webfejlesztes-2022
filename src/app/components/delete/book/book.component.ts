import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookController} from "../../../controllers/book.controller";
import {Book} from "../../../interfaces/book.interface";

@Component({
  selector: 'app-delete-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class DeleteBookComponent {

  @Input()
  public bookId!: number;

  @Output()
  public deleteSuccess = new EventEmitter;

  public book!: Book;

  public visibleDialog = false;
  public bookLoading = false;
  public deleteLoading = false;

  constructor(
    private _bookController: BookController
  ) {
  }

  public show() {
    this.book = {name: undefined, publisher_id: undefined, publish_year: undefined, pages_num: undefined};
    this.visibleDialog = true;
    this.bookLoading = true;

    this._bookController.getBook(this.bookId)
      .subscribe((book) => {
        this.book = book;
        this.bookLoading = false;
      });
  }

  public delete() {
    this.deleteLoading = true;
    this._bookController.deleteBook(this.bookId)
      .subscribe({
        next: () => {
          this.deleteLoading = false;
          this.visibleDialog = false;
          this.deleteSuccess.emit();
        },
        error: () => this.deleteLoading = false
      });
  }

  public get isLoading() {
    return this.deleteLoading || this.bookLoading;
  }

}
