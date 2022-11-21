import {Component, OnInit} from '@angular/core';
import {Book} from "../../../interfaces/book.interface";
import {BookController} from "../../../controllers/book.controller";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-page',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookPageComponent implements OnInit {

  public book: Book | undefined;
  public bookLoading = false;

  constructor(
    private _bookController: BookController,
    private _activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const bookId = Number(this._activeRoute.snapshot.paramMap.get('id'));
    this.loadBook(bookId);
  }

  public loadBook(bookId: number) {
    this.bookLoading = true;

    this._bookController.getBook(bookId, false, true)
      .subscribe({
        next: (book) => {
          this.book = book;
          this.bookLoading = false;
        },
        error: () => this.bookLoading = false
      });
  }

  public getAuthors() {
    return this.book?.authors?.map((a) => a.name).join(', ');
  }

}
