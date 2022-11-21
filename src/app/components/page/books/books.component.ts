import {Component, OnInit} from '@angular/core';
import {AuthController} from "../../../controllers/auth.controller";
import {BookController} from "../../../controllers/book.controller";
import {Book} from "../../../interfaces/book.interface";

@Component({
  selector: 'app-books-page',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksPageComponent implements OnInit {

  public books: Book[] = [];
  public booksLoading = false;

  constructor(
    private _authController: AuthController,
    private _bookController: BookController
  ) {
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  public loadBooks() {
    this.books = [];
    this.booksLoading = true;

    this._bookController.getBooks(true, true)
      .subscribe({
        next: (books) => {
          this.books = books;
          this.booksLoading = false;
        },
        error: () => this.booksLoading = false
      });
  }

  public get isLoggedIn() {
    return this._authController.isLoggedIn;
  }

}
