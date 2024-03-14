import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../services/voice-recognition.service';
import { PokemonService } from '../services/pokemon.service';
import { Subscription } from 'rxjs';
import { NativeAudio } from '@capacitor-community/native-audio'

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent  implements OnInit {
  latestSprite: string = '';
  latestPokemon: string = '';
  private spriteSubscription: Subscription = new Subscription;
  private pokemonSubscription: Subscription = new Subscription;
  public textAnim: boolean = true;
  
  constructor(public voiceService: VoiceRecognitionService, public pokemonService: PokemonService) { }

  ngOnInit() { 
    this.spriteSubscription = 
    this.pokemonService.latestSprite.subscribe(sprite => {
      this.latestSprite = sprite;
    });
    this.pokemonSubscription = 
    this.pokemonService.latestPokemon.subscribe(pokemon => {
      this.latestPokemon = pokemon;
    });

    //play wake sound
    NativeAudio.preload({
      assetId: "wake",
      assetPath: "public/assets/sounds/wake.ogg", 
      audioChannelNum: 1,
      isUrl: false
    }).then(() => {
      console.log('wake preloaded successfully.');
      NativeAudio.setVolume({
        assetId: 'wake',
        volume: 0.5,
      }).then(() => {
        console.log('Volume set for wake.');
        NativeAudio.play({
          assetId: 'wake',
        }).then(() => {
          console.log('wake played successfully.');
        }).catch(error => {
          console.error('Error playing wake:', error);
        });
      }).catch(error => {
        console.error('Error setting volume for wake:', error);
      });
    }).catch(error => {
      console.error('Error preloading wake:', error.message);
      console.error('Error object:', error); // Log the entire error object for more details
    });
  } 

  ngOnDestroy() {
    this.spriteSubscription.unsubscribe();
    this.pokemonSubscription.unsubscribe();
  }

  searchPokemon() {
    //call speech to text service 
    //to handle a valid pokemon input
    this.voiceService.searchVoiceTerm();

    //unload any audio that was loaded
    NativeAudio.unload({
      assetId: 'currentPokemon',
    });

    //analysing animation cancel
    this.textAnim = false
  }
}
