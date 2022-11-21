import {Component, EventEmitter, Output} from '@angular/core';
import {PublisherController} from "../../../controllers/publisher.controller";
import {Publisher} from "../../../interfaces/publisher.interface";

@Component({
  selector: 'app-create-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class CreatePublisherComponent {

  @Output()
  public createSuccess = new EventEmitter;

  public publisher!: Publisher;

  public visibleDialog = false;
  public createLoading = false;

  constructor(
    private _publisherController: PublisherController
  ) {
  }

  public show() {
    this.publisher = {name: undefined};
    this.visibleDialog = true;
  }

  public create() {
    this.createLoading = true;
    this._publisherController.createPublisher(this.publisher)
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
