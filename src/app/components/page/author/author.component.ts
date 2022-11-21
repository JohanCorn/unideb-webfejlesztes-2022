import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthorController} from "../../../controllers/author.controller";
import {Author} from "../../../interfaces/author.interface";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorPageComponent implements OnInit {

  public author: Author | undefined;
  public authorLoading = false;

  constructor(
    private _authorController: AuthorController,
    private _activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const authorId = Number(this._activeRoute.snapshot.paramMap.get('id'));
    this.loadPublisher(authorId);
  }

  public loadPublisher(authorId: number) {
    this.authorLoading = true;

    this._authorController.getAuthor(authorId, true, true)
      .subscribe({
        next: (author) => {
          this.author = author;
          this.authorLoading = false;
        },
        error: () => this.authorLoading = false
      });
  }

}
