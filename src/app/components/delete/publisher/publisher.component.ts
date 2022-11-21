import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PublisherController} from "../../../controllers/publisher.controller";
import {Publisher} from "../../../interfaces/publisher.interface";

@Component({
  selector: 'app-delete-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class DeletePublisherComponent {

  @Input()
  public publisherId!: number;

  @Output()
  public deleteSuccess = new EventEmitter;

  public publisher!: Publisher;

  public visibleDialog = false;
  public publisherLoading = false;
  public deleteLoading = false;

  constructor(
    private _publisherController: PublisherController
  ) {
  }

  public show() {
    this.publisher = {name: undefined};
    this.visibleDialog = true;
    this.publisherLoading = true;

    this._publisherController.getPublisher(this.publisherId)
      .subscribe((publisher) => {
        this.publisher = publisher;
        this.publisherLoading = false;
      });
  }

  public delete() {
    this.deleteLoading = true;
    this._publisherController.deletePublisher(this.publisherId)
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
    return this.deleteLoading || this.publisherLoading;
  }

}
