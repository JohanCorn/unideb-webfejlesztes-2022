import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthorController} from "../../../controllers/author.controller";
import {Author} from "../../../interfaces/author.interface";

@Component({
  selector: 'app-update-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class UpdateAuthorComponent {

  @Input()
  public authorId!: number;

  @Output()
  public updateSuccess = new EventEmitter;

  public author!: Author;

  public visibleDialog = false;
  public authorLoading = false;
  public updateLoading = false;

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

  public update() {
    this.updateLoading = true;
    this._authorController.updateAuthor(this.author)
      .subscribe({
        next: () => {
          this.updateLoading = false;
          this.visibleDialog = false;
          this.updateSuccess.emit();
        },
        error: () => this.updateLoading = false
      });
  }

  public get isLoading() {
    return this.updateLoading || this.authorLoading;
  }

}
