import { Injectable } from '@angular/core';

import { Camera, CameraPermissionType, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import { Filesystem, Directory} from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Component } from '@angular/core';

import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private restaurants: any[] = [];


  constructor(
    private actionSheetController: ActionSheetController,
  ) { }

  async isCameraAvailable(): Promise<boolean> {
    const cameraPermissions = await Camera.checkPermissions();
    return cameraPermissions.camera === 'granted';
  }

  async selectImageSource(): Promise<CameraSource | null> {
    const buttons = [
      {
        text: 'Usar Cámara',
        handler: () => CameraSource.Camera,
      },
      {
        text: 'Seleccionar de la Galería',
        handler: () => CameraSource.Photos,
      },
    ];

    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccionar fuente de la imagen',
      buttons: buttons as any,
    });

    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    return role === 'cancel' ? null : role as CameraSource;
  }

  async takePhoto(source: CameraSource): Promise<Photo | undefined> {
    const capturePhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source,
      quality: 100,
    });

    return capturePhoto;
  }

  async selectImage(): Promise<Photo | undefined> {
    const selectedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100,
    });

    return selectedPhoto;
  }




  public async addNewToGallery() {
    // Take a photo
    const capturePhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  }

  // Método para obtener la lista de restaurantes
  getRestaurants() {
    return this.restaurants;
  }

  // Método para agregar un restaurante
  addRestaurant(restaurant: any) {
    this.restaurants.push(restaurant);
  }

  // Método para eliminar un restaurante
  deleteRestaurant(index: number) {
    this.restaurants.splice(index, 1);
  }

}
