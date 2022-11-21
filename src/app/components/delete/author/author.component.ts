import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthorController} from "../../../controllers/author.controller";
import {Author} from "../../../interfaces/author.interface";

@Component({
  selector: 'app-delete-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class DeleteAuthorComponent {

  @Input()
  public authorId!: number;

  @Output()
  public deleteSuccess = new EventEmitter;

  public author!: Author;

  public visibleDialog = false;
  public authorLoading = false;
  public deleteLoading = false;

  constructor(
    private _authorController: AuthorController
  ) {
  }

  public show() {
    this.author = {name: undefined};
    this.visibleDialog = true;
    this.authorLoading = true;

    this._authorController.getAuthor(this.authorId)
      .subscribe((author) => {
        this.author = author;
        this.authorLoading = false;
      });
  }

  public delete() {
    this.deleteLoading = true;
    this._authorController.deleteAuthor(this.authorId)
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
    return this.deleteLoading || this.authorLoading;
  }

}
