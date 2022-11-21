import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthController} from "../../../controllers/auth.controller";
import {Author} from "../../../interfaces/author.interface";

@Component({
  selector: 'app-authors-table',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsTableComponent {

  @Input()
  public authors: Author[] = [];

  @Input()
  public authorsLoading = false;

  @Output()
  public loadAuthors = new EventEmitter;

  public authorName = '';
  public bookName = '';

  constructor(
    private _authController: AuthController
  ) {
  }

  public get filteredAuthors() {
    return this.authors.filter((a) => a.name?.toLowerCase().includes(this.authorName.toLowerCase()))
      .filter((a) => this.getAuthorBooks(a)?.toLowerCase().includes(this.bookName.toLowerCase()) ?? true);
  }

  public getAuthorBooks(author: Author) {
    return author.books?.map((b) => b.name).join(', ');
  }

  public get isLoggedIn() {
    return this._authController.isLoggedIn;
  }

}
