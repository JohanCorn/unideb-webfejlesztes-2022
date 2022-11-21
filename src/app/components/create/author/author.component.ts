import {Component, EventEmitter, Output} from '@angular/core';
import {AuthorController} from "../../../controllers/author.controller";
import {Author} from "../../../interfaces/author.interface";

@Component({
  selector: 'app-create-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class CreateAuthorComponent {

  @Output()
  public createSuccess = new EventEmitter;

  public author!: Author;

  public visibleDialog = false;
  public createLoading = false;

  constructor(
    private _authorController: AuthorController
  ) {
  }

  public show() {
    this.author = {name: undefined};
    this.visibleDialog = true;
  }

  public create() {
    this.createLoading = true;
    this._authorController.createAuthor(this.author)
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
    return this.createLoading;
  }

}
