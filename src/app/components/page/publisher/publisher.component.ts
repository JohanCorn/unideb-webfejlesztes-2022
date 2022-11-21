import {Component, OnInit} from '@angular/core';
import {PublisherController} from "../../../controllers/publisher.controller";
import {Publisher} from "../../../interfaces/publisher.interface";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-publisher-page',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherPageComponent implements OnInit {

  public publisher: Publisher | undefined;
  public publisherLoading = false;

  constructor(
    private _publisherController: PublisherController,
    private _activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const publisherId = Number(this._activeRoute.snapshot.paramMap.get('id'));
    this.loadPublisher(publisherId);
  }

  public loadPublisher(publisherId: number) {
    this.publisherLoading = true;

    this._publisherController.getPublisher(publisherId, true, true)
      .subscribe({
        next: (publisher) => {
          this.publisher = publisher;
          this.publisherLoading = false;
        },
        error: () => this.publisherLoading = false
      });
  }

}
