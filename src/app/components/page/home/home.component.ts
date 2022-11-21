import {Component, OnInit} from '@angular/core';
import {BookController} from "../../../controllers/book.controller";
import {Book} from "../../../interfaces/book.interface";

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {

  public bookName = '';
  public authorName = '';
  public publisherName = '';
  public books: Book[] = [];
  public booksLoading = false;

  constructor(
    public _bookController: BookController
  ) {
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  public loadBooks() {
    this.books = new Array(4);
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

  public get filteredBooks() {
    return this.books.filter((b) => b.name?.toLowerCase().includes(this.bookName.toLowerCase()))
      .filter((b) => this.getBookAuthors(b)?.toLowerCase().includes(this.authorName.toLowerCase()) ?? true)
      .filter((b) => b.publisher?.name?.toLowerCase().includes(this.publisherName.toLowerCase()) ?? true);
  }

  public getBookAuthors(book: Book) {
    return book.authors?.map((a) => a.name).join(', ');
  }

}
