import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthController} from "../../../controllers/auth.controller";
import {Book} from "../../../interfaces/book.interface";

@Component({
  selector: 'app-books-table',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksTableComponent {

  @Input()
  public books: Book[] = [];

  @Input()
  public booksLoading = false;

  @Input()
  public showPublisher = true;

  @Input()
  public showAuthors = true;

  @Output()
  public loadBooks = new EventEmitter;

  public bookName = '';
  public authorName = '';
  public publisherName = '';

  constructor(
    private _authController: AuthController
  ) {
  }

  public get filteredBooks() {
    return this.books.filter((b) => b.name?.toLowerCase().includes(this.bookName.toLowerCase()))
      .filter((b) => this.getBookAuthors(b)?.toLowerCase().includes(this.authorName.toLowerCase()) ?? true)
      .filter((b) => b.publisher?.name?.toLowerCase().includes(this.publisherName.toLowerCase()) ?? true);
  }

  public getBookAuthors(book: Book) {
    return book.authors?.map((a) => a.name).join(', ');
  }

  public get isLoggedIn() {
    return this._authController.isLoggedIn;
  }

}
