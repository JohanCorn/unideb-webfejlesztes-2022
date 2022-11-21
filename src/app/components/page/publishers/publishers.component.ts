import {Component, OnInit} from '@angular/core';
import {AuthController} from "../../../controllers/auth.controller";
import {PublisherController} from "../../../controllers/publisher.controller";
import {Publisher} from "../../../interfaces/publisher.interface";

@Component({
  selector: 'app-publishers-page',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersPageComponent implements OnInit {

  public publishers: Publisher[] = [];
  public publishersLoading = false;

  constructor(
    private _authController: AuthController,
    private _publisherController: PublisherController
  ) {
  }

  ngOnInit(): void {
    this.loadPublishers();
  }

  public loadPublishers() {
    this.publishers = [];
    this.publishersLoading = true;

    this._publisherController.getPublishers(true)
      .subscribe({
        next: (publishers) => {
          this.publishers = publishers;
          this.publishersLoading = false;
        },
        error: () => this.publishersLoading = false
      });
  }

  public get isLoggedIn() {
    return this._authController.isLoggedIn;
  }

}
