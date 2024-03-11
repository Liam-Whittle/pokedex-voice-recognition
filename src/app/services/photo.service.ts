import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
 
  private baseURL = "https://pokeapi.co/api/v2/pokemon/"
  private pokemon = "pikachu"
  public photo: UserPhoto = {webviewPath:""};
  constructor(private http: HttpClient) { 
    this.http.get<any>(this.baseURL + this.pokemon, {
    })
    .subscribe((data: any) => {
      this.photo = {
        webviewPath: data.sprites.front_default
      };
    });
  }
}

export interface UserPhoto {
  webviewPath?: string;
}