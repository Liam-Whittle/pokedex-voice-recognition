import { Injectable } from '@angular/core';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

  constructor( private pokemonService: PokemonService) { }

  searchVoiceTerm(){

    SpeechRecognition.available()
      .then(() => {
        SpeechRecognition.start({
          language: "en-US",
          maxResults: 2,
          prompt: "Say a Pokémon name",
          partialResults: false,
          popup: true,
        })
          .then(data => {
            console.log('Voice recognition result:', data);
            if (data && data.matches && data.matches.length > 0) {
              const pokemonName = data.matches[0]
              console.log('Detected Pokémon:', pokemonName);
              this.pokemonService.getPokemonByName(pokemonName);
            } else {
              console.error('No matches found from voice recognition.');
            }
          })
          .catch(error => {
            console.error('Error during voice recognition:', error);
          })
          .finally(() => {
            SpeechRecognition.stop();
          });
      })
      .catch(error => {
        console.error('Voice recognition not available:', error);
      });

    //first time configuration
    SpeechRecognition.getSupportedLanguages();
    SpeechRecognition.checkPermissions();
    SpeechRecognition.requestPermissions();
    
  }
}
