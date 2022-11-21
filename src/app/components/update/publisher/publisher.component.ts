import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PublisherController} from "../../../controllers/publisher.controller";
import {Publisher} from "../../../interfaces/publisher.interface";

@Component({
  selector: 'app-update-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class UpdatePublisherComponent {

  @Input()
  public publisherId!: number;

  @Output()
  public updateSuccess = new EventEmitter;

  public publisher!: Publisher;

  public visibleDialog = false;
  public publisherLoading = false;
  public updateLoading = false;

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

  public update() {
    this.updateLoading = true;
    this._publisherController.updatePublisher(this.publisher)
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
    return this.updateLoading || this.publisherLoading;
  }

}
