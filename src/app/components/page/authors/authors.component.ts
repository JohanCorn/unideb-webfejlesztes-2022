import {Component, OnInit} from '@angular/core';
import {AuthController} from "../../../controllers/auth.controller";
import {AuthorController} from "../../../controllers/author.controller";
import {Author} from "../../../interfaces/author.interface";

@Component({
  selector: 'app-authors-page',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsPageComponent implements OnInit {

  public authors: Author[] = [];
  public authorsLoading = false;

  constructor(
    private _authController: AuthController,
    private _authorController: AuthorController
  ) {
  }

  ngOnInit(): void {
    this.loadAuthors();
  }

  public loadAuthors() {
    this.authors = [];
    this.authorsLoading = true;

    this._authorController.getAuthors(true)
      .subscribe({
        next: (authors) => {
          this.authors = authors;
          this.authorsLoading = false;
        },
        error: () => this.authorsLoading = false
      });
  }

  public get isLoggedIn() {
    return this._authController.isLoggedIn;
  }

}
