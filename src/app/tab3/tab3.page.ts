import { Component } from '@angular/core';
import { PhotoService } from '../service/photo.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    public photoService: PhotoService,
  ) {}

  deleteRestaurant(index: number) {
    this.photoService.deleteRestaurant(index);
  }

}
