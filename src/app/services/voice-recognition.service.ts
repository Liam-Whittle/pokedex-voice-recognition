import { Injectable } from '@angular/core';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

  constructor() { }

  searchVoiceTerm(){
    SpeechRecognition.available();
    SpeechRecognition.start({
      language: "en-US",
      maxResults: 2,
      prompt: "Say something",
      partialResults: true,
      popup: true,
    });
    // listen to partial results
    SpeechRecognition.addListener("partialResults", (data: any) => {
      console.log("partialResults was fired", data.matches);
    });
    
    // stop listening partial results
    SpeechRecognition.removeAllListeners();
    
    SpeechRecognition.stop();
    
    SpeechRecognition.getSupportedLanguages();
    
    SpeechRecognition.checkPermissions();
    
    SpeechRecognition.requestPermissions();
    
  }
}
