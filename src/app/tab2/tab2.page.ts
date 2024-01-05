import { Component } from '@angular/core';
import { PhotoService } from '../service/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  newRestaurant = { name: '', description: '', image: '' };

  constructor(
    public photoService:PhotoService,
  ) {}

  async addPhotoToGallery() {
    const isCameraAvailable = await this.photoService.isCameraAvailable();

    if (isCameraAvailable) {
      const source = await this.photoService.selectImageSource();
      
      if (source !== null) {
        const capturePhoto = await this.photoService.takePhoto(source);

        if (capturePhoto && capturePhoto.webPath) {
          this.newRestaurant.image = capturePhoto.webPath;
        } else {
          console.error('Error al capturar la foto desde la cámara.');
        }
      }
    } else {
      const selectedPhoto = await this.photoService.selectImage();

      if (selectedPhoto && selectedPhoto.webPath) {
        this.newRestaurant.image = selectedPhoto.webPath;
      } else {
        console.error('Error al seleccionar la foto desde la galería.');
      }
    }
  }

  addRestaurant() {
    this.photoService.addRestaurant(this.newRestaurant);
    // Limpia los campos después de agregar el restaurante
    this.newRestaurant = { name: '', description: '', image: '' };
  }

}
