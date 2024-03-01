import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photo: UserPhoto = {filepath: "soon...", webviewPath:"https://pm1.aminoapps.com/6722/0ab8cce1e61ba0ef3beec0823b2c5321d1716fef_00.jpg"};
  constructor() { }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.photo = {
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath!
    };
  }
  
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}