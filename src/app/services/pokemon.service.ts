import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject, Subscription, catchError, throwError} from 'rxjs';
import { NativeAudio } from '@capacitor-community/native-audio';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
 
  private baseURL = "https://pokeapi.co/api/v2/pokemon/";
  private _latestSprite = new BehaviorSubject<string>('https://i.imgur.com/6H3CQ7M.png');
  private _latestPokemon = new BehaviorSubject<string>('Analysing')
  private subscription: Subscription = new Subscription;

  constructor(private http: HttpClient) {}

  public getPokemonByName(pokemon: string): void {
    console.log('Fetching Pokemon:', pokemon);
    
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.http.get<any>(this.baseURL + pokemon.toLowerCase().replace(/\s/g, "")).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching Pokemon:', error.message);
        return throwError('Failed to fetch Pokemon');
      }))
      .subscribe(data => {
        console.log('Pokemon data:', data);
        this._latestSprite.next(data.sprites.front_default);
        this._latestPokemon.next(pokemon.replace(/\s/g, ""));
        this.playCurrentPokemonCry(pokemon)
      },
      error => {
        console.error('Error fetching Pokemon:', error);
      }
    );
  }

  public get latestSprite(): BehaviorSubject<string> {
    return this._latestSprite;
  }

  public get latestPokemon(): BehaviorSubject<string> {
    return this._latestPokemon;
  }

  private playCurrentPokemonCry(pokemon: string){   

    //format pokemon name to audio file path
    let path = 'public/assets/sounds/cries/' + pokemon.toUpperCase().replace(/\s/g, "") + '.ogg'
    console.log('Pokemon cry path:', path)

    NativeAudio.preload({
      assetId: "currentPokemon",
      assetPath: path, 
      audioChannelNum: 1,
      isUrl: false
    }).then(() => {
      console.log('Pokemon cry preloaded successfully.');
      NativeAudio.setVolume({
        assetId: 'currentPokemon',
        volume: 0.5,
      }).then(() => {
        console.log('Volume set for Pokemon cry.');
        NativeAudio.play({
          assetId: 'currentPokemon',
        }).then(() => {
          console.log('Pokemon cry played successfully.');
        }).catch(error => {
          console.error('Error playing Pokemon cry:', error);
        });
      }).catch(error => {
        console.error('Error setting volume for Pokemon cry:', error);
      });
    }).catch(error => {
      console.error('Error preloading Pokemon cry:', error.message);
      console.error('Error object:', error); // Log the entire error object for more details
    });
  }
}