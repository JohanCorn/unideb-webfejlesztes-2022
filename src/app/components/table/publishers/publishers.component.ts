import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthController} from "../../../controllers/auth.controller";
import {Publisher} from "../../../interfaces/publisher.interface";

@Component({
  selector: 'app-publishers-table',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersTableComponent {

  @Input()
  public publishers: Publisher[] = [];

  @Input()
  public publishersLoading = false;

  @Output()
  public loadPublishers = new EventEmitter;

  public publisherName = '';
  public bookName = '';

  constructor(
    private _authController: AuthController
  ) {
  }

  public get filteredPublishers() {
    return this.publishers.filter((p) => p.name?.toLowerCase().includes(this.publisherName.toLowerCase()))
      .filter((p) => this.getPublisherBooks(p)?.toLowerCase().includes(this.bookName.toLowerCase()) ?? true);
  }

  public getPublisherBooks(publisher: Publisher) {
    return publisher.books?.map((b) => b.name).join(', ');
  }

  public get isLoggedIn() {
    return this._authController.isLoggedIn;
  }

}
